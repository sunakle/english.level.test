// Банк вопросов. Правильный ответ — всегда первый вариант в массиве `o`
// (варианты перемешиваются при показе). level — уровень CEFR вопроса,
// t — тема (для разбивки результата по темам). Каждый тест собирается
// случайной выборкой из банка, поэтому повторные попытки отличаются.
window.TOPICS = {
  tenses: 'Времена глаголов',
  articles: 'Артикли и базовая грамматика',
  prepositions: 'Предлоги',
  comparatives: 'Степени сравнения',
  quantifiers: 'Количество (much/many, there is)',
  questions: 'Вопросы',
  modals: 'Модальные глаголы',
  conditionals: 'Условные предложения',
  passive: 'Пассивный залог',
  reported: 'Косвенная речь',
  gerund: 'Герундий и инфинитив',
  relative: 'Придаточные предложения',
  subjunctive: 'Wish, сослагательное наклонение',
  inversion: 'Инверсия и эмфаза',
  words: 'Лексика: значения слов',
  phrasal: 'Фразовые глаголы',
  collocations: 'Сочетаемость слов',
  formation: 'Словообразование',
  idioms: 'Идиомы',
  gist: 'Понимание общего смысла',
  detail: 'Понимание деталей',
  inference: 'Подтекст и выводы',
  meaning: 'Значение в контексте'
};

