// Персональный раздел SUNAKLE: профиль, план, уроки, слова и рекомендации.
// Составлено по результату теста от 25 октября 2026 г. (B1+, 51/100).
window.PERSONAL = {
  title: 'SUNAKLE',
  storeKey: 'sunakle_v1',
  mediaIntro: 'Подобрано под твой уровень: понимание у тебя уже B2, поэтому можно брать оригинальные сериалы и статьи. Начинай с материалов уровня B1–B2 и двигайся к B2–C1.',
  profile: {
    date: '25 октября 2026',
    intro: 'Понимаешь ты уже на B2, а грамматика отстаёт на уровень — поэтому главный фокус на ней.',
    level: 'B1+', name: 'Intermediate', score: 51, range: '46–56',
    cambridge: 155, ielts: '5.0', toefl: 64, vocab: 2900,
    target: 'B2', targetScore: 55, targetExam: 'B2 First (FCE)',
    skills: [
      { name: 'Грамматика', level: 'A2+', c: 15, n: 30 },
      { name: 'Лексика', level: 'B1+', c: 14, n: 24 },
      { name: 'Чтение', level: 'B2', c: 6, n: 10 },
      { name: 'Аудирование', level: 'B2', c: 8, n: 12 }
    ],
    strong: [
      'Чтение и аудирование уже на уровне B2 — понимаешь больше, чем можешь сказать',
      'Без ошибок: вопросы, степени сравнения, придаточные, словообразование',
      'Хорошо ловишь детали в тексте и речи (9/11)'
    ],
    weak: [
      'Грамматика отстаёт от остальных навыков на целый уровень (A2+)',
      'Условные предложения — 0 из 3, wish и it\'s time — 1 из 4',
      'Модальные глаголы предположения, инверсия, косвенная речь, герундий',
      'Лексика уровня B2–C1 и сочетаемость слов (rise sharply, reach a decision)',
      'Идиомы и переносный смысл в речи (bite off more than you can chew)'
    ]
  },

  // ---------- уроки ----------
  lessons: [
    {
      id: 'cond', title: 'Условные предложения', level: 'B1–B2', icon: 'If',
      why: 'В тесте 0 из 3: перепутал If и Had в третьем типе, не знал «had it not been for».',
      theory: [
        ['Zero', 'If + Present, Present — факты и законы природы.', 'If you heat ice, it melts.'],
        ['First', 'If + Present, will + V — реальное будущее.', 'If it rains tomorrow, we\'ll stay at home.'],
        ['Second', 'If + Past, would + V — нереальное настоящее или будущее. С I/he/she — were.', 'If I had more time, I would travel. If I were you, I\'d call her.'],
        ['Third', 'If + Past Perfect, would have + V3 — нереальное прошлое, сожаление.', 'If I had studied, I would have passed.'],
        ['Mixed', 'Прошлое условие → настоящий результат.', 'If I had taken that job, I would be rich now.'],
        ['Инверсия', 'Had/Were/Should вместо If — формальный стиль.', 'Had I known, I would have helped. Had it not been for you, we would have failed.'],
        ['Unless', 'Unless = if not.', 'We won\'t go unless you come with us.']
      ],
      tip: 'В части с if никогда не ставь will и would: «If I will see him» — ошибка.',
      exercises: [
        { q: 'If I ___ you, I would talk to her.', o: ['were', 'am', 'would be', 'will be'], exp: 'Second Conditional: If I were you.' },
        { q: 'If you heat water to 100°C, it ___.', o: ['boils', 'boiled', 'would boil', 'had boiled'], exp: 'Zero Conditional: факт — Present Simple в обеих частях.' },
        { q: 'If she had left earlier, she ___ the train.', o: ['would have caught', 'would catch', 'will catch', 'had caught'], exp: 'Third Conditional: would have + V3.' },
        { q: 'We won\'t go out ___ the rain stops.', o: ['unless', 'if', 'except', 'without'], exp: 'Unless = if not: «если дождь не прекратится».' },
        { q: 'If I had taken that job, I ___ rich now.', o: ['would be', 'would have been', 'will be', 'am'], exp: 'Mixed: прошлое условие, результат сейчас (now) — would be.' },
        { q: '___ it not been for the map, we would have got lost.', o: ['Had', 'If', 'Were', 'Should'], exp: 'Had it not been for — «если бы не».' },
        { q: 'What would you do if you ___ a million dollars?', o: ['won', 'win', 'had won', 'will win'], exp: 'Second Conditional: If + Past Simple.' },
        { q: 'If I ___ about the party, I would have come.', o: ['had known', 'knew', 'would know', 'have known'], exp: 'Third Conditional: If + Past Perfect.' }
      ]
    },
    {
      id: 'wish', title: 'Wish, It\'s time, Would rather', level: 'B2', icon: '✦',
      why: 'В тесте 1 из 4: «I wish I have» вместо «had», «It\'s high time you start» вместо «started».',
      theory: [
        ['Wish + Past', 'Сожаление о настоящем.', 'I wish I had more time. (= у меня мало времени)'],
        ['Wish + Past Perfect', 'Сожаление о прошлом.', 'I wish I had gone to the party.'],
        ['Wish + would', 'Раздражение, хочется, чтобы кто-то изменил поведение.', 'I wish you would stop interrupting me!'],
        ['If only', 'То же, что wish, но эмоциональнее.', 'If only I knew her number!'],
        ['It\'s (high) time + Past', '«Давно пора» — после time ставим прошедшее.', 'It\'s time we went home.'],
        ['Would rather', 'Про себя — инфинитив без to; про другого — Past.', 'I\'d rather stay at home. I\'d rather you didn\'t smoke.']
      ],
      tip: 'Форма прошедшая, а смысл — настоящий. Это «шаг назад во времени», как во втором условном.',
      exercises: [
        { q: 'I wish I ___ taller.', o: ['were', 'am', 'would be', 'had been'], exp: 'Wish о настоящем: were.' },
        { q: 'I wish I ___ to the party yesterday.', o: ['had gone', 'went', 'would go', 'have gone'], exp: 'Wish о прошлом: Past Perfect.' },
        { q: 'I wish you ___ interrupting me!', o: ['would stop', 'stop', 'will stop', 'had stopped'], exp: 'Раздражение — wish + would.' },
        { q: 'It\'s time we ___ home.', o: ['went', 'go', 'will go', 'have gone'], exp: 'It\'s time + Past Simple.' },
        { q: 'I\'d rather you ___ smoke in the car.', o: ['didn\'t', 'don\'t', 'won\'t', 'not'], exp: 'Would rather + другое лицо + Past.' },
        { q: 'If only I ___ more money now!', o: ['had', 'have', 'would have', 'will have'], exp: 'If only о настоящем: Past Simple.' },
        { q: 'I\'d rather ___ at home tonight.', o: ['stay', 'to stay', 'staying', 'stayed'], exp: 'Про себя: would rather + инфинитив без to.' },
        { q: 'She wishes she ___ speak French.', o: ['could', 'can', 'will', 'is able'], exp: 'Can в прошедшем — could.' }
      ]
    },
    {
      id: 'modals', title: 'Модальные глаголы: запрет и предположение', level: 'B1–B2', icon: 'M',
      why: 'В тесте «shouldn\'t to» вместо «mustn\'t» и «should have» вместо «must have».',
      theory: [
        ['must', 'Уверен, что да (≈ 95%).', 'He must be tired — he worked all night.'],
        ['can\'t', 'Уверен, что нет.', 'She can\'t be at home — the lights are off.'],
        ['might / may / could', 'Возможно (≈ 50%).', 'He might be in the library.'],
        ['must have / can\'t have + V3', 'Уверенное предположение о прошлом.', 'She must have left — her coat is gone.'],
        ['should have + V3', 'Упрёк: «следовало бы», но не сделал.', 'You should have told me!'],
        ['mustn\'t vs don\'t have to', 'mustn\'t — запрещено; don\'t have to — не обязательно.', 'You mustn\'t park here. You don\'t have to come.']
      ],
      tip: 'После модальных глаголов нет to: «should to go» — ошибка. Исключения: have to, ought to.',
      exercises: [
        { q: 'The lights are off. They ___ be at home.', o: ['can\'t', 'mustn\'t', 'shouldn\'t', 'don\'t have to'], exp: 'Уверенное «нет» — can\'t.' },
        { q: 'She ___ have left already — her coat is gone.', o: ['must', 'can\'t', 'should', 'would'], exp: 'Уверенное «да» о прошлом — must have.' },
        { q: 'You ___ have told me! I would have helped.', o: ['should', 'must', 'can', 'will'], exp: 'Упрёк — should have.' },
        { q: 'He ___ have stolen it — he was with me all day.', o: ['can\'t', 'mustn\'t', 'shouldn\'t', 'needn\'t'], exp: 'Невозможно в прошлом — can\'t have.' },
        { q: 'You ___ wear a uniform at weekends — it\'s optional.', o: ['don\'t have to', 'mustn\'t', 'can\'t', 'shouldn\'t'], exp: 'Не обязательно — don\'t have to.' },
        { q: 'I\'m not sure where Tom is. He ___ be in the library.', o: ['might', 'must', 'can\'t', 'should to'], exp: 'Не уверен — might.' },
        { q: 'You ___ park here — it\'s a fire exit.', o: ['mustn\'t', 'don\'t have to', 'needn\'t', 'might not'], exp: 'Запрет — mustn\'t.' },
        { q: 'They ___ have got lost — they\'ve been there many times.', o: ['can\'t', 'must', 'might', 'should'], exp: 'Не могли заблудиться — can\'t have.' }
      ]
    },
    {
      id: 'tenses', title: 'Времена: Past Perfect и Present Perfect', level: 'B1–B2', icon: '⟲',
      why: 'В тесте «has already started» вместо «had already started».',
      theory: [
        ['Past Simple', 'Законченное действие в прошлом, есть время.', 'I saw him yesterday.'],
        ['Past Continuous', 'Процесс в момент в прошлом, часто прерванный.', 'I was cooking when the phone rang.'],
        ['Past Perfect', 'Действие ДО другого действия в прошлом.', 'When we arrived, the film had already started.'],
        ['Present Perfect', 'Опыт или результат к настоящему, без точного времени.', 'I have lived here since 2018. Have you ever tried sushi?'],
        ['Present Perfect Continuous', 'Длится до сих пор, акцент на процессе.', 'How long have you been learning English?'],
        ['Past Perfect Continuous', 'Длилось до момента в прошлом.', 'She was tired because she had been working all day.']
      ],
      tip: 'Есть yesterday / last year / in 2020 — Past Simple. Есть since / for / ever / just — скорее Present Perfect. «By the time + прошлое» — Past Perfect.',
      exercises: [
        { q: 'By the time we arrived, the film ___.', o: ['had already started', 'has already started', 'already starts', 'was already starting'], exp: 'Действие до момента в прошлом — Past Perfect.' },
        { q: 'I ___ in Moscow since 2018.', o: ['have lived', 'lived', 'had lived', 'am living'], exp: 'Since + до сих пор — Present Perfect.' },
        { q: 'She was tired because she ___ all day.', o: ['had been working', 'has been working', 'works', 'is working'], exp: 'Длилось до момента в прошлом — Past Perfect Continuous.' },
        { q: 'While I ___ dinner, the phone rang.', o: ['was cooking', 'cooked', 'had cooked', 'have cooked'], exp: 'Процесс, прерванный действием, — Past Continuous.' },
        { q: '___ sushi?', o: ['Have you ever tried', 'Did you ever tried', 'Had you ever try', 'Are you ever trying'], exp: 'Опыт — Present Perfect с ever.' },
        { q: 'I ___ him yesterday.', o: ['saw', 'have seen', 'had seen', 'was seeing'], exp: 'Yesterday — Past Simple.' },
        { q: 'When I got home, I realised I ___ my phone at work.', o: ['had left', 'have left', 'was leaving', 'leave'], exp: 'Оставил ДО того, как пришёл домой, — Past Perfect.' },
        { q: 'How long ___ English?', o: ['have you been learning', 'are you learning', 'do you learn', 'had you learned'], exp: 'Процесс до сих пор — Present Perfect Continuous.' }
      ]
    },
    {
      id: 'reported', title: 'Косвенная речь и косвенные вопросы', level: 'B1', icon: '“ ”',
      why: 'В тесте «He asked me where do I live» вместо «where I lived».',
      theory: [
        ['Сдвиг времён', 'Present → Past, Past → Past Perfect, will → would.', '"I am tired" → She said she was tired.'],
        ['Вопросы', 'Прямой порядок слов, без do/does/did, без знака вопроса.', '"Where do you live?" → He asked me where I lived.'],
        ['Да/нет вопросы', 'If или whether.', 'She asked if I could help her.'],
        ['Просьбы и приказы', 'tell/ask + (not) to + V.', 'He told me not to be late.'],
        ['Вежливые вопросы', 'Can you tell me / I wonder + прямой порядок.', 'Can you tell me what time the train leaves?'],
        ['Указатели', 'yesterday → the day before, tomorrow → the next day, here → there.', 'They said they had seen it the day before.']
      ],
      tip: 'Главная ловушка — порядок слов. В косвенном вопросе он как в утверждении: where I lived, what time it is.',
      exercises: [
        { q: 'He asked me where ___.', o: ['I lived', 'did I live', 'do I live', 'I do live'], exp: 'Прямой порядок и сдвиг времени.' },
        { q: 'She said she ___ tired.', o: ['was', 'were', 'be', 'being'], exp: 'Am → was.' },
        { q: 'Can you tell me what time ___?', o: ['the train leaves', 'does the train leave', 'leaves the train', 'the train does leave'], exp: 'Вежливый вопрос — прямой порядок.' },
        { q: 'He told me ___ late.', o: ['not to be', 'don\'t be', 'to not being', 'not be'], exp: 'Told + not to + V.' },
        { q: 'She asked ___ I could help her.', o: ['if', 'that', 'what', 'do'], exp: 'Вопрос да/нет — if/whether.' },
        { q: '"I will call you," he said. → He said he ___ me.', o: ['would call', 'will call', 'calls', 'called'], exp: 'Will → would.' },
        { q: 'I wonder ___.', o: ['where she is', 'where is she', 'where does she is', 'is where she'], exp: 'После I wonder — прямой порядок.' },
        { q: '"We saw the film yesterday." → They said they ___ the film the day before.', o: ['had seen', 'have seen', 'see', 'were seeing'], exp: 'Past → Past Perfect.' }
      ]
    },
    {
      id: 'gerund', title: 'Герундий или инфинитив', level: 'B1–B2', icon: '-ing',
      why: 'В тесте «looking forward to see» вместо «to seeing».',
      theory: [
        ['После предлогов', 'Всегда -ing, в том числе после предлога to.', 'I\'m looking forward to seeing you. I\'m used to getting up early.'],
        ['Глаголы + -ing', 'enjoy, mind, avoid, suggest, deny, finish, keep, consider.', 'She suggested taking a taxi.'],
        ['Глаголы + to', 'want, decide, hope, plan, refuse, agree, promise, manage.', 'They decided to buy a car.'],
        ['used to vs be used to', 'used to + V — привычка в прошлом; be used to + -ing — привык.', 'I used to play football. I\'m used to working late.'],
        ['stop / remember / try', 'Значение меняется.', 'I stopped smoking (бросил). I stopped to buy coffee (остановился, чтобы купить).']
      ],
      tip: 'Если после to можно поставить существительное (look forward to the party), то to — предлог, и дальше идёт -ing.',
      exercises: [
        { q: 'I\'m looking forward ___ you.', o: ['to seeing', 'to see', 'seeing', 'for seeing'], exp: 'Look forward to + -ing.' },
        { q: 'She suggested ___ a taxi.', o: ['taking', 'to take', 'take', 'to taking'], exp: 'Suggest + -ing.' },
        { q: 'He denied ___ the money.', o: ['taking', 'to take', 'take', 'took'], exp: 'Deny + -ing.' },
        { q: 'I\'m used to ___ up early.', o: ['getting', 'get', 'got', 'be getting'], exp: 'Be used to + -ing.' },
        { q: 'I used ___ football every day as a child.', o: ['to play', 'playing', 'play', 'to playing'], exp: 'Used to + V — привычка в прошлом.' },
        { q: 'They decided ___ a new car.', o: ['to buy', 'buying', 'buy', 'bought'], exp: 'Decide + to.' },
        { q: 'Do you mind ___ the window?', o: ['opening', 'to open', 'open', 'opened'], exp: 'Mind + -ing.' },
        { q: 'On the way home I stopped ___ some coffee.', o: ['to buy', 'buying', 'buy', 'bought'], exp: 'Stop + to — остановиться, чтобы что-то сделать.' }
      ]
    },
    {
      id: 'passive', title: 'Пассивный залог', level: 'B1–B2', icon: '⇄',
      why: 'В тесте не знал конструкцию «He is said to be…».',
      theory: [
        ['Формула', 'be (в нужном времени) + V3.', 'English is spoken here. The bridge will be built next year.'],
        ['Continuous', 'be being + V3.', 'My car is being repaired.'],
        ['Perfect', 'have been + V3.', 'The book has been read by millions.'],
        ['It is said that…', 'Безличный пассив с say, believe, think, know.', 'It is believed that the company will close.'],
        ['He is said to…', 'Личный вариант + to-infinitive.', 'He is said to be very rich.'],
        ['Have something done', 'Кто-то делает для тебя.', 'I had my hair cut yesterday.']
      ],
      tip: 'Пассив нужен, когда важно действие, а не тот, кто его совершил. В новостях и статьях он встречается постоянно.',
      exercises: [
        { q: 'The book ___ by millions of people.', o: ['has been read', 'has read', 'have been read', 'was reading'], exp: 'Present Perfect Passive.' },
        { q: 'He is said ___ very rich.', o: ['to be', 'being', 'be', 'that he is'], exp: 'Is said + to-infinitive.' },
        { q: 'The bridge ___ next year.', o: ['will be built', 'will build', 'is building', 'builds'], exp: 'Future Passive.' },
        { q: 'My car ___ right now.', o: ['is being repaired', 'is repairing', 'repairs', 'has repaired'], exp: 'Present Continuous Passive.' },
        { q: 'I had my hair ___ yesterday.', o: ['cut', 'cutting', 'to cut', 'cuts'], exp: 'Have something done: V3.' },
        { q: 'English ___ in many countries.', o: ['is spoken', 'speaks', 'is speaking', 'spoke'], exp: 'Present Simple Passive.' },
        { q: 'The thief ___ by the police last night.', o: ['was caught', 'caught', 'has caught', 'is caught'], exp: 'Past Simple Passive.' },
        { q: 'It ___ that the company will close.', o: ['is believed', 'believes', 'is believing', 'believed'], exp: 'Безличный пассив.' }
      ]
    },
    {
      id: 'inversion', title: 'Инверсия: шаг к B2–C1', level: 'B2–C1', icon: '↕',
      why: 'В тесте 1 из 3: «Not only he was», «No sooner we left».',
      theory: [
        ['Зачем', 'Отрицательное или ограничительное слово в начале → порядок как в вопросе.', 'Never have I seen such a place.'],
        ['Not only', 'Not only + вспомогательный + подлежащее.', 'Not only was he late, but he also forgot the tickets.'],
        ['No sooner … than', 'Едва … как.', 'No sooner had we left than it started raining.'],
        ['Never / Rarely / Seldom', 'Эмфаза.', 'Rarely does he get up early.'],
        ['Only then / Only after', 'Инверсия в главной части.', 'Only then did I understand the truth.'],
        ['Had / Should / Were', 'Вместо if.', 'Should you need help, call me.']
      ],
      tip: 'Начни с одной конструкции, например «Not only… but also», и используй её в письме. Это сразу поднимает уровень текста.',
      exercises: [
        { q: 'Not only ___ late, but he also forgot the tickets.', o: ['was he', 'he was', 'he is', 'did he be'], exp: 'Not only + инверсия.' },
        { q: '___ I known, I would have helped.', o: ['Had', 'If', 'Did', 'Have'], exp: 'Had I known = If I had known.' },
        { q: 'No sooner ___ home than it started raining.', o: ['had we got', 'we had got', 'did we get', 'we got'], exp: 'No sooner had + подлежащее + V3.' },
        { q: 'Never ___ such a beautiful place.', o: ['have I seen', 'I have seen', 'I saw', 'saw I'], exp: 'Never + инверсия.' },
        { q: 'Rarely ___ so early.', o: ['does he get up', 'he gets up', 'gets he up', 'he does get up'], exp: 'Rarely + does + подлежащее + V.' },
        { q: 'Only then ___ the truth.', o: ['did I understand', 'I understood', 'understood I', 'I did understand'], exp: 'Only then + инверсия.' },
        { q: '___ you need any help, call me.', o: ['Should', 'Would', 'Had', 'Were'], exp: 'Should you need = If you need.' },
        { q: 'Little ___ what was going to happen.', o: ['did they know', 'they knew', 'knew they', 'they did know'], exp: 'Little + инверсия.' }
      ]
    },
    {
      id: 'articles', title: 'Артикли и притяжательный падеж', level: 'A2–B1', icon: 'a/the',
      why: 'В тесте «my sisters books» вместо «my sister\'s books».',
      theory: [
        ['\'s', 'Принадлежность одному.', 'my sister\'s books (книги сестры)'],
        ['s\'', 'Множественное на -s — только апостроф.', 'my parents\' car (машина родителей)'],
        ['Особое множественное', 'children, men, women + \'s.', 'the children\'s toys'],
        ['a / an', 'Один из многих, профессия, впервые упоминается.', 'She is an engineer.'],
        ['the', 'Единственный в своём роде, уже известный, музыкальные инструменты.', 'The sun rises in the east. He plays the guitar.'],
        ['без артикля', 'Общие понятия, неисчисляемые в общем смысле.', 'I love music.']
      ],
      tip: 'Произнеси вслух: sister\'s и sisters звучат одинаково, разница только на письме. Проверяй себя вопросом «чьё?».',
      exercises: [
        { q: 'These are my ___ books.', o: ['sister\'s', 'sisters', 'sister', 'sisters\'s'], exp: 'Книги одной сестры — sister\'s.' },
        { q: 'This is my ___ car (машина родителей).', o: ['parents\'', 'parent\'s', 'parents\'s', 'parents'], exp: 'Множественное на -s — только апостроф.' },
        { q: 'She is ___ engineer.', o: ['an', 'a', 'the', '—'], exp: 'Профессия, гласный звук — an.' },
        { q: 'I love ___ music.', o: ['—', 'the', 'a', 'an'], exp: 'Музыка вообще — без артикля.' },
        { q: '___ sun rises in the east.', o: ['The', 'A', '—', 'An'], exp: 'Единственный в своём роде — the.' },
        { q: 'He plays ___ guitar very well.', o: ['the', 'a', '—', 'an'], exp: 'Музыкальные инструменты — the.' },
        { q: 'We went to ___ cinema last night.', o: ['the', 'a', '—', 'an'], exp: 'Go to the cinema — устойчиво.' },
        { q: 'The ___ toys are everywhere.', o: ['children\'s', 'childrens\'', 'childs\'', 'children'], exp: 'Children + \'s.' }
      ]
    },
    {
      id: 'colloc', title: 'Сочетаемость слов', level: 'B2', icon: '+',
      why: 'В тесте «risen highly», «get a decision», «blank promises».',
      theory: [
        ['Что это', 'Слова, которые «дружат». Переводить дословно нельзя.', 'heavy rain (не strong rain), strong coffee (не heavy coffee)'],
        ['make', 'Создаём результат.', 'make a decision, make a mistake, make progress, make an effort'],
        ['do', 'Выполняем работу.', 'do homework, do research, do business, do someone a favour'],
        ['take', 'Действие, шаг.', 'take a risk, take a break, take part, take advantage'],
        ['Наречия', 'Глагол + наречие.', 'rise sharply, deeply concerned, highly likely, bitterly disappointed'],
        ['Прилагательные', 'Устойчивые пары.', 'hollow promises, heavy traffic, a narrow escape']
      ],
      tip: 'Учи слова сразу парами и фразами, а не по одному. В разделе «Слова» есть набор коллокаций.',
      exercises: [
        { q: 'Unemployment has risen ___ over the last year.', o: ['sharply', 'highly', 'heavily', 'strongly'], exp: 'Rise sharply.' },
        { q: 'We need to ___ a decision by Friday.', o: ['reach', 'do', 'get', 'say'], exp: 'Reach / make a decision.' },
        { q: 'His speech was full of ___ promises.', o: ['hollow', 'blank', 'void', 'hallow'], exp: 'Hollow promises — пустые обещания.' },
        { q: 'I can\'t put up ___ this noise.', o: ['with', 'on', 'for', 'at'], exp: 'Put up with — терпеть.' },
        { q: 'Everybody ___ mistakes sometimes.', o: ['makes', 'does', 'takes', 'has'], exp: 'Make a mistake.' },
        { q: 'Please ___ attention to the details.', o: ['pay', 'give', 'make', 'do'], exp: 'Pay attention.' },
        { q: 'There was very ___ rain last night.', o: ['heavy', 'strong', 'big', 'hard'], exp: 'Heavy rain.' },
        { q: 'Don\'t be afraid to ___ risks.', o: ['take', 'make', 'do', 'get'], exp: 'Take a risk.' }
      ]
    }
  ],

  // ---------- слова ----------
  wordSets: [
    {
      id: 'mistakes', title: 'Слова из твоих ошибок', desc: 'Всё, что ты не знал в тесте',
      words: [
        ['convoluted', 'запутанный, сложный', 'His explanation was so convoluted that nobody understood it.'],
        ['flimsy', 'хлипкий, неубедительный', 'The evidence was too flimsy to convict him.'],
        ['hollow promises', 'пустые обещания', 'Voters are tired of hollow promises.'],
        ['obfuscation', 'намеренное запутывание', 'The report was a piece of deliberate obfuscation.'],
        ['byzantine', 'крайне запутанный', 'The rules are byzantine.'],
        ['cast a pall over', 'омрачить', 'The news cast a pall over the celebrations.'],
        ['undeterred', 'не испугавшийся', 'Undeterred by the rain, they went hiking.'],
        ['put up with', 'терпеть, мириться', 'I can\'t put up with his jokes any more.'],
        ['rise sharply', 'резко вырасти', 'Prices rose sharply last month.'],
        ['reach a decision', 'принять решение', 'The jury failed to reach a decision.'],
        ['bite off more than you can chew', 'взяться за непосильное', 'With three jobs, he has bitten off more than he can chew.'],
        ['gloss over', 'замалчивать, обходить стороной', 'The report glosses over the main problem.'],
        ['such as it was', 'если это можно так назвать', 'Dinner, such as it was, was a slice of bread.'],
        ['earth-shattering', 'сенсационный', 'The results were hardly earth-shattering.'],
        ['lend weight to', 'подкреплять (идею)', 'New data lend weight to the theory.']
      ]
    },
    {
      id: 'b2', title: 'Ключевые слова B2', desc: 'Самые частые слова экзамена FCE и статей',
      words: [
        ['achieve', 'достигать', 'She achieved all her goals this year.'],
        ['approach', 'подход', 'We need a new approach to the problem.'],
        ['assume', 'предполагать', 'I assume you\'ve already eaten.'],
        ['available', 'доступный, свободный', 'Is this seat available?'],
        ['benefit', 'польза, выгода', 'Exercise has many health benefits.'],
        ['challenge', 'вызов, сложная задача', 'Learning a language is a real challenge.'],
        ['consequence', 'последствие', 'Every decision has consequences.'],
        ['considerable', 'значительный', 'It took a considerable amount of time.'],
        ['decline', 'снижаться; снижение', 'Sales declined by 10%.'],
        ['determine', 'определять', 'Your effort will determine the result.'],
        ['efficient', 'эффективный', 'This is a more efficient way to work.'],
        ['emphasise', 'подчёркивать', 'He emphasised the importance of practice.'],
        ['enhance', 'улучшать, усиливать', 'Good lighting enhances the photo.'],
        ['estimate', 'оценивать; оценка', 'They estimate the cost at $5,000.'],
        ['evidence', 'доказательства', 'There is no evidence that it works.'],
        ['factor', 'фактор', 'Price is an important factor.'],
        ['impact', 'влияние', 'Social media has a huge impact on teenagers.'],
        ['indicate', 'указывать', 'The results indicate a problem.'],
        ['issue', 'проблема, вопрос', 'Climate change is a global issue.'],
        ['maintain', 'поддерживать, утверждать', 'It\'s hard to maintain a healthy diet.'],
        ['obvious', 'очевидный', 'The answer seems obvious.'],
        ['occur', 'происходить', 'The accident occurred at night.'],
        ['outcome', 'результат, исход', 'Nobody could predict the outcome.'],
        ['perspective', 'точка зрения', 'Try to see it from my perspective.'],
        ['potential', 'потенциал; возможный', 'She has great potential.'],
        ['priority', 'приоритет', 'Your health should be a priority.'],
        ['require', 'требовать', 'This job requires good English.'],
        ['significant', 'значительный, важный', 'There was a significant improvement.'],
        ['sufficient', 'достаточный', 'We don\'t have sufficient information.'],
        ['trend', 'тенденция', 'There is a growing trend towards remote work.']
      ]
    },
    {
      id: 'phrasal', title: 'Фразовые глаголы', desc: '20 самых нужных для B2',
      words: [
        ['come up with', 'придумать', 'She came up with a great idea.'],
        ['look forward to', 'ждать с нетерпением', 'I\'m looking forward to the weekend.'],
        ['get over', 'оправиться, пережить', 'It took him months to get over the break-up.'],
        ['give up', 'бросить, сдаться', 'Don\'t give up — you\'re almost there.'],
        ['put off', 'откладывать', 'Stop putting off your homework.'],
        ['turn down', 'отклонить', 'He turned down the job offer.'],
        ['figure out', 'разобраться, понять', 'I can\'t figure out how this works.'],
        ['run out of', 'закончиться (о запасах)', 'We\'ve run out of milk.'],
        ['carry on', 'продолжать', 'Carry on, I\'m listening.'],
        ['set up', 'основать, настроить', 'They set up a company in 2020.'],
        ['bring up', 'затронуть тему; воспитывать', 'Don\'t bring up politics at dinner.'],
        ['take up', 'начать заниматься (хобби)', 'I\'ve taken up running.'],
        ['point out', 'указать, заметить', 'She pointed out a mistake in my essay.'],
        ['work out', 'тренироваться; вычислить', 'I work out three times a week.'],
        ['make up', 'выдумать; помириться', 'He made up an excuse.'],
        ['show up', 'появиться, прийти', 'Only five people showed up.'],
        ['look into', 'изучить, расследовать', 'The police are looking into the case.'],
        ['cut down on', 'сократить потребление', 'I\'m trying to cut down on sugar.'],
        ['get along with', 'ладить с', 'I get along well with my colleagues.'],
        ['deal with', 'справляться, иметь дело с', 'How do you deal with stress?']
      ]
    },
    {
      id: 'colloc', title: 'Коллокации', desc: 'Слова, которые ходят парами',
      words: [
        ['make progress', 'делать успехи', 'You\'re making great progress!'],
        ['do research', 'проводить исследование', 'I did some research before buying.'],
        ['take a risk', 'рискнуть', 'Sometimes you have to take a risk.'],
        ['pay attention', 'обращать внимание', 'Pay attention to the details.'],
        ['heavy traffic', 'плотное движение', 'We were stuck in heavy traffic.'],
        ['strong coffee', 'крепкий кофе', 'I need a cup of strong coffee.'],
        ['highly likely', 'весьма вероятно', 'It\'s highly likely to rain.'],
        ['deeply concerned', 'глубоко обеспокоен', 'We are deeply concerned about the situation.'],
        ['bitterly disappointed', 'горько разочарован', 'He was bitterly disappointed by the result.'],
        ['catch a cold', 'простудиться', 'I caught a cold last week.'],
        ['keep a promise', 'сдержать обещание', 'He always keeps his promises.'],
        ['break the law', 'нарушить закон', 'He didn\'t know he was breaking the law.'],
        ['meet a deadline', 'уложиться в срок', 'We worked all night to meet the deadline.'],
        ['raise a question', 'поднять вопрос', 'This raises an important question.'],
        ['draw a conclusion', 'сделать вывод', 'It\'s too early to draw conclusions.'],
        ['take advantage of', 'воспользоваться', 'Take advantage of the good weather.']
      ]
    },
    {
      id: 'idioms', title: 'Идиомы из сериалов', desc: 'Будешь слышать их в каждой серии',
      words: [
        ['break the ice', 'растопить лёд, начать разговор', 'He told a joke to break the ice.'],
        ['a piece of cake', 'проще простого', 'The exam was a piece of cake.'],
        ['under the weather', 'неважно себя чувствовать', 'I\'m feeling a bit under the weather.'],
        ['call it a day', 'закончить на сегодня', 'Let\'s call it a day.'],
        ['cost an arm and a leg', 'стоить целое состояние', 'That car cost an arm and a leg.'],
        ['get the hang of', 'наловчиться', 'You\'ll soon get the hang of it.'],
        ['on the same page', 'понимать друг друга одинаково', 'Let\'s make sure we\'re on the same page.'],
        ['the last straw', 'последняя капля', 'Being late again was the last straw.'],
        ['once in a blue moon', 'очень редко', 'I eat fast food once in a blue moon.'],
        ['spill the beans', 'проболтаться', 'Come on, spill the beans!'],
        ['hit the nail on the head', 'попасть в точку', 'You\'ve hit the nail on the head.'],
        ['beat around the bush', 'ходить вокруг да около', 'Stop beating around the bush.'],
        ['sleep on it', 'утро вечера мудренее', 'Let me sleep on it.'],
        ['out of the blue', 'как гром среди ясного неба', 'She called me out of the blue.'],
        ['keep an eye on', 'присматривать', 'Can you keep an eye on my bag?'],
        ['no big deal', 'ничего страшного', 'Don\'t worry, it\'s no big deal.']
      ]
    },
    {
      id: 'linking', title: 'Связки для письма и речи', desc: 'Делают речь «уровнем выше»',
      words: [
        ['however', 'однако', 'It was cheap. However, it was very slow.'],
        ['moreover', 'более того', 'The hotel was clean. Moreover, the staff were friendly.'],
        ['nevertheless', 'тем не менее', 'It was raining. Nevertheless, we went out.'],
        ['whereas', 'тогда как', 'I like tea, whereas my wife prefers coffee.'],
        ['despite', 'несмотря на (+ сущ./-ing)', 'Despite the rain, we had fun.'],
        ['although', 'хотя (+ предложение)', 'Although it was late, she kept working.'],
        ['therefore', 'поэтому', 'He was ill; therefore, he stayed home.'],
        ['consequently', 'следовательно', 'Prices rose; consequently, sales fell.'],
        ['in addition', 'кроме того', 'In addition, there is free parking.'],
        ['on the other hand', 'с другой стороны', 'On the other hand, it is expensive.'],
        ['as a result', 'в результате', 'As a result, the company closed.'],
        ['in spite of', 'вопреки', 'In spite of his age, he runs marathons.']
      ]
    }
  ],

  // ---------- план на 12 недель: B1+ → B2 ----------
  plan: [
    { week: 1, focus: 'Условные предложения 0–2', tasks: ['Урок «Условные предложения» — теория и упражнения', 'Набор «Слова из твоих ошибок» — 15 слов', 'Friends: 3 серии с английскими субтитрами', 'Работа над ошибками теста: раздел «Грамматика»'] },
    { week: 2, focus: 'Третий и смешанный тип условных', tasks: ['Урок «Условные предложения» — 8/8 без ошибок', 'Фразовые глаголы: первые 10', 'Написать 5 предложений о своих сожалениях (Third Conditional)', '6 Minute English: 3 выпуска'] },
    { week: 3, focus: 'Wish, It\'s time, Would rather', tasks: ['Урок «Wish, It\'s time, Would rather»', 'Ключевые слова B2: 1–15', 'Brooklyn Nine-Nine: 3 серии', 'Прочитать 2 статьи на News in Levels (уровень 3)'] },
    { week: 4, focus: 'Модальные глаголы', tasks: ['Урок «Модальные глаголы»', 'Ключевые слова B2: 16–30', 'Повторно пройти экспресс-тест', 'Написать 5 предположений о фото из ленты (must / might / can\'t)'] },
    { week: 5, focus: 'Времена: Perfect', tasks: ['Урок «Времена: Past Perfect и Present Perfect»', 'Фразовые глаголы: оставшиеся 10', 'The Office (US): 3 серии', 'Рассказать вслух историю из прошлого с Past Perfect'] },
    { week: 6, focus: 'Косвенная речь', tasks: ['Урок «Косвенная речь»', 'Набор «Коллокации»', 'Пересказать письменно диалог из сериала в косвенной речи', 'Подкаст The English We Speak: 5 выпусков'] },
    { week: 7, focus: 'Герундий и инфинитив', tasks: ['Урок «Герундий или инфинитив»', 'Набор «Идиомы из сериалов»', 'Ted Lasso: 3 серии', 'Прочитать 3 статьи BBC Learning English'] },
    { week: 8, focus: 'Пассивный залог', tasks: ['Урок «Пассивный залог»', 'Набор «Связки для письма»', 'Повторно пройти полный тест', 'Найти 10 примеров пассива в новостях BBC'] },
    { week: 9, focus: 'Инверсия', tasks: ['Урок «Инверсия»', 'Повторить все слова со статусом «учу»', 'Фильм без субтитров: The Devil Wears Prada или The Intern', 'Эссе 150 слов с 2 инверсиями'] },
    { week: 10, focus: 'Артикли и детали', tasks: ['Урок «Артикли и притяжательный падеж»', 'Работа над ошибками теста — все 33 вопроса', 'Sherlock: 1 серия с английскими субтитрами', 'TED-Ed: 5 видео'] },
    { week: 11, focus: 'Сочетаемость и письмо', tasks: ['Урок «Сочетаемость слов»', 'Все наборы слов — 80% в статусе «знаю»', 'Написать письмо (FCE Writing Part 2) и проверить в Grammarly', 'Kurzgesagt: 3 видео'] },
    { week: 12, focus: 'Итоговая проверка', tasks: ['Все 10 уроков — не меньше 7/8', 'Пройти полный тест — цель 55+ (B2)', 'Пробный вариант B2 First Reading на сайте Cambridge', 'Составить план на следующие 3 месяца'] }
  ],

  daily: [
    ['10 мин', 'Карточки со словами — раздел «Слова»'],
    ['15 мин', 'Урок недели или упражнения'],
    ['20 мин', 'Серия сериала с английскими субтитрами'],
    ['5 мин', 'Выписать 3 новые фразы из серии и произнести вслух']
  ],

  // ---------- что смотреть и читать ----------
  media: [
    {
      title: 'Сериалы', note: 'Смотри с английскими субтитрами. Чтение у тебя B2, так что субтитры помогут разобрать быструю речь.',
      items: [
        ['Friends', 'B1', 'Бытовой разговорный английский, короткие серии, много повторяющихся фраз.'],
        ['Brooklyn Nine-Nine', 'B1–B2', 'Юмор, современный американский сленг, понятная речь.'],
        ['Modern Family', 'B1–B2', 'Семейные ситуации, разные акценты, mockumentary-формат.'],
        ['The Office (US)', 'B2', 'Офисная лексика, сарказм — тренирует понимание подтекста.'],
        ['Ted Lasso', 'B2', 'Британский и американский английский вместе, много идиом.'],
        ['Stranger Things', 'B2', 'Захватывающий сюжет — легко смотреть подряд.'],
        ['Sherlock', 'B2–C1', 'Быстрая британская речь, богатая лексика. Цель на конец плана.']
      ]
    },
    {
      title: 'Фильмы',
      items: [
        ['Paddington 2', 'B1', 'Чёткая британская речь, добрый юмор.'],
        ['The Intern', 'B1–B2', 'Деловой английский в простой форме.'],
        ['The Devil Wears Prada', 'B2', 'Быстрые диалоги, лексика моды и работы.'],
        ['Forrest Gump', 'B1–B2', 'Медленная речь главного героя, американская история.'],
        ['The Martian', 'B2', 'Научная лексика, много юмора, монологи.'],
        ['Back to the Future', 'B1–B2', 'Классика, простые диалоги.'],
        ['The Social Network', 'B2–C1', 'Очень быстрые диалоги — проверка на C1.']
      ]
    },
    {
      title: 'X (Twitter): аккаунты для ленты', note: 'Подпишись — короткие посты каждый день = бесплатная практика чтения.',
      items: [
        ['@bbcle', 'B1', 'BBC Learning English: слова, фразы и мини-уроки.', 'https://x.com/bbcle'],
        ['@CambridgeWords', 'B2', 'Словарь Cambridge: слово дня и новые слова.', 'https://x.com/CambridgeWords'],
        ['@MerriamWebster', 'B2', 'Слова дня, история слов, юмор.', 'https://x.com/MerriamWebster'],
        ['@Dictionarycom', 'B2', 'Слово дня и разборы значений.', 'https://x.com/Dictionarycom'],
        ['@NASA', 'B2', 'Простые посты о космосе с фото.', 'https://x.com/NASA'],
        ['@NatGeo', 'B2', 'Природа и наука, короткие тексты.', 'https://x.com/NatGeo'],
        ['@BBCWorld', 'B2', 'Мировые новости — заголовки учат пассиву и сжатому стилю.', 'https://x.com/BBCWorld']
      ]
    },
    {
      title: 'Статьи и новости',
      items: [
        ['News in Levels', 'B1', 'Одна новость в 3 уровнях сложности, с аудио.', 'https://www.newsinlevels.com/'],
        ['BBC Learning English', 'B1–B2', 'Новости, грамматика и 6 Minute English.', 'https://www.bbc.co.uk/learningenglish/'],
        ['Breaking News English', 'B1–B2', 'Новости с упражнениями.', 'https://breakingnewsenglish.com/'],
        ['The Guardian', 'B2–C1', 'Оригинальная пресса — читай 1 статью в неделю.', 'https://www.theguardian.com/']
      ]
    },
    {
      title: 'YouTube и подкасты',
      items: [
        ['6 Minute English (BBC)', 'B1', 'Подкаст на 6 минут с разбором слов.'],
        ['The English We Speak (BBC)', 'B1–B2', 'Одна идиома за выпуск.'],
        ['English with Lucy', 'B1–B2', 'Грамматика и произношение, британский английский.'],
        ['TED-Ed', 'B2', 'Короткие анимированные лекции на любые темы.'],
        ['Kurzgesagt', 'B2–C1', 'Наука простыми словами, отличная лексика.'],
        ['All Ears English', 'B2', 'Подкаст о живом американском английском.']
      ]
    },
    {
      title: 'Книги',
      items: [
        ['Holes — Louis Sachar', 'B1', 'Простой язык, захватывающий сюжет.'],
        ['Wonder — R. J. Palacio', 'B1–B2', 'Короткие главы, современный язык.'],
        ['Harry Potter and the Philosopher\'s Stone', 'B1–B2', 'Знакомая история — легче понимать.'],
        ['The Curious Incident of the Dog in the Night-Time', 'B2', 'Необычный рассказчик, простые предложения.'],
        ['Penguin Readers, уровни 5–6', 'B1–B2', 'Адаптированная классика.']
      ]
    }
  ],

  // Вопросы теста, в которых были ошибки (по началу текста вопроса)
  mistakes: [
    'These are my ___ books.', 'You ___ smoke here.', 'He asked me where ___.', 'I\'m looking forward ___ you.',
    'She ___ have left already', 'By the time we arrived', 'He is said ___', 'I wish I ___ more time',
    'Not only ___ late', 'Had it not been ___', '___ the weather been better', 'It\'s high time you',
    'No sooner ___', 'Were the government', 'It is essential that',
    'I can\'t ___ with this noise', 'Unemployment has risen', 'We need to ___ a decision', 'His explanation was so',
    'The evidence was', 'The minister\'s speech', 'The speech was a masterclass', 'The novel\'s plot',
    'The scandal cast', 'She was ___ by the criticism',
    'According to the text, what we call multitasking', 'What is "more troubling"', 'Why, according to the writer, can people walk',
    'What is the writer\'s attitude to the claim', 'What does the speaker think about her?', 'What does the speaker say about the report?',
    'How does the speaker describe the findings?', 'What does "such as it was" suggest'
  ]
};
