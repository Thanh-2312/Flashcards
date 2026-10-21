/**
 * Minimal Flashcards Application
 * Categories: Words & Collocations (IELTS Academic Reading)
 * Front: Clear, simple A1/A2/B1 sentences with blank for easy guessing
 * Back: Exact IELTS target vocabulary, IPA, Vietnamese meaning, and reading context
 * Spaced Repetition Intervals: 1, 4, 7, 14 days
 */

(function () {
  'use strict';

  // --- INTERVAL CONSTANTS (Days) ---
  const INTERVAL_LEVELS = [1, 4, 7, 14];
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // --- ALL FLASHCARDS (WORDS & COLLOCATIONS) WITH EASY A1-A2-B1 FRONT SENTENCES ---
  const DEFAULT_CARDS = [
    // ==========================================
    // PHẦN 1: WORDS (Từ Vựng - Cards 01 đến 27)
    // ==========================================
    {
      id: 'card-01',
      category: 'words',
      english: 'aquatic',
      ipa: '/əˈkwæt.ɪk/ (adj - B2)',
      vietnamese: 'Thuộc về nước, sống hoặc phát triển ở dưới nước.',
      frontText: 'Fish and other __________ animals live in water, not on land.',
      context: 'Water hyacinth (Eichhornia crassipes), an aquatic plant native to South America...',
      exampleEn: 'Fish and other aquatic animals live in water, not on land.',
      acceptedAnswers: ['aquatic'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-02',
      category: 'words',
      english: 'obstruct',
      ipa: '/əbˈstrʌkt/ (v - B2)',
      vietnamese: 'Gây tắc nghẽn, cản trở lối đi hoặc tầm nhìn.',
      frontText: 'Please do not __________ the door so people can walk in and out easily.',
      context: '...started obstructing major dams and rivers.',
      exampleEn: 'Please do not obstruct the door so people can walk in and out easily.',
      acceptedAnswers: ['obstruct', 'obstructing'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-03',
      category: 'words',
      english: 'colonist',
      ipa: '/ˈkɒl.ə.nɪst/ (n - B2)',
      vietnamese: 'Người đi định cư ở vùng đất mới do mẫu quốc chiếm đóng; người thực dân.',
      frontText: 'A __________ is a person who moves to live in a new land ruled by their home country.',
      context: 'In east Africa the plant arrived with Belgian colonists in Rwanda...',
      exampleEn: 'A colonist is a person who moves to live in a new land ruled by their home country.',
      acceptedAnswers: ['colonist', 'colonists'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-04',
      category: 'words',
      english: 'delicate',
      ipa: '/ˈdel.ɪ.kət/ (adj - B2)',
      vietnamese: 'Mỏng mảnh, thanh nhã, dễ gãy hỏng nếu tác động mạnh.',
      frontText: 'Be very careful with this glass cup because it is thin and __________.',
      context: '...who liked the look of its glossy leaves and delicate purple flowers...',
      exampleEn: 'Be very careful with this glass cup because it is thin and delicate.',
      acceptedAnswers: ['delicate'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-05',
      category: 'words',
      english: 'glossy',
      ipa: '/ˈɡlɒs.i/ (adj - C1)',
      vietnamese: 'Nhẵn bóng, láng mượt và phản chiếu ánh sáng.',
      frontText: 'Her new leather shoes are so clean and __________ that they shine under the light.',
      context: '...who liked the look of its glossy leaves and delicate purple flowers...',
      exampleEn: 'Her new leather shoes are so clean and glossy that they shine under the light.',
      acceptedAnswers: ['glossy'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-06',
      category: 'words',
      english: 'predator',
      ipa: '/ˈpred.ə.tər/ (n - B2)',
      vietnamese: 'Động vật ăn thịt, thiên địch trong chuỗi thức ăn.',
      frontText: 'Lions and tigers are __________ because they hunt and eat other animals to survive.',
      context: 'There, with no natural predators and perfect temperature conditions...',
      exampleEn: 'Lions and tigers are predators because they hunt and eat other animals to survive.',
      acceptedAnswers: ['predator', 'predators'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-07',
      category: 'words',
      english: 'navigate',
      ipa: '/ˈnæv.ɪ.ɡeɪt/ (v - B2)',
      vietnamese: 'Định hướng, di chuyển hoặc điều khiển phương tiện vượt qua chướng ngại vật.',
      frontText: 'Drivers often use Google Maps to __________ through unfamiliar streets in the city.',
      context: '...as the boats that once brought the fish to shore by the hundreds struggle to navigate through the mass of plants.',
      exampleEn: 'Drivers often use Google Maps to navigate through unfamiliar streets in the city.',
      acceptedAnswers: ['navigate'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-08',
      category: 'words',
      english: 'demographic',
      ipa: '/ˌdem.əˈɡræf.ɪk/ (adj - C1)',
      vietnamese: 'Thuộc về số liệu dân số, cấu trúc và đặc điểm dân cư.',
      frontText: 'The government studies __________ data like age and gender to know how many people live in each town.',
      context: '...Kenya\'s latest demographic and health survey shows.',
      exampleEn: 'The government studies demographic data like age and gender to know how many people live in each town.',
      acceptedAnswers: ['demographic'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-09',
      category: 'words',
      english: 'annually',
      ipa: '/ˈæn.ju.ə.li/ (adv - B2)',
      vietnamese: 'Một lần mỗi năm; theo định kỳ hàng năm.',
      frontText: 'We celebrate Christmas once every year, so this special festival happens __________.',
      context: 'The World Health Organization estimates that about 14,300 Kenyans die annually as a result of indoor air pollution...',
      exampleEn: 'We celebrate Christmas once every year, so this special festival happens annually.',
      acceptedAnswers: ['annually'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-10',
      category: 'words',
      english: 'decay',
      ipa: '/dɪˈkeɪ/ (v - B2)',
      vietnamese: 'Bị mục nát, thối rữa tự nhiên do vi khuẩn và nấm phân hủy.',
      frontText: 'When old fruit falls on the ground, bacteria make it rot and __________.',
      context: 'But buried in those decaying waxy leaves was a renewable energy gold mine.',
      exampleEn: 'When old fruit falls on the ground, bacteria make it rot and decay.',
      acceptedAnswers: ['decay', 'decaying'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-11',
      category: 'words',
      english: 'foliage',
      ipa: '/ˈfəʊ.li.ɪdʒ/ (n - C1)',
      vietnamese: 'Toàn bộ lá cây trên một cành hoặc trong một vùng thực vật; tán lá.',
      frontText: 'In the forest, the green leaves of all the trees together are called __________.',
      context: '...its foliage also contains a high ratio of carbon to nitrogen.',
      exampleEn: 'In the forest, the green leaves of all the trees together are called foliage.',
      acceptedAnswers: ['foliage'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-12',
      category: 'words',
      english: 'captivate',
      ipa: '/ˈkæp.tɪ.veɪt/ (v - C1)',
      vietnamese: 'Thu hút, làm say đắm hoặc chiếm trọn sự chú ý của ai đó.',
      frontText: 'The magician did wonderful tricks that managed to __________ all the children in the room.',
      context: 'It\'s a magic combination that has captivated researchers\' imaginations...',
      exampleEn: 'The magician did wonderful tricks that managed to captivate all the children in the room.',
      acceptedAnswers: ['captivate'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-13',
      category: 'words',
      english: 'academic',
      ipa: '/ˌæk.əˈdem.ɪk/ (n - B2)',
      vietnamese: 'Giới nghiên cứu học thuật, học giả, giáo sư giảng dạy nghiên cứu viện đại học.',
      frontText: 'A teacher or researcher working at a university is known as an __________.',
      context: 'In 2014, Nigerian academics announced they had got better yields of biofuel gas...',
      exampleEn: 'A teacher or researcher working at a university is known as an academic.',
      acceptedAnswers: ['academic', 'academics'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-14',
      category: 'words',
      english: 'yield',
      ipa: '/jiːld/ (n - C1)',
      vietnamese: 'Lượng sản phẩm, năng lượng hoặc hoa màu sản xuất ra được; sản lượng.',
      frontText: 'With good rain and sunlight, the farmer collected a very large corn __________ this year.',
      context: '...announced they had got better yields of biofuel gas...',
      exampleEn: 'With good rain and sunlight, the farmer collected a very large corn yield this year.',
      acceptedAnswers: ['yield', 'yields'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-15',
      category: 'words',
      english: 'manure',
      ipa: '/məˈnjʊər/ (n - C1)',
      vietnamese: 'Phân của động vật (bò, gà, ngựa) được dùng để bón cây hoặc ủ khí.',
      frontText: 'Farmers mix animal waste into the soil as __________ to help vegetables grow faster.',
      context: '...when they mixed the plant with chicken manure.',
      exampleEn: 'Farmers mix animal waste into the soil as manure to help vegetables grow faster.',
      acceptedAnswers: ['manure'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-16',
      category: 'words',
      english: 'peer',
      ipa: '/pɪər/ (n - B2)',
      vietnamese: 'Người cùng trang lứa, đồng cấp, đồng nghiệp trong cùng một lĩnh vực.',
      frontText: 'Children often want to play the same games and wear the same clothes as their __________ at school.',
      context: 'Kenyan scientists confirmed what their Nigerian peers and others had already found...',
      exampleEn: 'Children often want to play the same games and wear the same clothes as their peers at school.',
      acceptedAnswers: ['peer', 'peers'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-17',
      category: 'words',
      english: 'menace',
      ipa: '/ˈmen.ɪs/ (n - C1)',
      vietnamese: 'Mối hiểm họa, tác nhân đe dọa gây nguy hại cho xã hội/môi trường.',
      frontText: 'Driving very fast in a school zone is dangerous and a terrible __________ to young children.',
      context: 'The project promised a two-for-one solution to the dual menaces of the water hyacinth and dependence on firewood.',
      exampleEn: 'Driving very fast in a school zone is dangerous and a terrible menace to young children.',
      acceptedAnswers: ['menace', 'menaces'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-18',
      category: 'words',
      english: 'dung',
      ipa: '/dʌŋ/ (n - C1)',
      vietnamese: 'Phân của các loài động vật ăn cỏ lớn (bò, trâu, voi).',
      frontText: 'In poor rural areas, people dry cow __________ in the sun to use as fuel for cooking.',
      context: '...transform a mix of water hyacinth and cow dung into biogas for cooking.',
      exampleEn: 'In poor rural areas, people dry cow dung in the sun to use as fuel for cooking.',
      acceptedAnswers: ['dung'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-19',
      category: 'words',
      english: 'fermentation',
      ipa: '/ˌfɜː.menˈteɪ.ʃən/ (n - C1)',
      vietnamese: 'Quá trình lên men hóa học do vi sinh vật hoặc nấm men thực hiện.',
      frontText: 'Making beer and bread requires yeast to change sugar into gas, a process called __________.',
      context: '...it goes through a fermentation process and breaks down...',
      exampleEn: 'Making beer and bread requires yeast to change sugar into gas, a process called fermentation.',
      acceptedAnswers: ['fermentation'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-20',
      category: 'words',
      english: 'domestic',
      ipa: '/dəˈmes.tɪk/ (adj - B2)',
      vietnamese: 'Liên quan đến gia đình, việc nhà, sinh hoạt hộ gia đình (hoặc nội địa).',
      frontText: 'Cooking meals, washing dishes, and cleaning floors are common __________ tasks at home.',
      context: 'It is used in domestic stoves and for other household tasks...',
      exampleEn: 'Cooking meals, washing dishes, and cleaning floors are common domestic tasks at home.',
      acceptedAnswers: ['domestic'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-21',
      category: 'words',
      english: 'purify',
      ipa: '/ˈpjʊə.rɪ.faɪ/ (v - B2)',
      vietnamese: 'Lọc sạch chất độc, tạp chất để làm cho một thứ trở nên tinh khiết.',
      frontText: 'We should boil or filter dirty river water to __________ it before drinking.',
      context: '...for other household tasks such as purifying water and incubating chicks.',
      exampleEn: 'We should boil or filter dirty river water to purify it before drinking.',
      acceptedAnswers: ['purify'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-22',
      category: 'words',
      english: 'incubate',
      ipa: '/ˈɪŋ.kjə.beɪt/ (v - C1)',
      vietnamese: 'Ấp trứng (giữ ấm bằng nhiệt độ phù hợp để phát triển thành con); ủ vi sinh.',
      frontText: 'Mother birds sit on their eggs to keep them warm and __________ them until baby birds hatch.',
      context: '...such as purifying water and incubating chicks.',
      exampleEn: 'Mother birds sit on their eggs to keep them warm and incubate them until baby birds hatch.',
      acceptedAnswers: ['incubate'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-23',
      category: 'words',
      english: 'enterprise',
      ipa: '/ˈen.tə.praɪz/ (n - B2/C1)',
      vietnamese: 'Cơ sở kinh doanh, dự án khởi nghiệp hoặc hoạt động sinh lời.',
      frontText: 'She started a small bakery __________ to sell fresh cakes and make money for her family.',
      context: 'As a result, they\'re able to make more money for their families from other enterprises.',
      exampleEn: 'She started a small bakery enterprise to sell fresh cakes and make money for her family.',
      acceptedAnswers: ['enterprise', 'enterprises'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-24',
      category: 'words',
      english: 'relief',
      ipa: '/rɪˈliːf/ (n - B2)',
      vietnamese: 'Cảm giác nhẹ nhõm, thanh thản khi thoát khỏi áp lực hoặc lo âu.',
      frontText: 'I felt a huge sense of __________ when the doctor told me that my father was completely healthy.',
      context: '...gathering firewood, which is a great relief.',
      exampleEn: 'I felt a huge sense of relief when the doctor told me that my father was completely healthy.',
      acceptedAnswers: ['relief'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-25',
      category: 'words',
      english: 'respiratory',
      ipa: '/rɪˈspɪr.ə.tər.i/ (adj - C1)',
      vietnamese: 'Liên quan đến cơ quan hoặc quá trình hô hấp (phổi, khí quản).',
      frontText: 'Breathing toxic smoke every day can cause dangerous __________ sickness in your lungs.',
      context: '...families who switch to the smokeless cooking method could expect fewer respiratory diseases.',
      exampleEn: 'Breathing toxic smoke every day can cause dangerous respiratory sickness in your lungs.',
      acceptedAnswers: ['respiratory'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-26',
      category: 'words',
      english: 'vulnerable',
      ipa: '/ˈvʌl.nər.ə.bəl/ (adj - B2)',
      vietnamese: 'Dễ bị tổn hại về thể chất, tinh thần hoặc hoàn cảnh xã hội.',
      frontText: 'Without warm clothes in freezing cold winter, little babies are very __________ to getting sick.',
      context: 'Women, young girls and children are particularly vulnerable because they are the ones who cook...',
      exampleEn: 'Without warm clothes in freezing cold winter, little babies are very vulnerable to getting sick.',
      acceptedAnswers: ['vulnerable'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-27',
      category: 'words',
      english: 'affordability',
      ipa: '/əˌfɔː.dəˈbɪl.ə.ti/ (n - C1)',
      vietnamese: 'Mức độ phải chăng của giá cả để người dùng bình thường có thể mua được.',
      frontText: 'Many poor students worry about the __________ of college because school fees are so high.',
      context: 'Kanyiva says affordability is a challenge worth addressing...',
      exampleEn: 'Many poor students worry about the affordability of college because school fees are so high.',
      acceptedAnswers: ['affordability'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },

    // =========================================================================
    // PHẦN 2, 3, 4: COLLOCATIONS & PHRASES (Cụm từ & Liên từ - Cards 28 đến 53)
    // =========================================================================
    {
      id: 'card-28',
      category: 'collocations',
      english: 'make one\'s way',
      ipa: '(phrase - B2)',
      vietnamese: 'Đi tới, di chuyển từng bước về một đích đến nào đó.',
      frontText: 'After the concert ended, the crowd started to __________ their __________ back home.',
      context: '...escaped out of the country via the Kagera river and made its way downstream to Lake Victoria.',
      exampleEn: 'After the concert ended, the crowd started to make their way back home.',
      acceptedAnswers: ['make one\'s way', 'make ones way', 'made their way', 'make their way', 'made one\'s way', 'made ones way'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-29',
      category: 'collocations',
      english: 'breathe in',
      ipa: '(phrasal verb - B2)',
      vietnamese: 'Hít không khí hoặc khói bụi vào phổi (đồng nghĩa: inhale).',
      frontText: 'When you feel nervous, close your eyes and slowly __________ in fresh air.',
      context: 'And each day as they cook, they breathe in the thick, grey smoke.',
      exampleEn: 'When you feel nervous, close your eyes and slowly breathe in fresh air.',
      acceptedAnswers: ['breathe in', 'breathing in', 'breathe', 'breathing'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-30',
      category: 'collocations',
      english: 'turn out',
      ipa: '(phrasal verb - B2)',
      vietnamese: 'Hóa ra là, sau cùng phát hiện ra một sự thật bất ngờ.',
      frontText: 'We thought it would rain all afternoon, but it __________ out to be sunny and warm.',
      context: 'It turns out the floating plant isn\'t just good at spreading - its foliage also contains a high ratio...',
      exampleEn: 'We thought it would rain all afternoon, but it turned out to be sunny and warm.',
      acceptedAnswers: ['turn out', 'turned out', 'turned'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-31',
      category: 'collocations',
      english: 'cater for',
      ipa: '(phrasal verb - B2/C1)',
      vietnamese: 'Phục vụ, đáp ứng đầy đủ thức ăn hoặc nhu cầu thiết yếu cho một nhóm đối tượng.',
      frontText: 'The school canteen must prepare enough hot lunch to __________ for five hundred hungry kids.',
      context: 'Just about 4kg of the dried plant would be enough to cater for a large family\'s daily energy needs...',
      exampleEn: 'The school canteen must prepare enough hot lunch to cater for five hundred hungry kids.',
      acceptedAnswers: ['cater for', 'cater'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-32',
      category: 'collocations',
      english: 'break down',
      ipa: '(phrasal verb - B2)',
      vietnamese: '(Hóa học/Sinh học) Phân rã, phân hủy thành các hợp chất nhỏ hơn.',
      frontText: 'In the garden, small worms help dead leaves __________ down into rich black soil.',
      context: '...it goes through a fermentation process and breaks down, giving off gas...',
      exampleEn: 'In the garden, small worms help dead leaves break down into rich black soil.',
      acceptedAnswers: ['break down', 'break'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-33',
      category: 'collocations',
      english: 'give off',
      ipa: '(phrasal verb - B2)',
      vietnamese: 'Phát ra, tỏa ra (nhiệt, ánh sáng, khói hoặc khí ga) = emit.',
      frontText: 'A burning campfire in the night will __________ off lots of heat and light.',
      context: '...giving off gas that comes out the other end.',
      exampleEn: 'A burning campfire in the night will give off lots of heat and light.',
      acceptedAnswers: ['give off', 'giving off', 'give'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-34',
      category: 'collocations',
      english: 'switch to',
      ipa: '(phrasal verb - B2)',
      vietnamese: 'Thay đổi, chuyển từ phương pháp/sản phẩm này sang một lựa chọn khác.',
      frontText: 'To save money, my parents decided to __________ to energy-saving LED light bulbs.',
      context: '...families who switch to the smokeless cooking method could expect fewer respiratory diseases.',
      exampleEn: 'To save money, my parents decided to switch to energy-saving LED light bulbs.',
      acceptedAnswers: ['switch to', 'switch'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-35',
      category: 'collocations',
      english: 'devote... to',
      ipa: '/dɪˈvəʊt/ (verb phrase - B2)',
      vietnamese: 'Dành phần lớn thời gian, sức lực hoặc nguồn lực cho một hoạt động cụ thể.',
      frontText: 'Every evening, she likes to __________ one hour to reading storybooks with her little son.',
      context: 'Besides, they don\'t have to devote a lot of time every day to gathering firewood...',
      exampleEn: 'Every evening, she likes to devote one hour to reading storybooks with her little son.',
      acceptedAnswers: ['devote', 'devote to', 'devote... to'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-36',
      category: 'collocations',
      english: 'bring in',
      ipa: '(phrasal verb - B2)',
      vietnamese: 'Kiếm ra tiền, đem lại khoản thu nhập hoặc doanh thu.',
      frontText: 'Selling homemade lemonade at the weekend market helped the kids __________ in twenty dollars.',
      context: '...they can focus on different tasks that bring in money',
      exampleEn: 'Selling homemade lemonade at the weekend market helped the kids bring in twenty dollars.',
      acceptedAnswers: ['bring in', 'bring'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-37',
      category: 'collocations',
      english: 'pose',
      ipa: '/pəʊz/ (verb/collocation - B2/C1)',
      vietnamese: 'Gây ra, tạo ra hoặc mang đến một mối nguy hiểm/thách thức lớn.',
      frontText: 'Throwing plastic bags into the sea will __________ a serious danger to turtles and fish.',
      context: '...given the huge health and environmental dangers posed by \'dirty\' fuels...',
      exampleEn: 'Throwing plastic bags into the sea will pose a serious danger to turtles and fish.',
      acceptedAnswers: ['pose', 'poses', 'pose a danger'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-38',
      category: 'collocations',
      english: 'not someone\'s only headache',
      ipa: '(idiom - C1)',
      vietnamese: '"Đau đầu" theo nghĩa bóng: Không phải là rắc rối hoặc gánh nặng duy nhất mà một người phải chịu đựng.',
      frontText: 'Losing his keys was annoying, but finding a way home in the rain was not his only __________.',
      context: 'But water hyacinth isn\'t their only headache.',
      exampleEn: 'Losing his keys was annoying, but finding a way home in the rain was not his only headache.',
      acceptedAnswers: ['headache', 'only headache', 'not someone\'s only headache'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-39',
      category: 'collocations',
      english: 'a gold mine',
      ipa: '(idiom/metaphor - B2/C1)',
      vietnamese: 'Một nguồn lợi dồi dào, tiềm năng kinh tế khổng lồ đang chờ khai thác.',
      frontText: 'Her grandmother\'s secret cooking book was a real __________ because every dish was super popular.',
      context: 'But buried in those decaying waxy leaves was a renewable energy gold mine.',
      exampleEn: 'Her grandmother\'s secret cooking book was a real gold mine because every dish was super popular.',
      acceptedAnswers: ['gold mine', 'a gold mine', 'goldmine'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-40',
      category: 'collocations',
      english: 'in an attempt to',
      ipa: '(phrase - B2)',
      vietnamese: 'Với nỗ lực / cố gắng thực hiện một mục tiêu cụ thể nào đó.',
      frontText: 'He woke up at five in the morning in an __________ to finish all his homework before class.',
      context: '...villagers had taken out of the water in an attempt to clear it...',
      exampleEn: 'He woke up at five in the morning in an attempt to finish all his homework before class.',
      acceptedAnswers: ['attempt', 'in an attempt to', 'attempt to'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-41',
      category: 'collocations',
      english: 'a common sight',
      ipa: '(collocation - B2)',
      vietnamese: 'Một hiện tượng, cảnh tượng diễn ra thường xuyên, ai cũng nhìn thấy quen mắt.',
      frontText: 'Motorbikes carrying colorful flowers are a __________ sight on the busy streets of Hanoi.',
      context: '...huge piles of water hyacinth... were a common sight.',
      exampleEn: 'Motorbikes carrying colorful flowers are a common sight on the busy streets of Hanoi.',
      acceptedAnswers: ['common', 'common sight', 'a common sight'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-42',
      category: 'collocations',
      english: 'captivate someone\'s imagination',
      ipa: '(collocation - C1)',
      vietnamese: 'Kích thích trí tưởng tượng, khiến ai đó suy nghĩ đầy say mê và hứng thú về một điều gì.',
      frontText: 'Exciting movies about aliens and space travel always captivate the __________ of young kids.',
      context: 'It\'s a magic combination that has captivated researchers\' imaginations...',
      exampleEn: 'Exciting movies about aliens and space travel always captivate the imagination of young kids.',
      acceptedAnswers: ['imagination', 'imaginations', 'captivate someone\'s imagination'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-43',
      category: 'collocations',
      english: 'provide an effective alternative to',
      ipa: '(collocation - B2/C1)',
      vietnamese: 'Đóng vai trò là một giải pháp/nguồn thay thế hữu hiệu cho một thứ truyền thống.',
      frontText: 'Riding a bicycle to work is a healthy and cheap __________ to driving an expensive car.',
      context: 'The project is testing whether biogas can provide an effective alternative to firewood and charcoal...',
      exampleEn: 'Riding a bicycle to work is a healthy and cheap alternative to driving an expensive car.',
      acceptedAnswers: ['alternative', 'provide an effective alternative to', 'effective alternative'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-44',
      category: 'collocations',
      english: 'beyond the reach of',
      ipa: '(idiom - C1)',
      vietnamese: 'Vượt quá khả năng chi trả, ngoài tầm với của ai đó.',
      frontText: 'The price of that luxury sports car is far too expensive and beyond the __________ of normal workers.',
      context: '...the price of the digesters is beyond the reach of most villages',
      exampleEn: 'The price of that luxury sports car is far too expensive and beyond the reach of normal workers.',
      acceptedAnswers: ['reach', 'beyond the reach of', 'beyond the reach'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-45',
      category: 'collocations',
      english: 'a challenge worth addressing',
      ipa: '(collocation - C1)',
      vietnamese: 'Một thử thách khó khăn nhưng hoàn toàn xứng đáng để dành công sức xử lý triệt để.',
      frontText: 'Cleaning dirty plastic from the river is hard work, but it is a challenge worth __________.',
      context: 'Kanyiva says affordability is a challenge worth addressing...',
      exampleEn: 'Cleaning dirty plastic from the river is hard work, but it is a challenge worth addressing.',
      acceptedAnswers: ['addressing', 'address', 'worth addressing', 'a challenge worth addressing'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-46',
      category: 'collocations',
      english: 'on a large scale',
      ipa: '(collocation - B2)',
      vietnamese: 'Được thực hiện trên diện rộng, mức độ bao phủ lớn.',
      frontText: 'If a big factory produces warm winter coats on a __________ scale, the cost per coat will be lower.',
      context: 'If biogas could become affordable on a large scale...',
      exampleEn: 'If a big factory produces warm winter coats on a large scale, the cost per coat will be lower.',
      acceptedAnswers: ['large', 'large scale', 'on a large scale'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-47',
      category: 'collocations',
      english: 'life-changing',
      ipa: '(compound adjective - B2)',
      vietnamese: 'Có tác động mạnh mẽ đến mức làm thay đổi vận mệnh hoặc chất lượng cuộc sống.',
      frontText: 'Winning a scholarship to study at a top university was a truly __________ event in his life.',
      context: '...she says it \'would be life-changing for millions on the African continent and beyond\'.',
      exampleEn: 'Winning a scholarship to study at a top university was a truly life-changing event in his life.',
      acceptedAnswers: ['life-changing', 'life changing'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-48',
      category: 'collocations',
      english: 'via',
      ipa: '/ˈvaɪə/ (preposition - B2)',
      vietnamese: 'Đi qua đường nào, thông qua tuyến đường hoặc phương thức nào.',
      frontText: 'I sent the homework photos to my teacher __________ email so she could check them.',
      context: '...escaped out of the country via the Kagera river and made its way downstream...',
      exampleEn: 'I sent the homework photos to my teacher via email so she could check them.',
      acceptedAnswers: ['via'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-49',
      category: 'collocations',
      english: 'as early as',
      ipa: '(time emphasis phrase - B2)',
      vietnamese: 'Ngay từ tận (nhấn mạnh một mốc thời gian diễn ra rất sớm trong quá khứ).',
      frontText: 'The little bakery on the street corner opens as __________ as five in the morning.',
      context: '...captivated researchers\' imaginations since as early as the 1980s...',
      exampleEn: 'The little bakery on the street corner opens as early as five in the morning.',
      acceptedAnswers: ['early', 'as early as'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-50',
      category: 'collocations',
      english: 'besides',
      ipa: '/bɪˈsaɪdz/ (linking adverb - B2)',
      vietnamese: 'Thêm vào đó, hơn nữa (dùng ở đầu câu để bổ sung thêm một lý do có sức thuyết phục).',
      frontText: 'Walking every morning helps you stay healthy. __________, it costs no money at all.',
      context: 'Besides, they don\'t have to devote a lot of time every day to gathering firewood...',
      exampleEn: 'Walking every morning helps you stay healthy. Besides, it costs no money at all.',
      acceptedAnswers: ['besides'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-51',
      category: 'collocations',
      english: 'as a result',
      ipa: '(transition phrase - B2)',
      vietnamese: 'Kết quả là, hệ quả là (chỉ mối quan hệ nguyên nhân - kết quả giữa hai câu).',
      frontText: 'He stayed up very late playing video games. As a __________, he was late for school today.',
      context: 'As a result, they\'re able to make more money for their families from other enterprises.',
      exampleEn: 'He stayed up very late playing video games. As a result, he was late for school today.',
      acceptedAnswers: ['result', 'as a result'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-52',
      category: 'collocations',
      english: 'given',
      ipa: '/ˈɡɪv.ən/ (preposition/conjunction - C1)',
      vietnamese: 'Căn cứ vào, xét đến yếu tố thực tế nào đó trước khi đưa ra nhận xét.',
      frontText: '__________ that it was raining very heavily, we decided to stay at home and watch television.',
      context: '...a challenge worth addressing, given the huge health and environmental dangers posed by \'dirty\' fuels...',
      exampleEn: 'Given that it was raining very heavily, we decided to stay at home and watch television.',
      acceptedAnswers: ['given'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-53',
      category: 'collocations',
      english: 'and beyond',
      ipa: '(phrase - B2)',
      vietnamese: 'Và những khu vực/khía cạnh vượt xa hơn phạm vi vừa nhắc tới.',
      frontText: 'His delicious homemade coffee became famous all across the city and __________ to nearby towns.',
      context: '...life-changing for millions on the African continent and beyond.',
      exampleEn: 'His delicious homemade coffee became famous all across the city and beyond to nearby towns.',
      acceptedAnswers: ['beyond', 'and beyond'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },

    // =========================================================================
    // BÀI ĐỌC 2: THE DAVIES SISTERS & FRENCH IMPRESSIONISM
    // PHẦN 1: WORDS (Từ Vựng Cấp B2+ - Cards 54 đến 88)
    // =========================================================================
    {
      id: 'card-54',
      category: 'words',
      english: 'amass',
      ipa: '/əˈmæs/ (v - C1)',
      vietnamese: 'Tích lũy, gom góp một số lượng lớn (tiền của, tài sản, tác phẩm nghệ thuật qua thời gian).',
      frontText: 'Over many years, he worked hard and saved money to __________ a large collection of rare coins.',
      context: 'Between 1908 and 1924, Gwendoline and Margaret Davies amassed one of the largest collections of late-nineteenth and early-twentieth-century French paintings in Britain.',
      exampleEn: 'Over many years, he worked hard and saved money to amass a large collection of rare coins.',
      acceptedAnswers: ['amass', 'amassed'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-55',
      category: 'words',
      english: 'inheritance',
      ipa: '/ɪnˈher.ɪ.təns/ (n - B2)',
      vietnamese: 'Tài sản hoặc tiền bạc thừa kế (được để lại sau khi người thân qua đời).',
      frontText: 'When his rich uncle died, David received a large __________ of money and land.',
      context: 'In 1907, when Gwendoline came into her inheritance (Margaret would follow in 1909), the sisters were said to be the wealthiest unmarried women in Britain.',
      exampleEn: 'When his rich uncle died, David received a large inheritance of money and land.',
      acceptedAnswers: ['inheritance'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-56',
      category: 'words',
      english: 'upbringing',
      ipa: '/ˈʌpˌbrɪŋ.ɪŋ/ (n - B2)',
      vietnamese: 'Sự nuôi dạy, giáo dục nhận được từ gia đình khi còn thơ ấu.',
      frontText: 'Thanks to a loving family __________, the children grew up to be polite and honest.',
      context: 'Their religious upbringing in rural Wales gave them a deep sense of social responsibility...',
      exampleEn: 'Thanks to a loving family upbringing, the children grew up to be polite and honest.',
      acceptedAnswers: ['upbringing'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-57',
      category: 'words',
      english: 'philanthropic',
      ipa: '/ˌfɪl.ənˈθrɒp.ɪk/ (adj - C1)',
      vietnamese: 'Nhân đức, từ thiện (tìm cách thúc đẩy phúc lợi của người khác bằng việc tài trợ kinh phí).',
      frontText: 'The rich businesswoman gave millions to poor schools because of her __________ heart.',
      context: '...and they chose to use their inheritance for cultural and philanthropic purposes.',
      exampleEn: 'The rich businesswoman gave millions to poor schools because of her philanthropic heart.',
      acceptedAnswers: ['philanthropic'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-58',
      category: 'words',
      english: 'rigorously',
      ipa: '/ˈrɪɡ.ər.əs.li/ (adv - C1)',
      vietnamese: 'Một cách nghiêm ngặt, khắt khe, rất cẩn thận và kỹ lưỡng.',
      frontText: 'The new airplane was tested very __________ to make sure that it was completely safe before flying.',
      context: 'While there was no real family history of art collecting, the sisters\' education was rigorously geared toward such pursuits.',
      exampleEn: 'The new airplane was tested very rigorously to make sure that it was completely safe before flying.',
      acceptedAnswers: ['rigorously'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-59',
      category: 'words',
      english: 'pursuit',
      ipa: '/pəˈsjuːt/ (n - B2)',
      vietnamese: 'Sở thích, hoạt động theo đuổi đam mê hoặc mục tiêu cụ thể.',
      frontText: 'Drawing pictures and gardening are enjoyable outdoor __________ that help people relax.',
      context: '...the sisters\' education was rigorously geared toward such pursuits.',
      exampleEn: 'Drawing pictures and gardening are enjoyable outdoor pursuits that help people relax.',
      acceptedAnswers: ['pursuit', 'pursuits'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-60',
      category: 'words',
      english: 'extensively',
      ipa: '/ɪkˈsten.sɪv.li/ (adv - B2)',
      vietnamese: 'Một cách sâu rộng, trên phạm vi rộng khắp nhiều nơi.',
      frontText: 'Before writing the travel book, she travelled __________ to more than twenty different countries.',
      context: '...and they travelled extensively with their governess, Jane Blaker, visiting art galleries and making extensive notes on the collections there.',
      exampleEn: 'Before writing the travel book, she travelled extensively to more than twenty different countries.',
      acceptedAnswers: ['extensively'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-61',
      category: 'words',
      english: 'governess',
      ipa: '/ˈɡʌv.ə.nəs/ (n - C1)',
      vietnamese: 'Nữ gia sư, cô giáo riêng dạy kèm trẻ em tại nhà của gia đình khá giả thời xưa.',
      frontText: 'In the old days, rich parents hired a female __________ to teach their young daughters at home.',
      context: '...and they travelled extensively with their governess, Jane Blaker, visiting art galleries...',
      exampleEn: 'In the old days, rich parents hired a female governess to teach their young daughters at home.',
      acceptedAnswers: ['governess', 'governesses'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-62',
      category: 'words',
      english: 'coincide',
      ipa: '/ˌkəʊ.ɪnˈsaɪd/ (v - B2)',
      vietnamese: 'Trùng hợp, diễn ra cùng một thời điểm với sự việc khác.',
      frontText: 'My birthday will __________ with the first day of the school holidays this year.',
      context: 'The sisters began to make regular art purchases from 1908, which roughly coincided with the dates of their inheritance.',
      exampleEn: 'My birthday will coincide with the first day of the school holidays this year.',
      acceptedAnswers: ['coincide', 'coincided'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-63',
      category: 'words',
      english: 'retain',
      ipa: '/rɪˈteɪn/ (v - B2)',
      vietnamese: 'Giữ lại, duy trì (quyền kiểm soát, vai trò, vị trí hoặc ký ức).',
      frontText: 'Although she was very busy, the manager wanted to __________ control over all money decisions.',
      context: '...it has recently been accepted that Gwendoline and Margaret retained a far more active role in the process.',
      exampleEn: 'Although she was very busy, the manager wanted to retain control over all money decisions.',
      acceptedAnswers: ['retain', 'retained'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-64',
      category: 'words',
      english: 'preference',
      ipa: '/ˈpref.ər.əns/ (n - B2)',
      vietnamese: 'Sự yêu thích, ưu tiên thích cái gì hơn cái khác.',
      frontText: 'I have a strong __________ for hot tea rather than cold coffee on rainy mornings.',
      context: 'The sisters\' journals reveal their preference for Old Master paintings.',
      exampleEn: 'I have a strong preference for hot tea rather than cold coffee on rainy mornings.',
      acceptedAnswers: ['preference', 'preferences'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-65',
      category: 'words',
      english: 'secure',
      ipa: '/sɪˈkjʊər/ (v - B2)',
      vietnamese: 'Giành được, có được hoặc mua được thứ gì đó quý hiếm, khó đạt được.',
      frontText: 'Thousands of excited fans tried their best to __________ a ticket to the final match.',
      context: 'Yet they initially made very few attempts to secure any such works.',
      exampleEn: 'Thousands of excited fans tried their best to secure a ticket to the final match.',
      acceptedAnswers: ['secure', 'secured'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-66',
      category: 'words',
      english: 'champion',
      ipa: '/ˈtʃæm.pi.ən/ (n - C1)',
      vietnamese: 'Người nhiệt thành ủng hộ, bảo vệ và cổ vũ cho một ý tưởng hay phong trào.',
      frontText: 'The local doctor has always been a strong __________ of healthy food and clean water for children.',
      context: 'We know that Hugh Blaker, as a champion of contemporary French art had a hand in the decision...',
      exampleEn: 'The local doctor has always been a strong champion of healthy food and clean water for children.',
      acceptedAnswers: ['champion', 'champions'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-67',
      category: 'words',
      english: 'contemporary',
      ipa: '/kənˈtem.pər.ər.i/ (adj - B2)',
      vietnamese: 'Đương đại, hiện đại cùng thời.',
      frontText: 'The modern museum shows both old history paintings and __________ art by living artists.',
      context: 'We know that Hugh Blaker, as a champion of contemporary French art had a hand in the decision...',
      exampleEn: 'The modern museum shows both old history paintings and contemporary art by living artists.',
      acceptedAnswers: ['contemporary'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-68',
      category: 'words',
      english: 'precise',
      ipa: '/prɪˈsaɪs/ (adj - B2)',
      vietnamese: 'Chính xác, cụ thể và rõ ràng từng chi tiết.',
      frontText: 'Could you tell me the __________ time when the bus will reach the station?',
      context: 'Whatever the precise reason for this change, their first purchases of Impressionist art, made in October 1912, were scenes of Venice...',
      exampleEn: 'Could you tell me the precise time when the bus will reach the station?',
      acceptedAnswers: ['precise'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-69',
      category: 'words',
      english: 'finance',
      ipa: '/ˈfaɪ.næns/ (v - B2)',
      vietnamese: 'Tài trợ, chu cấp kinh phí tiền của cho một công trình hoặc dự án.',
      frontText: 'The city government agreed to __________ the building of a free public library for students.',
      context: 'Their initial response to the war effort was to finance the safe passage of artists from occupied Belgium to Wales...',
      exampleEn: 'The city government agreed to finance the building of a free public library for students.',
      acceptedAnswers: ['finance', 'financed'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-70',
      category: 'words',
      english: 'occupied',
      ipa: '/ˈɒk.jə.paɪd/ (adj - B2)',
      vietnamese: 'Bị quân đội nước ngoài chiếm đóng, kiểm soát trong thời chiến.',
      frontText: 'Families living in the __________ town had to obey strict rules set by enemy soldiers.',
      context: '...to finance the safe passage of artists from occupied Belgium to Wales...',
      exampleEn: 'Families living in the occupied town had to obey strict rules set by enemy soldiers.',
      acceptedAnswers: ['occupied'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-71',
      category: 'words',
      english: 'humanitarian',
      ipa: '/hjuːˌmæn.ɪˈteə.ri.ən/ (adj - C1)',
      vietnamese: 'Mang tính nhân đạo, vì lòng thương xót và cứu trợ con người khi hoạn nạn.',
      frontText: 'Doctors and nurses travelled to the war zone on an important __________ mission to save injured people.',
      context: '...to finance the safe passage of artists from occupied Belgium to Wales, as a humanitarian act...',
      exampleEn: 'Doctors and nurses travelled to the war zone on an important humanitarian mission to save injured people.',
      acceptedAnswers: ['humanitarian'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-72',
      category: 'words',
      english: 'vibrant',
      ipa: '/ˈvaɪ.brənt/ (adj - B2)',
      vietnamese: 'Sôi động, náo nhiệt, đầy màu sắc và tràn trề nhựa sống.',
      frontText: 'The town center at night was colourful and __________ with lively music and happy crowds.',
      context: '...with the hope of establishing a vibrant artists\' community in the area.',
      exampleEn: 'The town center at night was colourful and vibrant with lively music and happy crowds.',
      acceptedAnswers: ['vibrant'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-73',
      category: 'words',
      english: 'conflict',
      ipa: '/ˈkɒn.flɪkt/ (n - B2)',
      vietnamese: 'Cuộc xung đột, chiến tranh vũ trang hoặc mối mâu thuẫn sâu sắc.',
      frontText: 'Many innocent families had to leave their village because of the dangerous armed __________ in the country.',
      context: 'Later in the conflict, both sisters decided to volunteer at a canteen for troops at Troyes, in northern France...',
      exampleEn: 'Many innocent families had to leave their village because of the dangerous armed conflict in the country.',
      acceptedAnswers: ['conflict', 'conflicts'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-74',
      category: 'words',
      english: 'tedious',
      ipa: '/ˈtiː.di.əs/ (adj - C1)',
      vietnamese: 'Buồn tẻ, chán ngắt và mệt óc vì kéo dài lặp đi lặp lại.',
      frontText: 'Checking thousands of long numbers on paper by hand is very slow and __________ work.',
      context: 'It was tedious and distressing work, which would have a permanent effect on Gwendoline\'s health.',
      exampleEn: 'Checking thousands of long numbers on paper by hand is very slow and tedious work.',
      acceptedAnswers: ['tedious'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-75',
      category: 'words',
      english: 'distressing',
      ipa: '/dɪˈstres.ɪŋ/ (adj - C1)',
      vietnamese: 'Đau lòng, gây khổ sở, đau buồn hoặc lo lắng cực độ.',
      frontText: 'Hearing the sad news about the burning houses was extremely __________ to everyone in the room.',
      context: 'It was tedious and distressing work, which would have a permanent effect on Gwendoline\'s health.',
      exampleEn: 'Hearing the sad news about the burning houses was extremely distressing to everyone in the room.',
      acceptedAnswers: ['distressing'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-76',
      category: 'words',
      english: 'permanent',
      ipa: '/ˈpɜː.mə.nənt/ (adj - B2)',
      vietnamese: 'Lâu dài, vĩnh viễn, cố định không đổi theo thời gian.',
      frontText: 'Smoking cigarettes every day can cause __________ damage to your lungs that medicine cannot repair.',
      context: '...which would have a permanent effect on Gwendoline\'s health.',
      exampleEn: 'Smoking cigarettes every day can cause permanent damage to your lungs that medicine cannot repair.',
      acceptedAnswers: ['permanent'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-77',
      category: 'words',
      english: 'acquire',
      ipa: '/əˈkwaɪər/ (v - B2)',
      vietnamese: 'Thu nhận được, mua được (tài sản quý giá hoặc kỹ năng mới).',
      frontText: 'With the money he earned from his job, he was able to __________ a small coffee shop in town.',
      context: 'Here she acquired two works by Cézanne - Provençal Landscape and The François Zola Dam.',
      exampleEn: 'With the money he earned from his job, he was able to acquire a small coffee shop in town.',
      acceptedAnswers: ['acquire', 'acquired'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-78',
      category: 'words',
      english: 'commentator',
      ipa: '/ˈkɒm.ən.teɪ.tər/ (n - B2)',
      vietnamese: 'Nhà bình luận, người phân tích và bình phẩm về tin tức, thời sự hay thể thao.',
      frontText: 'During the football match on television, the sports __________ described every play with excitement.',
      context: 'Commentators have often described the sisters as unlikely pioneer collectors.',
      exampleEn: 'During the football match on television, the sports commentator described every play with excitement.',
      acceptedAnswers: ['commentator', 'commentators'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-79',
      category: 'words',
      english: 'unlikely',
      ipa: '/ʌnˈlaɪ.kli/ (adj - B2)',
      vietnamese: 'Không ngờ tới, khó tin nhưng có thật; ít có khả năng xảy ra.',
      frontText: 'The shy little boy was the most __________ student to win the race, but he won first prize.',
      context: 'Commentators have often described the sisters as unlikely pioneer collectors.',
      exampleEn: 'The shy little boy was the most unlikely student to win the race, but he won first prize.',
      acceptedAnswers: ['unlikely'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-80',
      category: 'words',
      english: 'pioneer',
      ipa: '/ˌpaɪəˈnɪər/ (n - B2)',
      vietnamese: 'Người tiên phong, người đi đầu khai phá một lĩnh vực mới.',
      frontText: 'Marie Curie was a great scientific __________ who discovered new elements that changed modern medicine.',
      context: 'Commentators have often described the sisters as unlikely pioneer collectors.',
      exampleEn: 'Marie Curie was a great scientific pioneer who discovered new elements that changed modern medicine.',
      acceptedAnswers: ['pioneer', 'pioneers'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-81',
      category: 'words',
      english: 'isolation',
      ipa: '/ˌaɪ.səlˈeɪ.ʃən/ (n - B2)',
      vietnamese: 'Sự cô lập, tình trạng sống tách biệt xa cách khỏi mọi người.',
      frontText: 'Living in complete __________ on an empty mountain made the old monk feel peaceful.',
      context: 'Much is made of their isolation in rural Wales and the fact that they didn\'t make friends with artists or gallery owners.',
      exampleEn: 'Living in complete isolation on an empty mountain made the old monk feel peaceful.',
      acceptedAnswers: ['isolation'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-82',
      category: 'words',
      english: 'upheaval',
      ipa: '/ʌpˈhiː.vəl/ (n - C1)',
      vietnamese: 'Sự biến động dữ dội, xáo trộn to lớn làm xáo trộn cuộc sống bình thường.',
      frontText: 'The sudden closing of the factory brought great economic __________ and panic to the small town.',
      context: '...when faced with the poverty and social upheaval created by the First World War.',
      exampleEn: 'The sudden closing of the factory brought great economic upheaval and panic to the small town.',
      acceptedAnswers: ['upheaval', 'upheavals'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-83',
      category: 'words',
      english: 'exclusively',
      ipa: '/ɪkˈskluː.sɪv.li/ (adv - B2)',
      vietnamese: 'Dành riêng, hoàn toàn chỉ duy nhất cho một mục đích hoặc đối tượng.',
      frontText: 'This warm swimming pool is used __________ by young kids and their parents on Sunday mornings.',
      context: 'Her philanthropic pursuits then became focused almost exclusively on social causes...',
      exampleEn: 'This warm swimming pool is used exclusively by young kids and their parents on Sunday mornings.',
      acceptedAnswers: ['exclusively'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-84',
      category: 'words',
      english: 'venue',
      ipa: '/ˈven.juː/ (n - B2)',
      vietnamese: 'Địa điểm diễn ra sự kiện, buổi hòa nhạc, hội nghị hoặc thi đấu.',
      frontText: 'The large central theatre was the chosen __________ for the international piano concert.',
      context: '...into a conference center and venue for the Gregynog Festival of Music and Poetry.',
      exampleEn: 'The large central theatre was the chosen venue for the international piano concert.',
      acceptedAnswers: ['venue', 'venues'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-85',
      category: 'words',
      english: 'routinely',
      ipa: '/ruːˈtiːn.li/ (adv - B2)',
      vietnamese: 'Một cách thường lệ, đều đặn như thói quen hằng ngày.',
      frontText: 'The school nurse __________ washes her hands and checks the health of each student every morning.',
      context: 'The sisters collected French Impressionist paintings at a time when such art was routinely ignored by individuals and institutions alike.',
      exampleEn: 'The school nurse routinely washes her hands and checks the health of each student every morning.',
      acceptedAnswers: ['routinely'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-86',
      category: 'words',
      english: 'respectively',
      ipa: '/rɪˈspek.tɪv.li/ (adv - B2)',
      vietnamese: 'Theo thứ tự lần lượt tương ứng với từng đối tượng vừa nhắc.',
      frontText: 'Paul and Lisa scored 80 and 95 points __________, meaning Paul got 80 and Lisa got 95.',
      context: 'The Gwendoline and Margaret Davies collection, donated in 1951 and 1963 respectively to the National Museum Wales...',
      exampleEn: 'Paul and Lisa scored 80 and 95 points respectively, meaning Paul got 80 and Lisa got 95.',
      acceptedAnswers: ['respectively'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-87',
      category: 'words',
      english: 'lasting',
      ipa: '/ˈlɑː.stɪŋ/ (adj - B2)',
      vietnamese: 'Lâu dài, trường tồn, có giá trị hoặc ảnh hưởng bền bỉ qua năm tháng.',
      frontText: 'The kindness of the doctor made a deep and __________ impression on the little patient.',
      context: 'In collecting paintings that they loved, the sisters created a lasting and meaningful cultural legacy for the people of Wales and beyond.',
      exampleEn: 'The kindness of the doctor made a deep and lasting impression on the little patient.',
      acceptedAnswers: ['lasting'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-88',
      category: 'words',
      english: 'legacy',
      ipa: '/ˈleɡ.ə.si/ (n - C1)',
      vietnamese: 'Di sản để lại cho thế hệ sau (văn hóa, tinh thần, thành tựu cuộc đời).',
      frontText: 'The old king died, but his great wisdom and peaceful laws left an enduring __________ for his people.',
      context: '...the sisters created a lasting and meaningful cultural legacy for the people of Wales and beyond.',
      exampleEn: 'The old king died, but his great wisdom and peaceful laws left an enduring legacy for his people.',
      acceptedAnswers: ['legacy', 'legacies'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },

    // =========================================================================
    // BÀI ĐỌC 2: THE DAVIES SISTERS & FRENCH IMPRESSIONISM
    // PHẦN 2: COLLOCATIONS & PHRASES (Cụm Từ B2+ - Cards 89 đến 106)
    // =========================================================================
    {
      id: 'card-89',
      category: 'collocations',
      english: 'amass a fortune',
      ipa: '(collocation - C1)',
      vietnamese: 'Tích lũy một khối tài sản / gia tài khổng lồ.',
      frontText: 'By inventing and selling useful computer software, the young engineer was able to __________ in just five years.',
      context: '...David Davies, a Welshman who amassed a fortune in the shipping and mining industries.',
      exampleEn: 'By inventing and selling useful computer software, the young engineer was able to amass a fortune in just five years.',
      acceptedAnswers: ['amass a fortune', 'amassed a fortune'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-90',
      category: 'collocations',
      english: 'come into',
      ipa: '(phrasal verb - B2)',
      vietnamese: 'Thừa hưởng, được nhận (khoản tiền hoặc tài sản lớn do người thân qua đời để lại).',
      frontText: 'When his grandfather died peacefully, Mark __________ a large sum of money and a family farm.',
      context: 'In 1907, when Gwendoline came into her inheritance (Margaret would follow in 1909)...',
      exampleEn: 'When his grandfather died peacefully, Mark came into a large sum of money and a family farm.',
      acceptedAnswers: ['come into', 'came into'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-91',
      category: 'collocations',
      english: 'social responsibility',
      ipa: '(collocation - B2)',
      vietnamese: 'Trách nhiệm xã hội (bổn phận đạo đức của cá nhân hay tổ chức đóng góp cho cộng đồng).',
      frontText: 'Big businesses have a clear __________ to reduce plastic waste and protect nature.',
      context: 'Their religious upbringing in rural Wales gave them a deep sense of social responsibility...',
      exampleEn: 'Big businesses have a clear social responsibility to reduce plastic waste and protect nature.',
      acceptedAnswers: ['social responsibility'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-92',
      category: 'collocations',
      english: 'gear toward',
      ipa: '(verb phrase - B2)',
      vietnamese: 'Định hướng, thiết kế phù hợp cho một mục tiêu hay đối tượng nhất định.',
      frontText: 'This easy grammar book is specifically __________ helping beginners learn English step by step.',
      context: '...the sisters\' education was rigorously geared toward such pursuits.',
      exampleEn: 'This easy grammar book is specifically geared toward helping beginners learn English step by step.',
      acceptedAnswers: ['gear toward', 'geared toward', 'geared towards', 'gear towards'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-93',
      category: 'collocations',
      english: 'retain an active role',
      ipa: '(collocation - B2)',
      vietnamese: 'Duy trì vai trò chủ động, tích cực tham gia vào một tiến trình.',
      frontText: 'Even after retiring from work, the teacher continued to __________ in organizing community events.',
      context: '...it has recently been accepted that Gwendoline and Margaret retained a far more active role in the process.',
      exampleEn: 'Even after retiring from work, the teacher continued to retain an active role in organizing community events.',
      acceptedAnswers: ['retain an active role', 'retained an active role', 'active role'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-94',
      category: 'collocations',
      english: 'in relative terms',
      ipa: '(phrase - C1)',
      vietnamese: 'Xét về mặt tương đối (so sánh trong mối tương quan với các yếu tố khác).',
      frontText: 'Living in a small town is quite cheap __________, especially when you compare it to a huge capital city.',
      context: 'While the sisters were wealthy in relative terms, their income was nothing compared to the fortunes of American art collectors...',
      exampleEn: 'Living in a small town is quite cheap in relative terms, especially when you compare it to a huge capital city.',
      acceptedAnswers: ['in relative terms', 'relative terms'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-95',
      category: 'collocations',
      english: 'nothing compared to',
      ipa: '(phrase - B2)',
      vietnamese: 'Không thấm vào đâu / chẳng là gì khi so với cái gì khác.',
      frontText: 'My small garden is __________ the giant national park that surrounds the mountain.',
      context: '...their income was nothing compared to the fortunes of American art collectors of this period...',
      exampleEn: 'My small garden is nothing compared to the giant national park that surrounds the mountain.',
      acceptedAnswers: ['nothing compared to'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-96',
      category: 'collocations',
      english: 'beyond one\'s means',
      ipa: '(idiom - B2)',
      vietnamese: 'Vượt quá khả năng tài chính / đắt đỏ hơn số tiền ai đó có thể kiếm được.',
      frontText: 'Buying that luxury sports car is totally __________ because I only have a low monthly salary.',
      context: 'Quite simply, high quality Old Master works were, if not beyond their means, then beyond what they were willing to pay for them.',
      exampleEn: 'Buying that luxury sports car is totally beyond my means because I only have a low monthly salary.',
      acceptedAnswers: ['beyond one\'s means', 'beyond ones means', 'beyond my means', 'beyond their means', 'beyond her means', 'beyond his means'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-97',
      category: 'collocations',
      english: 'turn to',
      ipa: '(phrasal verb - B2)',
      vietnamese: 'Chuyển sang quan tâm hoặc tìm đến (một hoạt động, lĩnh vực mới).',
      frontText: 'When she stopped playing professional tennis, she __________ painting and wrote books.',
      context: '...their collecting took a new direction and they turned to the work of the French Impressionists.',
      exampleEn: 'When she stopped playing professional tennis, she turned to painting and wrote books.',
      acceptedAnswers: ['turn to', 'turned to'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-98',
      category: 'collocations',
      english: 'have a hand in',
      ipa: '(idiom - B2)',
      vietnamese: 'Có can dự vào, góp phần tạo nên (một kết quả, quyết định nào đó).',
      frontText: 'We all know that the friendly teacher __________ organizing the wonderful surprise celebration.',
      context: 'We know that Hugh Blaker, as a champion of contemporary French art had a hand in the decision...',
      exampleEn: 'We all know that the friendly teacher had a hand in organizing the wonderful surprise celebration.',
      acceptedAnswers: ['have a hand in', 'had a hand in', 'hand in'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-99',
      category: 'collocations',
      english: 'the bulk of',
      ipa: '(phrase - C1)',
      vietnamese: 'Phần lớn nhất, đa số hoặc số lượng chủ yếu của cái gì.',
      frontText: 'The student spends __________ his pocket money on buying exciting mystery books.',
      context: 'Over the next 12 years, the sisters amassed the bulk of their Impressionist collection...',
      exampleEn: 'The student spends the bulk of his pocket money on buying exciting mystery books.',
      acceptedAnswers: ['the bulk of', 'bulk of', 'bulk'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-100',
      category: 'collocations',
      english: 'safe passage',
      ipa: '(collocation - C1)',
      vietnamese: 'Sự đi lại an toàn (vượt qua vùng chiến sự nguy hiểm mà không bị tấn công hay bắt giữ).',
      frontText: 'The police officers guided the lost travelers to give them __________ through the dark forest.',
      context: 'Their initial response to the war effort was to finance the safe passage of artists from occupied Belgium to Wales...',
      exampleEn: 'The police officers guided the lost travelers to give them safe passage through the dark forest.',
      acceptedAnswers: ['safe passage'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-101',
      category: 'collocations',
      english: 'go on display',
      ipa: '(collocation - B2)',
      vietnamese: 'Được đưa ra trưng bày, triển lãm cho công chúng chiêm ngưỡng.',
      frontText: 'The ancient golden necklace will __________ at the city museum starting tomorrow morning.',
      context: '...where they became the first works by Cézanne to go on display in a public gallery in Britain.',
      exampleEn: 'The ancient golden necklace will go on display at the city museum starting tomorrow morning.',
      acceptedAnswers: ['go on display', 'went on display', 'on display'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-102',
      category: 'collocations',
      english: 'feel obliged to',
      ipa: '(phrase - B2)',
      vietnamese: 'Cảm thấy có bổn phận hoặc bị ép buộc phải làm điều gì đó.',
      frontText: 'Since my kind neighbor cooked dinner for me, I __________ help him paint his garden fence.',
      context: 'Yet they didn\'t feel obliged to follow fashionable tastes and were free to pursue their own preferences.',
      exampleEn: 'Since my kind neighbor cooked dinner for me, I feel obliged to help him paint his garden fence.',
      acceptedAnswers: ['feel obliged to', 'felt obliged to', 'obliged to'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-103',
      category: 'collocations',
      english: 'social upheaval',
      ipa: '(collocation - C1)',
      vietnamese: 'Sự biến động / xáo trộn xã hội to lớn và sâu sắc.',
      frontText: 'The sudden rise in prices caused intense __________ that changed daily life for thousands of families.',
      context: '...when faced with the poverty and social upheaval created by the First World War.',
      exampleEn: 'The sudden rise in prices caused intense social upheaval that changed daily life for thousands of families.',
      acceptedAnswers: ['social upheaval'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-104',
      category: 'collocations',
      english: 'social causes',
      ipa: '(collocation - B2)',
      vietnamese: 'Các mục tiêu vì cộng đồng, sự nghiệp từ thiện hoặc công ích xã hội.',
      frontText: 'The rich singer donates money to many __________ such as building schools and feeding hungry children.',
      context: 'Her philanthropic pursuits then became focused almost exclusively on social causes...',
      exampleEn: 'The rich singer donates money to many social causes such as building schools and feeding hungry children.',
      acceptedAnswers: ['social causes', 'social cause'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-105',
      category: 'collocations',
      english: 'on a small scale',
      ipa: '(phrase - B2)',
      vietnamese: 'Ở quy mô nhỏ, phạm vi hạn chế.',
      frontText: 'He began selling fresh vegetables __________ from his garden before opening a big supermarket.',
      context: '...started again in the 1930s acquiring, on a relatively small scale, work by contemporary British artists.',
      exampleEn: 'He began selling fresh vegetables on a small scale from his garden before opening a big supermarket.',
      acceptedAnswers: ['on a small scale', 'small scale', 'on a relatively small scale'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-106',
      category: 'collocations',
      english: 'for consideration',
      ipa: '(phrase - B2)',
      vietnamese: 'Để xem xét, nghiên cứu cân nhắc trước khi quyết định.',
      frontText: 'The architect sent three house plans to the committee __________ before building started.',
      context: '...and also regularly had paintings sent to their home for consideration.',
      exampleEn: 'The architect sent three house plans to the committee for consideration before building started.',
      acceptedAnswers: ['for consideration'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    }
  ];

  // --- STATE ---
  const state = {
    cards: [],
    selectedCategory: null, // 'words' | 'collocations'
    currentFilter: 'all',   // 'all' | 'due' | '1' | '4' | '7' | '14'
    studyMode: 'flip',      // 'flip' | 'type'
    currentIndex: 0,
    isFlipped: false,
    filteredCards: [],
    typingState: {
      hintRevealedCount: 0,
      hasSubmitted: false
    }
  };

  // --- DOM ELEMENTS ---
  const el = {
    selectionOverlay: document.getElementById('selection-overlay'),
    btnSelectWords: document.getElementById('btn-select-words'),
    btnSelectCollocations: document.getElementById('btn-select-collocations'),
    wordsPreviewCount: document.getElementById('words-preview-count'),
    collocationsPreviewCount: document.getElementById('collocations-preview-count'),
    
    // Header
    btnChangeCategory: document.getElementById('btn-change-category'),
    currentCatName: document.getElementById('current-cat-name'),
    spacedDueBadge: document.getElementById('spaced-due-badge'),
    dueCountText: document.getElementById('due-count-text'),
    modeFlipBtn: document.getElementById('mode-flip-btn'),
    modeTypeBtn: document.getElementById('mode-type-btn'),
    btnOpenList: document.getElementById('btn-open-list'),
    btnAddCard: document.getElementById('btn-add-card'),
    btnToggleTheme: document.getElementById('btn-toggle-theme'),

    // Interval Filter
    intervalChips: document.querySelectorAll('.interval-chip'),
    countAll: document.getElementById('count-all'),
    countDue: document.getElementById('count-due'),
    count1: document.getElementById('count-1'),
    count4: document.getElementById('count-4'),
    count7: document.getElementById('count-7'),
    count14: document.getElementById('count-14'),

    // Study Area
    studyArea: document.getElementById('study-area'),
    studyProgressFill: document.getElementById('study-progress-fill'),
    cardPositionText: document.getElementById('card-position-text'),
    currentBoxTag: document.getElementById('current-box-tag'),
    currentBoxText: document.getElementById('current-box-text'),

    // Flip Card Scene
    cardScene: document.getElementById('card-scene'),
    flashcardElement: document.getElementById('flashcard-element'),
    frontPromptLabel: document.getElementById('front-prompt-label'),
    frontTypeChip: document.getElementById('front-type-chip'),
    frontVietnamese: document.getElementById('front-vietnamese'),
    frontContextHint: document.getElementById('front-context-hint'),
    backTypeChip: document.getElementById('back-type-chip'),
    backEnglish: document.getElementById('back-english'),
    backIpa: document.getElementById('back-ipa'),
    backMeaning: document.getElementById('back-meaning'),
    backExampleWrapper: document.getElementById('back-example-wrapper'),
    backExampleEn: document.getElementById('back-example-en'),
    backExampleVi: document.getElementById('back-example-vi'),
    backNextReviewInfo: document.getElementById('back-next-review-info'),
    btnAudioSpeak: document.getElementById('btn-audio-speak'),

    // Typing Interactive
    typeInteractivePanel: document.getElementById('type-interactive-panel'),
    typeBadgeCategory: document.getElementById('type-badge-category'),
    typePromptMeaning: document.getElementById('type-prompt-meaning'),
    typeClozeHint: document.getElementById('type-cloze-hint'),
    typeForm: document.getElementById('type-form'),
    userTypedInput: document.getElementById('user-typed-input'),
    btnSubmitAnswer: document.getElementById('btn-submit-answer'),
    typeFeedbackBanner: document.getElementById('type-feedback-banner'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackStatusText: document.getElementById('feedback-status-text'),
    feedbackCorrectWord: document.getElementById('feedback-correct-word'),
    btnAudioType: document.getElementById('btn-audio-type'),
    btnHintLetter: document.getElementById('btn-hint-letter'),
    btnRevealSolution: document.getElementById('btn-reveal-solution'),

    // Controls
    controlsToolbar: document.getElementById('controls-toolbar'),
    btnPrevCard: document.getElementById('btn-prev-card'),
    btnNextCard: document.getElementById('btn-next-card'),
    btnRateAgain: document.getElementById('btn-rate-again'),
    btnRateGood: document.getElementById('btn-rate-good'),
    btnAdvanceIntervalLabel: document.getElementById('btn-advance-interval-label'),

    // Empty state
    emptyStateView: document.getElementById('empty-state-view'),
    emptyDescText: document.getElementById('empty-desc-text'),
    btnResetFilter: document.getElementById('btn-reset-filter'),
    btnEmptyAdd: document.getElementById('btn-empty-add'),

    // Modals
    modalCardForm: document.getElementById('modal-card-form'),
    modalCardTitle: document.getElementById('modal-card-title'),
    cardEditorForm: document.getElementById('card-editor-form'),
    editCardId: document.getElementById('edit-card-id'),
    cardInputCategory: document.getElementById('card-input-category'),
    cardInputEnglish: document.getElementById('card-input-english'),
    cardInputIpa: document.getElementById('card-input-ipa'),
    cardInputVietnamese: document.getElementById('card-input-vietnamese'),
    cardInputExampleEn: document.getElementById('card-input-example-en'),
    cardInputExampleVi: document.getElementById('card-input-example-vi'),
    cardInputInterval: document.getElementById('card-input-interval'),
    btnCloseCardModal: document.getElementById('btn-close-card-modal'),
    btnCancelCardModal: document.getElementById('btn-cancel-card-modal'),

    modalManageCards: document.getElementById('modal-manage-cards'),
    btnCloseManageModal: document.getElementById('btn-close-manage-modal'),
    btnCloseManageBottom: document.getElementById('btn-close-manage-bottom'),
    manageSearchInput: document.getElementById('manage-search-input'),
    manageTableBody: document.getElementById('manage-table-body'),
    manageTotalStatus: document.getElementById('manage-total-status'),
    btnExportJson: document.getElementById('btn-export-json'),
    fileImportJson: document.getElementById('file-import-json'),
    btnResetDefaultData: document.getElementById('btn-reset-default-data'),

    toastContainer: document.getElementById('toast-container')
  };

  // --- STORAGE HELPERS (v4 with Davies Sisters reading cards auto-merge) ---
  const STORAGE_KEY = 'minimal_flashcards_data_v4';
  const PREF_KEY = 'minimal_flashcards_pref_v1';

  function loadCardsFromStorage() {
    try {
      let stored = localStorage.getItem(STORAGE_KEY);
      // Auto-migrate from v3 if present
      if (!stored) {
        const oldStored = localStorage.getItem('minimal_flashcards_data_v3');
        if (oldStored) stored = oldStored;
      }

      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge missing default cards seamlessly so new cards are added automatically
          const existingIds = new Set(parsed.map(c => c.id));
          let hasNew = false;
          DEFAULT_CARDS.forEach(card => {
            if (!existingIds.has(card.id)) {
              parsed.push(JSON.parse(JSON.stringify(card)));
              hasNew = true;
            }
          });
          if (hasNew) {
            saveCardsToStorage(parsed);
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu từ localStorage', e);
    }
    saveCardsToStorage(DEFAULT_CARDS);
    return JSON.parse(JSON.stringify(DEFAULT_CARDS));
  }

  function saveCardsToStorage(cards) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Không thể lưu vào localStorage', e);
      showToast('Bộ nhớ trình duyệt đầy hoặc không thể lưu');
    }
  }

  function loadUserPreferences() {
    try {
      const pref = localStorage.getItem(PREF_KEY);
      if (pref) return JSON.parse(pref);
    } catch (e) {}
    return { category: null, theme: 'light', studyMode: 'flip' };
  }

  function saveUserPreferences(prefs) {
    try {
      const current = loadUserPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(PREF_KEY, JSON.stringify(updated));
    } catch (e) {}
  }

  // --- TOAST NOTIFICATION ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  // --- SOUND / TTS SYNTHESIS ---
  function speakEnglish(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ phát âm TTS');
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[\(\)\[\]\/]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (enVoice) utterance.voice = enVoice;

    window.speechSynthesis.speak(utterance);
  }

  // --- INITIALIZATION ---
  function init() {
    state.cards = loadCardsFromStorage();
    const prefs = loadUserPreferences();

    if (prefs.theme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    if (prefs.studyMode === 'type') {
      setStudyMode('type', false);
    } else {
      setStudyMode('flip', false);
    }

    updateCategoryCountsPreview();

    if (prefs.category && (prefs.category === 'words' || prefs.category === 'collocations')) {
      selectCategory(prefs.category, false);
      el.selectionOverlay.style.display = 'none';
    } else {
      el.selectionOverlay.style.display = 'flex';
    }

    bindEvents();
  }

  // --- CATEGORY COUNTS PREVIEW ---
  function updateCategoryCountsPreview() {
    const wordsCount = state.cards.filter(c => c.category === 'words').length;
    const collocationsCount = state.cards.filter(c => c.category === 'collocations').length;
    el.wordsPreviewCount.textContent = `${wordsCount} từ`;
    el.collocationsPreviewCount.textContent = `${collocationsCount} cụm`;
  }

  // --- CATEGORY SELECTION ---
  function selectCategory(categoryKey, savePref = true) {
    state.selectedCategory = categoryKey;
    el.selectionOverlay.style.display = 'none';

    if (categoryKey === 'words') {
      el.currentCatName.textContent = 'Words';
    } else {
      el.currentCatName.textContent = 'Collocations';
    }

    if (savePref) {
      saveUserPreferences({ category: categoryKey });
    }

    state.currentFilter = 'all';
    state.currentIndex = 0;
    updateIntervalNavChips();
    filterAndRenderCards();
  }

  // --- FILTERING CARDS ---
  function getFilteredCards() {
    if (!state.selectedCategory) return [];

    const now = Date.now();
    let list = state.cards.filter(c => c.category === state.selectedCategory);

    if (state.currentFilter === 'due') {
      list = list.filter(c => !c.nextReviewDate || c.nextReviewDate <= now);
    } else if (['1', '4', '7', '14'].includes(state.currentFilter)) {
      const intVal = parseInt(state.currentFilter, 10);
      list = list.filter(c => c.interval === intVal);
    }

    return list;
  }

  function updateIntervalBadgeCounts() {
    if (!state.selectedCategory) return;
    const now = Date.now();
    const catCards = state.cards.filter(c => c.category === state.selectedCategory);

    const countAll = catCards.length;
    const countDue = catCards.filter(c => !c.nextReviewDate || c.nextReviewDate <= now).length;
    const count1 = catCards.filter(c => c.interval === 1).length;
    const count4 = catCards.filter(c => c.interval === 4).length;
    const count7 = catCards.filter(c => c.interval === 7).length;
    const count14 = catCards.filter(c => c.interval === 14).length;

    el.countAll.textContent = countAll;
    el.countDue.textContent = countDue;
    el.count1.textContent = count1;
    el.count4.textContent = count4;
    el.count7.textContent = count7;
    el.count14.textContent = count14;

    el.dueCountText.textContent = `${countDue} cần ôn`;
    if (countDue > 0) {
      el.spacedDueBadge.style.color = 'var(--status-danger)';
    } else {
      el.spacedDueBadge.style.color = 'var(--text-secondary)';
    }
  }

  function updateIntervalNavChips() {
    el.intervalChips.forEach(chip => {
      if (chip.dataset.filter === state.currentFilter) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  function filterAndRenderCards() {
    state.filteredCards = getFilteredCards();
    updateIntervalBadgeCounts();

    if (state.currentIndex >= state.filteredCards.length) {
      state.currentIndex = Math.max(0, state.filteredCards.length - 1);
    }

    renderCurrentCard();
  }

  // --- RENDER CURRENT CARD ---
  function renderCurrentCard() {
    const list = state.filteredCards;
    const total = list.length;

    if (total === 0) {
      el.cardScene.style.display = 'none';
      el.typeInteractivePanel.style.display = 'none';
      el.controlsToolbar.style.display = 'none';
      el.emptyStateView.style.display = 'block';
      el.studyProgressFill.style.width = '0%';
      el.cardPositionText.textContent = '0 / 0';
      el.currentBoxTag.style.display = 'none';

      if (state.currentFilter === 'due') {
        el.emptyDescText.textContent = 'Tuyệt vời! Bạn đã hoàn thành toàn bộ thẻ đến hạn hôm nay. Hãy chọn "Tất cả" để ôn luyện thêm.';
      } else {
        el.emptyDescText.textContent = 'Chưa có thẻ nào trong bộ lọc này.';
      }
      return;
    }

    el.emptyStateView.style.display = 'none';
    el.controlsToolbar.style.display = 'flex';

    const card = list[state.currentIndex];
    const progressPercent = ((state.currentIndex + 1) / total) * 100;
    el.studyProgressFill.style.width = `${progressPercent}%`;
    el.cardPositionText.textContent = `Thẻ ${state.currentIndex + 1} / ${total}`;

    // Box Level Info
    el.currentBoxTag.style.display = 'inline-flex';
    el.currentBoxText.textContent = `Hộp ${card.interval} ngày`;

    // Next advance interval label
    const nextInterval = getNextInterval(card.interval);
    el.btnAdvanceIntervalLabel.textContent = `+${nextInterval} ngày`;

    // Render in Flip Mode
    renderFlipCard(card);

    // Render in Typing Mode
    renderTypeMode(card);

    if (state.studyMode === 'flip') {
      el.cardScene.style.display = 'block';
      el.typeInteractivePanel.style.display = 'none';
    } else {
      el.cardScene.style.display = 'none';
      el.typeInteractivePanel.style.display = 'block';
      setTimeout(() => el.userTypedInput.focus(), 80);
    }
  }

  function renderFlipCard(card) {
    state.isFlipped = false;
    el.flashcardElement.classList.remove('is-flipped');

    const catLabel = card.category === 'words' ? 'Word' : 'Collocation';
    el.frontTypeChip.textContent = catLabel;
    el.backTypeChip.textContent = catLabel;

    // FRONT: Displays the simple, clear A1/A2/B1 cloze sentence (No hints!)
    el.frontPromptLabel.textContent = 'ĐIỀN TỪ VÀO CHỖ TRỐNG (MẶT TRƯỚC)';
    el.frontVietnamese.textContent = card.frontText || card.vietnamese || '...';
    el.frontContextHint.textContent = ''; // Absolutely no hints

    // BACK: Displays the Target answer, IPA, Vietnamese meaning, and Reading passage context
    el.backEnglish.textContent = card.english || '';
    el.backIpa.textContent = card.ipa || '';
    el.backMeaning.innerHTML = `<strong>Ý nghĩa:</strong> ${card.vietnamese || ''}`;

    if (card.context || card.exampleEn) {
      el.backExampleWrapper.style.display = 'block';
      const labelElem = el.backExampleWrapper.querySelector('.example-label');
      if (labelElem) labelElem.textContent = 'NGỮ CẢNH TRONG BÀI ĐỌC';

      el.backExampleEn.textContent = card.context ? `"${card.context}"` : card.exampleEn;
      el.backExampleVi.textContent = card.exampleEn !== card.context ? `Câu mặt trước hoàn chỉnh: ${card.exampleEn}` : '';
    } else {
      el.backExampleWrapper.style.display = 'none';
    }

    const nextDays = getNextInterval(card.interval);
    el.backNextReviewInfo.innerHTML = `Chu kỳ tiếp theo nếu nhớ: <strong>+${nextDays} ngày</strong> (Hộp ${nextDays}d)`;
  }

  function renderTypeMode(card) {
    state.typingState = {
      hintRevealedCount: 0,
      hasSubmitted: false
    };

    el.typeBadgeCategory.textContent = card.category === 'words' ? 'Word Quiz' : 'Collocation Quiz';
    
    // In typing mode: display the clear A1-B1 sentence
    el.typePromptMeaning.textContent = card.frontText || card.vietnamese || '';
    el.typeClozeHint.style.display = 'none';

    el.userTypedInput.value = '';
    el.typeFeedbackBanner.style.display = 'none';
    el.typeFeedbackBanner.className = 'feedback-banner';
    el.btnSubmitAnswer.textContent = 'Kiểm tra';
  }

  // --- INTERVAL CALCULATOR ---
  function getNextInterval(currentInterval) {
    const idx = INTERVAL_LEVELS.indexOf(currentInterval);
    if (idx === -1 || idx >= INTERVAL_LEVELS.length - 1) {
      return INTERVAL_LEVELS[INTERVAL_LEVELS.length - 1]; // Max 14 days
    }
    return INTERVAL_LEVELS[idx + 1];
  }

  // --- SPACED REPETITION ACTION ---
  function handleRateCard(success) {
    const list = state.filteredCards;
    if (list.length === 0) return;

    const currentCard = list[state.currentIndex];
    const originalCard = state.cards.find(c => c.id === currentCard.id);
    if (!originalCard) return;

    const now = Date.now();

    if (success) {
      const newInterval = getNextInterval(originalCard.interval);
      originalCard.interval = newInterval;
      originalCard.boxLevel = INTERVAL_LEVELS.indexOf(newInterval) + 1;
      originalCard.nextReviewDate = now + (newInterval * MS_PER_DAY);
      originalCard.lastReviewed = now;
      showToast(`✨ Đã nhớ! Thẻ chuyển sang hộp +${newInterval} ngày.`);
    } else {
      originalCard.interval = 1;
      originalCard.boxLevel = 1;
      originalCard.nextReviewDate = now + (1 * MS_PER_DAY);
      originalCard.lastReviewed = now;
      showToast(`🔄 Chưa thuộc. Thẻ được xếp lại vào hộp 1 ngày.`);
    }

    saveCardsToStorage(state.cards);

    if (state.currentFilter === 'due' || state.currentFilter === '1' || state.currentFilter === '4' || state.currentFilter === '7' || state.currentFilter === '14') {
      filterAndRenderCards();
    } else {
      nextCard();
      updateIntervalBadgeCounts();
    }
  }

  // --- TYPING CHECK LOGIC ---
  function checkTypedAnswer() {
    const list = state.filteredCards;
    if (list.length === 0) return;
    const card = list[state.currentIndex];

    if (state.typingState.hasSubmitted) {
      handleRateCard(state.typingState.isCorrect);
      return;
    }

    const userInput = el.userTypedInput.value.trim();
    if (!userInput) {
      showToast('Hãy gõ câu trả lời của bạn trước khi kiểm tra');
      el.userTypedInput.focus();
      return;
    }

    const cleanUser = normalizeString(userInput);
    const targets = [card.english, ...(card.acceptedAnswers || [])].map(t => normalizeString(t));
    const isMatch = targets.includes(cleanUser);

    state.typingState.hasSubmitted = true;
    state.typingState.isCorrect = isMatch;

    el.typeFeedbackBanner.style.display = 'flex';

    if (isMatch) {
      el.typeFeedbackBanner.className = 'feedback-banner correct';
      el.feedbackIcon.textContent = '✓';
      el.feedbackStatusText.textContent = 'Chính xác!';
      el.feedbackCorrectWord.innerHTML = `Đáp án: <span>${card.english}</span> ${card.ipa ? `<em>${card.ipa}</em>` : ''}`;
      el.btnSubmitAnswer.textContent = 'Tiếp tục ➔';
      speakEnglish(card.english);
    } else {
      el.typeFeedbackBanner.className = 'feedback-banner incorrect';
      el.feedbackIcon.textContent = '✕';
      el.feedbackStatusText.textContent = 'Chưa chính xác!';
      el.feedbackCorrectWord.innerHTML = `Đáp án đúng: <span>${card.english}</span> ${card.ipa ? `<em>${card.ipa}</em>` : ''}`;
      el.btnSubmitAnswer.textContent = 'Tiếp tục ➔';
      speakEnglish(card.english);
    }
  }

  function normalizeString(str) {
    return str.toLowerCase()
      .replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()?'"’]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function revealLetterHint() {
    const list = state.filteredCards;
    if (list.length === 0) return;
    const card = list[state.currentIndex];
    
    state.typingState.hintRevealedCount++;
    const sub = card.english.slice(0, state.typingState.hintRevealedCount);
    el.userTypedInput.value = sub;
    el.userTypedInput.focus();
    showToast(`Chữ cái đầu: ${sub}...`);
  }

  function revealSolution() {
    const list = state.filteredCards;
    if (list.length === 0) return;
    const card = list[state.currentIndex];

    el.userTypedInput.value = card.english;
    checkTypedAnswer();
  }

  // --- NAVIGATION ---
  function prevCard() {
    if (state.filteredCards.length <= 1) return;
    state.currentIndex = (state.currentIndex - 1 + state.filteredCards.length) % state.filteredCards.length;
    renderCurrentCard();
  }

  function nextCard() {
    if (state.filteredCards.length <= 1) return;
    state.currentIndex = (state.currentIndex + 1) % state.filteredCards.length;
    renderCurrentCard();
  }

  function toggleFlipCard() {
    state.isFlipped = !state.isFlipped;
    if (state.isFlipped) {
      el.flashcardElement.classList.add('is-flipped');
      const card = state.filteredCards[state.currentIndex];
      if (card && card.english) {
        speakEnglish(card.english);
      }
    } else {
      el.flashcardElement.classList.remove('is-flipped');
    }
  }

  // --- STUDY MODE SWITCHER ---
  function setStudyMode(mode, save = true) {
    state.studyMode = mode;
    if (mode === 'flip') {
      el.modeFlipBtn.classList.add('active');
      el.modeTypeBtn.classList.remove('active');
    } else {
      el.modeTypeBtn.classList.add('active');
      el.modeFlipBtn.classList.remove('active');
    }
    if (save) {
      saveUserPreferences({ studyMode: mode });
    }
    renderCurrentCard();
  }

  // --- CARD CRUD & MODALS ---
  function openAddCardModal() {
    el.modalCardTitle.textContent = 'Thêm Flashcard Mới';
    el.editCardId.value = '';
    el.cardEditorForm.reset();
    el.cardInputCategory.value = state.selectedCategory || 'words';
    el.cardInputInterval.value = '1';
    el.modalCardForm.style.display = 'flex';
    setTimeout(() => el.cardInputEnglish.focus(), 100);
  }

  function openEditCardModal(cardId) {
    const card = state.cards.find(c => c.id === cardId);
    if (!card) return;

    el.modalCardTitle.textContent = 'Chỉnh Sửa Flashcard';
    el.editCardId.value = card.id;
    el.cardInputCategory.value = card.category;
    el.cardInputEnglish.value = card.english || '';
    el.cardInputIpa.value = card.ipa || '';
    el.cardInputVietnamese.value = card.vietnamese || '';
    el.cardInputExampleEn.value = card.frontText || card.exampleEn || '';
    el.cardInputExampleVi.value = card.context || '';
    el.cardInputInterval.value = card.interval ? String(card.interval) : '1';

    el.modalCardForm.style.display = 'flex';
  }

  function closeCardModal() {
    el.modalCardForm.style.display = 'none';
  }

  function handleSaveCardForm(e) {
    e.preventDefault();

    const id = el.editCardId.value;
    const category = el.cardInputCategory.value;
    const english = el.cardInputEnglish.value.trim();
    const ipa = el.cardInputIpa.value.trim();
    const vietnamese = el.cardInputVietnamese.value.trim();
    const exampleEn = el.cardInputExampleEn.value.trim();
    const exampleVi = el.cardInputExampleVi.value.trim();
    const interval = parseInt(el.cardInputInterval.value, 10) || 1;

    if (!english || !vietnamese) {
      showToast('Vui lòng điền đủ từ tiếng Anh và nghĩa tiếng Việt');
      return;
    }

    if (id) {
      const existing = state.cards.find(c => c.id === id);
      if (existing) {
        existing.category = category;
        existing.english = english;
        existing.ipa = ipa;
        existing.vietnamese = vietnamese;
        existing.frontText = exampleEn || existing.frontText;
        existing.exampleEn = exampleEn;
        existing.context = exampleVi;
        existing.interval = interval;
        existing.boxLevel = INTERVAL_LEVELS.indexOf(interval) + 1;
        showToast('Đã cập nhật flashcard');
      }
    } else {
      const newCard = {
        id: 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        category,
        english,
        ipa,
        vietnamese,
        frontText: exampleEn,
        exampleEn,
        context: exampleVi,
        acceptedAnswers: [english],
        interval,
        boxLevel: INTERVAL_LEVELS.indexOf(interval) + 1,
        nextReviewDate: Date.now(),
        createdDate: Date.now()
      };
      state.cards.unshift(newCard);
      showToast('Đã thêm thẻ flashcard mới');
    }

    saveCardsToStorage(state.cards);
    closeCardModal();
    updateCategoryCountsPreview();
    filterAndRenderCards();
    if (el.modalManageCards.style.display === 'flex') {
      renderManageTable();
    }
  }

  function deleteCard(cardId) {
    if (!confirm('Bạn có chắc chắn muốn xóa flashcard này không?')) return;
    state.cards = state.cards.filter(c => c.id !== cardId);
    saveCardsToStorage(state.cards);
    showToast('Đã xóa flashcard');
    updateCategoryCountsPreview();
    filterAndRenderCards();
    renderManageTable();
  }

  // --- MANAGE CARDS MODAL ---
  function openManageModal() {
    el.modalManageCards.style.display = 'flex';
    el.manageSearchInput.value = '';
    renderManageTable();
  }

  function closeManageModal() {
    el.modalManageCards.style.display = 'none';
  }

  function renderManageTable() {
    const q = el.manageSearchInput.value.toLowerCase().trim();
    let list = state.cards;

    if (q) {
      list = list.filter(c =>
        (c.english && c.english.toLowerCase().includes(q)) ||
        (c.vietnamese && c.vietnamese.toLowerCase().includes(q)) ||
        (c.frontText && c.frontText.toLowerCase().includes(q))
      );
    }

    el.manageTotalStatus.textContent = `Tổng cộng: ${list.length} thẻ`;

    if (list.length === 0) {
      el.manageTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-tertiary);">Không tìm thấy flashcard nào phù hợp.</td></tr>`;
      return;
    }

    const now = Date.now();
    el.manageTableBody.innerHTML = list.map(c => {
      const isDue = !c.nextReviewDate || c.nextReviewDate <= now;
      const dueLabel = isDue
        ? '<span style="color:var(--status-danger); font-weight:600;">Cần ôn ngay</span>'
        : `Còn ${Math.ceil((c.nextReviewDate - now) / MS_PER_DAY)} ngày`;

      return `
        <tr>
          <td><span class="card-type-chip">${c.category === 'words' ? 'Word' : 'Colloc'}</span></td>
          <td><strong>${c.english}</strong> ${c.ipa ? `<span style="font-size:0.8rem; color:var(--text-tertiary);">${c.ipa}</span>` : ''}</td>
          <td>${c.vietnamese}</td>
          <td><span class="pill-dot dot-${c.interval}"></span> ${c.interval} ngày</td>
          <td>${dueLabel}</td>
          <td class="text-right">
            <button type="button" class="action-btn-sm" title="Sửa" onclick="window.editCardHandler('${c.id}')">✏️</button>
            <button type="button" class="action-btn-sm delete" title="Xóa" onclick="window.deleteCardHandler('${c.id}')">🗑️</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.editCardHandler = (id) => openEditCardModal(id);
  window.deleteCardHandler = (id) => deleteCard(id);

  // --- EXPORT / IMPORT JSON ---
  function exportCardsJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.cards, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `flashcards_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Đã tải xuống file sao lưu JSON');
  }

  function importCardsJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported) && imported.length > 0) {
          state.cards = imported;
          saveCardsToStorage(state.cards);
          showToast(`Nhập thành công ${imported.length} thẻ flashcard!`);
          updateCategoryCountsPreview();
          filterAndRenderCards();
          renderManageTable();
        } else {
          showToast('File JSON không hợp lệ hoặc danh sách rỗng');
        }
      } catch (err) {
        showToast('Lỗi đọc file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function resetToDefaultData() {
    if (!confirm(`Khôi phục lại danh mục flashcard mẫu ban đầu (${DEFAULT_CARDS.length} thẻ)?`)) return;
    state.cards = JSON.parse(JSON.stringify(DEFAULT_CARDS));
    saveCardsToStorage(state.cards);
    showToast(`Đã khôi phục toàn bộ ${DEFAULT_CARDS.length} thẻ với câu A1-A2-B1 dễ hiểu`);
    updateCategoryCountsPreview();
    filterAndRenderCards();
    renderManageTable();
  }

  // --- THEME TOGGLE ---
  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    saveUserPreferences({ theme: isDark ? 'dark' : 'light' });
    showToast(isDark ? 'Giao diện trung tính tối' : 'Giao diện trung tính sáng');
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    el.btnSelectWords.addEventListener('click', () => selectCategory('words'));
    el.btnSelectCollocations.addEventListener('click', () => selectCategory('collocations'));
    el.btnChangeCategory.addEventListener('click', () => {
      updateCategoryCountsPreview();
      el.selectionOverlay.style.display = 'flex';
    });

    el.btnToggleTheme.addEventListener('click', toggleTheme);

    el.modeFlipBtn.addEventListener('click', () => setStudyMode('flip'));
    el.modeTypeBtn.addEventListener('click', () => setStudyMode('type'));

    el.intervalChips.forEach(chip => {
      chip.addEventListener('click', () => {
        state.currentFilter = chip.dataset.filter;
        updateIntervalNavChips();
        state.currentIndex = 0;
        filterAndRenderCards();
      });
    });

    el.flashcardElement.addEventListener('click', (e) => {
      if (e.target.closest('#btn-audio-speak')) return;
      toggleFlipCard();
    });

    el.btnAudioSpeak.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = state.filteredCards[state.currentIndex];
      if (card && card.english) speakEnglish(card.english);
    });

    el.btnAudioType.addEventListener('click', () => {
      const card = state.filteredCards[state.currentIndex];
      if (card && card.english) speakEnglish(card.english);
    });

    el.typeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkTypedAnswer();
    });
    el.btnSubmitAnswer.addEventListener('click', () => {
      checkTypedAnswer();
    });
    el.btnHintLetter.addEventListener('click', revealLetterHint);
    el.btnRevealSolution.addEventListener('click', revealSolution);

    el.btnPrevCard.addEventListener('click', prevCard);
    el.btnNextCard.addEventListener('click', nextCard);

    el.btnRateAgain.addEventListener('click', () => handleRateCard(false));
    el.btnRateGood.addEventListener('click', () => handleRateCard(true));

    el.btnResetFilter.addEventListener('click', () => {
      state.currentFilter = 'all';
      updateIntervalNavChips();
      filterAndRenderCards();
    });
    el.btnEmptyAdd.addEventListener('click', openAddCardModal);

    el.btnAddCard.addEventListener('click', openAddCardModal);
    el.btnCloseCardModal.addEventListener('click', closeCardModal);
    el.btnCancelCardModal.addEventListener('click', closeCardModal);
    el.cardEditorForm.addEventListener('submit', handleSaveCardForm);

    el.btnOpenList.addEventListener('click', openManageModal);
    el.btnCloseManageModal.addEventListener('click', closeManageModal);
    el.btnCloseManageBottom.addEventListener('click', closeManageModal);
    el.manageSearchInput.addEventListener('input', renderManageTable);
    el.btnExportJson.addEventListener('click', exportCardsJson);
    el.fileImportJson.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importCardsJson(e.target.files[0]);
      }
    });
    el.btnResetDefaultData.addEventListener('click', resetToDefaultData);

    [el.modalCardForm, el.modalManageCards].forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.style.display = 'none';
      });
    });

    document.addEventListener('keydown', (e) => {
      const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

      if (e.key === 'Escape') {
        el.modalCardForm.style.display = 'none';
        el.modalManageCards.style.display = 'none';
        return;
      }

      if (isInputActive) {
        if (document.activeElement === el.userTypedInput && e.key === 'Enter') {
          e.preventDefault();
          checkTypedAnswer();
        }
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        toggleFlipCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.key === '1') {
        e.preventDefault();
        handleRateCard(false);
      } else if (e.key === '2') {
        e.preventDefault();
        handleRateCard(true);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
