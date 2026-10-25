// Банк вопросов. Правильный ответ — всегда первый вариант в массиве `o`
// (варианты перемешиваются при показе). level — уровень CEFR вопроса.
window.TEST_DATA = {
  grammar: [
    { level: 'A1', q: 'She ___ a teacher.', o: ['is', 'are', 'am', 'be'], exp: 'С he/she/it глагол to be — «is».' },
    { level: 'A1', q: 'I ___ coffee every morning.', o: ['drink', 'drinks', 'drinking', 'am drink'], exp: 'Present Simple, подлежащее I — глагол без -s.' },
    { level: 'A1', q: 'There ___ two cats in the garden.', o: ['are', 'is', 'be', 'has'], exp: 'There are + множественное число.' },
    { level: 'A1', q: '___ you like pizza?', o: ['Do', 'Does', 'Are', 'Is'], exp: 'Вопрос в Present Simple с you — вспомогательный Do.' },

    { level: 'A2', q: 'I ___ to London last year.', o: ['went', 'go', 'have gone', 'was go'], exp: '«Last year» — законченное время в прошлом, Past Simple.' },
    { level: 'A2', q: 'She is ___ than her brother.', o: ['taller', 'tall', 'tallest', 'more tall'], exp: 'Сравнительная степень коротких прилагательных: -er + than.' },
    { level: 'A2', q: 'We ___ dinner when the phone rang.', o: ['were having', 'had', 'have', 'are having'], exp: 'Длительное действие, прерванное другим, — Past Continuous.' },
    { level: 'A2', q: 'You ___ smoke here. It\'s forbidden.', o: ['mustn\'t', 'don\'t have to', 'needn\'t', 'shouldn\'t to'], exp: 'Mustn\'t — запрет; don\'t have to — «нет необходимости».' },

    { level: 'B1', q: 'I\'ve lived here ___ 2015.', o: ['since', 'for', 'from', 'during'], exp: 'Since + точка во времени, for + период.' },
    { level: 'B1', q: 'If it rains tomorrow, we ___ at home.', o: ['will stay', 'would stay', 'stay', 'stayed'], exp: 'First Conditional: If + Present, will + глагол.' },
    { level: 'B1', q: 'The book ___ by millions of people.', o: ['has been read', 'has read', 'have been read', 'was reading'], exp: 'Пассив в Present Perfect: has been + V3; book — ед. число.' },
    { level: 'B1', q: 'He asked me where ___.', o: ['I lived', 'did I live', 'do I live', 'I do live'], exp: 'В косвенном вопросе прямой порядок слов и сдвиг времён.' },

    { level: 'B2', q: 'If I ___ harder, I would have passed the exam.', o: ['had studied', 'studied', 'would study', 'have studied'], exp: 'Third Conditional: If + Past Perfect, would have + V3.' },
    { level: 'B2', q: 'By the time we arrived, the film ___.', o: ['had already started', 'already started', 'has already started', 'was already starting'], exp: 'Действие до другого действия в прошлом — Past Perfect.' },
    { level: 'B2', q: 'I\'m not used to ___ up so early.', o: ['getting', 'get', 'got', 'be getting'], exp: 'Be used to + -ing — «быть привычным к».' },
    { level: 'B2', q: 'She suggested ___ a taxi.', o: ['taking', 'to take', 'take', 'that we taking'], exp: 'После suggest — герундий (или that + we (should) take).' },

    { level: 'C1', q: 'Not only ___ late, but he also forgot the tickets.', o: ['was he', 'he was', 'he is', 'did he be'], exp: 'После Not only в начале — инверсия.' },
    { level: 'C1', q: '___ the weather been better, we would have gone hiking.', o: ['Had', 'If', 'Should', 'Were'], exp: 'Инверсия в Third Conditional: Had + подлежащее + V3.' },
    { level: 'C1', q: 'It\'s high time you ___ looking for a job.', o: ['started', 'start', 'will start', 'have started'], exp: 'It\'s (high) time + Past Simple — «давно пора».' },
    { level: 'C1', q: 'He denied ___ the window.', o: ['having broken', 'to have broken', 'to break', 'broke'], exp: 'Deny + герундий; перфектный герундий подчёркивает предшествование.' },

    { level: 'C2', q: 'Little ___ that his life was about to change forever.', o: ['did he know', 'he knew', 'he did know', 'knew he'], exp: 'Little в начале предложения требует инверсии с вспомогательным глаголом.' },
    { level: 'C2', q: 'Were the government ___ taxes, there would be protests.', o: ['to raise', 'raising', 'raise', 'raised'], exp: 'Инверсия Were + подлежащее + to-infinitive для гипотетического будущего.' },
    { level: 'C2', q: 'She\'d sooner ___ than apologise to him.', o: ['die', 'to die', 'dying', 'died'], exp: 'Would sooner + инфинитив без to.' },
    { level: 'C2', q: '___ as it may seem, the theory holds up.', o: ['Strange', 'Strangely', 'However strange', 'As strange'], exp: 'Конструкция «Adjective + as + subject + may seem» — «как ни странно».' }
  ],

  vocabulary: [
    { level: 'A1', q: 'The opposite of "hot" is ___.', o: ['cold', 'warm', 'wet', 'big'], exp: 'Hot — горячий, cold — холодный.' },
    { level: 'A1', q: 'I read a ___ every night before bed.', o: ['book', 'table', 'chair', 'window'], exp: 'Читают книгу — book.' },
    { level: 'A1', q: 'My mother\'s brother is my ___.', o: ['uncle', 'cousin', 'nephew', 'grandfather'], exp: 'Брат матери — дядя (uncle).' },

    { level: 'A2', q: 'Can you ___ me a favour?', o: ['do', 'make', 'give', 'take'], exp: 'Устойчивое сочетание: do someone a favour.' },
    { level: 'A2', q: 'I\'m looking ___ my keys. Have you seen them?', o: ['for', 'at', 'after', 'up'], exp: 'Look for — искать; look after — присматривать.' },
    { level: 'A2', q: 'The train was ___, so we missed our meeting.', o: ['delayed', 'on time', 'early', 'fast'], exp: 'Delayed — задержан, опоздал.' },

    { level: 'B1', q: 'She ___ her job because she wanted to travel.', o: ['quit', 'left out', 'gave in', 'broke up'], exp: 'Quit a job — уволиться.' },
    { level: 'B1', q: 'I can\'t ___ with this noise any longer.', o: ['put up', 'get on', 'look up', 'take off'], exp: 'Put up with — терпеть, мириться.' },
    { level: 'B1', q: 'The meeting has been ___ until next week.', o: ['put off', 'put out', 'put on', 'put up'], exp: 'Put off — откладывать.' },

    { level: 'B2', q: 'His explanation was so ___ that nobody understood it.', o: ['convoluted', 'concise', 'lucid', 'straightforward'], exp: 'Convoluted — запутанный; остальные — «ясный, краткий».' },
    { level: 'B2', q: 'The company had to ___ 200 workers due to the crisis.', o: ['lay off', 'lay down', 'lay out', 'lay by'], exp: 'Lay off — сократить сотрудников.' },
    { level: 'B2', q: 'She has a ___ for languages – she learns them so easily.', o: ['flair', 'flare', 'fair', 'fare'], exp: 'Flair — природный талант; flare — вспышка.' },

    { level: 'C1', q: 'The minister\'s speech was full of ___ promises that nobody believed.', o: ['hollow', 'hallow', 'void', 'blank'], exp: 'Hollow promises — пустые обещания.' },
    { level: 'C1', q: 'Her ___ remarks offended many guests.', o: ['tactless', 'tactful', 'diplomatic', 'discreet'], exp: 'Tactless — бестактный.' },
    { level: 'C1', q: 'The evidence was ___, so the case was dismissed.', o: ['flimsy', 'robust', 'compelling', 'conclusive'], exp: 'Flimsy evidence — неубедительные, шаткие доказательства.' },

    { level: 'C2', q: 'His ___ attitude towards his duties eventually got him fired.', o: ['cavalier', 'chivalrous', 'cautious', 'conscientious'], exp: 'Cavalier — небрежный, пренебрежительный.' },
    { level: 'C2', q: 'The novel\'s plot is so ___ that readers struggle to follow it.', o: ['byzantine', 'pellucid', 'succinct', 'pedestrian'], exp: 'Byzantine — чрезвычайно запутанный; pellucid — кристально ясный.' },
    { level: 'C2', q: 'She was ___ by the criticism and carried on regardless.', o: ['undeterred', 'undermined', 'underwhelmed', 'undertaken'], exp: 'Undeterred — не испугавшийся, не остановленный.' }
  ],

  reading: [
    {
      title: 'Tom\'s Weekend',
      text: 'Tom lives in a small town near the sea. On Saturdays he works in a café from nine to three. After work he usually goes swimming with his sister, Anna. On Sundays the café is closed, so Tom stays at home, cooks lunch for his parents and reads. Next weekend will be different: Tom is going to visit his friend in the capital.',
      questions: [
        { level: 'A1', q: 'Where does Tom work?', o: ['In a café', 'In a shop', 'At a school', 'At the beach'], exp: '«On Saturdays he works in a café».' },
        { level: 'A2', q: 'What does Tom usually do on Sundays?', o: ['He stays at home and cooks', 'He works in the café', 'He goes swimming with Anna', 'He visits the capital'], exp: '«On Sundays the café is closed, so Tom stays at home, cooks lunch…».' },
        { level: 'A2', q: 'What is Tom going to do next weekend?', o: ['Visit a friend in the capital', 'Work extra hours', 'Go swimming with his parents', 'Open a new café'], exp: '«Tom is going to visit his friend in the capital».' }
      ]
    },
    {
      title: 'Working from Home',
      text: 'When companies first sent employees home in 2020, many managers expected productivity to collapse. Instead, a number of studies found that output stayed the same or even rose slightly. However, the picture is more complicated than these headlines suggest. Workers saved hours each week by not commuting, but many also reported feeling isolated and finding it harder to switch off at the end of the day. Junior staff in particular said they missed learning by watching experienced colleagues. As a result, most firms have now settled on a "hybrid" model, in which employees spend part of the week in the office and part at home.',
      questions: [
        { level: 'B1', q: 'What did many managers expect in 2020?', o: ['Productivity would fall sharply', 'Workers would save time', 'Output would rise slightly', 'Staff would prefer the office'], exp: '«many managers expected productivity to collapse».' },
        { level: 'B2', q: 'Which group was especially affected, according to the text?', o: ['Junior staff, who missed learning from colleagues', 'Managers, who lost control of output', 'Senior staff, who disliked commuting', 'Workers who lived far from the office'], exp: '«Junior staff in particular said they missed learning by watching experienced colleagues».' },
        { level: 'B2', q: 'The phrase "the picture is more complicated than these headlines suggest" means that…', o: ['the positive findings don\'t tell the whole story', 'the studies were wrong', 'productivity actually collapsed', 'the media ignored the studies'], exp: 'Автор вводит минусы удалённой работы, которые не видны в позитивных заголовках.' }
      ]
    },
    {
      title: 'The Irrational Consumer',
      text: 'The notion that we are rational actors, carefully weighing costs against benefits, has long underpinned classical economics. Yet behavioural research has steadily chipped away at this assumption. People routinely overvalue what they already own, are swayed by the order in which options are presented, and will forgo a larger reward later for a smaller one now. Far from being random, these deviations are systematic and therefore predictable — a fact that has not been lost on marketers and policymakers alike. Critics, however, warn that "nudging" citizens towards desirable behaviour, however benign the intention, sits uneasily with the ideal of individual autonomy.',
      questions: [
        { level: 'C1', q: 'What does the author say about deviations from rational behaviour?', o: ['They are systematic and can be predicted', 'They are random and unpredictable', 'They only affect consumers, not policymakers', 'They have been disproved by research'], exp: '«Far from being random, these deviations are systematic and therefore predictable».' },
        { level: 'C1', q: 'In the text, "chipped away at" is closest in meaning to…', o: ['gradually weakened', 'firmly supported', 'suddenly destroyed', 'carefully explained'], exp: 'Chip away at — постепенно подтачивать, ослаблять.' },
        { level: 'C2', q: 'What is the critics\' main concern?', o: ['Nudging may conflict with personal freedom even if well-meant', 'Nudging is ineffective in practice', 'Marketers use nudging more than governments', 'Behavioural research is unreliable'], exp: '«however benign the intention, sits uneasily with the ideal of individual autonomy».' },
        { level: 'C2', q: 'The phrase "a fact that has not been lost on marketers" implies that marketers…', o: ['are well aware of it and exploit it', 'have ignored it', 'were the first to discover it', 'disagree with it'], exp: '«Not lost on someone» — кто-то это хорошо понял (и использует).' }
      ]
    }
  ],

  listening: [
    { level: 'A1', audio: 'Hello, my name is Sarah. I am from Canada and I am twenty-five years old.', q: 'How old is Sarah?', o: ['25', '35', '15', '52'], exp: '«I am twenty-five years old».' },
    { level: 'A2', audio: 'The museum opens at half past nine and closes at five, but on Fridays it stays open until eight.', q: 'What time does the museum close on Fridays?', o: ['At 8:00', 'At 5:00', 'At 9:30', 'At 5:30'], exp: '«on Fridays it stays open until eight».' },
    { level: 'B1', audio: 'I was going to take the bus, but it was so crowded that I decided to walk instead. It only took twenty minutes.', q: 'How did the speaker get there?', o: ['On foot', 'By bus', 'By taxi', 'By bike'], exp: '«I decided to walk instead».' },
    { level: 'B2', audio: 'Although the new restaurant has received rave reviews, I found the service rather slow and the portions disappointingly small. Still, the dessert was worth the visit.', q: 'What is the speaker\'s overall opinion of the restaurant?', o: ['Mixed', 'Very positive', 'Completely negative', 'They haven\'t been there yet'], exp: 'Минусы (сервис, порции) и плюс (десерт) — смешанное впечатление.' },
    { level: 'C1', audio: 'Had the council consulted local residents before approving the project, much of the subsequent opposition could have been avoided.', q: 'What does the speaker imply?', o: ['Residents were not consulted', 'Residents supported the project', 'The project was cancelled', 'The council avoided all opposition'], exp: '«Had the council consulted…» — нереальное условие в прошлом: жителей не спросили.' },
    { level: 'C2', audio: 'Far be it from me to question his expertise, but his latest proposal seems to rest on rather shaky foundations.', q: 'What is the speaker\'s attitude to the proposal?', o: ['Politely sceptical', 'Enthusiastic', 'Indifferent', 'Openly hostile'], exp: '«Far be it from me…» — вежливое вступление перед критикой.' }
  ]
};
