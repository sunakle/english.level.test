(function () {
  'use strict';

  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const PASS = 0.6;   // доля верных, чтобы уровень считался освоенным
  const STOP = 0.4;   // ниже этого — дальше уровни не засчитываются

  const LEVEL_INFO = {
    'Pre-A1': {
      name: 'Starter', ielts: '< 2.0', toefl: '—',
      desc: 'Вы делаете первые шаги в английском. Знакомы отдельные слова, но построить фразу пока сложно.',
      can: ['Узнаёте знакомые слова и простые фразы', 'Понимаете цифры, цвета, приветствия'],
      rec: ['Начните с алфавита, чисел и базовых фраз', 'Учите 10 новых слов в день с карточками', 'Освойте глагол to be и Present Simple']
    },
    A1: {
      name: 'Beginner', ielts: '2.0 – 2.5', toefl: '—',
      desc: 'Вы понимаете и используете простые фразы о себе и повседневных вещах.',
      can: ['Представиться и рассказать о себе', 'Задать простые вопросы и ответить на них', 'Понимать медленную, чёткую речь'],
      rec: ['Отработайте Present Simple и Past Simple', 'Расширяйте словарь по темам: семья, еда, город', 'Слушайте адаптированные подкасты для начинающих']
    },
    A2: {
      name: 'Elementary', ielts: '3.0 – 3.5', toefl: '< 42',
      desc: 'Вы справляетесь в простых бытовых ситуациях и понимаете короткие тексты на знакомые темы.',
      can: ['Общаться в магазине, кафе, на вокзале', 'Описывать прошлые события простыми словами', 'Читать короткие письма и объявления'],
      rec: ['Разберите Present Perfect и разницу с Past Simple', 'Читайте адаптированные книги уровня A2–B1', 'Начните учить фразовые глаголы']
    },
    B1: {
      name: 'Intermediate', ielts: '4.0 – 5.0', toefl: '42 – 71',
      desc: 'Вы можете поддержать разговор на знакомые темы, понимаете основную мысль ясной речи.',
      can: ['Справиться с большинством ситуаций в путешествии', 'Рассказать о планах, опыте, мнении', 'Понимать главное в новостях и сериалах с субтитрами'],
      rec: ['Отработайте условные предложения и пассив', 'Смотрите сериалы с английскими субтитрами', 'Пишите короткие эссе и просите обратную связь']
    },
    B2: {
      name: 'Upper-Intermediate', ielts: '5.5 – 6.5', toefl: '72 – 94',
      desc: 'Вы свободно общаетесь с носителями, понимаете сложные тексты и аргументированно излагаете мысли.',
      can: ['Обсуждать абстрактные и профессиональные темы', 'Понимать фильмы и лекции без адаптации', 'Писать подробные и связные тексты'],
      rec: ['Работайте над коллокациями и идиомами', 'Читайте оригинальную прессу (The Guardian, BBC)', 'Тренируйте инверсию и сложные времена']
    },
    C1: {
      name: 'Advanced', ielts: '7.0 – 8.0', toefl: '95 – 113',
      desc: 'Вы владеете языком гибко и эффективно — в учёбе, работе и общении, понимаете подтекст.',
      can: ['Понимать длинные сложные тексты и скрытый смысл', 'Говорить спонтанно, не подбирая слова', 'Использовать язык в академической и деловой среде'],
      rec: ['Расширяйте редкую лексику и регистры речи', 'Читайте художественную и научную литературу', 'Готовьтесь к CAE или IELTS Academic']
    },
    C2: {
      name: 'Proficiency', ielts: '8.5 – 9.0', toefl: '114 – 120',
      desc: 'Ваш уровень близок к носителю: вы понимаете практически всё и выражаетесь точно и тонко.',
      can: ['Понимать любую устную и письменную речь', 'Различать тонкие оттенки значений', 'Свободно обобщать информацию из разных источников'],
      rec: ['Поддерживайте уровень: литература, дебаты, письмо', 'Попробуйте сдать CPE для подтверждения уровня', 'Изучайте стилистику и редкие идиомы']
    }
  };

  const SECTIONS = [
    { key: 'grammar', name: 'Грамматика', desc: 'Времена, условные предложения, инверсия и сложные конструкции.' },
    { key: 'vocabulary', name: 'Лексика', desc: 'Слова, фразовые глаголы и устойчивые выражения.' },
    { key: 'reading', name: 'Чтение', desc: 'Прочитайте тексты и ответьте на вопросы по ним.' },
    { key: 'listening', name: 'Аудирование', desc: 'Прослушайте фразу (максимум 2 раза) и выберите ответ. Включите звук.' }
  ];
  const SECTION_NAME = Object.fromEntries(SECTIONS.map(s => [s.key, s.name]));

  const PROGRESS_KEY = 'elt_progress_v1';
  const HISTORY_KEY = 'elt_history_v1';
  const LAST_KEY = 'elt_last_v1';
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
    const total = ITEMS.length;

    app.innerHTML = `
      <section class="card hero">
        <h1>Узнайте свой уровень английского</h1>
        <p>Полноценный тест по международной шкале CEFR: ${total} ${plural(total, 'вопрос', 'вопроса', 'вопросов')} от A1 до C2 в четырёх разделах. В конце — уровень, баллы, оценка по каждому навыку и разбор ошибок.</p>
        <ul class="facts">
          <li><b>~20–25</b> минут</li>
          <li><b>${total}</b> заданий</li>
          <li><b>4</b> навыка</li>
          <li><b>6</b> уровней</li>
        </ul>
        <div class="btn-row">
          ${saved ? `<button class="btn btn-primary" id="resume">Продолжить тест (${saved.i + 1}/${total})</button>
                     <button class="btn" id="start">Начать заново</button>`
                  : `<button class="btn btn-primary" id="start">Начать тест</button>`}
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
        <p class="muted small" style="margin-top:16px">Вопросы идут от простых к сложным. Если не знаете ответ — нажмите «Не знаю», а не угадывайте: так результат будет точнее. Вернуться к предыдущему вопросу нельзя.</p>
      </section>

      ${history.length ? `
      <section class="card">
        <h2>История попыток</h2>
        <ul class="history-list">
          ${history.slice(-6).reverse().map(h => `
            <li><span>${new Date(h.date).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            <span><span class="lvl-chip">${esc(h.level)}</span> · ${h.score}/100 · ${fmtTime(h.time)}</span></li>`).join('')}
        </ul>
      </section>` : ''}
    `;

    document.getElementById('start').onclick = startNew;
    const r = document.getElementById('resume');
    if (r) r.onclick = () => { state = saved; resumeClock(); next(); };
    const l = document.getElementById('last');
    if (l) l.onclick = () => renderResults(last, false);
  }

  function startNew() {
    const perms = {};
    ITEMS.forEach(it => { perms[it.id] = shuffle(it.o.map((_, i) => i)); });
    state = {
      order: ITEMS.map(x => x.id),
      perms,
      answers: {},
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
    const count = ITEMS.filter(x => x.section === key).length;
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
  function levelStats(rows) {
    return LEVELS.map(l => {
      const xs = rows.filter(r => r.level === l);
      const c = xs.filter(r => r.ok).length;
      return { level: l, n: xs.length, c, acc: xs.length ? c / xs.length : 0 };
    });
  }

  // Уровень = самый высокий освоенный (≥60%) уровень, пока не встретится провал (<40%).
  // «+» — если следующий уровень освоен частично.
  function cefr(rows) {
    const st = levelStats(rows);
    let res = -1;
    for (let k = 0; k < st.length; k++) {
      if (!st[k].n) continue;
      if (st[k].acc >= PASS) res = k;
      else if (st[k].acc < STOP) break;
    }
    let plus = false;
    if (res < LEVELS.length - 1) {
      const nxt = st[res + 1];
      if (nxt && nxt.n && nxt.acc >= STOP && nxt.acc < PASS) plus = true;
    }
    return { idx: res, base: res < 0 ? 'Pre-A1' : LEVELS[res], label: (res < 0 ? 'Pre-A1' : LEVELS[res]) + (plus && res >= 0 ? '+' : '') };
  }

  function computeResult() {
    const rows = state.order.map(id => {
      const it = BY_ID[id];
      const a = state.answers[id];
      return { id, section: it.section, level: it.level, chosen: a === undefined ? -1 : a, ok: a === 0 };
    });
    const weights = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
    const wTotal = rows.reduce((s, r) => s + weights[r.level], 0);
    const wGot = rows.reduce((s, r) => s + (r.ok ? weights[r.level] : 0), 0);
    const correct = rows.filter(r => r.ok).length;
    const sections = SECTIONS.map(s => {
      const xs = rows.filter(r => r.section === s.key);
      const c = xs.filter(r => r.ok).length;
      return { key: s.key, name: s.name, n: xs.length, c, acc: xs.length ? c / xs.length : 0, level: cefr(xs).label };
    });
    return {
      date: Date.now(),
      time: elapsed(),
      rows,
      total: rows.length,
      correct,
      idk: rows.filter(r => r.chosen === -1).length,
      score: Math.round((wGot / wTotal) * 100),
      overall: cefr(rows),
      sections,
      levels: levelStats(rows)
    };
  }

  // Оценка по 5-балльной шкале от итогового уровня, чтобы не противоречить ему
  function schoolGrade(overall) {
    return [2, 2, 3, 4, 4, 5, 5][overall.idx + 1];
  }

  function finish() {
    stopTimer();
    pauseClock();
    const res = computeResult();
    save(PROGRESS_KEY, null);
    save(LAST_KEY, res);
    const history = load(HISTORY_KEY) || [];
    history.push({ date: res.date, level: res.overall.label, score: res.score, time: res.time });
    save(HISTORY_KEY, history.slice(-30));
    state = null;
    renderResults(res, true);
  }

  // ---------- results ----------
  function renderResults(res, fresh) {
    stopTimer();
    document.onkeydown = null;
    const info = LEVEL_INFO[res.overall.base];
    const pct = res.correct / res.total;
    const ringPct = Math.max(4, ((res.overall.idx + 1) / LEVELS.length) * 100);
    const sorted = res.sections.slice().sort((a, b) => b.acc - a.acc);
    const best = sorted[0], worst = sorted[sorted.length - 1];
    const wrong = res.rows.filter(r => !r.ok);
    const avgPerQ = res.time / res.total;

    const strengths = [], weaknesses = [];
    res.sections.forEach(s => {
      if (s.acc >= 0.75) strengths.push(`${s.name} — ${Math.round(s.acc * 100)}% верных`);
      else if (s.acc < 0.5) weaknesses.push(`${s.name} — ${Math.round(s.acc * 100)}% верных`);
    });
    if (!strengths.length) strengths.push(`Лучший раздел: ${best.name} (${Math.round(best.acc * 100)}%)`);
    if (!weaknesses.length && worst.acc < 1) weaknesses.push(`Есть куда расти: ${worst.name} (${Math.round(worst.acc * 100)}%)`);
    if (res.idk > res.total * 0.2) weaknesses.push(`Много ответов «Не знаю» (${res.idk}) — стоит расширить словарный запас`);
    if (avgPerQ < 6000) weaknesses.push('Вы отвечали очень быстро — попробуйте читать вопросы внимательнее');

    const barColor = a => a >= 0.75 ? 'var(--ok)' : a >= 0.5 ? 'var(--accent)' : a >= 0.3 ? 'var(--warn)' : 'var(--bad)';

    app.innerHTML = `
      <section class="card">
        <div class="result-hero">
          <div class="level-ring" style="background:conic-gradient(var(--accent) ${ringPct}%, var(--line) 0)">
            <div class="inner"><div><b>${esc(res.overall.label)}</b><span>${info.name}</span></div></div>
          </div>
          <div>
            <div class="muted small">${fresh ? 'Тест завершён' : 'Последний результат'} · ${new Date(res.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <h1>Ваш уровень: ${esc(res.overall.label)} — ${info.name}</h1>
            <p class="muted" style="margin:0">${info.desc}</p>
          </div>
        </div>
      </section>

      <section class="card">
        <h2>Ваши оценки</h2>
        <div class="stats">
          <div class="stat"><div class="k">Общий балл</div><div class="v">${res.score}<small>/100</small></div></div>
          <div class="stat"><div class="k">Верных ответов</div><div class="v">${res.correct}<small>/${res.total} · ${Math.round(pct * 100)}%</small></div></div>
          <div class="stat"><div class="k">Оценка по 5-балльной</div><div class="v">${schoolGrade(res.overall)}</div></div>
          <div class="stat"><div class="k">≈ IELTS</div><div class="v">${info.ielts}</div></div>
          <div class="stat"><div class="k">≈ TOEFL iBT</div><div class="v">${info.toefl}</div></div>
          <div class="stat"><div class="k">Время</div><div class="v">${fmtTime(res.time)}<small> · ${Math.round(avgPerQ / 1000)} с/вопрос</small></div></div>
          <div class="stat"><div class="k">«Не знаю»</div><div class="v">${res.idk}</div></div>
          <div class="stat"><div class="k">Ошибок</div><div class="v">${res.total - res.correct - res.idk}</div></div>
        </div>
        <p class="muted small" style="margin:14px 0 0">Общий балл учитывает сложность: верный ответ уровня C2 весит в 6 раз больше, чем A1. IELTS и TOEFL — примерное соответствие.</p>
      </section>

      <section class="card">
        <h2>Навыки</h2>
        <div class="bars">
          ${res.sections.map(s => `
            <div class="bar-row">
              <span>${s.name}</span>
              <div class="bar-track"><div class="bar-fill" style="width:${s.acc * 100}%;background:${barColor(s.acc)}"></div></div>
              <span class="bar-val"><b>${esc(s.level)}</b> · ${Math.round(s.acc * 100)}%</span>
            </div>`).join('')}
        </div>
      </section>

      <section class="card">
        <h2>Результат по уровням сложности</h2>
        <div class="bars">
          ${res.levels.map(l => `
            <div class="bar-row">
              <span>${l.level} <span class="muted small">${LEVEL_INFO[l.level].name}</span></span>
              <div class="bar-track"><div class="bar-fill" style="width:${l.acc * 100}%;background:${barColor(l.acc)}"></div></div>
              <span class="bar-val"><b>${l.c}</b>/${l.n}</span>
            </div>`).join('')}
        </div>
        <p class="muted small" style="margin:14px 0 0">Уровень считается освоенным, если на нём дано не меньше 60% верных ответов.</p>
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
      const text = `Мой уровень английского: ${res.overall.label} (${info.name}). Балл: ${res.score}/100, верных ответов: ${res.correct}/${res.total}. ` +
        res.sections.map(s => `${s.name}: ${Math.round(s.acc * 100)}%`).join(', ') + '. ' + location.href;
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
    const context = it.section === 'reading' ? `Текст «${window.TEST_DATA.reading[it.passage].title}»`
      : it.section === 'listening' ? `Запись: «${it.audio}»` : '';
    return `
      <div class="review-item">
        <div class="meta">${SECTION_NAME[it.section]} · ${it.level}${context ? ' · ' + esc(context) : ''}</div>
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
