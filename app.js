/**
 * Minimal Flashcards Application
 * Categories: Words (Card 01 - 27) & Collocations (Card 28 - 53)
 * Spaced Repetition Intervals: 1, 4, 7, 14 days
 * Modes: Flip Card & Interactive Typing Quiz
 */

(function () {
  'use strict';

  // --- INTERVAL CONSTANTS (Days) ---
  const INTERVAL_LEVELS = [1, 4, 7, 14];
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // --- ALL 53 FLASHCARDS (WORDS & COLLOCATIONS) ---
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
      frontText: 'Many plants and animals thrive in an __________ environment rather than on dry land.',
      context: 'Water hyacinth (Eichhornia crassipes), an aquatic plant native to South America...',
      exampleEn: 'Many plants and animals thrive in an aquatic environment rather than on dry land.',
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
      frontText: 'Fallen trees began to __________ the flow of water in the canal, preventing boats from passing.',
      context: '...started obstructing major dams and rivers.',
      exampleEn: 'Fallen trees began to obstruct the flow of water in the canal, preventing boats from passing.',
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
      frontText: 'During the 19th century, thousands of European __________ settled in overseas territories.',
      context: 'In east Africa the plant arrived with Belgian colonists in Rwanda...',
      exampleEn: 'During the 19th century, thousands of European colonists settled in overseas territories.',
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
      frontText: 'The flower has pale, __________ petals that bruise easily in heavy rain.',
      context: '...who liked the look of its glossy leaves and delicate purple flowers...',
      exampleEn: 'The flower has pale, delicate petals that bruise easily in heavy rain.',
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
      frontText: 'The tropical plant has thick, __________ green leaves that shine under sunlight.',
      context: '...who liked the look of its glossy leaves and delicate purple flowers...',
      exampleEn: 'The tropical plant has thick, glossy green leaves that shine under sunlight.',
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
      frontText: 'When an invasive species enters an ecosystem with no natural __________, its population can explode unchecked.',
      context: 'There, with no natural predators and perfect temperature conditions...',
      exampleEn: 'When an invasive species enters an ecosystem with no natural predators, its population can explode unchecked.',
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
      frontText: 'In dense fog, sailors found it extremely difficult to __________ through the narrow channel.',
      context: '...as the boats that once brought the fish to shore by the hundreds struggle to navigate through the mass of plants.',
      exampleEn: 'In dense fog, sailors found it extremely difficult to navigate through the narrow channel.',
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
      frontText: 'Changes in birth rates have significantly altered the country\'s __________ profile.',
      context: '...Kenya\'s latest demographic and health survey shows.',
      exampleEn: 'Changes in birth rates have significantly altered the country\'s demographic profile.',
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
      frontText: 'The festival is held __________ in October, drawing thousands of visitors each year.',
      context: 'The World Health Organization estimates that about 14,300 Kenyans die annually as a result of indoor air pollution...',
      exampleEn: 'The festival is held annually in October, drawing thousands of visitors each year.',
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
      frontText: 'Bacteria accelerate the process of breaking down __________ plant matter into organic compost.',
      context: 'But buried in those decaying waxy leaves was a renewable energy gold mine.',
      exampleEn: 'Bacteria accelerate the process of breaking down decaying plant matter into organic compost.',
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
      frontText: 'In autumn, the dense forest __________ turns from vibrant green to deep shades of amber and red.',
      context: '...its foliage also contains a high ratio of carbon to nitrogen.',
      exampleEn: 'In autumn, the dense forest foliage turns from vibrant green to deep shades of amber and red.',
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
      frontText: 'The speaker\'s extraordinary storytelling managed to __________ the audience for two straight hours.',
      context: 'It\'s a magic combination that has captivated researchers\' imaginations...',
      exampleEn: 'The speaker\'s extraordinary storytelling managed to captivate the audience for two straight hours.',
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
      frontText: 'Several leading university __________ published a paper proposing new clean energy models.',
      context: 'In 2014, Nigerian academics announced they had got better yields of biofuel gas...',
      exampleEn: 'Several leading university academics published a paper proposing new clean energy models.',
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
      frontText: 'Modern fertilizers have allowed farmers to achieve significantly higher crop __________ per acre.',
      context: '...announced they had got better yields of biofuel gas...',
      exampleEn: 'Modern fertilizers have allowed farmers to achieve significantly higher crop yields per acre.',
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
      frontText: 'Organic gardeners often spread animal __________ over the soil to enrich its nutrients.',
      context: '...when they mixed the plant with chicken manure.',
      exampleEn: 'Organic gardeners often spread animal manure over the soil to enrich its nutrients.',
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
      frontText: 'Before publishing the paper, the researcher asked her academic __________ to review the methodology.',
      context: 'Kenyan scientists confirmed what their Nigerian peers and others had already found...',
      exampleEn: 'Before publishing the paper, the researcher asked her academic peers to review the methodology.',
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
      frontText: 'Air pollution and traffic congestion represent dual __________ to modern urban living.',
      context: 'The project promised a two-for-one solution to the dual menaces of the water hyacinth and dependence on firewood.',
      exampleEn: 'Air pollution and traffic congestion represent dual menaces to modern urban living.',
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
      frontText: 'Dried cow __________ is traditionally burned as fuel in some rural communities.',
      context: '...transform a mix of water hyacinth and cow dung into biogas for cooking.',
      exampleEn: 'Dried cow dung is traditionally burned as fuel in some rural communities.',
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
      frontText: 'Yeast is essential in bread-making because it drives the natural __________ of sugars into alcohol and carbon dioxide.',
      context: '...it goes through a fermentation process and breaks down...',
      exampleEn: 'Yeast is essential in bread-making because it drives the natural fermentation of sugars into alcohol and carbon dioxide.',
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
      frontText: 'High energy tariffs have increased monthly costs for ordinary __________ households.',
      context: 'It is used in domestic stoves and for other household tasks...',
      exampleEn: 'High energy tariffs have increased monthly costs for ordinary domestic households.',
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
      frontText: 'Boiling water is one of the simplest methods to __________ contaminated surface water.',
      context: '...for other household tasks such as purifying water and incubating chicks.',
      exampleEn: 'Boiling water is one of the simplest methods to purify contaminated surface water.',
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
      frontText: 'Birds sit on their eggs for several weeks to __________ them at a steady body temperature.',
      context: '...such as purifying water and incubating chicks.',
      exampleEn: 'Birds sit on their eggs for several weeks to incubate them at a steady body temperature.',
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
      frontText: 'The local charity runs a social __________ that employs young people in farming.',
      context: 'As a result, they\'re able to make more money for their families from other enterprises.',
      exampleEn: 'The local charity runs a social enterprise that employs young people in farming.',
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
      frontText: 'It was a huge __________ to hear that everyone survived the accident without severe injuries.',
      context: '...gathering firewood, which is a great relief.',
      exampleEn: 'It was a huge relief to hear that everyone survived the accident without severe injuries.',
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
      frontText: 'Inhaling fine dust particles daily causes serious chronic __________ illnesses in industrial cities.',
      context: '...families who switch to the smokeless cooking method could expect fewer respiratory diseases.',
      exampleEn: 'Inhaling fine dust particles daily causes serious chronic respiratory illnesses in industrial cities.',
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
      frontText: 'Elderly individuals and young infants are particularly __________ to seasonal viral infections.',
      context: 'Women, young girls and children are particularly vulnerable because they are the ones who cook...',
      exampleEn: 'Elderly individuals and young infants are particularly vulnerable to seasonal viral infections.',
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
      frontText: 'The government launched a subsidy program to improve the __________ of solar home batteries.',
      context: 'Kanyiva says affordability is a challenge worth addressing...',
      exampleEn: 'The government launched a subsidy program to improve the affordability of solar home batteries.',
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
      frontText: 'After landing on the coast, the travelers slowly __________ their __________ toward the capital city.',
      context: '...escaped out of the country via the Kagera river and made its way downstream to Lake Victoria.',
      exampleEn: 'After landing on the coast, the travelers slowly made their way toward the capital city.',
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
      frontText: 'Factory workers should avoid __________ in toxic fumes by wearing filtered masks.',
      context: 'And each day as they cook, they breathe in the thick, grey smoke.',
      exampleEn: 'Factory workers should avoid breathing in toxic fumes by wearing filtered masks.',
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
      frontText: 'Although the project seemed like a total disaster initially, it __________ out to be an enormous success.',
      context: 'It turns out the floating plant isn\'t just good at spreading - its foliage also contains a high ratio...',
      exampleEn: 'Although the project seemed like a total disaster initially, it turned out to be an enormous success.',
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
      frontText: 'The local university canteen is designed to __________ for over two thousand hungry students at lunchtime.',
      context: 'Just about 4kg of the dried plant would be enough to cater for a large family\'s daily energy needs...',
      exampleEn: 'The local university canteen is designed to cater for over two thousand hungry students at lunchtime.',
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
      frontText: 'In the compost pit, natural microorganisms help organic waste to __________ down into nutrient-rich soil.',
      context: '...it goes through a fermentation process and breaks down, giving off gas...',
      exampleEn: 'In the compost pit, natural microorganisms help organic waste to break down into nutrient-rich soil.',
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
      frontText: 'Decaying organic material in warm landfill sites begins to __________ off large volumes of methane gas.',
      context: '...giving off gas that comes out the other end.',
      exampleEn: 'Decaying organic material in warm landfill sites begins to give off large volumes of methane gas.',
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
      frontText: 'Many drivers decided to __________ to electric vehicles after petrol prices rose sharply.',
      context: '...families who switch to the smokeless cooking method could expect fewer respiratory diseases.',
      exampleEn: 'Many drivers decided to switch to electric vehicles after petrol prices rose sharply.',
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
      frontText: 'Instead of spending hours on manual chores, she prefers to __________ her spare time to studying foreign languages.',
      context: 'Besides, they don\'t have to devote a lot of time every day to gathering firewood...',
      exampleEn: 'Instead of spending hours on manual chores, she prefers to devote her spare time to studying foreign languages.',
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
      frontText: 'Starting a small online bakery helped her family __________ in an extra $500 each month.',
      context: '...they can focus on different tasks that bring in money',
      exampleEn: 'Starting a small online bakery helped her family bring in an extra $500 each month.',
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
      frontText: 'Untreated industrial waste dumped into local rivers __________ a grave danger to community health.',
      context: '...given the huge health and environmental dangers posed by \'dirty\' fuels...',
      exampleEn: 'Untreated industrial waste dumped into local rivers poses a grave danger to community health.',
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
      frontText: 'High rent was a problem, but finding qualified staff was certainly not the restaurant owner\'s only __________.',
      context: 'But water hyacinth isn\'t their only headache.',
      exampleEn: 'High rent was a problem, but finding qualified staff was certainly not the restaurant owner\'s only headache.',
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
      frontText: 'That old warehouse full of vintage car parts proved to be a real financial __________ for the mechanics.',
      context: 'But buried in those decaying waxy leaves was a renewable energy gold mine.',
      exampleEn: 'That old warehouse full of vintage car parts proved to be a real financial gold mine for the mechanics.',
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
      frontText: 'The government lowered corporate tax rates in an __________ to stimulate domestic investment.',
      context: '...villagers had taken out of the water in an attempt to clear it...',
      exampleEn: 'The government lowered corporate tax rates in an attempt to stimulate domestic investment.',
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
      frontText: 'Street food vendors serving steaming bowls of noodles are a __________ sight on the sidewalks of Hanoi.',
      context: '...huge piles of water hyacinth... were a common sight.',
      exampleEn: 'Street food vendors serving steaming bowls of noodles are a common sight on the sidewalks of Hanoi.',
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
      frontText: 'The mysterious concept of deep-space travel has long captivated the __________ of science fiction authors.',
      context: 'It\'s a magic combination that has captivated researchers\' imaginations...',
      exampleEn: 'The mysterious concept of deep-space travel has long captivated the imagination of science fiction authors.',
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
      frontText: 'Wind and solar systems can provide a viable and effective __________ to burning coal for electricity.',
      context: 'The project is testing whether biogas can provide an effective alternative to firewood and charcoal...',
      exampleEn: 'Wind and solar systems can provide a viable and effective alternative to burning coal for electricity.',
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
      frontText: 'In many developing nations, the soaring cost of private healthcare remains far beyond the __________ of impoverished families.',
      context: '...the price of the digesters is beyond the reach of most villages',
      exampleEn: 'In many developing nations, the soaring cost of private healthcare remains far beyond the reach of impoverished families.',
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
      frontText: 'Finding ways to recycle lithium-ion batteries is a difficult challenge, but it is certainly a problem worth __________.',
      context: 'Kanyiva says affordability is a challenge worth addressing...',
      exampleEn: 'Finding ways to recycle lithium-ion batteries is a difficult challenge, but it is certainly a problem worth addressing.',
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
      frontText: 'If reforestation projects are not carried out on a __________ scale, global warming will accelerate.',
      context: 'If biogas could become affordable on a large scale...',
      exampleEn: 'If reforestation projects are not carried out on a large scale, global warming will accelerate.',
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
      frontText: 'Winning a university scholarship to study abroad was a truly __________ experience for the young student.',
      context: '...she says it \'would be life-changing for millions on the African continent and beyond\'.',
      exampleEn: 'Winning a university scholarship to study abroad was a truly life-changing experience for the young student.',
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
      frontText: 'Cargo ships transport finished goods from East Asia to Europe __________ the Suez Canal.',
      context: '...escaped out of the country via the Kagera river and made its way downstream...',
      exampleEn: 'Cargo ships transport finished goods from East Asia to Europe via the Suez Canal.',
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
      frontText: 'Historical records show that people in this valley practiced crop rotation as __________ as the twelfth century.',
      context: '...captivated researchers\' imaginations since as early as the 1980s...',
      exampleEn: 'Historical records show that people in this valley practiced crop rotation as early as the twelfth century.',
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
      frontText: 'The new bus network is faster than the old train. __________, tickets are considerably cheaper.',
      context: 'Besides, they don\'t have to devote a lot of time every day to gathering firewood...',
      exampleEn: 'The new bus network is faster than the old train. Besides, tickets are considerably cheaper.',
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
      frontText: 'Heavy flooding destroyed local road networks. As a __________, food supplies could not reach the town for days.',
      context: 'As a result, they\'re able to make more money for their families from other enterprises.',
      exampleEn: 'Heavy flooding destroyed local road networks. As a result, food supplies could not reach the town for days.',
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
      frontText: '__________ the high level of air pollution in the valley, respiratory illnesses are unusually common.',
      context: '...a challenge worth addressing, given the huge health and environmental dangers posed by \'dirty\' fuels...',
      exampleEn: 'Given the high level of air pollution in the valley, respiratory illnesses are unusually common.',
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
      frontText: 'The success of this clean water project will bring positive impacts to families in this region and __________.',
      context: '...life-changing for millions on the African continent and beyond.',
      exampleEn: 'The success of this clean water project will bring positive impacts to families in this region and beyond.',
      acceptedAnswers: ['beyond', 'and beyond'],
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

  // --- STORAGE HELPERS (v2 ensures existing users immediately get the new 53 cards) ---
  const STORAGE_KEY = 'minimal_flashcards_data_v2';
  const PREF_KEY = 'minimal_flashcards_pref_v1';

  function loadCardsFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu từ localStorage', e);
    }
    // Default to the 53 fresh cards
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

    // FRONT: Displays the cloze / test sentence (No hints, as requested!)
    el.frontPromptLabel.textContent = 'ĐIỀN TỪ VÀO CHỖ TRỐNG (MẶT TRƯỚC)';
    el.frontVietnamese.textContent = card.frontText || card.vietnamese || '...';
    el.frontContextHint.textContent = ''; // Absolutely no hints added

    // BACK: Displays the Target answer, IPA, meaning and context
    el.backEnglish.textContent = card.english || '';
    el.backIpa.textContent = card.ipa || '';
    el.backMeaning.innerHTML = `<strong>Ý nghĩa:</strong> ${card.vietnamese || ''}`;

    if (card.context || card.exampleEn) {
      el.backExampleWrapper.style.display = 'block';
      const labelElem = el.backExampleWrapper.querySelector('.example-label');
      if (labelElem) labelElem.textContent = 'NGỮ CẢNH TRONG BÀI ĐỌC';

      el.backExampleEn.textContent = card.context ? `"${card.context}"` : card.exampleEn;
      el.backExampleVi.textContent = card.exampleEn !== card.context ? `Câu đầy đủ: ${card.exampleEn}` : '';
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
    
    // In typing mode: show the cloze sentence clearly
    el.typePromptMeaning.textContent = card.frontText || card.vietnamese || '';
    el.typeClozeHint.style.display = 'none'; // No hints added

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
    
    // Targets: exact target english word, plus all accepted answer forms (singular/plural/phrases)
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
    if (!confirm('Khôi phục lại danh mục flashcard mẫu ban đầu (53 thẻ)?')) return;
    state.cards = JSON.parse(JSON.stringify(DEFAULT_CARDS));
    saveCardsToStorage(state.cards);
    showToast('Đã khôi phục toàn bộ 53 thẻ bài học');
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