window.TEST_DATA = {
  grammar: [
    // A1
    { level: 'A1', t: 'articles', q: 'She ___ a teacher.', o: ['is', 'are', 'am', 'be'], exp: 'С he/she/it глагол to be — «is».' },
    { level: 'A1', t: 'tenses', q: 'I ___ coffee every morning.', o: ['drink', 'drinks', 'drinking', 'am drink'], exp: 'Present Simple, подлежащее I — глагол без -s.' },
    { level: 'A1', t: 'quantifiers', q: 'There ___ two cats in the garden.', o: ['are', 'is', 'be', 'has'], exp: 'There are + множественное число.' },
    { level: 'A1', t: 'questions', q: '___ you like pizza?', o: ['Do', 'Does', 'Are', 'Is'], exp: 'Вопрос в Present Simple с you — вспомогательный Do.' },
    { level: 'A1', t: 'articles', q: 'This is ___ apple.', o: ['an', 'a', 'the', 'some'], exp: 'Перед гласным звуком — артикль an.' },
    { level: 'A1', t: 'tenses', q: 'He ___ like football.', o: ['doesn\'t', 'don\'t', 'isn\'t', 'not'], exp: 'Отрицание в Present Simple с he/she/it — doesn\'t.' },
    { level: 'A1', t: 'prepositions', q: 'My birthday is ___ May.', o: ['in', 'on', 'at', 'to'], exp: 'С месяцами — in; с днями — on; со временем — at.' },
    { level: 'A1', t: 'articles', q: 'These are my ___ books.', o: ['sister\'s', 'sisters', 'sister', 'sisters\'s'], exp: 'Притяжательный падеж: sister\'s — «сестры».' },

    // A2
    { level: 'A2', t: 'tenses', q: 'I ___ to London last year.', o: ['went', 'go', 'have gone', 'was go'], exp: '«Last year» — законченное время в прошлом, Past Simple.' },
    { level: 'A2', t: 'comparatives', q: 'She is ___ than her brother.', o: ['taller', 'tall', 'tallest', 'more tall'], exp: 'Сравнительная степень коротких прилагательных: -er + than.' },
    { level: 'A2', t: 'tenses', q: 'We ___ dinner when the phone rang.', o: ['were having', 'had', 'have', 'are having'], exp: 'Длительное действие, прерванное другим, — Past Continuous.' },
    { level: 'A2', t: 'modals', q: 'You ___ smoke here. It\'s forbidden.', o: ['mustn\'t', 'don\'t have to', 'needn\'t', 'shouldn\'t to'], exp: 'Mustn\'t — запрет; don\'t have to — «нет необходимости».' },
    { level: 'A2', t: 'quantifiers', q: 'How ___ milk do we need?', o: ['much', 'many', 'lot', 'few'], exp: 'Milk — неисчисляемое, поэтому how much.' },
    { level: 'A2', t: 'tenses', q: 'I ___ never been to Japan.', o: ['have', 'has', 'am', 'was'], exp: 'Present Perfect: I have + been.' },
    { level: 'A2', t: 'tenses', q: 'She ___ to the cinema tonight — she bought the tickets yesterday.', o: ['is going', 'goes', 'go', 'went'], exp: 'Запланированное будущее — Present Continuous.' },
    { level: 'A2', t: 'comparatives', q: 'This is the ___ film I have ever seen.', o: ['best', 'better', 'good', 'most good'], exp: 'Превосходная степень good — the best.' },

    // B1
    { level: 'B1', t: 'tenses', q: 'I\'ve lived here ___ 2015.', o: ['since', 'for', 'from', 'during'], exp: 'Since + точка во времени, for + период.' },
    { level: 'B1', t: 'conditionals', q: 'If it rains tomorrow, we ___ at home.', o: ['will stay', 'would stay', 'stay', 'stayed'], exp: 'First Conditional: If + Present, will + глагол.' },
    { level: 'B1', t: 'passive', q: 'The book ___ by millions of people.', o: ['has been read', 'has read', 'have been read', 'was reading'], exp: 'Пассив в Present Perfect: has been + V3; book — ед. число.' },
    { level: 'B1', t: 'reported', q: 'He asked me where ___.', o: ['I lived', 'did I live', 'do I live', 'I do live'], exp: 'В косвенном вопросе прямой порядок слов и сдвиг времён.' },
    { level: 'B1', t: 'gerund', q: 'I used ___ in Paris when I was a child.', o: ['to live', 'living', 'live', 'to living'], exp: 'Used to + инфинитив — привычка или состояние в прошлом.' },
    { level: 'B1', t: 'relative', q: 'The man ___ car was stolen called the police.', o: ['whose', 'who', 'which', 'that'], exp: 'Whose — «чей», указывает на принадлежность.' },
    { level: 'B1', t: 'modals', q: 'You ___ have told me earlier! I would have helped.', o: ['should', 'must', 'can', 'will'], exp: 'Should have + V3 — упрёк: «следовало бы».' },
    { level: 'B1', t: 'gerund', q: 'I\'m looking forward ___ you.', o: ['to seeing', 'to see', 'seeing', 'for seeing'], exp: 'Look forward to + -ing: здесь to — предлог.' },

    // B2
    { level: 'B2', t: 'conditionals', q: 'If I ___ harder, I would have passed the exam.', o: ['had studied', 'studied', 'would study', 'have studied'], exp: 'Third Conditional: If + Past Perfect, would have + V3.' },
    { level: 'B2', t: 'tenses', q: 'By the time we arrived, the film ___.', o: ['had already started', 'already started', 'has already started', 'was already starting'], exp: 'Действие до другого действия в прошлом — Past Perfect.' },
    { level: 'B2', t: 'gerund', q: 'I\'m not used to ___ up so early.', o: ['getting', 'get', 'got', 'be getting'], exp: 'Be used to + -ing — «быть привычным к».' },
    { level: 'B2', t: 'gerund', q: 'She suggested ___ a taxi.', o: ['taking', 'to take', 'take', 'that we taking'], exp: 'После suggest — герундий (или that + we (should) take).' },
    { level: 'B2', t: 'subjunctive', q: 'I wish I ___ more time to travel.', o: ['had', 'have', 'would have', 'am having'], exp: 'Wish о настоящем + Past Simple.' },
    { level: 'B2', t: 'modals', q: 'She ___ have left already — her coat is gone.', o: ['must', 'can\'t', 'should', 'would'], exp: 'Must have + V3 — уверенное предположение о прошлом.' },
    { level: 'B2', t: 'passive', q: 'He is said ___ the richest man in town.', o: ['to be', 'being', 'that he is', 'be'], exp: 'Безличный пассив: be said + to-infinitive.' },
    { level: 'B2', t: 'questions', q: 'Hardly anyone came, ___?', o: ['did they', 'didn\'t they', 'did he', 'came they'], exp: 'Hardly — отрицательное слово, поэтому tag положительный; anyone → they.' },

    // C1
    { level: 'C1', t: 'inversion', q: 'Not only ___ late, but he also forgot the tickets.', o: ['was he', 'he was', 'he is', 'did he be'], exp: 'После Not only в начале — инверсия.' },
    { level: 'C1', t: 'conditionals', q: '___ the weather been better, we would have gone hiking.', o: ['Had', 'If', 'Should', 'Were'], exp: 'Инверсия в Third Conditional: Had + подлежащее + V3.' },
    { level: 'C1', t: 'subjunctive', q: 'It\'s high time you ___ looking for a job.', o: ['started', 'start', 'will start', 'have started'], exp: 'It\'s (high) time + Past Simple — «давно пора».' },
    { level: 'C1', t: 'gerund', q: 'He denied ___ the window.', o: ['having broken', 'to have broken', 'to break', 'broke'], exp: 'Deny + герундий; перфектный герундий подчёркивает предшествование.' },
    { level: 'C1', t: 'inversion', q: 'Only after the meeting ___ how serious the problem was.', o: ['did I realise', 'I realised', 'I did realise', 'realised I'], exp: 'Only after … в начале предложения — инверсия в главной части.' },
    { level: 'C1', t: 'subjunctive', q: 'I\'d rather you ___ tell anyone about this.', o: ['didn\'t', 'don\'t', 'won\'t', 'not'], exp: 'Would rather + другое подлежащее + Past Simple.' },
    { level: 'C1', t: 'relative', q: 'The project, ___ was approved last year, is now behind schedule.', o: ['which', 'that', 'what', 'who'], exp: 'В неопределительном придаточном (с запятыми) that не используется.' },
    { level: 'C1', t: 'conditionals', q: 'Had it not been ___ your help, we would have failed.', o: ['for', 'by', 'with', 'to'], exp: 'Устойчивая конструкция: had it not been for — «если бы не».' },

    // C2
    { level: 'C2', t: 'inversion', q: 'Little ___ that his life was about to change forever.', o: ['did he know', 'he knew', 'he did know', 'knew he'], exp: 'Little в начале предложения требует инверсии с вспомогательным глаголом.' },
    { level: 'C2', t: 'conditionals', q: 'Were the government ___ taxes, there would be protests.', o: ['to raise', 'raising', 'raise', 'raised'], exp: 'Инверсия Were + подлежащее + to-infinitive для гипотетического будущего.' },
    { level: 'C2', t: 'subjunctive', q: 'She\'d sooner ___ than apologise to him.', o: ['die', 'to die', 'dying', 'died'], exp: 'Would sooner + инфинитив без to.' },
    { level: 'C2', t: 'inversion', q: '___ as it may seem, the theory holds up.', o: ['Strange', 'Strangely', 'However strange', 'As strange'], exp: 'Конструкция «Adjective + as + subject + may seem» — «как ни странно».' },
    { level: 'C2', t: 'subjunctive', q: 'It is essential that he ___ informed immediately.', o: ['be', 'is', 'will be', 'was'], exp: 'Сослагательное наклонение после essential that — голый инфинитив.' },
    { level: 'C2', t: 'inversion', q: 'No sooner ___ the house than it started to rain.', o: ['had we left', 'we had left', 'did we leave', 'we left'], exp: 'No sooner + had + подлежащее + V3 … than.' },
    { level: 'C2', t: 'inversion', q: 'Such ___ the force of the explosion that windows shattered miles away.', o: ['was', 'is', 'had', 'did'], exp: 'Эмфатическая инверсия: Such was the … that.' },
    { level: 'C2', t: 'subjunctive', q: 'Come what ___, I will finish this project.', o: ['may', 'might', 'will', 'can'], exp: 'Устойчивое выражение: come what may — «будь что будет».' }
  ],

  vocabulary: [
    // A1
    { level: 'A1', t: 'words', q: 'The opposite of "hot" is ___.', o: ['cold', 'warm', 'wet', 'big'], exp: 'Hot — горячий, cold — холодный.' },
    { level: 'A1', t: 'words', q: 'I read a ___ every night before bed.', o: ['book', 'table', 'chair', 'window'], exp: 'Читают книгу — book.' },
    { level: 'A1', t: 'words', q: 'My mother\'s brother is my ___.', o: ['uncle', 'cousin', 'nephew', 'grandfather'], exp: 'Брат матери — дядя (uncle).' },
    { level: 'A1', t: 'words', q: 'I get up at seven o\'clock in the ___.', o: ['morning', 'night', 'evening', 'week'], exp: 'В 7 часов встают утром — in the morning.' },
    { level: 'A1', t: 'words', q: 'An apple is a kind of ___.', o: ['fruit', 'vegetable', 'meat', 'drink'], exp: 'Яблоко — фрукт (fruit).' },
    { level: 'A1', t: 'collocations', q: 'We go to school by ___.', o: ['bus', 'foot', 'walk', 'legs'], exp: 'By bus, но on foot.' },

    // A2
    { level: 'A2', t: 'collocations', q: 'Can you ___ me a favour?', o: ['do', 'make', 'give', 'take'], exp: 'Устойчивое сочетание: do someone a favour.' },
    { level: 'A2', t: 'phrasal', q: 'I\'m looking ___ my keys. Have you seen them?', o: ['for', 'at', 'after', 'up'], exp: 'Look for — искать; look after — присматривать.' },
    { level: 'A2', t: 'words', q: 'The train was ___, so we missed our meeting.', o: ['delayed', 'on time', 'early', 'fast'], exp: 'Delayed — задержан, опоздал.' },
    { level: 'A2', t: 'collocations', q: 'Please ___ your homework before you watch TV.', o: ['do', 'make', 'take', 'have'], exp: 'Do homework — делать домашнее задание.' },
    { level: 'A2', t: 'words', q: 'It\'s raining. Don\'t forget your ___.', o: ['umbrella', 'sunglasses', 'swimsuit', 'fan'], exp: 'В дождь нужен зонт — umbrella.' },
    { level: 'A2', t: 'phrasal', q: 'Could you turn ___ the light? It\'s too dark in here.', o: ['on', 'off', 'up', 'in'], exp: 'Turn on — включить; turn off — выключить.' },

    // B1
    { level: 'B1', t: 'words', q: 'She ___ her job because she wanted to travel.', o: ['quit', 'left out', 'gave in', 'broke up'], exp: 'Quit a job — уволиться.' },
    { level: 'B1', t: 'phrasal', q: 'I can\'t ___ with this noise any longer.', o: ['put up', 'get on', 'look up', 'take off'], exp: 'Put up with — терпеть, мириться.' },
    { level: 'B1', t: 'phrasal', q: 'The meeting has been ___ until next week.', o: ['put off', 'put out', 'put on', 'put up'], exp: 'Put off — откладывать.' },
    { level: 'B1', t: 'collocations', q: 'He made a ___ when he said "I goed".', o: ['mistake', 'wrong', 'fail', 'miss'], exp: 'Make a mistake — сделать ошибку.' },
    { level: 'B1', t: 'formation', q: 'The film was so ___ that I fell asleep.', o: ['boring', 'bored', 'exciting', 'interested'], exp: '-ing описывает то, что вызывает чувство (boring), -ed — само чувство (bored).' },
    { level: 'B1', t: 'words', q: 'She is very ___ — she always tells the truth.', o: ['honest', 'rude', 'lazy', 'selfish'], exp: 'Honest — честный.' },

    // B2
    { level: 'B2', t: 'words', q: 'His explanation was so ___ that nobody understood it.', o: ['convoluted', 'concise', 'lucid', 'straightforward'], exp: 'Convoluted — запутанный; остальные — «ясный, краткий».' },
    { level: 'B2', t: 'phrasal', q: 'The company had to ___ 200 workers due to the crisis.', o: ['lay off', 'lay down', 'lay out', 'lay by'], exp: 'Lay off — сократить сотрудников.' },
    { level: 'B2', t: 'words', q: 'She has a ___ for languages – she learns them so easily.', o: ['flair', 'flare', 'fair', 'fare'], exp: 'Flair — природный талант; flare — вспышка.' },
    { level: 'B2', t: 'collocations', q: 'We need to ___ a decision by Friday.', o: ['reach', 'do', 'get', 'hold'], exp: 'Reach (или make) a decision — принять решение.' },
    { level: 'B2', t: 'collocations', q: 'Unemployment has risen ___ over the last year.', o: ['sharply', 'strongly', 'heavily', 'highly'], exp: 'Rise sharply — резко вырасти.' },
    { level: 'B2', t: 'formation', q: 'The ___ of the new bridge took three years.', o: ['construction', 'constructive', 'constructing', 'constructor'], exp: 'После the … of нужно существительное — construction.' },

    // C1
    { level: 'C1', t: 'collocations', q: 'The minister\'s speech was full of ___ promises that nobody believed.', o: ['hollow', 'hallow', 'void', 'blank'], exp: 'Hollow promises — пустые обещания.' },
    { level: 'C1', t: 'words', q: 'Her ___ remarks offended many guests.', o: ['tactless', 'tactful', 'diplomatic', 'discreet'], exp: 'Tactless — бестактный.' },
    { level: 'C1', t: 'words', q: 'The evidence was ___, so the case was dismissed.', o: ['flimsy', 'robust', 'compelling', 'conclusive'], exp: 'Flimsy evidence — неубедительные, шаткие доказательства.' },
    { level: 'C1', t: 'collocations', q: 'After weeks of talks, the two sides finally ___ a compromise.', o: ['struck', 'hit', 'beat', 'knocked'], exp: 'Strike a compromise / a deal — прийти к компромиссу.' },
    { level: 'C1', t: 'formation', q: 'She\'s been working all night, so she\'s completely ___.', o: ['exhausted', 'exhausting', 'exhaustive', 'exhaust'], exp: 'Exhausted — измотанный; exhaustive — исчерпывающий.' },
    { level: 'C1', t: 'idioms', q: 'I\'ll have to sleep ___ it before I make a decision.', o: ['on', 'over', 'in', 'with'], exp: 'Sleep on it — «утро вечера мудренее», отложить решение.' },

    // C2
    { level: 'C2', t: 'words', q: 'His ___ attitude towards his duties eventually got him fired.', o: ['cavalier', 'chivalrous', 'cautious', 'conscientious'], exp: 'Cavalier — небрежный, пренебрежительный.' },
    { level: 'C2', t: 'words', q: 'The novel\'s plot is so ___ that readers struggle to follow it.', o: ['byzantine', 'pellucid', 'succinct', 'pedestrian'], exp: 'Byzantine — чрезвычайно запутанный; pellucid — кристально ясный.' },
    { level: 'C2', t: 'words', q: 'She was ___ by the criticism and carried on regardless.', o: ['undeterred', 'undermined', 'underwhelmed', 'undertaken'], exp: 'Undeterred — не испугавшийся, не остановленный.' },
    { level: 'C2', t: 'words', q: 'The speech was a masterclass in ___: he talked for an hour and said nothing.', o: ['obfuscation', 'clarification', 'elucidation', 'candour'], exp: 'Obfuscation — намеренное запутывание.' },
    { level: 'C2', t: 'idioms', q: 'He loves to ___ hairs, arguing over trivial details.', o: ['split', 'cut', 'pull', 'break'], exp: 'Split hairs — придираться к мелочам.' },
    { level: 'C2', t: 'words', q: 'The scandal cast a ___ over the rest of his career.', o: ['pall', 'pale', 'peal', 'pail'], exp: 'Cast a pall over — омрачить.' }
  ],

  // band: easy (A1–A2), mid (B1–B2), hard (C1–C2). В тест попадает по одному тексту каждого типа.
  reading: [
    {
      band: 'easy',
      title: 'Tom\'s Weekend',
      text: 'Tom lives in a small town near the sea. On Saturdays he works in a café from nine to three. After work he usually goes swimming with his sister, Anna. On Sundays the café is closed, so Tom stays at home, cooks lunch for his parents and reads. Next weekend will be different: Tom is going to visit his friend in the capital.',
      questions: [
        { level: 'A1', t: 'detail', q: 'Where does Tom work?', o: ['In a café', 'In a shop', 'At a school', 'At the beach'], exp: '«On Saturdays he works in a café».' },
        { level: 'A2', t: 'detail', q: 'What does Tom usually do on Sundays?', o: ['He stays at home and cooks', 'He works in the café', 'He goes swimming with Anna', 'He visits the capital'], exp: '«On Sundays the café is closed, so Tom stays at home, cooks lunch…».' },
        { level: 'A2', t: 'detail', q: 'What is Tom going to do next weekend?', o: ['Visit a friend in the capital', 'Work extra hours', 'Go swimming with his parents', 'Open a new café'], exp: '«Tom is going to visit his friend in the capital».' }
      ]
    },
    {
      band: 'easy',
      title: 'A Message from Maria',
      text: 'Hi Kate! I\'m sorry, but I can\'t come to your party on Friday. My grandmother is ill, and I need to visit her in hospital. Can we meet on Sunday afternoon instead? We can go to the new park near the station. I can bring sandwiches, and you can bring the ball. Call me tonight! Love, Maria',
      questions: [
        { level: 'A1', t: 'detail', q: 'Why can\'t Maria go to the party?', o: ['Her grandmother is ill', 'She is ill', 'She has to work', 'She is on holiday'], exp: '«My grandmother is ill, and I need to visit her».' },
        { level: 'A2', t: 'gist', q: 'What does Maria suggest?', o: ['Meeting in the park on Sunday', 'Having a party on Sunday', 'Visiting her grandmother together', 'Meeting at the station on Friday'], exp: '«Can we meet on Sunday afternoon instead? We can go to the new park».' },
        { level: 'A2', t: 'detail', q: 'What should Kate bring?', o: ['A ball', 'Sandwiches', 'A cake', 'Drinks'], exp: '«I can bring sandwiches, and you can bring the ball».' }
      ]
    },
    {
      band: 'mid',
      title: 'Working from Home',
      text: 'When companies first sent employees home in 2020, many managers expected productivity to collapse. Instead, a number of studies found that output stayed the same or even rose slightly. However, the picture is more complicated than these headlines suggest. Workers saved hours each week by not commuting, but many also reported feeling isolated and finding it harder to switch off at the end of the day. Junior staff in particular said they missed learning by watching experienced colleagues. As a result, most firms have now settled on a "hybrid" model, in which employees spend part of the week in the office and part at home.',
      questions: [
        { level: 'B1', t: 'detail', q: 'What did many managers expect in 2020?', o: ['Productivity would fall sharply', 'Workers would save time', 'Output would rise slightly', 'Staff would prefer the office'], exp: '«many managers expected productivity to collapse».' },
        { level: 'B2', t: 'detail', q: 'Which group was especially affected, according to the text?', o: ['Junior staff, who missed learning from colleagues', 'Managers, who lost control of output', 'Senior staff, who disliked commuting', 'Workers who lived far from the office'], exp: '«Junior staff in particular said they missed learning by watching experienced colleagues».' },
        { level: 'B2', t: 'meaning', q: 'The phrase "the picture is more complicated than these headlines suggest" means that…', o: ['the positive findings don\'t tell the whole story', 'the studies were wrong', 'productivity actually collapsed', 'the media ignored the studies'], exp: 'Автор вводит минусы удалённой работы, которые не видны в позитивных заголовках.' }
      ]
    },
    {
      band: 'mid',
      title: 'The Return of Vinyl',
      text: 'Twenty years ago, few people would have predicted that vinyl records would make a comeback. Streaming services offer millions of songs for a monthly fee, yet sales of records have risen every year for over a decade. Part of the appeal is physical: fans enjoy owning large artwork and the ritual of placing a needle on a record. Some listeners also claim that vinyl sounds "warmer", although audio engineers point out that much of this impression comes from the format\'s imperfections rather than from superior quality. Interestingly, surveys suggest that a significant proportion of buyers do not even own a record player.',
      questions: [
        { level: 'B1', t: 'detail', q: 'What has happened to sales of vinyl records?', o: ['They have grown every year for over ten years', 'They fell when streaming appeared', 'They have stayed the same', 'They grew only last year'], exp: '«sales of records have risen every year for over a decade».' },
        { level: 'B2', t: 'inference', q: 'According to audio engineers, the "warmer" sound of vinyl is…', o: ['largely a result of its imperfections', 'proof of its higher quality', 'impossible to notice', 'caused by modern record players'], exp: '«much of this impression comes from the format\'s imperfections rather than from superior quality».' },
        { level: 'B2', t: 'detail', q: 'What surprising fact do surveys reveal?', o: ['Many buyers don\'t own a record player', 'Most buyers are over sixty', 'Buyers prefer streaming', 'Records are cheaper than streaming'], exp: '«a significant proportion of buyers do not even own a record player».' }
      ]
    },
    {
      band: 'hard',
      title: 'The Irrational Consumer',
      text: 'The notion that we are rational actors, carefully weighing costs against benefits, has long underpinned classical economics. Yet behavioural research has steadily chipped away at this assumption. People routinely overvalue what they already own, are swayed by the order in which options are presented, and will forgo a larger reward later for a smaller one now. Far from being random, these deviations are systematic and therefore predictable — a fact that has not been lost on marketers and policymakers alike. Critics, however, warn that "nudging" citizens towards desirable behaviour, however benign the intention, sits uneasily with the ideal of individual autonomy.',
      questions: [
        { level: 'C1', t: 'gist', q: 'What does the author say about deviations from rational behaviour?', o: ['They are systematic and can be predicted', 'They are random and unpredictable', 'They only affect consumers, not policymakers', 'They have been disproved by research'], exp: '«Far from being random, these deviations are systematic and therefore predictable».' },
        { level: 'C1', t: 'meaning', q: 'In the text, "chipped away at" is closest in meaning to…', o: ['gradually weakened', 'firmly supported', 'suddenly destroyed', 'carefully explained'], exp: 'Chip away at — постепенно подтачивать, ослаблять.' },
        { level: 'C2', t: 'inference', q: 'What is the critics\' main concern?', o: ['Nudging may conflict with personal freedom even if well-meant', 'Nudging is ineffective in practice', 'Marketers use nudging more than governments', 'Behavioural research is unreliable'], exp: '«however benign the intention, sits uneasily with the ideal of individual autonomy».' },
        { level: 'C2', t: 'meaning', q: 'The phrase "a fact that has not been lost on marketers" implies that marketers…', o: ['are well aware of it and exploit it', 'have ignored it', 'were the first to discover it', 'disagree with it'], exp: '«Not lost on someone» — кто-то это хорошо понял (и использует).' }
      ]
    },
    {
      band: 'hard',
      title: 'The Myth of Multitasking',
      text: 'Few claims are repeated as confidently in job advertisements as the ability to multitask. Yet the cognitive science is unambiguous: what we call multitasking is, for the most part, rapid task-switching, and each switch carries a cost. Studies have repeatedly shown that people who juggle several activities at once make more errors and take longer overall than those who tackle tasks one after another. More troubling still, heavy multitaskers tend to overestimate their own proficiency, a blind spot that makes the habit remarkably resistant to change. None of this is to say that all simultaneous activity is futile; walking while talking poses little difficulty, precisely because one of the tasks has become automatic.',
      questions: [
        { level: 'C1', t: 'detail', q: 'According to the text, what we call multitasking is mostly…', o: ['rapid switching between tasks', 'doing two tasks with equal attention', 'a skill that improves with practice', 'a myth invented by employers'], exp: '«what we call multitasking is, for the most part, rapid task-switching».' },
        { level: 'C1', t: 'detail', q: 'What is "more troubling" about heavy multitaskers?', o: ['They overestimate their own abilities', 'They make fewer errors than expected', 'They refuse to work in teams', 'They are rarely hired'], exp: '«heavy multitaskers tend to overestimate their own proficiency».' },
        { level: 'C2', t: 'inference', q: 'Why, according to the writer, can people walk and talk at the same time?', o: ['Because one of the activities requires no conscious effort', 'Because both tasks are equally simple', 'Because talking improves concentration', 'Because they have trained to multitask'], exp: '«precisely because one of the tasks has become automatic».' },
        { level: 'C2', t: 'gist', q: 'What is the writer\'s attitude to the claim in job advertisements?', o: ['Sceptical, on the basis of research', 'Fully supportive', 'Neutral and uninterested', 'Angry and dismissive of science'], exp: 'Автор опирается на исследования, чтобы опровергнуть популярное утверждение.' }
      ]
    }
  ],

  listening: [
    // A1
    { level: 'A1', t: 'detail', audio: 'Hello, my name is Sarah. I am from Canada and I am twenty-five years old.', q: 'How old is Sarah?', o: ['25', '35', '15', '52'], exp: '«I am twenty-five years old».' },
    { level: 'A1', t: 'detail', audio: 'I have two brothers and one sister. My sister is a doctor.', q: 'What is the speaker\'s sister\'s job?', o: ['Doctor', 'Teacher', 'Driver', 'Nurse'], exp: '«My sister is a doctor».' },
    { level: 'A1', t: 'detail', audio: 'The shop is open from Monday to Saturday. It is closed on Sunday.', q: 'When is the shop closed?', o: ['On Sunday', 'On Monday', 'On Saturday', 'Every day'], exp: '«It is closed on Sunday».' },
    // A2
    { level: 'A2', t: 'detail', audio: 'The museum opens at half past nine and closes at five, but on Fridays it stays open until eight.', q: 'What time does the museum close on Fridays?', o: ['At 8:00', 'At 5:00', 'At 9:30', 'At 5:30'], exp: '«on Fridays it stays open until eight».' },
    { level: 'A2', t: 'detail', audio: 'Attention please. The train to Manchester will leave from platform six, not platform two. The platform was changed this morning.', q: 'Which platform does the Manchester train leave from?', o: ['6', '2', '8', '16'], exp: '«will leave from platform six, not platform two».' },
    { level: 'A2', t: 'detail', audio: 'I\'d like a large coffee with milk and a small orange juice, please. No sugar, thanks.', q: 'What does the customer NOT want?', o: ['Sugar', 'Milk', 'Orange juice', 'Coffee'], exp: '«No sugar, thanks».' },
    // B1
    { level: 'B1', t: 'detail', audio: 'I was going to take the bus, but it was so crowded that I decided to walk instead. It only took twenty minutes.', q: 'How did the speaker get there?', o: ['On foot', 'By bus', 'By taxi', 'By bike'], exp: '«I decided to walk instead».' },
    { level: 'B1', t: 'gist', audio: 'I\'ve been learning Spanish for three years, but I only started speaking confidently after I spent a summer in Madrid.', q: 'What helped the speaker most?', o: ['Spending time in Madrid', 'Three years of lessons', 'Watching Spanish films', 'Studying grammar books'], exp: '«I only started speaking confidently after I spent a summer in Madrid».' },
    { level: 'B1', t: 'detail', audio: 'The concert has been postponed because the singer has a sore throat. All tickets will be valid for the new date in March.', q: 'What will happen to the tickets?', o: ['They can be used on the new date', 'They will be refunded', 'They are no longer valid', 'They must be exchanged by March'], exp: '«All tickets will be valid for the new date in March».' },
    // B2
    { level: 'B2', t: 'inference', audio: 'Although the new restaurant has received rave reviews, I found the service rather slow and the portions disappointingly small. Still, the dessert was worth the visit.', q: 'What is the speaker\'s overall opinion of the restaurant?', o: ['Mixed', 'Very positive', 'Completely negative', 'They haven\'t been there yet'], exp: 'Минусы (сервис, порции) и плюс (десерт) — смешанное впечатление.' },
    { level: 'B2', t: 'inference', audio: 'If you ask me, the plan looks great on paper, but I doubt we\'ll find enough volunteers to make it work in practice.', q: 'What is the speaker worried about?', o: ['Not having enough people to help', 'The cost of the plan', 'The plan being badly written', 'Too many volunteers'], exp: '«I doubt we\'ll find enough volunteers».' },
    { level: 'B2', t: 'detail', audio: 'Contrary to what most people think, it wasn\'t the price that put customers off — it was the complicated sign-up process.', q: 'What discouraged customers?', o: ['The complicated registration', 'The high price', 'Poor advertising', 'Slow delivery'], exp: '«it wasn\'t the price … it was the complicated sign-up process».' },
    // C1
    { level: 'C1', t: 'inference', audio: 'Had the council consulted local residents before approving the project, much of the subsequent opposition could have been avoided.', q: 'What does the speaker imply?', o: ['Residents were not consulted', 'Residents supported the project', 'The project was cancelled', 'The council avoided all opposition'], exp: '«Had the council consulted…» — нереальное условие в прошлом: жителей не спросили.' },
    { level: 'C1', t: 'inference', audio: 'I wouldn\'t go so far as to call the report misleading, but it certainly glosses over some rather inconvenient figures.', q: 'What does the speaker say about the report?', o: ['It avoids dealing with some unfavourable data', 'It is deliberately false', 'It is perfectly accurate', 'It contains too many figures'], exp: 'Gloss over — обходить стороной, замалчивать.' },
    { level: 'C1', t: 'meaning', audio: 'Much as I admire her determination, I can\'t help feeling she\'s bitten off more than she can chew.', q: 'What does the speaker think about her?', o: ['She has taken on too much', 'She is not determined enough', 'She should eat less', 'She will certainly succeed'], exp: 'Bite off more than you can chew — взяться за непосильное.' },
    // C2
    { level: 'C2', t: 'inference', audio: 'Far be it from me to question his expertise, but his latest proposal seems to rest on rather shaky foundations.', q: 'What is the speaker\'s attitude to the proposal?', o: ['Politely sceptical', 'Enthusiastic', 'Indifferent', 'Openly hostile'], exp: '«Far be it from me…» — вежливое вступление перед критикой.' },
    { level: 'C2', t: 'meaning', audio: 'His apology, such as it was, did little to placate the board, who had long since lost patience with his antics.', q: 'What does "such as it was" suggest about the apology?', o: ['It was hardly a real apology', 'It was sincere and complete', 'It was given too early', 'It was accepted by the board'], exp: '«Such as it was» — «если это вообще можно так назвать».' },
    { level: 'C2', t: 'gist', audio: 'The findings, while hardly earth-shattering, lend weight to the idea that early intervention pays dividends.', q: 'How does the speaker describe the findings?', o: ['Modest, but supporting an idea', 'Revolutionary', 'Completely useless', 'Contradicting earlier research'], exp: '«hardly earth-shattering» — не сенсация; «lend weight» — подкрепляют.' }
  ]
};
