(function () {
  'use strict';

  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const ALL_LEVELS = ['Pre-A1'].concat(LEVELS);

  // ---------- модель оценки (IRT, 3-параметрическая) ----------
  // Каждому уровню CEFR соответствует сложность вопроса b на шкале способностей θ.
  // Границы уровней на шкале θ: A1 от −3, A2 от −2, B1 от −1, B2 от 0, C1 от 1, C2 от 2.
  const DIFF = { A1: -2.5, A2: -1.5, B1: -0.5, B2: 0.5, C1: 1.5, C2: 2.5 };
  const BOUNDS = [-3, -2, -1, 0, 1, 2];
  const DISC = 1.6;   // крутизна кривой вопроса
  const GUESS = 0.25; // шанс угадать из 4 вариантов

  // Опорные точки для перевода θ в разные шкалы (между ними — линейная интерполяция)
  const SCALE = {
    score: [[-4, 0], [-3, 10], [-2, 25], [-1, 40], [0, 55], [1, 70], [2, 85], [4, 100]],
    cambridge: [[-4, 80], [-3, 100], [-2, 120], [-1, 140], [0, 160], [1, 180], [2, 200], [4, 230]],
    ielts: [[-4, 1], [-3, 2], [-2, 3], [-1, 4], [0, 5.5], [1, 7], [2, 8.5], [3, 9]],
    toefl: [[-1, 42], [0, 72], [1, 95], [2, 114], [3, 120]],
    vocab: [[-4, 150], [-3, 400], [-2, 900], [-1, 1800], [0, 3500], [1, 6500], [2, 10000], [3, 15000], [4, 20000]]
  };

  const LEVEL_INFO = {
    'Pre-A1': {
      name: 'Starter', exam: null,
      desc: 'Вы делаете первые шаги в английском. Знакомы отдельные слова, но построить фразу пока сложно.',
      can: ['Узнаёте знакомые слова и простые фразы', 'Понимаете цифры, цвета, приветствия'],
      rec: ['Начните с алфавита, чисел и базовых фраз', 'Учите 10 новых слов в день с карточками', 'Освойте глагол to be и Present Simple']
    },
    A1: {
      name: 'Beginner', exam: null,
      desc: 'Вы понимаете и используете простые фразы о себе и повседневных вещах.',
      can: ['Представиться и рассказать о себе', 'Задать простые вопросы и ответить на них', 'Понимать медленную, чёткую речь'],
      rec: ['Отработайте Present Simple и Past Simple', 'Расширяйте словарь по темам: семья, еда, город', 'Слушайте адаптированные подкасты для начинающих']
    },
    A2: {
      name: 'Elementary', exam: 'A2 Key (KET)',
      desc: 'Вы справляетесь в простых бытовых ситуациях и понимаете короткие тексты на знакомые темы.',
      can: ['Общаться в магазине, кафе, на вокзале', 'Описывать прошлые события простыми словами', 'Читать короткие письма и объявления'],
      rec: ['Разберите Present Perfect и разницу с Past Simple', 'Читайте адаптированные книги уровня A2–B1', 'Начните учить фразовые глаголы']
    },
    B1: {
      name: 'Intermediate', exam: 'B1 Preliminary (PET)',
      desc: 'Вы можете поддержать разговор на знакомые темы, понимаете основную мысль ясной речи.',
      can: ['Справиться с большинством ситуаций в путешествии', 'Рассказать о планах, опыте, мнении', 'Понимать главное в новостях и сериалах с субтитрами'],
      rec: ['Отработайте условные предложения и пассив', 'Смотрите сериалы с английскими субтитрами', 'Пишите короткие эссе и просите обратную связь']
    },
    B2: {
      name: 'Upper-Intermediate', exam: 'B2 First (FCE)',
      desc: 'Вы свободно общаетесь с носителями, понимаете сложные тексты и аргументированно излагаете мысли.',
      can: ['Обсуждать абстрактные и профессиональные темы', 'Понимать фильмы и лекции без адаптации', 'Писать подробные и связные тексты'],
      rec: ['Работайте над коллокациями и идиомами', 'Читайте оригинальную прессу (The Guardian, BBC)', 'Тренируйте инверсию и сложные времена']
    },
    C1: {
      name: 'Advanced', exam: 'C1 Advanced (CAE)',
      desc: 'Вы владеете языком гибко и эффективно — в учёбе, работе и общении, понимаете подтекст.',
      can: ['Понимать длинные сложные тексты и скрытый смысл', 'Говорить спонтанно, не подбирая слова', 'Использовать язык в академической и деловой среде'],
      rec: ['Расширяйте редкую лексику и регистры речи', 'Читайте художественную и научную литературу', 'Готовьтесь к CAE или IELTS Academic']
    },
    C2: {
      name: 'Proficiency', exam: 'C2 Proficiency (CPE)',
      desc: 'Ваш уровень близок к носителю: вы понимаете практически всё и выражаетесь точно и тонко.',
      can: ['Понимать любую устную и письменную речь', 'Различать тонкие оттенки значений', 'Свободно обобщать информацию из разных источников'],
      rec: ['Поддерживайте уровень: литература, дебаты, письмо', 'Попробуйте сдать CPE для подтверждения уровня', 'Изучайте стилистику и редкие идиомы']
    }
  };

  // Цели и уровень θ, с которого цель достижима полностью
  const GOALS = [
    { name: 'Путешествия и бытовое общение', req: -2 },
    { name: 'Сериалы с английскими субтитрами', req: -1 },
    { name: 'Переписка и звонки по работе', req: -0.5 },
    { name: 'Работа в международной компании', req: 0 },
    { name: 'Учёба в зарубежном вузе', req: 0.7 },
    { name: 'Фильмы без субтитров', req: 1 },
    { name: 'Художественная литература в оригинале', req: 1.4 },
    { name: 'Профессиональный перевод', req: 2 }
  ];

  const SECTIONS = [
    { key: 'grammar', name: 'Грамматика', desc: 'Времена, условные предложения, инверсия и сложные конструкции.' },
    { key: 'vocabulary', name: 'Лексика', desc: 'Слова, фразовые глаголы, сочетаемость и идиомы.' },
    { key: 'reading', name: 'Чтение', desc: 'Прочитайте тексты и ответьте на вопросы по ним.' },
    { key: 'listening', name: 'Аудирование', desc: 'Прослушайте фразу (максимум 2 раза) и выберите ответ. Включите звук.' }
  ];
  const SECTION_NAME = Object.fromEntries(SECTIONS.map(s => [s.key, s.name]));

  const MODES = {
    full: { name: 'Полный тест', time: '30–35 минут', per: { grammar: 5, vocabulary: 4, listening: 2 }, bands: ['easy', 'mid', 'hard'],
      desc: 'Максимальная точность. Рекомендуем для первой проверки.' },
    quick: { name: 'Экспресс-тест', time: '10–15 минут', per: { grammar: 2, vocabulary: 2, listening: 1 }, bands: ['mid'],
      desc: 'Быстрая оценка уровня, погрешность выше.' }
  };

  const PROGRESS_KEY = 'elt_progress_v2';
  const HISTORY_KEY = 'elt_history_v1';
  const LAST_KEY = 'elt_last_v2';
  const MODE_KEY = 'elt_mode_v1';
  const MAX_PLAYS = 2;

  const app = document.getElementById('app');
  let state = null;
  let timerId = null;

  // ---------- storage ----------
  function load(key) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function save(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* хранилище недоступно — работаем без него */ }
  }

  // ---------- data ----------
  function buildItems() {
    const D = window.TEST_DATA;
    const items = [];
    D.grammar.forEach((x, i) => items.push(Object.assign({ id: 'g' + i, section: 'grammar' }, x)));
    D.vocabulary.forEach((x, i) => items.push(Object.assign({ id: 'v' + i, section: 'vocabulary' }, x)));
    D.reading.forEach((p, pi) => p.questions.forEach((x, i) =>
      items.push(Object.assign({ id: 'r' + pi + '_' + i, section: 'reading', passage: pi }, x))));
    D.listening.forEach((x, i) => items.push(Object.assign({ id: 'l' + i, section: 'listening' }, x)));
    return items;
  }
  const ITEMS = buildItems();
  const BY_ID = Object.fromEntries(ITEMS.map(x => [x.id, x]));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Собирает тест: случайные вопросы каждого уровня в каждом разделе, по одному тексту каждой сложности
  function buildTest(modeKey) {
    const mode = MODES[modeKey];
    const ids = [];
    ['grammar', 'vocabulary'].forEach(sec => {
      LEVELS.forEach(l => {
        shuffle(ITEMS.filter(x => x.section === sec && x.level === l)).slice(0, mode.per[sec]).forEach(x => ids.push(x.id));
      });
    });
    mode.bands.forEach(band => {
      const options = window.TEST_DATA.reading.map((p, i) => ({ p, i })).filter(x => x.p.band === band);
      const pick = shuffle(options)[0];
      ITEMS.filter(x => x.section === 'reading' && x.passage === pick.i).forEach(x => ids.push(x.id));
    });
    LEVELS.forEach(l => {
      shuffle(ITEMS.filter(x => x.section === 'listening' && x.level === l)).slice(0, mode.per.listening).forEach(x => ids.push(x.id));
    });
    return ids;
  }

  function testSize(modeKey) {
    const m = MODES[modeKey];
    const passageLen = band => {
      const ps = window.TEST_DATA.reading.filter(p => p.band === band);
      return Math.round(ps.reduce((s, p) => s + p.questions.length, 0) / ps.length);
    };
    return 6 * (m.per.grammar + m.per.vocabulary + m.per.listening) + m.bands.reduce((s, b) => s + passageLen(b), 0);
  }

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function fmtQuestion(q) {
    return esc(q).replace(/_{3,}/g, '<span class="blank">&nbsp;</span>');
  }
  function fmtTime(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(s / 60);
    return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  function plural(n, one, few, many) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  function pct(x) { return Math.round(x * 100) + '%'; }
  function elapsed() {
    return state.elapsed + (state.resumedAt ? Date.now() - state.resumedAt : 0);
  }
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
  function pauseClock() {
    if (state && state.resumedAt) {
      state.elapsed += Date.now() - state.resumedAt;
      state.resumedAt = null;
    }
  }
  function resumeClock() {
    if (state && !state.resumedAt) state.resumedAt = Date.now();
  }
  function persist() {
    if (!state) return;
    const snap = Object.assign({}, state, { elapsed: elapsed(), resumedAt: null });
    save(PROGRESS_KEY, snap);
  }
  function stopSpeech() {
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { }
  }

  // ---------- start screen ----------
  function renderStart() {
    stopTimer();
    stopSpeech();
    state = null;
    const saved = load(PROGRESS_KEY);
    const history = load(HISTORY_KEY) || [];
    const last = load(LAST_KEY);
    let mode = load(MODE_KEY) || 'full';
    if (!MODES[mode]) mode = 'full';
    const bankSize = ITEMS.length;

    app.innerHTML = `
      <section class="card hero">
        <h1>Узнайте свой уровень английского</h1>
        <p>Тест по международной шкале CEFR (A1–C2): грамматика, лексика, чтение и аудирование. Банк из ${bankSize} заданий — каждая попытка собирается заново. В конце — уровень, балл, соответствие IELTS, TOEFL и Cambridge, оценка навыков и тем, словарный запас и разбор ошибок.</p>

        ${saved ? `
        <div class="resume-box">
          <div><b>У вас есть незаконченный тест</b><div class="muted small">${MODES[saved.mode] ? MODES[saved.mode].name : 'Тест'} · вопрос ${saved.i + 1} из ${saved.order.length}</div></div>
          <button class="btn btn-primary" id="resume">Продолжить</button>
        </div>` : ''}

        <div class="modes" role="radiogroup" aria-label="Режим теста">
          ${Object.entries(MODES).map(([k, m]) => `
            <button class="mode ${k === mode ? 'selected' : ''}" data-mode="${k}" role="radio" aria-checked="${k === mode}">
              <b>${m.name}</b>
              <span class="mode-meta">${testSize(k)} ${plural(testSize(k), 'задание', 'задания', 'заданий')} · ${m.time}</span>
              <span class="muted small">${m.desc}</span>
            </button>`).join('')}
        </div>

        <div class="btn-row">
          <button class="btn btn-primary" id="start">${saved ? 'Начать новый тест' : 'Начать тест'}</button>
          ${last ? `<button class="btn btn-ghost" id="last">Последний результат</button>` : ''}
        </div>
      </section>

      <section class="card">
        <h2>Что проверяет тест</h2>
        <div class="sections-grid">
          ${SECTIONS.map((s, i) => `<div class="sec-tile"><b>${i + 1}. ${s.name}</b><span>${s.desc}</span></div>`).join('')}
        </div>
        <h3>Шкала CEFR</h3>
        <div class="levels-scale">
          ${LEVELS.map(l => `<div><b>${l}</b>${LEVEL_INFO[l].name}</div>`).join('')}
        </div>
        <h3 style="margin-top:20px">Как считается результат</h3>
        <p class="muted small" style="margin:0">Используется модель IRT, как в адаптивных экзаменах: учитывается сложность каждого вопроса и вероятность угадывания. Верный ответ на сложный вопрос значит больше, чем на простой, а случайное угадывание почти не влияет на итог. Если не знаете ответ — нажмите «Не знаю», так оценка будет точнее. Вернуться к предыдущему вопросу нельзя.</p>
      </section>

      ${history.length ? `
      <section class="card">
        <h2>История попыток</h2>
        <ul class="history-list">
          ${history.slice(-8).reverse().map(h => `
            <li><span>${new Date(h.date).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}${h.mode && MODES[h.mode] ? ' · <span class="muted">' + MODES[h.mode].name + '</span>' : ''}</span>
            <span><span class="lvl-chip">${esc(h.level)}</span> · ${h.score}/100 · ${fmtTime(h.time)}</span></li>`).join('')}
        </ul>
      </section>` : ''}
    `;

    app.querySelectorAll('.mode').forEach(b => {
      b.onclick = () => {
        mode = b.dataset.mode;
        save(MODE_KEY, mode);
        app.querySelectorAll('.mode').forEach(x => {
          x.classList.toggle('selected', x === b);
          x.setAttribute('aria-checked', x === b);
        });
      };
    });
    document.getElementById('start').onclick = () => startNew(mode);
    const r = document.getElementById('resume');
    if (r) r.onclick = () => { state = saved; resumeClock(); next(); };
    const l = document.getElementById('last');
    if (l) l.onclick = () => renderResults(last, false);
  }

  function startNew(mode) {
    const order = buildTest(mode);
    const perms = {};
    order.forEach(id => { perms[id] = shuffle(BY_ID[id].o.map((_, i) => i)); });
    state = {
      mode,
      order,
      perms,
      answers: {},
      qtime: {},
      plays: {},
      introSeen: {},
      i: 0,
      elapsed: 0,
      resumedAt: null
    };
    save(PROGRESS_KEY, null);
    resumeClock();
    next();
  }

  // ---------- flow ----------
  function next() {
    stopSpeech();
    if (state.i >= state.order.length) return finish();
    const it = BY_ID[state.order[state.i]];
    if (!state.introSeen[it.section]) return renderSectionIntro(it.section);
    renderQuestion();
  }

  function renderSectionIntro(key) {
    stopTimer();
    pauseClock();
    const idx = SECTIONS.findIndex(s => s.key === key);
    const sec = SECTIONS[idx];
    const count = state.order.filter(id => BY_ID[id].section === key).length;
    app.innerHTML = `
      <section class="card sec-intro">
        <div class="step">Раздел ${idx + 1} из ${SECTIONS.length}</div>
        <h2>${sec.name}</h2>
        <p>${sec.desc}<br>${count} ${plural(count, 'вопрос', 'вопроса', 'вопросов')}.</p>
        <button class="btn btn-primary" id="go">Начать раздел</button>
      </section>`;
    persist();
    document.getElementById('go').onclick = () => {
      state.introSeen[key] = true;
      resumeClock();
      next();
    };
  }

  function renderQuestion() {
    const it = BY_ID[state.order[state.i]];
    const perm = state.perms[it.id];
    const total = state.order.length;
    const passage = it.section === 'reading' ? window.TEST_DATA.reading[it.passage] : null;
    const isListening = it.section === 'listening';
    const hasTTS = 'speechSynthesis' in window;
    const plays = state.plays[it.id] || 0;
    const shownAt = Date.now();
    let selected = null;

    app.innerHTML = `
      <section class="card">
        <div class="test-head">
          <span class="badge">${SECTION_NAME[it.section]}</span>
          <span>Вопрос ${state.i + 1} из ${total}</span>
          <span class="timer" id="timer">${fmtTime(elapsed())}</span>
        </div>
        <div class="progress"><div style="width:${(state.i / total) * 100}%"></div></div>

        ${passage ? `<div class="passage"><h3>${esc(passage.title)}</h3><p>${esc(passage.text)}</p></div>` : ''}

        ${isListening ? (hasTTS ? `
          <div class="audio-box">
            <button class="play-btn" id="play" aria-label="Прослушать" ${plays >= MAX_PLAYS ? 'disabled' : ''}>▶</button>
            <div><b>Прослушайте запись</b><div class="muted small" id="plays-left">Осталось прослушиваний: ${MAX_PLAYS - plays}</div></div>
          </div>` : `
          <div class="passage"><p class="muted small">Ваш браузер не поддерживает озвучку, поэтому показываем текст записи:</p><p><i>${esc(it.audio)}</i></p></div>`) : ''}

        <h2 class="question">${fmtQuestion(it.q)}</h2>
        <div class="options" role="listbox">
          ${perm.map((orig, k) => `<button class="opt" data-k="${k}" role="option"><kbd>${k + 1}</kbd><span>${esc(it.o[orig])}</span></button>`).join('')}
        </div>
        <div class="test-actions">
          <button class="btn btn-ghost" id="idk">Не знаю</button>
          <button class="btn btn-primary" id="submit" disabled>Ответить</button>
        </div>
        <div class="hint">Клавиши 1–4 — выбор варианта, Enter — ответить.</div>
      </section>`;

    const opts = Array.from(app.querySelectorAll('.opt'));
    const submit = document.getElementById('submit');
    function choose(k) {
      selected = k;
      opts.forEach((b, j) => b.classList.toggle('selected', j === k));
      submit.disabled = false;
    }
    opts.forEach((b, k) => { b.onclick = () => choose(k); });
    function answer(origIdx) {
      document.onkeydown = null;
      state.answers[it.id] = origIdx;
      state.qtime[it.id] = Math.min(Date.now() - shownAt, 5 * 60 * 1000);
      state.i++;
      persist();
      next();
    }
    submit.onclick = () => { if (selected !== null) answer(perm[selected]); };
    document.getElementById('idk').onclick = () => answer(-1);
    document.onkeydown = e => {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= opts.length) { choose(n - 1); e.preventDefault(); }
      else if (e.key === 'Enter' && selected !== null) { e.preventDefault(); submit.click(); }
    };

    const play = document.getElementById('play');
    if (play) play.onclick = () => speak(it, play);

    stopTimer();
    const timerEl = document.getElementById('timer');
    timerId = setInterval(() => { timerEl.textContent = fmtTime(elapsed()); }, 1000);
    persist();
  }

  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /en[-_]GB/i.test(v.lang) && /natural|google|online/i.test(v.name))
      || voices.find(v => /en[-_]US/i.test(v.lang) && /natural|google|online/i.test(v.name))
      || voices.find(v => /^en[-_](GB|US)/i.test(v.lang))
      || voices.find(v => /^en/i.test(v.lang))
      || null;
  }

  function speak(it, btn) {
    const used = state.plays[it.id] || 0;
    if (used >= MAX_PLAYS || speechSynthesis.speaking) return;
    state.plays[it.id] = used + 1;
    persist();
    const u = new SpeechSynthesisUtterance(it.audio);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = v ? v.lang : 'en-GB';
    u.rate = LEVELS.indexOf(it.level) >= 4 ? 1 : 0.92;
    btn.classList.add('playing');
    btn.disabled = true;
    const left = document.getElementById('plays-left');
    if (left) left.textContent = 'Осталось прослушиваний: ' + (MAX_PLAYS - state.plays[it.id]);
    u.onend = u.onerror = () => {
      btn.classList.remove('playing');
      btn.disabled = state.plays[it.id] >= MAX_PLAYS;
    };
    speechSynthesis.speak(u);
  }
  if ('speechSynthesis' in window) {
    try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => { }; } catch (e) { }
  }

  // ---------- scoring ----------
  function pCorrect(theta, b, withGuess) {
    const p = 1 / (1 + Math.exp(-DISC * (theta - b)));
    return withGuess ? GUESS + (1 - GUESS) * p : p;
  }

  // Апостериорная оценка способности (EAP): среднее и стандартная ошибка.
  // «Не знаю» оценивается без поправки на угадывание — это честный ответ.
  function estimate(rows, priorMean, priorSd) {
    let maxLp = -Infinity;
    const grid = [];
    for (let t = -5; t <= 5.0001; t += 0.02) {
      let lp = -((t - priorMean) ** 2) / (2 * priorSd * priorSd);
      rows.forEach(r => {
        const b = DIFF[r.level];
        if (r.ok) lp += Math.log(pCorrect(t, b, true));
        else if (r.chosen === -1) lp += Math.log(1 - pCorrect(t, b, false));
        else lp += Math.log(1 - pCorrect(t, b, true));
      });
      grid.push([t, lp]);
      if (lp > maxLp) maxLp = lp;
    }
    let sw = 0, sm = 0, ss = 0;
    grid.forEach(([t, lp]) => { const w = Math.exp(lp - maxLp); sw += w; sm += w * t; ss += w * t * t; });
    const mean = sm / sw;
    return { theta: mean, se: Math.sqrt(Math.max(ss / sw - mean * mean, 0)) };
  }

  function interp(points, x) {
    if (x <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      if (x <= points[i][0]) {
        const [x0, y0] = points[i - 1], [x1, y1] = points[i];
        return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
      }
    }
    return points[points.length - 1][1];
  }

  // Уровень по θ: base — уровень, label — с «+» в верхней трети уровня, toNext — прогресс до следующего
  function levelOf(theta) {
    let idx = -1;
    BOUNDS.forEach((b, i) => { if (theta >= b) idx = i; });
    const base = idx < 0 ? 'Pre-A1' : LEVELS[idx];
    let toNext = null;
    if (idx < LEVELS.length - 1) {
      const lo = idx < 0 ? -4 : BOUNDS[idx];
      const hi = BOUNDS[idx + 1];
      toNext = Math.min(1, Math.max(0, (theta - lo) / (hi - lo)));
    }
    const plus = idx >= 0 && toNext !== null && toNext >= 0.67;
    return { idx, base, label: base + (plus ? '+' : ''), toNext, next: idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null };
  }

  function levelStats(rows) {
    return LEVELS.map(l => {
      const xs = rows.filter(r => r.level === l);
      const c = xs.filter(r => r.ok).length;
      return { level: l, n: xs.length, c, acc: xs.length ? c / xs.length : 0 };
    });
  }

  function computeResult() {
    const rows = state.order.map(id => {
      const it = BY_ID[id];
      const a = state.answers[id];
      return { id, section: it.section, level: it.level, topic: it.t, chosen: a === undefined ? -1 : a, ok: a === 0, time: state.qtime[id] || 0 };
    });
    const est = estimate(rows, 0, 2);
    const theta = est.theta;
    const score = Math.round(interp(SCALE.score, theta));
    const scoreLo = Math.round(interp(SCALE.score, theta - est.se));
    const scoreHi = Math.round(interp(SCALE.score, theta + est.se));

    const sections = SECTIONS.map(s => {
      const xs = rows.filter(r => r.section === s.key);
      if (!xs.length) return null;
      const c = xs.filter(r => r.ok).length;
      const e = estimate(xs, theta, 1.2);
      return {
        key: s.key, name: s.name, n: xs.length, c, acc: c / xs.length,
        theta: e.theta, score: Math.round(interp(SCALE.score, e.theta)), level: levelOf(e.theta).label,
        avgTime: xs.reduce((sum, r) => sum + r.time, 0) / xs.length
      };
    }).filter(Boolean);

    const topicMap = {};
    rows.forEach(r => {
      if (!r.topic) return;
      const t = topicMap[r.topic] || (topicMap[r.topic] = { key: r.topic, n: 0, c: 0 });
      t.n++;
      if (r.ok) t.c++;
    });
    const topics = Object.values(topicMap).map(t => Object.assign(t, { acc: t.c / t.n, name: (window.TOPICS || {})[t.key] || t.key }));

    // Стабильность: доля ответов, которые согласуются с итоговым уровнем
    let unexpected = 0;
    rows.forEach(r => {
      const b = DIFF[r.level];
      if (r.ok && b - theta >= 1.5) unexpected++;
      else if (!r.ok && pCorrect(theta, b, false) > 0.9) unexpected++;
    });

    return {
      v: 2,
      mode: state.mode,
      date: Date.now(),
      time: elapsed(),
      rows,
      total: rows.length,
      correct: rows.filter(r => r.ok).length,
      idk: rows.filter(r => r.chosen === -1).length,
      theta, se: est.se,
      score, scoreLo, scoreHi,
      overall: levelOf(theta),
      cambridge: Math.round(interp(SCALE.cambridge, theta)),
      ielts: Math.min(9, Math.max(1, Math.round(interp(SCALE.ielts, theta) * 2) / 2)),
      toefl: theta < -1 ? null : Math.round(interp(SCALE.toefl, theta)),
      vocab: Math.round(Math.exp(interp(SCALE.vocab.map(([x, y]) => [x, Math.log(y)]), theta)) / 100) * 100,
      consistency: 1 - unexpected / rows.length,
      sections,
      topics,
      levels: levelStats(rows)
    };
  }

  function schoolGrade(overall) {
    return [2, 2, 3, 4, 4, 5, 5][overall.idx + 1];
  }

  function finish() {
    stopTimer();
    pauseClock();
    const res = computeResult();
    const history = load(HISTORY_KEY) || [];
    const prev = history.length ? history[history.length - 1] : null;
    if (prev) res.prev = { score: prev.score, level: prev.level, date: prev.date };
    save(PROGRESS_KEY, null);
    save(LAST_KEY, res);
    history.push({ date: res.date, level: res.overall.label, score: res.score, time: res.time, mode: res.mode });
    save(HISTORY_KEY, history.slice(-30));
    state = null;
    renderResults(res, true);
  }

  // ---------- results ----------
  function paceLabel(ms) {
    const s = ms / 1000;
    if (s < 8) return 'очень быстро';
    if (s < 20) return 'уверенно';
    if (s < 40) return 'вдумчиво';
    return 'медленно';
  }
  function reliabilityLabel(res) {
    const half = (res.scoreHi - res.scoreLo) / 2;
    if (half <= 5) return ['высокая', 'ok'];
    if (half <= 9) return ['средняя', 'warn'];
    return ['низкая', 'bad'];
  }
  function consistencyLabel(c) {
    if (c >= 0.9) return ['высокая', 'ok'];
    if (c >= 0.8) return ['средняя', 'warn'];
    return ['низкая', 'bad'];
  }
  const barColor = a => a >= 0.75 ? 'var(--ok)' : a >= 0.5 ? 'var(--accent)' : a >= 0.3 ? 'var(--warn)' : 'var(--bad)';

  function bar(label, value, right, color) {
    return `
      <div class="bar-row">
        <span>${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.max(0, Math.min(1, value)) * 100}%;background:${color || barColor(value)}"></div></div>
        <span class="bar-val">${right}</span>
      </div>`;
  }

  function cefrScale(res) {
    const bands = [['Pre-A1', 0, 10], ['A1', 10, 25], ['A2', 25, 40], ['B1', 40, 55], ['B2', 55, 70], ['C1', 70, 85], ['C2', 85, 100]];
    return `
      <div class="scale">
        <div class="scale-range" style="left:${res.scoreLo}%;width:${Math.max(1, res.scoreHi - res.scoreLo)}%"></div>
        <div class="scale-marker" style="left:${res.score}%"><span>${res.score}</span></div>
        <div class="scale-bands">
          ${bands.map(([n, a, b]) => `<div class="scale-band ${n === res.overall.base ? 'active' : ''}" style="width:${b - a}%"><b>${n}</b><span>${a}–${b}</span></div>`).join('')}
        </div>
      </div>`;
  }

  function renderResults(res, fresh) {
    stopTimer();
    document.onkeydown = null;
    if (!res || res.v !== 2) { renderStart(); return; }
    const info = LEVEL_INFO[res.overall.base];
    const accuracy = res.correct / res.total;
    const ringPct = res.score;
    const sorted = res.sections.slice().sort((a, b) => b.score - a.score);
    const best = sorted[0], worst = sorted[sorted.length - 1];
    const wrong = res.rows.filter(r => !r.ok);
    const avgPerQ = res.time / res.total;
    const [relText, relCls] = reliabilityLabel(res);
    const [conText, conCls] = consistencyLabel(res.consistency);
    const nextExam = res.overall.idx < LEVELS.length - 1 ? LEVEL_INFO[LEVELS[res.overall.idx + 1]].exam : null;
    const topics = res.topics.slice().sort((a, b) => a.acc - b.acc);

    const strengths = [], weaknesses = [];
    res.sections.forEach(s => {
      if (s.score >= res.score + 5) strengths.push(`${s.name}: уровень ${s.level}, выше общего`);
      else if (s.score <= res.score - 5) weaknesses.push(`${s.name}: уровень ${s.level}, ниже общего`);
    });
    topics.filter(t => t.n >= 2 && t.acc === 1).slice(0, 3).forEach(t => strengths.push(`Тема «${t.name}» — без ошибок`));
    topics.filter(t => t.n >= 2 && t.acc < 0.5).slice(0, 3).forEach(t => weaknesses.push(`Тема «${t.name}» — ${pct(t.acc)} верных`));
    if (!strengths.length) strengths.push(`Лучший раздел: ${best.name} (${best.level})`);
    if (!weaknesses.length && worst.acc < 1) weaknesses.push(`Есть куда расти: ${worst.name} (${worst.level})`);
    if (res.idk > res.total * 0.2) weaknesses.push(`Много ответов «Не знаю» (${res.idk}) — стоит расширить словарный запас`);
    if (avgPerQ < 6000) weaknesses.push('Вы отвечали очень быстро — попробуйте читать вопросы внимательнее');
    if (res.consistency < 0.8) weaknesses.push('Ответы непоследовательны: возможно, часть верных ответов угадана');

    const delta = res.prev ? res.score - res.prev.score : null;

    app.innerHTML = `
      <section class="card">
        <div class="result-hero">
          <div class="level-ring" style="background:conic-gradient(var(--accent) ${ringPct}%, var(--line) 0)">
            <div class="inner"><div><b>${esc(res.overall.label)}</b><span>${info.name}</span></div></div>
          </div>
          <div>
            <div class="muted small">${fresh ? 'Тест завершён' : 'Последний результат'} · ${MODES[res.mode] ? MODES[res.mode].name : ''} · ${new Date(res.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <h1>Ваш уровень: ${esc(res.overall.label)} — ${info.name}</h1>
            <p class="muted" style="margin:0 0 10px">${info.desc}</p>
            ${res.overall.next ? `
              <div class="next-level">
                <div class="small">До уровня <b>${res.overall.next}</b>: ${pct(res.overall.toNext)}</div>
                <div class="bar-track"><div class="bar-fill" style="width:${res.overall.toNext * 100}%"></div></div>
              </div>` : '<div class="small"><b>Максимальный уровень шкалы CEFR</b></div>'}
            ${delta !== null ? `<div class="small" style="margin-top:8px">По сравнению с прошлой попыткой: <b class="${delta > 0 ? 'tag-ok' : delta < 0 ? 'tag-bad' : ''}">${delta > 0 ? '+' : ''}${delta}</b> ${plural(Math.abs(delta), 'балл', 'балла', 'баллов')} (было ${res.prev.score}, ${esc(res.prev.level)})</div>` : ''}
          </div>
        </div>
      </section>

      <section class="card">
        <h2>Положение на шкале</h2>
        ${cefrScale(res)}
        <p class="muted small" style="margin:14px 0 0">Ваш балл — <b>${res.score}</b> из 100. Закрашенная зона — доверительный интервал (${res.scoreLo}–${res.scoreHi}): с вероятностью около 70% ваш истинный уровень находится в нём. Чем больше вопросов, тем уже интервал.</p>
      </section>

      <section class="card">
        <h2>Ваши оценки</h2>
        <div class="stats">
          <div class="stat"><div class="k">Общий балл</div><div class="v">${res.score}<small>/100</small></div></div>
          <div class="stat"><div class="k">Cambridge English Scale</div><div class="v">${res.cambridge}<small>/230</small></div></div>
          <div class="stat"><div class="k">≈ IELTS</div><div class="v">${res.ielts.toFixed(1)}</div></div>
          <div class="stat"><div class="k">≈ TOEFL iBT</div><div class="v">${res.toefl === null ? '&lt; 42' : res.toefl}<small>/120</small></div></div>
          <div class="stat"><div class="k">Экзамен Cambridge</div><div class="v sm">${info.exam ? esc(info.exam) : '—'}</div><div class="k">${nextExam ? 'следующая цель: ' + esc(nextExam) : 'высший уровень'}</div></div>
          <div class="stat"><div class="k">Словарный запас</div><div class="v">≈ ${res.vocab.toLocaleString('ru-RU')}<small> слов</small></div></div>
          <div class="stat"><div class="k">Оценка по 5-балльной</div><div class="v">${schoolGrade(res.overall)}</div></div>
          <div class="stat"><div class="k">Верных ответов</div><div class="v">${res.correct}<small>/${res.total} · ${pct(accuracy)}</small></div></div>
          <div class="stat"><div class="k">Надёжность оценки</div><div class="v sm tag-${relCls}">${relText}</div><div class="k">± ${Math.round((res.scoreHi - res.scoreLo) / 2)} ${plural(Math.round((res.scoreHi - res.scoreLo) / 2), 'балл', 'балла', 'баллов')}</div></div>
          <div class="stat"><div class="k">Стабильность ответов</div><div class="v sm tag-${conCls}">${conText}</div><div class="k">${pct(res.consistency)} ответов согласуются с уровнем</div></div>
          <div class="stat"><div class="k">Время</div><div class="v">${fmtTime(res.time)}</div><div class="k">${Math.round(avgPerQ / 1000)} с/вопрос · ${paceLabel(avgPerQ)}</div></div>
          <div class="stat"><div class="k">«Не знаю» / ошибок</div><div class="v">${res.idk}<small> / ${res.total - res.correct - res.idk}</small></div></div>
        </div>
        <p class="muted small" style="margin:14px 0 0">IELTS, TOEFL, Cambridge Scale и словарный запас — примерные соответствия, рассчитанные по вашему уровню на шкале CEFR.</p>
      </section>

      <section class="card">
        <h2>Навыки</h2>
        <div class="bars">
          ${res.sections.map(s => bar(s.name, s.score / 100, `<b>${esc(s.level)}</b> · ${s.c}/${s.n}`, barColor(s.acc))).join('')}
        </div>
        <div class="pace-row">
          ${res.sections.map(s => `<div class="pace"><span class="muted small">${s.name}</span><b>${Math.round(s.avgTime / 1000)} с</b><span class="muted small">на вопрос</span></div>`).join('')}
        </div>
      </section>

      <section class="card">
        <h2>Темы</h2>
        <div class="bars">
          ${topics.map(t => bar(t.name, t.acc, `<b>${t.c}</b>/${t.n}`)).join('')}
        </div>
      </section>

      <section class="card">
        <h2>Результат по уровням сложности</h2>
        <div class="bars">
          ${res.levels.map(l => bar(`${l.level} <span class="muted small">${LEVEL_INFO[l.level].name}</span>`, l.acc, `<b>${l.c}</b>/${l.n}`)).join('')}
        </div>
      </section>

      <section class="card">
        <h2>Готовность к целям</h2>
        <div class="bars">
          ${GOALS.map(g => {
            const v = Math.max(0, Math.min(1, 1 - (g.req - res.theta) / 2));
            return bar(g.name, v, v >= 1 ? '<b class="tag-ok">готовы</b>' : `<b>${pct(v)}</b>`, v >= 1 ? 'var(--ok)' : v >= 0.5 ? 'var(--accent)' : 'var(--warn)');
          }).join('')}
        </div>
      </section>

      <section class="two-col">
        <div class="card">
          <h3 class="tag-ok">Сильные стороны</h3>
          <ul class="plain-list">${strengths.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
        <div class="card">
          <h3 class="tag-bad">Над чем поработать</h3>
          <ul class="plain-list">${weaknesses.length ? weaknesses.map(s => `<li>${esc(s)}</li>`).join('') : '<li>Слабых мест не найдено — отличная работа!</li>'}</ul>
        </div>
      </section>

      <section class="two-col">
        <div class="card">
          <h3>Что вы умеете на уровне ${esc(res.overall.base)}</h3>
          <ul class="plain-list">${info.can.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
        <div class="card">
          <h3>Рекомендации</h3>
          <ul class="plain-list">${info.rec.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
      </section>

      <section class="card">
        <h2>Разбор ошибок <span class="muted small">(${wrong.length})</span></h2>
        ${wrong.length ? `
        <div class="filter-row no-print" id="filters">
          <button class="btn active" data-f="all">Все</button>
          ${SECTIONS.filter(s => wrong.some(w => w.section === s.key)).map(s => `<button class="btn" data-f="${s.key}">${s.name}</button>`).join('')}
        </div>
        <div id="review">${wrong.map(reviewItem).join('')}</div>` : '<p>Ни одной ошибки — превосходно!</p>'}
      </section>

      <section class="btn-row no-print" style="margin-bottom:12px">
        <button class="btn btn-primary" id="again">Пройти заново</button>
        <button class="btn" id="copy">Скопировать результат</button>
        <button class="btn" id="print">Сохранить в PDF</button>
      </section>
    `;

    document.getElementById('again').onclick = () => { renderStart(); window.scrollTo(0, 0); };
    document.getElementById('print').onclick = () => window.print();
    document.getElementById('copy').onclick = () => {
      const text = `Мой уровень английского: ${res.overall.label} (${info.name}). Балл: ${res.score}/100, Cambridge Scale: ${res.cambridge}, ≈ IELTS ${res.ielts.toFixed(1)}. ` +
        res.sections.map(s => `${s.name}: ${s.level}`).join(', ') + '. ' + location.href;
      const done = () => toast('Результат скопирован');
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => toast('Не удалось скопировать'));
      else toast('Копирование недоступно');
    };
    const filters = document.getElementById('filters');
    if (filters) filters.onclick = e => {
      const b = e.target.closest('[data-f]');
      if (!b) return;
      filters.querySelectorAll('.btn').forEach(x => x.classList.toggle('active', x === b));
      const f = b.dataset.f;
      document.getElementById('review').innerHTML = wrong.filter(w => f === 'all' || w.section === f).map(reviewItem).join('');
    };
    window.scrollTo(0, 0);
  }

  function reviewItem(r) {
    const it = BY_ID[r.id];
    if (!it) return '';
    const context = it.section === 'reading' ? `Текст «${window.TEST_DATA.reading[it.passage].title}»`
      : it.section === 'listening' ? `Запись: «${it.audio}»` : '';
    const topic = it.t && window.TOPICS ? window.TOPICS[it.t] : '';
    return `
      <div class="review-item">
        <div class="meta">${SECTION_NAME[it.section]} · ${it.level}${topic ? ' · ' + esc(topic) : ''}${context ? ' · ' + esc(context) : ''}</div>
        <div class="q">${fmtQuestion(it.q)}</div>
        <div class="ans">
          ${r.chosen === -1 ? '<span class="muted">Вы ответили «Не знаю»</span>' : `Ваш ответ: <span class="pill pill-bad">${esc(it.o[r.chosen])}</span>`}
          &nbsp;Верно: <span class="pill pill-ok">${esc(it.o[0])}</span>
        </div>
        ${it.exp ? `<div class="exp">${esc(it.exp)}</div>` : ''}
      </div>`;
  }

  // ---------- init ----------
  document.getElementById('home-link').onclick = e => {
    e.preventDefault();
    if (state && !confirm('Выйти на главную? Прогресс сохранится, тест можно будет продолжить.')) return;
    if (state) { pauseClock(); persist(); }
    document.onkeydown = null;
    renderStart();
  };
  window.addEventListener('beforeunload', () => { if (state) persist(); });
  document.addEventListener('visibilitychange', () => {
    if (!state) return;
    if (document.hidden) { pauseClock(); persist(); }
    else if (document.querySelector('.opt')) resumeClock();
  });

  renderStart();
})();
