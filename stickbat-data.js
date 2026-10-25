// Персональный раздел Stickbat: профиль, план, уроки, слова и рекомендации.
// Составлено по результату теста от 25 октября 2026 г. (A2, 28/100).
window.PERSONAL = {
  title: 'Stickbat',
  storeKey: 'stickbat_v1',
  mediaIntro: 'Подобрано под твой уровень: читаешь ты уже на B1, поэтому смотри всё с английскими субтитрами. Начинай с материалов A2–B1 и через пару месяцев переходи к B1–B2.',
  profile: {
    date: '25 октября 2026',
    intro: 'Читаешь ты уже на B1, а грамматика и словарный запас пока на уровне A1 — именно они тянут результат вниз. Главный фокус: базовые времена, частые слова и фразовые глаголы.',
    level: 'A2', name: 'Elementary', score: 28, range: '23–32',
    cambridge: 124, ielts: '3.0', toefl: '< 42', vocab: 1000,
    target: 'B1', targetScore: 40, targetExam: 'B1 Preliminary (PET)',
    skills: [
      { name: 'Грамматика', level: 'A1', c: 8, n: 30 },
      { name: 'Лексика', level: 'A1+', c: 8, n: 24 },
      { name: 'Чтение', level: 'B1', c: 4, n: 10 },
      { name: 'Аудирование', level: 'A2', c: 4, n: 12 }
    ],
    strong: [
      'Чтение — уже уровень B1, выше общего',
      'Уровень A1 почти идеально: 11 из 12',
      'Хорошо ловишь детали в тексте и речи (8/11)',
      'Отвечаешь честно: «Не знаю» вместо угадывания, поэтому оценка точная'
    ],
    weak: [
      'Грамматика — A1: времена глаголов 2 из 7',
      'Фразовые глаголы — 0 из 4 (look for, turn on, put up with)',
      'Маленький словарный запас: 28 ответов «Не знаю», ≈ 1 000 слов',
      'Придаточные (who / which), степени сравнения, условные предложения',
      'Сочетаемость слов: do / make homework, reach a decision'
    ]
  },

  // ---------- уроки ----------
  lessons: [
    {
      id: 'present', title: 'Present Simple и Present Continuous', level: 'A1–A2', icon: 'Now',
      why: 'Времена глаголов в тесте — 2 из 7. Это фундамент: без него не работает остальная грамматика.',
      theory: [
        ['Present Simple', 'Привычки, факты, расписание. Слова-маркеры: always, usually, every day, often.', 'I drink coffee every morning.'],
        ['-s у he/she/it', 'В Present Simple к глаголу добавляется -s для he, she, it.', 'She works in a bank. He goes to school.'],
        ['Отрицание и вопрос', 'don\'t / doesn\'t и Do / Does. После doesn\'t и Does глагол без -s.', 'He doesn\'t like tea. Does she live here?'],
        ['Present Continuous', 'Действие прямо сейчас: am / is / are + -ing. Маркеры: now, at the moment, Look!', 'Look! It is raining.'],
        ['Глаголы состояния', 'like, love, know, want, need обычно не ставятся в -ing.', 'I know him. (не «I am knowing»)']
      ],
      tip: 'Спроси себя: это бывает регулярно (Simple) или происходит прямо сейчас (Continuous)?',
      exercises: [
        { q: 'She ___ to work every day.', o: ['goes', 'go', 'is going', 'going'], exp: 'Каждый день + she — Present Simple с -s.' },
        { q: 'Look! It ___.', o: ['is raining', 'rains', 'rain', 'raining'], exp: 'Look! — прямо сейчас, Present Continuous.' },
        { q: 'I ___ coffee. I prefer tea.', o: ['don\'t like', 'doesn\'t like', 'not like', 'am not liking'], exp: 'С I — don\'t; like не ставится в -ing.' },
        { q: '___ he live in London?', o: ['Does', 'Do', 'Is', 'Has'], exp: 'Вопрос с he в Present Simple — Does.' },
        { q: 'We ___ TV right now.', o: ['are watching', 'watch', 'watches', 'is watching'], exp: 'Right now — Present Continuous, we are.' },
        { q: 'My brother ___ football on Sundays.', o: ['plays', 'play', 'is play', 'playing'], exp: 'Регулярно по воскресеньям, he — plays.' },
        { q: 'What ___ you doing now?', o: ['are', 'do', 'does', 'is'], exp: 'Now + doing — are you doing.' },
        { q: 'Water ___ at 100 degrees.', o: ['boils', 'is boiling', 'boil', 'boiling'], exp: 'Факт — Present Simple.' }
      ]
    },
    {
      id: 'past', title: 'Past Simple и неправильные глаголы', level: 'A2', icon: 'Ago',
      why: 'Прошедшее время нужно в любом рассказе. В тесте ошибки во временах — главная проблема.',
      theory: [
        ['Правильные глаголы', 'Добавляем -ed.', 'I watched a film. She played tennis.'],
        ['Неправильные', 'Учатся наизусть: go → went, see → saw, buy → bought, meet → met.', 'We went to the beach yesterday.'],
        ['Отрицание', 'didn\'t + глагол в начальной форме.', 'He didn\'t send the email.'],
        ['Вопрос', 'Did + подлежащее + глагол в начальной форме.', 'Did you see the film?'],
        ['was / were', 'Прошедшее от to be: I/he/she/it was, you/we/they were.', 'Where were you last summer?'],
        ['Маркеры', 'yesterday, last week, two days ago, in 2020.', 'I met him two days ago.']
      ],
      tip: 'Учи по 5 неправильных глаголов в день — в разделе «Слова» есть набор из 30 самых частых.',
      exercises: [
        { q: 'I ___ to the cinema yesterday.', o: ['went', 'goed', 'go', 'have gone'], exp: 'Go — неправильный: went.' },
        { q: 'She ___ TV last night.', o: ['watched', 'watch', 'watching', 'was watch'], exp: 'Правильный глагол + -ed.' },
        { q: '___ you see the film?', o: ['Did', 'Do', 'Was', 'Have'], exp: 'Вопрос в прошлом — Did.' },
        { q: 'We ___ at home yesterday.', o: ['weren\'t', 'didn\'t', 'wasn\'t', 'don\'t'], exp: 'We + was/were → weren\'t.' },
        { q: 'He didn\'t ___ the email.', o: ['send', 'sent', 'sending', 'sends'], exp: 'После didn\'t — начальная форма.' },
        { q: 'They ___ a new car last year.', o: ['bought', 'buyed', 'buy', 'buys'], exp: 'Buy — bought.' },
        { q: 'Where ___ you last summer?', o: ['were', 'was', 'did', 'are'], exp: 'You + were.' },
        { q: 'I ___ him two days ago.', o: ['met', 'meet', 'meeted', 'have met'], exp: 'Ago — Past Simple; meet — met.' }
      ]
    },
    {
      id: 'perfect', title: 'Present Perfect или Past Simple', level: 'A2–B1', icon: '✓',
      why: 'Ключевая тема для перехода на B1 — так советуют и рекомендации теста.',
      theory: [
        ['Present Perfect', 'have / has + 3-я форма. Опыт или результат, важный сейчас.', 'I have visited Paris. She has lost her keys.'],
        ['Маркеры Perfect', 'ever, never, just, already, yet, since, for.', 'Have you ever eaten sushi?'],
        ['Past Simple', 'Есть конкретное время в прошлом.', 'I visited Paris in 2019.'],
        ['since / for', 'since + точка во времени, for + период.', 'We have lived here since 2020 / for five years.'],
        ['yet / already', 'yet — в вопросах и отрицаниях, already — в утверждениях.', 'Have you finished yet? I have already finished.']
      ],
      tip: 'Если можно спросить «Когда именно?» и ответ есть в предложении — это Past Simple.',
      exercises: [
        { q: 'I ___ to Japan.', o: ['have never been', 'never was', 'didn\'t never go', 'has never been'], exp: 'Опыт за всю жизнь — Present Perfect с never.' },
        { q: '___ sushi?', o: ['Have you ever eaten', 'Did you ever ate', 'Do you ever eat', 'Have you ever ate'], exp: 'Опыт — Have you ever + 3-я форма (eaten).' },
        { q: 'We ___ here since 2020.', o: ['have lived', 'lived', 'live', 'are living'], exp: 'Since — Present Perfect.' },
        { q: 'I ___ him yesterday.', o: ['saw', 'have seen', 'see', 'has seen'], exp: 'Yesterday — Past Simple.' },
        { q: 'She ___ here for three years and she still loves her job.', o: ['has worked', 'worked', 'works', 'is work'], exp: 'Работает до сих пор — Present Perfect.' },
        { q: '___ you finished your homework yet?', o: ['Have', 'Did', 'Do', 'Has'], exp: 'Yet в вопросе — Present Perfect: Have you…' },
        { q: 'He ___ the book last week.', o: ['read', 'has read', 'have read', 'reads'], exp: 'Last week — Past Simple (read — read — read).' },
        { q: 'They have already ___.', o: ['left', 'leave', 'leaving', 'leaved'], exp: 'Have + 3-я форма: leave — left — left.' }
      ]
    },
    {
      id: 'future', title: 'Будущее: will и going to', level: 'A2', icon: '→',
      why: 'Чтобы говорить о планах и прогнозах — без этого не обойтись уже на A2.',
      theory: [
        ['will', 'Решение в момент речи, обещание, прогноз «я думаю».', 'I think it will rain. I\'ll help you!'],
        ['going to', 'Заранее принятое намерение или прогноз по видимым признакам.', 'We are going to buy a flat. Look at the clouds — it\'s going to rain.'],
        ['Present Continuous', 'Договорённость с конкретным временем.', 'I\'m meeting Anna at 6 tomorrow.'],
        ['Отрицание', 'won\'t = will not.', 'I won\'t tell anyone.']
      ],
      tip: 'Решил прямо сейчас — will. Решил раньше — going to.',
      exercises: [
        { q: 'I think it ___ tomorrow.', o: ['will rain', 'is raining', 'rains', 'rain'], exp: 'I think — прогноз с will.' },
        { q: 'Look at those clouds! It ___ rain.', o: ['is going to', 'will', 'goes to', 'is go to'], exp: 'Видимый признак — going to.' },
        { q: 'I ___ Anna at 6 tomorrow — it\'s in my calendar.', o: ['am meeting', 'meet', 'will meeting', 'meets'], exp: 'Договорённость — Present Continuous.' },
        { q: '"The phone is ringing." — "I ___ answer it!"', o: ['\'ll', 'am going to', 'am', 'will to'], exp: 'Решение в момент речи — will.' },
        { q: 'We ___ to buy a new flat next year. We\'ve already saved the money.', o: ['are going', 'will going', 'go', 'are go'], exp: 'Заранее принятое решение — going to.' },
        { q: '___ you help me, please?', o: ['Will', 'Are', 'Do', 'Going'], exp: 'Просьба — Will you…?' },
        { q: 'She ___ 18 next month.', o: ['will be', 'is going', 'be', 'will'], exp: 'Факт о будущем — will be.' },
        { q: 'I promise I ___ tell anyone.', o: ['won\'t', 'don\'t', 'am not going', 'not will'], exp: 'Обещание — will / won\'t.' }
      ]
    },
    {
      id: 'compare', title: 'Степени сравнения', level: 'A2', icon: '>',
      why: 'В тесте 0 из 1 — тема простая, закроешь за один урок.',
      theory: [
        ['Короткие слова', '+ -er / the + -est.', 'fast → faster → the fastest'],
        ['Длинные слова', 'more / the most.', 'interesting → more interesting → the most interesting'],
        ['На -y', 'y → i.', 'easy → easier → the easiest'],
        ['Исключения', 'good → better → the best; bad → worse → the worst.', 'This is the best day of my life.'],
        ['than / as … as', 'than — «чем», as … as — «такой же, как».', 'She is as tall as her mother.']
      ],
      tip: 'Никогда не ставь вместе more и -er: «more faster» — ошибка.',
      exercises: [
        { q: 'My car is ___ than yours.', o: ['faster', 'more fast', 'fastest', 'fast'], exp: 'Короткое слово + -er + than.' },
        { q: 'This is the ___ day of my life.', o: ['best', 'better', 'good', 'most good'], exp: 'Good → the best.' },
        { q: 'English is ___ than Chinese.', o: ['easier', 'more easy', 'easyer', 'easiest'], exp: 'Easy → easier.' },
        { q: 'This film is ___ interesting than that one.', o: ['more', 'most', 'much', 'very'], exp: 'Длинное слово — more.' },
        { q: 'He is the ___ student in the class.', o: ['tallest', 'taller', 'most tall', 'tall'], exp: 'The + -est.' },
        { q: 'Today is ___ than yesterday.', o: ['worse', 'badder', 'more bad', 'worst'], exp: 'Bad → worse.' },
        { q: 'She is as tall ___ her mother.', o: ['as', 'than', 'like', 'that'], exp: 'As … as.' },
        { q: 'This is the most ___ book I\'ve ever read.', o: ['interesting', 'interestinger', 'more interesting', 'interested'], exp: 'The most + прилагательное.' }
      ]
    },
    {
      id: 'modals', title: 'Can, must, have to, should', level: 'A2', icon: 'M',
      why: 'Модальные глаголы нужны каждый день: попросить, посоветовать, запретить.',
      theory: [
        ['can', 'Умею / могу / можно.', 'I can swim. Can I open the window?'],
        ['must / mustn\'t', 'Должен (правило, сильно) / запрещено.', 'You mustn\'t smoke here.'],
        ['have to / don\'t have to', 'Нужно (обстоятельства) / не обязательно.', 'I have to get up early. You don\'t have to come.'],
        ['should', 'Совет: «стоит, следует».', 'You should go to bed.'],
        ['Без to', 'После can, must, should — глагол без to и без -s.', 'She can speak French. (не «cans», не «can to»)']
      ],
      tip: 'mustn\'t — нельзя, don\'t have to — можно не делать. Это разные вещи!',
      exercises: [
        { q: 'I ___ swim. (Я умею плавать.)', o: ['can', 'must', 'should', 'have'], exp: 'Умение — can.' },
        { q: 'You ___ smoke here. It\'s forbidden.', o: ['mustn\'t', 'don\'t have to', 'can', 'should'], exp: 'Запрет — mustn\'t.' },
        { q: 'You look tired. You ___ go to bed.', o: ['should', 'mustn\'t', 'can\'t', 'have'], exp: 'Совет — should.' },
        { q: 'I ___ get up early tomorrow — I have an exam.', o: ['have to', 'must to', 'should to', 'can'], exp: 'Необходимость из-за обстоятельств — have to.' },
        { q: '___ I open the window?', o: ['Can', 'Must', 'Have', 'Should to'], exp: 'Просьба разрешения — Can I…?' },
        { q: 'You ___ come if you don\'t want to.', o: ['don\'t have to', 'mustn\'t', 'can\'t', 'shouldn\'t to'], exp: 'Не обязательно — don\'t have to.' },
        { q: 'She ___ speak three languages.', o: ['can', 'cans', 'can to', 'is can'], exp: 'Can без -s и без to.' },
        { q: 'We ___ wear a uniform at school. It\'s the rule.', o: ['must', 'can', 'might', 'would'], exp: 'Правило — must.' }
      ]
    },
    {
      id: 'prep', title: 'Предлоги in, on, at, to', level: 'A1–A2', icon: 'in',
      why: 'Маленькие слова, на которых ошибаются все. Быстро даёт баллы.',
      theory: [
        ['Время: in', 'Месяцы, годы, части дня.', 'in May, in 2005, in the morning'],
        ['Время: on', 'Дни и даты.', 'on Monday, on 5 June'],
        ['Время: at', 'Точное время.', 'at 7 o\'clock, at night'],
        ['Место', 'in — внутри (in London), on — на поверхности (on the table), at — в точке (at home, at school).', 'The book is on the table.'],
        ['Движение: to', 'Куда: go to school, go to work. Но: go home — без to!', 'I\'m going to school.']
      ],
      tip: 'Запомни три исключения: at home, at night, go home (без to).',
      exercises: [
        { q: 'My birthday is ___ May.', o: ['in', 'on', 'at', 'to'], exp: 'Месяц — in.' },
        { q: 'The meeting is ___ Monday.', o: ['on', 'in', 'at', 'by'], exp: 'День недели — on.' },
        { q: 'I\'ll see you ___ 7 o\'clock.', o: ['at', 'in', 'on', 'by'], exp: 'Точное время — at.' },
        { q: 'She lives ___ London.', o: ['in', 'on', 'at', 'to'], exp: 'Город — in.' },
        { q: 'The book is ___ the table.', o: ['on', 'in', 'at', 'of'], exp: 'На поверхности — on.' },
        { q: 'I was born ___ 2005.', o: ['in', 'on', 'at', 'by'], exp: 'Год — in.' },
        { q: 'We are ___ home now.', o: ['at', 'in', 'on', 'to'], exp: 'At home.' },
        { q: 'I\'m going ___ school.', o: ['to', 'at', 'in', 'on'], exp: 'Движение куда — to.' }
      ]
    },
    {
      id: 'phrasal', title: 'Фразовые глаголы: база', level: 'A2–B1', icon: 'up',
      why: 'В тесте 0 из 4: look for, turn on, put up with, lay off. Без них не понять живую речь.',
      theory: [
        ['Что это', 'Глагол + маленькое слово (up, on, off, for…) = новое значение.', 'look (смотреть) → look for (искать)'],
        ['look', 'look for — искать, look after — присматривать, look at — смотреть на.', 'I\'m looking for my keys.'],
        ['turn', 'turn on — включить, turn off — выключить.', 'Turn off the TV, please.'],
        ['get / wake', 'get up — вставать, wake up — просыпаться.', 'I get up at 7.'],
        ['give / put / pick', 'give up — бросить, сдаться; put up with — терпеть; pick up — забрать.', 'Can you pick me up?']
      ],
      tip: 'Учи фразовые глаголы с примером целиком, а не отдельно. В «Словах» есть набор из 20.',
      exercises: [
        { q: 'I\'m looking ___ my keys. Have you seen them?', o: ['for', 'at', 'after', 'up'], exp: 'Look for — искать.' },
        { q: 'Could you turn ___ the light? It\'s dark.', o: ['on', 'off', 'up', 'in'], exp: 'Turn on — включить.' },
        { q: 'I ___ up at 7 every morning.', o: ['get', 'take', 'go', 'put'], exp: 'Get up — вставать.' },
        { q: 'Please turn ___ the TV — I\'m trying to sleep.', o: ['off', 'on', 'up', 'in'], exp: 'Turn off — выключить.' },
        { q: 'Can you look ___ my cat while I\'m away?', o: ['after', 'for', 'at', 'up'], exp: 'Look after — присматривать.' },
        { q: 'Don\'t give ___! You can do it.', o: ['up', 'in', 'off', 'out'], exp: 'Give up — сдаваться.' },
        { q: 'I can\'t put up ___ this noise.', o: ['with', 'on', 'for', 'at'], exp: 'Put up with — терпеть.' },
        { q: 'Can you pick me ___ from the station?', o: ['up', 'on', 'off', 'out'], exp: 'Pick up — забрать.' }
      ]
    },
    {
      id: 'relative', title: 'Who, which, that, where, whose', level: 'B1', icon: 'who',
      why: 'Придаточные в тесте — 0 из 2. Это шаг к длинным предложениям уровня B1.',
      theory: [
        ['who', 'Про людей.', 'The man who lives next door is a doctor.'],
        ['which', 'Про вещи и животных.', 'The phone which I bought is broken.'],
        ['that', 'Про людей и вещи — в разговорной речи вместо who/which.', 'This is the book that I told you about.'],
        ['where / when', 'Место / время.', 'That\'s the café where we met.'],
        ['whose', '«Чей».', 'The girl whose bag was stolen called the police.']
      ],
      tip: 'Соединяй два коротких предложения в одно: «I have a friend. He speaks five languages.» → «I have a friend who speaks five languages.»',
      exercises: [
        { q: 'The man ___ lives next door is a doctor.', o: ['who', 'which', 'where', 'whose'], exp: 'Человек — who.' },
        { q: 'This is the book ___ I told you about.', o: ['that', 'who', 'where', 'whose'], exp: 'Вещь — that / which.' },
        { q: 'That\'s the café ___ we met.', o: ['where', 'which', 'who', 'when'], exp: 'Место — where.' },
        { q: 'The girl ___ bag was stolen called the police.', o: ['whose', 'who', 'which', 'that'], exp: 'Чья сумка — whose.' },
        { q: 'I have a friend ___ speaks five languages.', o: ['who', 'which', 'where', 'what'], exp: 'Человек — who.' },
        { q: 'The phone ___ I bought is broken.', o: ['which', 'who', 'where', 'whose'], exp: 'Вещь — which.' },
        { q: 'Do you remember the day ___ we first met?', o: ['when', 'where', 'which', 'who'], exp: 'Время — when.' },
        { q: 'This is the town ___ I grew up.', o: ['where', 'which', 'who', 'when'], exp: 'Место — where.' }
      ]
    },
    {
      id: 'cond', title: 'Условные предложения 0, 1, 2', level: 'B1', icon: 'If',
      why: 'Условные в тесте — 0 из 1. Без них не сказать «если…, то…».',
      theory: [
        ['Zero', 'If + Present, Present — факт.', 'If you heat ice, it melts.'],
        ['First', 'If + Present, will — реально в будущем.', 'If it rains, we will stay at home.'],
        ['Second', 'If + Past, would — нереально, мечта.', 'If I were rich, I would buy a house.'],
        ['Главное правило', 'После if не ставь will.', 'If you study hard, you will pass. (не «If you will study»)']
      ],
      tip: 'Сначала освой First Conditional — он встречается в речи чаще всего.',
      exercises: [
        { q: 'If you heat ice, it ___.', o: ['melts', 'will melt', 'melted', 'would melt'], exp: 'Zero: факт — Present.' },
        { q: 'If it rains tomorrow, we ___ at home.', o: ['will stay', 'stay', 'would stay', 'stayed'], exp: 'First: will.' },
        { q: 'If I ___ rich, I would buy a big house.', o: ['were', 'am', 'will be', 'be'], exp: 'Second: If I were.' },
        { q: 'If you ___ hard, you will pass the exam.', o: ['study', 'will study', 'studied', 'studying'], exp: 'После if — Present, не will.' },
        { q: 'What would you do if you ___ a lot of money?', o: ['had', 'have', 'will have', 'has'], exp: 'Second: Past Simple.' },
        { q: 'If I see him, I ___ him.', o: ['will tell', 'would tell', 'tell', 'told'], exp: 'First: will.' },
        { q: 'She will be angry if you ___ late.', o: ['are', 'will be', 'were', 'be'], exp: 'После if — Present.' },
        { q: 'If I ___ you, I\'d call her.', o: ['were', 'am', 'was being', 'will be'], exp: 'Совет: If I were you.' }
      ]
    }
  ],

  // ---------- слова ----------
  wordSets: [
    {
      id: 'mistakes', title: 'Слова из твоих ошибок', desc: 'То, что ты не знал в тесте (до B2)',
      words: [
        ['do homework', 'делать домашнее задание', 'Please do your homework before you watch TV.'],
        ['look for', 'искать', 'I\'m looking for my keys.'],
        ['turn on', 'включить', 'Could you turn on the light?'],
        ['honest', 'честный', 'She is very honest — she always tells the truth.'],
        ['put up with', 'терпеть', 'I can\'t put up with this noise.'],
        ['quit', 'уйти (с работы), бросить', 'She quit her job to travel.'],
        ['reach a decision', 'принять решение', 'We need to reach a decision by Friday.'],
        ['flair', 'талант, чутьё', 'She has a flair for languages.'],
        ['lay off', 'сократить (сотрудников)', 'The company laid off 200 workers.'],
        ['construction', 'строительство', 'The construction of the bridge took three years.']
      ]
    },
    {
      id: 'irregular', title: 'Неправильные глаголы', desc: '30 самых частых — нужны для Past Simple и Perfect',
      words: [
        ['be — was/were — been', 'быть', 'I was at home yesterday.'],
        ['have — had — had', 'иметь', 'We had a great time.'],
        ['do — did — done', 'делать', 'Have you done your homework?'],
        ['go — went — gone', 'идти, ехать', 'She went to Paris last year.'],
        ['see — saw — seen', 'видеть', 'I saw him yesterday.'],
        ['get — got — got', 'получать, становиться', 'I got a letter.'],
        ['make — made — made', 'делать, создавать', 'She made a cake.'],
        ['take — took — taken', 'брать', 'He took my pen.'],
        ['come — came — come', 'приходить', 'They came late.'],
        ['know — knew — known', 'знать', 'I knew the answer.'],
        ['think — thought — thought', 'думать', 'I thought you were busy.'],
        ['say — said — said', 'сказать', 'She said hello.'],
        ['tell — told — told', 'рассказать, сказать (кому-то)', 'He told me a story.'],
        ['give — gave — given', 'давать', 'She gave me a gift.'],
        ['find — found — found', 'находить', 'I found my keys.'],
        ['buy — bought — bought', 'покупать', 'We bought a new car.'],
        ['eat — ate — eaten', 'есть', 'Have you eaten?'],
        ['drink — drank — drunk', 'пить', 'I drank some water.'],
        ['write — wrote — written', 'писать', 'He wrote a letter.'],
        ['read — read — read', 'читать', 'I read this book last year.'],
        ['speak — spoke — spoken', 'говорить', 'She spoke to the manager.'],
        ['meet — met — met', 'встречать', 'We met at a party.'],
        ['leave — left — left', 'уходить, оставлять', 'He left at 6.'],
        ['begin — began — begun', 'начинать', 'The film began at 8.'],
        ['bring — brought — brought', 'приносить', 'She brought some food.'],
        ['feel — felt — felt', 'чувствовать', 'I felt tired.'],
        ['pay — paid — paid', 'платить', 'I paid by card.'],
        ['sleep — slept — slept', 'спать', 'I slept well.'],
        ['lose — lost — lost', 'терять', 'I lost my phone.'],
        ['understand — understood — understood', 'понимать', 'I understood everything.']
      ]
    },
    {
      id: 'b1', title: 'Слова для уровня B1', desc: 'Частые слова, которых не хватает для B1',
      words: [
        ['borrow', 'брать взаймы', 'Can I borrow your pen?'],
        ['lend', 'давать взаймы', 'Can you lend me 10 dollars?'],
        ['decide', 'решать', 'We decided to stay home.'],
        ['explain', 'объяснять', 'Can you explain this rule?'],
        ['improve', 'улучшать', 'I want to improve my English.'],
        ['prepare', 'готовить(ся)', 'I need to prepare for the exam.'],
        ['remember', 'помнить', 'I remember his name.'],
        ['forget', 'забывать', 'Don\'t forget your umbrella.'],
        ['enough', 'достаточно', 'We have enough time.'],
        ['expensive', 'дорогой', 'This phone is too expensive.'],
        ['cheap', 'дешёвый', 'The tickets were cheap.'],
        ['healthy', 'здоровый', 'Eat healthy food.'],
        ['dangerous', 'опасный', 'It\'s dangerous to swim here.'],
        ['comfortable', 'удобный', 'This chair is very comfortable.'],
        ['crowded', 'переполненный', 'The bus was crowded.'],
        ['interested in', 'интересующийся', 'I\'m interested in music.'],
        ['bored', 'скучающий', 'I\'m bored. Let\'s go out.'],
        ['worried', 'обеспокоенный', 'She looks worried.'],
        ['proud', 'гордый', 'I\'m proud of you.'],
        ['journey', 'поездка, путешествие', 'The journey took five hours.'],
        ['appointment', 'запись, встреча (к врачу и т. п.)', 'I have a doctor\'s appointment.'],
        ['advice', 'совет', 'Can you give me some advice?'],
        ['experience', 'опыт', 'Do you have any work experience?'],
        ['opportunity', 'возможность', 'This is a great opportunity.'],
        ['neighbour', 'сосед', 'My neighbour is very friendly.'],
        ['weather forecast', 'прогноз погоды', 'Did you see the weather forecast?'],
        ['receipt', 'чек', 'Can I have the receipt, please?'],
        ['luggage', 'багаж', 'Where can I leave my luggage?'],
        ['abroad', 'за границей, за границу', 'I want to study abroad.'],
        ['succeed', 'добиться успеха', 'If you work hard, you will succeed.']
      ]
    },
    {
      id: 'phrasal', title: 'Фразовые глаголы: база', desc: '20 самых нужных',
      words: [
        ['get up', 'вставать', 'I get up at 7.'],
        ['wake up', 'просыпаться', 'I woke up late today.'],
        ['look for', 'искать', 'What are you looking for?'],
        ['look after', 'присматривать', 'She looks after her little brother.'],
        ['turn on', 'включить', 'Turn on the light, please.'],
        ['turn off', 'выключить', 'Turn off your phone.'],
        ['put on', 'надеть', 'Put on your coat — it\'s cold.'],
        ['take off', 'снять; взлететь', 'Take off your shoes, please.'],
        ['give up', 'бросить, сдаться', 'Don\'t give up!'],
        ['find out', 'узнать, выяснить', 'I found out the truth.'],
        ['pick up', 'поднять; забрать', 'I\'ll pick you up at 8.'],
        ['come back', 'вернуться', 'When will you come back?'],
        ['go out', 'выйти, сходить куда-то', 'Let\'s go out tonight.'],
        ['sit down', 'сесть', 'Please sit down.'],
        ['write down', 'записать', 'Write down this number.'],
        ['try on', 'примерить', 'Can I try on these jeans?'],
        ['fill in', 'заполнить (анкету)', 'Please fill in this form.'],
        ['grow up', 'вырасти', 'I grew up in a small town.'],
        ['check in', 'зарегистрироваться (в отеле, аэропорту)', 'We checked in at the hotel.'],
        ['put up with', 'терпеть', 'I can\'t put up with it any more.']
      ]
    },
    {
      id: 'domake', title: 'Do или Make', desc: 'Ошибка из теста: make homework вместо do',
      words: [
        ['do homework', 'делать домашку', 'I do my homework after dinner.'],
        ['do the shopping', 'ходить за покупками', 'I do the shopping on Saturdays.'],
        ['do the dishes', 'мыть посуду', 'Can you do the dishes?'],
        ['do exercise', 'заниматься спортом', 'I do exercise every morning.'],
        ['do someone a favour', 'сделать одолжение', 'Can you do me a favour?'],
        ['do your best', 'стараться изо всех сил', 'Just do your best.'],
        ['make a mistake', 'ошибиться', 'Everyone makes mistakes.'],
        ['make a decision', 'принять решение', 'I made a decision.'],
        ['make breakfast', 'приготовить завтрак', 'Mum is making breakfast.'],
        ['make money', 'зарабатывать деньги', 'He makes a lot of money.'],
        ['make friends', 'заводить друзей', 'It\'s easy to make friends at school.'],
        ['make a phone call', 'позвонить', 'I need to make a phone call.'],
        ['make noise', 'шуметь', 'Don\'t make noise — the baby is sleeping.'],
        ['make plans', 'строить планы', 'Let\'s make plans for the weekend.']
      ]
    },
    {
      id: 'linking', title: 'Связки и полезные фразы', desc: 'Чтобы говорить длинными предложениями',
      words: [
        ['because', 'потому что', 'I stayed home because I was ill.'],
        ['so', 'поэтому, так что', 'It was late, so we took a taxi.'],
        ['but', 'но', 'I like tea, but I don\'t like coffee.'],
        ['although', 'хотя', 'Although it was cold, we went out.'],
        ['however', 'однако', 'It\'s cheap. However, it\'s slow.'],
        ['first of all', 'прежде всего', 'First of all, I want to say thank you.'],
        ['then', 'потом', 'We had dinner, then we watched a film.'],
        ['after that', 'после этого', 'After that, we went home.'],
        ['finally', 'наконец', 'Finally, we arrived.'],
        ['for example', 'например', 'I like sports, for example, tennis.'],
        ['in my opinion', 'по-моему', 'In my opinion, this film is great.'],
        ['I think that…', 'я думаю, что…', 'I think that English is useful.'],
        ['on the other hand', 'с другой стороны', 'On the other hand, it\'s expensive.'],
        ['I\'m not sure', 'я не уверен', 'I\'m not sure about that.']
      ]
    }
  ],

  // ---------- план на 12 недель: A2 → B1 ----------
  plan: [
    { week: 1, focus: 'Present Simple и Continuous', tasks: ['Урок «Present Simple и Present Continuous»', 'Набор «Слова из твоих ошибок» — 10 слов', 'Extra English: 2 серии с английскими субтитрами', 'Написать 5 предложений о своём обычном дне'] },
    { week: 2, focus: 'Past Simple', tasks: ['Урок «Past Simple и неправильные глаголы»', 'Неправильные глаголы: первые 15', 'Peppa Pig или Extra English: 3 серии', 'Рассказать вслух, что делал вчера (5 предложений)'] },
    { week: 3, focus: 'Неправильные глаголы и предлоги', tasks: ['Неправильные глаголы: оставшиеся 15', 'Урок «Предлоги in, on, at, to»', 'News in Levels (уровень 1): 3 новости', 'Работа над ошибками теста — все вопросы'] },
    { week: 4, focus: 'Будущее время', tasks: ['Урок «Будущее: will и going to»', 'Набор «Do или Make»', 'Повторно пройти экспресс-тест', 'Написать план на следующую неделю (going to)'] },
    { week: 5, focus: 'Present Perfect', tasks: ['Урок «Present Perfect или Past Simple»', 'Слова для B1: 1–15', 'Friends: 2 серии с английскими субтитрами', 'Написать 5 предложений «I have never…»'] },
    { week: 6, focus: 'Фразовые глаголы', tasks: ['Урок «Фразовые глаголы: база»', 'Набор «Фразовые глаголы: база»', 'BBC 6 Minute English: 3 выпуска', 'Повторить все слова со статусом «учу»'] },
    { week: 7, focus: 'Степени сравнения и модальные', tasks: ['Урок «Степени сравнения»', 'Урок «Can, must, have to, should»', 'Слова для B1: 16–30', 'Сравнить письменно два города (5 предложений)'] },
    { week: 8, focus: 'Промежуточная проверка', tasks: ['Повторно пройти полный тест — цель 35+', 'Все уроки недель 1–7 — не меньше 6/8', 'Friends: 3 серии', 'Прочитать 1 книгу Penguin Readers уровня 2'] },
    { week: 9, focus: 'Придаточные предложения', tasks: ['Урок «Who, which, that, where, whose»', 'Набор «Связки и полезные фразы»', 'Young Sheldon: 3 серии', 'Описать 5 друзей одним предложением с who'] },
    { week: 10, focus: 'Условные предложения', tasks: ['Урок «Условные предложения 0, 1, 2»', 'Написать 5 предложений «If I were rich…»', 'VOA Learning English: 3 статьи', 'Paddington или Toy Story без русских субтитров'] },
    { week: 11, focus: 'Речь и письмо', tasks: ['Повторить уроки, где меньше 7/8', 'Все наборы слов — 70% в статусе «знаю»', 'Написать письмо другу (80–100 слов) со связками', 'Brooklyn Nine-Nine: 2 серии'] },
    { week: 12, focus: 'Итоговая проверка', tasks: ['Пройти полный тест — цель 40+ (B1)', 'Все 10 уроков — не меньше 7/8', 'Пробный вариант B1 Preliminary Reading на сайте Cambridge', 'Составить план на следующие 3 месяца'] }
  ],

  daily: [
    ['10 мин', 'Карточки со словами — раздел «Слова»'],
    ['10 мин', 'Урок недели или упражнения'],
    ['15 мин', 'Серия или видео с английскими субтитрами'],
    ['5 мин', 'Выписать 3 новые фразы и произнести вслух']
  ],

  // ---------- что смотреть и читать ----------
  media: [
    {
      title: 'Сериалы', note: 'Только с английскими субтитрами. Если понимаешь меньше половины — возьми сериал попроще.',
      items: [
        ['Extra English', 'A2', 'Ситком, специально снятый для изучающих английский. Медленная речь, простая лексика.'],
        ['Peppa Pig', 'A1–A2', 'Короткие серии, чёткий британский английский. Отлично для аудирования.'],
        ['Friends', 'B1', 'Бытовые разговоры и много повторяющихся фраз. Начни с первого сезона.'],
        ['Young Sheldon', 'B1', 'Понятная речь, короткие серии по 20 минут.'],
        ['Modern Family', 'B1', 'Семейные ситуации, разговорный английский.'],
        ['Brooklyn Nine-Nine', 'B1–B2', 'Цель на конец плана: быстрее и больше юмора.']
      ]
    },
    {
      title: 'Фильмы',
      items: [
        ['Toy Story', 'A2', 'Простые диалоги, знакомый сюжет.'],
        ['Finding Nemo', 'A2', 'Медленная речь, понятная история.'],
        ['Paddington', 'A2–B1', 'Чёткий британский английский.'],
        ['Up', 'A2–B1', 'Мало диалогов, но все важные.'],
        ['Home Alone', 'B1', 'Классика с простыми фразами.'],
        ['Shrek', 'B1', 'Много шуток и разговорных выражений.']
      ]
    },
    {
      title: 'X (Twitter): аккаунты для ленты', note: 'Короткие посты каждый день — лёгкая практика чтения.',
      items: [
        ['@bbcle', 'A2–B1', 'BBC Learning English: слова и мини-уроки.', 'https://x.com/bbcle'],
        ['@VOALearningEng', 'A2–B1', 'VOA Learning English: новости простым языком.', 'https://x.com/VOALearningEng'],
        ['@CambridgeWords', 'B1', 'Словарь Cambridge: слово дня.', 'https://x.com/CambridgeWords'],
        ['@MerriamWebster', 'B1', 'Слова дня и смешные заметки о словах.', 'https://x.com/MerriamWebster'],
        ['@NASA', 'B1', 'Короткие посты о космосе с фото.', 'https://x.com/NASA']
      ]
    },
    {
      title: 'Статьи и новости',
      items: [
        ['News in Levels', 'A2', 'Новости в 3 уровнях сложности. Начни с уровня 1.', 'https://www.newsinlevels.com/'],
        ['VOA Learning English', 'A2–B1', 'Новости медленным английским с аудио.', 'https://learningenglish.voanews.com/'],
        ['BBC Learning English', 'A2–B1', 'Уроки, видео и 6 Minute English.', 'https://www.bbc.co.uk/learningenglish/'],
        ['Breaking News English', 'A2–B1', 'Новости с упражнениями.', 'https://breakingnewsenglish.com/']
      ]
    },
    {
      title: 'YouTube и подкасты',
      items: [
        ['6 Minute English (BBC)', 'B1', 'Подкаст на 6 минут с разбором слов.'],
        ['Easy English', 'A2–B1', 'Уличные интервью с субтитрами на двух языках.'],
        ['English with Lucy', 'A2–B1', 'Грамматика и произношение простыми словами.'],
        ['Learn English with TV Series', 'B1', 'Разбор фраз из сериалов и фильмов.']
      ]
    },
    {
      title: 'Книги',
      items: [
        ['Penguin Readers, уровни 2–3', 'A2–B1', 'Адаптированные книги с аудио.'],
        ['Oxford Bookworms, Stage 2–3', 'A2–B1', 'Классика в простом пересказе.'],
        ['Diary of a Wimpy Kid', 'B1', 'Комиксы-дневник, простой разговорный язык.'],
        ['Charlie and the Chocolate Factory', 'B1', 'Короткие главы, весёлый сюжет.']
      ]
    }
  ],

  // Вопросы теста, в которых были ошибки (в PDF показан разбор раздела «Лексика»)
  mistakes: [
    'Please ___ your homework', 'I\'m looking ___ my keys', 'Could you turn ___ the light', 'She is very ___',
    'I can\'t ___ with this noise', 'She ___ her job because', 'We need to ___ a decision', 'She has a ___ for languages',
    'The company had to ___', 'The ___ of the new bridge', 'The evidence was', 'The minister\'s speech',
    'The speech was a masterclass', 'The scandal cast', 'The novel\'s plot', 'His ___ attitude'
  ]
};
