(function () {
  'use strict';

  const S = window.SUNAKLE;
  const P = S.profile;
  const STORE_KEY = 'sunakle_v1';
  const KNOWN_BOX = 3; // слово считается выученным после 3 верных повторений подряд

  const TABS = [
    { key: 'home', name: 'Обзор' },
    { key: 'plan', name: 'План' },
    { key: 'lessons', name: 'Уроки' },
    { key: 'words', name: 'Слова' },
    { key: 'mistakes', name: 'Ошибки' },
    { key: 'media', name: 'Смотреть и читать' }
  ];

  const app = document.getElementById('app');
  const tabsEl = document.getElementById('tabs');

  // ---------- storage ----------
  function loadStore() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { }
    return Object.assign({ plan: {}, lessons: {}, words: {}, mistakes: null, streak: { last: null, days: 0 } }, s || {});
  }
  let store = loadStore();
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { }
  }
  function dayKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  // Серия дней: засчитывается любое занятие (упражнение, карточка, задание плана)
  function touchStreak() {
    const today = dayKey(new Date());
    const y = new Date(); y.setDate(y.getDate() - 1);
    if (store.streak.last === today) return;
    store.streak.days = store.streak.last === dayKey(y) ? store.streak.days + 1 : 1;
    store.streak.last = today;
  }
  function currentStreak() {
    const y = new Date(); y.setDate(y.getDate() - 1);
    return store.streak.last === dayKey(new Date()) || store.streak.last === dayKey(y) ? store.streak.days : 0;
  }

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function fmtQ(q) { return esc(q).replace(/_{3,}/g, '<span class="blank">&nbsp;</span>'); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function plural(n, one, few, many) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  function pct(x) { return Math.round(x * 100) + '%'; }
  function bar(label, value, right, color) {
    return `<div class="bar-row"><span>${label}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(0, Math.min(1, value)) * 100}%;${color ? 'background:' + color : ''}"></div></div>
      <span class="bar-val">${right}</span></div>`;
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = speechSynthesis.getVoices().find(x => /^en[-_](GB|US)/i.test(x.lang));
    if (v) u.voice = v;
    u.lang = v ? v.lang : 'en-GB';
    u.rate = 0.95;
    speechSynthesis.speak(u);
  }
  if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); } catch (e) { } }

  // ---------- progress ----------
  const allWords = () => S.wordSets.flatMap(set => set.words.map(w => ({ key: set.id + '|' + w[0], set: set.id, en: w[0], ru: w[1], ex: w[2] })));
  function wordBox(key) { return store.words[key] === undefined ? -1 : store.words[key]; }
  function setStats(set) {
    let known = 0, learning = 0;
    set.words.forEach(w => {
      const b = wordBox(set.id + '|' + w[0]);
      if (b >= KNOWN_BOX) known++;
      else if (b >= 0) learning++;
    });
    return { known, learning, total: set.words.length };
  }
  function lessonDone(id) { const r = store.lessons[id]; return r && r.best >= 6; }
  function planTotals() {
    let done = 0, total = 0;
    S.plan.forEach(w => w.tasks.forEach((_, i) => { total++; if (store.plan[w.week + '_' + i]) done++; }));
    return { done, total };
  }
  function currentWeek() {
    return S.plan.find(w => w.tasks.some((_, i) => !store.plan[w.week + '_' + i])) || S.plan[S.plan.length - 1];
  }

  // ---------- routing ----------
  function route() {
    const [tab, arg] = (location.hash.slice(1) || 'home').split('/');
    const t = TABS.find(x => x.key === tab) ? tab : 'home';
    tabsEl.innerHTML = TABS.map(x => `<a href="#${x.key}" class="${x.key === t ? 'active' : ''}">${x.name}</a>`).join('');
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    ({ home: renderHome, plan: renderPlan, lessons: renderLessons, words: renderWords, mistakes: renderMistakes, media: renderMedia })[t](arg);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  // ---------- обзор ----------
  function renderHome() {
    const words = allWords();
    const known = words.filter(w => wordBox(w.key) >= KNOWN_BOX).length;
    const lessonsDone = S.lessons.filter(l => lessonDone(l.id)).length;
    const plan = planTotals();
    const week = currentWeek();
    const streak = currentStreak();
    const due = words.filter(w => wordBox(w.key) >= 0 && wordBox(w.key) < KNOWN_BOX).length;

    app.innerHTML = `
      <section class="card sk-hero">
        <div class="sk-badge">SUNAKLE</div>
        <h1>Твой путь от ${P.level} к ${P.target}</h1>
        <p class="muted">Персональная программа по результату теста от ${P.date}. Понимаешь ты уже на B2, а грамматика отстаёт на уровень — поэтому главный фокус на ней. До B2 осталось <b>${P.targetScore - P.score} ${plural(P.targetScore - P.score, 'балл', 'балла', 'баллов')}</b>.</p>
        <div class="stats">
          <div class="stat"><div class="k">Уровень</div><div class="v">${P.level}<small> · ${P.score}/100</small></div></div>
          <div class="stat"><div class="k">Цель</div><div class="v">${P.target}<small> · ${P.targetScore}+</small></div><div class="k">${esc(P.targetExam)}</div></div>
          <div class="stat"><div class="k">Серия дней</div><div class="v">${streak}<small> ${plural(streak, 'день', 'дня', 'дней')}</small></div></div>
          <div class="stat"><div class="k">План</div><div class="v">${pct(plan.done / plan.total)}</div><div class="k">${plan.done} из ${plan.total} заданий</div></div>
          <div class="stat"><div class="k">Уроки</div><div class="v">${lessonsDone}<small>/${S.lessons.length}</small></div></div>
          <div class="stat"><div class="k">Слова</div><div class="v">${known}<small>/${words.length}</small></div><div class="k">${due ? due + ' на повторении' : 'выучено'}</div></div>
        </div>
      </section>

      <section class="card">
        <h2>Сегодня · неделя ${week.week}: ${esc(week.focus)}</h2>
        <ul class="checklist">
          ${week.tasks.map((t, i) => checkItem(week.week, i, t)).join('')}
        </ul>
        <h3 style="margin-top:20px">Ежедневная рутина — 50 минут</h3>
        <div class="routine">
          ${S.daily.map(([time, what]) => `<div class="routine-item"><b>${time}</b><span>${esc(what)}</span></div>`).join('')}
        </div>
        <div class="btn-row" style="margin-top:20px">
          <a class="btn btn-primary" href="#words">Повторить слова</a>
          <a class="btn" href="#lessons">Открыть уроки</a>
        </div>
      </section>

      <section class="card">
        <h2>Твой профиль</h2>
        <div class="bars">
          ${P.skills.map(s => bar(s.name, s.c / s.n, `<b>${s.level}</b> · ${s.c}/${s.n}`, s.level.startsWith('B2') ? 'var(--ok)' : s.level.startsWith('A') ? 'var(--warn)' : 'var(--accent)')).join('')}
        </div>
        <div class="two-col" style="margin-top:20px">
          <div><h3 class="tag-ok">Сильные стороны</h3><ul class="plain-list">${P.strong.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
          <div><h3 class="tag-bad">Что подтянуть</h3><ul class="plain-list">${P.weak.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
        </div>
        <p class="muted small" style="margin:16px 0 0">Cambridge Scale ${P.cambridge} · ≈ IELTS ${P.ielts} · ≈ TOEFL ${P.toefl} · словарный запас ≈ ${P.vocab.toLocaleString('ru-RU')} слов. Через 4 и 8 недель пройди <a href="index.html">тест</a> снова, чтобы увидеть рост.</p>
      </section>`;
    bindChecklist();
  }

  function checkItem(week, i, text) {
    const id = week + '_' + i;
    return `<li><label class="check ${store.plan[id] ? 'done' : ''}"><input type="checkbox" data-task="${id}" ${store.plan[id] ? 'checked' : ''}><span>${esc(text)}</span></label></li>`;
  }
  function bindChecklist() {
    app.querySelectorAll('input[data-task]').forEach(cb => {
      cb.onchange = () => {
        if (cb.checked) { store.plan[cb.dataset.task] = true; touchStreak(); }
        else delete store.plan[cb.dataset.task];
        saveStore();
        cb.closest('.check').classList.toggle('done', cb.checked);
        const wk = cb.closest('[data-week]');
        if (wk) updateWeekHead(wk);
      };
    });
  }

  // ---------- план ----------
  function renderPlan() {
    const plan = planTotals();
    const cur = currentWeek();
    app.innerHTML = `
      <section class="card">
        <h1>План на 12 недель: ${P.level} → ${P.target}</h1>
        <p class="muted">Каждую неделю — одна грамматическая тема, один набор слов, сериал и чтение. Около 50 минут в день. Отмечай выполненное, прогресс сохраняется.</p>
        ${bar('Выполнено', plan.done / plan.total, `<b>${plan.done}</b>/${plan.total}`)}
      </section>
      ${S.plan.map(w => {
        const done = w.tasks.filter((_, i) => store.plan[w.week + '_' + i]).length;
        return `
        <details class="card week" data-week="${w.week}" ${w.week === cur.week ? 'open' : ''}>
          <summary>
            <span class="week-num">${w.week}</span>
            <span class="week-title"><b>${esc(w.focus)}</b><span class="muted small week-count">${done}/${w.tasks.length}${done === w.tasks.length ? ' · готово' : ''}</span></span>
          </summary>
          <ul class="checklist">${w.tasks.map((t, i) => checkItem(w.week, i, t)).join('')}</ul>
        </details>`;
      }).join('')}`;
    bindChecklist();
  }
  function updateWeekHead(el) {
    const w = S.plan.find(x => String(x.week) === el.dataset.week);
    const done = w.tasks.filter((_, i) => store.plan[w.week + '_' + i]).length;
    el.querySelector('.week-count').textContent = done + '/' + w.tasks.length + (done === w.tasks.length ? ' · готово' : '');
  }

  // ---------- уроки ----------
  function renderLessons(id) {
    const lesson = S.lessons.find(l => l.id === id);
    if (lesson) return renderLesson(lesson);
    app.innerHTML = `
      <section class="card">
        <h1>Уроки</h1>
        <p class="muted" style="margin:0">10 уроков по темам, где у тебя были ошибки в тесте. Урок пройден, если в упражнениях не меньше 6 из 8 верных.</p>
      </section>
      <div class="lesson-grid">
        ${S.lessons.map((l, i) => {
          const r = store.lessons[l.id];
          return `
          <a class="card lesson-card" href="#lessons/${l.id}">
            <div class="lesson-icon">${esc(l.icon)}</div>
            <div class="muted small">Урок ${i + 1} · ${l.level}</div>
            <b>${esc(l.title)}</b>
            <span class="small ${r ? (lessonDone(l.id) ? 'tag-ok' : 'tag-warn') : 'muted'}">${r ? (lessonDone(l.id) ? '✓ пройден' : 'в процессе') + ' · лучший результат ' + r.best + '/' + r.n : 'не начат'}</span>
          </a>`;
        }).join('')}
      </div>`;
  }

  function renderLesson(l) {
    app.innerHTML = `
      <a class="back" href="#lessons">← Все уроки</a>
      <section class="card">
        <div class="muted small">${l.level}</div>
        <h1>${esc(l.title)}</h1>
        <div class="why"><b>Почему этот урок:</b> ${esc(l.why)}</div>
        <div class="theory">
          ${l.theory.map(([name, rule, ex]) => `
            <div class="theory-row">
              <div class="theory-name">${esc(name)}</div>
              <div><div>${esc(rule)}</div><div class="theory-ex">${esc(ex)} <button class="say" data-say="${esc(ex)}" aria-label="Произнести">🔊</button></div></div>
            </div>`).join('')}
        </div>
        <div class="tip">💡 ${esc(l.tip)}</div>
      </section>
      <section class="card" id="quiz"></section>`;
    bindSay();
    runQuiz(document.getElementById('quiz'), l.exercises.map(e => ({ q: e.q, o: e.o, exp: e.exp })), (c, n) => {
      const prev = store.lessons[l.id];
      store.lessons[l.id] = { best: Math.max(prev ? prev.best : 0, c), n, last: c };
      saveStore();
    }, 'Упражнения');
  }

  function bindSay() {
    app.querySelectorAll('[data-say]').forEach(b => { b.onclick = () => speak(b.dataset.say); });
  }

  // Квиз: по одному вопросу, сразу показывает верный ответ и объяснение
  function runQuiz(root, items, onDone, title) {
    const order = shuffle(items);
    let i = 0, correct = 0;
    function show() {
      if (i >= order.length) return finish();
      const it = order[i];
      const opts = shuffle(it.o.map((text, k) => ({ text, ok: k === 0 })));
      root.innerHTML = `
        <div class="test-head"><span class="badge">${esc(title)}</span><span>${i + 1} из ${order.length}</span><span>✓ ${correct}</span></div>
        <div class="progress"><div style="width:${i / order.length * 100}%"></div></div>
        ${it.passage ? `<div class="passage"><h3>${esc(it.passage.title)}</h3><p>${esc(it.passage.text)}</p></div>` : ''}
        ${it.audio ? `<div class="audio-box"><button class="play-btn" data-say="${esc(it.audio)}" aria-label="Прослушать">▶</button><div><b>Прослушай запись</b><div class="muted small">Можно слушать сколько угодно раз</div></div></div>` : ''}
        <h2 class="question">${fmtQ(it.q)}</h2>
        <div class="options">${opts.map((o, k) => `<button class="opt" data-k="${k}"><kbd>${k + 1}</kbd><span>${esc(o.text)}</span></button>`).join('')}</div>
        <div id="feedback"></div>`;
      root.querySelectorAll('[data-say]').forEach(b => { b.onclick = () => speak(b.dataset.say); });
      const buttons = Array.from(root.querySelectorAll('.opt'));
      buttons.forEach((b, k) => {
        b.onclick = () => {
          if (root.dataset.answered) return;
          root.dataset.answered = '1';
          const ok = opts[k].ok;
          if (ok) correct++;
          touchStreak();
          saveStore();
          buttons.forEach((x, j) => {
            x.disabled = true;
            if (opts[j].ok) x.classList.add('right');
            else if (j === k) x.classList.add('wrong');
          });
          root.querySelector('#feedback').innerHTML = `
            <div class="feedback ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Верно!' : 'Неверно.'}</b> ${esc(it.exp || '')}${it.audio && !ok ? `<div class="muted small" style="margin-top:6px">Запись: «${esc(it.audio)}»</div>` : ''}</div>
            <button class="btn btn-primary" id="next">${i + 1 < order.length ? 'Дальше' : 'Результат'}</button>`;
          root.querySelector('#next').onclick = () => { i++; delete root.dataset.answered; show(); };
          root.querySelector('#next').focus();
        };
      });
      document.onkeydown = e => {
        if (!root.isConnected) { document.onkeydown = null; return; }
        const n = parseInt(e.key, 10);
        if (!root.dataset.answered && n >= 1 && n <= buttons.length) buttons[n - 1].click();
      };
    }
    function finish() {
      document.onkeydown = null;
      onDone(correct, order.length);
      const r = correct / order.length;
      root.innerHTML = `
        <div class="quiz-result">
          <div class="quiz-score ${r >= 0.75 ? 'tag-ok' : r >= 0.5 ? 'tag-warn' : 'tag-bad'}">${correct}/${order.length}</div>
          <p>${r === 1 ? 'Идеально! Тема закрыта.' : r >= 0.75 ? 'Отлично, тема почти освоена.' : r >= 0.5 ? 'Неплохо, но стоит повторить теорию и пройти ещё раз.' : 'Перечитай теорию выше и попробуй снова.'}</p>
          <button class="btn btn-primary" id="again">Пройти ещё раз</button>
        </div>`;
      root.querySelector('#again').onclick = () => runQuiz(root, items, onDone, title);
    }
    show();
  }

  // ---------- слова ----------
  function renderWords(setId) {
    const set = S.wordSets.find(s => s.id === setId);
    if (set) return renderCards(set);
    const words = allWords();
    const known = words.filter(w => wordBox(w.key) >= KNOWN_BOX).length;
    app.innerHTML = `
      <section class="card">
        <h1>Слова</h1>
        <p class="muted">${words.length} слов и фраз, подобранных под переход на B2. Карточки работают по методу интервальных повторений: «Знаю» продвигает слово, «Не помню» возвращает его в начало. Слово выучено после ${KNOWN_BOX} верных ответов подряд.</p>
        ${bar('Выучено', known / words.length, `<b>${known}</b>/${words.length}`, 'var(--ok)')}
      </section>
      <div class="lesson-grid">
        ${S.wordSets.map(s => {
          const st = setStats(s);
          return `
          <a class="card lesson-card" href="#words/${s.id}">
            <b>${esc(s.title)}</b>
            <span class="muted small">${esc(s.desc)}</span>
            <div class="bar-track" style="margin:10px 0 6px"><div class="bar-fill" style="width:${st.known / st.total * 100}%;background:var(--ok)"></div></div>
            <span class="small"><b>${st.known}</b>/${st.total} выучено${st.learning ? ' · ' + st.learning + ' учу' : ''}</span>
          </a>`;
        }).join('')}
      </div>`;
  }

  function renderCards(set) {
    const words = set.words.map(w => ({ key: set.id + '|' + w[0], en: w[0], ru: w[1], ex: w[2] }));
    // Сессия: до 10 слов, сначала новые и плохо выученные
    const queue = shuffle(words).sort((a, b) => Math.max(wordBox(a.key), 0) - Math.max(wordBox(b.key), 0)).slice(0, 10);
    let i = 0, knew = 0;

    function frame(inner) {
      const st = setStats(set);
      app.innerHTML = `
        <a class="back" href="#words">← Все наборы</a>
        <section class="card">
          <div class="test-head"><span class="badge">${esc(set.title)}</span><span>${st.known}/${st.total} выучено</span></div>
          ${inner}
        </section>
        <section class="card">
          <h3>Все слова набора</h3>
          <div class="word-list">
            ${words.map(w => {
              const b = wordBox(w.key);
              const status = b >= KNOWN_BOX ? ['знаю', 'ok'] : b >= 0 ? ['учу', 'warn'] : ['новое', 'muted'];
              return `<div class="word-row"><button class="say" data-say="${esc(w.en)}" aria-label="Произнести">🔊</button><b>${esc(w.en)}</b><span class="muted">${esc(w.ru)}</span><span class="small tag-${status[1]}">${status[0]}</span></div>`;
            }).join('')}
          </div>
        </section>`;
      bindSay();
    }

    function showCard() {
      if (i >= queue.length) {
        frame(`<div class="quiz-result"><div class="quiz-score">${knew}/${queue.length}</div><p>Сессия завершена. Возвращайся завтра — повторение на следующий день лучше всего закрепляет слова.</p><button class="btn btn-primary" id="again">Ещё 10 слов</button></div>`);
        app.querySelector('#again').onclick = () => renderCards(set);
        return;
      }
      const w = queue[i];
      frame(`
        <div class="progress"><div style="width:${i / queue.length * 100}%"></div></div>
        <div class="flashcard" id="card" tabindex="0" role="button" aria-label="Перевернуть карточку">
          <div class="fc-word">${esc(w.en)}</div>
          <button class="say big" data-say="${esc(w.en)}" aria-label="Произнести">🔊</button>
          <div class="fc-back" hidden>
            <div class="fc-ru">${esc(w.ru)}</div>
            <div class="fc-ex">${esc(w.ex)} <button class="say" data-say="${esc(w.ex)}" aria-label="Произнести пример">🔊</button></div>
          </div>
          <div class="fc-hint muted small">Вспомни перевод и нажми на карточку</div>
        </div>
        <div class="test-actions" id="grade" hidden>
          <button class="btn" id="no">Не помню</button>
          <button class="btn btn-primary" id="yes">Знаю</button>
        </div>`);
      const card = app.querySelector('#card');
      const flip = () => {
        card.querySelector('.fc-back').hidden = false;
        card.querySelector('.fc-hint').hidden = true;
        app.querySelector('#grade').hidden = false;
      };
      card.onclick = e => { if (!e.target.closest('[data-say]')) flip(); };
      card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } };
      const grade = ok => {
        const b = wordBox(w.key);
        store.words[w.key] = ok ? Math.min(5, Math.max(b, 0) + 1) : 0;
        if (ok) knew++;
        touchStreak();
        saveStore();
        i++;
        showCard();
      };
      app.querySelector('#yes').onclick = () => grade(true);
      app.querySelector('#no').onclick = () => grade(false);
    }
    showCard();
  }

  // ---------- работа над ошибками ----------
  function testItems() {
    const D = window.TEST_DATA;
    const items = [];
    D.grammar.forEach(x => items.push(Object.assign({ section: 'Грамматика' }, x)));
    D.vocabulary.forEach(x => items.push(Object.assign({ section: 'Лексика' }, x)));
    D.reading.forEach(p => p.questions.forEach(x => items.push(Object.assign({ section: 'Чтение', passage: { title: p.title, text: p.text } }, x))));
    D.listening.forEach(x => items.push(Object.assign({ section: 'Аудирование' }, x)));
    return S.mistakes.map(prefix => items.find(it => it.q.startsWith(prefix))).filter(Boolean);
  }

  function renderMistakes(arg) {
    const items = testItems();
    const groups = ['Грамматика', 'Лексика', 'Чтение', 'Аудирование'].map(name => ({ name, items: items.filter(x => x.section === name) }));
    const best = store.mistakes;
    if (arg) {
      const g = groups.find(x => x.name === decodeURIComponent(arg)) || { name: 'Все вопросы', items };
      app.innerHTML = `<a class="back" href="#mistakes">← Работа над ошибками</a><section class="card" id="quiz"></section>`;
      runQuiz(document.getElementById('quiz'), g.items, (c, n) => {
        if (g.items === items) { store.mistakes = { best: Math.max(best ? best.best : 0, c), n }; saveStore(); }
      }, g.name);
      return;
    }
    app.innerHTML = `
      <section class="card">
        <h1>Работа над ошибками</h1>
        <p class="muted">Все ${items.length} ${plural(items.length, 'вопрос', 'вопроса', 'вопросов')} из твоего теста, на которые ты ответил неверно или выбрал «Не знаю». Пройди их, пока не будет 100%.</p>
        ${best ? bar('Лучший результат', best.best / best.n, `<b>${best.best}</b>/${best.n}`, 'var(--ok)') : ''}
        <div class="btn-row" style="margin-top:16px"><a class="btn btn-primary" href="#mistakes/all">Пройти все ${items.length}</a></div>
      </section>
      <div class="lesson-grid">
        ${groups.filter(g => g.items.length).map(g => `
          <a class="card lesson-card" href="#mistakes/${encodeURIComponent(g.name)}">
            <b>${g.name}</b>
            <span class="muted small">${g.items.length} ${plural(g.items.length, 'вопрос', 'вопроса', 'вопросов')}</span>
          </a>`).join('')}
      </div>`;
  }

  // ---------- что смотреть ----------
  function renderMedia() {
    app.innerHTML = `
      <section class="card">
        <h1>Смотреть и читать</h1>
        <p class="muted" style="margin:0">Подобрано под твой уровень: понимание у тебя уже B2, поэтому можно брать оригинальные сериалы и статьи. Начинай с материалов уровня B1–B2 и двигайся к B2–C1.</p>
      </section>
      ${S.media.map(group => `
        <section class="card">
          <h2>${esc(group.title)}</h2>
          ${group.note ? `<p class="muted small">${esc(group.note)}</p>` : ''}
          <div class="media-list">
            ${group.items.map(([name, lvl, desc, url]) => `
              <div class="media-item">
                <div class="media-top">
                  ${url ? `<a href="${esc(url)}" target="_blank" rel="noopener"><b>${esc(name)}</b> ↗</a>` : `<b>${esc(name)}</b>`}
                  <span class="lvl-tag">${esc(lvl)}</span>
                </div>
                <span class="muted small">${esc(desc)}</span>
              </div>`).join('')}
          </div>
        </section>`).join('')}`;
  }

  route();
})();
