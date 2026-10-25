(function () {
  'use strict';

  const H = window.HEBREW;
  const STORE_KEY = 'hebrew_srs_v1';
  const MIN = 60 * 1000;
  const DAY = 24 * 60 * MIN;

  // Параметры интервальных повторений (как в Anki по умолчанию)
  const STEPS = [1, 10];        // шаги изучения новых карточек, минуты
  const RELEARN = [10];         // шаги переучивания после ошибки, минуты
  const GRAD_IVL = 1;           // интервал после выпуска из изучения, дни
  const EASY_IVL = 4;           // интервал при «Легко» на новой карточке, дни
  const START_EASE = 2.5;
  const LEARN_AHEAD = 20 * MIN; // показывать изучаемые карточки чуть раньше, если больше нечего
  const MATURE = 21;            // «зрелая» карточка — интервал от 21 дня

  const TABS = [
    { key: 'decks', name: 'Колоды' },
    { key: 'alphabet', name: 'Алфавит' },
    { key: 'add', name: 'Добавить' },
    { key: 'list', name: 'Список' },
    { key: 'stats', name: 'Статистика' }
  ];
  const GRADES = [
    { key: 'again', name: 'Снова' },
    { key: 'hard', name: 'Трудно' },
    { key: 'good', name: 'Хорошо' },
    { key: 'easy', name: 'Легко' }
  ];

  const app = document.getElementById('app');
  const tabsEl = document.getElementById('tabs');

  // ---------- storage ----------
  function loadStore() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { }
    return Object.assign({ cards: {}, newDone: {}, custom: [], log: [] }, s || {});
  }
  let store = loadStore();
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { }
  }

  // ---------- колоды ----------
  function buildDecks() {
    return [
      {
        id: 'alphabet', name: 'Алфавит', desc: '22 буквы и 5 конечных форм', newPerDay: 10,
        cards: H.alphabet.map(a => ({
          id: 'alphabet:' + a[0], front: a[0], sub: 'буква', big: true,
          answer: a[1], line: 'Звук: ' + a[3], note: a[4], ex: { he: a[5], tr: a[6], ru: a[7] }, say: a[2]
        }))
      },
      {
        id: 'vowels', name: 'Огласовки', desc: 'Никуд — знаки гласных', newPerDay: 10,
        cards: H.vowels.map(v => ({
          id: 'vowels:' + v[0], front: v[0], sub: 'как читается?', big: true,
          answer: '«' + v[3] + '» — ' + v[1], line: v[2], note: v[4], say: v[0]
        }))
      },
      {
        id: 'words', name: 'Слова', desc: '100 самых нужных слов', newPerDay: 15,
        cards: H.words.map(w => ({ id: 'words:' + w[0], front: w[0], sub: w[3], answer: w[2], line: w[1], say: w[0] }))
      },
      {
        id: 'phrases', name: 'Фразы', desc: 'Приветствия и разговорные фразы', newPerDay: 10,
        cards: H.phrases.map(p => ({ id: 'phrases:' + p[0], front: p[0], sub: 'фраза', answer: p[2], line: p[1], note: p[3], say: p[0] }))
      },
      {
        id: 'custom', name: 'Мои карточки', desc: 'Добавленные тобой', newPerDay: 20,
        cards: store.custom.map(c => ({ id: 'custom:' + c.id, front: c.he, sub: c.sub || '', answer: c.ru, line: c.tr, say: c.he }))
      }
    ];
  }
  let DECKS = buildDecks();
  const allCards = () => DECKS.flatMap(d => d.cards.map(c => Object.assign({ deck: d.id }, c)));

  // ---------- время ----------
  function dayKey(t) {
    const d = new Date(t);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function endOfDay(t) {
    const d = new Date(t);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }
  function fmtIvl(ms) {
    const m = Math.round(ms / MIN);
    if (m < 60) return Math.max(1, m) + ' мин';
    const h = Math.round(m / 60);
    if (h < 24) return h + ' ч';
    const d = Math.round(ms / DAY);
    if (d < 30) return d + ' д';
    if (d < 365) return Math.round(d / 30) + ' мес';
    return (d / 365).toFixed(1).replace('.0', '') + ' г';
  }

  // ---------- планировщик (SM-2, как в Anki) ----------
  function schedule(st, grade, now) {
    const s = Object.assign({ q: 'new', step: 0, ivl: 0, ease: START_EASE, reps: 0, lapses: 0 }, st || {});
    s.reps++;
    delete s.buried;
    const learnAt = (steps, step, minutes) => Object.assign(s, { step, due: now + minutes * MIN });
    const graduate = days => Object.assign(s, { q: 'review', step: 0, ivl: days, due: now + days * DAY });

    if (s.q === 'new' || s.q === 'learn') {
      s.q = 'learn';
      const step = Math.min(s.step, STEPS.length - 1);
      if (grade === 'again') return learnAt(STEPS, 0, STEPS[0]);
      if (grade === 'hard') return learnAt(STEPS, step, step === 0 && STEPS.length > 1 ? (STEPS[0] + STEPS[1]) / 2 : STEPS[step]);
      if (grade === 'good') return step + 1 < STEPS.length ? learnAt(STEPS, step + 1, STEPS[step + 1]) : graduate(GRAD_IVL);
      return graduate(EASY_IVL);
    }
    if (s.q === 'relearn') {
      if (grade === 'again') return learnAt(RELEARN, 0, RELEARN[0]);
      if (grade === 'hard') return learnAt(RELEARN, s.step, RELEARN[s.step] * 1.5);
      if (grade === 'good') return s.step + 1 < RELEARN.length ? learnAt(RELEARN, s.step + 1, RELEARN[s.step + 1]) : graduate(Math.max(1, s.ivl));
      return graduate(Math.max(1, s.ivl) + 1);
    }
    // review
    const hardIvl = Math.max(s.ivl + 1, Math.round(s.ivl * 1.2));
    const goodIvl = Math.max(hardIvl + 1, Math.round(s.ivl * s.ease));
    const easyIvl = Math.max(goodIvl + 1, Math.round(s.ivl * s.ease * 1.3));
    if (grade === 'again') {
      s.lapses++;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.ivl = 1;
      s.q = 'relearn';
      return learnAt(RELEARN, 0, RELEARN[0]);
    }
    if (grade === 'hard') { s.ease = Math.max(1.3, s.ease - 0.15); return graduate(hardIvl); }
    if (grade === 'good') return graduate(goodIvl);
    s.ease += 0.15;
    return graduate(easyIvl);
  }

  function stateOf(id) { return store.cards[id] || null; }
  function newDoneToday(deckId) {
    const r = store.newDone[deckId];
    return r && r.day === dayKey(Date.now()) ? r.n : 0;
  }

  // Очередь колоды (или всех колод): изучаемые, повторения, новые
  function queue(deckIds, now) {
    const eod = endOfDay(now);
    const learn = [], review = [], fresh = [];
    let newLeft = 0;
    DECKS.filter(d => deckIds.includes(d.id)).forEach(d => {
      const left = Math.max(0, d.newPerDay - newDoneToday(d.id));
      let added = 0;
      d.cards.forEach(c => {
        const s = stateOf(c.id);
        const card = Object.assign({ deck: d.id }, c);
        if (s && s.buried && s.buried >= now) return;
        if (!s || s.q === 'new') {
          if (added < left) { fresh.push(card); added++; }
          return;
        }
        if (s.q === 'learn' || s.q === 'relearn') { if (s.due <= eod) learn.push(Object.assign(card, { due: s.due })); }
        else if (s.due <= eod) review.push(Object.assign(card, { due: s.due }));
      });
      newLeft += added;
    });
    learn.sort((a, b) => a.due - b.due);
    review.sort((a, b) => a.due - b.due);
    return { learn, review, fresh, counts: { n: newLeft, l: learn.length, r: review.length } };
  }

  function nextCard(deckIds, now) {
    const q = queue(deckIds, now);
    const dueLearn = q.learn.filter(c => c.due <= now);
    if (dueLearn.length) return { card: dueLearn[0], kind: 'l', q };
    if (q.review.length) return { card: q.review[0], kind: 'r', q };
    if (q.fresh.length) return { card: q.fresh[0], kind: 'n', q };
    const ahead = q.learn.filter(c => c.due <= now + LEARN_AHEAD);
    if (ahead.length) return { card: ahead[0], kind: 'l', q };
    return { card: null, q };
  }

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function plural(n, one, few, many) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  function heVoice() {
    if (!('speechSynthesis' in window)) return null;
    return speechSynthesis.getVoices().find(v => /^(he|iw)/i.test(v.lang)) || null;
  }
  function speak(text) {
    const v = heVoice();
    if (!v) { toast('В браузере нет голоса для иврита'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v;
    u.lang = v.lang;
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }
  if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); } catch (e) { } }
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
  function stateLabel(s, now) {
    if (!s || s.q === 'new') return ['новая', 'hb-new'];
    if (s.q === 'learn' || s.q === 'relearn') return ['изучается', 'hb-learn'];
    if (s.due <= endOfDay(now)) return ['к повторению', 'hb-review'];
    return ['через ' + fmtIvl(s.due - now), 'muted'];
  }

  // ---------- routing ----------
  function route() {
    document.onkeydown = null;
    const [tab, arg] = (location.hash.slice(1) || 'decks').split('/');
    const t = tab === 'study' ? 'study' : TABS.find(x => x.key === tab) ? tab : 'decks';
    tabsEl.innerHTML = TABS.map(x => `<a href="#${x.key}" class="${x.key === t || (t === 'study' && x.key === 'decks') ? 'active' : ''}">${x.name}</a>`).join('');
    ({ decks: renderDecks, study: renderStudy, alphabet: renderAlphabet, add: renderAdd, list: renderList, stats: renderStats })[t](arg);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  // ---------- колоды ----------
  function renderDecks() {
    const now = Date.now();
    const rows = DECKS.filter(d => d.cards.length || d.id === 'custom').map(d => ({ d, c: queue([d.id], now).counts }));
    const total = queue(DECKS.map(d => d.id), now).counts;
    app.innerHTML = `
      <section class="card">
        <h1>Иврит</h1>
        <p class="muted">Учи по 10–15 минут каждый день. Начни с колоды «Алфавит», потом «Огласовки» — так сможешь читать слова с огласовками. Затем переходи к словам и фразам.</p>
        <div class="hb-decks">
          <div class="hb-deck hb-deck-head"><span>Колода</span><span>Новые</span><span>Изучаемые</span><span>Повторить</span></div>
          ${rows.map(({ d, c }) => `
            <a class="hb-deck" href="#study/${d.id}">
              <span><b>${esc(d.name)}</b><span class="muted small">${esc(d.desc)} · ${d.cards.length} ${plural(d.cards.length, 'карточка', 'карточки', 'карточек')}</span></span>
              <span class="hb-new">${c.n}</span><span class="hb-learn">${c.l}</span><span class="hb-review">${c.r}</span>
            </a>`).join('')}
        </div>
        <div class="btn-row" style="margin-top:20px">
          <a class="btn btn-primary" href="#study/all">Учить всё (${total.n + total.l + total.r})</a>
          <a class="btn" href="#alphabet">Таблица алфавита</a>
        </div>
      </section>
      <p class="muted small" style="text-align:center">Синим — новые карточки на сегодня, красным — изучаемые, зелёным — повторения. Прогресс хранится в этом браузере.</p>`;
  }

  // ---------- изучение ----------
  function renderStudy(arg) {
    const deckIds = arg && arg !== 'all' && DECKS.some(d => d.id === arg) ? [arg] : DECKS.map(d => d.id);
    const title = deckIds.length === 1 ? DECKS.find(d => d.id === deckIds[0]).name : 'Все колоды';
    let revealed = false;
    let current = null;

    function show() {
      const now = Date.now();
      current = nextCard(deckIds, now);
      revealed = false;
      if (!current.card) return done(current.q);
      draw();
    }

    function done(q) {
      const nextLearn = q.learn[0];
      app.innerHTML = `
        <section class="card hb-done">
          <div class="hb-done-icon">✓</div>
          <h1>Поздравляем! На сегодня всё.</h1>
          <p class="muted">${nextLearn ? 'Изучаемые карточки вернутся через ' + fmtIvl(nextLearn.due - Date.now()) + '.' : 'В колоде «' + esc(title) + '» больше нет карточек на сегодня. Возвращайся завтра.'}</p>
          <div class="btn-row" style="justify-content:center">
            <a class="btn btn-primary" href="#decks">К колодам</a>
            ${nextLearn ? '<button class="btn" id="again">Проверить снова</button>' : ''}
          </div>
        </section>`;
      const b = document.getElementById('again');
      if (b) b.onclick = show;
    }

    function draw() {
      const c = current.card;
      const st = stateOf(c.id);
      const now = Date.now();
      const counts = current.q.counts;
      const previews = GRADES.map(g => {
        const ns = schedule(st, g.key, now);
        return fmtIvl(ns.due - now);
      });
      const hasVoice = !!heVoice();
      app.innerHTML = `
        <div class="hb-study">
          <div class="muted small hb-deckname">${esc(title)}</div>
          <section class="hb-card">
            <button class="hb-say" id="say" title="${hasVoice ? 'Озвучить' : 'В браузере нет голоса для иврита'}" ${hasVoice ? '' : 'data-off="1"'} aria-label="Озвучить">🔊</button>
            <div class="hb-front ${c.big ? 'big' : ''}" lang="he" dir="rtl">${esc(c.front)}</div>
            <div class="hb-sub">${esc(c.sub)}</div>
            ${revealed ? `
              <hr class="hb-hr">
              <div class="hb-answer">${esc(c.answer)}</div>
              ${c.line ? `<div class="hb-line">${esc(c.line)}</div>` : ''}
              ${c.note ? `<div class="hb-note">${esc(c.note)}</div>` : ''}
              ${c.ex ? `<div class="hb-ex"><span lang="he" dir="rtl" class="hb-ex-he">${esc(c.ex.he)}</span> <span class="muted">${esc(c.ex.tr)}</span> — ${esc(c.ex.ru)} <button class="hb-mini-say" data-say="${esc(c.ex.he)}" aria-label="Озвучить пример">🔊</button></div>` : ''}` : ''}
          </section>
          <div class="hb-counts">
            <span class="hb-new ${current.kind === 'n' ? 'cur' : ''}">${counts.n}</span>
            <span class="hb-learn ${current.kind === 'l' ? 'cur' : ''}">${counts.l}</span>
            <span class="hb-review ${current.kind === 'r' ? 'cur' : ''}">${counts.r}</span>
          </div>
          <div class="hb-bar">
            <a class="btn hb-side" href="#decks">← Колоды</a>
            <div class="hb-actions">
              ${revealed
                ? GRADES.map((g, i) => `<button class="hb-grade ${g.key}" data-g="${g.key}"><small>${previews[i]}</small>${g.name}</button>`).join('')
                : '<button class="hb-grade show" id="reveal">Показать ответ</button>'}
            </div>
            <div class="hb-more-wrap">
              <button class="btn hb-side" id="more">Ещё ▾</button>
              <div class="hb-menu" id="menu" hidden>
                <button data-act="bury">Отложить до завтра</button>
                <button data-act="reset">Сбросить прогресс карточки</button>
              </div>
            </div>
          </div>
          <p class="muted small hb-keys">Пробел — показать ответ · 1 Снова · 2 Трудно · 3 Хорошо · 4 Легко</p>
        </div>`;

      document.getElementById('say').onclick = () => speak(c.say || c.front);
      app.querySelectorAll('[data-say]').forEach(b => { b.onclick = () => speak(b.dataset.say); });
      const reveal = document.getElementById('reveal');
      if (reveal) reveal.onclick = () => { revealed = true; draw(); };
      app.querySelectorAll('[data-g]').forEach(b => { b.onclick = () => answer(b.dataset.g); });
      const menu = document.getElementById('menu');
      document.getElementById('more').onclick = () => { menu.hidden = !menu.hidden; };
      menu.onclick = e => {
        const act = e.target.dataset.act;
        if (act === 'bury') {
          store.cards[c.id] = Object.assign({ q: 'new', step: 0, ivl: 0, ease: START_EASE, reps: 0, lapses: 0, due: now }, st || {}, { buried: endOfDay(now) });
          saveStore();
          toast('Карточка отложена до завтра');
          show();
        } else if (act === 'reset') {
          delete store.cards[c.id];
          saveStore();
          toast('Прогресс карточки сброшен');
          show();
        }
      };
    }

    function answer(grade) {
      const c = current.card;
      const prev = stateOf(c.id);
      const now = Date.now();
      if (!prev || prev.q === 'new') {
        const day = dayKey(now);
        const r = store.newDone[c.deck];
        store.newDone[c.deck] = { day, n: (r && r.day === day ? r.n : 0) + 1 };
      }
      store.cards[c.id] = schedule(prev, grade, now);
      store.log.push({ t: now, id: c.id, g: grade, q: prev ? prev.q : 'new' });
      if (store.log.length > 5000) store.log = store.log.slice(-5000);
      saveStore();
      show();
    }

    document.onkeydown = e => {
      if (!current || !current.card) return;
      if (!revealed && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); revealed = true; draw(); return; }
      if (revealed) {
        const i = ['1', '2', '3', '4'].indexOf(e.key);
        if (i >= 0) { e.preventDefault(); answer(GRADES[i].key); }
        else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); answer('good'); }
      }
    };
    show();
  }

  // ---------- алфавит ----------
  function renderAlphabet() {
    const letters = H.alphabet.slice(0, 22);
    const finals = H.alphabet.slice(22);
    const finalOf = { 'כ': 'ך', 'מ': 'ם', 'נ': 'ן', 'פ': 'ף', 'צ': 'ץ' };
    app.innerHTML = `
      <section class="card">
        <h1>Алфавит</h1>
        <p class="muted">Нажми на букву, чтобы услышать её название и увидеть пример. Читается справа налево — первая буква в правом верхнем углу.</p>
        <div class="hb-grid" dir="rtl">
          ${letters.map(a => `
            <button class="hb-letter" data-l="${esc(a[0])}">
              <span class="hb-glyph" lang="he">${esc(a[0])}</span>
              <span class="hb-lname">${esc(a[1])}</span>
              <span class="hb-lsound">${esc(a[3])}</span>
              ${finalOf[a[0]] ? `<span class="hb-final" lang="he" title="Конечная форма">${finalOf[a[0]]}</span>` : ''}
            </button>`).join('')}
        </div>
        <h3 style="margin-top:24px">Конечные формы (софит)</h3>
        <div class="hb-grid" dir="rtl">
          ${finals.map(a => `
            <button class="hb-letter" data-l="${esc(a[0])}">
              <span class="hb-glyph" lang="he">${esc(a[0])}</span>
              <span class="hb-lname">${esc(a[1])}</span>
              <span class="hb-lsound">${esc(a[3])}</span>
            </button>`).join('')}
        </div>
        <div id="detail"></div>
        <div class="btn-row" style="margin-top:20px">
          <a class="btn btn-primary" href="#study/alphabet">Учить алфавит карточками</a>
          <a class="btn" href="#study/vowels">Учить огласовки</a>
        </div>
      </section>

      <section class="card">
        <h2>Огласовки (никуд)</h2>
        <p class="muted small">Гласные звуки обозначаются значками под и над буквами. На примере буквы ב:</p>
        <div class="hb-vowels">
          ${H.vowels.slice(0, 9).map(v => `
            <button class="hb-vowel" data-say="${esc(v[0])}">
              <span class="hb-glyph" lang="he">${esc(v[0])}</span>
              <b>${esc(v[3])}</b><span class="muted small">${esc(v[1])}</span>
            </button>`).join('')}
        </div>
      </section>

      <section class="card">
        <h2>Правила чтения</h2>
        <div class="theory">
          ${H.rules.map(([name, text]) => `<div class="theory-row"><div class="theory-name">${esc(name)}</div><div>${esc(text)}</div></div>`).join('')}
        </div>
      </section>`;

    const detail = document.getElementById('detail');
    app.querySelectorAll('[data-l]').forEach(b => {
      b.onclick = () => {
        const a = H.alphabet.find(x => x[0] === b.dataset.l);
        speak(a[2]);
        app.querySelectorAll('.hb-letter').forEach(x => x.classList.toggle('active', x === b));
        const st = stateOf('alphabet:' + a[0]);
        detail.innerHTML = `
          <div class="hb-detail">
            <div class="hb-glyph huge" lang="he">${esc(a[0])}</div>
            <div>
              <h3 style="margin:0">${esc(a[1])} <span lang="he" class="muted">${esc(a[2])}</span></h3>
              <div><b>Звук:</b> ${esc(a[3])}</div>
              <div class="muted">${esc(a[4])}</div>
              <div style="margin-top:6px"><span lang="he" dir="rtl" class="hb-ex-he">${esc(a[5])}</span> <span class="muted">${esc(a[6])}</span> — ${esc(a[7])}</div>
              <div class="small" style="margin-top:6px">Карточка: <span class="${stateLabel(st, Date.now())[1]}">${stateLabel(st, Date.now())[0]}</span></div>
            </div>
          </div>`;
      };
    });
    app.querySelectorAll('.hb-vowel').forEach(b => { b.onclick = () => speak(b.dataset.say); });
  }

  // ---------- добавить ----------
  function renderAdd() {
    app.innerHTML = `
      <section class="card">
        <h1>Добавить карточку</h1>
        <p class="muted">Карточка попадёт в колоду «Мои карточки». На лицевой стороне — иврит, на обороте — перевод и транскрипция.</p>
        <form id="addForm" class="hb-form">
          <label>Иврит<input name="he" lang="he" dir="rtl" required placeholder="מִלָּה"></label>
          <label>Транскрипция<input name="tr" placeholder="мила"></label>
          <label>Перевод<input name="ru" required placeholder="слово"></label>
          <label>Пометка (необязательно)<input name="sub" placeholder="сущ., ж."></label>
          <button class="btn btn-primary" type="submit">Добавить</button>
        </form>
      </section>
      <section class="card">
        <h2>Мои карточки <span class="muted small">(${store.custom.length})</span></h2>
        ${store.custom.length ? `<div class="word-list">${store.custom.map(c => `
          <div class="word-row"><b lang="he" dir="rtl">${esc(c.he)}</b><span class="muted">${esc(c.tr)}</span><span>${esc(c.ru)}</span><button class="say" data-del="${c.id}" title="Удалить" aria-label="Удалить">✕</button></div>`).join('')}</div>`
        : '<p class="muted">Пока пусто.</p>'}
      </section>`;
    document.getElementById('addForm').onsubmit = e => {
      e.preventDefault();
      const f = new FormData(e.target);
      const he = f.get('he').trim(), ru = f.get('ru').trim();
      if (!he || !ru) return;
      store.custom.push({ id: Date.now().toString(36), he, ru, tr: f.get('tr').trim(), sub: f.get('sub').trim() });
      saveStore();
      DECKS = buildDecks();
      toast('Карточка добавлена');
      renderAdd();
    };
    app.querySelectorAll('[data-del]').forEach(b => {
      b.onclick = () => {
        if (!confirm('Удалить карточку?')) return;
        store.custom = store.custom.filter(c => c.id !== b.dataset.del);
        delete store.cards['custom:' + b.dataset.del];
        saveStore();
        DECKS = buildDecks();
        renderAdd();
      };
    });
  }

  // ---------- список ----------
  function renderList() {
    app.innerHTML = `
      <section class="card">
        <h1>Список карточек</h1>
        <div class="hb-filters">
          <input id="search" placeholder="Поиск: иврит, перевод или транскрипция">
          <select id="deck"><option value="">Все колоды</option>${DECKS.filter(d => d.cards.length).map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join('')}</select>
        </div>
        <div id="rows" class="word-list"></div>
      </section>`;
    const search = document.getElementById('search');
    const deck = document.getElementById('deck');
    function draw() {
      const q = search.value.trim().toLowerCase();
      const now = Date.now();
      const items = allCards().filter(c => (!deck.value || c.deck === deck.value) &&
        (!q || [c.front, c.answer, c.line].some(x => String(x || '').toLowerCase().includes(q))));
      document.getElementById('rows').innerHTML = items.length ? items.map(c => {
        const [label, cls] = stateLabel(stateOf(c.id), now);
        return `<div class="word-row"><b lang="he" dir="rtl" class="hb-list-he">${esc(c.front)}</b><span>${esc(c.answer)}</span><span class="muted small">${esc(c.line || '')}</span><span class="small ${cls}">${label}</span></div>`;
      }).join('') : '<p class="muted">Ничего не найдено.</p>';
    }
    search.oninput = draw;
    deck.onchange = draw;
    draw();
  }

  // ---------- статистика ----------
  function renderStats() {
    const now = Date.now();
    const today = dayKey(now);
    const todayLog = store.log.filter(l => dayKey(l.t) === today);
    const reviewsLog = store.log.filter(l => l.q === 'review' && now - l.t < 30 * DAY);
    const retention = reviewsLog.length ? reviewsLog.filter(l => l.g !== 'again').length / reviewsLog.length : null;
    const cards = allCards();
    let n = 0, learning = 0, young = 0, mature = 0;
    cards.forEach(c => {
      const s = stateOf(c.id);
      if (!s || s.q === 'new') n++;
      else if (s.q !== 'review') learning++;
      else if (s.ivl >= MATURE) mature++;
      else young++;
    });
    const forecast = Array.from({ length: 7 }, (_, i) => {
      const start = i === 0 ? 0 : endOfDay(now + (i - 1) * DAY) + 1;
      const end = endOfDay(now + i * DAY);
      return cards.filter(c => { const s = stateOf(c.id); return s && s.q !== 'new' && s.due >= start && s.due <= end; }).length;
    });
    const maxF = Math.max(1, ...forecast);
    const days = new Set(store.log.map(l => dayKey(l.t)));
    let streak = 0;
    for (let d = new Date(now); days.has(dayKey(d.getTime())); d.setDate(d.getDate() - 1)) streak++;
    const studied = cards.length - n;

    app.innerHTML = `
      <section class="card">
        <h1>Статистика</h1>
        <div class="stats">
          <div class="stat"><div class="k">Сегодня</div><div class="v">${todayLog.length}<small> ${plural(todayLog.length, 'ответ', 'ответа', 'ответов')}</small></div></div>
          <div class="stat"><div class="k">Верных сегодня</div><div class="v">${todayLog.length ? Math.round(todayLog.filter(l => l.g !== 'again').length / todayLog.length * 100) + '%' : '—'}</div></div>
          <div class="stat"><div class="k">Удержание (30 дней)</div><div class="v">${retention === null ? '—' : Math.round(retention * 100) + '%'}</div><div class="k">доля повторений без «Снова»</div></div>
          <div class="stat"><div class="k">Серия</div><div class="v">${streak}<small> ${plural(streak, 'день', 'дня', 'дней')}</small></div></div>
          <div class="stat"><div class="k">Изучено карточек</div><div class="v">${studied}<small>/${cards.length}</small></div></div>
          <div class="stat"><div class="k">Всего ответов</div><div class="v">${store.log.length}</div></div>
        </div>
      </section>
      <section class="card">
        <h2>Карточки</h2>
        <div class="bars">
          <div class="bar-row"><span class="hb-new">Новые</span><div class="bar-track"><div class="bar-fill" style="width:${n / cards.length * 100}%;background:var(--hb-new)"></div></div><span class="bar-val"><b>${n}</b></span></div>
          <div class="bar-row"><span class="hb-learn">Изучаемые</span><div class="bar-track"><div class="bar-fill" style="width:${learning / cards.length * 100}%;background:var(--hb-learn)"></div></div><span class="bar-val"><b>${learning}</b></span></div>
          <div class="bar-row"><span class="hb-review">Молодые</span><div class="bar-track"><div class="bar-fill" style="width:${young / cards.length * 100}%;background:var(--hb-review)"></div></div><span class="bar-val"><b>${young}</b></span></div>
          <div class="bar-row"><span>Зрелые (21+ д)</span><div class="bar-track"><div class="bar-fill" style="width:${mature / cards.length * 100}%;background:var(--ok)"></div></div><span class="bar-val"><b>${mature}</b></span></div>
        </div>
      </section>
      <section class="card">
        <h2>Прогноз повторений на 7 дней</h2>
        <div class="hb-forecast">
          ${forecast.map((v, i) => `<div class="hb-fcol"><span class="small">${v}</span><div class="hb-fbar" style="height:${Math.max(2, v / maxF * 120)}px"></div><span class="muted small">${i === 0 ? 'сегодня' : new Date(now + i * DAY).toLocaleDateString('ru-RU', { weekday: 'short' })}</span></div>`).join('')}
        </div>
      </section>
      <section class="card">
        <h2>По колодам</h2>
        <div class="bars">
          ${DECKS.filter(d => d.cards.length).map(d => {
            const done = d.cards.filter(c => { const s = stateOf(c.id); return s && s.q === 'review'; }).length;
            return `<div class="bar-row"><span>${esc(d.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${done / d.cards.length * 100}%"></div></div><span class="bar-val"><b>${done}</b>/${d.cards.length}</span></div>`;
          }).join('')}
        </div>
        <p class="muted small" style="margin:12px 0 0">Карточка считается выученной, когда переходит в повторения (интервал от 1 дня).</p>
      </section>`;
  }

  route();
})();
