// Тест з української мови. Та сама модель оцінювання, що й в англійському тесті (app.js),
// але власний банк питань, український інтерфейс і українські шкали результату.
(function () {
  'use strict';

  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // ---------- модель оцінювання (IRT, 3 параметри) ----------
  const DIFF = { A1: -2.5, A2: -1.5, B1: -0.5, B2: 0.5, C1: 1.5, C2: 2.5 };
  const BOUNDS = [-3, -2, -1, 0, 1, 2];
  const DISC = 1.6;
  const GUESS = 0.25;
  const SCORE_POINTS = [[-4, 0], [-3, 10], [-2, 25], [-1, 40], [0, 55], [1, 70], [2, 85], [4, 100]];

  const LEVEL_INFO = {
    'Pre-A1': {
      name: 'Початківець',
      desc: 'Ви робите перші кроки в українській. Знаєте окремі слова, але скласти речення поки складно.',
      can: ['Розумієте окремі знайомі слова', 'Знаєте привітання й прості фрази'],
      rec: ['Почніть з алфавіту, чисел і базових фраз', 'Вчіть 10 нових слів щодня', 'Слухайте прості дитячі пісні й мультфільми українською']
    },
    A1: {
      name: 'Елементарний',
      desc: 'Ви розумієте й використовуєте прості фрази про себе та повсякденні речі.',
      can: ['Представитися й розповісти про себе', 'Поставити просте запитання', 'Зрозуміти повільне чітке мовлення'],
      rec: ['Опануйте відмінювання дієслів у теперішньому часі', 'Вивчіть називний і знахідний відмінки', 'Дивіться мультфільми українською із субтитрами']
    },
    A2: {
      name: 'Передсередній',
      desc: 'Ви справляєтеся в простих побутових ситуаціях і розумієте короткі тексти на знайомі теми.',
      can: ['Спілкуватися в магазині, кафе, на вокзалі', 'Розповідати про минулі події', 'Читати короткі оголошення й листи'],
      rec: ['Вивчіть усі сім відмінків, особливо кличний', 'Читайте адаптовані тексти й новини для початківців', 'Звертайте увагу на кальки з російської']
    },
    B1: {
      name: 'Середній',
      desc: 'Ви можете підтримати розмову на знайомі теми й розумієте основну думку чіткого мовлення.',
      can: ['Вільно спілкуватися в побуті', 'Висловлювати думку й пояснювати плани', 'Розуміти головне в новинах і серіалах'],
      rec: ['Відпрацюйте числівники з іменниками', 'Читайте українські новинні сайти щодня', 'Слухайте подкасти українською']
    },
    B2: {
      name: 'Вищий за середній',
      desc: 'Ви вільно спілкуєтеся, розумієте складні тексти й аргументовано висловлюєтеся.',
      can: ['Обговорювати абстрактні й професійні теми', 'Розуміти фільми й лекції без адаптації', 'Писати докладні зв\'язні тексти'],
      rec: ['Працюйте над мовною нормою: кальки, керування, прийменники', 'Читайте сучасну українську літературу', 'Вивчайте фразеологізми']
    },
    C1: {
      name: 'Високий',
      desc: 'Ви володієте мовою гнучко й ефективно в навчанні, роботі та спілкуванні, розумієте підтекст.',
      can: ['Розуміти складні тексти й прихований зміст', 'Говорити спонтанно, не добираючи слів', 'Використовувати мову в діловому й академічному середовищі'],
      rec: ['Опануйте чинний правопис (2019)', 'Читайте класику й публіцистику', 'Пишіть есеї та ділові листи']
    },
    C2: {
      name: 'Досконалий',
      desc: 'Ви володієте мовою на рівні освіченого носія: розумієте все й висловлюєтеся точно й тонко.',
      can: ['Розуміти будь-яке усне й письмове мовлення', 'Розрізняти найтонші відтінки значень', 'Редагувати тексти й дбати про норму'],
      rec: ['Підтримуйте рівень: література, публічні виступи, письмо', 'Стежте за змінами правопису', 'Спробуйте себе в редагуванні чи перекладі']
    }
  };

  const GOALS = [
    { name: 'Побутове спілкування', req: -2 },
    { name: 'Новини й соцмережі українською', req: -1 },
    { name: 'Фільми й серіали без субтитрів', req: -0.5 },
    { name: 'Робота в українській компанії', req: 0 },
    { name: 'Навчання в українському виші', req: 0.5 },
    { name: 'Ділове листування й документи', req: 1 },
    { name: 'Художня література в оригіналі', req: 1.4 },
    { name: 'Редагування й переклад', req: 2 }
  ];

  const SECTIONS = [
    { key: 'grammar', name: 'Граматика', desc: 'Відмінки, кличний відмінок, числівники, дієприслівники, правопис і мовна норма.' },
    { key: 'vocabulary', name: 'Лексика', desc: 'Значення слів, кальки й суржик, фразеологізми, пароніми.' },
    { key: 'reading', name: 'Читання', desc: 'Прочитайте тексти й дайте відповіді на запитання.' },
    { key: 'listening', name: 'Аудіювання', desc: 'Прослухайте фразу (не більше 2 разів) і оберіть відповідь. Увімкніть звук.' }
  ];
  const SECTION_NAME = Object.fromEntries(SECTIONS.map(s => [s.key, s.name]));

  const MODES = {
    full: { name: 'Повний тест', time: '25–30 хвилин', per: { grammar: 4, vocabulary: 3, listening: 2 }, bands: ['easy', 'mid', 'hard'],
      desc: 'Максимальна точність. Радимо для першої перевірки.' },
    quick: { name: 'Експрес-тест', time: '10–15 хвилин', per: { grammar: 2, vocabulary: 2, listening: 1 }, bands: ['mid'],
      desc: 'Швидка оцінка рівня, похибка більша.' }
  };

  const PROGRESS_KEY = 'uk_progress_v1';
  const HISTORY_KEY = 'uk_history_v1';
  const LAST_KEY = 'uk_last_v1';
  const MODE_KEY = 'uk_mode_v1';
  const MAX_PLAYS = 2;

  const DATA = window.UK_TEST_DATA;
  const TOPICS = window.UK_TOPICS;
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
    } catch (e) { /* сховище недоступне — працюємо без нього */ }
  }

  // ---------- data ----------
  function buildItems() {
    const items = [];
    DATA.grammar.forEach((x, i) => items.push(Object.assign({ id: 'g' + i, section: 'grammar' }, x)));
    DATA.vocabulary.forEach((x, i) => items.push(Object.assign({ id: 'v' + i, section: 'vocabulary' }, x)));
    DATA.reading.forEach((p, pi) => p.questions.forEach((x, i) =>
      items.push(Object.assign({ id: 'r' + pi + '_' + i, section: 'reading', passage: pi }, x))));
    DATA.listening.forEach((x, i) => items.push(Object.assign({ id: 'l' + i, section: 'listening' }, x)));
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

  function buildTest(modeKey) {
    const mode = MODES[modeKey];
    const ids = [];
    ['grammar', 'vocabulary'].forEach(sec => {
      LEVELS.forEach(l => {
        shuffle(ITEMS.filter(x => x.section === sec && x.level === l)).slice(0, mode.per[sec]).forEach(x => ids.push(x.id));
      });
    });
    mode.bands.forEach(band => {
      const options = DATA.reading.map((p, i) => ({ p, i })).filter(x => x.p.band === band);
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
      const ps = DATA.reading.filter(p => p.band === band);
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
    save(PROGRESS_KEY, Object.assign({}, state, { elapsed: elapsed(), resumedAt: null }));
  }
  function stopSpeech() {
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { }
  }
  function ukVoice() {
    if (!('speechSynthesis' in window)) return null;
    return speechSynthesis.getVoices().find(v => /^uk/i.test(v.lang)) || null;
  }

  // ---------- стартовий екран ----------
  function renderStart() {
    stopTimer();
    stopSpeech();
    state = null;
    const saved = load(PROGRESS_KEY);
    const history = load(HISTORY_KEY) || [];
    const last = load(LAST_KEY);
    let mode = load(MODE_KEY) || 'full';
    if (!MODES[mode]) mode = 'full';

    app.innerHTML = `
      <section class="card hero">
        <div class="sk-badge uk-badge">УКРАЇНСЬКА</div>
        <h1 style="margin-top:10px">Дізнайтеся свій рівень української</h1>
        <p>Тест за міжнародною шкалою CEFR (A1–C2): граматика, лексика, читання й аудіювання. Окремо перевіряємо мовну норму: кальки, суржик, кличний відмінок і чинний правопис. Банк із ${ITEMS.length} завдань — кожна спроба складається заново.</p>

        ${saved ? `
        <div class="resume-box">
          <div><b>У вас є незавершений тест</b><div class="muted small">${MODES[saved.mode] ? MODES[saved.mode].name : 'Тест'} · питання ${saved.i + 1} з ${saved.order.length}</div></div>
          <button class="btn btn-primary" id="resume">Продовжити</button>
        </div>` : ''}

        <div class="modes" role="radiogroup" aria-label="Режим тесту">
          ${Object.entries(MODES).map(([k, m]) => `
            <button class="mode ${k === mode ? 'selected' : ''}" data-mode="${k}" role="radio" aria-checked="${k === mode}">
              <b>${m.name}</b>
              <span class="mode-meta">${testSize(k)} ${plural(testSize(k), 'завдання', 'завдання', 'завдань')} · ${m.time}</span>
              <span class="muted small">${m.desc}</span>
            </button>`).join('')}
        </div>

        <div class="btn-row">
          <button class="btn btn-primary" id="start">${saved ? 'Почати новий тест' : 'Почати тест'}</button>
          ${last ? `<button class="btn btn-ghost" id="last">Останній результат</button>` : ''}
        </div>
      </section>

      <section class="card">
        <h2>Що перевіряє тест</h2>
        <div class="sections-grid">
          ${SECTIONS.map((s, i) => `<div class="sec-tile"><b>${i + 1}. ${s.name}</b><span>${s.desc}</span></div>`).join('')}
        </div>
        <h3>Шкала CEFR</h3>
        <div class="levels-scale">
          ${LEVELS.map(l => `<div><b>${l}</b>${LEVEL_INFO[l].name}</div>`).join('')}
        </div>
        <h3 style="margin-top:20px">Як рахується результат</h3>
        <p class="muted small" style="margin:0">Використовується модель IRT, як в адаптивних іспитах: враховується складність кожного питання та ймовірність угадування. Якщо не знаєте відповіді — натисніть «Не знаю», так оцінка буде точнішою. Повернутися до попереднього питання не можна.</p>
      </section>

      ${history.length ? `
      <section class="card">
        <h2>Історія спроб</h2>
        <ul class="history-list">
          ${history.slice(-8).reverse().map(h => `
            <li><span>${new Date(h.date).toLocaleString('uk-UA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}${MODES[h.mode] ? ' · <span class="muted">' + MODES[h.mode].name + '</span>' : ''}</span>
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
    state = { mode, order, perms, answers: {}, qtime: {}, plays: {}, introSeen: {}, i: 0, elapsed: 0, resumedAt: null };
    save(PROGRESS_KEY, null);
    resumeClock();
    next();
  }

  // ---------- хід тесту ----------
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
        <div class="step">Розділ ${idx + 1} з ${SECTIONS.length}</div>
        <h2>${sec.name}</h2>
        <p>${sec.desc}<br>${count} ${plural(count, 'питання', 'питання', 'питань')}.</p>
        <button class="btn btn-primary" id="go">Почати розділ</button>
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
    const passage = it.section === 'reading' ? DATA.reading[it.passage] : null;
    const isListening = it.section === 'listening';
    const hasVoice = !!ukVoice();
    const plays = state.plays[it.id] || 0;
    const shownAt = Date.now();
    let selected = null;

    app.innerHTML = `
      <section class="card">
        <div class="test-head">
          <span class="badge">${SECTION_NAME[it.section]}</span>
          <span>Питання ${state.i + 1} з ${total}</span>
          <span class="timer" id="timer">${fmtTime(elapsed())}</span>
        </div>
        <div class="progress"><div style="width:${(state.i / total) * 100}%"></div></div>

        ${passage ? `<div class="passage"><h3>${esc(passage.title)}</h3><p>${esc(passage.text)}</p></div>` : ''}

        ${isListening ? (hasVoice ? `
          <div class="audio-box">
            <button class="play-btn" id="play" aria-label="Прослухати" ${plays >= MAX_PLAYS ? 'disabled' : ''}>▶</button>
            <div><b>Прослухайте запис</b><div class="muted small" id="plays-left">Залишилось прослуховувань: ${MAX_PLAYS - plays}</div></div>
          </div>` : `
          <div class="passage"><p class="muted small">У вашому браузері немає українського голосу для озвучення, тому показуємо текст запису:</p><p><i>${esc(it.audio)}</i></p></div>`) : ''}

        <h2 class="question">${fmtQuestion(it.q)}</h2>
        <div class="options" role="listbox">
          ${perm.map((orig, k) => `<button class="opt" data-k="${k}" role="option"><kbd>${k + 1}</kbd><span>${esc(it.o[orig])}</span></button>`).join('')}
        </div>
        <div class="test-actions">
          <button class="btn btn-ghost" id="idk">Не знаю</button>
          <button class="btn btn-primary" id="submit" disabled>Відповісти</button>
        </div>
        <div class="hint">Клавіші 1–4 — вибір варіанта, Enter — відповісти.</div>
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

  function speak(it, btn) {
    const used = state.plays[it.id] || 0;
    if (used >= MAX_PLAYS || speechSynthesis.speaking) return;
    state.plays[it.id] = used + 1;
    persist();
    const u = new SpeechSynthesisUtterance(it.audio);
    const v = ukVoice();
    if (v) u.voice = v;
    u.lang = 'uk-UA';
    u.rate = LEVELS.indexOf(it.level) >= 4 ? 1 : 0.92;
    btn.classList.add('playing');
    btn.disabled = true;
    const left = document.getElementById('plays-left');
    if (left) left.textContent = 'Залишилось прослуховувань: ' + (MAX_PLAYS - state.plays[it.id]);
    u.onend = u.onerror = () => {
      btn.classList.remove('playing');
      btn.disabled = state.plays[it.id] >= MAX_PLAYS;
    };
    speechSynthesis.speak(u);
  }
  if ('speechSynthesis' in window) {
    try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => { }; } catch (e) { }
  }

  // ---------- оцінювання ----------
  function pCorrect(theta, b, withGuess) {
    const p = 1 / (1 + Math.exp(-DISC * (theta - b)));
    return withGuess ? GUESS + (1 - GUESS) * p : p;
  }

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

  function levelOf(theta) {
    let idx = -1;
    BOUNDS.forEach((b, i) => { if (theta >= b) idx = i; });
    const base = idx < 0 ? 'Pre-A1' : LEVELS[idx];
    let toNext = null;
    if (idx < LEVELS.length - 1) {
      const lo = idx < 0 ? -4 : BOUNDS[idx];
      toNext = Math.min(1, Math.max(0, (theta - lo) / (BOUNDS[idx + 1] - lo)));
    }
    const plus = idx >= 0 && toNext !== null && toNext >= 0.67;
    return { idx, base, label: base + (plus ? '+' : ''), toNext, next: idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null };
  }

  function computeResult() {
    const rows = state.order.map(id => {
      const it = BY_ID[id];
      const a = state.answers[id];
      return { id, section: it.section, level: it.level, topic: it.t, chosen: a === undefined ? -1 : a, ok: a === 0, time: state.qtime[id] || 0 };
    });
    const est = estimate(rows, 0, 2);
    const theta = est.theta;

    const sections = SECTIONS.map(s => {
      const xs = rows.filter(r => r.section === s.key);
      if (!xs.length) return null;
      const c = xs.filter(r => r.ok).length;
      const e = estimate(xs, theta, 1.2);
      return {
        key: s.key, name: s.name, n: xs.length, c, acc: c / xs.length,
        score: Math.round(interp(SCORE_POINTS, e.theta)), level: levelOf(e.theta).label,
        avgTime: xs.reduce((sum, r) => sum + r.time, 0) / xs.length
      };
    }).filter(Boolean);

    const topicMap = {};
    rows.forEach(r => {
      const t = topicMap[r.topic] || (topicMap[r.topic] = { key: r.topic, n: 0, c: 0 });
      t.n++;
      if (r.ok) t.c++;
    });
    const topics = Object.values(topicMap).map(t => Object.assign(t, { acc: t.c / t.n, name: TOPICS[t.key] || t.key }));

    let unexpected = 0;
    rows.forEach(r => {
      const b = DIFF[r.level];
      if (r.ok && b - theta >= 1.5) unexpected++;
      else if (!r.ok && pCorrect(theta, b, false) > 0.9) unexpected++;
    });

    return {
      v: 1,
      mode: state.mode,
      date: Date.now(),
      time: elapsed(),
      rows,
      total: rows.length,
      correct: rows.filter(r => r.ok).length,
      idk: rows.filter(r => r.chosen === -1).length,
      theta,
      score: Math.round(interp(SCORE_POINTS, theta)),
      scoreLo: Math.round(interp(SCORE_POINTS, theta - est.se)),
      scoreHi: Math.round(interp(SCORE_POINTS, theta + est.se)),
      overall: levelOf(theta),
      consistency: 1 - unexpected / rows.length,
      sections,
      topics,
      levels: LEVELS.map(l => {
        const xs = rows.filter(r => r.level === l);
        const c = xs.filter(r => r.ok).length;
        return { level: l, n: xs.length, c, acc: xs.length ? c / xs.length : 0 };
      })
    };
  }

  // 12-бальна шкала, як у школах України
  function grade12(score) {
    return Math.min(12, Math.max(1, Math.round(score / 100 * 12)));
  }

  function finish() {
    stopTimer();
    pauseClock();
    const res = computeResult();
    const history = load(HISTORY_KEY) || [];
    const prev = history.length ? history[history.length - 1] : null;
    if (prev) res.prev = { score: prev.score, level: prev.level };
    save(PROGRESS_KEY, null);
    save(LAST_KEY, res);
    history.push({ date: res.date, level: res.overall.label, score: res.score, time: res.time, mode: res.mode });
    save(HISTORY_KEY, history.slice(-30));
    state = null;
    renderResults(res, true);
  }

  // ---------- результати ----------
  function paceLabel(ms) {
    const s = ms / 1000;
    if (s < 8) return 'дуже швидко';
    if (s < 20) return 'упевнено';
    if (s < 40) return 'вдумливо';
    return 'повільно';
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
    if (!res || res.v !== 1) { renderStart(); return; }
    const info = LEVEL_INFO[res.overall.base];
    const accuracy = res.correct / res.total;
    const avgPerQ = res.time / res.total;
    const half = Math.round((res.scoreHi - res.scoreLo) / 2);
    const [relText, relCls] = half <= 5 ? ['висока', 'ok'] : half <= 9 ? ['середня', 'warn'] : ['низька', 'bad'];
    const [conText, conCls] = res.consistency >= 0.9 ? ['висока', 'ok'] : res.consistency >= 0.8 ? ['середня', 'warn'] : ['низька', 'bad'];
    const topics = res.topics.slice().sort((a, b) => a.acc - b.acc);
    const sorted = res.sections.slice().sort((a, b) => b.score - a.score);
    const wrong = res.rows.filter(r => !r.ok);
    const normTopics = ['russisms', 'norms', 'vocative', 'orthography'];
    const normRows = res.rows.filter(r => normTopics.includes(r.topic));
    const normAcc = normRows.length ? normRows.filter(r => r.ok).length / normRows.length : null;

    const strengths = [], weaknesses = [];
    res.sections.forEach(s => {
      if (s.score >= res.score + 5) strengths.push(`${s.name}: рівень ${s.level}, вище загального`);
      else if (s.score <= res.score - 5) weaknesses.push(`${s.name}: рівень ${s.level}, нижче загального`);
    });
    topics.filter(t => t.n >= 2 && t.acc === 1).slice(0, 3).forEach(t => strengths.push(`Тема «${t.name}» — без помилок`));
    topics.filter(t => t.n >= 2 && t.acc < 0.5).slice(0, 3).forEach(t => weaknesses.push(`Тема «${t.name}» — ${pct(t.acc)} правильних`));
    if (!strengths.length) strengths.push(`Найкращий розділ: ${sorted[0].name} (${sorted[0].level})`);
    if (res.idk > res.total * 0.2) weaknesses.push(`Багато відповідей «Не знаю» (${res.idk}) — варто розширити словниковий запас`);
    if (avgPerQ < 6000) weaknesses.push('Ви відповідали дуже швидко — читайте питання уважніше');
    if (res.consistency < 0.8) weaknesses.push('Відповіді непослідовні: можливо, частину правильних відповідей угадано');

    const delta = res.prev ? res.score - res.prev.score : null;

    app.innerHTML = `
      <section class="card">
        <div class="result-hero">
          <div class="level-ring" style="background:conic-gradient(var(--accent) ${res.score}%, var(--line) 0)">
            <div class="inner"><div><b>${esc(res.overall.label)}</b><span>${info.name}</span></div></div>
          </div>
          <div>
            <div class="muted small">${fresh ? 'Тест завершено' : 'Останній результат'} · ${MODES[res.mode] ? MODES[res.mode].name : ''} · ${new Date(res.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <h1>Ваш рівень: ${esc(res.overall.label)} — ${info.name}</h1>
            <p class="muted" style="margin:0 0 10px">${info.desc}</p>
            ${res.overall.next ? `
              <div class="next-level">
                <div class="small">До рівня <b>${res.overall.next}</b>: ${pct(res.overall.toNext)}</div>
                <div class="bar-track"><div class="bar-fill" style="width:${res.overall.toNext * 100}%"></div></div>
              </div>` : '<div class="small"><b>Найвищий рівень шкали CEFR</b></div>'}
            ${delta !== null ? `<div class="small" style="margin-top:8px">Порівняно з минулою спробою: <b class="${delta > 0 ? 'tag-ok' : delta < 0 ? 'tag-bad' : ''}">${delta > 0 ? '+' : ''}${delta}</b> (було ${res.prev.score}, ${esc(res.prev.level)})</div>` : ''}
          </div>
        </div>
      </section>

      <section class="card">
        <h2>Положення на шкалі</h2>
        ${cefrScale(res)}
        <p class="muted small" style="margin:14px 0 0">Ваш бал — <b>${res.score}</b> зі 100. Зафарбована зона — довірчий інтервал (${res.scoreLo}–${res.scoreHi}): з імовірністю близько 70% ваш справжній рівень у його межах.</p>
      </section>

      <section class="card">
        <h2>Ваші оцінки</h2>
        <div class="stats">
          <div class="stat"><div class="k">Загальний бал</div><div class="v">${res.score}<small>/100</small></div></div>
          <div class="stat"><div class="k">За 12-бальною шкалою</div><div class="v">${grade12(res.score)}<small>/12</small></div></div>
          <div class="stat"><div class="k">Правильних відповідей</div><div class="v">${res.correct}<small>/${res.total} · ${pct(accuracy)}</small></div></div>
          <div class="stat"><div class="k">Мовна норма</div><div class="v">${normAcc === null ? '—' : pct(normAcc)}</div><div class="k">кальки, суржик, кличний, правопис</div></div>
          <div class="stat"><div class="k">Надійність оцінки</div><div class="v sm tag-${relCls}">${relText}</div><div class="k">± ${half} ${plural(half, 'бал', 'бали', 'балів')}</div></div>
          <div class="stat"><div class="k">Стабільність відповідей</div><div class="v sm tag-${conCls}">${conText}</div><div class="k">${pct(res.consistency)} відповідей узгоджуються з рівнем</div></div>
          <div class="stat"><div class="k">Час</div><div class="v">${fmtTime(res.time)}</div><div class="k">${Math.round(avgPerQ / 1000)} с/питання · ${paceLabel(avgPerQ)}</div></div>
          <div class="stat"><div class="k">«Не знаю» / помилок</div><div class="v">${res.idk}<small> / ${res.total - res.correct - res.idk}</small></div></div>
        </div>
      </section>

      <section class="card">
        <h2>Навички</h2>
        <div class="bars">
          ${res.sections.map(s => bar(s.name, s.score / 100, `<b>${esc(s.level)}</b> · ${s.c}/${s.n}`, barColor(s.acc))).join('')}
        </div>
      </section>

      <section class="card">
        <h2>Теми</h2>
        <div class="bars">${topics.map(t => bar(t.name, t.acc, `<b>${t.c}</b>/${t.n}`)).join('')}</div>
      </section>

      <section class="card">
        <h2>Результат за рівнями складності</h2>
        <div class="bars">
          ${res.levels.map(l => bar(`${l.level} <span class="muted small">${LEVEL_INFO[l.level].name}</span>`, l.acc, `<b>${l.c}</b>/${l.n}`)).join('')}
        </div>
      </section>

      <section class="card">
        <h2>Готовність до цілей</h2>
        <div class="bars">
          ${GOALS.map(g => {
            const v = Math.max(0, Math.min(1, 1 - (g.req - res.theta) / 2));
            return bar(g.name, v, v >= 1 ? '<b class="tag-ok">готові</b>' : `<b>${pct(v)}</b>`, v >= 1 ? 'var(--ok)' : v >= 0.5 ? 'var(--accent)' : 'var(--warn)');
          }).join('')}
        </div>
      </section>

      <section class="two-col">
        <div class="card">
          <h3 class="tag-ok">Сильні сторони</h3>
          <ul class="plain-list">${strengths.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
        <div class="card">
          <h3 class="tag-bad">Над чим попрацювати</h3>
          <ul class="plain-list">${weaknesses.length ? weaknesses.map(s => `<li>${esc(s)}</li>`).join('') : '<li>Слабких місць не знайдено — чудова робота!</li>'}</ul>
        </div>
      </section>

      <section class="two-col">
        <div class="card">
          <h3>Що ви вмієте на рівні ${esc(res.overall.base)}</h3>
          <ul class="plain-list">${info.can.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
        <div class="card">
          <h3>Рекомендації</h3>
          <ul class="plain-list">${info.rec.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
      </section>

      <section class="card">
        <h2>Розбір помилок <span class="muted small">(${wrong.length})</span></h2>
        ${wrong.length ? `
        <div class="filter-row no-print" id="filters">
          <button class="btn active" data-f="all">Усі</button>
          ${SECTIONS.filter(s => wrong.some(w => w.section === s.key)).map(s => `<button class="btn" data-f="${s.key}">${s.name}</button>`).join('')}
        </div>
        <div id="review">${wrong.map(reviewItem).join('')}</div>` : '<p>Жодної помилки — блискуче!</p>'}
      </section>

      <section class="btn-row no-print" style="margin-bottom:12px">
        <button class="btn btn-primary" id="again">Пройти знову</button>
        <button class="btn" id="copy">Скопіювати результат</button>
        <button class="btn" id="print">Зберегти в PDF</button>
      </section>
    `;

    document.getElementById('again').onclick = () => { renderStart(); window.scrollTo(0, 0); };
    document.getElementById('print').onclick = () => window.print();
    document.getElementById('copy').onclick = () => {
      const text = `Мій рівень української: ${res.overall.label} (${info.name}). Бал: ${res.score}/100. ` +
        res.sections.map(s => `${s.name}: ${s.level}`).join(', ') + '. ' + location.href;
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast('Результат скопійовано'), () => toast('Не вдалося скопіювати'));
      else toast('Копіювання недоступне');
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
    const context = it.section === 'reading' ? `Текст «${DATA.reading[it.passage].title}»`
      : it.section === 'listening' ? `Запис: «${it.audio}»` : '';
    return `
      <div class="review-item">
        <div class="meta">${SECTION_NAME[it.section]} · ${it.level} · ${esc(TOPICS[it.t] || '')}${context ? ' · ' + esc(context) : ''}</div>
        <div class="q">${fmtQuestion(it.q)}</div>
        <div class="ans">
          ${r.chosen === -1 ? '<span class="muted">Ви відповіли «Не знаю»</span>' : `Ваша відповідь: <span class="pill pill-bad">${esc(it.o[r.chosen])}</span>`}
          &nbsp;Правильно: <span class="pill pill-ok">${esc(it.o[0])}</span>
        </div>
        ${it.exp ? `<div class="exp">${esc(it.exp)}</div>` : ''}
      </div>`;
  }

  // ---------- init ----------
  document.getElementById('home-link').onclick = e => {
    e.preventDefault();
    if (state && !confirm('Вийти на головну тесту? Прогрес збережеться, тест можна буде продовжити.')) return;
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
