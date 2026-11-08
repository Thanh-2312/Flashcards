/**
 * LỘ TRÌNH HỌC TỪ ĐẦU • WRITING & SPEAKING
 * Bài học từ dễ đến khó, theo các cách nhiều nguồn luyện thi cùng khuyên:
 * - Writing: câu đúng → hiểu đề, lên ý → đoạn PEEL → mở bài, kết luận → bài hoàn chỉnh từng dạng → Task 1
 * - Speaking: phát âm, nói đuổi → Part 1 (trả lời + lý do + ví dụ) → Part 2 (1 phút ghi chú, bố cục 2 phút)
 *   → Part 3 (quan điểm – lý do – ví dụ – mặt khác)
 * Tiến độ lưu trong lịch học (todayModule) nên đồng bộ giữa các máy; bài nháp chỉ lưu trên máy.
 * Khi có bài giảng video của giáo viên (teacher_course.js) thì đó là lộ trình chính, bộ bài dưới đây thành mục "Nâng cao".
 */
(function () {
  'use strict';

  const DRAFT_KEY = 'ielts_course_drafts_v1';

  // ---------- WRITING (Academic) ----------
  const WRITING = [
    {
      id: 'w01', unit: 'Nền móng', minutes: 20, title: 'IELTS Writing gồm những gì?',
      goal: 'Biết 2 phần thi, thời gian, số từ và 4 tiêu chí chấm điểm.',
      points: [
        'Bài Writing (Academic) dài 60 phút, gồm 2 phần: Task 1 mô tả bảng/biểu đồ (ít nhất 150 từ, nên dành 20 phút) và Task 2 viết bài luận (ít nhất 250 từ, nên dành 40 phút).',
        'Task 2 tính điểm gấp đôi Task 1, vì vậy lộ trình này học Task 2 trước.',
        '4 tiêu chí ngang điểm nhau: Trả lời đúng đề; Mạch lạc & liên kết; Từ vựng; Ngữ pháp.',
        'Band 6–7 không đòi hỏi từ khó. Người chấm cần: trả lời đúng câu hỏi, ý rõ ràng có giải thích, bố cục rõ, ít lỗi.',
        'Viết thiếu số từ hoặc lạc đề bị trừ điểm nặng ở tiêu chí đầu tiên.'
      ],
      examples: [
        { kind: 'note', text: 'Ví dụ đề Task 2: "Online courses will soon replace traditional classroom learning. To what extent do you agree or disagree?"' },
        { kind: 'note', text: 'Ví dụ đề Task 1: "The table below shows how workers in one city travelled to work in 2004 and 2024. Summarise the information…"' }
      ],
      practice: {
        type: 'write', rows: 5,
        task: 'Viết 3 câu tiếng Anh giới thiệu bản thân: tên, nơi bạn sống và lý do bạn học IELTS. Mỗi câu phải có chủ ngữ và động từ.',
        check: 'three complete sentences, each with a subject and a correctly formed verb; basic grammar and spelling'
      }
    },
    {
      id: 'w02', unit: 'Nền móng', minutes: 25, title: 'Câu đơn đúng ngữ pháp',
      goal: 'Viết câu đơn đúng: Chủ ngữ + Động từ (+ Tân ngữ), chia động từ đúng.',
      points: [
        'Mỗi câu tiếng Anh cần ít nhất 1 chủ ngữ và 1 động từ đã chia: "Technology changes our lives."',
        'Bài luận dùng chủ yếu thì hiện tại đơn để nói sự thật chung: "People use smartphones every day."',
        'Chủ ngữ số ít (it, technology, a person) → động từ thêm -s/-es: "Technology makes life easier." Chủ ngữ số nhiều → không thêm: "Many people work from home."',
        'Khi nói chung về một nhóm, dùng danh từ số nhiều: "Students need…", không viết "Student need…".',
        'Lỗi người Việt hay gặp: thiếu "to be" ("Life is busy", không phải "Life busy") và quên -s ở động từ hoặc danh từ.'
      ],
      examples: [
        { kind: 'bad', text: 'Many student uses phone in class.' },
        { kind: 'good', text: 'Many students use phones in class.' },
        { kind: 'bad', text: 'Online learning very convenient.' },
        { kind: 'good', text: 'Online learning is very convenient.' },
        { kind: 'bad', text: 'Technology make people lazy.' },
        { kind: 'good', text: 'Technology makes people lazy.' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Viết 5 câu đơn về chủ đề "Technology", dùng thì hiện tại đơn: ít nhất 2 câu có chủ ngữ số ít và 2 câu có chủ ngữ số nhiều.',
        check: 'present simple, subject–verb agreement (third person -s), plural nouns for general statements, every sentence has a verb'
      }
    },
    {
      id: 'w03', unit: 'Nền móng', minutes: 30, title: 'Nối ý thành câu dài hơn',
      goal: 'Dùng liên từ để tạo câu ghép và câu phức, một yêu cầu để lên band 6.',
      points: [
        'Câu ghép: nối 2 câu đơn bằng and, but, so: "Cities are crowded, so many people move to the suburbs."',
        'Câu phức dùng because, although, when, if: "Although online courses are cheap, many students prefer classrooms."',
        'Dùng which/who để thêm thông tin: "Public transport, which is cheap, reduces traffic."',
        'Mỗi câu chỉ nên có 1–2 mệnh đề phụ; câu quá dài dễ sai.',
        'Tiêu chí Ngữ pháp chấm sự kết hợp câu đơn và câu phức, không cần toàn câu dài.'
      ],
      examples: [
        { kind: 'note', text: 'Cars cause pollution. Many cities ban cars in the centre.' },
        { kind: 'good', text: 'Because cars cause pollution, many cities ban them in the centre.' },
        { kind: 'note', text: 'Working from home saves time. It can make people feel lonely.' },
        { kind: 'good', text: 'Although working from home saves time, it can make people feel lonely.' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Nối từng cặp câu thành 1 câu, dùng because, although, so, if hoặc which:',
        items: [
          '1) Fast food is cheap. It is unhealthy.',
          '2) The government builds more parks. People can exercise more.',
          '3) Many young people move to cities. Cities have more jobs.',
          '4) Reading books improves vocabulary. Children should read every day.'
        ],
        check: 'each pair joined into one correct sentence with a suitable conjunction (because, although, so, if, which); logical meaning; punctuation'
      }
    },
    {
      id: 'w04', unit: 'Nền móng', minutes: 25, title: 'Từ nối giúp bài mạch lạc',
      goal: 'Dùng từ nối để người đọc theo được ý: thêm ý, đối lập, kết quả, ví dụ.',
      points: [
        'Thêm ý: Firstly, In addition, Moreover. Đối lập: However, On the other hand.',
        'Kết quả: As a result, Therefore, This means that. Ví dụ: For example, For instance, such as.',
        'Kết luận: In conclusion, To sum up.',
        'Không mở đầu mọi câu bằng từ nối: dùng quá nhiều bị chấm là máy móc. 2–3 từ nối trong một đoạn là đủ.'
      ],
      examples: [
        { kind: 'model', text: 'Firstly, public transport reduces traffic. When more people take buses and trains, there are fewer cars on the roads. As a result, journeys become faster and the air becomes cleaner. For example, the new metro line in Hanoi has taken thousands of motorbikes off the roads every day.' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Viết 4–5 câu về lợi ích của việc học ngoại ngữ, dùng ít nhất 3 từ nối khác nhau (ví dụ Firstly, For example, As a result).',
        check: 'at least three different linking words used correctly and naturally (not one in every sentence); clear logical flow; grammar'
      }
    },
    {
      id: 'w05', unit: 'Task 2: hiểu đề & lên ý', minutes: 25, title: '5 dạng đề Task 2',
      goal: 'Nhận ra dạng đề trong 30 giây và biết đề yêu cầu trả lời những gì.',
      points: [
        'Đồng ý/Không đồng ý ("To what extent do you agree or disagree?"): nêu rõ mức độ đồng ý và giữ nhất quán cả bài.',
        'Thảo luận 2 quan điểm ("Discuss both views and give your own opinion"): nói cả 2 quan điểm và ý kiến riêng của bạn.',
        'Lợi ích – Bất lợi: nếu đề hỏi "Do the advantages outweigh the disadvantages?" thì phải nói bên nào lớn hơn.',
        'Nguyên nhân/Vấn đề – Giải pháp: trả lời đủ cả 2 vế.',
        'Câu hỏi kép: đề có 2 câu hỏi riêng, mỗi thân bài trả lời 1 câu.',
        'Quy tắc vàng: gạch chân chủ đề và mọi câu hỏi trong đề. Bỏ sót 1 vế là mất điểm tiêu chí Trả lời đề.'
      ],
      examples: [
        { kind: 'model', text: 'Đề: "Some people believe that university education should be free. To what extent do you agree or disagree?"\n→ Chủ đề: học đại học miễn phí\n→ Dạng: Đồng ý/Không đồng ý\n→ Phải trả lời: mình đồng ý đến mức nào và vì sao.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Với mỗi đề, ghi dạng đề và những điều bài viết phải trả lời (viết tiếng Việt):',
        items: [
          'A) Many people now work from home for at least part of the week. Do the advantages of this trend outweigh the disadvantages?',
          'B) Plastic waste is increasing in many countries. What are the causes of this problem, and what measures could be taken to reduce it?',
          'C) Some employers prefer to hire people with university degrees, while others value work experience more highly. Discuss both views and give your own opinion.',
          'D) In many countries, young people are leaving rural areas to find work in cities. Why is this happening? Is it a positive or negative development?'
        ],
        check: 'for each prompt A–D: the correct essay type (A advantages outweigh disadvantages, B causes and solutions, C discuss both views + opinion, D two-part question) and every part of the question that must be answered; the student may write in Vietnamese'
      }
    },
    {
      id: 'w06', unit: 'Task 2: hiểu đề & lên ý', minutes: 30, title: 'Nghĩ ra ý trong 3 phút',
      goal: 'Luôn có ý để viết, kể cả với chủ đề lạ.',
      points: [
        'Liệt kê nhanh: viết mọi ý nghĩ ra trong 2 phút (tiếng Việt cũng được), rồi chọn 2 ý mạnh nhất.',
        'Đặt câu hỏi 5W+H: Ai được lợi, ai bị hại? Vì sao? Hậu quả là gì? Nếu cứ tiếp tục thì sao?',
        'Nghĩ theo các góc nhìn: tiền bạc, sức khoẻ, thời gian, giáo dục, gia đình – xã hội, môi trường.',
        'Tưởng tượng đang nói chuyện với một người bạn về chủ đề này: bạn sẽ nói gì?',
        'Ý tốt không cần "hay". Nó cần đúng câu hỏi, giải thích được và có ví dụ.',
        'Chỉ chọn 2 ý: phát triển sâu 2 ý tốt hơn liệt kê 5 ý. Liệt kê nhiều ý mà không giải thích là lý do phổ biến khiến bài dừng ở band 6.'
      ],
      examples: [
        { kind: 'model', text: 'Đề: làm việc ở nhà – lợi nhiều hơn hại không?\nLiệt kê: tiết kiệm thời gian đi lại · linh hoạt giờ giấc · ít khói xe · cô đơn · khó tập trung ở nhà · khó làm việc nhóm\nChọn: Lợi = tiết kiệm thời gian và tiền đi lại · Hại = cô đơn, ít làm việc nhóm\nQuan điểm: lợi nhiều hơn hại.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Đề: "Plastic waste is increasing in many countries. What are the causes of this problem, and what measures could be taken to reduce it?" Liệt kê ít nhất 5 ý (nguyên nhân và giải pháp), rồi chọn 1 nguyên nhân và 1 giải pháp mạnh nhất và nói vì sao bạn chọn (tiếng Việt hoặc tiếng Anh).',
        check: 'at least five relevant ideas covering both causes and solutions; one cause and one matching solution chosen with a sensible reason; the student may write in Vietnamese'
      }
    },
    {
      id: 'w07', unit: 'Task 2: hiểu đề & lên ý', minutes: 25, title: 'Câu chủ đề (topic sentence)',
      goal: 'Mở đầu mỗi đoạn thân bài bằng 1 câu nêu rõ ý chính và trả lời đúng đề.',
      points: [
        'Câu chủ đề = chủ đề + ý chính của đoạn.',
        'Người chấm đọc câu đầu mỗi đoạn để biết bạn có trả lời đúng câu hỏi không.',
        'Câu chủ đề ngắn, rõ, chưa cần ví dụ hay giải thích.',
        'Mẫu hay dùng: "One major advantage of … is that …", "One reason why … is that …", "Another problem is that …", "One effective solution would be to …".'
      ],
      examples: [
        { kind: 'bad', text: 'Nowadays, technology is everywhere.', vi: 'Không nêu ý chính của đoạn.' },
        { kind: 'good', text: 'One major benefit of online learning is that students can study at their own pace.' },
        { kind: 'good', text: 'One effective solution would be to charge customers for every plastic bag they use.' }
      ],
      practice: {
        type: 'write', rows: 4,
        task: 'Viết 2 câu chủ đề cho đề rác thải nhựa ở bài trước: 1 câu nêu một nguyên nhân, 1 câu nêu một giải pháp.',
        check: 'two clear topic sentences (one cause, one solution) that state the main idea directly and answer the question; no examples needed; grammar'
      }
    },
    {
      id: 'w08', unit: 'Task 2: viết từng đoạn', minutes: 35, title: 'Đoạn thân bài theo PEEL',
      goal: 'Viết một đoạn thân bài 5–6 câu, phát triển sâu một ý.',
      points: [
        'P – Point: câu chủ đề nêu ý chính.',
        'E – Explain: 1–2 câu giải thích vì sao, như thế nào. Phần này quyết định band 7.',
        'E – Example: 1 ví dụ cụ thể (một tình huống, một nhóm người, một kết quả).',
        'L – Link: 1 câu chốt lại, nối về câu hỏi của đề.',
        'Mỗi đoạn chỉ 1 ý chính, dài khoảng 80–100 từ.'
      ],
      examples: [
        { kind: 'model', text: '[Point] One major advantage of working from home is that employees save a great deal of time. [Explain] Without a daily commute, they no longer spend one or two hours in traffic, so they can use this time to rest, exercise or be with their families. This also means they start work less tired and more focused. [Example] For example, an office worker in Ho Chi Minh City who used to spend 90 minutes on the road every day can now begin work fresh and finish earlier. [Link] Therefore, remote work can improve both productivity and quality of life.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Dùng PEEL viết 1 đoạn thân bài (5–6 câu) cho ý: "Public transport should be cheaper because it reduces traffic."',
        check: 'PEEL structure: a clear topic sentence, explanation of how/why, one specific example, a linking sentence; one main idea only; around 80–100 words; grammar'
      }
    },
    {
      id: 'w09', unit: 'Task 2: viết từng đoạn', minutes: 30, title: 'Giải thích sâu & ví dụ cụ thể',
      goal: 'Biến một ý chung chung thành ý rõ ràng, có lập luận. Đây là khác biệt giữa band 6 và band 7.',
      points: [
        'Với ý chung chung như "Social media is bad for teenagers", hãy hỏi tiếp: Vì sao? Dẫn tới gì? Ai bị ảnh hưởng?',
        'Dùng chuỗi lập luận: because … → this means … → as a result …',
        'Ví dụ tốt phải cụ thể và đúng với ý. Có thể là tình huống quen thuộc ("many students in Vietnam…"), không cần số liệu thật.',
        'Tránh: ví dụ cá nhân quá dài, số liệu bịa quá chính xác, nhiều ví dụ cho cùng một ý.'
      ],
      examples: [
        { kind: 'bad', text: 'Fast food is unhealthy. It causes many problems. So people should eat less fast food.' },
        { kind: 'good', text: 'Fast food is often high in sugar, salt and fat. When people eat it regularly, they are more likely to gain weight and develop diseases such as diabetes. As a result, they may face expensive medical bills later in life. For instance, office workers who buy burgers for lunch every day often find it hard to control their weight.' }
      ],
      practice: {
        type: 'write', rows: 7,
        task: 'Viết lại đoạn yếu sau cho sâu hơn (thêm giải thích và một ví dụ cụ thể): "Reading books is good for children. It helps them a lot. Parents should encourage reading."',
        check: 'the idea is explained with a clear chain of reasoning (why/how/result) and supported by one specific, relevant example; not a list of new ideas; grammar'
      }
    },
    {
      id: 'w10', unit: 'Task 2: viết từng đoạn', minutes: 25, title: 'Mở bài 2 câu',
      goal: 'Viết mở bài trong 3 phút: diễn đạt lại đề rồi nêu quan điểm.',
      points: [
        'Câu 1 diễn đạt lại đề (paraphrase): đổi từ đồng nghĩa và cấu trúc, giữ nguyên ý. Không chép nguyên đề.',
        'Câu 2 là câu luận điểm (thesis): trả lời thẳng câu hỏi và báo trước 2 ý chính.',
        'Cách paraphrase: đổi từ (people → individuals, nowadays → these days), đổi loại từ (benefit → beneficial), đổi chủ động ↔ bị động.',
        'Mở bài chỉ khoảng 40–50 từ. Không viết câu chung chung kiểu "Technology is a hot topic nowadays."'
      ],
      examples: [
        { kind: 'note', text: 'Đề: "Many people now work from home for at least part of the week. Do the advantages of this trend outweigh the disadvantages?"' },
        { kind: 'model', text: 'These days, a growing number of employees do their jobs from home for at least part of the week. In my opinion, the benefits of this trend, such as saving time and money, outweigh the drawbacks, like feeling isolated.' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Viết mở bài 2 câu cho 2 đề sau:',
        items: [
          'A) Governments should tax sugary drinks and fast food to improve public health. To what extent do you agree or disagree?',
          'B) Online courses will soon replace traditional classroom learning. To what extent do you agree or disagree?'
        ],
        check: 'for each prompt: sentence 1 paraphrases the prompt without copying it; sentence 2 is a clear thesis that answers the question and previews the main ideas; 40–50 words each; grammar'
      }
    },
    {
      id: 'w11', unit: 'Task 2: viết từng đoạn', minutes: 20, title: 'Kết luận ngắn gọn',
      goal: 'Viết kết luận 1–2 câu trong 2 phút.',
      points: [
        'Bắt đầu bằng "In conclusion," hoặc "To sum up,".',
        'Nhắc lại quan điểm bằng từ khác và tóm tắt 2 ý chính.',
        'Không thêm ý mới, không thêm ví dụ.',
        'Nếu thiếu thời gian, kết luận 1 câu vẫn tốt hơn không có kết luận.'
      ],
      examples: [
        { kind: 'model', text: 'In conclusion, although working from home can make some people feel lonely, I believe its advantages, especially the time and money it saves, are more significant.' }
      ],
      practice: {
        type: 'write', rows: 4,
        task: 'Viết kết luận cho đề A ở bài trước (thuế đồ uống có đường và đồ ăn nhanh), khớp với mở bài bạn đã viết.',
        check: 'starts with a conclusion signal, restates the opinion in different words, summarises the main reasons, adds no new idea; 1–2 sentences; grammar'
      }
    },
    {
      id: 'w12', unit: 'Task 2: bài hoàn chỉnh', minutes: 60, title: 'Bài hoàn chỉnh dạng Đồng ý/Không đồng ý',
      goal: 'Ghép 4 đoạn thành bài 260–290 từ cho dạng nêu quan điểm.',
      points: [
        'Dàn bài: Mở bài (paraphrase + mức độ đồng ý) → Thân bài 1 (lý do 1, PEEL) → Thân bài 2 (lý do 2, PEEL) → Kết luận.',
        'Nếu chỉ đồng ý một phần: Thân bài 1 viết mặt đồng ý, Thân bài 2 viết mặt không đồng ý, và nói rõ điều này ở mở bài.',
        'Giữ một quan điểm xuyên suốt; mở bài và kết luận phải khớp nhau.',
        'Lập dàn ý 5 phút trước khi viết: 2 ý chính, mỗi ý 1 ví dụ.'
      ],
      examples: [
        { kind: 'note', text: 'Đề: "Governments should tax sugary drinks and fast food to improve public health. To what extent do you agree or disagree?" (Bài mẫu khoảng 270 từ)' },
        { kind: 'model', text: 'In many countries, the number of people suffering from obesity and diet-related illnesses is rising. Some argue that governments should put extra taxes on sugary drinks and fast food to protect public health. I completely agree with this idea, because higher prices would change people\'s eating habits and the money raised could support healthier lifestyles.\n\nThe main reason I support this tax is that price strongly influences what people buy. When a soft drink or a burger becomes more expensive, many consumers, especially teenagers and low-income families, will buy it less often and choose cheaper options such as water or home-cooked meals. Over time, this means they consume less sugar, salt and fat, which reduces their risk of obesity and diabetes. For example, after Mexico introduced a tax on sugary drinks, sales of these products fell noticeably. Similar taxes in other countries have also encouraged companies to reduce the amount of sugar in their drinks.\n\nIn addition, the tax would raise money that governments could spend on public health. This income could pay for nutrition lessons in schools, free sports facilities in local communities, or campaigns that explain the dangers of unhealthy food. As a result, the tax would not only discourage harmful products but also actively help people to live healthier lives. Without such funding, many health programmes remain too small to make a real difference.\n\nIn conclusion, I strongly believe that taxing sugary drinks and fast food is a sensible policy. It would encourage people to make healthier choices, and the revenue could be invested in projects that improve the health of the whole population.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-09',
        task: 'Lập dàn ý 5 phút rồi viết cả bài (chưa cần bấm giờ). AI sẽ chấm band theo 4 tiêu chí.'
      }
    },
    {
      id: 'w13', unit: 'Task 2: bài hoàn chỉnh', minutes: 60, title: 'Dạng Thảo luận 2 quan điểm',
      goal: 'Viết đủ 3 phần đề yêu cầu: quan điểm A, quan điểm B và ý kiến của bạn.',
      points: [
        'Dàn bài: Mở bài (giới thiệu 2 quan điểm + ý kiến của bạn) → Thân bài 1: quan điểm A và vì sao có người nghĩ vậy → Thân bài 2: quan điểm B và vì sao bạn đồng ý → Kết luận.',
        'Dùng: "Some people argue that…", "On the other hand, others believe that…", "I personally believe that…".',
        'Viết công bằng về quan điểm bạn không theo, nhưng ý kiến của bạn phải rõ ở mở bài và kết luận.'
      ],
      examples: [
        { kind: 'note', text: 'Đề: "Some people say that schools should focus on teaching practical life skills, such as managing money and cooking, while others believe academic subjects should remain the priority. Discuss both views and give your own opinion."' },
        { kind: 'model', text: 'Mở bài: Some believe schools should teach practical skills like budgeting, while others want academic subjects to come first. I believe academic subjects should remain the core, but a few life skills deserve a place.\nThân bài 1 (quan điểm A): Many young people leave school without knowing how to manage money or cook → they fall into debt or eat unhealthily → e.g. students who borrow money through apps they do not understand.\nThân bài 2 (quan điểm B + ý kiến): Maths, science and languages build thinking skills and are needed for university and good jobs; life skills can also be learned at home → so the timetable should stay mainly academic, with short practical lessons.\nKết luận: Both views have merit, but academic subjects should remain the priority, supported by some practical teaching.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-06',
        task: 'Viết cả bài theo dàn bài 4 đoạn ở trên. Nhớ nêu ý kiến của bạn ở cả mở bài và kết luận.'
      }
    },
    {
      id: 'w14', unit: 'Task 2: bài hoàn chỉnh', minutes: 60, title: 'Dạng Lợi ích – Bất lợi',
      goal: 'Viết bài lợi ích – bất lợi và nói rõ bên nào lớn hơn khi đề hỏi "outweigh".',
      points: [
        'Đề chỉ hỏi lợi ích và bất lợi: Thân bài 1 viết lợi ích, Thân bài 2 viết bất lợi, kết luận có thể cân bằng.',
        'Đề hỏi "Do the advantages outweigh the disadvantages?": phải nói bên nào lớn hơn ở mở bài, và giữ nguyên quan điểm đó đến kết luận.',
        'Một lợi ích giải thích kỹ tốt hơn ba lợi ích nói qua.',
        'Mẹo: ở đoạn về bên "nhỏ hơn", nói thêm vì sao nó có thể khắc phục được.'
      ],
      examples: [
        { kind: 'model', text: 'Đề: làm việc ở nhà – lợi nhiều hơn hại không?\nMở bài: paraphrase + "the advantages clearly outweigh the disadvantages".\nThân bài 1 (lợi ích lớn): saves commuting time and money → more rest and family time → e.g. 90 minutes a day back.\nThân bài 2 (bất lợi nhỏ hơn): loneliness, weaker teamwork → but companies can solve this with office days and online meetings.\nKết luận: benefits greater, problems manageable.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-07',
        task: 'Viết cả bài. Ở mở bài nói rõ bạn thấy lợi ích hay bất lợi lớn hơn.'
      }
    },
    {
      id: 'w15', unit: 'Task 2: bài hoàn chỉnh', minutes: 60, title: 'Dạng Nguyên nhân – Giải pháp',
      goal: 'Trả lời đủ 2 vế và cho giải pháp khớp với nguyên nhân.',
      points: [
        'Thân bài 1: 1–2 nguyên nhân (hoặc vấn đề). Thân bài 2: giải pháp tương ứng.',
        'Giải pháp nên khớp với nguyên nhân: nguyên nhân "plastic is cheap" ↔ giải pháp "tax plastic bags".',
        'Giải pháp cụ thể gồm: ai làm (government, schools, individuals), làm gì, và tác dụng ra sao.',
        'Mở bài báo trước cả nguyên nhân và giải pháp.'
      ],
      examples: [
        { kind: 'model', text: 'Đề: rác thải nhựa – nguyên nhân và giải pháp\nMở bài: … This is mainly because plastic is cheap and recycling is limited, but taxes and better recycling systems could help.\nThân bài 1 (nguyên nhân): plastic is cheap and convenient (bags, bottles, food delivery) · many cities lack recycling facilities.\nThân bài 2 (giải pháp): charge for single-use plastic → people bring their own bags · invest in recycling and teach children to sort waste.\nKết luận: tóm tắt 2 nguyên nhân và 2 giải pháp.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-22',
        task: 'Viết cả bài: Thân bài 1 nêu nguyên nhân, Thân bài 2 nêu giải pháp khớp với từng nguyên nhân.'
      }
    },
    {
      id: 'w16', unit: 'Task 2: bài hoàn chỉnh', minutes: 60, title: 'Dạng Câu hỏi kép',
      goal: 'Trả lời đúng và đủ cả 2 câu hỏi theo thứ tự.',
      points: [
        'Đề có 2 câu hỏi khác nhau: mỗi thân bài trả lời 1 câu, đúng thứ tự trong đề.',
        'Mở bài trả lời ngắn gọn cả 2 câu hỏi.',
        'Với câu hỏi "Is it a positive or negative development?" phải nói rõ tích cực hay tiêu cực, không chỉ liệt kê.'
      ],
      examples: [
        { kind: 'model', text: 'Đề: người trẻ rời nông thôn lên thành phố – vì sao? tích cực hay tiêu cực?\nMở bài: … This is mainly because cities offer better jobs and services, and I believe it is largely a positive development.\nThân bài 1 (vì sao): more jobs and higher wages · better schools, hospitals and entertainment.\nThân bài 2 (tích cực/tiêu cực): positive for young people and the economy, although villages lose workers → overall positive if the government improves housing and transport.\nKết luận: trả lời lại cả 2 câu hỏi.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-20',
        task: 'Viết cả bài. Mỗi thân bài trả lời đúng một câu hỏi của đề.'
      }
    },
    {
      id: 'w17', unit: 'Task 2: bài hoàn chỉnh', minutes: 30, title: 'Soát lỗi ngữ pháp hay gặp',
      goal: 'Tự tìm và sửa lỗi trong 3 phút cuối giờ.',
      points: [
        'Mạo từ: a/an với danh từ đếm được số ít ("a problem"); nói chung dùng số nhiều không có "the" ("Children need…").',
        'Số nhiều sau many, several, a number of: "many problems".',
        'Hoà hợp chủ ngữ – động từ: "Each student has…", "The number of cars is…".',
        'Câu thiếu mệnh đề chính: "Because it is convenient." là chưa đủ câu.',
        'Không dùng cùng lúc "Although … but …": chỉ chọn một.',
        'Checklist 3 phút: mỗi câu có động từ chưa? có -s/-es chưa? a/an/the đúng chưa? từ khoá của đề viết đúng chính tả chưa?'
      ],
      examples: [
        { kind: 'bad', text: 'Although social media help people keep in touch, but it can cause many problem.' },
        { kind: 'good', text: 'Although social media helps people keep in touch, it can cause many problems.' }
      ],
      practice: {
        type: 'write', rows: 7,
        task: 'Đoạn văn sau có 8 lỗi. Viết lại đoạn đã sửa:',
        items: [
          'Nowadays, many young people spends a lot of time on social media. Because it is very convenient. Although social media help people keep in touch, but it can also cause many problem. For example, a student who use their phone until midnight will feels tired the next day. In addition, fake news spread very quickly online.'
        ],
        check: 'the 8 errors: (1) spends→spend (2) the fragment "Because it is very convenient." must join a main clause (3) help→helps (4) remove "but" after Although (5) problem→problems (6) use→uses (7) will feels→will feel (8) spread→spreads. Say how many of the 8 the learner fixed and whether new errors were introduced.'
      }
    },
    {
      id: 'w18', unit: 'Task 2: bài hoàn chỉnh', minutes: 50, title: 'Viết có bấm giờ 40 phút',
      goal: 'Hoàn thành một bài Task 2 đúng giờ thi.',
      points: [
        'Phân bổ: 5 phút đọc đề và lập dàn ý → 30 phút viết → 5 phút soát lỗi.',
        'Viết mở bài và 2 câu chủ đề trước, rồi mới viết chi tiết.',
        'Không viết nháp cả bài: sẽ không đủ thời gian.',
        'Mục tiêu 260–290 từ, chia khoảng 50 – 90 – 90 – 30 từ cho 4 đoạn.'
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-14',
        task: 'Bấm "Bắt đầu" trên đồng hồ 40 phút rồi viết như thi thật.'
      }
    },
    {
      id: 'w19', unit: 'Task 1 (Academic)', minutes: 25, title: 'Task 1 là gì & câu mở đầu',
      goal: 'Hiểu yêu cầu Task 1 và viết câu mở đầu bằng cách diễn đạt lại đề.',
      points: [
        '20 phút, ít nhất 150 từ. Mô tả số liệu khách quan: không nêu ý kiến, không giải thích nguyên nhân.',
        'Các dạng: bảng (table), cột (bar), đường (line), tròn (pie), quy trình (process), bản đồ (map). App luyện bảng số liệu trước.',
        'Bố cục 4 đoạn: Mở đầu (1 câu) → Tổng quan (2 đặc điểm nổi bật) → Chi tiết 1 → Chi tiết 2.',
        'Diễn đạt lại đề: "The table below shows…" → "The table illustrates / compares / gives information about…"; "between 2010 and 2025" → "over the 15-year period from 2010".'
      ],
      examples: [
        { kind: 'note', text: 'Đề: "The table below shows how workers in one city travelled to work in 2004 and 2024."' },
        { kind: 'model', text: 'The table compares the ways in which workers in one city travelled to their jobs in 2004 and 2024.' }
      ],
      practice: {
        type: 'write', rows: 5,
        task: 'Viết câu mở đầu (paraphrase) cho 3 đề sau:',
        items: [
          'A) The table below shows the percentage of people in one country who used the internet every day, by age group, in 2005, 2015 and 2025.',
          'B) The table below shows the number of visitors to three museums in a city between 2016 and 2024.',
          'C) The table below shows sales of three types of books in one country between 2010 and 2025.'
        ],
        check: 'each opening sentence paraphrases its prompt (different verb and structure, same meaning, no copying), keeps the time period and units correct; grammar'
      }
    },
    {
      id: 'w20', unit: 'Task 1 (Academic)', minutes: 30, title: 'Đoạn tổng quan (overview)',
      goal: 'Viết đoạn tổng quan 2 câu nêu bức tranh lớn, không có số liệu.',
      points: [
        'Đây là đoạn quan trọng nhất của Task 1: thiếu tổng quan thì rất khó vượt band 5–6 ở tiêu chí Hoàn thành yêu cầu.',
        'Viết 2 câu về bức tranh lớn: xu hướng chung (tăng/giảm), mục cao nhất/thấp nhất, thay đổi lớn nhất.',
        'Không đưa số liệu cụ thể vào đoạn tổng quan.',
        'Mở đầu bằng "Overall," hoặc "It is clear that…".'
      ],
      examples: [
        { kind: 'model', text: 'Overall, the car remained the most common way of getting to work, although its share fell considerably. Meanwhile, the metro and cycling became much more popular.' }
      ],
      practice: {
        type: 'write', rows: 4,
        task: 'Viết đoạn tổng quan 2 câu cho bảng nguồn điện (đơn vị: % tổng sản lượng):',
        items: [
          'Source: 2000 → 2024 — Coal 52 → 24 · Natural gas 21 → 30 · Hydropower 19 → 16 · Wind 1 → 14 · Solar 0 → 13 · Other 7 → 3'
        ],
        check: 'two sentences giving the big picture (coal fell but... / gas became the largest source / wind and solar grew strongly), starting with Overall or similar, with NO specific numbers; accurate to the data; grammar'
      }
    },
    {
      id: 'w21', unit: 'Task 1 (Academic)', minutes: 30, title: 'So sánh số liệu',
      goal: 'Viết câu so sánh chính xác giữa các mục.',
      points: [
        'So sánh hơn/nhất: higher than, the largest, the most popular, the least common.',
        'Gấp bao nhiêu lần: twice as high as, three times as many as, half as much as.',
        'Đối chiếu 2 mục trong 1 câu bằng while/whereas: "City A spent 38% on housing, whereas City B spent only 27%."',
        'Số gần đúng: about, around, just over, just under, nearly.',
        'Phần trăm thành phân số: 50% = a half, 25% = a quarter, 75% = three quarters.'
      ],
      examples: [
        { kind: 'good', text: 'Housing was the largest expense in City A, at 38% of the monthly budget.' },
        { kind: 'good', text: 'Households in City B spent nearly a third of their budget on food, compared with just over a fifth in City A.' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Viết 4 câu so sánh từ bảng chi tiêu hộ gia đình (đơn vị: % ngân sách tháng):',
        items: [
          'Category: City A · City B — Housing 38 · 27 | Food 22 · 31 | Transport 14 · 9 | Education 9 · 15 | Leisure 11 · 8 | Other 6 · 10'
        ],
        check: 'four accurate comparison sentences using comparatives/superlatives, while/whereas, or multiples/fractions; numbers match the table; grammar'
      }
    },
    {
      id: 'w22', unit: 'Task 1 (Academic)', minutes: 30, title: 'Mô tả xu hướng thay đổi',
      goal: 'Mô tả số liệu thay đổi theo thời gian bằng từ ngữ xu hướng.',
      points: [
        'Tăng: increase, rise, grow. Giảm: decrease, fall, decline, drop. Ổn định: remain stable. Dao động: fluctuate. Đạt đỉnh: peak at.',
        'Mức độ: dramatically, sharply (rất mạnh) · significantly · steadily, gradually · slightly.',
        'Hai cách viết: "Sales of e-books rose sharply from 12 to 48 million." hoặc "There was a sharp rise in sales of e-books."',
        'Kèm số liệu: from … to …, by … (mức thay đổi), to reach …'
      ],
      examples: [
        { kind: 'good', text: 'Sales of audiobooks increased steadily, from 4 million copies in 2010 to 56 million in 2025.' },
        { kind: 'good', text: 'There was a dramatic fall in visitors to all three museums in 2020.' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Viết 4 câu mô tả thay đổi của bảng khách tham quan bảo tàng (đơn vị: nghìn lượt):',
        items: [
          'Museum: 2016 · 2018 · 2020 · 2022 · 2024 — Science Museum 420 · 465 · 180 · 390 · 510 | Art Gallery 310 · 300 · 95 · 260 · 280 | History Museum 150 · 170 · 60 · 210 · 330'
        ],
        check: 'four sentences that use trend verbs/nouns with suitable adverbs, include accurate figures with from/to/by, and describe real changes in the data; grammar'
      }
    },
    {
      id: 'w23', unit: 'Task 1 (Academic)', minutes: 45, title: 'Nhóm số liệu & bài Task 1 hoàn chỉnh',
      goal: 'Chia số liệu thành 2 đoạn chi tiết có logic và viết bài Task 1 đầy đủ.',
      points: [
        'Không mô tả từng con số một. Hãy nhóm các mục có điểm chung: cùng tăng / cùng giảm, cao nhất / thấp nhất.',
        'Chi tiết 1: nhóm nổi bật nhất. Chi tiết 2: các mục còn lại hoặc nhóm đối lập.',
        'Mỗi đoạn chi tiết 3–4 câu, có số liệu và so sánh.',
        'Chỉ chọn số liệu quan trọng: đầu, cuối, cao nhất, thay đổi lớn. Không cần nhắc mọi con số.'
      ],
      examples: [
        { kind: 'note', text: 'Bài mẫu khoảng 170 từ cho bảng phương tiện đi làm 2004–2024:' },
        { kind: 'model', text: 'The table compares the ways in which workers in one city travelled to their jobs in 2004 and 2024.\n\nOverall, the car remained the most common way of getting to work, although its share fell considerably. Meanwhile, the metro and cycling became far more popular over the twenty-year period.\n\nIn 2004, almost half of all workers (46%) drove to work, and buses were the second most popular option at 24%. By 2024, the proportion of car commuters had dropped to 31%, while the figure for buses also decreased, to 18%. Walking saw a slight decline from 12% to 10%.\n\nIn contrast, the metro experienced the most dramatic growth, rising from only 5% to 22%, which made it the second most popular mode of transport in 2024. The percentage of people who cycled also increased, from 9% to 15%. The share of motorbike users stayed the same, at 4%, in both years. As a result, buses, the metro and cycling together accounted for more than half of all journeys to work by 2024.' }
      ],
      practice: {
        type: 'essay', taskType: 'task1', promptId: 't1-01',
        task: 'Viết bài Task 1 đầy đủ 4 đoạn (chưa cần bấm giờ). Nhớ có đoạn tổng quan.'
      }
    },
    {
      id: 'w24', unit: 'Task 1 (Academic)', minutes: 30, title: 'Task 1 có bấm giờ 20 phút',
      goal: 'Hoàn thành bài Task 1 đúng giờ thi.',
      points: [
        '2 phút đọc đề và chọn 2 ý cho tổng quan → 15 phút viết → 3 phút soát lỗi.',
        'Viết 160–190 từ là đủ; dài hơn không được thêm điểm.',
        'Checklist: có tổng quan chưa? đơn vị số liệu đúng chưa? có so sánh chưa? có lỡ nêu ý kiến cá nhân không?'
      ],
      practice: {
        type: 'essay', taskType: 'task1', promptId: 't1-07',
        task: 'Bấm "Bắt đầu" trên đồng hồ 20 phút rồi viết như thi thật.'
      }
    }
  ];

  // ---------- SPEAKING ----------
  const SPEAKING = [
    {
      id: 's01', unit: 'Nền móng', minutes: 20, title: 'Bài thi Speaking diễn ra thế nào?',
      goal: 'Hiểu 3 phần thi, 4 tiêu chí chấm và điều giám khảo thật sự cần.',
      points: [
        'Thi 11–14 phút, nói trực tiếp với giám khảo và được ghi âm.',
        'Part 1 (4–5 phút): câu hỏi quen thuộc về bạn: quê, công việc/học tập, sở thích.',
        'Part 2 (3–4 phút): nhận thẻ đề, chuẩn bị 1 phút, nói 1–2 phút.',
        'Part 3 (4–5 phút): thảo luận sâu hơn, câu hỏi chung về xã hội liên quan tới Part 2.',
        '4 tiêu chí: Trôi chảy & mạch lạc; Từ vựng; Ngữ pháp; Phát âm. Không chấm "ý hay" hay kiến thức.',
        'Đừng học thuộc câu trả lời: giám khảo nhận ra và trừ điểm. Hãy học cách trả lời, không học thuộc bài mẫu.'
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời 2 câu hỏi mở đầu như trong phòng thi. Mỗi câu nói 2–3 câu.',
        questions: [
          { part: 1, q: 'Can you tell me a little about yourself?', vi: 'Hãy giới thiệu một chút về bản thân bạn.' },
          { part: 1, q: 'Do you work or are you a student?', vi: 'Bạn đang đi làm hay đi học?' }
        ]
      }
    },
    {
      id: 's02', unit: 'Nền móng', minutes: 25, title: 'Phát âm nền tảng & nói đuổi',
      goal: 'Nói rõ âm cuối, đuôi -s/-ed và trọng âm từ; tập thói quen nói đuổi mỗi ngày.',
      points: [
        'Người Việt hay nuốt âm cuối /t/, /d/, /s/, /k/: like, work, friends. Giám khảo cần nghe rõ âm cuối.',
        'Đuôi -s: /s/ (books), /z/ (friends), /ɪz/ (buses). Đuôi -ed: /t/ (worked), /d/ (played), /ɪd/ (wanted).',
        'Trọng âm từ: phoTOgraphy, enVIronment, techNOlogy, eduCAtion. Nhấn sai trọng âm làm người nghe khó hiểu hơn cả sai một âm.',
        'Nói đuổi (shadowing): nghe câu mẫu rồi nói theo ngay, bắt chước tốc độ và ngữ điệu. 5 phút mỗi ngày.'
      ],
      practice: {
        type: 'speak',
        task: 'Bấm "Nghe" từng câu, nói theo 3 lần mỗi câu. Sau đó trả lời câu hỏi bên dưới.',
        shadow: [
          'I usually walk to work because it\'s only ten minutes from my house.',
          'My friends and I played football last weekend.',
          'She wanted to visit the museum, but it was closed.',
          'Technology has changed the way we study.',
          'I think the environment is one of the biggest problems today.'
        ],
        questions: [
          { part: 1, q: 'What do you usually do at weekends?', vi: 'Bạn thường làm gì vào cuối tuần?' }
        ]
      }
    },
    {
      id: 's03', unit: 'Nền móng', minutes: 20, title: 'Khi bí ý hoặc quên từ',
      goal: 'Không im lặng lâu: biết câu giờ tự nhiên và nói vòng khi quên từ.',
      points: [
        'Im lặng lâu làm mất điểm Trôi chảy. Dùng câu câu giờ tự nhiên: "That\'s an interesting question.", "Let me think about that for a second.", "Well, I\'ve never really thought about that, but…"',
        'Quên từ thì nói vòng (paraphrase): quên "umbrella" → "the thing you use when it rains".',
        'Không hiểu câu hỏi thì hỏi lại: "Sorry, could you repeat the question?" Hỏi lại không bị trừ điểm.',
        'Mỗi câu trả lời chỉ dùng tối đa 1 câu câu giờ.'
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời 2 câu hỏi khó hơn. Nếu bí, dùng 1 câu câu giờ rồi nói tiếp.',
        questions: [
          { part: 1, q: 'Do you prefer reading e-books or paper books?', vi: 'Bạn thích đọc sách điện tử hay sách giấy hơn?' },
          { part: 1, q: 'Have you ever been to a museum?', vi: 'Bạn đã từng đến bảo tàng chưa?' }
        ]
      }
    },
    {
      id: 's04', unit: 'Part 1', minutes: 25, title: 'Công thức Part 1: Trả lời + Lý do + Ví dụ',
      goal: 'Trả lời mỗi câu Part 1 trong 2–3 câu, khoảng 20–30 giây.',
      points: [
        'Trả lời thẳng câu hỏi ngay câu đầu tiên (Yes / No / I prefer…).',
        'Thêm lý do (because…) và một ví dụ hoặc chi tiết nhỏ.',
        '2–3 câu là đủ. Trả lời "Yes, I do." quá ngắn, nói một phút lại quá dài.',
        'Nói về chính bạn, thật và đơn giản.'
      ],
      examples: [
        { kind: 'note', text: 'Do you like your hometown?' },
        { kind: 'model', text: 'Yes, I really like it. It\'s a small, peaceful city, so life there is much less stressful than in Hanoi. For example, I can ride my bike to the river every evening without any traffic.' },
        { kind: 'note', text: 'Do you work or study?' },
        { kind: 'model', text: 'I\'m a university student. I\'m studying engineering, which I chose because I\'ve always enjoyed solving technical problems. At the moment, I\'m working on a project about traffic simulation.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời từng câu theo công thức Trả lời + Lý do + Ví dụ.',
        questions: [
          { part: 1, q: 'Where is your hometown?', vi: 'Quê bạn ở đâu?' },
          { part: 1, q: 'What do you like most about your home?', vi: 'Bạn thích điều gì nhất ở ngôi nhà của mình?' },
          { part: 1, q: 'Do you prefer studying in the morning or at night?', vi: 'Bạn thích học buổi sáng hay buổi tối?' }
        ]
      }
    },
    {
      id: 's05', unit: 'Part 1', minutes: 25, title: 'Mở rộng câu trả lời Part 1',
      goal: 'Thêm chi tiết tự nhiên để câu trả lời không bị cụt.',
      points: [
        'Thêm 1 trong 4 chi tiết: bao lâu một lần (every weekend), với ai (with my friends), ở đâu (at a café near my house), so sánh trước và nay (When I was a child…, but now…).',
        'Nói cảm xúc: "It makes me feel relaxed."',
        'Đổi cách nói "like": I\'m really into…, I\'m a big fan of…, I enjoy…, I\'m not keen on…'
      ],
      examples: [
        { kind: 'note', text: 'What do you do in your free time?' },
        { kind: 'model', text: 'I\'m really into playing badminton. I usually play with my friends twice a week at a sports centre near my house. When I was younger I hardly did any exercise, but now it\'s the best way for me to relax after studying.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu thêm ít nhất 1 chi tiết: tần suất, với ai, ở đâu hoặc so sánh trước – nay.',
        questions: [
          { part: 1, q: 'What do you usually do in your free time?', vi: 'Bạn thường làm gì lúc rảnh?' },
          { part: 1, q: 'Do you like cooking?', vi: 'Bạn có thích nấu ăn không?' },
          { part: 1, q: 'How often do you use public transport?', vi: 'Bạn có hay đi phương tiện công cộng không?' }
        ]
      }
    },
    {
      id: 's06', unit: 'Part 1', minutes: 25, title: 'Từ vựng & mẫu câu Part 1 hay gặp',
      goal: 'Có sẵn cụm từ thật về bản thân cho các chủ đề Part 1 thường gặp.',
      points: [
        'Chủ đề hay gặp: quê hương, nhà ở, học tập/công việc, sở thích, đồ ăn, âm nhạc, thể thao, công nghệ, du lịch, thời tiết.',
        'Thói quen: I tend to…, I usually…, Most of the time…',
        'Thích/không thích: I\'m really into…, I can\'t stand…, It\'s not really my thing.',
        'Thay đổi: I used to… but now…',
        'Với mỗi chủ đề, ghi 3 cụm từ thật về bạn. Ghi cụm từ, không học thuộc cả câu.'
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời bằng ít nhất 1 mẫu câu mới trong bài (I tend to…, I used to… but now…, It\'s not really my thing…).',
        questions: [
          { part: 1, q: 'What kind of music do you like?', vi: 'Bạn thích thể loại nhạc nào?' },
          { part: 1, q: 'Is technology important in your daily life?', vi: 'Công nghệ có quan trọng trong cuộc sống hằng ngày của bạn không?' },
          { part: 1, q: 'Do you prefer eating at home or eating out?', vi: 'Bạn thích ăn ở nhà hay ăn ngoài hơn?' }
        ]
      }
    },
    {
      id: 's07', unit: 'Part 1', minutes: 25, title: 'Luyện Part 1 liên tục như thi thật',
      goal: 'Trả lời 6 câu liên tiếp, giữ nhịp tự nhiên.',
      points: [
        'Trả lời 6 câu liên tục, mỗi câu 20–30 giây, không dừng lại để sửa.',
        'Nghe lại bản ghi trong mục Nhật ký và đánh dấu chỗ ngập ngừng lâu, lỗi thì động từ, âm cuối bị mất.',
        'Chọn 2 lỗi rồi nói lại các câu đó lần 2.'
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời lần lượt 6 câu, nghỉ ít nhất có thể giữa các câu.',
        questions: [
          { part: 1, q: 'What\'s the weather like in your hometown?', vi: 'Thời tiết ở quê bạn thế nào?' },
          { part: 1, q: 'How many hours do you usually sleep?', vi: 'Bạn thường ngủ mấy tiếng?' },
          { part: 1, q: 'Do you spend a lot of time with your friends?', vi: 'Bạn có dành nhiều thời gian với bạn bè không?' },
          { part: 1, q: 'Do you enjoy shopping?', vi: 'Bạn có thích đi mua sắm không?' },
          { part: 1, q: 'What do you use your phone for most?', vi: 'Bạn dùng điện thoại nhiều nhất để làm gì?' },
          { part: 1, q: 'How do you usually get to school or work?', vi: 'Bạn thường đi học hoặc đi làm bằng gì?' }
        ]
      }
    },
    {
      id: 's08', unit: 'Part 2', minutes: 25, title: 'Part 2: tận dụng 1 phút chuẩn bị',
      goal: 'Ghi chú từ khoá nhanh để có đủ ý nói 2 phút.',
      points: [
        'Thẻ đề có chủ đề và 3–4 gợi ý ("You should say: who, when, where… and explain why…").',
        'Ghi từ khoá bằng tiếng Anh cho từng gợi ý, không viết cả câu.',
        'Thêm 1–2 chi tiết thật cho mỗi gợi ý: tên, địa điểm, cảm xúc.',
        'Dùng hết 1 phút chuẩn bị, và nhìn ghi chú trong lúc nói.'
      ],
      examples: [
        { kind: 'note', text: 'Ghi chú mẫu cho "Describe a person who has helped you":' },
        { kind: 'model', say: false, text: 'Mr Minh – maths teacher – grade 10\nafter class – free extra lessons\npatient – explains slowly – jokes\nmy score: 4 → 8\ngrateful – want to be like him' }
      ],
      practice: {
        type: 'speak',
        task: 'Đếm 1 phút để ghi chú từ khoá ra giấy, rồi nói 1–2 phút theo ghi chú.',
        questions: [
          { part: 2, q: 'Describe a teacher who has influenced you.', vi: 'Hãy mô tả một giáo viên đã ảnh hưởng đến bạn.', bullets: ['who this teacher is', 'what subject they taught you', 'what they did to help you', 'and explain why they influenced you'] }
        ]
      }
    },
    {
      id: 's09', unit: 'Part 2', minutes: 30, title: 'Bố cục 2 phút cho Part 2',
      goal: 'Nói đủ 2 phút theo một bố cục dễ nhớ.',
      points: [
        'Mở đầu (khoảng 10 giây): "I\'d like to talk about…"',
        'Đi lần lượt các gợi ý trên thẻ (60–80 giây), mỗi gợi ý 2–3 câu.',
        'Kể một khoảnh khắc cụ thể (20–30 giây): "I remember one time when…"',
        'Kết bằng cảm xúc và lý do (khoảng 15 giây): "That\'s why…"'
      ],
      examples: [
        { kind: 'note', text: 'Describe a place in your city that you like to visit. (Bài mẫu khoảng 1 phút 40 giây, bấm Nghe để nghe)' },
        { kind: 'model', text: 'I\'d like to talk about a small bookshop café near my university called The Corner. I first found it about two years ago when I was looking for a quiet place to study. It\'s on the second floor of an old building, so it\'s surprisingly peaceful, even though the street below is really busy. Inside, there are wooden shelves full of second-hand books, and you can read any of them while you drink your coffee. I usually go there on Saturday mornings, either alone or with a close friend. I order an iced milk coffee, find a seat by the window and spend two or three hours reading or preparing for my exams. I remember one rainy afternoon last year when the streets were flooded, so I stayed there until late. The owner offered me a free cup of tea, and we talked about our favourite novels. Since then, it has felt like a second home to me. The reason I like this place so much is that it helps me slow down. My life is quite busy, and the café gives me a calm space where I can focus and recharge.' }
      ],
      practice: {
        type: 'speak',
        task: 'Nói theo bố cục: Mở đầu → các gợi ý → một khoảnh khắc cụ thể → cảm xúc và lý do.',
        questions: [
          { part: 2, q: 'Describe a place in your city that you like to visit.', vi: 'Hãy mô tả một nơi trong thành phố mà bạn thích ghé.', bullets: ['where it is', 'what it looks like', 'what you do there', 'and explain why you like visiting it'] }
        ]
      }
    },
    {
      id: 's10', unit: 'Part 2', minutes: 30, title: 'Kể chuyện bằng thì quá khứ',
      goal: 'Kể một trải nghiệm đã qua mạch lạc, đúng thì.',
      points: [
        'Chuyện đã xảy ra → dùng thì quá khứ đơn: went, saw, decided, was/were.',
        'Từ nối thời gian: At first, Then, After that, Suddenly, In the end.',
        'Thêm cảm xúc lúc đó: I felt nervous / relieved / excited.',
        'Lỗi hay gặp: dùng thì hiện tại cho chuyện quá khứ ("Last year I go…").'
      ],
      examples: [
        { kind: 'model', text: 'Last summer, I went to Da Lat with three friends from university. At first, the trip didn\'t go well because our bus broke down halfway, and we had to wait for almost two hours. Then a local family invited us to have lunch with them while we were waiting. After that, everything went smoothly. We visited flower gardens, picked strawberries and spent the evening at the night market. In the end, it became one of my favourite trips, mainly because of the kindness of strangers.' }
      ],
      practice: {
        type: 'speak',
        task: 'Kể bằng thì quá khứ và dùng ít nhất 3 từ nối thời gian.',
        questions: [
          { part: 2, q: 'Describe a memorable trip you have taken.', vi: 'Hãy mô tả một chuyến đi đáng nhớ của bạn.', bullets: ['where you went', 'who you went with', 'what happened during the trip', 'and explain why it was memorable'] }
        ]
      }
    },
    {
      id: 's11', unit: 'Part 2', minutes: 25, title: 'Mô tả người, nơi chốn, đồ vật',
      goal: 'Có sẵn từ ngữ miêu tả cho 3 nhóm đề Part 2 phổ biến.',
      points: [
        'Người: ngoại hình (tall, friendly-looking), tính cách (patient, hard-working, easy-going), họ làm gì.',
        'Nơi chốn: ở đâu, trông thế nào (spacious, quiet, crowded), bạn làm gì ở đó.',
        'Đồ vật: là gì, có từ khi nào, dùng thế nào, vì sao quan trọng.',
        'Dùng so sánh: "It\'s much quieter than…", "the most … I\'ve ever …".'
      ],
      practice: {
        type: 'speak',
        task: 'Mô tả đồ vật theo 4 gợi ý, dùng ít nhất 2 tính từ miêu tả và 1 câu so sánh.',
        questions: [
          { part: 2, q: 'Describe an object that is important to you.', vi: 'Hãy mô tả một đồ vật quan trọng với bạn.', bullets: ['what it is', 'when you got it', 'how you use it', 'and explain why it is important to you'] }
        ]
      }
    },
    {
      id: 's12', unit: 'Part 2', minutes: 25, title: 'Nói đủ 2 phút',
      goal: 'Không hết ý trước khi giám khảo dừng bạn.',
      points: [
        'Hết ý sớm thì thêm: cảm xúc, so sánh với trước đây, điều bạn muốn làm trong tương lai ("If I had more time, I would…").',
        'Giám khảo sẽ ngắt lời khi đủ 2 phút. Bị ngắt là dấu hiệu tốt.',
        'Luyện tăng dần: lần 1 nói 1 phút, lần 2 nói 1 phút rưỡi, lần 3 nói đủ 2 phút.'
      ],
      practice: {
        type: 'speak',
        task: 'Nói 3 lần, mỗi lần dài hơn. Lần cuối cố nói đủ 2 phút.',
        questions: [
          { part: 2, q: 'Describe a skill you would like to learn.', vi: 'Hãy mô tả một kỹ năng bạn muốn học.', bullets: ['what the skill is', 'why you want to learn it', 'how you would learn it', 'and explain how it would help you'] }
        ]
      }
    },
    {
      id: 's13', unit: 'Part 3', minutes: 25, title: 'Part 3: Quan điểm – Lý do – Ví dụ',
      goal: 'Trả lời câu hỏi thảo luận trong 30–60 giây theo một khung rõ ràng.',
      points: [
        'Part 3 hỏi về xã hội nói chung, không chỉ về bạn.',
        'Khung trả lời: Quan điểm (I think…) → Lý do (This is because…) → Ví dụ (For example, in Vietnam…) → Mặt khác (However, some people…).',
        '3–5 câu, khoảng 30–60 giây.'
      ],
      examples: [
        { kind: 'note', text: 'Why do some people prefer living in cities?' },
        { kind: 'model', text: 'I think the main reason is job opportunities. Big cities like Ho Chi Minh City have far more companies, so young people can find better-paid jobs there. For example, most of my classmates plan to work in the city after they graduate. However, city life is expensive and stressful, so some people move back to the countryside later in life.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời theo khung Quan điểm – Lý do – Ví dụ – Mặt khác.',
        questions: [
          { part: 3, q: 'Why do some people prefer living in cities?', vi: 'Vì sao một số người thích sống ở thành phố?' },
          { part: 3, q: 'Should schools teach more practical skills?', vi: 'Trường học có nên dạy nhiều kỹ năng thực tế hơn không?' }
        ]
      }
    },
    {
      id: 's14', unit: 'Part 3', minutes: 25, title: 'Từ cá nhân ra xã hội',
      goal: 'Mở rộng câu trả lời ra nhiều nhóm người và nhiều thời điểm.',
      points: [
        'Đừng chỉ nói về mình: mở rộng ra "people in general", "young people", "in my country".',
        'So sánh: trước đây và bây giờ ("Twenty years ago…, whereas now…"), người trẻ và người lớn tuổi, thành thị và nông thôn.',
        'Câu hỏi "Will … in the future?": dự đoán và lý do: "I think … will probably … because …".'
      ],
      practice: {
        type: 'speak',
        task: 'Trong mỗi câu trả lời, có ít nhất 1 so sánh (trước – nay, trẻ – già hoặc thành thị – nông thôn).',
        questions: [
          { part: 3, q: 'How has technology changed the way people communicate?', vi: 'Công nghệ đã thay đổi cách mọi người giao tiếp như thế nào?' },
          { part: 3, q: 'Do you think people will read fewer books in the future?', vi: 'Bạn có nghĩ trong tương lai mọi người sẽ đọc ít sách hơn không?' }
        ]
      }
    },
    {
      id: 's15', unit: 'Part 3', minutes: 25, title: 'Nêu quan điểm có chừng mực',
      goal: 'Trả lời câu hỏi khó một cách cân bằng và thuyết phục.',
      points: [
        'Ít khi có câu trả lời đúng 100%: dùng "It depends on…", "To some extent…", "In most cases…", "I\'d say…".',
        'Nêu 2 mặt: "On the one hand… On the other hand…".',
        'Câu điều kiện để nêu giải pháp: "If the government invested more in…, people would…".'
      ],
      practice: {
        type: 'speak',
        task: 'Dùng ít nhất 1 cụm có chừng mực (It depends on…, To some extent…) và 1 câu điều kiện.',
        questions: [
          { part: 3, q: 'Is it better for children to grow up in the countryside or in a city?', vi: 'Trẻ em lớn lên ở nông thôn hay thành phố thì tốt hơn?' },
          { part: 3, q: 'Should the government pay for university education?', vi: 'Nhà nước có nên chi trả học phí đại học không?' }
        ]
      }
    },
    {
      id: 's16', unit: 'Part 3', minutes: 25, title: 'Từ vựng tự nhiên theo chủ đề',
      goal: 'Dùng cụm từ đi liền tự nhiên thay vì từ khó đứng một mình.',
      points: [
        'Collocation là các cụm từ hay đi liền: make a decision, a stressful job, spend time with, have a positive impact on, access to education.',
        'Với mỗi chủ đề lớn (giáo dục, công việc, công nghệ, môi trường, sức khoẻ), ghi 5 cụm từ và dùng trong câu của bạn.',
        'Lưu cụm từ mới vào Flashcard bằng nút lưu trong phần nhận xét của AI.'
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu trả lời dùng ít nhất 2 collocation của chủ đề đó.',
        questions: [
          { part: 3, q: 'What makes a job satisfying?', vi: 'Điều gì khiến một công việc mang lại sự hài lòng?' },
          { part: 3, q: 'What can individuals do to protect the environment?', vi: 'Mỗi người có thể làm gì để bảo vệ môi trường?' }
        ]
      }
    },
    {
      id: 's17', unit: 'Hoàn thiện', minutes: 25, title: 'Ngữ điệu & nhấn câu',
      goal: 'Nói nghe tự nhiên hơn nhờ nhấn đúng từ và ngắt đúng cụm.',
      points: [
        'Nhấn vào từ mang nghĩa (danh từ, động từ, tính từ), lướt qua từ phụ (a, the, of).',
        'Ngắt theo cụm ý: "In my opinion, | the main reason | is job opportunities."',
        'Lên giọng ở cuối câu hỏi Yes/No, xuống giọng ở cuối câu trần thuật.',
        'Nói đuổi một đoạn 30–40 giây mỗi ngày.'
      ],
      practice: {
        type: 'speak',
        task: 'Nói đuổi đoạn mẫu 3 lần, rồi trả lời câu hỏi với cách nhấn và ngắt tương tự.',
        shadow: [
          'In my opinion, the main reason is job opportunities. Big cities have far more companies, so young people can find better-paid jobs there. However, life in the city is expensive and stressful.'
        ],
        questions: [
          { part: 3, q: 'What are the advantages of living in a big city?', vi: 'Sống ở thành phố lớn có những lợi ích gì?' }
        ]
      }
    },
    {
      id: 's18', unit: 'Hoàn thiện', minutes: 30, title: 'Thi thử Speaking đầy đủ',
      goal: 'Làm quen với nhịp thi thật từ Part 1 đến Part 3.',
      points: [
        'Part 1: 4 câu. Part 2: 1 thẻ đề (chuẩn bị 1 phút, nói 2 phút). Part 3: 2–3 câu.',
        'Nói liên tục như thi thật, không dừng lại để sửa.',
        'Nghe lại và tự chấm theo 4 tiêu chí; ghi 3 điều cần cải thiện cho tuần tới.'
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời lần lượt từ trên xuống, giống thứ tự trong phòng thi.',
        questions: [
          { part: 1, q: 'Do you live in a house or an apartment?', vi: 'Bạn sống ở nhà riêng hay căn hộ?' },
          { part: 1, q: 'What do you like to do in the evening?', vi: 'Buổi tối bạn thích làm gì?' },
          { part: 1, q: 'Do you like your job or your studies?', vi: 'Bạn có thích công việc hoặc việc học của mình không?' },
          { part: 1, q: 'How often do you go out with friends?', vi: 'Bạn có hay đi chơi với bạn bè không?' },
          { part: 2, q: 'Describe a book or film that you enjoyed.', vi: 'Hãy mô tả một cuốn sách hoặc bộ phim bạn thích.', bullets: ['what it was', 'when you read or watched it', 'what it was about', 'and explain why you enjoyed it'] },
          { part: 3, q: 'Why do people enjoy watching films?', vi: 'Vì sao mọi người thích xem phim?' },
          { part: 3, q: 'Do you think reading is more useful than watching films?', vi: 'Bạn có nghĩ đọc sách hữu ích hơn xem phim không?' }
        ]
      }
    }
  ];

  const BUILTIN = { writing: WRITING, speaking: SPEAKING };
  const NAMES = { writing: 'Writing', speaking: 'Speaking' };

  // Lộ trình chính = bài giảng video của giáo viên (nếu có), bộ bài sẵn có chuyển thành "Nâng cao"
  const teacher = () => window.TEACHER_COURSE || {};
  const teacherLessons = skill => (Array.isArray(teacher()[skill]) ? teacher()[skill] : []);
  function tracks(skill) {
    if (!BUILTIN[skill]) return [];
    const t = teacherLessons(skill);
    if (!t.length) return [{ key: 'main', name: 'Lộ trình', lessons: BUILTIN[skill] }];
    return [
      { key: 'main', name: 'Bài giảng video', lessons: t, expected: Math.max(t.length, (teacher().expected || {})[skill] || 0), teacher: true },
      { key: 'advanced', name: 'Nâng cao', lessons: BUILTIN[skill] }
    ];
  }
  const allLessons = skill => tracks(skill).flatMap(tr => tr.lessons);
  const trackOf = (skill, id) => tracks(skill).find(tr => tr.lessons.some(l => l.id === id)) || tracks(skill)[0];
  const trackKey = { writing: 'main', speaking: 'main' };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const progress = skill => (window.todayModule ? window.todayModule.getCourseProgress(skill) : {});

  const openId = { writing: null, speaking: null };
  const mounts = { writing: null, speaking: null };
  const aiState = {}; // lessonId → { loading, error, data }

  function loadDrafts() {
    try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveDraft(id, text) {
    const d = loadDrafts();
    d[id] = text;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch (e) {}
  }

  // ---------- Danh sách bài ----------
  function renderOverview(skill) {
    const all = tracks(skill);
    const track = all.find(t => t.key === trackKey[skill]) || all[0];
    const list = track.lessons;
    const done = progress(skill);
    const doneCount = list.filter(l => done[l.id]).length;
    const next = list.find(l => !done[l.id]);
    const pct = Math.round((doneCount / list.length) * 100);
    const units = [];
    list.forEach((l, i) => {
      let u = units[units.length - 1];
      if (!u || u.name !== l.unit) { u = { name: l.unit, items: [] }; units.push(u); }
      u.items.push({ lesson: l, n: i + 1 });
    });
    const pending = (track.expected || list.length) - list.length;
    const copy = track.teacher
      ? { kicker: 'Bài giảng video · mỗi ngày 1 bài theo lịch Hôm nay', title: `Lộ trình ${NAMES[skill]}` }
      : track.key === 'advanced'
        ? { kicker: 'Học sau bài giảng, hoặc học thêm bất cứ lúc nào', title: `${NAMES[skill]} nâng cao` }
        : { kicker: 'Học từ con số 0 · mỗi ngày 1 bài theo lịch Hôm nay', title: `Lộ trình ${NAMES[skill]}` };
    const doneText = track.teacher
      ? (pending > 0 ? 'Bạn đã học hết các bài đã có. Các video còn lại đang được chuyển thành bài học; trong lúc chờ, lịch Hôm nay xếp bài Nâng cao.'
        : 'Bạn đã học xong toàn bộ bài giảng! Lịch Hôm nay chuyển sang các bài Nâng cao.')
      : `Bạn đã học xong ${track.key === 'advanced' ? 'phần Nâng cao' : `lộ trình ${NAMES[skill]}`}! Từ giờ lịch Hôm nay chuyển sang luyện đề${skill === 'writing' ? ' Task 1 và Task 2' : ' và thi thử Speaking'}.`;
    return `
      ${all.length > 1 ? `
        <div class="ios-segmented course-tracks" role="group" aria-label="Chọn lộ trình">
          ${all.map(t => `<button type="button" class="${t.key === track.key ? 'active' : ''}" data-act="track" data-track="${t.key}" aria-pressed="${t.key === track.key}">${esc(t.name)}</button>`).join('')}
        </div>` : ''}
      <section class="ios-card course-hero">
        <p class="course-kicker">${esc(copy.kicker)}</p>
        <h2 class="course-title">${esc(copy.title)}</h2>
        <div class="hero-progress">
          <div class="hero-bar"><span style="width:${pct}%"></span></div>
          <span class="hero-progress-text">${doneCount}/${list.length} bài${pending > 0 ? ` · còn ${pending} video đang xử lý` : ''}</span>
        </div>
        ${next ? `<button type="button" class="btn-filled btn-block" data-act="open" data-id="${next.id}">${doneCount ? 'Học tiếp' : 'Bắt đầu'}: Bài ${list.indexOf(next) + 1} – ${esc(next.title)}</button>`
          : `<p class="hero-done">${esc(doneText)}</p>`}
      </section>
      ${units.map(u => `
        <h3 class="group-title">${esc(u.name)} <span>${u.items.filter(x => done[x.lesson.id]).length}/${u.items.length}</span></h3>
        <ul class="ios-list lesson-list">
          ${u.items.map(({ lesson, n }) => `
            <li>
              <button type="button" class="lesson-row${done[lesson.id] ? ' is-done' : ''}" data-act="open" data-id="${lesson.id}">
                <span class="lesson-num" aria-hidden="true">${done[lesson.id] ? '' : n}</span>
                <span class="lesson-text">
                  <span class="lesson-name">Bài ${n}. ${esc(lesson.title)}</span>
                  <span class="lesson-meta">${lesson.minutes} phút · ${esc(lesson.goal)}</span>
                </span>
                <span class="task-chevron" aria-hidden="true"></span>
              </button>
            </li>`).join('')}
        </ul>`).join('')}`;
  }

  // ---------- Video bài giảng: mục lục, mở video ngay trong app ----------
  const videoInfo = (skill, lesson) => (lesson && lesson.video && ((window.TEACHER_VIDEOS || {})[skill] || {})[lesson.video]) || null;
  const toSec = t => String(t || '').split(':').reduce((s, x) => s * 60 + Number(x), 0);
  const canPickFolder = typeof window.showDirectoryPicker === 'function'; // Chrome/Edge trên máy tính
  const vkey = (skill, lesson) => `${skill}-${lesson.video}`;
  const player = { key: '', url: '', error: '', seek: null, play: false };

  // Thư mục video được nhớ trong IndexedDB để các bài sau tự mở đúng file
  function folderStore(mode, fn) {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('ielts-video-folder', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('kv');
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        const tx = req.result.transaction('kv', mode);
        const r = fn(tx.objectStore('kv'));
        tx.oncomplete = () => resolve(r && r.result);
        tx.onerror = () => reject(tx.error);
      };
    });
  }

  async function findFile(dir, name, depth) {
    const subdirs = [];
    for await (const h of dir.values()) {
      if (h.kind === 'file' && h.name.normalize('NFC') === name.normalize('NFC')) return h.getFile();
      if (h.kind === 'directory') subdirs.push(h);
    }
    for (const d of depth > 0 ? subdirs : []) {
      const f = await findFile(d, name, depth - 1);
      if (f) return f;
    }
    return null;
  }

  async function fileFromFolder(v) {
    let root = await folderStore('readonly', s => s.get('root')).catch(() => null);
    if (root && (await root.queryPermission({ mode: 'read' })) !== 'granted' && (await root.requestPermission({ mode: 'read' })) !== 'granted') root = null;
    if (!root) {
      root = await window.showDirectoryPicker({ id: 'ielts-teacher-videos', mode: 'read' });
      await folderStore('readwrite', s => s.put(root, 'root')).catch(() => {});
    }
    const file = await findFile(root, v.file, 1);
    if (file) return file;
    await folderStore('readwrite', s => s.delete('root')).catch(() => {}); // lần sau cho chọn lại thư mục
    throw new Error(`Không thấy "${v.file}" trong thư mục "${root.name}". Bấm lại và chọn thư mục chứa video bài giảng.`);
  }

  function playFile(skill, lesson, file, seek) {
    if (player.url) URL.revokeObjectURL(player.url);
    Object.assign(player, { key: vkey(skill, lesson), url: URL.createObjectURL(file), error: '', seek: seek || 0, play: true });
    rerender(skill);
  }

  async function openVideo(skill, lesson, seek) {
    const v = videoInfo(skill, lesson);
    if (!v) return;
    try {
      playFile(skill, lesson, await fileFromFolder(v), seek);
    } catch (err) {
      if (err && err.name === 'AbortError') return; // người dùng đóng hộp chọn thư mục
      Object.assign(player, { key: vkey(skill, lesson), error: err.message || 'Chưa mở được video.' });
      rerender(skill);
    }
  }

  function renderVideo(skill, lesson) {
    const v = videoInfo(skill, lesson);
    if (!v) return '';
    const mine = player.key === vkey(skill, lesson);
    return `
      <section class="ios-card lesson-card video-card">
        <h4>Video bài giảng <span class="video-meta">Video ${lesson.video} · ${esc(v.duration)}</span></h4>
        ${mine && player.url ? `<video class="lesson-video" src="${player.url}" controls playsinline preload="metadata"></video>` : `
          <div class="video-actions">
            ${canPickFolder ? '<button type="button" class="btn-filled" data-act="video-open">Xem video trong app</button>' : ''}
            <label class="${canPickFolder ? 'btn-plain' : 'btn-tinted'} video-pick">Chọn file video<input type="file" accept="video/*,.mp4" data-act="video-file" hidden></label>
          </div>
          <p class="group-foot">${canPickFolder
            ? 'Lần đầu, chọn thư mục chứa video bài giảng trên máy tính; các bài sau app tự mở đúng video.'
            : 'Trên iPhone/iPad: lưu video vào ứng dụng Tệp rồi bấm "Chọn file video". Không có video trên máy này thì xem trên máy tính rồi học tiếp các phần dưới.'} File của bài này: ${esc(v.file)}</p>`}
        ${mine && player.error ? `<p class="video-error">${esc(player.error)}</p>` : ''}
        ${v.chapters.length ? `
          <p class="how-label">Mục lục video</p>
          <ol class="chapter-list">
            ${v.chapters.map(c => `<li><button type="button" data-act="seek" data-t="${esc(c.t)}"><span class="chapter-time">${esc(c.t)}</span><span>${esc(c.title)}</span></button></li>`).join('')}
          </ol>` : ''}
      </section>`;
  }

  // Cách học riêng cho từng loại bài: xem chủ động → tự nhớ lại → luyện có chữa → ôn ngắt quãng
  function studySteps(skill, lesson) {
    const v = videoInfo(skill, lesson);
    const p = lesson.practice || {};
    const part = ((p.questions || [])[0] || {}).part || 1;
    const steps = [v
      ? `Xem video ${lesson.video} (${v.duration}) ở thẻ Video bên dưới. Khi cô bảo dừng video để tự làm thì dừng thật, tự làm xong mới xem tiếp.`
      : `Xem video bài giảng số ${lesson.video}. Khi cô bảo dừng video để tự làm thì dừng thật, tự làm xong mới xem tiếp.`];
    if (skill === 'writing') {
      if (p.type === 'essay') {
        steps.push('Chép dàn ý của cô vào vở: mở bài, ý của 2 thân bài, kết bài và các câu mở đoạn.',
          'Đọc bài mẫu ở phần Ví dụ, gạch chân câu chủ đề và từ nối của từng đoạn.',
          'Bấm "Viết bài này": 5 phút lập dàn ý theo cách của cô, 40 phút viết, rồi đọc band AI chấm và viết lại đoạn yếu nhất.');
      } else if ((lesson.examples || []).some(ex => /^Mở bài/.test(ex.vi || ''))) {
        steps.push('Chép dàn ý 4 đoạn và các cụm cô gạch chân vào vở (cô khuyên ghi tay).',
          'Chưa nhìn bài mẫu: tự viết lại đoạn tổng quan theo trí nhớ, rồi mới kéo xuống phần Ví dụ để so. Tự nhớ lại giúp nhớ lâu hơn đọc lại.',
          'Làm phần Luyện tập với số liệu mới, bấm "Nhờ AI chữa" và sửa đúng các lỗi được chỉ ra.');
      } else {
        steps.push('Chép các công thức trong Ý chính vào vở, mỗi công thức kèm 1 câu ví dụ của riêng bạn.',
          'Làm phần Luyện tập, bấm "Nhờ AI chữa" và sửa đúng các lỗi được chỉ ra.');
      }
    } else if (part === 2) {
      steps.push('Chép khung 5 phần (mở đầu, thông tin cơ bản, cốt lõi, cảm nhận, kết) và các cụm hay vào vở Speaking.',
        'Bấm "Nghe mẫu" từng đoạn và nói đuổi theo, bắt chước nhịp và ngữ điệu.',
        'Chọn 1 đề ở phần Luyện tập: 1 phút ghi từ khoá cho 5 phần, bấm "Nói câu này với AI" và nói liền 2 phút; đọc nhận xét rồi nói lại lần 2.');
    } else {
      steps.push('Bấm "Nghe mẫu" từng câu trả lời mẫu và nói đuổi theo 2 lần.',
        `Ở phần Luyện tập, bấm "Nói câu này với AI" cho từng câu, trả lời theo đúng khung của bài này (ghi ở đầu phần Luyện tập); đọc nhận xét rồi nói lại lần 2.`);
    }
    steps.push(`Bấm "Hoàn thành bài học": app sẽ nhắc ôn lại bài này sau 1, 3, 7 và 14 ngày.${lesson.minutes <= 18 ? ' Bài ngắn, có thể học luôn bài tiếp theo.' : ''}`);
    return steps;
  }

  function renderReview(skill, lesson) {
    const rv = window.todayModule && window.todayModule.reviewInfo ? window.todayModule.reviewInfo(skill, lesson.id) : null;
    if (!rv || !rv.due) return '';
    return `
      <section class="ios-card lesson-card review-card">
        <h4>Ôn lại bài này · lần ${rv.n + 1}/${rv.total}</h4>
        <ol class="study-steps">
          <li>Chưa kéo xuống: tự nói hoặc viết nháp 3 ý chính bạn còn nhớ.</li>
          <li>Đọc phần Ý chính và Ví dụ để so; ý nào quên thì đọc to 2 lần.</li>
          <li>${skill === 'speaking' ? 'Nghe mẫu 1 câu rồi nói lại không nhìn.' : 'Viết lại 1 câu mẫu theo trí nhớ.'}${videoInfo(skill, lesson) ? ' Quên nhiều thì bấm mục lục để xem lại đúng đoạn đó.' : ''}</li>
        </ol>
        <button type="button" class="btn-filled" data-act="review-done">Đã ôn xong</button>
      </section>`;
  }

  // ---------- Một bài học ----------
  function renderExamples(skill, lesson) {
    if (!lesson.examples || !lesson.examples.length) return '';
    const label = { bad: 'Chưa tốt', good: 'Tốt', model: 'Mẫu', note: '' };
    return `
      <section class="ios-card lesson-card">
        <h4>Ví dụ</h4>
        ${lesson.examples.map((ex, i) => `
          <div class="ex ex-${ex.kind}">
            ${label[ex.kind] ? `<span class="ex-label">${label[ex.kind]}</span>` : ''}
            <p class="ex-text">${esc(ex.text)}</p>
            ${ex.vi ? `<p class="ex-vi">${esc(ex.vi)}</p>` : ''}
            ${skill === 'speaking' && ex.kind === 'model' && ex.say !== false ? `<button type="button" class="btn-tinted btn-small" data-act="say-ex" data-i="${i}">Nghe mẫu</button>` : ''}
          </div>`).join('')}
      </section>`;
  }

  function renderAiResult(lesson) {
    const r = aiState[lesson.id];
    if (!r) return '';
    if (r.loading) return '<div class="ai-box"><p class="muted">AI đang chữa bài…</p></div>';
    if (r.error) {
      return `<div class="ai-box is-error"><p>${esc(r.error)}</p>${/API Key/i.test(r.error) ? '<button type="button" class="btn-tinted btn-small" data-act="ai-settings">Mở cài đặt AI</button>' : ''}</div>`;
    }
    const d = r.data || {};
    const score = Math.max(0, Math.min(10, Number(d.score) || 0));
    return `
      <div class="ai-box">
        <div class="result-head"><span>Mức đạt yêu cầu bài học</span><strong>${score}/10</strong></div>
        ${(d.good_vi || []).length ? `<h5>Bạn làm tốt</h5><ul class="plain-list">${d.good_vi.slice(0, 3).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${(d.fixes || []).length ? `<h5>Cần sửa</h5><ul class="fix-list">${d.fixes.slice(0, 5).map(f => `
          <li><p><del>${esc(f.original)}</del></p><p><ins>${esc(f.better)}</ins></p><p class="muted">${esc(f.why_vi)}</p></li>`).join('')}</ul>` : ''}
        ${d.improved ? `<h5>Bản sửa gợi ý</h5><p class="ex-text ai-improved">${esc(d.improved)}</p>` : ''}
        ${d.next_vi ? `<p class="ai-next"><strong>Luyện tiếp:</strong> ${esc(d.next_vi)}</p>` : ''}
      </div>`;
  }

  function renderPractice(skill, lesson) {
    const p = lesson.practice;
    let body = '';
    if (p.type === 'write') {
      const draft = loadDrafts()[lesson.id] || '';
      body = `
        ${(p.items || []).length ? `<ul class="practice-items">${p.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        <label class="sr-only" for="course-input-${lesson.id}">Bài làm</label>
        <textarea id="course-input-${lesson.id}" class="writing-textarea is-short" rows="${p.rows || 6}" data-lesson="${lesson.id}" spellcheck="false" placeholder="Viết bài làm ở đây…">${esc(draft)}</textarea>
        <button type="button" class="btn-tinted" data-act="check"${aiState[lesson.id] && aiState[lesson.id].loading ? ' disabled' : ''}>Nhờ AI chữa</button>
        ${renderAiResult(lesson)}`;
    } else if (p.type === 'essay') {
      const promptText = window.writingModule ? window.writingModule.promptText(p.taskType, p.promptId) : '';
      body = `
        ${promptText ? `<p class="practice-prompt">${esc(promptText)}</p>` : ''}
        <button type="button" class="btn-filled" data-act="essay">Viết bài này (có đồng hồ & AI chấm band)</button>`;
    } else if (p.type === 'speak') {
      body = `
        ${(p.shadow || []).length ? `
          <ul class="shadow-list">
            ${p.shadow.map((s, i) => `<li><p class="ex-text">${esc(s)}</p><button type="button" class="btn-tinted btn-small" data-act="say-shadow" data-i="${i}">Nghe</button></li>`).join('')}
          </ul>` : ''}
        <ul class="speak-list">
          ${p.questions.map((q, i) => `
            <li class="speak-q">
              <span class="task-skill skill-speaking">Part ${q.part}</span>
              <p class="speak-q-text">${esc(q.q)}</p>
              <p class="speak-q-vi">${esc(q.vi)}</p>
              ${(q.bullets || []).length ? `<p class="speak-q-vi">You should say:</p><ul class="speak-bullets">${q.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
              <div class="speak-q-actions">
                <button type="button" class="btn-plain" data-act="say-q" data-i="${i}">Nghe câu hỏi</button>
                <button type="button" class="btn-tinted" data-act="practice" data-i="${i}">Nói câu này với AI</button>
              </div>
            </li>`).join('')}
        </ul>
        <p class="group-foot">"Nói câu này với AI" mở mục Nói ngay với đúng câu hỏi: ghi âm, nhận xét lỗi và bản nâng cấp. Quay lại tab Lộ trình để học tiếp.</p>`;
    }
    return `
      <section class="ios-card lesson-card">
        <h4>Luyện tập</h4>
        <p class="practice-task">${esc(p.task)}</p>
        ${body}
      </section>`;
  }

  function renderLesson(skill, lesson) {
    const list = trackOf(skill, lesson.id).lessons;
    const i = list.indexOf(lesson);
    const done = !!progress(skill)[lesson.id];
    const prev = list[i - 1], next = list[i + 1];
    const rv = done && window.todayModule && window.todayModule.reviewInfo ? window.todayModule.reviewInfo(skill, lesson.id) : null;
    const nextReview = rv && rv.next && !rv.due ? ` · ôn lại ngày ${rv.next.getDate()}/${rv.next.getMonth() + 1}` : '';
    return `
      <div class="lesson-page">
        <button type="button" class="btn-plain lesson-back" data-act="back">‹ Tất cả bài học</button>
        <p class="lesson-kicker">Bài ${i + 1}/${list.length} · ${esc(lesson.unit)} · ${lesson.minutes} phút</p>
        <h2 class="lesson-title">${esc(lesson.title)}</h2>
        ${lesson.video ? `<p class="lesson-source">Theo video bài giảng số ${lesson.video}</p>` : ''}
        <p class="lesson-goal"><strong>Mục tiêu:</strong> ${esc(lesson.goal)}</p>
        ${renderReview(skill, lesson)}
        ${lesson.video && !done ? `
          <section class="ios-card lesson-card">
            <h4>Cách học bài này</h4>
            <ol class="study-steps">${studySteps(skill, lesson).map(s => `<li>${esc(s)}</li>`).join('')}</ol>
          </section>` : ''}
        ${renderVideo(skill, lesson)}
        <section class="ios-card lesson-card">
          <h4>Ý chính</h4>
          <ul class="lesson-points">${lesson.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </section>
        ${renderExamples(skill, lesson)}
        ${renderPractice(skill, lesson)}
        <div class="lesson-footer">
          ${prev ? `<button type="button" class="btn-plain" data-act="open" data-id="${prev.id}">‹ Bài ${i}</button>` : '<span></span>'}
          ${done ? `<span class="lesson-done">Đã hoàn thành${nextReview}</span>`
            : '<button type="button" class="btn-filled" data-act="complete">Hoàn thành bài học</button>'}
          ${next ? `<button type="button" class="btn-plain" data-act="open" data-id="${next.id}">Bài ${i + 2} ›</button>` : '<span></span>'}
        </div>
      </div>`;
  }

  function render(container, skill) {
    if (!container) return;
    mounts[skill] = container;
    container.dataset.skill = skill;
    const lesson = allLessons(skill).find(l => l.id === openId[skill]);
    // Vẽ lại trang không làm video chạy lại từ đầu
    const old = container.querySelector('video.lesson-video');
    if (old && player.seek == null) Object.assign(player, { seek: old.currentTime, play: !old.paused });
    container.innerHTML = lesson ? renderLesson(skill, lesson) : renderOverview(skill);
    const video = container.querySelector('video.lesson-video');
    if (video && player.seek != null) {
      const { seek, play } = player;
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = seek;
        if (play) video.play().catch(() => {});
      }, { once: true });
    }
    player.seek = null;
    bind(container);
  }

  function rerender(skill) {
    const c = mounts[skill];
    if (c && c.isConnected) render(c, skill);
  }

  // ---------- AI chữa bài viết ngắn ----------
  async function checkWithAI(lesson, text) {
    const sp = window.speakingModule;
    if (!sp || !sp.callGemini) throw new Error('Chưa tải được mô-đun AI. Hãy tải lại trang.');
    const p = lesson.practice;
    const system = `You are a patient, encouraging IELTS Writing teacher for a Vietnamese beginner (around A2–B1).
Today's lesson: "${lesson.title}". Lesson goal (Vietnamese): ${lesson.goal}
Judge the exercise ONLY on what this lesson teaches: ${p.check}.
Be honest but kind. Write every explanation in simple Vietnamese, addressed to the learner as "bạn". Quote the learner's exact words in "original".
Return ONLY a JSON object:
{
  "score": 7,
  "good_vi": ["..."],
  "fixes": [{ "original": "...", "better": "...", "why_vi": "..." }],
  "improved": "a corrected, slightly improved version of the learner's whole answer",
  "next_vi": "one concrete thing to practise next"
}
"score" is 0–10 for how well the exercise meets the lesson goal. "fixes" has at most 5 items and is empty if nothing needs fixing.`;
    const exercise = [p.task].concat(p.items || []).join('\n');
    return sp.callGemini(`EXERCISE:\n${exercise}\n\nLEARNER'S ANSWER:\n"""\n${text}\n"""`, system);
  }

  // ---------- Sự kiện ----------
  function bind(container) {
    if (container.dataset.courseBound) return;
    container.dataset.courseBound = '1';

    container.addEventListener('input', e => {
      if (e.target.dataset.lesson) saveDraft(e.target.dataset.lesson, e.target.value);
    });

    container.addEventListener('change', e => {
      const skill = container.dataset.skill;
      const lesson = allLessons(skill).find(l => l.id === openId[skill]);
      const file = e.target.dataset.act === 'video-file' && e.target.files && e.target.files[0];
      if (lesson && file) playFile(skill, lesson, file, 0);
    });

    container.addEventListener('click', async e => {
      const btn = e.target.closest('[data-act]');
      if (!btn || !container.contains(btn)) return;
      const skill = container.dataset.skill;
      const lesson = allLessons(skill).find(l => l.id === openId[skill]);
      const sp = window.speakingModule;
      switch (btn.dataset.act) {
        case 'track':
          trackKey[skill] = btn.dataset.track;
          openId[skill] = null;
          render(container, skill);
          return;
        case 'open':
          openId[skill] = btn.dataset.id;
          render(container, skill);
          container.scrollIntoView({ block: 'start' });
          window.scrollBy(0, -80);
          return;
        case 'back':
          openId[skill] = null;
          render(container, skill);
          return;
        case 'complete':
          if (lesson && window.todayModule) window.todayModule.completeLesson(skill, lesson.id);
          render(container, skill);
          return;
        case 'review-done':
          if (lesson && window.todayModule) window.todayModule.reviewLesson(skill, lesson.id);
          render(container, skill);
          return;
        case 'video-open':
          if (lesson) openVideo(skill, lesson, 0);
          return;
        case 'seek': {
          const video = container.querySelector('video.lesson-video');
          const t = toSec(btn.dataset.t);
          if (video) {
            video.currentTime = t;
            video.play().catch(() => {});
            video.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (lesson && canPickFolder) {
            openVideo(skill, lesson, t);
          } else if (lesson) {
            Object.assign(player, { key: vkey(skill, lesson), error: 'Bấm "Chọn file video" để mở video trước, rồi bấm mục lục để tua tới đoạn đó.' });
            render(container, skill);
          }
          return;
        }
        case 'say-ex':
          if (sp && lesson) sp.speak(lesson.examples[Number(btn.dataset.i)].text);
          return;
        case 'say-shadow':
          if (sp && lesson) sp.speak(lesson.practice.shadow[Number(btn.dataset.i)]);
          return;
        case 'say-q':
          if (sp && lesson) sp.speak(lesson.practice.questions[Number(btn.dataset.i)].q);
          return;
        case 'practice': {
          const q = lesson && lesson.practice.questions[Number(btn.dataset.i)];
          if (q && sp && sp.practiceQuestion) {
            sp.practiceQuestion({ id: `${lesson.id}_q${btn.dataset.i}`, part: q.part, topic: `Bài học: ${lesson.title}`, question: q.q, vietnamese: q.vi, bullets: q.bullets || [] });
            window.scrollTo(0, 0);
          }
          return;
        }
        case 'essay':
          if (lesson && window.writingModule) window.writingModule.openPrompt(lesson.practice.taskType, lesson.practice.promptId);
          return;
        case 'ai-settings':
          if (sp) sp.openAISettings();
          return;
        case 'check': {
          if (!lesson) return;
          const text = (loadDrafts()[lesson.id] || '').trim();
          if (text.split(/\s+/).length < 3) {
            aiState[lesson.id] = { error: 'Hãy viết bài làm trước khi nhờ AI chữa.' };
            render(container, skill);
            return;
          }
          aiState[lesson.id] = { loading: true };
          render(container, skill);
          try {
            aiState[lesson.id] = { data: await checkWithAI(lesson, text) };
          } catch (err) {
            aiState[lesson.id] = { error: err.message || 'AI chưa chữa được bài, vui lòng thử lại.' };
          }
          rerender(skill);
          return;
        }
      }
    });
  }

  function open(skill, id) {
    if (!BUILTIN[skill]) return;
    openId[skill] = id || null;
    if (id) trackKey[skill] = trackOf(skill, id).key;
    rerender(skill);
  }

  window.courseModule = {
    render, open,
    // Thứ tự lịch học: bài giảng giáo viên trước, rồi Nâng cao; n/total đánh số trong từng lộ trình
    lessons: skill => tracks(skill).flatMap(tr => tr.lessons.map((l, i) => ({
      id: l.id, title: l.title, unit: l.unit, minutes: l.minutes, goal: l.goal,
      track: tracks(skill).length > 1 ? tr.name : '', n: i + 1, total: tr.expected || tr.lessons.length,
      how: l.video ? studySteps(skill, l) : null
    }))),
    isComplete: skill => {
      const main = tracks(skill)[0];
      return !!main && (!main.expected || main.lessons.length >= main.expected) && allLessons(skill).every(l => progress(skill)[l.id]);
    },
    refresh() { rerender('writing'); rerender('speaking'); }
  };
})();
