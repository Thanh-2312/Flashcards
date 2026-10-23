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
    },
    // ==========================================
    // BÀI ĐỌC: SAVING THE SAIGA
    // PHẦN 1: WORDS (Từ Vựng Cấp B2+ - Cards 107 đến 129)
    // ==========================================
    {
      id: 'card-107',
      category: 'words',
      english: 'roam',
      ipa: '/rəʊm/ (v - C1)',
      vietnamese: 'Đi lang thang, rong ruổi tự do trên một vùng đất rộng lớn.',
      frontText: 'Wild cows and sheep like to __________ freely across the big green fields looking for grass.',
      context: 'The saiga, a species of antelope native to Central Asia, once roamed the vast grasslands of this region in enormous herds, many millions strong.',
      exampleEn: 'Wild cows and sheep like to roam freely across the big green fields looking for grass.',
      acceptedAnswers: ['roam', 'roaming', 'roamed'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-108',
      category: 'words',
      english: 'regrettably',
      ipa: '/rɪˈɡret.ə.bli/ (adv - C1)',
      vietnamese: 'Đáng tiếc thay, thật đáng buồn là.',
      frontText: '__________, he did not pass the test because he was too sick to study.',
      context: 'Regrettably, such spectacular sights are a thing of the past.',
      exampleEn: 'Regrettably, he did not pass the test because he was too sick to study.',
      acceptedAnswers: ['regrettably', 'Regrettably'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-109',
      category: 'words',
      english: 'spectacular',
      ipa: '/spekˈtæk.jə.lər/ (adj - B2)',
      vietnamese: 'Hùng vĩ, ngoạn mục, đẹp mắt và gây ấn tượng mạnh.',
      frontText: 'From the top of the mountain, there was a __________ view of the sunrise.',
      context: 'Regrettably, such spectacular sights are a thing of the past.',
      exampleEn: 'From the top of the mountain, there was a spectacular view of the sunrise.',
      acceptedAnswers: ['spectacular'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-110',
      category: 'words',
      english: 'bizarre',
      ipa: '/bɪˈzɑːr/ (adj - B2)',
      vietnamese: 'Kỳ quái, rất kỳ lạ và khác thường.',
      frontText: 'It was really __________ to see snow falling in the middle of summer.',
      context: 'One such adaptation is its bizarre bulbous nose, which enables the animal to survive the extreme seasonal temperature swings of the region.',
      exampleEn: 'It was really bizarre to see snow falling in the middle of summer.',
      acceptedAnswers: ['bizarre'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-111',
      category: 'words',
      english: 'bulbous',
      ipa: '/ˈbʌl.bəs/ (adj - C2)',
      vietnamese: 'Phình to tròn, có hình dạng tròn giống củ hành.',
      frontText: 'The funny clown had a big red __________ nose on his face.',
      context: 'One such adaptation is its bizarre bulbous nose, which enables the animal to survive the extreme seasonal temperature swings of the region.',
      exampleEn: 'The funny clown had a big red bulbous nose on his face.',
      acceptedAnswers: ['bulbous'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-112',
      category: 'words',
      english: 'swollen',
      ipa: '/ˈswəʊ.lən/ (adj - B2)',
      vietnamese: 'Sưng phồng, phình to hơn bình thường.',
      frontText: 'His foot became hot and __________ after he fell off his bicycle.',
      context: 'The swollen nostrils of the nose serve several purposes: they filter out dust and cool the blood during hot, dry summers...',
      exampleEn: 'His foot became hot and swollen after he fell off his bicycle.',
      acceptedAnswers: ['swollen'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-113',
      category: 'words',
      english: 'nostril',
      ipa: '/ˈnɒs.trəl/ (n - C1)',
      vietnamese: 'Lỗ mũi (một trong hai lỗ mở của mũi).',
      frontText: 'Air enters our body through each __________ when we smell flowers.',
      context: 'The swollen nostrils of the nose serve several purposes: they filter out dust and cool the blood during hot, dry summers, and they warm the cold air before it enters the saiga\'s lungs in winter.',
      exampleEn: 'Air enters our body through each nostril when we smell flowers.',
      acceptedAnswers: ['nostril', 'nostrils'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-114',
      category: 'words',
      english: 'shed',
      ipa: '/ʃed/ (v - C1)',
      vietnamese: 'Rụng, trút bỏ (lông, da, lá khi thay mùa).',
      frontText: 'Dogs often __________ their thick winter fur when warm spring weather arrives.',
      context: 'Other seasonal adaptations include a heavy winter coat that the saiga sheds when the weather warms up.',
      exampleEn: 'Dogs often shed their thick winter fur when warm spring weather arrives.',
      acceptedAnswers: ['shed', 'sheds', 'shedding'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-115',
      category: 'words',
      english: 'harsh',
      ipa: '/hɑːʃ/ (adj - B2)',
      vietnamese: 'Khắc nghiệt, dữ dội, khó sống sót.',
      frontText: 'Plants cannot grow easily in the desert because of the __________ dry climate.',
      context: 'Despite these superb adaptations to harsh conditions, the saiga has no defence against the threats posed by humans.',
      exampleEn: 'Plants cannot grow easily in the desert because of the harsh dry climate.',
      acceptedAnswers: ['harsh'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-116',
      category: 'words',
      english: 'superb',
      ipa: '/suːˈpɜːb/ (adj - B2)',
      vietnamese: 'Tuyệt vời, xuất sắc vượt trội, thượng hạng.',
      frontText: 'The food at the new restaurant was __________ and everyone praised the chef.',
      context: 'Despite these superb adaptations to harsh conditions, the saiga has no defence against the threats posed by humans.',
      exampleEn: 'The food at the new restaurant was superb and everyone praised the chef.',
      acceptedAnswers: ['superb'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-117',
      category: 'words',
      english: 'respite',
      ipa: '/ˈres.paɪt/ (n - C2)',
      vietnamese: 'Quãng thời gian nghỉ ngơi, tạm lắng dịu ngắn ngủi.',
      frontText: 'After working non-stop for ten hours, a short coffee break gave him a welcome __________.',
      context: 'Legal protection ensured its survival for a while, and numbers steadily recovered throughout most of the 20th century. But the respite was only temporary.',
      exampleEn: 'After working non-stop for ten hours, a short coffee break gave him a welcome respite.',
      acceptedAnswers: ['respite'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-118',
      category: 'words',
      english: 'poaching',
      ipa: '/ˈpəʊ.tʃɪŋ/ (n - B2)',
      vietnamese: 'Nạn săn bắn trộm động vật hoang dã trái phép.',
      frontText: 'Illegal __________ of wild elephants for their white teeth must be stopped by law.',
      context: 'The dramatic decline during this decade was due to illegal poaching on an industrial scale.',
      exampleEn: 'Illegal poaching of wild elephants for their white teeth must be stopped by law.',
      acceptedAnswers: ['poaching', 'poach'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-119',
      category: 'words',
      english: 'misguided',
      ipa: '/ˌmɪsˈɡaɪ.dɪd/ (adj - C1)',
      vietnamese: 'Sai lầm, do nhận thức hoặc hướng đi sai lệch.',
      frontText: 'His __________ decision to quit school early made it difficult for him to find a job.',
      context: 'Poaching reached epidemic levels after misguided conservationists tried to relieve the pressure on threatened African rhinos...',
      exampleEn: 'His misguided decision to quit school early made it difficult for him to find a job.',
      acceptedAnswers: ['misguided'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-120',
      category: 'words',
      english: 'barrier',
      ipa: '/ˈbær.i.ər/ (n - B2)',
      vietnamese: 'Rào cản, chướng ngại vật ngăn chặn sự di chuyển.',
      frontText: 'The police placed a tall wooden __________ across the street so cars could not pass.',
      context: 'Physical barriers such as railways, pipelines and fences can block the seasonal migration routes of this transboundary species.',
      exampleEn: 'The police placed a tall wooden barrier across the street so cars could not pass.',
      acceptedAnswers: ['barrier', 'barriers'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-121',
      category: 'words',
      english: 'transboundary',
      ipa: '/trænzˈbaʊn.dər.i/ (adj - C1)',
      vietnamese: 'Xuyên biên giới (vượt qua ranh giới giữa hai hay nhiều quốc gia).',
      frontText: 'Many wild birds fly across several different countries during their __________ journeys every year.',
      context: 'Physical barriers such as railways, pipelines and fences can block the seasonal migration routes of this transboundary species.',
      exampleEn: 'Many wild birds fly across several different countries during their transboundary journeys every year.',
      acceptedAnswers: ['transboundary'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-122',
      category: 'words',
      english: 'outbreak',
      ipa: '/ˈaʊt.breɪk/ (n - B2)',
      vietnamese: 'Sự bùng phát đột ngột (của dịch bệnh, xung đột).',
      frontText: 'The sudden __________ of the flu made half of the students stay at home.',
      context: 'In 2015, an outbreak of haemorrhagic septicaemia, caused by the normally harmless bacterium Pasteurella multocida, killed over 75% of the global adult saiga population in just three weeks.',
      exampleEn: 'The sudden outbreak of the flu made half of the students stay at home.',
      acceptedAnswers: ['outbreak', 'outbreaks'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-123',
      category: 'words',
      english: 'livestock',
      ipa: '/ˈlaɪv.stɒk/ (n - B2)',
      vietnamese: 'Gia súc, vật nuôi nông trại (bò, cừu, dê, lợn,...).',
      frontText: 'The farmer wakes up early every morning to feed his cows, pigs, and other __________.',
      context: 'In 2017, 60% of the Mongolian saiga population - a subspecies found nowhere else in the world - was killed by a virus that spilled over from livestock.',
      exampleEn: 'The farmer wakes up early every morning to feed his cows, pigs, and other livestock.',
      acceptedAnswers: ['livestock'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-124',
      category: 'words',
      english: 'fluctuation',
      ipa: '/ˌflʌk.tʃuˈeɪ.ʃən/ (n - B2)',
      vietnamese: 'Sự biến động, dao động lên xuống thất thường.',
      frontText: 'A sudden __________ in oil prices caused the cost of living to rise and fall quickly.',
      context: 'Although well adapted to cold winters and hot summers, saiga struggle to cope with temperature extremes and unpredictable fluctuations in climate.',
      exampleEn: 'A sudden fluctuation in oil prices caused the cost of living to rise and fall quickly.',
      acceptedAnswers: ['fluctuation', 'fluctuations'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-125',
      category: 'words',
      english: 'arid',
      ipa: '/ˈær.ɪd/ (adj - C1)',
      vietnamese: 'Khô cằn, ít mưa, không có đủ độ ẩm cho cây cối.',
      frontText: 'Very few plants can grow in this __________ desert land without water.',
      context: 'The steppe region has also become increasingly arid in recent years, and many of the smaller streams that the species normally depended on have dried up and vanished.',
      exampleEn: 'Very few plants can grow in this arid desert land without water.',
      acceptedAnswers: ['arid'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-126',
      category: 'words',
      english: 'accolade',
      ipa: '/ˈæk.ə.leɪd/ (n - C1)',
      vietnamese: 'Danh hiệu vinh danh, phần thưởng khen ngợi đặc biệt.',
      frontText: 'Winning the gold medal was the highest __________ the young singer ever received.',
      context: 'In 2022 the United Nations recognised the initiative as a World Restoration Flagship project, an accolade reserved for the ten best examples of large-scale ecosystem restoration around the globe.',
      exampleEn: 'Winning the gold medal was the highest accolade the young singer ever received.',
      acceptedAnswers: ['accolade', 'accolades'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-127',
      category: 'words',
      english: 'census',
      ipa: '/ˈsen.səs/ (n - C1)',
      vietnamese: 'Cuộc điều tra thống kê quy mô lớn (dân số hoặc số lượng cá thể loài).',
      frontText: 'The national __________ counts every person living in the country once every ten years.',
      context: 'An aerial census two years ago recorded an estimated 842,000 saiga across Kazakhstan as a whole, and according to an aerial survey earlier this year, the saiga population in Kazakhstan now exceeds 1.9 million.',
      exampleEn: 'The national census counts every person living in the country once every ten years.',
      acceptedAnswers: ['census'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-128',
      category: 'words',
      english: 'uplifting',
      ipa: '/ʌpˈlɪf.tɪŋ/ (adj - C1)',
      vietnamese: 'Đầy khích lệ, nâng cao tinh thần, tích cực phấn khởi.',
      frontText: 'Listening to happy music after a sad day can be very __________.',
      context: 'But thanks to the intervention of the Altyn Dala Conservation Initiative, the most recent episodes in the ongoing story of the saiga have been relatively uplifting.',
      exampleEn: 'Listening to happy music after a sad day can be very uplifting.',
      acceptedAnswers: ['uplifting'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-129',
      category: 'words',
      english: 'spearhead',
      ipa: '/ˈspɪə.hed/ (v - C1)',
      vietnamese: 'Tiên phong, dẫn đầu và chỉ đạo (một dự án, chiến dịch).',
      frontText: 'The young scientist will __________ the new project to clean up plastic in the river.',
      context: 'Recent efforts to save the saiga have been spearheaded by the Altyn Dala Conservation Initiative, a project led by the Association for the Conservation of Biodiversity of Kazakhstan...',
      exampleEn: 'The young scientist will spearhead the new project to clean up plastic in the river.',
      acceptedAnswers: ['spearhead', 'spearheaded', 'spearheading'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    // ==========================================
    // BÀI ĐỌC: SAVING THE SAIGA
    // PHẦN 2: COLLOCATIONS & PHRASES (Cụm Từ B2+ - Cards 130 đến 146)
    // ==========================================
    {
      id: 'card-130',
      category: 'collocations',
      english: 'a thing of the past',
      ipa: '(idiom - B2)',
      vietnamese: 'Điều chỉ còn là dĩ vãng, không còn tồn tại hay xảy ra nữa.',
      frontText: 'Thanks to modern medicine, many deadly diseases are now __________.',
      context: 'Regrettably, such spectacular sights are a thing of the past.',
      exampleEn: 'Thanks to modern medicine, many deadly diseases are now a thing of the past.',
      acceptedAnswers: ['a thing of the past', 'thing of the past'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-131',
      category: 'collocations',
      english: 'be confined to',
      ipa: '(phrase - B2)',
      vietnamese: 'Bị giới hạn, bó hẹp trong phạm vi một nơi hoặc tình trạng.',
      frontText: 'Because of his broken leg, the patient had to __________ bed for two weeks.',
      context: 'Today, the saiga is largely confined to a single country: Kazakhstan.',
      exampleEn: 'Because of his broken leg, the patient had to be confined to bed for two weeks.',
      acceptedAnswers: ['be confined to', 'confined to'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-132',
      category: 'collocations',
      english: 'account for',
      ipa: '/əˈkaʊnt fɔːr/ (phrasal verb - B2)',
      vietnamese: 'Chiếm (tỷ lệ, phần trăm hoặc số lượng cụ thể).',
      frontText: 'Computers and mobile phones __________ more than half of the company\'s total sales.',
      context: 'This country is estimated to be home to well over 90% of the global saiga population, with Russia, Mongolia and Uzbekistan accounting for the rest.',
      exampleEn: 'Computers and mobile phones account for more than half of the company\'s total sales.',
      acceptedAnswers: ['account for', 'accounting for', 'accounted for'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-133',
      category: 'collocations',
      english: 'filter out',
      ipa: '/ˈfɪl.tər aʊt/ (phrasal verb - B2)',
      vietnamese: 'Lọc bỏ, giữ lại chất bẩn/tạp chất không cho lọt qua.',
      frontText: 'These special glasses __________ dangerous light rays from the sun to protect your eyes.',
      context: 'The swollen nostrils of the nose serve several purposes: they filter out dust and cool the blood during hot, dry summers...',
      exampleEn: 'These special glasses filter out dangerous light rays from the sun to protect your eyes.',
      acceptedAnswers: ['filter out', 'filters out', 'filtering out', 'filtered out'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-134',
      category: 'collocations',
      english: 'driven to extinction',
      ipa: '(collocation - C1)',
      vietnamese: 'Bị đẩy đến bờ vực tuyệt chủng do tác động xấu.',
      frontText: 'The wild bird was __________ by heavy hunting in the nineteenth century.',
      context: 'It was almost driven to extinction by hunters in the 19th century.',
      exampleEn: 'The wild bird was driven to extinction by heavy hunting in the nineteenth century.',
      acceptedAnswers: ['driven to extinction', 'drive to extinction'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-135',
      category: 'collocations',
      english: 'on an industrial scale',
      ipa: '(collocation - C1)',
      vietnamese: 'Trên quy mô công nghiệp, ở mức độ quy mô cực kỳ lớn.',
      frontText: 'The new factory began producing electric cars __________ to meet the huge demand.',
      context: 'The dramatic decline during this decade was due to illegal poaching on an industrial scale.',
      exampleEn: 'The new factory began producing electric cars on an industrial scale to meet the huge demand.',
      acceptedAnswers: ['on an industrial scale', 'industrial scale'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-136',
      category: 'collocations',
      english: 'highly prized',
      ipa: '(collocation - B2)',
      vietnamese: 'Được đánh giá rất cao, được săn đón coi như của quý.',
      frontText: 'Pure gold has always been __________ because it is rare and beautiful.',
      context: 'Male saiga are a particular target, because their horns are highly prized by traditional medicine practitioners.',
      exampleEn: 'Pure gold has always been highly prized because it is rare and beautiful.',
      acceptedAnswers: ['highly prized', 'prized'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-137',
      category: 'collocations',
      english: 'relieve the pressure on',
      ipa: '(collocation - B2)',
      vietnamese: 'Giảm bớt áp lực, giảm tải gánh nặng cho ai đó/nơi nào.',
      frontText: 'Opening a new hospital in town will __________ the crowded city center clinics.',
      context: 'Poaching reached epidemic levels after misguided conservationists tried to relieve the pressure on threatened African rhinos by actively encouraging the use of saiga horns...',
      exampleEn: 'Opening a new hospital in town will relieve the pressure on the crowded city center clinics.',
      acceptedAnswers: ['relieve the pressure on', 'relieve pressure on'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-138',
      category: 'collocations',
      english: 'wipe out',
      ipa: '/waɪp aʊt/ (phrasal verb - B2)',
      vietnamese: 'Quét sạch, tiêu diệt hoàn toàn, xóa sổ.',
      frontText: 'A huge storm can __________ entire villages along the coast in just one night.',
      context: 'Male saiga were almost wiped out, leading to a population crash from which the species has been struggling to recover ever since.',
      exampleEn: 'A huge storm can wipe out entire villages along the coast in just one night.',
      acceptedAnswers: ['wipe out', 'wiped out'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-139',
      category: 'collocations',
      english: 'starve to death',
      ipa: '(collocation - B2)',
      vietnamese: 'Chết đói (chết do hoàn toàn kiệt quệ thiếu thức ăn).',
      frontText: 'Without any food during the long winter, many poor animals will __________.',
      context: 'In the worst cases, herds may starve to death after being trapped.',
      exampleEn: 'Without any food during the long winter, many poor animals will starve to death.',
      acceptedAnswers: ['starve to death', 'starved to death'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-140',
      category: 'collocations',
      english: 'spill over from',
      ipa: '(phrasal verb - C1)',
      vietnamese: 'Lây lan sang từ, tràn qua từ nguồn khác.',
      frontText: 'Health experts worry that the virus might __________ farm chickens to humans.',
      context: 'In 2017, 60% of the Mongolian saiga population - a subspecies found nowhere else in the world - was killed by a virus that spilled over from livestock.',
      exampleEn: 'Health experts worry that the virus might spill over from farm chickens to humans.',
      acceptedAnswers: ['spill over from', 'spilled over from', 'spill over'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-141',
      category: 'collocations',
      english: 'mass mortality',
      ipa: '(collocation - C1)',
      vietnamese: 'Hiện tượng tử vong hàng loạt, chết trên quy mô lớn.',
      frontText: 'The oil spill in the sea caused a sudden __________ event that killed thousands of fish.',
      context: 'These so-called mass mortality events represent an unpredictable and serious threat to the species.',
      exampleEn: 'The oil spill in the sea caused a sudden mass mortality event that killed thousands of fish.',
      acceptedAnswers: ['mass mortality', 'mass mortality event'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-142',
      category: 'collocations',
      english: 'pose a threat',
      ipa: '(collocation - B2)',
      vietnamese: 'Gây ra mối đe dọa, tạo ra nguy cơ nguy hiểm.',
      frontText: 'Throwing plastic waste into the ocean will __________ to marine life.',
      context: 'Climate change poses a further threat.',
      exampleEn: 'Throwing plastic waste into the ocean will pose a threat to marine life.',
      acceptedAnswers: ['pose a threat', 'poses a threat', 'posed a threat', 'pose a serious threat'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-143',
      category: 'collocations',
      english: 'dry up',
      ipa: '/draɪ ʌp/ (phrasal verb - B2)',
      vietnamese: 'Cạn kiệt nước, khô hạn hoàn toàn.',
      frontText: 'During the hot summer without rain, the small river began to __________ completely.',
      context: 'The steppe region has also become increasingly arid in recent years, and many of the smaller streams that the species normally depended on have dried up and vanished.',
      exampleEn: 'During the hot summer without rain, the small river began to dry up completely.',
      acceptedAnswers: ['dry up', 'dried up'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-144',
      category: 'collocations',
      english: 'critically endangered',
      ipa: '(collocation - B2)',
      vietnamese: 'Cực kỳ nguy cấp (loài động vật đứng trước nguy cơ tuyệt chủng rất cao ngoài tự nhiên).',
      frontText: 'With only thirty tigers left in the wild, the species is now __________.',
      context: 'Its purpose is to protect and restore Kazakhstan\'s steppe, semi-desert and desert ecosystems and the many species they support, including the critically endangered saiga.',
      exampleEn: 'With only thirty tigers left in the wild, the species is now critically endangered.',
      acceptedAnswers: ['critically endangered'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-145',
      category: 'collocations',
      english: 'hit an all-time low',
      ipa: '(collocation - C1)',
      vietnamese: 'Chạm mức thấp nhất trong lịch sử / mọi thời đại.',
      frontText: 'Due to the bad economy, house prices in the city have __________ this month.',
      context: 'By 2000, the global saiga population had hit an all-time low of just 21,000 individuals.',
      exampleEn: 'Due to the bad economy, house prices in the city have hit an all-time low this month.',
      acceptedAnswers: ['hit an all-time low', 'all-time low', 'hit an all time low'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-146',
      category: 'collocations',
      english: 'direction of travel',
      ipa: '(idiom - C1)',
      vietnamese: 'Chiều hướng phát triển, xu thế chung trong tương lai.',
      frontText: 'We still have challenges to solve, but the overall __________ for clean energy looks very bright.',
      context: 'The world\'s strangest-looking antelope remains critically endangered, but the direction of travel is positive.',
      exampleEn: 'We still have challenges to solve, but the overall direction of travel for clean energy looks very bright.',
      acceptedAnswers: ['direction of travel'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    // ==========================================
    // BÀI ĐỌC: DEFORESTATION AND DESERTIFICATION
    // PHẦN 1: WORDS (Từ Vựng Cấp B2+ - Cards 147 đến 172)
    // ==========================================
    {
      id: 'card-147',
      category: 'words',
      english: 'deforestation',
      ipa: '/diːˌfɒr.ɪˈsteɪ.ʃən/ (n - B2)',
      vietnamese: 'Nạn phá rừng, sự tàn phá rừng trên diện rộng.',
      frontText: 'Cutting down all the green trees in a big forest is called __________.',
      context: 'DEFORESTATION AND DESERTIFICATION',
      exampleEn: 'Cutting down all the green trees in a big forest is called deforestation.',
      acceptedAnswers: ['deforestation'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-148',
      category: 'words',
      english: 'desertification',
      ipa: '/dɪˌzɜː.tɪ.fɪˈkeɪ.ʃən/ (n - C1)',
      vietnamese: 'Quá trình sa mạc hóa (đất đai khô cằn biến thành sa mạc).',
      frontText: 'When green farmland becomes very dry and turns into sand, this process is called __________.',
      context: 'The same process of desertification is taking place across southern Africa as the Kalahari desert advances into Botswana and parts of South Africa.',
      exampleEn: 'When green farmland becomes very dry and turns into sand, this process is called desertification.',
      acceptedAnswers: ['desertification'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-149',
      category: 'words',
      english: 'fertile',
      ipa: '/ˈfɜː.taɪl/ (adj - B2)',
      vietnamese: 'Phì nhiêu, màu mỡ (đất đai tốt cho cây cối tươi tốt).',
      frontText: 'Farmers love planting rice and vegetables in this rich, __________ soil near the river.',
      context: 'The Sahel zone lies between the Sahara desert and the fertile savannahs of northern Nigeria and southern Sudan.',
      exampleEn: 'Farmers love planting rice and vegetables in this rich, fertile soil near the river.',
      acceptedAnswers: ['fertile'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-150',
      category: 'words',
      english: 'savannah',
      ipa: '/səˈvæn.ə/ (n - B2)',
      vietnamese: 'Xavan, thảo nguyên nhiệt đới có nhiều cỏ cao và ít cây to.',
      frontText: 'In Africa, wild animals like lions and zebras live on the open, grassy __________.',
      context: 'The Sahel zone lies between the Sahara desert and the fertile savannahs of northern Nigeria and southern Sudan.',
      exampleEn: 'In Africa, wild animals like lions and zebras live on the open, grassy savannah.',
      acceptedAnswers: ['savannah', 'savanna', 'savannahs', 'savannas'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-151',
      category: 'words',
      english: 'marginal',
      ipa: '/ˈmɑː.dʒɪ.nəl/ (adj - C2)',
      vietnamese: '(Đất đai) Kém màu mỡ, cận biên, cho năng suất rất thấp.',
      frontText: 'Crops cannot grow well on this poor, __________ land because the ground is dry and rocky.',
      context: 'The word sahel comes from Arabic and means marginal or transitional, and this is a good description of these semi-arid lands...',
      exampleEn: 'Crops cannot grow well on this poor, marginal land because the ground is dry and rocky.',
      acceptedAnswers: ['marginal'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-152',
      category: 'words',
      english: 'transitional',
      ipa: '/trænˈzɪʃ.ən.əl/ (adj - C1)',
      vietnamese: 'Chuyển tiếp, quá độ giữa hai khu vực hoặc hai giai đoạn.',
      frontText: 'Spring is a __________ season between cold winter and hot summer.',
      context: 'The word sahel comes from Arabic and means marginal or transitional, and this is a good description of these semi-arid lands...',
      exampleEn: 'Spring is a transitional season between cold winter and hot summer.',
      acceptedAnswers: ['transitional'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-153',
      category: 'words',
      english: 'semi-arid',
      ipa: '/ˌsem.iˈær.ɪd/ (adj - C1)',
      vietnamese: 'Bán khô hạn (khí hậu rất ít mưa nhưng chưa hoàn toàn thành sa mạc).',
      frontText: 'A __________ climate is very dry and has very little rain each year, but small plants can still live.',
      context: '...and this is a good description of these semi-arid lands, which occupy much of the West African countries of Mali, Mauritania, Niger and Chad.',
      exampleEn: 'A semi-arid climate is very dry and has very little rain each year, but small plants can still live.',
      acceptedAnswers: ['semi-arid', 'semi arid'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-154',
      category: 'words',
      english: 'occupy',
      ipa: '/ˈɒk.jə.paɪ/ (v - B2)',
      vietnamese: 'Chiếm, bao phủ một khoảng diện tích không gian hoặc lãnh thổ.',
      frontText: 'The big wooden table and four chairs __________ most of the space in this small room.',
      context: '...which occupy much of the West African countries of Mali, Mauritania, Niger and Chad.',
      exampleEn: 'The big wooden table and four chairs occupy most of the space in this small room.',
      acceptedAnswers: ['occupy', 'occupies', 'occupied', 'occupying'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-155',
      category: 'words',
      english: 'steadily',
      ipa: '/ˈsted.əl.i/ (adv - B2)',
      vietnamese: 'Một cách đều đặn, từ từ nhưng liên tục không ngừng.',
      frontText: 'The runner did not stop and moved forward __________ until he crossed the finish line.',
      context: 'Unfortunately, over the last century the Sahara desert has steadily crept southwards, eating into once productive Sahel lands.',
      exampleEn: 'The runner did not stop and moved forward steadily until he crossed the finish line.',
      acceptedAnswers: ['steadily'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-156',
      category: 'words',
      english: 'creep',
      ipa: '/kriːp/ (v - B2)',
      vietnamese: 'Bò, lấn tới từ từ một cách chậm chạp và khó nhận thấy.',
      frontText: 'The cat moved silently, trying to __________ closer to the bird without making any sound.',
      context: 'Unfortunately, over the last century the Sahara desert has steadily crept southwards, eating into once productive Sahel lands.',
      exampleEn: 'The cat moved silently, trying to creep closer to the bird without making any sound.',
      acceptedAnswers: ['creep', 'crept', 'creeping', 'creeps'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-157',
      category: 'words',
      english: 'productive',
      ipa: '/prəˈdʌk.tɪv/ (adj - B2)',
      vietnamese: 'Màu mỡ, đem lại sản lượng mùa màng dồi dào.',
      frontText: 'Good water and healthy soil make the garden very __________ with fresh fruits all year.',
      context: '...eating into once productive Sahel lands.',
      exampleEn: 'Good water and healthy soil make the garden very productive with fresh fruits all year.',
      acceptedAnswers: ['productive'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-158',
      category: 'words',
      english: 'deteriorate',
      ipa: '/dɪˈtɪə.ri.ə.reɪt/ (v - C1)',
      vietnamese: 'Suy thoái, xuống cấp, trở nên tồi tệ hơn về chất lượng.',
      frontText: 'Without regular paint and care, an old wooden house will __________ quickly in bad weather.',
      context: 'United Nations surveys show that over 70 per cent of the dry land in agricultural use in Africa has deteriorated over the last 30 years.',
      exampleEn: 'Without regular paint and care, an old wooden house will deteriorate quickly in bad weather.',
      acceptedAnswers: ['deteriorate', 'deteriorated', 'deteriorating', 'deteriorates'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-159',
      category: 'words',
      english: 'prolonged',
      ipa: '/prəˈlɒŋd/ (adj - C1)',
      vietnamese: 'Kéo dài, diễn ra dai dẳng trong một thời gian dài.',
      frontText: 'After a __________ period of hot sun without any rain for three months, the lake ran out of water.',
      context: 'Droughts have become more prolonged and more severe, the most recent lasting over 20 years in parts of the Sahel region.',
      exampleEn: 'After a prolonged period of hot sun without any rain for three months, the lake ran out of water.',
      acceptedAnswers: ['prolonged'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-160',
      category: 'words',
      english: 'severe',
      ipa: '/sɪˈvɪər/ (adj - B2)',
      vietnamese: 'Khốc liệt, nghiêm trọng, dữ dội (về thời tiết, hạn hán).',
      frontText: 'The cold winter storm was so __________ that people could not leave their homes.',
      context: 'Droughts have become more prolonged and more severe, the most recent lasting over 20 years in parts of the Sahel region.',
      exampleEn: 'The cold winter storm was so severe that people could not leave their homes.',
      acceptedAnswers: ['severe'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-161',
      category: 'words',
      english: 'overgrazing',
      ipa: '/ˌəʊ.vəˈɡreɪ.zɪŋ/ (n - B2)',
      vietnamese: 'Sự chăn thả quá mức (khiến cỏ cây không thể phục hồi).',
      frontText: 'Letting too many cows eat all the fresh grass on a small field causes __________.',
      context: 'Overgrazing - keeping too many farm animals on the land - means that grasses and other plants cannot recover, and scarce water supplies are exhausted.',
      exampleEn: 'Letting too many cows eat all the fresh grass on a small field causes overgrazing.',
      acceptedAnswers: ['overgrazing'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-162',
      category: 'words',
      english: 'scarce',
      ipa: '/skeəs/ (adj - B2)',
      vietnamese: 'Khan hiếm, ít ỏi, không đủ đáp ứng nhu cầu.',
      frontText: 'Clean water is very __________ in dry places where rain falls only once a year.',
      context: '...and scarce water supplies are exhausted.',
      exampleEn: 'Clean water is very scarce in dry places where rain falls only once a year.',
      acceptedAnswers: ['scarce'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-163',
      category: 'words',
      english: 'exhaust',
      ipa: '/ɪɡˈzɔːst/ (v - C1)',
      vietnamese: 'Làm cạn kiệt hoàn toàn nguồn nước hoặc tài nguyên.',
      frontText: 'If we use all the well water too quickly, we will __________ our only drinking source.',
      context: '...and scarce water supplies are exhausted.',
      exampleEn: 'If we use all the well water too quickly, we will exhaust our only drinking source.',
      acceptedAnswers: ['exhaust', 'exhausted', 'exhausting', 'exhausts'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-164',
      category: 'words',
      english: 'overcultivation',
      ipa: '/ˌəʊ.və.kʌl.tɪˈveɪ.ʃən/ (n - C1)',
      vietnamese: 'Sự thâm canh quá mức, vắt kiệt dinh dưỡng của đất trồng.',
      frontText: 'Planting too many crops continuously on poor ground without rest leads to __________.',
      context: 'Overcultivation - trying to grow too many crops on poor land - results in the soil becoming even less fertile and drier, and beginning to break up.',
      exampleEn: 'Planting too many crops continuously on poor ground without rest leads to overcultivation.',
      acceptedAnswers: ['overcultivation'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-165',
      category: 'words',
      english: 'loosen',
      ipa: '/ˈluː.sən/ (v - C1)',
      vietnamese: 'Làm rời rạc, làm tơi lỏng (kết cấu đất không còn dính kết).',
      frontText: 'When you take away the plant roots, the strong winds will easily __________ the dry dirt.',
      context: 'When trees are cut down, the soil begins to dry and loosen, wind and rain erosion increase, other plant species die...',
      exampleEn: 'When you take away the plant roots, the strong winds will easily loosen the dry dirt.',
      acceptedAnswers: ['loosen', 'loosens', 'loosened', 'loosening'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-166',
      category: 'words',
      english: 'topsoil',
      ipa: '/ˈtɒp.sɔɪl/ (n - C1)',
      vietnamese: 'Lớp đất mặt màu mỡ (tầng đất phía trên giàu mùn và khoáng chất nhất).',
      frontText: 'The dark, rich __________ on the surface of the ground is where flowers and trees grow best.',
      context: '...and eventually the fertile topsoil may be almost entirely lost, leaving only bare rock and dust.',
      exampleEn: 'The dark, rich topsoil on the surface of the ground is where flowers and trees grow best.',
      acceptedAnswers: ['topsoil'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-167',
      category: 'words',
      english: 'bare',
      ipa: '/beər/ (adj - B2)',
      vietnamese: 'Trơ trụi, cằn cỗi, không có bóng cây hay thảm cỏ bao phủ.',
      frontText: 'After the terrible fire, the mountain was left completely __________ with no green trees.',
      context: '...leaving only bare rock and dust.',
      exampleEn: 'After the terrible fire, the mountain was left completely bare with no green trees.',
      acceptedAnswers: ['bare'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-168',
      category: 'words',
      english: 'irreversible',
      ipa: '/ˌɪr.ɪˈvɜː.sə.bəl/ (adj - C1)',
      vietnamese: 'Không thể đảo ngược, không thể hoàn nguyên hay cứu vãn.',
      frontText: 'Once an animal species completely dies out, this sad loss is permanent and __________.',
      context: 'The effects of loss of topsoil and increased drought are irreversible.',
      exampleEn: 'Once an animal species completely dies out, this sad loss is permanent and irreversible.',
      acceptedAnswers: ['irreversible'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-169',
      category: 'words',
      english: 'preventable',
      ipa: '/prɪˈven.tə.bəl/ (adj - B2)',
      vietnamese: 'Có thể ngăn chặn, có thể phòng tránh được trước khi diễn ra.',
      frontText: 'Many traffic accidents on the road are __________ if drivers obey the speed limit.',
      context: 'They are, however, preventable.',
      exampleEn: 'Many traffic accidents on the road are preventable if drivers obey the speed limit.',
      acceptedAnswers: ['preventable'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-170',
      category: 'words',
      english: 'halt',
      ipa: '/hɒlt/ (v - C1)',
      vietnamese: 'Ngăn chặn, làm dừng hẳn một quá trình suy thoái hoặc chuyển động.',
      frontText: 'The police worked hard to __________ the dangerous car race through the city streets.',
      context: 'Careful conservation of tree cover and sustainable agricultural land use have been shown to halt deterioration of soils...',
      exampleEn: 'The police worked hard to halt the dangerous car race through the city streets.',
      acceptedAnswers: ['halt', 'halts', 'halted', 'halting'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-171',
      category: 'words',
      english: 'lessen',
      ipa: '/ˈles.ən/ (v - C1)',
      vietnamese: 'Làm giảm bớt, làm nhẹ bớt tác hại hoặc ảnh hưởng tiêu cực.',
      frontText: 'Drinking hot tea with honey can help __________ the pain in your sore throat.',
      context: '...and lessen the effects of shortage of rainfall.',
      exampleEn: 'Drinking hot tea with honey can help lessen the pain in your sore throat.',
      acceptedAnswers: ['lessen', 'lessens', 'lessened', 'lessening'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-172',
      category: 'words',
      english: 'viable',
      ipa: '/ˈvaɪ.ə.bəl/ (adj - C1)',
      vietnamese: 'Khả thi, có khả năng tồn tại và phát triển thành công về mặt kinh tế/thực tiễn.',
      frontText: 'Without enough money and customers, this small shop is no longer a __________ business plan.',
      context: '...while at the same time providing a viable agricultural economy based on the production of soaps, beekeeping and marketing shea nuts.',
      exampleEn: 'Without enough money and customers, this small shop is no longer a viable business plan.',
      acceptedAnswers: ['viable'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    // ==========================================
    // BÀI ĐỌC: DEFORESTATION AND DESERTIFICATION
    // PHẦN 2: COLLOCATIONS & PHRASES (Cụm Từ B2+ - Cards 173 đến 184)
    // ==========================================
    {
      id: 'card-173',
      category: 'collocations',
      english: 'eat into',
      ipa: '(phrasal verb - C1)',
      vietnamese: 'Lấn chiếm, ăn mòn dần dần (diện tích đất đai hoặc nguồn tiền tài).',
      frontText: 'High prices for food each month will quickly __________ our family savings.',
      context: 'Unfortunately, over the last century the Sahara desert has steadily crept southwards, eating into once productive Sahel lands.',
      exampleEn: 'High prices for food each month will quickly eat into our family savings.',
      acceptedAnswers: ['eat into', 'eating into', 'ate into'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-174',
      category: 'collocations',
      english: 'in agricultural use',
      ipa: '(collocation - B2)',
      vietnamese: 'Được sử dụng vào mục đích nông nghiệp, dùng để canh tác trồng trọt.',
      frontText: 'Most of the green fields in this peaceful village are __________ for growing rice.',
      context: 'United Nations surveys show that over 70 per cent of the dry land in agricultural use in Africa has deteriorated over the last 30 years.',
      exampleEn: 'Most of the green fields in this peaceful village are in agricultural use for growing rice.',
      acceptedAnswers: ['in agricultural use'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-175',
      category: 'collocations',
      english: 'soil erosion',
      ipa: '(collocation - B2)',
      vietnamese: 'Sự xói mòn đất do gió bão hoặc nước mưa cuốn trôi tầng đất mặt.',
      frontText: 'Heavy rain washed all the dirt down the bare hill, causing serious __________.',
      context: 'Soil erosion follows, and the land turns into desert.',
      exampleEn: 'Heavy rain washed all the dirt down the bare hill, causing serious soil erosion.',
      acceptedAnswers: ['soil erosion'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-176',
      category: 'collocations',
      english: 'be driven by',
      ipa: '(collocation - C1)',
      vietnamese: 'Bị thúc đẩy bởi, bắt nguồn trực tiếp từ động lực hoặc áp lực nào đó.',
      frontText: 'The sudden rise in house prices in big cities seems to __________ high demand from young workers.',
      context: 'One of the major causes of this desert advance is poor agricultural land use, driven by the pressures of increasing population.',
      exampleEn: 'The sudden rise in house prices in big cities seems to be driven by high demand from young workers.',
      acceptedAnswers: ['be driven by', 'driven by', 'is driven by', 'are driven by'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-177',
      category: 'collocations',
      english: 'break up',
      ipa: '(phrasal verb - B2)',
      vietnamese: '(Đất đai) Vỡ vụn, nứt nẻ và tơi rã kết cấu thành mảnh nhỏ.',
      frontText: 'Under the burning hot sun, the dry clay ground began to crack and __________.',
      context: '...results in the soil becoming even less fertile and drier, and beginning to break up.',
      exampleEn: 'Under the burning hot sun, the dry clay ground began to crack and break up.',
      acceptedAnswers: ['break up', 'breaking up', 'broke up'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-178',
      category: 'collocations',
      english: 'tree cover',
      ipa: '(collocation - B2)',
      vietnamese: 'Độ che phủ của cây rừng, tầng tán lá che chắn bảo vệ bề mặt đất.',
      frontText: 'Without thick __________ to block the sun, the ground becomes very hot and dry.',
      context: 'Another cause of desertification is loss of tree cover.',
      exampleEn: 'Without thick tree cover to block the sun, the ground becomes very hot and dry.',
      acceptedAnswers: ['tree cover'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-179',
      category: 'collocations',
      english: 'clear land',
      ipa: '(collocation - B2)',
      vietnamese: 'Khai hoang đất, phát quang cây rừng để lấy đất canh tác hoặc xây cất.',
      frontText: 'Workers had to cut down old bushes and trees to __________ for the new farm.',
      context: 'Trees are cut down for use as fuel and to clear land for agricultural use.',
      exampleEn: 'Workers had to cut down old bushes and trees to clear land for the new farm.',
      acceptedAnswers: ['clear land', 'clearing land', 'cleared land'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-180',
      category: 'collocations',
      english: 'bind together',
      ipa: '(collocation - B2)',
      vietnamese: 'Gắn kết, liên kết chặt chẽ các thành phần rời rạc lại với nhau.',
      frontText: 'You can use flour and eggs to __________ all the ingredients when baking a cake.',
      context: 'Tree roots help to bind the soil together, to conserve moisture and to provide a habitat for other plants and animals.',
      exampleEn: 'You can use flour and eggs to bind together all the ingredients when baking a cake.',
      acceptedAnswers: ['bind together', 'binds together', 'bound together'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-181',
      category: 'collocations',
      english: 'conserve moisture',
      ipa: '(collocation - C1)',
      vietnamese: 'Giữ lại độ ẩm, bảo toàn lượng nước trong lòng đất.',
      frontText: 'Covering garden soil with dry leaves will help to __________ during hot summer days.',
      context: 'Tree roots help to bind the soil together, to conserve moisture and to provide a habitat for other plants and animals.',
      exampleEn: 'Covering garden soil with dry leaves will help to conserve moisture during hot summer days.',
      acceptedAnswers: ['conserve moisture', 'conserving moisture'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-182',
      category: 'collocations',
      english: 'sustainable management',
      ipa: '(collocation - C1)',
      vietnamese: 'Quản lý bền vững (khai thác tài nguyên đi đôi với bảo tồn và tái sinh).',
      frontText: 'The forest needs careful and __________ so that trees can regrow faster than they are cut down.',
      context: 'One project in Kita in south-west Mali funded by the UNDP has involved local communities in sustainable management of forest...',
      exampleEn: 'The forest needs careful and sustainable management so that trees can regrow faster than they are cut down.',
      acceptedAnswers: ['sustainable management'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-183',
      category: 'collocations',
      english: 'shortage of rainfall',
      ipa: '(collocation - B2)',
      vietnamese: 'Sự thiếu hụt lượng mưa, tình trạng khan hiếm mưa kéo dài.',
      frontText: 'Crops died across the valley because of a severe __________ during the whole summer.',
      context: '...have been shown to halt deterioration of soils and lessen the effects of shortage of rainfall.',
      exampleEn: 'Crops died across the valley because of a severe shortage of rainfall during the whole summer.',
      acceptedAnswers: ['shortage of rainfall', 'shortage of rain'],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'card-184',
      category: 'collocations',
      english: 'advance into',
      ipa: '(collocation - B2)',
      vietnamese: 'Tiến sâu vào, lấn chiếm và bành trướng vào (vùng đất hoặc lãnh thổ mới).',
      frontText: 'As more sand moves with the wind, the desert continues to __________ green farmland.',
      context: 'The same process of desertification is taking place across southern Africa as the Kalahari desert advances into Botswana and parts of South Africa.',
      exampleEn: 'As more sand moves with the wind, the desert continues to advance into green farmland.',
      acceptedAnswers: ['advance into', 'advances into', 'advancing into', 'advanced into'],
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
    btnSelectSpeaking: document.getElementById('btn-select-speaking'),
    btnNavSpeaking: document.getElementById('btn-nav-speaking'),
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

    // Cloud Sync UI
    btnOpenSync: document.getElementById('btn-open-sync'),
    syncStatusDot: document.getElementById('sync-status-dot'),
    syncStatusLabel: document.getElementById('sync-status-label'),
    currentDueTag: document.getElementById('current-due-tag'),
    currentDueText: document.getElementById('current-due-text'),
    rateAgainDate: document.getElementById('rate-again-date'),
    rateGoodDate: document.getElementById('rate-good-date'),

    // Cloud Sync Modal
    modalCloudSync: document.getElementById('modal-cloud-sync'),
    btnCloseSyncModal: document.getElementById('btn-close-sync-modal'),
    modalSyncPulse: document.getElementById('modal-sync-pulse'),
    modalSyncStatusText: document.getElementById('modal-sync-status-text'),
    modalSyncLastTime: document.getElementById('modal-sync-last-time'),
    btnForcePush: document.getElementById('btn-force-push'),
    btnForcePull: document.getElementById('btn-force-pull'),
    syncUserIdInput: document.getElementById('sync-user-id-input'),
    btnCopySyncId: document.getElementById('btn-copy-sync-id'),
    firebaseConfigInput: document.getElementById('firebase-config-input'),
    syncShareBox: document.getElementById('sync-share-box'),
    syncShareUrlInput: document.getElementById('sync-share-url-input'),
    btnCopyShareUrl: document.getElementById('btn-copy-share-url'),
    btnDisconnectSync: document.getElementById('btn-disconnect-sync'),
    btnSaveSyncConfig: document.getElementById('btn-save-sync-config'),

    toastContainer: document.getElementById('toast-container')
  };

  // --- CALENDAR DATE & TIME HELPERS ---
  function getEndOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();
  }

  function isCardDue(card) {
    if (!card || !card.nextReviewDate) return true;
    return card.nextReviewDate <= getEndOfToday();
  }

  function formatDateDMY(timestamp) {
    if (!timestamp) return 'Chưa học';
    const d = new Date(timestamp);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatShortDate(timestamp) {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  }

  function formatDateTimeDMY(timestamp) {
    if (!timestamp) return 'Chưa học';
    const d = new Date(timestamp);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} lúc ${hours}:${mins}`;
  }

  function formatRelativeDue(timestamp) {
    if (!timestamp) return { text: 'Cần ôn ngay', status: 'due', isDue: true };
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const targetDate = new Date(timestamp);
    const targetStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
    
    const diffDays = Math.round((targetStart - todayStart) / MS_PER_DAY);
    const dateStr = formatDateDMY(timestamp);

    if (diffDays < 0) {
      return { text: `Quá hạn ${Math.abs(diffDays)} ngày (${dateStr})`, status: 'overdue', isDue: true };
    } else if (diffDays === 0) {
      return { text: `Hôm nay (${dateStr})`, status: 'due', isDue: true };
    } else if (diffDays === 1) {
      return { text: `Ngày mai (${dateStr})`, status: 'future', isDue: false };
    } else {
      return { text: `${dateStr} (sau ${diffDays} ngày)`, status: 'future', isDue: false };
    }
  }

  // --- STORAGE HELPERS (v6 with Deforestation & Desertification reading cards auto-merge) ---
  const STORAGE_KEY = 'minimal_flashcards_data_v6';
  const PREF_KEY = 'minimal_flashcards_pref_v1';

  function loadCardsFromStorage() {
    try {
      let stored = localStorage.getItem(STORAGE_KEY);
      // Auto-migrate from v5, v4 or v3 if present
      if (!stored) {
        const oldStored = localStorage.getItem('minimal_flashcards_data_v5') || localStorage.getItem('minimal_flashcards_data_v4') || localStorage.getItem('minimal_flashcards_data_v3');
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

    if (prefs.category && (prefs.category === 'words' || prefs.category === 'collocations' || prefs.category === 'speaking')) {
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

    const speakingView = document.getElementById('speaking-view');
    const intervalNav = document.querySelector('.interval-nav');
    const studyArea = document.getElementById('study-area');
    const studyModeSwitch = document.querySelector('.study-mode-switch');
    const spacedBadge = document.getElementById('spaced-due-badge');
    const navSpeakingBtn = document.getElementById('btn-nav-speaking');

    if (categoryKey === 'speaking') {
      el.currentCatName.textContent = 'Speaking AI';
      if (speakingView) speakingView.style.display = 'block';
      if (intervalNav) intervalNav.style.display = 'none';
      if (studyArea) studyArea.style.display = 'none';
      if (studyModeSwitch) studyModeSwitch.style.display = 'none';
      if (spacedBadge) spacedBadge.style.display = 'none';
      if (navSpeakingBtn) {
        navSpeakingBtn.classList.add('active-nav-speaking');
        navSpeakingBtn.innerHTML = '<span>Flashcards</span>';
        navSpeakingBtn.title = 'Quay về học Flashcard từ vựng & collocations';
      }
      if (window.speakingModule && typeof window.speakingModule.onActivate === 'function') {
        window.speakingModule.onActivate();
      }
      if (savePref) {
        saveUserPreferences({ category: categoryKey });
      }
      return;
    }

    // Otherwise Words or Collocations
    if (speakingView) speakingView.style.display = 'none';
    if (intervalNav) intervalNav.style.display = 'block';
    if (studyArea) studyArea.style.display = 'block';
    if (studyModeSwitch) studyModeSwitch.style.display = 'inline-flex';
    if (spacedBadge) spacedBadge.style.display = 'inline-flex';
    if (navSpeakingBtn) {
      navSpeakingBtn.classList.remove('active-nav-speaking');
      navSpeakingBtn.innerHTML = '<span>Speaking AI</span>';
      navSpeakingBtn.title = 'Mở tính năng luyện IELTS Speaking AI';
    }

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
      list = list.filter(c => isCardDue(c));
    } else if (['1', '4', '7', '14'].includes(state.currentFilter)) {
      const intVal = parseInt(state.currentFilter, 10);
      list = list.filter(c => c.interval === intVal);
    }

    return list;
  }

  function updateIntervalBadgeCounts() {
    if (!state.selectedCategory) return;
    const catCards = state.cards.filter(c => c.category === state.selectedCategory);

    const countAll = catCards.length;
    const countDue = catCards.filter(c => isCardDue(c)).length;
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

    // Box Level Info & Due Date Tag
    el.currentBoxTag.style.display = 'inline-flex';
    el.currentBoxText.textContent = `Hộp ${card.interval} ngày`;

    if (el.currentDueTag && el.currentDueText) {
      const dueInfo = formatRelativeDue(card.nextReviewDate);
      el.currentDueTag.className = `card-due-tag status-${dueInfo.status}`;
      el.currentDueText.textContent = dueInfo.text;
      el.currentDueTag.style.display = 'inline-flex';
    }

    // Next advance interval label & Rating Button Date Hints
    const nextInterval = getNextInterval(card.interval);
    el.btnAdvanceIntervalLabel.textContent = `+${nextInterval} ngày`;

    const now = Date.now();
    const dateAgainStr = formatShortDate(now + 1 * MS_PER_DAY);
    const dateGoodStr = formatShortDate(now + nextInterval * MS_PER_DAY);
    if (el.rateAgainDate) el.rateAgainDate.textContent = `(${dateAgainStr})`;
    if (el.rateGoodDate) el.rateGoodDate.textContent = `(${dateGoodStr})`;

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
    const now = Date.now();
    const nextDateGood = now + (nextDays * MS_PER_DAY);
    const nextDateAgain = now + (1 * MS_PER_DAY);
    const dateGoodStr = formatDateDMY(nextDateGood);
    const dateAgainStr = formatDateDMY(nextDateAgain);

    el.backNextReviewInfo.innerHTML = `
      <div class="review-date-detail" style="line-height:1.6;">
        <div>Chu kỳ tiếp theo nếu nhớ: <strong>+${nextDays} ngày</strong> (Hộp ${nextDays}d ➔ Hạn ôn: <strong>${dateGoodStr}</strong>)</div>
        <div style="font-size:0.85em; opacity:0.85; margin-top:3px;">Nếu quên / chưa nhớ: <strong>1 ngày</strong> (Hộp 1d ➔ Hạn ôn: <strong>${dateAgainStr}</strong>)</div>
        ${card.lastReviewed ? `<div style="font-size:0.8em; color:var(--text-tertiary); margin-top:4px;">Lần ôn gần nhất: ${formatDateTimeDMY(card.lastReviewed)}</div>` : ''}
      </div>
    `;
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
      originalCard.updatedAt = now;
      const targetDateStr = formatDateDMY(originalCard.nextReviewDate);
      showToast(`Đã nhớ! Thẻ chuyển sang hộp +${newInterval} ngày (Hạn ôn: ${targetDateStr})`);
    } else {
      originalCard.interval = 1;
      originalCard.boxLevel = 1;
      originalCard.nextReviewDate = now + (1 * MS_PER_DAY);
      originalCard.lastReviewed = now;
      originalCard.updatedAt = now;
      const targetDateStr = formatDateDMY(originalCard.nextReviewDate);
      showToast(`Chưa nhớ. Xếp lại vào Hộp 1 ngày (Hạn ôn: ${targetDateStr})`);
    }

    saveCardsToStorage(state.cards);
    syncModule.pushProgressToCloud();

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

    el.manageTableBody.innerHTML = list.map(c => {
      const dueInfo = formatRelativeDue(c.nextReviewDate);
      const lastReviewedStr = c.lastReviewed ? formatDateDMY(c.lastReviewed) : '<span style="color:var(--text-tertiary);">-</span>';

      return `
        <tr>
          <td><span class="card-type-chip">${c.category === 'words' ? 'Word' : 'Colloc'}</span></td>
          <td><strong>${c.english}</strong> ${c.ipa ? `<span style="font-size:0.8rem; color:var(--text-tertiary);">${c.ipa}</span>` : ''}</td>
          <td>${c.vietnamese}</td>
          <td><span class="pill-dot dot-${c.interval}"></span> Hộp ${c.interval}d</td>
          <td><span class="due-badge due-${dueInfo.status}">${dueInfo.text}</span></td>
          <td>${lastReviewedStr}</td>
          <td class="text-right">
            <button type="button" class="action-btn-sm" title="Sửa" onclick="window.editCardHandler('${c.id}')">Sửa</button>
            <button type="button" class="action-btn-sm delete text-danger" title="Xóa" onclick="window.deleteCardHandler('${c.id}')">Xóa</button>
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
    syncModule.pushProgressToCloud();
  }

  // --- REAL-TIME CLOUD SYNC MODULE (FIREBASE REALTIME DATABASE) ---
  const SYNC_STORAGE_KEY = 'minimal_flashcards_sync_v2';
  
  const syncModule = {
    app: null,
    db: null,
    dbRef: null,
    isSyncing: false,
    isConnected: false,
    lastRemoteTimestamp: 0,
    config: {
      userId: 'thanh_flashcards_2312',
      firebaseRaw: '',
      firebaseConfig: null,
      lastSyncTime: null
    },

    loadConfig() {
      try {
        const stored = localStorage.getItem(SYNC_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          this.config = { ...this.config, ...parsed };
        }
      } catch (e) {}

      // Hardcoded fallback / default from config.js (window.APP_CONFIG)
      if (window.APP_CONFIG) {
        if (window.APP_CONFIG.SYNC_USER_ID && (!this.config.userId || this.config.userId === 'thanh_flashcards_2312')) {
          this.config.userId = window.APP_CONFIG.SYNC_USER_ID;
        }
        const appFb = window.APP_CONFIG.FIREBASE_CONFIG || window.APP_CONFIG.FIREBASE_DATABASE_URL;
        if (appFb) {
          if (typeof appFb === 'string' && appFb.trim() && !appFb.includes('ten-du-an')) {
            this.config.firebaseRaw = appFb.trim();
            this.parseFirebaseConfig(appFb.trim());
          } else if (typeof appFb === 'object' && appFb.databaseURL && appFb.databaseURL.trim() && !appFb.databaseURL.includes('ten-du-an')) {
            this.config.firebaseConfig = { ...appFb };
            this.config.firebaseRaw = JSON.stringify(appFb, null, 2);
          }
        }
      }

      // Fast auto-setup via URL query param when opening on phone
      const urlParams = new URLSearchParams(window.location.search);
      const cfgParam = urlParams.get('sync_cfg');
      const userParam = urlParams.get('sync_id');
      if (userParam) this.config.userId = decodeURIComponent(userParam);
      if (cfgParam) {
        try {
          const decoded = atob(decodeURIComponent(cfgParam));
          this.config.firebaseRaw = decoded;
          this.parseFirebaseConfig(decoded);
          this.saveConfig();
          window.history.replaceState({}, document.title, window.location.pathname);
          setTimeout(() => showToast('Đã tự động nhận cấu hình Firebase cho thiết bị này!'), 800);
        } catch (e) {}
      }
    },

    saveConfig() {
      try {
        localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(this.config));
      } catch (e) {}
    },

    parseFirebaseConfig(input) {
      if (!input || typeof input !== 'string') return null;
      const clean = input.trim();
      
      // If it's a direct database URL like https://xyz-default-rtdb.firebaseio.com
      if (clean.startsWith('http://') || clean.startsWith('https://')) {
        this.config.firebaseConfig = {
          databaseURL: clean.replace(/\/$/, '')
        };
        return this.config.firebaseConfig;
      }

      try {
        let jsonStr = clean;
        if (jsonStr.includes('=')) {
          jsonStr = jsonStr.substring(jsonStr.indexOf('=') + 1).trim();
        }
        if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();
        const parsed = JSON.parse(jsonStr);
        if (parsed.databaseURL || parsed.apiKey || parsed.projectId) {
          if (!parsed.databaseURL && parsed.projectId) {
            parsed.databaseURL = `https://${parsed.projectId}-default-rtdb.firebaseio.com`;
          }
          this.config.firebaseConfig = parsed;
          return parsed;
        }
      } catch (e) {
        const dbUrlMatch = clean.match(/databaseURL\s*:\s*["']([^"']+)["']/i);
        const apiKeyMatch = clean.match(/apiKey\s*:\s*["']([^"']+)["']/i);
        const projMatch = clean.match(/projectId\s*:\s*["']([^"']+)["']/i);
        if (dbUrlMatch || projMatch) {
          const cfg = {
            databaseURL: dbUrlMatch ? dbUrlMatch[1] : `https://${projMatch[1]}-default-rtdb.firebaseio.com`,
            apiKey: apiKeyMatch ? apiKeyMatch[1] : undefined,
            projectId: projMatch ? projMatch[1] : undefined
          };
          this.config.firebaseConfig = cfg;
          return cfg;
        }
      }
      return null;
    },

    init() {
      this.loadConfig();
      this.updateUIStatus();
      if (this.config.firebaseConfig && window.firebase) {
        this.connect();
      }
    },

    connect() {
      if (!window.firebase || !this.config.firebaseConfig) return;
      try {
        this.setSyncingState(true, 'Đang kết nối...');
        if (!firebase.apps.length) {
          this.app = firebase.initializeApp(this.config.firebaseConfig);
        } else {
          this.app = firebase.app();
        }

        this.db = firebase.database();
        const safeUserId = encodeURIComponent(this.config.userId || 'thanh_flashcards_2312').replace(/\./g, '_');
        this.dbRef = this.db.ref(`users/${safeUserId}`);

        // Listen for realtime changes across devices
        this.dbRef.on('value', (snapshot) => {
          this.isConnected = true;
          this.setSyncingState(false, 'Đã đồng bộ');
          const data = snapshot.val();
          if (data && data.updatedAt) {
            this.handleRemoteUpdate(data);
          }
        }, (error) => {
          console.warn('Lỗi kết nối Firebase Realtime:', error);
          this.isConnected = false;
          this.setSyncingState(false, 'Lỗi kết nối', true);
        });

      } catch (err) {
        console.error('Không thể khởi tạo Firebase:', err);
        this.isConnected = false;
        this.setSyncingState(false, 'Lỗi cấu hình', true);
      }
    },

    disconnect() {
      if (this.dbRef) {
        this.dbRef.off();
      }
      this.isConnected = false;
      this.dbRef = null;
      this.config.firebaseConfig = null;
      this.config.firebaseRaw = '';
      this.saveConfig();
      this.updateUIStatus();
      showToast('Đã ngắt kết nối đồng bộ');
    },

    handleRemoteUpdate(remoteData) {
      if (!remoteData.updatedAt || remoteData.updatedAt <= this.lastRemoteTimestamp) return;
      this.lastRemoteTimestamp = remoteData.updatedAt;

      const lastLocalUpdate = state.cards.reduce((max, c) => Math.max(max, c.updatedAt || 0, c.lastReviewed || 0), 0);
      if (remoteData.updatedAt <= lastLocalUpdate) return;

      let hasChanges = false;
      const progressMap = remoteData.progress || {};

      state.cards.forEach(card => {
        const remoteCardProgress = progressMap[card.id];
        if (remoteCardProgress && (!card.updatedAt || remoteCardProgress.updatedAt > card.updatedAt)) {
          card.interval = remoteCardProgress.interval || card.interval;
          card.boxLevel = remoteCardProgress.boxLevel || card.boxLevel;
          card.nextReviewDate = remoteCardProgress.nextReviewDate || card.nextReviewDate;
          card.lastReviewed = remoteCardProgress.lastReviewed || card.lastReviewed;
          card.updatedAt = remoteCardProgress.updatedAt;
          hasChanges = true;
        }
      });

      // Also import any custom cards added from other device
      if (Array.isArray(remoteData.allCards) && remoteData.allCards.length > state.cards.length) {
        const localIds = new Set(state.cards.map(c => c.id));
        remoteData.allCards.forEach(rc => {
          if (!localIds.has(rc.id)) {
            state.cards.push(rc);
            hasChanges = true;
          }
        });
      }

      if (hasChanges) {
        saveCardsToStorage(state.cards);
        filterAndRenderCards();
        renderManageTable();
        updateCategoryCountsPreview();
        const deviceName = remoteData.device === 'phone' ? 'Điện thoại' : 'Máy tính';
        showToast(`Đã tự động đồng bộ tiến độ mới từ ${deviceName}!`);
      }
    },

    pushProgressToCloud(showNotify = false) {
      if (!this.dbRef || !this.isConnected) return;
      this.setSyncingState(true, 'Đang lưu...');

      const progress = {};
      state.cards.forEach(c => {
        progress[c.id] = {
          interval: c.interval,
          boxLevel: c.boxLevel,
          nextReviewDate: c.nextReviewDate,
          lastReviewed: c.lastReviewed || null,
          updatedAt: c.updatedAt || Date.now()
        };
      });

      const payload = {
        updatedAt: Date.now(),
        device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'phone' : 'pc',
        progress: progress,
        allCards: state.cards
      };

      this.dbRef.set(payload)
        .then(() => {
          this.lastRemoteTimestamp = payload.updatedAt;
          this.setSyncingState(false, 'Đã đồng bộ');
          if (showNotify) showToast('Đã đẩy toàn bộ tiến độ lên Cloud thành công!');
        })
        .catch(err => {
          console.warn('Lỗi lưu Firebase:', err);
          this.setSyncingState(false, 'Lỗi lưu', true);
          if (showNotify) showToast('Lỗi lưu Firebase: ' + err.message);
        });
    },

    pullFromCloud() {
      if (!this.dbRef) {
        showToast('Chưa kết nối Firebase!');
        return;
      }
      this.setSyncingState(true, 'Đang tải...');
      this.dbRef.once('value')
        .then(snapshot => {
          const data = snapshot.val();
          if (data && data.updatedAt) {
            this.lastRemoteTimestamp = 0; // force accept
            this.handleRemoteUpdate(data);
            showToast('Đã tải và áp dụng tiến độ từ Cloud!');
          } else {
            showToast('Cloud chưa có dữ liệu. Hãy bấm "Đẩy lên Cloud" để tạo bản lưu đầu tiên!');
          }
          this.setSyncingState(false, 'Đã đồng bộ');
        })
        .catch(err => {
          showToast('Lỗi tải từ Firebase: ' + err.message);
          this.setSyncingState(false, 'Lỗi kết nối', true);
        });
    },

    setSyncingState(isSyncing, labelText, isError = false) {
      this.isSyncing = isSyncing;
      if (el.syncStatusLabel) el.syncStatusLabel.textContent = labelText;
      if (el.modalSyncStatusText) el.modalSyncStatusText.textContent = labelText;

      const dot = el.syncStatusDot;
      const pulse = el.modalSyncPulse;
      [dot, pulse].forEach(d => {
        if (!d) return;
        d.className = d === dot ? 'sync-dot' : 'sync-status-pulse';
        if (isSyncing) d.classList.add('dot-syncing');
        else if (isError) d.classList.add('dot-offline');
        else if (this.isConnected) d.classList.add('dot-online');
        else d.classList.add('dot-offline');
      });
    },

    updateUIStatus() {
      const hasConfig = !!this.config.firebaseConfig;
      if (el.syncStatusLabel) {
        el.syncStatusLabel.textContent = hasConfig ? (this.isConnected ? 'Đã đồng bộ' : 'Đang kết nối') : 'Đồng bộ';
      }
      if (el.modalSyncStatusText) {
        el.modalSyncStatusText.textContent = hasConfig ? (this.isConnected ? 'Đã kết nối Realtime (Sẵn sàng)' : 'Đang kết nối...') : 'Chưa cấu hình Firebase';
      }
      if (el.syncUserIdInput) {
        el.syncUserIdInput.value = this.config.userId || 'thanh_flashcards_2312';
      }
      if (el.firebaseConfigInput) {
        el.firebaseConfigInput.value = this.config.firebaseRaw || (this.config.firebaseConfig ? JSON.stringify(this.config.firebaseConfig, null, 2) : '');
      }

      if (hasConfig && el.syncShareBox && el.syncShareUrlInput) {
        el.syncShareBox.style.display = 'block';
        const rawJson = this.config.firebaseRaw || JSON.stringify(this.config.firebaseConfig);
        const encodedCfg = encodeURIComponent(btoa(rawJson));
        const encodedId = encodeURIComponent(this.config.userId || 'thanh_flashcards_2312');
        const origin = window.location.origin + window.location.pathname;
        el.syncShareUrlInput.value = `${origin}?sync_id=${encodedId}&sync_cfg=${encodedCfg}`;
      } else if (el.syncShareBox) {
        el.syncShareBox.style.display = 'none';
      }
    }
  };

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
    if (el.btnSelectSpeaking) {
      el.btnSelectSpeaking.addEventListener('click', () => selectCategory('speaking'));
    }
    if (el.btnNavSpeaking) {
      el.btnNavSpeaking.addEventListener('click', () => {
        if (state.selectedCategory === 'speaking') {
          selectCategory('words');
        } else {
          selectCategory('speaking');
        }
      });
    }
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

    // Cloud Sync Modal events
    if (el.btnOpenSync) {
      el.btnOpenSync.addEventListener('click', () => {
        syncModule.updateUIStatus();
        el.modalCloudSync.style.display = 'flex';
      });
    }
    if (el.btnCloseSyncModal) {
      el.btnCloseSyncModal.addEventListener('click', () => {
        el.modalCloudSync.style.display = 'none';
      });
    }
    if (el.btnSaveSyncConfig) {
      el.btnSaveSyncConfig.addEventListener('click', () => {
        const raw = el.firebaseConfigInput.value.trim();
        const userId = el.syncUserIdInput.value.trim() || 'thanh_flashcards_2312';
        syncModule.config.userId = userId;
        syncModule.config.firebaseRaw = raw;
        const parsed = syncModule.parseFirebaseConfig(raw);
        if (!parsed) {
          showToast('Vui lòng nhập đúng JSON firebaseConfig hoặc Database URL!');
          return;
        }
        syncModule.saveConfig();
        syncModule.connect();
        syncModule.updateUIStatus();
        showToast('Đang kết nối Firebase Realtime Database...');
      });
    }
    if (el.btnDisconnectSync) {
      el.btnDisconnectSync.addEventListener('click', () => {
        syncModule.disconnect();
      });
    }
    if (el.btnForcePush) {
      el.btnForcePush.addEventListener('click', () => syncModule.pushProgressToCloud(true));
    }
    if (el.btnForcePull) {
      el.btnForcePull.addEventListener('click', () => syncModule.pullFromCloud());
    }
    if (el.btnCopySyncId) {
      el.btnCopySyncId.addEventListener('click', () => {
        navigator.clipboard.writeText(el.syncUserIdInput.value);
        showToast('Đã chép Sync ID');
      });
    }
    if (el.btnCopyShareUrl) {
      el.btnCopyShareUrl.addEventListener('click', () => {
        navigator.clipboard.writeText(el.syncShareUrlInput.value);
        showToast('Đã sao chép link đồng bộ cho điện thoại!');
      });
    }

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

    [el.modalCardForm, el.modalManageCards, el.modalCloudSync].forEach(backdrop => {
      if (!backdrop) return;
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.style.display = 'none';
      });
    });

    document.addEventListener('keydown', (e) => {
      const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

      if (e.key === 'Escape') {
        el.modalCardForm.style.display = 'none';
        el.modalManageCards.style.display = 'none';
        if (el.modalCloudSync) el.modalCloudSync.style.display = 'none';
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

  // --- EXPOSE PUBLIC BRIDGES FOR SPEAKING & EXTERNAL MODULES ---
  window.selectCategory = selectCategory;
  window.speakEnglish = speakEnglish;
  window.showToast = showToast;
  window.addCollocationCard = function (cardData) {
    const english = (cardData.english || '').trim();
    const vietnamese = (cardData.vietnamese || '').trim();
    const exampleEn = (cardData.exampleEn || '').trim();
    const exampleVi = (cardData.exampleVi || '').trim();
    const ipa = (cardData.ipa || '/collocation/').trim();

    if (!english) return false;

    // Build cloze frontText with __________
    let frontText = exampleEn;
    if (frontText) {
      const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'gi');
      if (regex.test(frontText)) {
        frontText = frontText.replace(regex, '__________');
      } else {
        frontText = `${exampleEn} (Chỗ trống: __________)`;
      }
    } else {
      frontText = `__________: ${vietnamese}`;
    }

    const newCard = {
      id: 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      category: 'collocations',
      english: english,
      ipa: ipa,
      vietnamese: vietnamese,
      frontText: frontText,
      exampleEn: exampleEn || english,
      context: exampleVi || vietnamese,
      acceptedAnswers: [english],
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    };

    state.cards.unshift(newCard);
    saveCardsToStorage(state.cards);
    updateCategoryCountsPreview();
    if (typeof syncModule !== 'undefined' && syncModule.syncCardsToCloud) {
      syncModule.syncCardsToCloud(state.cards);
    }
    showToast(`Đã lưu "${english}" vào Collocations Flashcards!`);
    return true;
  };

  // --- INITIALIZE SYNC MODULE ON INIT ---
  const originalInit = init;
  function wrappedInit() {
    originalInit();
    syncModule.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrappedInit);
  } else {
    wrappedInit();
  }

})();
