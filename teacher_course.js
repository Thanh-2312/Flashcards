/**
 * BÀI GIẢNG VIDEO
 * Lộ trình chính của app: mỗi bài tóm tắt 1 video, đã sửa lỗi nhận dạng giọng nói trong transcript.
 * id cố định theo số video (hw01 = Writing video 1, hs01 = Speaking video 1) để giữ tiến độ học;
 * thêm bài mới thì chèn đúng vị trí theo số video, không sửa id bài cũ.
 * Kiểm tra định dạng: node tools/check_teacher_course.js
 */
window.TEACHER_COURSE = {
  expected: { writing: 30, speaking: 40 },
  writing: [
    {
      id: 'hw01', video: 1, unit: 'Task 1: Tổng quan', minutes: 20,
      title: 'Giới thiệu IELTS Writing Task 1',
      goal: 'Biết đề Task 1 trông thế nào, 7 dạng biểu đồ, 4 tiêu chí chấm và bố cục 4 đoạn.',
      points: [
        'Bài thi Writing dài 60 phút: dành 20 phút cho Task 1 và 40 phút cho Task 2.',
        'Đề nào cũng có câu "Summarise the information by selecting and reporting the main features, and make comparisons where relevant": chọn và báo cáo những điểm chính, so sánh khi cần, không viết hết mọi con số. Viết ít nhất 150 từ.',
        '7 dạng đề: Line graph (biểu đồ đường), Pie chart (biểu đồ tròn), Bar chart (biểu đồ cột), Table (bảng số liệu), Process (quy trình do con người tạo ra hoặc quy trình tự nhiên như vòng đời một con vật), Map (bản đồ một khu vực qua các năm) và Mixed charts (kết hợp 2 dạng). Nhớ tên tiếng Anh để dùng ở câu mở bài.',
        '4 tiêu chí, mỗi tiêu chí chiếm 25%: Task Achievement (báo cáo đúng thông tin quan trọng nhất, không sai số liệu, đủ 150 từ), Coherence and Cohesion (các câu nối với nhau hợp lý, nhóm thông tin hợp lý), Lexical Resource (dùng từ đồng nghĩa thay vì lặp từ, đúng collocation, đúng chính tả, tránh từ không trang trọng), Grammatical Range and Accuracy (kết hợp câu đơn với câu phức, đúng thì, đúng từ loại, đúng dấu câu).',
        'Task 1 không nêu ý kiến cá nhân: không viết "I think" hay "In my opinion", chỉ báo cáo lại biểu đồ.',
        'Bố cục 4 đoạn và không có kết luận: Mở bài 1 câu (paraphrase đề) → Tổng quan khoảng 2 câu (2 điểm nổi bật nhất, không đưa số liệu) → Thân bài 1 và Thân bài 2 (mỗi đoạn 2–3 câu, 3–5 số liệu). Khoảng 8–9 câu là đủ 150 từ.'
      ],
      examples: [
        { kind: 'note', text: 'Paraphrase là dùng từ đồng nghĩa và cấu trúc khác để viết lại đề mà giữ nguyên nghĩa. Đây là cách viết câu mở bài.' },
        { kind: 'note', text: 'Collocation là những từ thường đi cùng nhau: tóc vàng là "blonde hair", không nói "yellow hair" dù yellow nghĩa là màu vàng.' },
        { kind: 'bad', text: 'In my opinion, the number of visitors increased sharply.', vi: 'Task 1 không nêu ý kiến cá nhân.' },
        { kind: 'good', text: 'The number of visitors increased sharply.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Không nhìn lại bài, viết ra (tiếng Việt hoặc tiếng Anh): 7 dạng đề Task 1 bằng tên tiếng Anh, 4 tiêu chí chấm, và bố cục 4 đoạn (mỗi đoạn mấy câu, viết gì).',
        check: 'recall of the video content: the 7 Task 1 types (line graph, pie chart, bar chart, table, process, map, mixed charts); the 4 criteria (task achievement, coherence and cohesion, lexical resource, grammatical range and accuracy, 25% each); the 4-paragraph structure (one-sentence paraphrased introduction, an overview of about 2 sentences with no numbers, two body paragraphs of 2–3 sentences with 3–5 figures each, no conclusion, no personal opinion, at least 150 words). The learner may answer in Vietnamese.'
      }
    },
    {
      id: 'hw02', video: 2, unit: 'Task 1: Từ vựng xu hướng', minutes: 28,
      title: 'Từ vựng và cấu trúc miêu tả xu hướng',
      goal: 'Viết được câu tăng, giảm, dao động, ổn định và tại 1 điểm bằng 3 công thức khác nhau, đúng giới từ khi đưa số liệu.',
      points: [
        'Bài cực kỳ quan trọng vì dùng cho phần lớn các dạng Task 1 có xu hướng. 5 nhóm: tăng, giảm, dao động, giữ ổn định, tại 1 điểm.',
        'Chỉ cần học 4 từ tăng (increase, climb, rise, grow) và 4 từ giảm (decrease, decline, drop, fall). Chuẩn bị sẵn V2: rose, grew, dropped (gấp đôi p), fell. Danh từ: increase, climb, rise, growth; decrease, decline, drop, fall.',
        'Thêm trạng từ mức độ để được điểm cao: rất mạnh dramatically/enormously; mạnh significantly/considerably; nhẹ slightly/minimally; liên tục constantly/continuously; dần dần gradually/steadily. Bỏ -ly thì thành tính từ (gradual, slight...).',
        'Công thức 1: Time, S + V + adv + number. Công thức 2: Time, there was + a/an + adj + n + in + S + number (dịch là "sự tăng/giảm", tính từ đặt trước danh từ). Công thức 3: Time (The period from... to...) + saw + a/an + adj + n + in + S + number. Ba câu cùng nghĩa nhưng lối hành văn khác nhau, cần xen kẽ.',
        'Thời gian: from... to... hoặc between... and... (between đi với and, không đi với to). Dùng between cho thời gian để tránh lặp from... to... hai lần trong câu.',
        'Giới từ đưa số liệu: tăng/giảm dùng from A to B, to B (chỉ điểm đến) hoặc by + số chênh lệch; dao động dùng between A and B; giữ ổn định dùng at. around = about = khoảng.',
        'Dao động: fluctuate, vary (danh từ fluctuation, variation). Ổn định: remain/stay stable, remain unchanged (danh từ stability, no change), thêm relatively cho hay; ổn định chỉ dùng công thức 1 và 2 (There was a period of stability in...).',
        'Tại 1 điểm: was/were hoặc stood at. Điểm đầu started at, điểm cuối ended at, cao nhất reached a peak of, thấp nhất hit a low of (hit giữ nguyên ở quá khứ).'
      ],
      examples: [
        { kind: 'model', text: 'Between 1990 and 1993, the number of X increased gradually from around 2 to about 10.', vi: 'Công thức 1.' },
        { kind: 'model', text: 'From 1990 to 1993, there was a gradual increase in the number of X from around 2 to about 10.', vi: 'Công thức 2.' },
        { kind: 'model', text: 'The period from 1990 to 1993 saw a gradual decline in the number of X from around 10 to about 2.', vi: 'Công thức 3.' },
        { kind: 'model', text: 'From 1990 to 1993, the number of X fluctuated slightly between 1.7 and 3.' },
        { kind: 'model', text: 'From 1990 to 1993, the number of X remained relatively stable at around 5.' },
        { kind: 'model', text: 'In 1992, the number of X reached a peak of around 20, while in 1993 it hit a low of only 2.' },
        { kind: 'bad', text: 'From 1990 to 1993, the number of X increased gradually by around 2 to about 10.', vi: 'by chỉ dùng cho số chênh lệch (by around 8), không đi với số bắt đầu/kết thúc.' }
      ],
      practice: {
        type: 'write', rows: 7,
        task: 'Số lượng khách du lịch tới thị trấn A (nghìn người) từ 2000 đến 2010. Viết 6 câu: 3 câu cho giai đoạn tăng dùng đủ 3 công thức, 1 câu dao động, 1 câu ổn định, 1 câu về điểm cao nhất.',
        items: ['2000: 20; 2004: 60 (tăng mạnh)', '2004–2007: dao động trong khoảng 55–65', '2007–2010: giữ ở mức khoảng 60', 'Cao nhất: 65 vào năm 2005'],
        check: 'only what this lesson teaches: the three trend formulas (Time, S + V + adv + number; Time, there was a/an + adj + n + in + S + number; Time saw a/an + adj + n + in + S + number), correct past tense verbs (rose, grew, fell, dropped), adverb vs adjective forms, correct prepositions for figures (from...to / to / by for rises and falls, between...and for fluctuation, at for stability, reached a peak of, hit a low of), between...and for time. Point out each error and give a corrected sentence.'
      }
    },
    {
      id: 'hw03', video: 3, unit: 'Task 1: Cấu trúc so sánh', minutes: 20,
      title: 'Cấu trúc so sánh đơn giản',
      goal: 'So sánh số liệu bằng 5 cấu trúc: nối 2 câu, 2 vế trong 1 câu, so sánh nhất, hơn, bằng.',
      points: [
        'Task 1 được chấm cả việc có so sánh các số liệu với nhau hay không, nên cần 5 cấu trúc: so sánh giữa 2 câu, 2 vế trong 1 câu, so sánh nhất, so sánh hơn, so sánh bằng.',
        'Hai câu cùng xu hướng: Câu 1. Similarly, / Likewise, câu 2. Thay vì lặp lại năm, dùng in the same year.',
        'Hai câu trái xu hướng: Câu 1. By contrast, / In contrast, câu 2. Sau các từ nối này luôn có dấu phẩy.',
        'Hai vế trong 1 câu: Vế 1, while / whereas vế 2. Dấu phẩy đặt trước while/whereas, không đặt dấu phẩy ngay sau nó.',
        'So sánh nhất: The number of X + be + highest/lowest. Nhiều học viên quên to be trước tính từ.',
        'So sánh hơn: The number of X + be + higher/lower than + that of Y (dùng that of để không lặp the number of). Thêm mức độ: significantly higher (cao hơn nhiều), slightly higher (cao hơn một chút).',
        'So sánh bằng: The number of X + be + the same as + that of Y; hoặc The figures for X and Y + be + the same / similar.',
        'the number of + danh từ đếm được số nhiều (cars, computers); the amount of + danh từ không đếm được (money, water).'
      ],
      examples: [
        { kind: 'model', text: 'The number of X increased to around 600 in 1990. Similarly, the number of Y rose to about 700 in the same year.' },
        { kind: 'model', text: 'The number of X increased to around 600 in 1990. By contrast, the number of Y decreased to about 200 in the same year.' },
        { kind: 'model', text: 'In 1990, the number of X increased to around 600, while the number of Y decreased to about 200.' },
        { kind: 'model', text: 'In 1990, the number of cars was significantly higher than that of trains.' },
        { kind: 'model', text: 'In 1990, the figures for cars and trains were similar.' },
        { kind: 'bad', text: 'The number of cars highest in 1990.', vi: 'Thiếu to be: The number of cars was highest in 1990.' },
        { kind: 'bad', text: 'The amount of cars was lower than the number of trains.', vi: 'cars đếm được nên dùng the number of; và nên viết than that of trains.' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Số người dùng các phương tiện đi làm ở thành phố B năm 2020 (nghìn người). Viết 5 câu, mỗi câu dùng một cấu trúc khác nhau: Similarly/Likewise, By contrast, while/whereas, so sánh nhất, so sánh hơn (có significantly hoặc slightly) hoặc so sánh bằng.',
        items: ['Xe máy: 800 (tăng so với năm trước)', 'Ô tô: 300 (tăng so với năm trước)', 'Xe buýt: 300 (giảm so với năm trước)', 'Xe đạp: 50 (giảm so với năm trước)'],
        check: 'only the comparison structures taught: Similarly/Likewise for the same trend and By contrast/In contrast for opposite trends between two sentences (followed by a comma), "clause, while/whereas clause" punctuation, be + highest/lowest, be + higher/lower than that of, significantly/slightly before higher/lower, the same as / the figures for X and Y were the same or similar, and the number of vs the amount of. Point out each error and give a corrected sentence.'
      }
    },
    {
      id: 'hw04', video: 4, unit: 'Task 1: Line graph', minutes: 32,
      title: 'Line graph (quá khứ)',
      goal: 'Viết trọn một bài line graph ở thì quá khứ: mở bài paraphrase, tổng quan 2 điểm nổi bật, dàn ý và 2 đoạn thân bài không lặp từ.',
      points: [
        'Trước khi viết, phân tích đề: biểu đồ nói về cái gì, đơn vị là gì (ví dụ terawatt hours), các đường là gì. Bài mẫu: sản lượng điện ở Pháp theo nguồn (thermal, nuclear, hydroelectric, renewables) 1980–2012.',
        'Mở bài = paraphrase đề: The graph → The line graph; bỏ chữ below; shows → compares / indicates / illustrates (có s vì chủ ngữ số ít); X production → the production of X / the amount of X produced; between 1980 and 2012 → from 1980 to 2012 hoặc over a period of 32 years.',
        'Tổng quan (bắt đầu bằng Overall,): với line graph, tìm đường nổi nhất (cao nhất, thấp nhất, dao động nhiều nhất) và xu hướng chung. Nếu các đường có quá nhiều xu hướng khác nhau thì chỉ cần nêu cao nhất và thấp nhất, không đưa số liệu.',
        'Lỗi hay gặp: viết "Nuclear power was highest". Bài nói về lượng điện sản xuất từ nguồn đó, nên phải viết electricity production from nuclear power was highest.',
        'Lập dàn ý thân bài trước khi viết: có thể chia theo đường hoặc theo năm. Bài mẫu chia: Body 1 là năm đầu (1980) + điểm nổi bật nhất giai đoạn đầu (năm sau đó nuclear vượt thermal); Body 2 là xu hướng còn lại của từng đường, chọn điểm nổi nhất (đỉnh) chứ không nhất thiết là năm cuối.',
        'Tránh lặp "lượng điện được sản xuất": đảo số liệu lên đầu câu (about 120 terawatt hours of electricity was produced from...), đổi chủ ngữ (nuclear power stations produced..., renewable energy provided a negligible amount), dùng the figure for X, và xen kẽ 3 cách viết electricity production / the production of electricity / the amount of electricity produced.',
        'Cụm nên học nguyên khối: In the same year; One year later / two years later; A overtook B as the primary source of electricity; provided a negligible amount; for the rest of the period; over the whole 32-year period; during the last seven years.'
      ],
      examples: [
        { kind: 'model', text: 'The line graph compares the amount of electricity produced in France over a period of 32 years.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, electricity production from nuclear power was highest, while the amount of electricity produced from renewable energy was lowest during the period shown.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'In 1980, about 120 terawatt hours of electricity was produced from thermal power. In the same year, nuclear and hydroelectric power stations produced around 75 terawatt hours of electricity each. Renewable energy provided a negligible amount. One year later, nuclear energy overtook thermal energy as the primary source of electricity.', vi: 'Thân bài 1.' },
        { kind: 'model', text: 'From 1980 to 2005, electricity production from nuclear power increased constantly and reached a peak of some 430 terawatt hours. By contrast, the figure for thermal energy declined to only 50 terawatt hours in 1985 and remained almost unchanged for the rest of the period. The production of electricity from hydroelectric power stayed relatively stable, between around 50 and 80 terawatt hours, over the whole 32-year period. The amount of electricity produced from renewable energy rose slightly during the last seven years.', vi: 'Thân bài 2.' },
        { kind: 'bad', text: 'Overall, nuclear power was highest.', vi: 'Bài nói về lượng điện, không phải về năng lượng: electricity production from nuclear power was highest.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài line graph (mở bài, tổng quan, 2 thân bài) cho đề: "The graph below shows the number of visitors (in millions) to three museums in a city between 2000 and 2020." Dùng thì quá khứ, không lặp chủ ngữ.',
        items: ['Bảo tàng Lịch sử: 2000: 4; tăng đều lên đỉnh 9 năm 2015; 2020: 8', 'Bảo tàng Nghệ thuật: 2000: 5 (cao nhất năm đầu); giảm còn 2 năm 2005; sau đó gần như không đổi', 'Bảo tàng Khoa học: 2000: 1; giữ khoảng 1–2 tới 2013; tăng nhẹ 7 năm cuối lên 3', 'Năm 2003: Bảo tàng Lịch sử vượt Bảo tàng Nghệ thuật'],
        check: 'only what this lesson teaches: an introduction that paraphrases the prompt (line graph, no "below", shows→compares/illustrates, between...and→from...to or over a period of 20 years); an overview starting with Overall that names the highest and lowest lines without figures and refers to visitors to the museums, not the museums themselves; body 1 = first year + the overtaking point (A overtook B as the most visited museum); body 2 = remaining trends with peaks; past tense; varied subjects to avoid repeating "the number of visitors" (the figure for, number-first sentences); phrases such as In the same year, One year later, for the rest of the period. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw05', video: 5, unit: 'Task 1: Line graph', minutes: 26,
      title: 'Line graph (quá khứ và tương lai)',
      goal: 'Viết bài line graph có cả năm quá khứ và tương lai: tổng quan ở hiện tại đơn, thân bài 1 ở quá khứ, thân bài 2 dùng công thức dự đoán.',
      points: [
        'Đề mẫu: số người Anh đi lại hằng ngày (commuters) bằng xe hơi, xe buýt, xe lửa từ 1970 đến 2030, có cả năm quá khứ lẫn năm tương lai. travel each day dịch là đi lại hằng ngày, không phải đi du lịch.',
        'Mở bài: The graph → The line graph; shows → compares; the average number of → figures for; UK commuters travelling each day → daily travel by people in the UK; by car, bus or train → using three different forms of transport; between 1970 and 2030 → over a period of 60 years.',
        'Tổng quan 2 câu: đường nổi nhất (xe hơi phổ biến nhất) + xu hướng chung (xe hơi, xe lửa tăng; xe buýt giảm). Đề có cả quá khứ và tương lai thì tổng quan nói về cả giai đoạn nên dùng thì hiện tại đơn. by far đặt trước so sánh nhất để nhấn mạnh "hơn hẳn"; Also để nối thêm ý.',
        'Phương tiện giao thông: means / form / mode of transport. Trong suốt giai đoạn: during / throughout / over the period shown. Người dùng xe hơi: people who use the car = car users.',
        'Dàn ý chia theo năm để so sánh được các đường với nhau: Body 1 viết giai đoạn quá khứ (năm đầu 1970, rồi xu hướng tới năm 2000), Body 2 viết giai đoạn tương lai (năm 2030) bằng công thức dự đoán.',
        'Tránh lặp "số người": đưa số liệu lên làm chủ ngữ (around 5 million UK commuters travelled by car), dùng bị động (the bus and train were used by... respectively), đổi cách gọi (people driving to work, commuting rail passengers, train users, bus users), dùng công thức there was a small drop in...',
        'Công thức dự đoán: S + be + predicted / expected / estimated / projected / likely + to V. The number of + danh từ số nhiều vẫn là chủ ngữ số ít nên dùng is.',
        'Lưu ý nhỏ: có số cụ thể thì hundred, thousand, million, billion không thêm s (5 million people), không có số mới thêm s (millions of people = hàng triệu người). respectively (lần lượt) đặt cuối câu, sau số liệu. Đi lại bằng: travel / go / commute by + phương tiện; mỗi ngày: every day, each day, per day, on a daily basis (học thuật hơn).'
      ],
      examples: [
        { kind: 'model', text: 'The line graph compares figures for daily travel by people in the UK using three different forms of transport over a period of 60 years.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, the car is by far the most popular means of transport for UK commuters during the period shown. Also, the numbers of people who use the car and train increase gradually, while the number of bus users falls steadily.', vi: 'Tổng quan (hiện tại đơn vì nói cả giai đoạn).' },
        { kind: 'model', text: 'In 1970, around 5 million UK commuters travelled by car on a daily basis, while the bus and train were used by about 4 million and 2 million people respectively. In the year 2000, the number of people driving to work rose to 7 million and the number of commuting rail passengers climbed to 3 million. However, there was a small drop in the number of bus users.', vi: 'Thân bài 1 (quá khứ).' },
        { kind: 'model', text: 'By 2030, the number of people who commute by car is expected to increase to almost 9 million, and the number of train users is also predicted to rise to nearly 5 million. By contrast, buses are likely to become a less popular choice, with only 3 million daily users.', vi: 'Thân bài 2 (tương lai, công thức dự đoán).' },
        { kind: 'bad', text: 'In 1970, around 5 millions UK commuters travelled by car.', vi: 'Có số cụ thể thì million không thêm s: 5 million.' },
        { kind: 'bad', text: 'By 2030, the number of car users are expected to increase to 9 million.', vi: 'The number of... là chủ ngữ số ít: is expected.' },
        { kind: 'note', text: 'By contrast (ngược lại), không viết By contract (contract là hợp đồng).' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài (mở bài, tổng quan, 2 thân bài) cho đề: "The graph below shows the number of tourists (in millions) visiting a country by plane, ship and train between 1990 and 2030." Tổng quan dùng hiện tại đơn, Body 1 viết giai đoạn quá khứ, Body 2 viết năm 2030 bằng công thức dự đoán.',
        items: ['Máy bay: 1990: 5; 2010: 8; 2030 (dự đoán): 12, cao nhất cả giai đoạn', 'Tàu hoả: 1990: 1; 2010: 2; 2030 (dự đoán): 4', 'Tàu biển: 1990: 3; 2010: 2,5; 2030 (dự đoán): 1,5'],
        check: 'only what this lesson teaches: an introduction that paraphrases the prompt (line graph, compares, figures for, three different forms of transport, over a period of 40 years); an overview in the present simple that names the most popular form of transport (by far the most popular) and the general trends without figures; body 1 in the past tense starting with the first year; body 2 for 2030 using prediction structures (is expected / predicted / projected / likely to + verb, is likely to become a less popular choice); avoiding repetition of "the number of" (number-first subjects, passive "were used by ... respectively", train users, there was a small drop in); "million" without s after a number; "the number of" with a singular verb. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw06', video: 6, unit: 'Task 1: Pie chart', minutes: 28,
      title: 'Pie chart (không có thời gian)',
      goal: 'Viết bài pie chart không có năm: dùng cấu trúc so sánh thay cho từ xu hướng, diễn đạt phần trăm theo nhiều cách, chia thân bài theo phần nổi bật.',
      points: [
        'Biểu đồ không có năm thì không dùng từ tăng, giảm, dao động, ổn định (bài 2) mà dùng cấu trúc so sánh cao, thấp (bài 3). Đề mẫu: lượng nước dùng cho dân cư (residential), công nghiệp (industry), nông nghiệp (agriculture) ở San Diego, California và trên thế giới.',
        'Không lặp water usage: dùng water use, water consumption, the amount of water used, the amount of water consumed (+ for + lĩnh vực).',
        'Một ý 60% có 4 cách viết: (1) the amount of water used for X accounts for / makes up / takes up 60%; (2) bị động: 60% of water is used for X (water không đếm được nên dùng is); (3) đổi số sang chữ: the majority of water is used for X; (4) chủ động: X consumes 60% of the total amount of water used.',
        'Đổi số liệu sang chữ: trên 60% là phần lớn (the majority of); 50% là một nửa (half); khoảng 30–33% là một phần ba (a third); 25% là một phần tư (a quarter).',
        'Mở bài: The pie charts → The three pie charts (đếm số biểu đồ); bỏ below; compare → show; ghi thêm "for three different sectors (...)" trong ngoặc; the rest of the world → the world as a whole.',
        'Tổng quan: biểu đồ tròn chỉ cần nhìn phần lớn nhất, nhỏ nhất của từng hình, không đưa số liệu. Chiếm tỷ lệ cao nhất: account for the highest proportion. Hai ý trái nhau nối bằng By contrast, và đổi cấu trúc câu thứ hai để không lặp.',
        'Dàn ý: Body 1 viết các phần nổi nhất (cao nhất, thấp nhất: dân cư và nông nghiệp), Body 2 viết phần còn lại, không nổi bật (công nghiệp). Câu nối 2 ý ngược nhau: The opposite trend can be seen when we look at... Mở Body 2: Turning to the remaining sector, we can see that...',
        'the figures for + 2 nơi trở lên (có s), the figure for + 1 nơi (không s). respectively đặt cuối câu. Chủ ngữ là việc dùng nước hay một lĩnh vực là số ít nên động từ thêm s (accounts, takes, consumes).'
      ],
      examples: [
        { kind: 'model', text: 'The three pie charts show the amount of water used for three different sectors (the residential sector, industry and agriculture) in San Diego County, California, and the world as a whole.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, in San Diego and California, water use for households accounts for the highest proportion. By contrast, agriculture consumes the majority of water used in the world.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'In San Diego and California, water usage for households takes up around 60% and 39% respectively. The amount of water used for this sector worldwide is only 8%. The opposite trend can be seen when we look at water consumption in agriculture. This sector consumes around 69% of global water use, whereas the figures for San Diego and California are significantly lower, at only 17% and 28%.', vi: 'Thân bài 1: hai lĩnh vực nổi nhất.' },
        { kind: 'model', text: 'Turning to the remaining sector, we can see that water usage for the industrial sector in San Diego and the world is the same (23%), while the figure for California is slightly higher, at 33%.', vi: 'Thân bài 2: lĩnh vực còn lại.' },
        { kind: 'model', text: 'In San Diego, around 60% of water is used for the residential sector. / In San Diego, the residential sector consumes about 60% of the total amount of water used.', vi: 'Cùng một ý: bị động và chủ động.' },
        { kind: 'bad', text: 'In San Diego, around 60% of water are used for the residential sector.', vi: 'water không đếm được nên dùng is.' },
        { kind: 'bad', text: 'This sector consumes around 69% global water use.', vi: 'Thiếu of: around 69% of global water use.' },
        { kind: 'bad', text: 'The figure for San Diego and California are significantly lower.', vi: 'Hai nơi thì viết the figures for.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài (mở bài, tổng quan, 2 thân bài) cho đề: "The pie charts below compare the ways household waste is treated in City A, City B and the country as a whole." Không dùng từ tăng, giảm. Body 1 viết 2 cách xử lý nổi nhất, Body 2 viết cách còn lại.',
        items: ['Thành phố A: tái chế (recycled) 60%, đốt (burned) 25%, chôn lấp (landfill) 15%', 'Thành phố B: tái chế 45%, đốt 35%, chôn lấp 20%', 'Cả nước: tái chế 10%, đốt 25%, chôn lấp 65%'],
        check: 'only what this lesson teaches: no trend verbs because there is no time period; an introduction that paraphrases the prompt (the three pie charts, show, three different methods named in brackets, the country as a whole); an overview starting with Overall that names the largest part of each chart without figures, joined with By contrast; body 1 about the most noticeable methods (recycling and landfill) using a link such as "The opposite trend can be seen when we look at..."; body 2 about the remaining method starting with "Turning to the remaining..."; varied ways to give percentages (account for / take up / make up, passive "60% of waste is recycled", the majority of, active "City A recycles 60% of its waste"), respectively at the end, "the figures for" with two places vs "the figure for" with one, singular verbs with uncountable nouns, significantly/slightly higher. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw07', video: 7, unit: 'Task 1: Pie chart', minutes: 26,
      title: 'Pie chart (có thời gian)',
      goal: 'Viết bài pie chart qua nhiều năm: từ vựng chi tiêu, 3 cách nói một tỷ lệ, tổng quan lớn nhất/nhỏ nhất, gấp đôi, gấp ba, gấp bốn.',
      points: [
        'Pie chart có năm: vừa so sánh lớn nhỏ vừa nói được xu hướng. Năm trong quá khứ thì viết thì quá khứ đơn. Đề mẫu: chi tiêu hằng năm của một trường ở Anh năm 1981, 1991, 2001 (insurance = bảo hiểm, teachers\' salaries = lương giáo viên, furniture and equipment = trang thiết bị, resources = tài liệu, other workers\' salaries = lương nhân viên khác).',
        'Từ vựng chi tiêu: spending, expenditure, the proportion / percentage of spending, the proportion of budget spent (budget = ngân sách). Luôn đi với on, không dùng for: spending on clothes.',
        'Một ý 3 cách: Spending on insurance accounted for 40% of the school\'s budget. / Around 40% of the school\'s budget was spent on insurance (bị động). / The school spent around 40% of its budget on insurance (chủ động).',
        'Mở bài: The three pie charts → The pie charts; show → compare (không s vì chủ ngữ số nhiều); spending → expenditure; by a particular UK school → by a school in the UK; in 1981, 1991 and 2001 → in three different years. Không cần đổi hết, đổi khoảng 70% là được.',
        'Tổng quan: khoản lớn nhất và nhỏ nhất trong cả 3 năm: made up / accounted for / took up the largest proportion (the smallest percentage) of... in all three years. Các khoản có xu hướng mỗi cái một kiểu thì bỏ, tổng quan chỉ ghi điều chung nhất.',
        'Dàn ý: Body 1 viết các khoản lớn nhất (2 khoản lương), Body 2 viết các khoản còn lại. Khoản nào lúc tăng lúc giảm thì không tả chi tiết, chỉ nói dao động (fluctuated / varied) rồi nêu điểm cao nhất hoặc thấp nhất của nó.',
        'Gấp nhiều lần: double (gấp đôi), triple (gấp ba), increase fourfold / fivefold / sixfold... + to + số liệu. Cao nhất: was highest (at...) hoặc reached a peak of... (đổi cách để không lặp). Thêm: This figure..., over the 20-year period.'
      ],
      examples: [
        { kind: 'model', text: 'The pie charts compare the changes in annual expenditure by a school in the UK in three different years.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, teachers\' salaries made up the largest proportion of the school\'s spending in all three years (1981, 1991 and 2001). By contrast, insurance accounted for the smallest percentage.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'In 1981, around 40% of the school\'s budget was spent on teachers\' salaries. This figure rose to 50% in 1991, but fell again to 45% in 2001. Expenditure on other workers\' salaries decreased gradually over the 20-year period, from 28% in 1981 to only 15% in 2001.', vi: 'Thân bài 1: hai khoản lương.' },
        { kind: 'model', text: 'In 1981, the proportion of the school\'s budget spent on insurance was only 2%. However, this figure increased fourfold to 8% in 2001. The percentage of spending on resources and furniture/equipment fluctuated. The figure for resources was highest in 1991, at 20%, and the figure for furniture/equipment reached a peak of 23% in 2001.', vi: 'Thân bài 2: các khoản còn lại.' },
        { kind: 'bad', text: 'The school\'s spending for insurance was only 2%.', vi: 'spending đi với on: spending on insurance.' },
        { kind: 'bad', text: 'Around 40% of the budget was spent on teacher\'s salaries.', vi: 'Lương của nhiều giáo viên: teachers\' salaries (dấu nháy sau s).' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài (mở bài, tổng quan, 2 thân bài) cho đề: "The pie charts below show how an average family in a country spent its household budget in 1990, 2005 and 2020." Viết thì quá khứ, Body 1 viết 2 khoản lớn nhất, Body 2 viết các khoản còn lại.',
        items: ['Nhà ở (housing): 1990: 35%; 2005: 42%; 2020: 40%, lớn nhất cả 3 năm', 'Đồ ăn (food): 30%; 25%; 20%', 'Đi lại (transport): 17%; 12%; 16%', 'Giáo dục (education): 15%; 16%; 15%', 'Giải trí (entertainment): 3%; 5%; 9%, nhỏ nhất cả 3 năm'],
        check: 'only what this lesson teaches: past simple; an introduction that paraphrases the prompt (compare without s, expenditure, in three different years); an overview naming the largest and smallest categories in all three years without figures (made up / accounted for the largest proportion, the smallest percentage, By contrast); body 1 for the two largest categories and body 2 for the rest; spending/expenditure followed by "on", not "for"; varied sentence patterns (X accounted for..., 40% of the budget was spent on..., the family spent ...% of its budget on...); "This figure..."; double/triple/increase fourfold + to + figure; "fluctuated" with only the highest or lowest point; was highest at / reached a peak of. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw08', video: 8, unit: 'Task 1: Table', minutes: 24,
      title: 'Table (không có thời gian)',
      goal: 'Viết bài table chỉ có một năm: đọc bảng theo hàng và cột để tìm điểm nổi bật, chọn lọc số liệu, dùng spend the most/the least on.',
      points: [
        'Bảng chỉ có một năm (hoặc không có năm) thì không có thay đổi theo thời gian, nên không dùng từ xu hướng, chỉ so sánh. Đề mẫu: chi tiêu của người tiêu dùng cho thực phẩm/đồ uống/thuốc lá, quần áo/giày dép, giải trí/giáo dục ở 5 nước năm 2002.',
        'Mở bài: gives information on → compares (thay cả cụm 3 từ, không giữ lại information on; có s vì chỉ 1 bảng); spending → expenditure; different items → categories hoặc goods and services; từ 5 nước trở xuống thì nêu tên từng nước; giữ năm.',
        'Tổng quan cho table: nhìn từng hàng rồi từng cột, tìm số lớn nhất, nhỏ nhất. Theo hàng: khoản nào được chi nhiều nhất, ít nhất ở mọi nước. Theo cột: nước nào chiếm nhiều số lớn nhất (Turkey) → chi tiêu của nước đó nhìn chung cao hơn các nước khác.',
        'Cấu trúc chi tiêu: spend the most (money) on / spend the least (money) on; A spends more than B; expenditure on X was the lowest; the proportion of spending on X was highest in...',
        'Dàn ý: chia theo nước (nhóm chi nhiều, nhóm chi ít) hoặc theo khoản mục. Bài mẫu chia theo khoản mục: Body 1 là 2 khoản nổi nhất (lớn nhất và nhỏ nhất), Body 2 là khoản còn lại.',
        'Không đưa hết số liệu: mỗi khoản chỉ chọn số lớn nhất, nhỏ nhất và số nổi bật; các số gần bằng nhau thì gộp (the other countries spent around 6.5% each on average). Cả bài khoảng 8 số liệu là vừa. Làm tròn: 28.91% → nearly 29%, 15.77% → 15.8%.',
        'Mở Body 2 bằng câu giới thiệu chủ đề: In terms of... (terms luôn có s) hoặc Turning to... Thêm: was slightly lower, at nearly 29%; the lowest proportion was seen in... (bị động); while / whereas để không lặp.'
      ],
      examples: [
        { kind: 'model', text: 'The table compares consumer expenditure on three different categories in Ireland, Italy, Spain, Sweden and Turkey in 2002.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, all countries spent the most on food, drinks and tobacco, while expenditure on leisure and education was the lowest. The expenditure of Turkey was generally higher than that of the other countries.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'Turkey spent the most money on food/drinks/tobacco, at around 32%, while the figure for Ireland was slightly lower, at nearly 29%. Sweden spent the least money on these items, at only 15.8% of the total expenditure. The proportion of spending on leisure/education was highest in Turkey, at 4.35%, whereas the figure for Spain was lowest, at only 1.98%.', vi: 'Thân bài 1: khoản lớn nhất và nhỏ nhất.' },
        { kind: 'model', text: 'In terms of clothing and footwear, Italy spent more than the other countries, at about 9%, while the lowest proportion was seen in Sweden, at 5.4%. The other countries spent around 6.5% each on average.', vi: 'Thân bài 2: khoản còn lại.' },
        { kind: 'bad', text: 'The table gives compares information on consumer spending.', vi: 'Thay cả cụm gives information on bằng compares: The table compares consumer expenditure on...' },
        { kind: 'bad', text: 'The expenditure of Turkey was higher than the other countries.', vi: 'So sánh chi tiêu với chi tiêu: higher than that of the other countries.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài (mở bài, tổng quan, 2 thân bài) cho đề: "The table below gives information on the percentage of household income spent on rent, transport and entertainment in five Asian cities in 2020." Chỉ chọn khoảng 8 số liệu nổi bật, không dùng từ tăng, giảm.',
        items: ['Hà Nội: tiền nhà (rent) 25.4%, đi lại (transport) 8.2%, giải trí (entertainment) 3.1%', 'Bangkok: 22.8%, 8.4%, 4.6%', 'Seoul: 30.1%, 6.0%, 5.2%', 'Tokyo: 33.6%, 8.1%, 6.7%', 'Jakarta: 20.3%, 12.4%, 2.5%'],
        check: 'only what this lesson teaches: no trend verbs (one year only); an introduction that paraphrases the prompt (compares replacing "gives information on", expenditure, categories, the city names); an overview from reading rows and columns (rent highest and entertainment lowest in every city; Tokyo generally spent more, using "than that of"); body 1 for the largest and smallest categories, body 2 for the remaining one opened with "In terms of" or "Turning to"; spend the most / the least on, A spent more than B, was slightly lower / was highest / was lowest, the lowest proportion was seen in; selecting only the most noticeable figures (about 8) and grouping similar ones (around 8% each on average); rounding (nearly, around). Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw09', video: 9, unit: 'Task 1: Table', minutes: 23,
      title: 'Table (có thời gian)',
      goal: 'Viết bài table qua nhiều năm: tổng quan có số lớn nhất và xu hướng chung, chia thân bài theo nhóm nước cùng xu hướng, giảm bớt số liệu bằng by.',
      points: [
        'Table có năm: vừa chọn số lớn nhất, nhỏ nhất vừa nói xu hướng (tăng, giảm, dao động, ổn định). Đề mẫu: lượng chất thải (triệu tấn) của 6 nước năm 1980, 1990, 2000. Dấu * là không có số liệu (figure not available), không phải số 0.',
        'Từ vựng chất thải, học theo cụm: waste production = the production of waste = the amount of waste produced = waste output; cut its waste output = cắt giảm lượng chất thải.',
        'Mở bài: shows → compares (có s vì 1 bảng); giữ nguyên đơn vị (in millions of tonnes); countries → nations; over a twenty-year period → in three different years (1980, 1990 and 2000).',
        'Tổng quan: nước có số lớn nhất ở mọi năm (the US produced the largest amount of waste in all three years); nước nhỏ nhất mỗi năm một khác thì bỏ. Xu hướng: chỉ Hàn Quốc giảm → Korea was the only country that cut its waste output. Nối 2 câu bằng It is also noticeable that... (cũng đáng chú ý là).',
        'Dàn ý chia theo nước: Body 1 các nước cùng xu hướng (Mỹ, Nhật, Ba Lan, Bồ Đào Nha cùng tăng), Body 2 các nước nổi bật hoặc khác xu hướng (Ireland tăng hơn 8 lần, Hàn Quốc giảm). Chỉ cần năm đầu và năm cuối, không cần năm giữa.',
        'Bớt số liệu: thay from 4 to 6.6 bằng số chênh lệch với by: climbed by 2.6 and 3 million tonnes respectively. amounts có s khi nói về 2 nước.',
        'Đổi cấu trúc giữa các câu: X rose from... to...; Similarly, Japan saw a considerable increase in its waste output; During the same period,...; there was a significant decline in...; rose more than eightfold (gấp 8 lần). Câu mở Body 2: The trends for Ireland and Korea were noticeably different (trends có s vì 2 nước; noticeably = hẳn).'
      ],
      examples: [
        { kind: 'model', text: 'The table compares waste production (in millions of tonnes) in six nations in three different years (1980, 1990 and 2000).', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, the US produced the largest amount of waste in all three years. It is also noticeable that Korea was the only country that cut its waste output.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'Between 1980 and 2000, waste production in the US rose from 131 to 192 million tonnes. Similarly, Japan saw a considerable increase in its waste output, from 28 to 53 million tonnes. During the same period, the amounts of waste produced in Poland and Portugal climbed by 2.6 and 3 million tonnes respectively.', vi: 'Thân bài 1: các nước cùng tăng.' },
        { kind: 'model', text: 'The trends for Ireland and Korea were noticeably different. In Ireland, waste production rose more than eightfold, from only 0.6 million tonnes in 1980 to 5 million tonnes in 2000. By contrast, there was a significant decline in Korea\'s waste output, from 31 million tonnes in 1990 to only 19 million tonnes in 2000.', vi: 'Thân bài 2: hai nước khác hẳn.' },
        { kind: 'bad', text: 'In 1990, Ireland produced 0 tonnes of waste.', vi: 'Dấu * là không có số liệu, không phải 0: bỏ năm đó, chỉ viết các năm có số.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài (mở bài, tổng quan, 2 thân bài) cho đề: "The table below shows the number of passengers (in millions) using the metro systems of six cities in 2000, 2010 and 2020." Body 1 các thành phố cùng xu hướng, Body 2 các thành phố khác hẳn; dùng by để bớt số liệu.',
        items: ['Tokyo: 2,900 / 3,200 / 3,500 (lớn nhất cả 3 năm)', 'Seoul: 1,500 / 1,900 / 2,200', 'Paris: 1,100 / 1,300 / 1,450', 'London: 900 / * / 1,300 (* = không có số liệu)', 'Bangkok: 40 / 180 / 330', 'Buenos Aires: 280 / 240 / 190 (thành phố duy nhất giảm)'],
        check: 'only what this lesson teaches: past simple; an introduction that paraphrases the prompt (compares, the unit kept in brackets, in three different years); an overview with the largest figure in all three years and the general trend, noting the only city that declined, linked with "It is also noticeable that"; body 1 for cities with the same trend and body 2 for the noticeably different ones, linked with "The trends for ... were noticeably different"; only first and last years; differences with "by" plus respectively to reduce the number of figures; varied structures (rose from...to, saw a considerable increase in, there was a significant decline in, rose more than eightfold, During the same period); not treating "*" as zero. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw10', video: 10, unit: 'Task 1: Bar chart', minutes: 23,
      title: 'Bar chart (không có thời gian)',
      goal: 'Viết bài bar chart một năm: tổng quan bằng cách so sánh khoản mục và so màu cột, chia thân bài theo các cột có cùng kiểu, dùng gấp đôi that of.',
      points: [
        'Bar chart chỉ có 1 năm thì không nói tăng giảm, chỉ so sánh cao thấp. Đề mẫu: chi tiêu của Pháp và Anh cho 5 loại hàng tiêu dùng (xe hơi, máy tính, sách, nước hoa, máy ảnh) năm 2010, đơn vị bảng Anh (pounds sterling).',
        'Mở bài: The chart → The bar chart; bỏ below; shows → compares (có s vì 1 biểu đồ); expenditure → the spending of; two countries → nêu tên France and the UK; consumer goods → five categories, kể tên trong ngoặc. the UK, the US, the Philippines có the; France không có the.',
        'Tổng quan cho bar chart, 2 bước: (1) so sánh các khoản mục với nhau: khoản nào cao nhất, thấp nhất chung cho cả 2 nước (cả hai chi nhiều nhất cho xe hơi); (2) trong từng khoản, so màu cột xem nước nào cao hơn ở đa số khoản (Anh cao hơn ở 3/5 khoản) → nhìn chung Anh chi nhiều hơn. Không tìm ra điểm chung thì bỏ.',
        'Đổi cách gọi để không lặp: France → the French (người Pháp); the UK → the British, people in the UK. A spends more money on X than B.',
        'Dàn ý: Body 1 các khoản có cùng kiểu cột (Anh cao hơn Pháp: xe hơi, sách, máy ảnh), Body 2 các khoản ngược lại (Pháp cao hơn: máy tính, nước hoa), mở bằng câu giới thiệu: France spent more money on the remaining goods than the UK.',
        'Gấp đôi: be double that of... / be over double that of... (hơn gấp đôi). Cao hơn: be (slightly) higher than that of... amounts có s khi nói về tiền của 2 nước; this category thay cho tên khoản vừa nhắc; bị động: Above £380,000 was spent by the French on computers.',
        'Số xấp xỉ: about, around, some, approximately; above (trên), below (dưới).'
      ],
      examples: [
        { kind: 'model', text: 'The bar chart compares the spending of France and the UK on five categories (cars, computers, books, perfumes and cameras) in 2010.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, France and the UK spent the most on cars in 2010. It is also noticeable that the British spent more money on consumer goods than the French.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'People in the UK spent about £450,000 on cars, while expenditure on this category in France was slightly lower, around £400,000. The amounts of money that the British and the French spent on books were some £400,000 and £300,000 respectively. Expenditure on cameras in the UK, around £350,000, was over double that of France.', vi: 'Thân bài 1: các khoản Anh cao hơn.' },
        { kind: 'model', text: 'France spent more money on the remaining goods than the UK. Above £380,000 was spent by the French on computers, while spending on this category by the British was lower, approximately £350,000. Expenditure on perfumes in France was higher than that of the UK, around £200,000 and £150,000 respectively.', vi: 'Thân bài 2: các khoản Pháp cao hơn.' },
        { kind: 'bad', text: 'France and UK spent the most on cars.', vi: 'Thiếu the: the UK.' },
        { kind: 'bad', text: 'Expenditure on cameras in the UK was over double France.', vi: 'So chi tiêu với chi tiêu: over double that of France.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài (mở bài, tổng quan, 2 thân bài) cho đề: "The bar chart below compares the amount of money (in millions of dollars) that two cities, Linton and Marsfield, spent on five public services in 2020." Body 1 viết các khoản Linton chi nhiều hơn, Body 2 viết các khoản còn lại.',
        items: ['Giáo dục (education): Linton 450, Marsfield 400', 'Y tế (healthcare): Linton 380, Marsfield 300', 'Giao thông công cộng (public transport): Linton 300, Marsfield 140', 'Công viên (parks): Linton 90, Marsfield 150', 'Cảnh sát (police): Linton 200, Marsfield 240'],
        check: 'only what this lesson teaches: no trend verbs (one year only); an introduction that paraphrases the prompt (the bar chart, compares, naming the two cities, five categories listed in brackets); an overview that compares the categories (both cities spent the most on education) and compares the bars within each category (Linton spent more overall), linked with "It is also noticeable that"; body 1 for the categories with the same pattern and body 2 for the opposite pattern, opened with a topic sentence such as "Marsfield spent more money on the remaining services than Linton"; spend + money + on, expenditure/spending on, this category, the amounts of money ... respectively, was over double that of, was higher than that of, a passive sentence (... was spent by ... on ...), approximation words (about, around, some, approximately, above). Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw11', video: 11, unit: 'Task 1: Bar chart', minutes: 24,
      title: 'Bar chart (có thời gian)',
      goal: 'Viết bài bar chart qua nhiều năm: tổng quan có cột dẫn đầu và xu hướng nổi bật nhất, nhóm cột lớn và cột nhỏ, dùng các cụm doanh số, vượt qua, dẫn đầu.',
      points: [
        'Bar chart có năm thì nói được tăng, giảm, dao động, ổn định. Đề mẫu: doanh số toàn cầu (triệu chiếc) của 5 thương hiệu điện thoại lớn nhất (Samsung, Apple, Nokia, LG, ZTE) năm 2009, 2011, 2013. Đọc kỹ đơn vị trên trục (units sold, millions).',
        'Mở bài: The chart → The bar chart; shows → compares; the global sales of → the number of mobile phones sold worldwide; the top five brands → the five most popular brands; between 2009 and 2013 → over a period of four years hoặc in the years 2009, 2011 and 2013.',
        'Tổng quan: cột dẫn đầu và việc đổi ngôi (Nokia sold the most mobile phones between 2009 and 2011, but Samsung became the best-selling brand in 2013) + xu hướng nổi bật nhất do mình chọn (Samsung and Apple saw the biggest rises in sales). Xu hướng mỗi cột một kiểu thì chọn điều nổi bật nhất, không có quy định cứng.',
        'Dàn ý: nhóm các cột có hình dáng giống nhau: Body 1 hai thương hiệu lớn (Nokia, Samsung), Body 2 ba thương hiệu nhỏ. Mỗi đoạn bắt đầu bằng năm đầu tiên, rồi xu hướng qua các năm và điểm nổi bật (vượt qua, dẫn đầu).',
        'Cụm hay: which was almost double the number of handsets sold by... (gần gấp đôi); Over the following four years (trong 4 năm sau đó); sales figures (doanh số); fell by approximately 200 million units; saw a rise in its sales by a similar amount (tăng một lượng tương tự); became the market leader with the figure reaching... (with the figure + V-ing).',
        'Từ thay thế: mobile phone = handset; brand = vendor; vượt qua: overtake / surpass / exceed. Mở Body 2: Turning to the other three mobile phone brands, we can see that...',
        'Kết Body 2 gọn bằng 3 xu hướng trong 1 câu: Apple\'s sales figures rose to..., while LG saw a decline in its sales and the figures for ZTE grew only slightly.'
      ],
      examples: [
        { kind: 'model', text: 'The bar chart compares the number of mobile phones sold worldwide by the five most popular brands in the years 2009, 2011 and 2013.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, Nokia sold the most mobile phones between 2009 and 2011, but Samsung became the best-selling brand in 2013. Samsung and Apple saw the biggest rises in sales over the period shown.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'In 2009, Nokia sold close to 450 million mobile phones, which was almost double the number of handsets sold by Samsung. Over the following four years, however, Nokia\'s sales figures fell by approximately 200 million units, whereas Samsung saw a rise in its sales by a similar amount. In 2013, Samsung became the market leader with the figure reaching 450 million units.', vi: 'Thân bài 1: hai thương hiệu lớn.' },
        { kind: 'model', text: 'Turning to the other three mobile phone brands, we can see that in 2009 LG, ZTE and Apple sold around 125 million, 50 million and 25 million mobile handsets respectively, but Apple overtook the other two vendors in 2011. In 2013, Apple\'s sales figures rose to 150 million units, while LG saw a decline in its sales and the figures for ZTE grew only slightly.', vi: 'Thân bài 2: ba thương hiệu nhỏ.' },
        { kind: 'bad', text: 'Samsung became the market leader with the figure reached 450 million units.', vi: 'with the figure + V-ing: with the figure reaching 450 million units.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài (mở bài, tổng quan, 2 thân bài) cho đề: "The bar chart below shows the number of visitors (in millions) to five theme parks in Asia in 2010, 2015 and 2020." Body 1 viết 2 công viên lớn, Body 2 viết 3 công viên nhỏ, đoạn nào cũng bắt đầu bằng năm đầu.',
        items: ['SunWorld: 2010: 18; 2015: 15; 2020: 9', 'Dream Park: 2010: 9; 2015: 14; 2020: 18', 'Ocean Land: 2010: 6; 2015: 5; 2020: 4', 'Jungle World: 2010: 3; 2015: 3.5; 2020: 4', 'Star City: 2010: 2; 2015: 6; 2020: 8 (vượt 2 công viên nhỏ kia năm 2015)'],
        check: 'only what this lesson teaches: past simple; an introduction that paraphrases the prompt (the bar chart, compares, the number of visitors to..., over a period of ten years or in the years 2010, 2015 and 2020); an overview naming the leader and the change of leader (became the most visited park) plus the most noticeable trend (saw the biggest rises) without figures; body 1 for the two large parks and body 2 for the three small ones, each starting with the first year; structures such as "which was double/half the number of...", "Over the following ten years", "fell by approximately...", "saw a rise in ... by a similar amount", "with the figure reaching...", "Turning to the other three parks, we can see that...", overtook/surpassed, saw a decline in, grew only slightly; million without s after a number. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw12', video: 12, unit: 'Task 1: Mixed charts', minutes: 26,
      title: 'Mixed charts (biểu đồ tròn và bảng)',
      goal: 'Viết bài kết hợp 2 biểu đồ: mỗi biểu đồ một đoạn thân bài, đúng thì cho từng biểu đồ, nói nguyên nhân bằng nhiều cấu trúc.',
      points: [
        'Mixed charts kết hợp 2 biểu đồ. Bài mẫu: biểu đồ tròn (các nguyên nhân chính khiến đất nông nghiệp kém năng suất) và bảng (các nguyên nhân đó ảnh hưởng thế nào tới Bắc Mỹ, châu Âu, châu Đại Dương trong những năm 1990). Biểu đồ không có năm → hiện tại đơn; bảng có năm → quá khứ đơn.',
        'Từ vựng: land degradation (sự thoái hoá đất), unproductive land (đất kém năng suất), degraded land (đất bị thoái hoá); over-grazing (chăn thả quá mức), deforestation (phá rừng), over-cultivation (trồng trọt quá mức).',
        'Nói nguyên nhân: The main reason for X is... / The cause of X is... (reason đi với for, cause đi với of); X is caused by...; X is degraded because of / due to + danh từ (because + mệnh đề có S + V). Động từ "gây ra": cause / lead to / result in. "Chính": main, major, primary.',
        'Mở bài 2 vế nối bằng while: The pie chart indicates..., while the table illustrates...; reasons → causes; agricultural land → farmland; becomes less productive → becomes degraded; these causes → these factors; three regions → kể tên.',
        'Tổng quan: mỗi biểu đồ một ý. Biểu đồ tròn: phần lớn nhất (the primary cause of land degradation is over-grazing). Bảng có cột tổng thì chỉ cần nhìn cột tổng (Europe had a higher proportion of unproductive land than the other two regions).',
        'Dàn ý mixed charts: Body 1 viết biểu đồ 1, Body 2 viết biểu đồ 2. Bảng có cột tổng thì nói số tổng trước, rồi nguyên nhân chính của từng khu vực.',
        'Mỗi câu một cấu trúc: 35% of land is degraded because of...; Deforestation causes...; the proportion of degraded land due to... is slightly lower; Other causes account for only 7%; accounted for a very small proportion (đổi small → large khi cần); the majority of land in this region was degraded due to...'
      ],
      examples: [
        { kind: 'model', text: 'The pie chart indicates the major causes of farmland degradation, while the table illustrates how these factors affected North America, Europe and Oceania during the 1990s.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, the primary cause of land degradation is over-grazing. It is also noticeable that Europe had a higher proportion of unproductive land than the other two regions in the 1990s.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'Around 35% of land is degraded because of over-grazing. Deforestation causes about 30% of unproductive land, while the proportion of degraded land due to over-cultivation is slightly lower, at around 28%. Other causes account for only 7%.', vi: 'Thân bài 1: biểu đồ tròn (hiện tại đơn).' },
        { kind: 'model', text: 'During the 1990s, about 23% of Europe\'s land became unproductive and the main reason for this was deforestation. Degraded land in North America accounted for a very small proportion, only 5%, and over-cultivation was the main cause. The figure for Oceania was higher, some 13%, and the majority of land in this region was degraded due to over-grazing.', vi: 'Thân bài 2: bảng (quá khứ đơn).' },
        { kind: 'bad', text: 'Agricultural land is degraded because deforestation.', vi: 'because + mệnh đề; trước danh từ dùng because of / due to.' },
        { kind: 'bad', text: 'Around 35% land is degraded because of over-grazing.', vi: 'Thiếu of: 35% of land.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài cho đề: "The pie chart below shows the main causes of forest fires worldwide. The table shows how these causes affected three regions of the world in the 2010s." Body 1 viết biểu đồ tròn (hiện tại đơn), Body 2 viết bảng (quá khứ đơn, nói cột tổng trước).',
        items: ['Biểu đồ tròn: đốt nương rẫy (burning farmland) 40%, lửa trại và thuốc lá của du khách (careless campers) 25%, sét (lightning) 20%, nguyên nhân khác 15%', 'Bảng, % diện tích rừng bị cháy: Đông Nam Á: burning farmland 6.1, campers 0.8, lightning 0.3, tổng 7.2', 'Bắc Mỹ: 0.4, 1.2, 2.6, tổng 4.2', 'Châu Âu: 0.2, 1.0, 0.3, tổng 1.5'],
        check: 'only what this lesson teaches: present simple for the pie chart (no time) and past simple for the table (the 2010s); an introduction of two clauses joined by while (the pie chart indicates..., while the table illustrates...) with causes/factors as synonyms and the regions named; an overview with one main point from each chart (the primary cause of forest fires is..., Southeast Asia had a higher proportion of burned forest than the other two regions), using the total column; body 1 for the pie chart and body 2 for the table (totals first, then the main cause in each region); cause structures: the main reason for, the cause of, is caused by, because of / due to + noun (never because + noun), cause / lead to / result in, account for a very small proportion, the majority of. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw13', video: 13, unit: 'Task 1: Mixed charts', minutes: 22,
      title: 'Mixed charts (biểu đồ đường và bảng)',
      goal: 'Viết bài kết hợp biểu đồ đường và bảng nhiều cột khác chủ đề: chọn đúng ý cho tổng quan, dùng phân số, "gấp ... lần" và câu giải thích nối 2 dữ liệu.',
      points: [
        'Đề mẫu: lượng nước dùng toàn cầu theo lĩnh vực 1900–2000 (biểu đồ đường: nông nghiệp, công nghiệp, sinh hoạt, đơn vị km³) và việc tiêu thụ nước ở Brazil và CHDC Congo năm 2000 (bảng: dân số, đất được tưới tiêu, lượng nước dùng mỗi người).',
        'Ôn từ vựng nước (bài 6): water use / usage / consumption for..., the amount of water used / consumed for... Lĩnh vực: agriculture, the agricultural sector; industry, the industrial sector; the residential sector, homes, households. Đổi sang tính từ: industrial water consumption, domestic water consumption.',
        'Mở bài: The graph and the table → The charts; give information about → compare; water use worldwide → the amount of water used for agriculture, industry and homes around the world; two different countries → kể tên 2 nước.',
        'Tổng quan: mỗi biểu đồ 1 ý. Biểu đồ đường có năm: xu hướng chung (cả 3 lĩnh vực đều tăng → global water consumption rose significantly) + đường cao nhất (agriculture accounted for the largest proportion of water used). Bảng có các cột khác chủ đề (dân số, đất, nước) thì không so theo hàng, cột được; chỉ dùng cột chính của đề là lượng nước mỗi người.',
        'Dàn ý: Body 1 biểu đồ đường (năm đầu 1900, rồi xu hướng tới 2000); Body 2 bảng (dân số, đất tưới tiêu, nước mỗi người).',
        'Phân số và so sánh: were around one fifth of that amount (bằng 1/5 con số đó); A has + số lần + more + danh từ + than B: Brazil had 265 times more irrigated land than the Congo (times = lần); was significantly higher than that in...; dùng reach + số liệu thay cho từ tăng.',
        'Câu nối 2 dữ liệu trong bảng: ..., and this could be explained by the fact that... populations có s khi nói về dân số 2 nước.'
      ],
      examples: [
        { kind: 'model', text: 'The charts compare the amount of water used for agriculture, industry and homes around the world and water use in Brazil and the Democratic Republic of Congo.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, global water consumption rose significantly between 1900 and 2000, and agriculture accounted for the largest proportion of water used. It is also noticeable that water consumption was considerably higher in Brazil than in the Congo.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'In 1900, around 500 km³ of water was used by the agricultural sector worldwide. The figures for industrial and domestic water consumption were around one fifth of that amount. From 1900 to 2000, water use for agriculture increased to around 3000 km³, industrial water use rose to nearly 1500 km³, and domestic water consumption reached approximately 500 km³.', vi: 'Thân bài 1: biểu đồ đường.' },
        { kind: 'model', text: 'In the year 2000, the populations of Brazil and the Congo were 176 million and 5.2 million respectively. Water consumption per person in Brazil, at 359 m³, was significantly higher than that in the Congo, at only 8 m³, and this could be explained by the fact that Brazil had 265 times more irrigated land.', vi: 'Thân bài 2: bảng.' },
        { kind: 'bad', text: 'Brazil had 265 time more irrigated land than the Congo.', vi: 'times (lần) luôn có s khi số lần lớn hơn 1.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài cho đề: "The graph and table below give information about electricity use by sector in a country between 1980 and 2020 and electricity use in two cities, Pemberton and Lowfield, in 2020." Body 1 viết biểu đồ đường, Body 2 viết bảng; dùng phân số và "gấp ... lần".',
        items: ['Biểu đồ đường (TWh): 1980: công nghiệp 100, hộ gia đình 20, giao thông 20', '2020: công nghiệp 350, hộ gia đình 150, giao thông 80', 'Bảng năm 2020, Pemberton: dân số 8 triệu, ô tô điện 400,000 chiếc, điện dùng mỗi người 3,200 kWh', 'Lowfield: dân số 1.5 triệu, ô tô điện 2,000 chiếc, điện dùng mỗi người 600 kWh'],
        check: 'only what this lesson teaches: an introduction that paraphrases the prompt (The charts compare..., the amount of electricity used for industry, households and transport, naming both cities); an overview with one point from each chart (overall rise and the largest sector from the line graph; electricity use per person considerably higher in one city, using only the main column of the table); body 1 for the line graph starting with the first year and body 2 for the table; adjective forms (industrial / domestic electricity use); fractions ("one fifth of that amount"); "A had + number + times more + noun + than B"; "was significantly higher than that in..."; reach + figure; "this could be explained by the fact that..."; "populations" with s for two cities. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw14', video: 14, unit: 'Task 1: Process', minutes: 25,
      title: 'Process (quy trình do con người tạo ra)',
      goal: 'Viết bài quy trình bằng dàn mẫu có sẵn: mở bài, tổng quan đếm số bước, 2 thân bài theo giai đoạn, câu bị động ở hiện tại đơn.',
      points: [
        'Process (man-made): quy trình do con người làm, thường là sản xuất hoặc tái chế một sản phẩm. Đề mẫu: 3 giai đoạn tái chế chai thuỷ tinh. Quy trình viết ở hiện tại đơn và dùng rất nhiều câu bị động (be + V3).',
        'Dàn mẫu nên học thuộc (tiết kiệm thời gian, ý nào ra ý đó): Mở bài: The diagram illustrates the process of + danh từ / V-ing. Tổng quan: Overall, there are + số + main stages (steps) in this process, beginning with... and ending with... (sau of, with là danh từ hoặc V-ing).',
        'Body 1: In the first stage of the process,... After that,... Next,... Body 2: In the next stage of the process,... Following this,... Then,...',
        'Tổng quan: đếm số bước hoặc giai đoạn, xem bước đầu và bước cuối: the collection of waste glass bottles (việc thu gom chai cũ), the delivery of new bottles (việc phân phối chai mới).',
        'Chia thân bài linh hoạt: Body 1 viết giai đoạn 1, Body 2 viết các giai đoạn còn lại (hoặc Body 1 giai đoạn 1–2, Body 2 giai đoạn 3).',
        'Mẹo: bước nào là rửa, làm sạch thì thêm "to remove any impurities" (để loại bỏ tạp chất) cho câu dài và hay hơn. Thông tin chi tiết trong hình đưa vào ngoặc: (between 600 and 800 degrees).',
        'Động từ bị động hay dùng: are collected at a collection point; are transported / delivered to; undergo further processing (trải qua các bước xử lý tiếp theo); are washed with high-pressure water; are sorted by colour into...; are crushed into pieces; are heated at a high temperature in a furnace; is mixed with; is moulded into; are filled with; are packaged; ready for sale. Nối nơi chốn bằng where.',
        'glass bottle đứng trước danh từ khác thì như tính từ, không thêm s (glass bottle recycling); nói chung về chai thì có s (recycling glass bottles). molten glass = thuỷ tinh nóng chảy.'
      ],
      examples: [
        { kind: 'model', text: 'The diagram illustrates the process of recycling glass bottles.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, there are three main stages in this process, beginning with the collection of waste glass bottles and ending with the delivery of new bottles.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'In the first stage of the process, waste glass bottles are collected at a collection point. After that, they are transported by truck to a glass treatment plant, where they undergo further processing.', vi: 'Thân bài 1: giai đoạn 1.' },
        { kind: 'model', text: 'In the next stage of the process, the glass bottles are washed with high-pressure water to remove any impurities. Following this, they are sorted by colour into brown, green and clear bottles. They are then crushed into pieces and heated at a high temperature (between 600 and 800 degrees) in a furnace to create molten glass. This molten glass is mixed with new liquid glass and moulded into new bottles. These bottles are filled with liquid, packaged and delivered to supermarkets, ready for sale.', vi: 'Thân bài 2: các giai đoạn còn lại.' },
        { kind: 'bad', text: 'The bottles are wash by high-pressure water.', vi: 'Bị động là be + V3, và dụng cụ dùng with: are washed with high-pressure water.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài theo dàn mẫu cho đề: "The diagram below shows the process of recycling plastic bottles." Dùng hiện tại đơn, câu bị động, và các từ nối In the first stage..., After that, Next, In the next stage..., Following this, Then.',
        items: ['Giai đoạn 1: chai nhựa đã dùng được bỏ vào thùng tái chế (recycling bins) → xe tải chở tới nhà máy tái chế (recycling plant)', 'Giai đoạn 2: phân loại theo loại nhựa và màu → rửa bằng nước nóng → cắt thành mảnh nhỏ (flakes)', 'Giai đoạn 3: nung chảy ở khoảng 260°C → tạo thành hạt nhựa (pellets) → làm thành sản phẩm mới (sợi vải, chai mới) → chuyển tới cửa hàng'],
        check: 'only what this lesson teaches: the template introduction (The diagram illustrates the process of recycling plastic bottles); an overview counting the main stages, "beginning with the collection of ... and ending with the delivery of ..."; body 1 with "In the first stage of the process", After that, Next; body 2 with "In the next stage of the process", Following this, Then; present simple passive verbs (are collected, are transported to, are sorted by, are washed with ... to remove any impurities, are cut into, are melted at, are formed into, are delivered to ... ready for sale); details from the diagram in brackets; a where-clause for a place; nouns or -ing forms after "of" and "with". Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw15', video: 15, unit: 'Task 1: Process', minutes: 24,
      title: 'Process (quy trình tự nhiên, vòng đời)',
      goal: 'Viết bài vòng đời một con vật bằng dàn mẫu: tổng quan có số giai đoạn và tổng thời gian, thân bài dùng cụm sinh học và mốc thời gian.',
      points: [
        'Process (natural): thường là vòng đời của một con vật hoặc một quá trình trong tự nhiên. Đề mẫu: vòng đời của con ong mật (honey bee). Viết ở hiện tại đơn.',
        'Dàn mẫu: Mở bài: The diagram illustrates different stages in the life of + con vật. Tổng quan: Overall, there are + số + main stages in the development of + con vật, from... to... Body 1: In the first stage of the life cycle,... After that,... Next,... Body 2: In the next stage of the life cycle,... Following this,... Then,... and the life cycle starts again (vòng đời lặp lại nên kết bằng câu này).',
        'Tổng quan: đếm số giai đoạn. Con vật đẻ trứng thì viết from egg to mature adult insect (đổi honey bee thành insect để không lặp). Hình có ghi tổng thời gian thì thêm vào tổng quan: the complete life cycle lasts / takes between 34 and 36 days (last, take + thời gian = kéo dài).',
        'Chia thân bài theo số giai đoạn: 6 giai đoạn chia 3–3; 5 giai đoạn chia 2–3 hoặc 3–2.',
        'Cụm vòng đời: the female honey bee lays one or two eggs (đẻ trứng); each egg hatches into a nymph (nở thành); experiences some physical changes (trải qua một số thay đổi về hình thể, cụm band 7+); grows quickly in size; sheds its skin = moults (lột da); takes place (diễn ra); develops into (phát triển thành); reaches full maturity (trưởng thành hoàn toàn).',
        'Mốc thời gian không lặp: ... days later (two days later), between nine and ten days later, and again another nine days later, in the following four days. Số lần: once, twice, three times, four times...',
        'Chủ ngữ số ít thì động từ thêm s/es: each egg hatches, the nymph develops, the life cycle lasts.'
      ],
      examples: [
        { kind: 'model', text: 'The diagram illustrates different stages in the life of a honey bee.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, there are five main stages in the development of the honey bee, from egg to mature adult insect. It is also noticeable that the complete life cycle lasts between 34 and 36 days.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'In the first stage of the life cycle, the female honey bee lays one or two eggs every three days. Between nine and ten days later, each egg hatches into a nymph.', vi: 'Thân bài 1: hai giai đoạn đầu.' },
        { kind: 'model', text: 'In the next stage of the life cycle, the nymph experiences some physical changes. It grows quickly in size and sheds its skin three times. First, this moulting takes place 5 days after the egg hatches, then 7 days later, and again another 9 days later. After the moulting stage, the nymph develops into the young adult honey bee. In the following four days, it reaches full maturity and the life cycle starts again.', vi: 'Thân bài 2: ba giai đoạn còn lại.' },
        { kind: 'bad', text: 'Between nine and ten days later, each egg hatch into a nymph.', vi: 'each egg là số ít: hatches.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài theo dàn mẫu cho đề: "The diagram below shows the life cycle of a frog." Tổng quan có số giai đoạn và tổng thời gian; Body 2 kết bằng "and the life cycle starts again".',
        items: ['Ếch cái đẻ khoảng 2,000 trứng trong nước', '6–10 ngày sau: trứng nở thành nòng nọc (tadpole)', 'Khoảng 5 tuần: mọc chân sau (back legs); khoảng 9 tuần: mọc chân trước (front legs), đuôi ngắn dần', 'Khoảng 12 tuần: thành ếch con (froglet), rời nước lên cạn', 'Ếch con lớn thành ếch trưởng thành (adult frog). Ghi chú giữa hình: từ trứng tới ếch con mất 12–16 tuần'],
        check: 'only what this lesson teaches: the template introduction (The diagram illustrates different stages in the life of a frog); an overview counting the main stages "in the development of the frog, from egg to adult" (with a synonym such as amphibian to avoid repeating frog) and the total time with last/take; body 1 starting "In the first stage of the life cycle", body 2 starting "In the next stage of the life cycle" and ending "and the life cycle starts again"; present simple with third-person -s; life-cycle phrases (lays ... eggs, hatches into, experiences some physical changes, grows in size, develops into, reaches full maturity, takes place); time phrases (... days later, between six and ten days later, in the following ... weeks). Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw16', video: 16, unit: 'Task 1: Map', minutes: 26,
      title: 'Từ vựng và cấu trúc cho Map',
      goal: 'Nắm 5 nhóm cấu trúc tả bản đồ: dân số, tuyến đường, vị trí, chiều dài và 6 kiểu thay đổi (giữ nguyên, mở rộng, thu hẹp, phá bỏ thay thế, di chuyển, xây mới).',
      points: [
        'Bài nền cho 2 bài Map tiếp theo, nên chép riêng vào vở để ôn trước khi thi. 5 nhóm: dân số, tuyến đường, vị trí, chiều dài, các thay đổi cụ thể.',
        'Dân số: The population of Lakeside is 60,000. / Lakeside has a population of 60,000 (dùng a, không dùng the). / Lakeside has 60,000 inhabitants (inhabitants = people).',
        'Tuyến đường: The main road runs through / passes through / goes through Lakeside from north to south; hoặc The main road crosses Lakeside (cross không đi với through).',
        'Vị trí: north, south, east, west; northwest, northeast, southeast, southwest (tiếng Việt nói "tây bắc" nhưng tiếng Anh viết northwest); in the middle of / in the central part of. Động từ: is located / is situated / is / lies in the north of the town.',
        'Chiều dài: Lakeside\'s total length is around 250 km. / Lakeside has a length of around 250 km (length là danh từ). / Lakeside is around 250 km long (long là tính từ).',
        'Giữ nguyên: remained unchanged / still existed. Mở rộng: was extended / expanded / widened, became bigger; kéo dài: was lengthened. Thu hẹp: was narrowed, became smaller; rút ngắn: was shortened. Thêm mức độ slightly hoặc significantly (was significantly extended) để ghi điểm.',
        'Phá bỏ và thay thế. Lấy cái cũ làm chủ ngữ: The industrial zone was demolished (destroyed, knocked down) and replaced by / to make way for a new car park; rừng, cây thì dùng was cleared / cut down / chopped down. Lấy cái mới làm chủ ngữ: A new car park was built to replace / was constructed on the original site of the industrial zone.',
        'Di chuyển: was moved / relocated to the east of the town. Xây mới: A new school was built / constructed... Năm trong quá khứ thì chia quá khứ đơn (bị động was/were + V3).'
      ],
      examples: [
        { kind: 'model', text: 'Lakeside has a population of 60,000.' },
        { kind: 'model', text: 'The main road runs through Lakeside from north to south.' },
        { kind: 'model', text: 'The industrial zone is located in the north of the town.' },
        { kind: 'model', text: 'The housing area remained unchanged from 2000 to 2010.' },
        { kind: 'model', text: 'The industrial area was significantly extended, and the main road was slightly lengthened.' },
        { kind: 'model', text: 'The woodland was cut down to make way for a new car park. / A new car park was constructed on the original site of the woodland.' },
        { kind: 'model', text: 'The industrial area was relocated to the east of the town, and a new school was built nearby.' },
        { kind: 'note', text: 'in the north of the town = nằm trong thị trấn, ở phía bắc; to the north of the town = nằm bên ngoài thị trấn, về phía bắc.' },
        { kind: 'bad', text: 'The woodland was chop down.', vi: 'Bị động dùng V3: was chopped down.' },
        { kind: 'bad', text: 'Lakeside has the population of 60,000.', vi: 'has a population of...' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Bản đồ thị trấn Riverside năm 2005 và 2025. Viết 8 câu, mỗi câu dùng một nhóm cấu trúc khác nhau: dân số, tuyến đường, vị trí, chiều dài, giữ nguyên, mở rộng hoặc kéo dài, phá bỏ và thay thế, di chuyển hoặc xây mới.',
        items: ['Dân số: 2005: 20,000; 2025: 45,000', 'Đường sắt chạy từ tây sang đông qua thị trấn (cả hai năm). Đường chính dài 12 km năm 2005, năm 2025 được kéo dài nhiều', 'Khu dân cư ở phía nam: không đổi', 'Công viên ở trung tâm: rộng ra một chút', 'Khu rừng nhỏ ở phía đông bắc: bị chặt để xây sân golf (golf course)', 'Nhà máy ở phía tây: chuyển lên phía bắc', 'Năm 2025: có thêm bệnh viện mới ở phía tây nam'],
        check: 'only the map structures taught in this lesson: population (has a population of / The population of ... is / has ... inhabitants), roads (runs through / passes through / crosses ... from west to east), location (is located / is situated / lies in the north of, in the middle of), length (has a length of / is ... km long / total length), no change (remained unchanged / still existed), extension (was slightly/significantly extended, lengthened, expanded), demolition and replacement (was cut down / cleared to make way for, was built on the original site of), relocation (was moved / relocated to), new construction (was built / constructed); past simple passive with correct V3 forms. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw17', video: 17, unit: 'Task 1: Map', minutes: 23,
      title: 'Map (bài mẫu thị trấn Lakeside)',
      goal: 'Viết trọn bài map bằng dàn mẫu: tổng quan bằng danh từ (the expansion of...), chia thân bài theo vị trí, áp các cấu trúc thay đổi của bài 16.',
      points: [
        'Map thường cho 2–4 bản đồ của cùng một nơi ở các thời điểm khác nhau; bài viết so sánh các thay đổi. Đề mẫu: thị trấn Lakeside năm 2000 và 2009. Mở vở ôn lại cấu trúc bài 16 trước khi viết.',
        'Dàn mẫu: Mở bài: The maps illustrate some changes to + nơi + over a period of + số + years. Tổng quan: Overall, + nơi + experienced considerable changes during the period shown. The most noticeable differences between the two maps are... Body 1: As can be seen from the maps,... Body 2: Turning to the other features, we can see that...',
        'Tổng quan: nhìn lướt cả 2 bản đồ, không đi vào chi tiết, chọn 1–2 thay đổi nổi bật nhất và viết bằng danh từ: the expansion of (sự mở rộng), the disappearance of (sự biến mất).',
        'Chia thân bài theo vị trí: bắc / nam, đông / tây, hoặc theo một đường ranh có sẵn trên bản đồ (bài mẫu chia theo 2 bên dòng sông).',
        'Lập dàn ý theo nhóm thay đổi: giữ nguyên, phá bỏ và thay thế, di chuyển, biến mất, mở rộng, thu hẹp; rồi áp công thức bài 16. Nhiều thay đổi cùng loại thì gộp 2 cái vào 1 câu để tránh câu đơn: The derelict warehouses and the old town were demolished to make way for a new car park and offices.',
        'disappeared là chủ động (không có be); demolished, destroyed, knocked down, cleared, expanded, relocated dùng bị động (was/were + V3). Nối câu: During the same period. Từ hay: derelict (bị bỏ hoang); a large area of the woodland was cleared; the lake became a small pond.'
      ],
      examples: [
        { kind: 'model', text: 'The maps illustrate some changes to the town of Lakeside over a period of nine years (2000-2009).', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, the town experienced considerable changes during the period shown. The most noticeable differences between the two maps are the expansion of the industrial complex and the disappearance of the southern residential area.', vi: 'Tổng quan.' },
        { kind: 'model', text: 'As can be seen from the maps, from 2000 to 2009 the housing area in the northwest of Lakeside remained unchanged. During the same period, the derelict warehouses and the old town were demolished to make way for a new car park and offices. The arts centre and the western residential area were also destroyed and replaced by a new multi-screen cinema and a shopping centre. The school next to the arts centre was relocated a little closer to the river.', vi: 'Thân bài 1: một bên dòng sông.' },
        { kind: 'model', text: 'Turning to the other features, we can see that the southern residential area disappeared, while the industrial complex in the southeast was significantly expanded. A large area of the woodland was cleared, whereas the lake became a small pond.', vi: 'Thân bài 2: bên còn lại.' },
        { kind: 'bad', text: 'The southern residential area was disappeared.', vi: 'disappear không dùng bị động: The southern residential area disappeared.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài theo dàn mẫu cho đề: "The maps below show the village of Seaview in 1990 and 2020." Chia thân bài theo 2 bên con đường chính (phía bắc / phía nam), gộp các thay đổi cùng loại vào một câu.',
        items: ['Phía bắc đường chính: khu dân cư ở tây bắc giữ nguyên; trang trại (farmland) bị thay bằng khu nhà ở mới (housing estate); trường học nhỏ chuyển lại gần đường chính hơn; nhà ga cũ bị phá để làm bãi đỗ xe', 'Phía nam đường chính: bãi biển giữ nguyên; một phần rừng ven biển bị chặt để xây khách sạn; cảng cá (fishing port) được mở rộng nhiều; hồ nhỏ biến mất; có thêm sân golf mới ở phía đông nam'],
        check: 'only what this lesson teaches: the template introduction (The maps illustrate some changes to the village of Seaview over a period of 30 years); an overview "Overall, the village experienced considerable changes during the period shown. The most noticeable differences between the two maps are..." using nouns (the expansion of, the disappearance of, the construction of); body 1 starting "As can be seen from the maps," and body 2 starting "Turning to the other features, we can see that", divided by the main road; map structures from the previous lesson (remained unchanged, was demolished to make way for, was replaced by, was relocated, was significantly expanded, was cleared, disappeared without "was"); combining two similar changes in one sentence; During the same period; past simple. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw18', video: 18, unit: 'Task 1: Map', minutes: 21,
      title: 'Map (3 bản đồ: quá khứ và hiện tại)',
      goal: 'Viết bài 3 bản đồ có cả năm quá khứ và hiện tại: đúng thì cho từng đoạn, chia thân bài theo giai đoạn, dùng cấu trúc tách rời, nhập vào, kết nối.',
      points: [
        'Đề có 3 bản đồ, vừa có năm quá khứ (1925, 1975) vừa có hiện tại (today): sự phát triển của làng Headly và Fonton. Dùng lại dàn mẫu Map của bài 17.',
        'Mở bài: The maps illustrate some changes to Headly village and Fonton in three different time periods (1925, 1975 and the present); today → the present.',
        'Tổng quan: có cả quá khứ lẫn hiện tại nên dùng hiện tại hoàn thành: have experienced considerable changes during the period shown. Thay đổi chính viết bằng danh từ: the expansion of transportation routes (tuyến giao thông) and the appearance of new facilities (cơ sở vật chất).',
        'Dàn ý 3 bản đồ: Body 1 = 1925 đến 1975 (quá khứ đơn), Body 2 = từ 1975 đến nay. Mỗi đoạn tập trung vào nơi có nhiều thay đổi nhất.',
        'Cấu trúc: A and B were completely separated (hoàn toàn tách rời); had a railway line running through it / a small road crossing it from west to north; were significantly expanded; A was replaced by B; was extended to the east to connect with...; were constructed.',
        'Phần hiện tại: A has merged with B to become... (nhập vào thành); has been extended; have been built near... Kiểm tra thì từng đoạn: năm quá khứ thì dùng had, không dùng has.'
      ],
      examples: [
        { kind: 'model', text: 'The maps illustrate some changes to Headly village and Fonton in three different time periods (1925, 1975 and the present).', vi: 'Mở bài.' },
        { kind: 'model', text: 'Overall, Headly village and Fonton have experienced considerable changes during the period shown. The main developments are the expansion of transportation routes and the appearance of new facilities.', vi: 'Tổng quan (hiện tại hoàn thành).' },
        { kind: 'model', text: 'In 1925, Headly village and Fonton were completely separated. Fonton had a railway line running through it from east to north, while Headly had a small road crossing it from west to north. In 1975, Headly and Fonton were significantly expanded. In Headly, the small road was replaced by a bigger road and was extended to the east to connect with Fonton. A housing estate, a leisure centre and a local shop were constructed in Headly.', vi: 'Thân bài 1: 1925–1975 (quá khứ đơn).' },
        { kind: 'model', text: 'Since then, Headly village has merged with Fonton to become Headly suburbs. The railway line in Fonton has been extended to the west, and a railway station, a hotel and a business park have been built near the railway line.', vi: 'Thân bài 2: đến nay (hiện tại hoàn thành).' },
        { kind: 'bad', text: 'In 1925, Headly has a small road crossing it.', vi: 'Năm quá khứ dùng quá khứ đơn: had.' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết trọn bài theo dàn mẫu cho đề: "The maps below show the development of Greenhill and Marston in 1960, 1990 and today." Tổng quan và Body 2 dùng hiện tại hoàn thành, Body 1 dùng quá khứ đơn.',
        items: ['1960: Greenhill và Marston tách rời; Greenhill có một con đường nhỏ chạy từ bắc xuống nam; Marston có một con sông chảy qua', '1990: đường nhỏ được thay bằng đường lớn hơn và kéo dài về phía đông để nối với Marston; xây thêm trường học và chợ ở Greenhill', 'Hôm nay: hai nơi nhập thành một thị trấn; đường được kéo dài về phía tây; xây cầu qua sông, bệnh viện và trung tâm thương mại gần cầu'],
        check: 'only what this lesson teaches: the template introduction with "in three different time periods (1960, 1990 and the present)"; an overview in the present perfect (have experienced considerable changes) with noun phrases (the expansion of transportation routes, the appearance of new facilities); body 1 for 1960–1990 in the past simple and body 2 for the present in the present perfect; structures: were completely separated, had a road running through it / crossing it from north to south, was replaced by, was extended to the east to connect with, were constructed, has merged with ... to become, has been extended, have been built. Point out errors, especially wrong tenses, and give corrected sentences.'
      }
    },
    {
      id: 'hw19', video: 19, unit: 'Task 2: Tổng quan', minutes: 15,
      title: 'Giới thiệu chung về IELTS Writing Task 2',
      goal: 'Nắm format đề, cấu trúc 4 đoạn, 4 tiêu chí chấm và 7 dạng đề của Writing Task 2.',
      points: [
        'Có 60 phút cho cả bài Writing, làm task nào trước cũng được. Nên dành 20 phút cho Task 1 và 40 phút cho Task 2, vì Task 2 chiếm 2/3 số điểm. Task 2 phải viết ít nhất 250 chữ.',
        'Đề gồm 2 phần: (1) 1–2 câu nêu chủ đề (môi trường, năng lượng, tội phạm...), (2) yêu cầu cho thí sinh. Dòng "Give reasons for your answer and include any relevant examples..." đề nào cũng có, chỉ cần tập trung vào phần trong khung.',
        'Cấu trúc 4 đoạn như văn tiếng Việt: Mở bài 2 câu (câu 1 paraphrase chủ đề bằng từ và cấu trúc đồng nghĩa; câu 2 trả lời đúng yêu cầu của đề). Thân bài 1 và Thân bài 2, mỗi đoạn khoảng 5 câu (4–6 câu). Kết luận khoảng 1 câu tóm tắt; cách nhanh là paraphrase lại mở bài.',
        'Task Response (25%): trả lời đủ mọi yêu cầu của đề và đủ 250 chữ. Không để ý yêu cầu (nhất là dạng Agree or Disagree) thì rất khó đạt 6.5 trở lên.',
        'Coherence and Cohesion (25%): từ nối phù hợp giữa câu và đoạn, thông tin mạch lạc, có triển khai làm rõ ý chính, ví dụ liên quan đến luận điểm.',
        'Lexical Resource (25%): từ đồng nghĩa đa dạng và chính xác, không lặp lại quá nhiều từ của đề, đúng collocation và chính tả, không dùng từ không trang trọng, không viết tắt (viết do not, không viết don\'t).',
        'Grammatical Range and Accuracy (25%): đa dạng câu đơn, câu ghép, câu phức; đúng loại từ, đúng thì, đúng dấu câu. Khoảng 80–90% câu dùng hiện tại đơn; quá khứ đơn hoặc hiện tại hoàn thành tuỳ trạng từ đi kèm.',
        '7 dạng đề sẽ học: Causes – Solutions; Effects (Problems) – Solutions; Discuss both views and give your opinion; Agree or Disagree; Positive or Negative; Advantages outweigh Disadvantages; 2-part questions.'
      ],
      examples: [
        { kind: 'note', text: 'Some people think that all university students should study whatever they like. Others, however, believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology. Discuss both these views and give your own opinion.', vi: 'Đề mẫu: 2 câu đầu là chủ đề, câu cuối là yêu cầu.' },
        { kind: 'note', text: 'Introduction: 2 sentences (paraphrase + answer) / Body 1: ~5 sentences / Body 2: ~5 sentences / Conclusion: ~1 sentence', vi: 'Khung bài Task 2.' },
        { kind: 'bad', text: 'Students don\'t always choose useful subjects.', vi: 'Không viết tắt trong bài thi: Students do not always choose useful subjects.' }
      ],
      practice: {
        type: 'write', rows: 5,
        task: 'Với đề mẫu (sinh viên học môn mình thích hay chỉ học môn hữu ích như khoa học, công nghệ), hãy: (1) chỉ ra phần chủ đề và phần yêu cầu của đề; (2) viết câu 1 của mở bài, paraphrase phần chủ đề bằng từ đồng nghĩa; (3) viết câu 2 trả lời yêu cầu (nêu quan điểm của bạn). Không viết tắt.',
        items: ['Chủ đề: some people think university students should study whatever they like; others believe they should only study useful subjects such as science and technology', 'Yêu cầu: Discuss both these views and give your own opinion'],
        check: 'only what this lesson teaches: the learner correctly separates the topic part and the task part of the prompt; sentence 1 paraphrases the topic with synonyms and different structures instead of copying the prompt words; sentence 2 directly answers the task (mentions both views and gives a clear opinion); formal style with no contractions; basic grammar and present simple tense. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw20', video: 20, unit: 'Task 2: Tổng quan', minutes: 18,
      title: 'Cách lập dàn ý thân bài hiệu quả',
      goal: 'Biết cách triển khai một đoạn thân bài khoảng 5 câu khi có 1, 2 hoặc 3 ý tưởng.',
      points: [
        'Mỗi thân bài khoảng 5 câu. Cách triển khai phụ thuộc vào số ý tưởng bạn có: 1, 2 hay 3 ý.',
        'Chỉ có 1 ý, cách 1: Câu 1 ý chính → Câu 2 triển khai → Câu 3 triển khai tiếp → Câu 4 ví dụ → Câu 5 chốt hoặc kết quả. Để triển khai, liên tục tự hỏi: tại sao? như thế nào? kết quả, hậu quả ra sao?',
        'Chỉ có 1 ý, cách 2: Câu 1 ý chính → Câu 2 triển khai → Câu 3 điều ngược lại (nếu điều ngược lại xảy ra thì sao?) → Câu 4 ví dụ → Câu 5 chốt.',
        'Có 2 ý: mỗi ý kèm 1 câu triển khai hoặc ví dụ, rồi 1 câu chốt. Nếu phần triển khai đã có nhiều ví dụ thì không cần câu chốt.',
        'Có 3 ý: mỗi ý kèm 1 câu triển khai hoặc ví dụ; hoặc dùng khung Câu giới thiệu → Ý 1 → Ý 2 → Ý 3 → Câu chốt. Khung này hay dùng cho đề yêu cầu nêu giải pháp.',
        'Không đưa quá nhiều ý: tối đa khoảng 3 ý cho một đoạn.'
      ],
      examples: [
        { kind: 'note', text: 'Ý chính: chế độ ăn không lành mạnh gây béo phì → người ta quá bận, không nấu ở nhà nên ăn thức ăn nhanh → thức ăn nhanh nhiều dầu mỡ nên tăng cân nhanh → ví dụ: trẻ em ăn nhiều gà rán, khoai tây chiên ở KFC → chốt: ngày càng nhiều người bị thừa cân, béo phì.', vi: '1 ý, cách 1 (hỏi tại sao liên tục).' },
        { kind: 'note', text: 'Ý chính: học sinh nên chọn môn mình đam mê → học môn yêu thích thì kết quả tốt hơn → ngược lại, học môn không thích sẽ chán nản, có thể bỏ học, phí thời gian và tiền bạc → ví dụ: một người bạn đại học bỏ khoá tài chính sau 3 tháng vì không thích → chốt: tốt hơn hết là để học sinh tự do chọn môn yêu thích.', vi: '1 ý, cách 2 (điều ngược lại).' },
        { kind: 'note', text: 'Giới thiệu: có vài giải pháp chính để bảo vệ môi trường → chính phủ áp hạn mức khí thải cho nhà máy, xí nghiệp → chính phủ khuyến khích nhà sản xuất dùng năng lượng tái tạo thay vì nhiên liệu hoá thạch → người dân nên tái chế, tái sử dụng nhiều hơn → chốt: thực hiện các giải pháp trên thì vấn đề môi trường có thể được giải quyết hiệu quả.', vi: '3 ý (giới thiệu + 3 giải pháp + chốt).' }
      ],
      practice: {
        type: 'write', rows: 6,
        task: 'Viết một đoạn thân bài tiếng Anh khoảng 5 câu theo cách "1 ý, hỏi tại sao liên tục": ý chính → triển khai → triển khai tiếp → ví dụ → câu chốt. Dùng ý tưởng gợi ý bên dưới.',
        items: ['Đề: Why do more and more young people feel stressed nowadays?', 'Ý chính: áp lực học tập (academic pressure)', 'Gợi ý triển khai: phụ huynh kỳ vọng điểm cao → học thêm nhiều, ít thời gian nghỉ ngơi → thiếu ngủ, lo âu', 'Ví dụ: nhiều học sinh lớp 12 ở Việt Nam học thêm đến 10 giờ tối'],
        check: 'only what this lesson teaches: the paragraph has about 5 sentences following the order main idea → development → further development (answering why/how) → specific example → concluding or result sentence; each sentence logically follows from the previous one; the example is relevant to the main idea; only one main idea. Point out missing or illogical steps and give corrected sentences.'
      }
    },
    {
      id: 'hw21', video: 21, unit: 'Task 2: Causes – Solutions', minutes: 32,
      title: 'Dạng Causes – Solutions (nguyên nhân và giải pháp)',
      goal: 'Nắm khung bài mẫu cho dạng nêu nguyên nhân và giải pháp, rồi viết được bài về béo phì ở trẻ em với từ vựng ghi điểm.',
      points: [
        'Phải dịch được đề trước đã: Childhood obesity is becoming a serious problem in many countries. What are the causes of this, and what solutions can be offered? (béo phì ở trẻ em: nguyên nhân là gì, giải pháp nào có thể đưa ra?).',
        'Mở bài 2 câu: câu 1 paraphrase topic bằng từ đồng nghĩa (childhood obesity → child obesity, a serious problem → a serious public health challenge, countries → nations); câu 2 học thuộc: This essay will look at the primary causes of this and suggest some possible solutions to this problem.',
        'Thân bài 1 (nguyên nhân): There are a number of reasons for... The first reason is... Another reason is... Thân bài 2 (giải pháp): There are several actions that could be taken to mitigate the problem mentioned above. Firstly,... Secondly,... Finally,...',
        'Kết bài 1 câu: In conclusion, there are various factors leading to... and measures can be implemented to tackle this issue. Khung này đã có sẵn nhiều từ đồng nghĩa ghi điểm: reasons = causes, actions/measures = solutions, mitigate/tackle = giải quyết.',
        'Lập dàn ý bằng cách hỏi liên tục: như thế nào? hậu quả gì? tại sao? Giải pháp phải nối với nguyên nhân: nêu 2 nguyên nhân (ăn uống không lành mạnh, lối sống thụ động) thì phải có giải pháp cho cả 2.',
        'Đừng dịch từng từ: học theo cụm (unhealthy eating habits, sedentary lifestyles, gain weight, a healthy diet, an imbalanced diet, junk food, take regular exercise, burn calories). Phân biệt weigh (động từ: nặng bao nhiêu) và weight (danh từ: cân nặng).',
        'Cấu trúc ngữ pháp: cause somebody to do something; X is high in / low in...; instead of + V-ing; It is important / necessary for somebody to do something (thay cho should); educate somebody about something; encourage somebody to do something; so that + S + V; bị động should be + V3.',
        'Dùng từ đồng nghĩa để tránh lặp: children → kids, limit → restrict, harmful → detrimental (điểm cao hơn), unhealthy food → junk food.'
      ],
      examples: [
        { kind: 'model', text: 'Child obesity is becoming a serious public health challenge in many nations. This essay will look at the primary causes of this and suggest some possible solutions to this problem.', vi: 'Mở bài.' },
        { kind: 'model', text: 'There are a number of reasons for the rising levels of child obesity. The first reason is unhealthy eating habits. Children nowadays tend to consume too much fast food, candy and sugary drinks. These foods can cause kids to gain weight quickly, as they are very high in fat and sugars but low in vitamins and minerals. Another reason is sedentary lifestyles. Children tend to watch television, browse the Internet or play computer games instead of playing outside or doing sport. As a consequence, they are becoming increasingly obese.', vi: 'Thân bài 1: nguyên nhân.' },
        { kind: 'model', text: 'There are several actions that could be taken to mitigate the problem mentioned above. Firstly, it is important for parents to control what children eat to make sure that they have a healthy diet. Parents should also educate them about the detrimental effects of an imbalanced diet, so that they can make healthier food choices. Secondly, unhealthy junk food should be banned from school menus, and fast food advertising should be limited. Finally, it is necessary for parents to restrict the time that their children spend on sedentary activities and encourage them to take regular exercise. Physical activity would help them to control their weight by burning excess calories that would otherwise be stored as fat.', vi: 'Thân bài 2: giải pháp nối với từng nguyên nhân.' },
        { kind: 'model', text: 'In conclusion, there are various factors leading to the increase in child obesity, and measures can be implemented to tackle this issue.', vi: 'Kết bài.' },
        { kind: 'bad', text: 'These foods can cause kids gain weight quickly.', vi: 'Thiếu to: cause kids to gain weight.' },
        { kind: 'bad', text: 'Children play games instead of play outside.', vi: 'Sau giới từ of dùng V-ing: instead of playing outside.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-03',
        task: 'Viết bài Task 2 dạng Causes – Solutions theo đúng khung của cô: mở bài 2 câu, thân bài 1 nêu 2 nguyên nhân có triển khai, thân bài 2 nêu giải pháp nối với từng nguyên nhân, kết bài 1 câu. Cố dùng ít nhất 3 cấu trúc: cause somebody to, It is important for somebody to, encourage somebody to, so that + S + V, should be + V3.'
      }
    },
    {
      id: 'hw22', video: 22, unit: 'Task 2: Problems – Solutions', minutes: 30,
      title: 'Dạng Problems – Solutions (vấn đề và giải pháp)',
      goal: 'Viết bài vấn đề – giải pháp theo dàn mẫu của cô: mở bài 2 câu, thân bài 1 nêu vấn đề, thân bài 2 nêu giải pháp, kết luận 1 câu.',
      points: [
        'Dạng đề: cho một xu hướng (đề mẫu: tuổi thọ trung bình ở các nước phát triển đang tăng), hỏi xu hướng đó gây ra vấn đề gì cho cá nhân và xã hội, rồi đề xuất giải pháp. Bài 4 đoạn: mở bài, 2 thân bài, kết luận.',
        'Mở bài: câu 1 paraphrase đề (In the developed world → In industrialized nations; average life expectancy is increasing → people are living longer than ever before; mở đầu It is true that...). Câu 2 học thuộc: Although there will undoubtedly be some negative consequences of this trend, measures can be taken to mitigate these potential problems.',
        'Thân bài 1 (vấn đề): There are a number of problems related to this trend. The main issue is that... + triển khai hoặc ví dụ. Another problem is... + triển khai. Finally,...',
        'Thân bài 2 (giải pháp): However, there are several actions that could be taken to solve the problems mentioned above. Firstly,... Secondly,... Finally,... Thay "the government should" bằng "it is important for the government to..." cho đa dạng.',
        'Kết luận 1 câu học thuộc: In conclusion, various measures can be implemented to tackle the problems that are certain to arise as + xu hướng (as the populations of countries grow older).',
        'Cách nghĩ ý: dừng video, tự liệt kê vấn đề trước. Mỗi vấn đề đi theo chuỗi nguyên nhân → hậu quả (nhiều người nghỉ hưu → ít lao động trẻ → chính phủ thu ít thuế hơn); mỗi giải pháp đáp lại một vấn đề (tăng tuổi nghỉ hưu → làm lâu hơn, đóng thêm thuế, giảm chi lương hưu).',
        'Từ vựng già hoá dân số: people of retirement age, be eligible to receive a pension, younger working adults, receive less money in taxes, a rise in the demand for healthcare, be allocated to, a decline in population growth, look after their elderly relatives, prevent sb from V-ing, increase the retirement age, reduce the cost of government pensions, encourage immigration of working people, national budgets.',
        'Ngữ pháp ghi điểm: rút gọn mệnh đề quan hệ chủ động (..., reducing the cost of government pensions = which reduces...); therefore đặt giữa câu (governments will therefore receive...); as = because.'
      ],
      examples: [
        { kind: 'model', text: 'It is true that in industrialized nations, people are living longer than ever before. Although there will undoubtedly be some negative consequences of this trend, measures can be taken to mitigate these potential problems.', vi: 'Mở bài.' },
        { kind: 'model', text: 'There are a number of problems related to this trend. The main issue is that there will obviously be more people of retirement age who will be eligible to receive a pension. The proportion of younger, working adults will be smaller, and governments will therefore receive less money in taxes. Another problem is a rise in the demand for healthcare. This would mean that more money would need to be allocated to healthcare for the ageing population. Finally, there would be a decline in population growth as young adults will increasingly have to look after their elderly relatives, which could prevent them from having a family of their own.', vi: 'Thân bài 1: vấn đề.' },
        { kind: 'model', text: 'However, there are several actions that could be taken to solve the problems mentioned above. Firstly, it is important for the government to increase the retirement age for working adults, perhaps from 65 to 70. If people worked longer, they would pay more in taxes, reducing the cost of government pensions. Secondly, the government should encourage immigration of working people in order to increase the number of working adults who pay taxes. Finally, money from national budgets will need to be taken from other areas and spent on vital healthcare, accommodation and transport facilities for the rising numbers of older citizens.', vi: 'Thân bài 2: giải pháp.' },
        { kind: 'model', text: 'In conclusion, various measures can be implemented to tackle the problems that are certain to arise as the populations of countries grow older.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'This could prevent them to have a family of their own.', vi: 'prevent sb from + V-ing: prevent them from having a family of their own.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-13',
        task: 'Viết trọn bài vấn đề – giải pháp theo đúng dàn mẫu của cô: mở bài 2 câu (câu 2 học thuộc), thân bài 1 nêu 2–3 vấn đề theo chuỗi nguyên nhân → hậu quả, thân bài 2 nêu giải pháp cho từng vấn đề, kết luận 1 câu.'
      }
    },
    {
      id: 'hw23', video: 23, unit: 'Task 2: Discuss both views', minutes: 31,
      title: 'Dạng Discuss both views and give your opinion',
      goal: 'Viết bài thảo luận 2 quan điểm và nêu ý kiến riêng: thân bài 1 cho quan điểm mình không theo, thân bài 2 cho quan điểm mình chọn.',
      points: [
        'Dạng đề: Some people think that ABC. Others, however, believe XYZ. Discuss both these views and give your own opinion. Phải bàn cả 2 quan điểm, dù mình theo bên nào, và nói rõ mình theo bên nào.',
        'Mở bài 2 câu: It would be argued by some that XYZ (học thuật hơn Some people think; hoặc Some people would argue that...). In my opinion, however, ABC.',
        'Thân bài 1 (quan điểm mình không theo): On the one hand, there are a number of reasons why some believe that XYZ. The first reason is that... + triển khai hoặc ví dụ. Another reason is that... + triển khai hoặc ví dụ.',
        'Thân bài 2 (quan điểm của mình): On the other hand, I would argue that ABC. Rồi lý do, triển khai, ví dụ (Firstly,... Secondly,...).',
        'Kết luận: In conclusion, although / while some people think that XYZ, I personally believe that ABC. Viết khác mở bài một chút, ví dụ đổi chủ động thành bị động (send students to → students should be sent to).',
        'Đề mẫu: học trường một giới hay trường hai giới. Đồng nghĩa: separate schools = single-sex / single-gender schools (education); mixed schools = mixed-sex / mixed-gender / integrated / co-ed schools; send sb to / study at / enter / choose a school; boys and girls = male and female students.',
        'Triển khai mỗi lý do thành chuỗi: dạy riêng → hầu như không có cơ hội nảy sinh tình cảm sớm → không bị sao nhãng → tập trung học hơn → kết quả cao hơn. Dùng might / may khi nói điều chỉ có thể xảy ra, để giảm độ chắc chắn.',
        'Cụm hay: there is little chance for (hầu như không có cơ hội cho), be distracted, focus more on, higher academic results, different learning needs, teaching styles and subject choices, be focused entirely on either... or..., group work activities, opposite-sex classmates, a wide range of (= many), co-existence and gender equality, explore each other\'s perspectives, similarities and differences, it would be better for sb to V, bring more benefits to sb. Không mở câu bằng Because, viết This is because...'
      ],
      examples: [
        { kind: 'model', text: 'It would be argued by some that it is more beneficial to send students to single-sex schools. In my opinion, however, they should enter mixed-gender education.', vi: 'Mở bài.' },
        { kind: 'model', text: 'On the one hand, there are a number of reasons why some think that students should study in single-gender schools. The first reason is that when boys and girls are taught separately, there is little chance for early relationships. Without worrying about these distractions, students might be able to focus more on their studies and therefore might get higher academic results than those in mixed schools. Another reason is that boys and girls have different learning needs. It is therefore better for them to be taught separately as single-sex schools can offer teaching styles and subject choices that are focused entirely on either boys or girls.', vi: 'Thân bài 1: quan điểm mình không theo.' },
        { kind: 'model', text: 'On the other hand, I would argue that it would be better for students to attend co-ed schools. Firstly, students in mixed schools have the opportunity to interact and participate in group work activities with opposite-sex classmates. This may help them learn a wide range of skills, such as communication or teamwork, which are necessary for their future jobs. Secondly, co-ed schools teach them about co-existence and gender equality. This is because male and female students have the chance to explore each other\'s perspectives, and the similarities and differences between them.', vi: 'Thân bài 2: quan điểm của mình.' },
        { kind: 'model', text: 'In conclusion, while some people think that students should be sent to single-sex schools, I personally believe that co-ed schools bring more benefits to students.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'Because boys and girls have different learning needs.', vi: 'Câu cụt khi mở bằng Because; viết: This is because boys and girls have different learning needs.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-08',
        task: 'Viết trọn bài thảo luận 2 quan điểm theo dàn mẫu của cô: mở bài 2 câu (It would be argued by some that... In my opinion, however,...), thân bài 1 cho quan điểm bạn không theo (2 lý do), thân bài 2 cho quan điểm của bạn, kết luận 1 câu.'
      }
    },
    {
      id: 'hw24', video: 24, unit: 'Task 2: Agree or Disagree', minutes: 30,
      title: 'Dạng Agree or Disagree (đồng ý hoàn toàn)',
      goal: 'Chọn 1 trong 3 hướng trả lời đề đồng ý hay không, viết bài đồng ý hoàn toàn: mỗi thân bài 1 lý do, có ví dụ cá nhân.',
      points: [
        'Dạng đề: một nhận định + Do you agree or disagree? (hoặc To what extent do you agree or disagree?). Có 3 hướng: đồng ý hoàn toàn, không đồng ý hoàn toàn, đồng ý một phần.',
        'Mở bài: câu 1 paraphrase topic; câu 2 trả lời yêu cầu: I completely agree with this point of view. / I completely disagree with this point of view. / While I accept that ABC, I also believe that XYZ.',
        'Đồng ý hoặc không đồng ý hoàn toàn: thân bài 1 là lý do thứ nhất, thân bài 2 là lý do thứ hai vì sao bạn đồng ý (không đồng ý). Đồng ý một phần: thân bài 1 nói vì sao bạn đồng ý một phần với ABC, thân bài 2 nói vì sao bạn tin XYZ. Kết bài tóm tắt ý.',
        'Đề có nhiều nhận định thì viết cho đủ từng nhận định (đề mẫu có 2: người ta làm việc nhiều giờ hơn; việc đó gây hại cho bản thân, gia đình, xã hội nên phải giới hạn giờ làm). Bỏ sót sẽ bị trừ điểm Task Response.',
        'Dàn ý bài mẫu: Body 1 = trước đây làm 8 tiếng mỗi ngày, nay 10–14 tiếng + ảnh hưởng lên sức khoẻ, năng suất của người lao động + ví dụ người thân. Body 2 = ảnh hưởng lên gia đình và cộng đồng + ví dụ.',
        'Ví dụ cá nhân làm bài thuyết phục: My cousin is a case in point (là ví dụ điển hình). Câu học thuật: chèn however, in my opinion vào giữa câu (This, in my opinion, adversely affects...); be likely to để giảm độ chắc chắn; 2 vế cùng chủ ngữ thì rút gọn: Working nearly twelve hours on a daily basis, he frequently feels exhausted...',
        'Từ vựng thân bài 1: get more common, in today\'s society, have a severe impact on, not only... but also..., limit / restrict working hours, an average of eight hours per day, average daily working hours, adversely affect, suffer from various health issues ranging from fatigue to anxiety disorders or even stroke, failing health, sick leave, poor work performance, low productivity, make errors.',
        'Từ vựng thân bài 2 và kết: have serious consequences for, at the family level, busy working schedules, prevent sb from V-ing, take frequent family trips, have meals together, be greatly weakened, make time for each other, in terms of community life, overworked, devote time to, hardly (hầu như không, khác hard), conservation work, working with a charity; In conclusion, I would argue that..., the frequency of, exert an adverse effect on, family bonds.'
      ],
      examples: [
        { kind: 'model', text: 'Working longer hours is getting more common in today\'s society. I personally believe that this trend has a severe impact not only on the workers themselves but also on their families and the community as a whole. Therefore, I totally agree with the idea of limiting working hours.', vi: 'Mở bài.' },
        { kind: 'model', text: 'A few decades ago, a person normally worked an average of eight hours per day. Average daily working hours in recent years, however, have significantly increased to ten or even fourteen hours. This, in my opinion, adversely affects employees\' health and productivity. For example, people who spend longer at work are more likely to suffer from various health issues, ranging from fatigue to more serious problems like anxiety disorders or even stroke. Failing health leads to more sick leave, poor work performance and low productivity. My cousin is a case in point. Working nearly twelve hours on a daily basis, he frequently feels exhausted and makes more errors at work than he used to.', vi: 'Thân bài 1: lý do 1.' },
        { kind: 'model', text: 'I also think that extended hours of work have serious consequences for families and communities. At the family level, busy working schedules prevent people from taking frequent family trips or even just having meals together. Relationships among members are greatly weakened if they cannot make time for each other. In terms of community life, overworked people do not devote time to voluntary activities that bring benefits to their society. My uncle, for example, hardly has time for local community service projects such as conservation work or working with a charity because he works more than sixty hours per week.', vi: 'Thân bài 2: lý do 2.' },
        { kind: 'model', text: 'In conclusion, I would argue that working time should be reduced since the frequency of long working hours exerts an adverse effect on employees, their family bonds and their community.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'Extended hours of work has serious consequences for families.', vi: 'Chủ ngữ hours là số nhiều: have serious consequences.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-15',
        task: 'Viết trọn bài theo hướng đồng ý hoàn toàn (hoặc không đồng ý hoàn toàn): mở bài 2–3 câu có I completely agree / disagree with this point of view, mỗi thân bài 1 lý do có triển khai và 1 ví dụ cá nhân (... is a case in point), kết luận 1 câu.'
      }
    },
    {
      id: 'hw25', video: 25, unit: 'Task 2: Positive or negative', minutes: 28,
      title: 'Dạng Positive or negative development',
      goal: 'Trả lời đề "xu hướng này tích cực hay tiêu cực" theo 1 trong 3 hướng, viết bài vừa có lợi vừa có hại theo dàn mẫu của cô.',
      points: [
        'Dạng đề: cho một xu hướng (đề mẫu: ở một số nước, ngày càng nhiều người chọn sống một mình) và hỏi Do you think this is a positive or negative development?',
        'Mở bài: câu 1 paraphrase topic (In some countries → In some nations; many more people → an increasing number of people; live alone → live by themselves). Câu 2 trả lời: I personally believe that this trend is totally positive / beneficial; hoặc totally negative / harmful / detrimental; hoặc both positive and negative / has both benefits and drawbacks.',
        'Chọn hoàn toàn tích cực thì 2 thân bài đều viết mặt tích cực; hoàn toàn tiêu cực thì 2 thân bài đều viết mặt tiêu cực; vừa có lợi vừa có hại thì 1 thân bài viết nhược điểm, 1 thân bài viết lợi ích.',
        'Thân bài nhược điểm: There are two major disadvantages of... The first drawback is that... + triển khai, ví dụ. Another drawback is that... + triển khai, ví dụ. Thân bài lợi ích: Despite the negatives mentioned above, ... brings a wide range of benefits. Firstly,... Secondly,...',
        'Kết bài 1 câu: In conclusion, in my opinion, ... has both beneficial and detrimental effects.',
        'Ý tưởng bài mẫu. Nhược điểm: cô đơn, cô lập, lo lắng vì thiếu sự hỗ trợ của gia đình (người già, người ly hôn dễ trầm cảm); không an toàn khi gặp nguy hiểm (đau tim, bệnh đột ngột mà không ai phát hiện). Lợi ích: tự lập (trả hoá đơn, quản lý ngân sách, tự chăm sóc mình); bình yên và tự do sắp đặt cuộc sống (tự đặt quy định, tự quyết định).',
        'Từ vựng: one-person households, experience feelings of loneliness, isolation and worry, the daily support from their family, the divorced, be at risk of depression, an increasingly severe problem, help them out of a dangerous situation, a heart attack or any other sudden illness, take sb to the hospital, independent and self-reliant, pay bills, manage their budget, inner peace, the freedom to design their own lives, create their own rules, make their own decisions, without worrying about other people\'s opinions, be free to V.',
        'for instance = for example, có thể đặt giữa 2 dấu phẩy sau chủ ngữ cho học thuật: A person living alone, for instance, is free to...; since = because; ... are a case in point (là ví dụ điển hình).'
      ],
      examples: [
        { kind: 'model', text: 'In some nations, an increasing number of people are choosing to live by themselves. I personally believe that this trend has both benefits and drawbacks.', vi: 'Mở bài.' },
        { kind: 'model', text: 'There are two major disadvantages of the rise in one-person households. The first drawback is that people who decide to live alone may experience feelings of loneliness, isolation and worry because they live without the daily support from their family. Elderly people and the divorced are a case in point. These groups are more at risk of depression, which is becoming an increasingly severe problem in society. Another drawback is that the safety of people living alone could be at risk since there would be no one to help them out of a dangerous situation. If a person had a heart attack or any other sudden illness, there would be no one to discover him and take him to the hospital.', vi: 'Thân bài 1: nhược điểm.' },
        { kind: 'model', text: 'Despite the negatives mentioned above, living alone brings a wide range of benefits. Firstly, people who choose to live alone may become more independent and self-reliant than those who live with family members. This is because they may need to learn to pay bills, manage their budget and take care of themselves. Secondly, living alone can provide inner peace and the freedom to design their own lives. They can create their own rules and make their own decisions without worrying about other people\'s opinions. A person living alone, for instance, is free to decorate his own room in his favourite way and do whatever he wants to do.', vi: 'Thân bài 2: lợi ích.' },
        { kind: 'model', text: 'In conclusion, in my opinion, the increase in one-person households has both beneficial and detrimental effects.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'If a person has a heart attack, there would be no one to take him to the hospital.', vi: 'Câu điều kiện loại 2 lệch thì: If a person had a heart attack, there would be no one...' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-10',
        task: 'Viết trọn bài theo dàn mẫu của cô. Phần "tích cực hay tiêu cực" chọn hướng vừa có lợi vừa có hại: thân bài 1 viết 2 nhược điểm (The first drawback is that... Another drawback is that...), thân bài 2 viết lợi ích (Despite the negatives mentioned above,...). Đề này hỏi thêm "vì sao", hãy nêu ngắn nguyên nhân ngay trong mở bài hoặc đầu thân bài 1.'
      }
    },
    {
      id: 'hw26', video: 26, unit: 'Task 2: Advantages outweigh', minutes: 28,
      title: 'Dạng Advantages outweigh disadvantages',
      goal: 'Viết bài "lợi ích có lớn hơn bất lợi không": thân bài 1 nêu bất lợi, thân bài 2 nêu lợi ích lớn hơn, mỗi ý có ví dụ cụ thể.',
      points: [
        'Dạng đề: cho một xu hướng (đề mẫu: công nghệ mới đã thay đổi cách trẻ em dùng thời gian rảnh) rồi hỏi Do the advantages outweigh the disadvantages? (outweigh = lớn hơn). Mình phải chọn rõ bên nào lớn hơn.',
        'Mở bài: câu 1 paraphrase (New technologies → Novel technological developments; have changed → have altered; the way → how; free time → leisure time). Câu 2: Despite some obvious disadvantages of this trend, I believe that these are outweighed by the advantages. Thấy bất lợi lớn hơn thì đổi chỗ 2 từ advantages / disadvantages.',
        'Thân bài 1 (bất lợi): On the one hand, there are a number of major drawbacks when... The first drawback is that... + triển khai hoặc ví dụ. Another negative effect is that... + triển khai hoặc ví dụ.',
        'Thân bài 2 (lợi ích, phần lớn hơn): On the other hand, I believe that the benefits are more significant than such disadvantages. Firstly,... Secondly,... Finally,... Mỗi ý có ví dụ cụ thể (cháu tôi xem kênh Discovery; trẻ học làm thí nghiệm qua chương trình Minute Earth).',
        'Kết luận 1 câu: In conclusion, I would argue that ... brings more benefits than drawbacks.',
        'Từ vựng bất lợi: technological devices, hi-tech gadgets, screen time activities, devote a large amount of time to, have an adverse impact on, suffer from various health problems such as eye strain, short-sightedness or obesity, online entertainment activities, browse the Internet, hang out with their peers, social isolation, seriously affect their later lives.',
        'Từ vựng lợi ích: enrich their knowledge, learn a wide range of valuable skills, animals and their natural habitats, stimulate children\'s creativity and imagination, conduct simple experiments, educational programmes, make friends from all over the world, social networking sites.',
        'Ngữ pháp: be more likely to (giảm độ chắc chắn); instead of + V-ing; by + V-ing (bằng cách); help sb (to) V; for example / for instance chèn sau chủ ngữ (My young niece, for example, knows...).'
      ],
      examples: [
        { kind: 'model', text: 'Novel technological developments have altered how children spend their leisure time. Despite some obvious disadvantages of this trend, I believe that these are outweighed by the advantages.', vi: 'Mở bài.' },
        { kind: 'model', text: 'On the one hand, there are a number of major drawbacks when children spend too much time playing with technological devices. The first drawback is that this trend would have an adverse impact on their health. Children who devote a large amount of their time to video games or screen time activities are more likely to suffer from various health problems such as eye strain, short-sightedness or obesity. Another negative effect is that more time spent on online entertainment activities means less time for other social activities. Children tend to play electronic games or browse the Internet instead of hanging out with their peers. This would lead to social isolation, which seriously affects their later lives.', vi: 'Thân bài 1: bất lợi.' },
        { kind: 'model', text: 'On the other hand, I believe that the benefits are more significant than such disadvantages. Firstly, new technologies help kids enrich their knowledge and learn a wide range of valuable skills. My young niece, for example, knows more about animals and their natural habitats by watching the Discovery Channel on her iPad. Secondly, hi-tech gadgets stimulate children\'s creativity and imagination. A child, for instance, could learn to conduct simple experiments by watching educational programmes like Minute Earth or Best of Science. Finally, children have more opportunities to make friends from all over the world by using social networking sites such as Facebook, Twitter or Instagram.', vi: 'Thân bài 2: lợi ích.' },
        { kind: 'model', text: 'In conclusion, I would argue that the appearance of new technological improvements brings more benefits than drawbacks.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'Children tend to play electronic games instead of hang out with their peers.', vi: 'Sau instead of dùng V-ing: instead of hanging out with their peers.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-23',
        task: 'Viết trọn bài theo dàn mẫu: mở bài 2 câu (Despite some obvious disadvantages of this..., I believe that these are outweighed by the advantages), thân bài 1 nêu 2 bất lợi, thân bài 2 nêu 2–3 lợi ích có ví dụ cụ thể, kết luận 1 câu.'
      }
    },
    {
      id: 'hw27', video: 27, unit: 'Task 2: 2-part question', minutes: 29,
      title: 'Dạng 2-part question (đề có 2 câu hỏi)',
      goal: 'Viết bài cho đề có 2 câu hỏi: mở bài trả lời ngắn cả 2, mỗi thân bài trả lời đầy đủ 1 câu hỏi, không bỏ sót vế nào.',
      points: [
        'Dạng đề có 2 yêu cầu. Đề mẫu: cấu trúc gia đình và vai trò các thành viên đang thay đổi. What kinds of changes can occur? Do you think these changes are positive or negative? Đây là bài Task 2 cuối của khoá.',
        'Mở bài: câu 1 paraphrase topic (In recent years → In the past few decades; role → responsibilities; are gradually changing → have altered greatly). Câu 2 trả lời ngắn cả 2 câu hỏi: There are some important changes that have taken place, and I believe that these changes have both benefits and drawbacks (hoặc are totally positive / totally negative).',
        'Thân bài 1 trả lời câu hỏi 1, thân bài 2 trả lời câu hỏi 2. Kết bài chỉ cần paraphrase lại mở bài.',
        'Một câu hỏi có 2 vế (cấu trúc gia đình VÀ vai trò các thành viên) thì trả lời cả 2 vế, mở mỗi vế bằng In terms of... / Regarding... Bỏ sót vế nào là mất điểm Task Response.',
        'Triển khai ý bằng cách tự hỏi "tại sao" và "kết quả là gì": chi phí sống tăng → người ta không sinh nhiều con → gia đình hạt nhân, gia đình 1 người phổ biến hơn.',
        'Thân bài 2 (vừa lợi vừa hại): In my opinion, those changes have both positive and negative consequences. The major benefit is that... However,... Lợi: con trong gia đình nhỏ có cơ hội học tốt hơn, du học. Hại: bố mẹ đều đi làm, quá bận để chăm con.',
        'Từ vựng gia đình: generations living under the same roof, nuclear families, one-person households, the cost of living, prevent sb from V-ing, take on the role of the primary breadwinner, homemaker, gain qualifications, pursue their own careers, family financial burdens are shared by both fathers and mothers, better education opportunities, study abroad, international qualifications, ensure them a better job, offspring (con cái), parental care and guidance, engage in criminal activities, ruin their future.',
        'Ngữ pháp: undergo changes (trải qua thay đổi); too + tính từ + to V (too busy to take care of); both... and...; câu kết dùng be + tính từ: these changes are both beneficial and detrimental.'
      ],
      examples: [
        { kind: 'model', text: 'In the past few decades, the structure of a family and the responsibilities of its members have altered greatly. There are some important changes that have taken place, and I believe that these changes have both benefits and drawbacks.', vi: 'Mở bài.' },
        { kind: 'model', text: 'Families at present have undergone two main changes compared to the past. In terms of family size, a few decades ago, there were normally three or four generations living under the same roof. These days, however, nuclear families and one-person households are becoming increasingly popular. The cost of living has risen considerably, and this prevents people from having too many children. Regarding the responsibilities of family members, fathers traditionally took on the role of the primary breadwinner, while the job of homemaker was done by mothers. Many women in today\'s society have the opportunity to gain qualifications and pursue their own careers, and family financial burdens are now shared by both fathers and mothers.', vi: 'Thân bài 1: trả lời câu hỏi 1 (cả 2 vế).' },
        { kind: 'model', text: 'In my opinion, those changes have both positive and negative consequences. The major benefit is that children of small families are given better education opportunities. Many children have the chance to study abroad and gain international qualifications, which would ensure them a better job after graduation. However, working parents are now too busy to take care of their offspring. Without parental care and guidance, children may suffer from various problems, ranging from loneliness to bad behaviour. Some children even engage in criminal activities such as illegal drug use or unlawful gambling, which may ruin their future.', vi: 'Thân bài 2: trả lời câu hỏi 2.' },
        { kind: 'model', text: 'In conclusion, there are several changes in family structure and the role of its members, and I would argue that these changes are both beneficial and detrimental.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'Families at present have undergone two main differences.', vi: 'undergo đi với changes: have undergone two main changes.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-24',
        task: 'Viết trọn bài cho đề 2 câu hỏi: mở bài 2 câu (câu 2 trả lời ngắn cả 2 câu hỏi), thân bài 1 trả lời câu hỏi 1, thân bài 2 trả lời câu hỏi 2, kết bài paraphrase lại mở bài. Kiểm tra lại xem đã trả lời đủ mọi vế của đề chưa.'
      }
    },
    {
      id: 'hw28', video: 28, unit: 'Task 2: Cấu trúc quan trọng', minutes: 24,
      title: 'Những cấu trúc quan trọng trong Writing Task 2',
      goal: 'Viết cùng một ý bằng nhiều cấu trúc khác nhau: nguyên nhân, giải pháp không dùng should, ảnh hưởng tốt và xấu.',
      points: [
        'Video cập nhật của cô: các cấu trúc dùng lại được trong hầu hết bài Task 2. Mục đích là đổi cấu trúc liên tục, không lặp một kiểu câu trong cả bài.',
        'A gây ra B (chủ động): A causes / leads to / results in / contributes to B. Ví dụ: Deforestation causes global warming. Đổi thêm từ đồng nghĩa: deforestation = forest clearance; global warming = climate change.',
        'B do A gây ra (bị động): B is / are caused by A, hoặc B results from A. Ví dụ: Global warming results from increased carbon dioxide in the atmosphere. Lưu ý: result in = gây ra, result from = do... gây ra (ngược chiều nhau).',
        'Một trong những nguyên nhân chính: One of the primary reasons for B is A / One of the primary causes of B is A. reason đi với for, cause đi với of; primary = principal = main = major.',
        'Giải pháp thay cho should: It is necessary for sb to V; One of the most effective solutions to tackle this problem would be for sb to V; hoặc đổi sang bị động: More money should be spent on education.',
        'Ảnh hưởng xấu: A has a negative effect on B (negative = severe = adverse = harmful = detrimental; effect = impact; dùng adverse thì đổi a thành an), hoặc A negatively affects B (negatively = severely = adversely = detrimentally). effect là danh từ, affect là động từ.',
        'Ảnh hưởng tốt: A has a positive / beneficial effect on B, hoặc A positively / beneficially affects B. Chủ ngữ số nhiều thì have, affect không thêm s: Technological advances have a positive effect on our lives.'
      ],
      examples: [
        { kind: 'model', text: 'Deforestation causes global warming. / Deforestation leads to global warming. / Deforestation results in global warming. / Deforestation contributes to global warming.', vi: 'A gây ra B: 4 cách.' },
        { kind: 'model', text: 'Global warming is caused by increased carbon dioxide in the atmosphere. / Global warming results from increased carbon dioxide in the atmosphere.', vi: 'B do A gây ra.' },
        { kind: 'model', text: 'One of the primary reasons for global warming is deforestation. / One of the main causes of global warming is forest clearance.', vi: 'Một trong những nguyên nhân chính.' },
        { kind: 'model', text: 'It is necessary for the government to spend more money on education. / One of the most effective solutions to tackle this problem would be for the government to spend more money on education. / More money should be spent on education.', vi: 'Giải pháp: 3 cách thay should.' },
        { kind: 'model', text: 'Smoking has an adverse effect on health. / Smoking negatively affects health.', vi: 'Ảnh hưởng xấu.' },
        { kind: 'model', text: 'Technological advances have a beneficial effect on our lives. / Technological advances positively affect our lives.', vi: 'Ảnh hưởng tốt.' },
        { kind: 'bad', text: 'One of the most effective solution to tackle this problem would be for the government to spend more money on education.', vi: 'One of + danh từ số nhiều: one of the most effective solutions.' },
        { kind: 'bad', text: 'Smoking has a negative affect on health.', vi: 'Danh từ là effect; affect là động từ (Smoking negatively affects health).' }
      ],
      practice: {
        type: 'write', rows: 8,
        task: 'Viết lại mỗi câu dưới đây theo 2 cách khác, dùng đúng cấu trúc trong bài và giữ nguyên nghĩa.',
        items: ['Fast food causes obesity in children. (viết lại bằng: B do A gây ra; Một trong những nguyên nhân chính)', 'The government should build more public parks. (viết lại bằng: It is necessary for...; One of the most effective solutions...)', 'Social media has a negative effect on teenagers\' sleep. (đổi từ đồng nghĩa; dùng affect)', 'Regular exercise has a positive effect on mental health. (đổi từ đồng nghĩa; dùng affect)'],
        check: 'only the structures taught: cause / lead to / result in / contribute to; is caused by / results from; One of the primary reasons for / causes of; It is necessary for sb to V; One of the most effective solutions to tackle this problem would be for sb to V; passive "should be + V3"; has a negative / an adverse / a harmful / a detrimental effect on; negatively / adversely affects; has a positive / beneficial effect on; positively affects. Check subject–verb agreement, "effect" (noun) vs "affect" (verb), "for" after reasons and "of" after causes, a/an, and that every rewrite keeps the original meaning. Point out errors and give corrected sentences.'
      }
    },
    {
      id: 'hw29', video: 29, unit: 'Task 2: Agree or Disagree', minutes: 31,
      title: 'Dạng Agree or Disagree (không đồng ý hoàn toàn)',
      goal: 'Viết bài không đồng ý hoàn toàn: tách nhận định của đề thành từng phần, mỗi thân bài phản bác một phần bằng 2 lý do có ví dụ.',
      points: [
        'Agree or Disagree là dạng ra nhiều nhất trong năm. Bài này là hướng không đồng ý hoàn toàn (bài 24 là đồng ý hoàn toàn, bài 30 là đồng ý một phần). Đề thi thật ngày 30/3/2017: nên cấm mọi hình thức quảng cáo vì quảng cáo vô ích, thậm chí gây hại.',
        'Mở bài: Some people believe that + paraphrase nhận định (a ban on → a complete prohibition on; all forms of → all kinds of; society would benefit from X → X would benefit society; serves no useful purpose → is totally useless; can be damaging → can cause a lot of damage). Rồi: I totally disagree with this point of view.',
        'Tách đề thành từng phần: nhận định có 2 phần (cấm quảng cáo có lợi cho xã hội; quảng cáo vô ích và gây hại) → Body 1 phản bác phần 1, Body 2 phản bác phần 2. Chia rõ như vậy thì viết không bị rối.',
        'Mỗi thân bài mở bằng 1 câu giới thiệu (I believe that society would suffer a great deal if... / I also think that advertising brings a wide range of benefits to society without causing any harm), rồi 2 lý do: The first reason is that... Another reason is that... hoặc This can be explained by the fact that... Moreover,...',
        'Ý tưởng bài mẫu: cấm quảng cáo → hàng triệu người mất việc; chính phủ mất một nguồn thu thuế lớn; quảng cáo cho người mua thông tin để chọn tốt hơn (chọn dầu gội); quảng cáo mở mang kiến thức (cháu xem quảng cáo đồ công nghệ).',
        'Kết luận: In conclusion, for the reasons mentioned above, I would argue that... (paraphrase lại mở bài: a complete prohibition on → a total ban on). Bài mẫu do cô viết, khoảng 270 từ; cô cho biết bài được chấm band 8.5.',
        'Cụm hay: suffer a great deal, be banned / prohibited / made illegal, create a range of job opportunities, face unemployment, have a severe impact on, make significant contributions to, lose a huge amount of tax revenue, advertising agencies, issue sb with a business licence, provide sb with information about, make better shopping choices, TV commercials = adverts = advertisements, digital gadgets = technological devices, enrich people\'s knowledge about various aspects of life, serve many useful purposes.'
      ],
      examples: [
        { kind: 'model', text: 'Some people believe that a complete prohibition on all kinds of advertising would benefit society because it is totally useless and can even cause a lot of damage. I totally disagree with this point of view.', vi: 'Mở bài.' },
        { kind: 'model', text: 'I believe that society would suffer a great deal if all forms of advertising were made illegal. The first reason is that the advertising industry creates a range of job opportunities for many people. A complete ban on this industry means that millions of people would have to face unemployment, which would have a severe impact on their lives. Another reason is that the advertising industry makes significant contributions to the development of any nation. Therefore, the government would lose a huge amount of tax revenue from advertising agencies if they did not issue these companies with a business licence.', vi: 'Thân bài 1: phản bác phần 1.' },
        { kind: 'model', text: 'I also think that advertising brings a wide range of benefits to society without causing any harm. This can be explained by the fact that advertisements provide people with information about products or services so that they can make better shopping choices. For example, by watching TV commercials about different brands of shampoo products, I can choose the one that works best for me. Moreover, advertising could help enrich people\'s knowledge about various aspects of life. My nephew, for instance, knows a lot about technological devices such as smartphones or iPads because he watches many adverts about digital gadgets.', vi: 'Thân bài 2: phản bác phần 2.' },
        { kind: 'model', text: 'In conclusion, for the reasons mentioned above, I would argue that a total ban on advertising would have an adverse effect on society because it serves many useful purposes and does not harm anybody.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'The advertising industry makes significant contributions to the development of any nations.', vi: 'any + danh từ số ít: any nation (hoặc all nations).' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-18',
        task: 'Viết trọn bài theo hướng không đồng ý hoàn toàn: mở bài kết thúc bằng I totally disagree with this point of view; tách nhận định của đề thành 2 phần, mỗi thân bài phản bác 1 phần bằng câu giới thiệu + 2 lý do có ví dụ; kết luận In conclusion, for the reasons mentioned above, I would argue that...'
      }
    },
    {
      id: 'hw30', video: 30, unit: 'Task 2: Agree or Disagree', minutes: 27,
      title: 'Dạng Agree or Disagree (đồng ý một phần)',
      goal: 'Viết bài đồng ý một phần: thân bài 1 nói vì sao bạn đồng ý một phần, thân bài 2 nêu ý kiến riêng mà bạn cho là tốt hơn.',
      points: [
        'Hướng thứ 3 của dạng Agree or Disagree: đồng ý một phần, phần còn lại có ý kiến khác. Đề mẫu: The best way to solve the world\'s environmental problems is to increase the cost of fuel.',
        'Mở bài: câu 1 paraphrase (It is believed that the most effective solution to combat environmental issues is to raise fuel prices). Câu 2: While I accept that ABC (this measure could have some effects in the short run), I also believe that XYZ (raising people\'s environmental awareness is by far the best approach).',
        'Thân bài 1 nói vì sao bạn đồng ý một phần với ABC: On the one hand, I think that... + 2 lý do. Thân bài 2 nói vì sao bạn tin XYZ: On the other hand, I personally believe that this is not the best solution... This is because... Therefore, I think that...',
        'Kết bài: In conclusion, although..., it seems to me that... is by far the most practical solution.',
        'Mỗi thân bài mở bằng 1 câu giới thiệu. Nối lý do thứ hai bằng Another point that needs to be mentioned is that... (hay hơn The second reason is).',
        'Ý tưởng bài mẫu: tăng giá nhiên liệu → nhà máy chuyển sang năng lượng thay thế → ít khí thải hơn; chi phí đi lại tăng → người ta đi xe buýt, đi chung xe, đạp xe. Nhưng giá nhiên liệu đã tăng mạnh mà số xe riêng vẫn tăng → cách tốt nhất là nâng cao ý thức, để mọi người tự hành động.',
        'Từ vựng môi trường: combat environmental issues, raise fuel prices, in the short run, by far the best approach, alternative energy sources such as nuclear or renewables, replace fossil fuels, greenhouse gases and emissions, mitigate global warming and air pollution, commuting costs, carpool, cycle to work, private vehicles, exhaust fumes, at alarming rates, increase public awareness about the importance of protecting the earth, be fully aware of, be willing to take action, tackle environmental pollution, somewhat contribute to.',
        'Ngữ pháp: rút gọn mệnh đề chủ động (..., mitigating global warming and air pollution) và bị động (exhaust fumes released into the environment); rising fuel prices mean... (rising là tính từ, prices số nhiều nên mean không có s); help (to) V. Bài mẫu do cô viết, cô cho biết đạt band 9.0.'
      ],
      examples: [
        { kind: 'model', text: 'It is believed that the most effective solution to combat environmental issues is to raise fuel prices. While I accept that this measure could have some effects in the short run, I believe that raising people\'s environmental awareness is by far the best approach to deal with these problems.', vi: 'Mở bài.' },
        { kind: 'model', text: 'On the one hand, I think that increasing fuel costs such as petrol, oil and natural gas could help address some of the world\'s environmental problems nowadays. Industries, especially power plants, might find alternative energy sources such as nuclear or renewables to replace fossil fuels. This would lead to fewer greenhouse gases and emissions released into the atmosphere, mitigating global warming and air pollution. Another point that needs to be mentioned is that rising fuel prices mean that commuting costs would rapidly climb. People might take public transport, carpool or cycle to work rather than use their private vehicles. This could also help reduce the amount of exhaust fumes released into the environment.', vi: 'Thân bài 1: vì sao đồng ý một phần.' },
        { kind: 'model', text: 'On the other hand, I personally believe that this is not the best solution to various environmental issues facing the world today. This is because in recent years, the cost of fuel has grown enormously, but the number of private cars has still increased at alarming rates. Therefore, I think that in order to properly solve environmental problems, we need to increase public awareness about the importance of protecting the earth. When everyone is fully aware of this, they would be willing to take action to tackle environmental pollution and other related issues.', vi: 'Thân bài 2: ý kiến riêng.' },
        { kind: 'model', text: 'In conclusion, although increasing fuel costs could somewhat contribute to environmental protection, it seems to me that raising people\'s awareness of environmental protection is by far the most practical solution.', vi: 'Kết luận.' },
        { kind: 'bad', text: 'This would lead to less greenhouse gases.', vi: 'gases đếm được nên dùng fewer: fewer greenhouse gases.' }
      ],
      practice: {
        type: 'essay', taskType: 'task2', promptId: 't2-19',
        task: 'Viết trọn bài theo hướng đồng ý một phần: mở bài có While I accept that..., I also believe that...; thân bài 1 (On the one hand) nói vì sao bạn đồng ý một phần; thân bài 2 (On the other hand) nêu ý kiến riêng và lý do; kết luận Although..., it seems to me that...'
      }
    }
  ],
  speaking: [
    {
      id: 'hs01', video: 1, unit: 'Tổng quan Speaking', minutes: 20,
      title: 'Giới thiệu kỳ thi IELTS Speaking và cách học khóa học',
      goal: 'Biết cấu trúc 3 phần thi, 4 tiêu chí chấm, những gì xảy ra trong phòng thi và cách tự học khóa này.',
      points: [
        'Thi Speaking 11–14 phút, có thể trước, cùng ngày hoặc sau 3 kỹ năng còn lại vài ngày.',
        'Part 1 (4–5 phút): giám khảo hỏi chủ đề quen thuộc (family, hobbies, friends...), thường 3 chủ đề, mỗi chủ đề 3–4 câu. Part 2: nhận tờ đề, giấy và bút chì, 1 phút chuẩn bị rồi nói khoảng 2 phút một mình, quá 2 phút giám khảo sẽ dừng. Part 3 (4–5 phút): hỏi đáp sâu hơn về chủ đề của Part 2, khá học thuật, cần chuẩn bị kỹ nếu muốn 6.5+.',
        '4 tiêu chí: trôi chảy và mạch lạc, vốn từ vựng, ngữ pháp (đa dạng và chính xác), phát âm. Giọng Anh hay Mỹ đều được, miễn phát âm đúng và rõ.',
        'Trọng tâm từng phần: Part 1 ưu tiên trôi chảy, mỗi câu trả lời khoảng 2 câu là đủ; Part 2 ưu tiên ý tưởng và từ vựng; Part 3 ưu tiên ý tưởng, từ vựng và cấu trúc.',
        'Phần chào hỏi, hỏi tên, kiểm tra giấy tờ chỉ là khởi động, trả lời đơn giản. Phần tính điểm bắt đầu khi giám khảo bật máy ghi âm và nói "Now, in this first part of the test...".',
        'Cách học: học đúng thứ tự video (bài sau dùng lại công thức bài trước), chép bài giảng vào một quyển vở riêng cho Speaking, highlight cấu trúc hay, ghi chú giải thích ngữ pháp, ôn cuối ngày và cuối tuần, trước bài mới tự đóng vai giám khảo hỏi lại bài cũ.',
        'Kinh nghiệm của cô và một bạn mất gốc (đạt 6.0 sau 9 tháng): ôn theo dạng câu hỏi, ôn theo chủ đề, chép tay bài mẫu, học từ theo cụm (collocation) để không ghép sai, tự hỏi tự trả lời, đọc to bài mẫu mỗi ngày và tra ngay cách phát âm từ chưa biết.'
      ],
      examples: [
        { kind: 'model', text: 'Good afternoon. I\'m fine, thanks. And you?', vi: 'Chào và trả lời "How are you?" đơn giản.' },
        { kind: 'model', text: 'My full name is Nguyen Van An, but you can call me An.', vi: 'Trả lời "What\'s your full name?"' },
        { kind: 'model', text: 'Yes, sure. Here you are.', vi: 'Khi giám khảo hỏi "Can I see your identification, please?"' },
        { kind: 'note', say: false, text: 'Now, in this first part of the test, I\'m going to ask you some questions about yourself. Let\'s talk about... → bắt đầu tính điểm.' }
      ],
      practice: {
        type: 'speak',
        task: 'Tập phần mở đầu phòng thi: nói đuổi các câu mẫu, rồi trả lời các câu hỏi như thật. Phần mở đầu chỉ cần ngắn gọn, tự nhiên.',
        shadow: [
          'Good morning. I\'m great, thanks. And you?',
          'My full name is Tran Thi Mai, but you can call me Mai.',
          'Yes, sure. Here you are.'
        ],
        questions: [
          { part: 1, q: 'How are you today?', vi: 'Hôm nay bạn thế nào?' },
          { part: 1, q: 'What\'s your full name?', vi: 'Họ tên đầy đủ của bạn là gì?' },
          { part: 1, q: 'Can I see your identification, please?', vi: 'Cho tôi xem giấy tờ tuỳ thân của bạn được không?' }
        ]
      }
    },
    {
      id: 'hs02', video: 2, unit: 'Part 1: Nền tảng lý do', minutes: 30,
      title: 'Bảng lý do thích và không thích',
      goal: 'Có sẵn một bảng lý do giải trí, giáo dục, sức khoẻ để giải thích "tại sao" cho hầu hết câu hỏi Speaking.',
      points: [
        'Speaking luôn phải nói "tại sao" để kéo dài câu trả lời. Học một bảng lý do dùng chung cho rất nhiều câu hỏi giúp tiết kiệm thời gian và nhớ từ lâu.',
        'Lý do thích chia 2 nhóm: giải trí (thoải mái, thư giãn) và giáo dục (học được điều gì đó, về tinh thần hoặc thể chất).',
        'Khung câu: It\'s + tính từ (interesting, entertaining, exciting, thrilling, relaxing / educational, useful, practical); rồi triển khai bằng It helps me + V, It\'s a great way to + V, It gives me the chance to + V, I also get the opportunity to + V.',
        'Cụm giải trí: reduce stress, relax, unwind, clear my head, recharge my batteries, express my inner feelings, escape from reality, escape from the hustle and bustle of the city, temporarily forget all the pressures from work/daily life.',
        'Cụm giáo dục: learn various skills such as + danh từ (problem-solving, money management, stress management, teamwork, independent thinking skills) hoặc learn how to + V (deal with difficult situations more effectively, manage my money better, curb stress, work effectively in a team, think more independently); meet people from all walks of life, explore different cultures and traditions, widen my horizons, enrich my knowledge, challenge myself, become more confident and independent, become a better version of myself, become a more well-rounded person, develop my imagination and creativity.',
        'Cụm sức khoẻ: keep fit, stay healthy, keep in shape, improve my health, strengthen my muscles, burn excess calories, maintain a healthy weight, prevent various health problems such as high blood pressure, stroke, heart attack or even cancer.',
        'Lý do không thích: nói ngược lại. It\'s not + tính từ; It\'s + boring/terrible/scary/difficult/stressful/noisy; It makes me + stressed/exhausted/bored/tired; I have to + V (do lots of homework, deal with difficult customers...); It doesn\'t help me + V / It doesn\'t give me the chance to + V (sau doesn\'t bỏ s).',
        'Có hại cho sức khoẻ: unhealthy, not good for my health, harmful to, detrimental to (good đi với for, harmful/detrimental đi với to); ... can lead to various health problems such as...'
      ],
      examples: [
        { kind: 'model', text: 'I think people like gardening because it\'s a great way to relax. Being in nature helps you temporarily forget all the pressures or worries from your daily life.' },
        { kind: 'model', text: 'Yes, because it helps me learn various skills. For example, by reading books about finance and banking, I learn how to manage my money better and set personal financial goals.' },
        { kind: 'model', text: 'Yes, because it\'s a great way to burn excess calories, maintain a healthy weight, and prevent various health problems such as high blood pressure, stroke, heart attack or even cancer.' },
        { kind: 'model', text: 'I don\'t like working overtime because it makes me exhausted.' },
        { kind: 'model', text: 'No, because it doesn\'t give me the chance to challenge myself.' },
        { kind: 'bad', text: 'It doesn\'t gives me the chance to learn new skills.', vi: 'Sau doesn\'t dùng động từ nguyên mẫu: give.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời từng câu trong 2–3 câu: Yes/No + lý do lấy từ bảng (giải trí, giáo dục hoặc sức khoẻ) + giải thích thêm. Mỗi câu thử một khung khác nhau (It helps me / It\'s a great way to / It gives me the chance to / It makes me...).',
        shadow: [
          'It helps me unwind and recharge my batteries.',
          'It\'s a great way to widen my horizons and enrich my knowledge.',
          'It gives me the chance to meet people from all walks of life.',
          'I don\'t like it because I have to deal with the same tasks every day.'
        ],
        questions: [
          { part: 1, q: 'Do you like reading?', vi: 'Bạn có thích đọc sách không?' },
          { part: 1, q: 'Do you like playing sports?', vi: 'Bạn có thích chơi thể thao không?' },
          { part: 1, q: 'Do you like your job or your studies?', vi: 'Bạn có thích công việc hoặc việc học của mình không?' },
          { part: 1, q: 'Why do some people like travelling?', vi: 'Tại sao một số người thích đi du lịch?' }
        ]
      }
    },
    {
      id: 'hs03', video: 3, unit: 'Part 1: Do you like X?', minutes: 20,
      title: 'Dạng câu hỏi Do you like X?',
      goal: 'Trả lời Do you like X? bằng câu mở đầu Yes/No đa dạng cộng lý do từ bảng lý do thích và không thích.',
      points: [
        'Do you like...? là một trong những dạng phổ biến nhất Part 1: Do you like travelling / fast food / music / playing sports / your job?',
        'Bước 1, trả lời Yes: Yes, definitely. / Yes, absolutely. Rồi: I love/enjoy + V-ing (hỏi like thì trả lời bằng love hoặc enjoy), I\'m interested in / keen on + V-ing, I\'m a big fan of + N/V-ing.',
        'Bước 1, trả lời No: No, definitely not. / No, absolutely not. / No, not really. Rồi phủ định: I don\'t like/enjoy..., I\'m not interested in / keen on..., I\'m not a big fan of...',
        'Bước 2, luôn thêm lý do lấy từ bảng lý do thích và không thích: Because / This is because + mệnh đề (có chủ ngữ và động từ); Because of + danh từ hoặc cụm danh từ (because of its harmful effects on my health).',
        'Động từ làm chủ ngữ thì thêm -ing: Listening to music helps me relax. Watching movies is a great way to relax.',
        'Tính từ -ing nói về tính chất của sự vật (This movie is so boring), tính từ -ed nói về cảm xúc của người (It makes me feel bored).',
        'every day (viết tách) là trạng từ: I do it every day; everyday (viết liền) là tính từ: everyday life.'
      ],
      examples: [
        { kind: 'model', text: 'Yes, definitely. I really love travelling because it gives me the chance to meet different people and explore different cultures and traditions. I also get the opportunity to learn various skills such as problem-solving or money management skills.' },
        { kind: 'model', text: 'No, definitely not, because it\'s not good for my health. Consuming too much fast food can lead to various health problems such as diabetes, heart attack, high blood pressure or even cancer.' },
        { kind: 'model', text: 'Yes, absolutely. I\'m a big fan of music. This is because listening to music helps me relax, unwind and temporarily forget all the pressures from my work.' },
        { kind: 'model', text: 'Yes, definitely, because it\'s a great way to keep fit and stay healthy. It also helps me strengthen my muscles, burn excess calories and maintain a healthy weight.' },
        { kind: 'model', text: 'Well, not really, because my job is quite boring. It doesn\'t give me the chance to try anything new. I have to deal with the same tasks and the same clients every day.' },
        { kind: 'bad', text: 'I don\'t like fast food because of it is unhealthy.', vi: 'because of + cụm danh từ: because of its harmful effects on my health; hoặc because it is unhealthy.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời mỗi câu trong 2–3 câu: câu mở đầu Yes/No (không lặp lại like) + lý do bằng because/this is because + giải thích thêm từ bảng lý do.',
        shadow: [
          'Yes, absolutely. I\'m a big fan of music.',
          'No, definitely not, because of its harmful effects on my health.',
          'Watching movies is a great way to relax.'
        ],
        questions: [
          { part: 1, q: 'Do you like music?', vi: 'Bạn có thích âm nhạc không?' },
          { part: 1, q: 'Do you like fast food?', vi: 'Bạn có thích đồ ăn nhanh không?' },
          { part: 1, q: 'Do you like travelling?', vi: 'Bạn có thích đi du lịch không?' },
          { part: 1, q: 'Do you like your job?', vi: 'Bạn có thích công việc của mình không?' }
        ]
      }
    },
    {
      id: 'hs04', video: 4, unit: 'Part 1: Do you like X?', minutes: 17,
      title: 'Chiến thuật Favourite và Hardly ever',
      goal: 'Có phương án dự phòng để kéo dài câu trả lời Yes/No khi không nghĩ ra lý do.',
      points: [
        'Khi gặp Do you like X? mà quên hoặc không áp dụng được lý do trong bảng lý do thích/không thích, dùng 2 chiến thuật dự phòng: Yes → Favourite, No → Hardly ever.',
        'Favourite: My favourite + N + is/are + ... rồi thêm một ví dụ cụ thể trả lời who (với ai), when (khi nào), where (ở đâu), how (như thế nào).',
        'Nói về dự định không chắc chắn thì dùng would thay cho will: I would visit this country one day in the future.',
        'Hardly ever: I hardly ever + V (hiếm khi làm X), rồi I prefer + Y + rather than + X để nói thứ mình thích hơn. Sau prefer và rather than, nếu là động từ thì dùng V-ing.',
        'Tránh lặp lại từ trong câu hỏi: thay business books bằng books about start-ups, entrepreneurship or things like that; thay rock music bằng this kind of music.'
      ],
      examples: [
        { kind: 'model', text: 'Yes, definitely. I love playing sports. My favourite sport is badminton. I usually play badminton with my brother at the weekend at a sports centre near where I live.' },
        { kind: 'model', text: 'Yes, absolutely. My favourite country is South Korea. I would visit this country with my friends one day in the future.' },
        { kind: 'model', text: 'No, not really. I hardly ever read books about start-ups, entrepreneurship or things like that. I prefer novels or literature books rather than business books.' },
        { kind: 'model', text: 'No, not really. I hardly ever listen to this kind of music. I prefer pop and country music rather than rock.' },
        { kind: 'bad', text: 'I prefer read novels rather than read business books.', vi: 'Sau prefer và rather than dùng V-ing: I prefer reading novels rather than reading business books.' }
      ],
      practice: {
        type: 'speak',
        task: 'Câu Yes thì dùng Favourite + ví dụ who/when/where; câu No thì dùng I hardly ever... + I prefer... rather than... Không dùng lý do trong bảng, chỉ dùng 2 chiến thuật này.',
        shadow: [
          'My favourite sport is badminton.',
          'I would visit this country with my friends one day in the future.',
          'I hardly ever listen to this kind of music.',
          'I prefer pop music rather than rock.'
        ],
        questions: [
          { part: 1, q: 'Do you like watching films?', vi: 'Bạn có thích xem phim không?' },
          { part: 1, q: 'Do you like cooking?', vi: 'Bạn có thích nấu ăn không?' },
          { part: 1, q: 'Do you like classical music?', vi: 'Bạn có thích nhạc cổ điển không?' },
          { part: 1, q: 'Do you like playing computer games?', vi: 'Bạn có thích chơi trò chơi điện tử không?' }
        ]
      }
    },
    {
      id: 'hs05', video: 5, unit: 'Part 1: What kind of X?', minutes: 20,
      title: 'Dạng câu hỏi What kind of X do you like most?',
      goal: 'Trả lời câu hỏi "thích loại nào nhất" bằng câu mở đầu dài, tự nhiên rồi thêm lý do từ bảng lý do.',
      points: [
        'Câu hỏi thường gặp: What kinds of books / movies / music do you like most? What kind of food do you like to eat most? What types of clothes do you like to wear most? (types = kinds).',
        'Các bước: nói thẳng loại mình thích nhất → nêu lý do hoặc chi tiết, ví dụ (lấy từ bảng lý do thích: giải trí, giáo dục, sức khoẻ).',
        'Câu ngắn: I like / love / enjoy + X + most. Câu dài hơn để câu trả lời không bị cụt: I love all kinds of X, but if I had to choose one, it would (it\'d) have to be... / I would go for... / I would opt for... (go for = opt for = choose).',
        'try not to + V: cố gắng không làm gì (I try not to eat out too often); try to + V: cố gắng làm gì (They try to achieve a healthy work-life balance); try + V-ing: thử làm gì (You should try using a different shampoo).',
        'food không đếm được khi nói về đồ ăn nói chung (home-cooked food, a lot of food and drink); foods đếm được khi nói về từng loại riêng (I\'m allergic to certain foods).',
        'Cụm về quần áo, dùng lại được ở Part 2: comfortable and easy to wear (thoải mái, dễ mặc), be out of fashion (lỗi mốt), trendy and stylish (hợp mốt, phong cách).'
      ],
      examples: [
        { kind: 'model', text: 'Well, I love to read all kinds of books, but if I had to choose one, I would opt for business books, because by reading business books, I can learn how to deal with difficult situations more effectively, how to work as a team and how to think more independently.' },
        { kind: 'model', text: 'Well, I love all kinds of movies, but if I had to choose one, it\'d have to be adventure movies. This is because they are so interesting and thrilling. Watching adventure films helps me relax and temporarily forget all the pressures from my daily life.' },
        { kind: 'model', text: 'Well, I love all kinds of music, but if I had to choose one, I would opt for country music. This kind of music is very relaxing, which helps me curb stress very effectively.' },
        { kind: 'model', text: 'Well, I love all kinds of food, but if I had to choose one, I would opt for home-cooked food. This is because I think home-cooked food is much healthier than restaurant food. I try not to eat out too often.' },
        { kind: 'model', text: 'I love shorts and T-shirts most because they are comfortable and easy to wear. I wear them whenever I hang out with my friends. I think they will never be out of fashion. They are always trendy and stylish.' },
        { kind: 'bad', text: 'I love all kinds of music, but if I had to choose one, it will have to be pop music.', vi: 'Sau if I had to... dùng would: it would have to be / I would go for.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời mỗi câu: câu mở đầu "I love all kinds of X, but if I had to choose one, it would have to be... / I would opt for..." + lý do từ bảng lý do + 1 chi tiết (khi nào, với ai). Thử dùng câu ngắn I love... most ở 1 câu.',
        shadow: [
          'I love all kinds of music, but if I had to choose one, I would opt for pop music.',
          'Well, I love all kinds of movies, but if I had to choose one, it\'d have to be adventure movies.',
          'I try not to eat out too often.',
          'They are comfortable and easy to wear.'
        ],
        questions: [
          { part: 1, q: 'What kinds of music do you like most?', vi: 'Bạn thích thể loại nhạc nào nhất?' },
          { part: 1, q: 'What kind of food do you like to eat most?', vi: 'Bạn thích ăn loại đồ ăn nào nhất?' },
          { part: 1, q: 'What types of clothes do you like to wear most?', vi: 'Bạn thích mặc loại quần áo nào nhất?' },
          { part: 1, q: 'What kinds of books do you like to read most?', vi: 'Bạn thích đọc thể loại sách nào nhất?' }
        ]
      }
    },
    {
      id: 'hs06', video: 6, unit: 'Part 1: Do you prefer X or Y?', minutes: 22,
      title: 'Dạng câu hỏi Do you prefer X or Y?',
      goal: 'Chọn một phương án, nêu ưu điểm của cái mình thích (và nhược điểm của cái kia) rồi thêm một ví dụ cụ thể.',
      points: [
        'Câu hỏi thường gặp: Do you prefer writing letters or sending emails? / watching movies at home or going to the cinema? / talking on the phone or chatting online? / travelling alone or in a group? / studying in the morning or in the evening?',
        'Bước 1, chọn một phương án: I prefer X. / I prefer X to Y. / I prefer X rather than Y (to và rather than đều là "hơn là"). X, Y là động từ thì dùng V-ing: I prefer sending emails to writing letters.',
        'Bước 2, lý do: nêu ưu điểm của cái mình thích. Câu trả lời còn ngắn thì thêm nhược điểm của cái kia, nối bằng while hoặc whereas: ..., while writing letters is more time-consuming. Cuối cùng thêm một ví dụ thật cụ thể (nhanh hơn bao lâu, tốn bao nhiêu thời gian).',
        'Nói về thời gian: It takes + thời gian (+ for sb) + to V. or so = khoảng (several seconds or so).',
        'Cụm hay: love the feeling of + V-ing; send sth to sb; have someone to + V (have someone to share experiences with, have someone to help you); in case of an emergency (trong trường hợp khẩn cấp); function (v) dùng cho cơ quan, cơ thể hoạt động: my brain functions most effectively...',
        'Tránh lặp từ trong câu hỏi: sending emails → it; in a group → with my friends; alone → on my own; in the morning → from 8 am to 11 am, during that time of day.'
      ],
      examples: [
        { kind: 'model', text: 'I prefer sending emails to writing letters because it\'s much faster, while writing letters is more time-consuming. For example, it can take several days or even weeks for the recipients to receive them, whereas it only takes several seconds or so to receive an email.' },
        { kind: 'model', text: 'I prefer watching films in the cinema to watching films at home because it\'s more interesting. I love the feeling of sitting in a comfortable seat, eating popcorn and drinking cola while enjoying the film.' },
        { kind: 'model', text: 'I prefer chatting online to talking on the phone because it\'s more interesting. You can chat with more than one person at the same time, and you can even send photos, videos or funny icons to the people you are chatting with.' },
        { kind: 'model', text: 'I prefer travelling with my friends to travelling on my own because it\'s more interesting if you have someone to share experiences with during your journey, and it\'s much safer when you have someone to help you in case of an emergency.' },
        { kind: 'model', text: 'I prefer studying in the morning because I feel that my brain functions most effectively from 8 am to 11 am. I remember things better during that time of day.' },
        { kind: 'model', text: 'When nutrients are in short supply, the body cannot function normally.', vi: 'Ví dụ về function (v): cơ thể hoạt động.' },
        { kind: 'bad', text: 'I prefer send emails to write letters.', vi: 'Sau prefer và to (hơn là) dùng V-ing: I prefer sending emails to writing letters.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu: I prefer X to Y / rather than Y (động từ thêm -ing) + ưu điểm của X, while/whereas + nhược điểm của Y + một ví dụ cụ thể. Thay từ trong câu hỏi bằng từ khác (alone → on my own...).',
        shadow: [
          'I prefer sending emails to writing letters because it\'s much faster.',
          'It only takes several seconds or so to receive an email.',
          'I love the feeling of sitting in a comfortable seat while enjoying the film.',
          'It\'s much safer when you have someone to help you in case of an emergency.'
        ],
        questions: [
          { part: 1, q: 'Do you prefer reading books or watching TV?', vi: 'Bạn thích đọc sách hay xem TV hơn?' },
          { part: 1, q: 'Do you prefer eating at home or eating out?', vi: 'Bạn thích ăn ở nhà hay ăn ngoài hơn?' },
          { part: 1, q: 'Do you prefer living in a city or in the countryside?', vi: 'Bạn thích sống ở thành phố hay nông thôn hơn?' },
          { part: 1, q: 'Do you prefer travelling alone or in a group?', vi: 'Bạn thích đi du lịch một mình hay theo nhóm hơn?' }
        ]
      }
    },
    {
      id: 'hs07', video: 7, unit: 'Part 1: Is X popular?', minutes: 26,
      title: 'Dạng câu hỏi Is X popular in your country?',
      goal: 'Trả lời Có, Không hoặc Còn tuỳ, kèm chi tiết về số lượng hoặc chia trường hợp theo người, thể loại, khu vực.',
      points: [
        'Câu hỏi thường gặp: Is football / chocolate popular in your country? Are bikes / foreign language films / zoos popular in your country? Chủ ngữ số ít thì trả lời it\'s, số nhiều thì they are.',
        'Có 3 hướng trả lời: Có + lý do, chi tiết; Không + lý do, chi tiết; Còn tuỳ + chia trường hợp.',
        'Có: Yes, it\'s / they are very popular (in Vietnam). Phổ biến tức là có nhiều, nên chi tiết dùng từ chỉ số lượng lớn: the majority of, most, many, a lot of, a large number of, a large proportion / percentage of, hoặc số cụ thể (60–70%) với account for + %.',
        'Mệnh đề quan hệ rút gọn dạng bị động: movies which are shown every month → movies shown every month (bỏ which và to be, giữ V3).',
        'Không: No, not really. / No, it\'s not really popular. Chi tiết dùng từ chỉ số lượng ít: not many, very few / very little, a small number / proportion / percentage of, 20–30%, nobody / no one / no, hardly ever / rarely.',
        'Còn tuỳ: Well, I think it really depends. / It depends on different types of people. Chia theo tuổi (young people, the younger generation, people aged 20 to 30 / older people, elderly people, the older generation, people aged 65 or over), giới tính (men, males / women, females), thu nhập (the rich, people from privileged social backgrounds / the poor, people from poor family backgrounds), nơi sống (urban dwellers, people living in big / major / large cities / rural dwellers, people living in the countryside, in rural areas).',
        'Với vật, sự việc thì chia theo thể loại (modern / traditional music; fast food, home-cooked food, street food) hoặc theo khu vực (major cities, urban areas / small villages, rural areas; capital cities, coastal cities, mountain towns). Chia thế nào là tuỳ câu hỏi.',
        'Không lặp popular with: Men are much more interested in..., while women prefer..., and older people seem to love... Cụm hay: can see sb + V-ing; commute / travel by + phương tiện; on a daily basis; can\'t stand sth (rất ghét, không chịu nổi).'
      ],
      examples: [
        { kind: 'model', text: 'Yes, they are very popular in Vietnam. I think foreign movies account for about 60 to 70 percent of the total number of movies shown every month.' },
        { kind: 'model', text: 'No, not really. There are not many zoos in Vietnam. There are a few in major cities, but you hardly ever find a zoo in rural areas. My town, for example, doesn\'t have any zoos or wildlife parks or anything like that.' },
        { kind: 'model', text: 'Well, I think it really depends. Men are much more interested in football, while women prefer badminton or jogging, and older people seem to love yoga.', vi: 'jogging = chạy bộ.' },
        { kind: 'model', text: 'I think it depends. Bikes are more popular in rural areas. You can see many rural dwellers commuting by bike on a daily basis, while in major cities like Ho Chi Minh City, the main types of transport are cars and motorbikes.' },
        { kind: 'model', text: 'I think it depends. People who love sweet things usually love chocolate, but those who don\'t like anything sweet, like me for example, can\'t stand the taste of chocolate.' },
        { kind: 'bad', text: 'You can see many rural dwellers commute by bike everyday.', vi: 'can see sb + V-ing: commuting; trạng từ viết tách every day (hoặc on a daily basis).' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu chọn một hướng (Có, Không hoặc Còn tuỳ), cố dùng đủ cả 3 hướng trong bài. Có/Không thì thêm từ chỉ số lượng; Còn tuỳ thì chia ít nhất 2 nhóm người hoặc 2 khu vực, nối bằng while.',
        shadow: [
          'Yes, they are very popular in Vietnam.',
          'There are a few in major cities, but you hardly ever find a zoo in rural areas.',
          'Well, I think it really depends.',
          'You can see many rural dwellers commuting by bike on a daily basis.'
        ],
        questions: [
          { part: 1, q: 'Is tea popular in your country?', vi: 'Trà có phổ biến ở nước bạn không?' },
          { part: 1, q: 'Are pets popular in your country?', vi: 'Nuôi thú cưng có phổ biến ở nước bạn không?' },
          { part: 1, q: 'Is online shopping popular in your country?', vi: 'Mua sắm trực tuyến có phổ biến ở nước bạn không?' },
          { part: 1, q: 'Are museums popular in your country?', vi: 'Bảo tàng có được nhiều người ghé thăm ở nước bạn không?' }
        ]
      }
    },
    {
      id: 'hs08', video: 8, unit: 'Part 1: What is the best time to do X?', minutes: 25,
      title: 'Dạng câu hỏi What is the best time to do X?',
      goal: 'Nói thời điểm tốt nhất kèm lý do, hoặc trả lời Còn tuỳ (tôi thấy thế này, người khác thấy thế kia), biết kéo dài bằng cách so sánh với thời điểm không tốt.',
      points: [
        'Câu hỏi thường gặp: What is the best time of day to study / to work out? What is the best time for rock climbing or mountain biking? What is the best time of year to find a good job in your country? What time of year is best for travelling in your country?',
        'Hướng 1: nói thẳng thời điểm tốt nhất + lý do, chi tiết. Hướng 2: Còn tuỳ: It depends on people\'s preferences / schedules / the type of job you are talking about, rồi chia: For me, for example,... However, some people think...',
        'Cấu trúc: X is the best time for + N/V-ing hoặc to + V; The best time for/to... is... Đổi best để không lặp: the greatest / perfect / ideal time, my favourite time to..., hoặc We should / can do X + thời điểm.',
        'Thêm chi tiết: thủ sẵn vài hoạt động (mountain climbing, camping, fishing, sightseeing); nói rõ tháng: the summer months, which last from April to July (last + thời gian = kéo dài bao lâu); the period from June to August.',
        'Kéo dài câu trả lời: nói thời điểm A tốt nhất rồi so sánh với thời điểm B không tốt: During the rainy season, the ground is very slippery, so it\'s quite dangerous.',
        'find + myself / themselves... + tính từ = thấy bản thân thế nào: I find myself most energetic during this time. make it + adj (for sb) + to V: Technology has made it easier for us to keep in touch with our loved ones. Rút gọn mệnh đề quan hệ chủ động: which makes it safer → making it safer.',
        'Không lặp thời điểm: in the morning → from 8 to 11 am → during this time. Cụm hay: the dramatic increase / significant rise in + the number of (đếm được) / the amount of (không đếm được); all year round (quanh năm); as long as (miễn là); be qualified for the job you\'re applying for.'
      ],
      examples: [
        { kind: 'model', text: 'I think the summer months, which last from April to July, are the greatest time to travel around my country. This is because the weather during these months is hot and sunny, which is very suitable for outdoor activities, such as mountain climbing, camping, fishing or sightseeing.' },
        { kind: 'model', text: 'I think it really depends on people\'s preferences. For me, for example, morning is the ideal time of day to study because I feel that my brain functions most effectively from 8 to 11 am. However, some people think evening is the greatest time to study because they find themselves more focused on their work during this time.' },
        { kind: 'model', text: 'It depends on people\'s schedules and preferences. I feel that evening is the best time to work out because I find myself most energetic during this time. However, some people think early morning is the ideal time to exercise because this is when they find themselves most relaxed. They don\'t have to worry about work or anything like that.' },
        { kind: 'model', text: 'I think the ideal time for rock climbing or mountain biking is the period from June to August. This is because during these months the weather is hot and sunny, making it safer to do these activities. During the rainy season, the ground is very slippery, so it\'s quite dangerous.' },
        { kind: 'model', text: 'It depends on the type of job you are talking about. You can easily find a well-paid job in restaurants, hotels or bars during the summer months because of the dramatic increase in the number of tourists. However, generally speaking, you can find jobs all year round as long as you have the relevant degrees or something to show that you\'re qualified for the job you\'re applying for.' },
        { kind: 'bad', text: 'Evening is the best time to work out because I find me most energetic.', vi: 'find + đại từ phản thân: I find myself most energetic.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời 2 câu theo Hướng 1 (thời điểm + lý do + chi tiết, thêm so sánh với thời điểm không tốt) và 2 câu theo Hướng 2 (It depends on... + For me... However, some people think...). Đổi best thành ideal, greatest, perfect.',
        shadow: [
          'I think the ideal time for camping is the period from June to August.',
          'I find myself most energetic during this time.',
          'It depends on people\'s schedules and preferences.',
          'During the rainy season, the ground is very slippery, so it\'s quite dangerous.'
        ],
        questions: [
          { part: 1, q: 'What is the best time of year to visit your hometown?', vi: 'Thời điểm nào trong năm là tốt nhất để đến thăm quê bạn?' },
          { part: 1, q: 'What is the best time of day to go jogging?', vi: 'Thời điểm nào trong ngày là tốt nhất để chạy bộ?' },
          { part: 1, q: 'What is the best time of day to study?', vi: 'Thời điểm nào trong ngày là tốt nhất để học?' },
          { part: 1, q: 'What is the best time to go shopping?', vi: 'Thời điểm nào là tốt nhất để đi mua sắm?' }
        ]
      }
    },
    {
      id: 'hs09', video: 9, unit: 'Part 1: When was the first/last time?', minutes: 22,
      title: 'Dạng câu hỏi When was the first/last time you did X?',
      goal: 'Nói thời điểm bằng 4 cách (hoặc "không nhớ rõ nhưng đoán là"), rồi kể ngắn chi tiết và cảm nhận.',
      points: [
        'Câu hỏi thường gặp: When was the first time you used a computer? When was the last time you went on holiday? When did you last have visitors at your house? When was the first time you spoke with someone in a foreign language? When was the last time you did something in a hurry?',
        'Các bước: nói rõ thời điểm (năm nào, tháng nào, lúc nào) + lý do hoặc chi tiết (ở đâu, với ai, làm gì, cảm thấy thế nào).',
        '4 cách nói thời điểm: (1) As far as I can remember, the first / last time I did X was + thời gian; (2) I first / last did X when...; (3) It\'s been + khoảng thời gian + since I first / last did X; (4) ngắn nhất: About 10 years ago. / Just a month ago.',
        'Muốn dài hơn nữa: mở đầu bằng I\'m not really sure, but I guess... hoặc I can\'t remember exactly, but I guess... rồi nối với 1 trong 4 cách trên.',
        'Kết bằng cảm nhận: It was an exciting trip, and we had a great time together. / We were all happy and really enjoyed the party. / What a shame! (thật xấu hổ).',
        'Cấu trúc: buy sb sth (They bought me a new bike); spend + time + V-ing, spend + time/money + on + danh từ (The government should spend more money on space projects); come over to + V (đến nhà ai để làm gì); hold a conversation for + thời gian.',
        'on time = đúng giờ, không sớm không trễ; just in time = vừa kịp, ngay trước khi quá muộn.'
      ],
      examples: [
        { kind: 'model', text: 'Well, as far as I can remember, I first used a computer when I was in Grade 9. My dad bought me a desktop computer for my birthday and I was very excited.' },
        { kind: 'model', text: 'Just two months ago, I went to Dalat City with a group of friends. We spent three days there doing lots of activities, such as sightseeing, camping and mountain climbing. It was an exciting trip, and we had a great time together.' },
        { kind: 'model', text: 'Last month, some of my friends came over to celebrate my 26th birthday. We sang, danced, played music and played some games together. We were all happy and really enjoyed the party.' },
        { kind: 'model', text: 'I can\'t remember exactly, but I guess the first time I spoke with a foreigner was when I was in my second year of university. I remember I could only hold the conversation for five minutes, and then I said goodbye because I didn\'t know what else to talk about. What a shame!' },
        { kind: 'model', text: 'This morning, I got up a bit late, and I was afraid that I would be late for the IELTS exam. So I skipped breakfast, ran for a taxi, and fortunately, I was just on time.' },
        { kind: 'bad', text: 'We spent three days there to do lots of activities.', vi: 'spend + time + V-ing: We spent three days there doing lots of activities.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu dùng một cách nói thời điểm khác nhau (có 1 câu mở đầu bằng I can\'t remember exactly, but I guess...), rồi thêm 2 câu chi tiết (ở đâu, với ai, làm gì) và 1 câu cảm nhận.',
        shadow: [
          'As far as I can remember, the first time I used a computer was 10 years ago.',
          'It\'s been 10 years since I first used a computer.',
          'I can\'t remember exactly, but I guess it was when I was in Grade 9.',
          'It was an exciting trip, and we had a great time together.'
        ],
        questions: [
          { part: 1, q: 'When was the last time you watched a film at the cinema?', vi: 'Lần gần nhất bạn xem phim ở rạp là khi nào?' },
          { part: 1, q: 'When was the first time you used a smartphone?', vi: 'Lần đầu bạn dùng điện thoại thông minh là khi nào?' },
          { part: 1, q: 'When did you last visit a museum?', vi: 'Lần gần nhất bạn đến bảo tàng là khi nào?' },
          { part: 1, q: 'When was the last time you did something in a hurry?', vi: 'Lần gần nhất bạn làm việc gì đó vội vã là khi nào?' }
        ]
      }
    },
    {
      id: 'hs10', video: 10, unit: 'Part 1: Did you do X as a child?', minutes: 23,
      title: 'Dạng câu hỏi Did you do X when you were a child?',
      goal: 'Trả lời Có hoặc Không ở thì quá khứ, đổi cách nói "khi còn nhỏ" và thêm chi tiết bằng các cấu trúc find, record, help, encourage.',
      points: [
        'Câu hỏi thường gặp: Did you enjoy doing art lessons when you were a child? Did you often listen to music when you were a child? Did you enjoy singing when you were younger? Did you do household work when you were a child? Did you see your grandparents often when you were a child? (often đọc /ˈɒfn/ hoặc /ˈɒftən/ đều được).',
        'Trả lời Có hoặc Không, cách nào cũng thêm lý do hoặc chi tiết. Ngắn: Yes, I did. / No, I didn\'t. / No, not really. Dài: Yes, I sang a lot when I was a child. Cả câu trả lời dùng quá khứ đơn (told, was, sang).',
        'Đổi cách nói "khi còn nhỏ": when I was a kid, when I was very small / little, when I was three years old, when I was in primary school, hoặc dài: I can\'t remember exactly how old I was, but I was probably about four or five years old.',
        'find sb/sth + tính từ = thấy cái gì thế nào: I found it quite boring; We found the beds very comfortable (khác find myself + tính từ ở bài trước). record sb/sth + V-ing: She recorded me singing. Điểm số: get quite good / high marks in + môn; get quite poor / low marks in + môn.',
        'Nhấn mạnh hành động: did + V nguyên mẫu (I did listen to some children\'s songs; He did love her); ở hiện tại dùng do / does + V (I do love you).',
        'help sb with sth hoặc help sb (to) V; encourage sb to V. Việc nhà: household work = household chores (sweeping the floor, doing the dishes); become more independent and responsible.',
        'Số + danh từ đứng trước danh từ khác thì làm tính từ, không thêm s: a 15-minute walk, a two-week trip, a 10-year-old boy.'
      ],
      examples: [
        { kind: 'model', text: 'Yes, I did. My mom told me that when I was three years old, I sang a lot. She even recorded me singing, and we still have the recording at home.' },
        { kind: 'model', text: 'No, not really. When I was a kid, I was not really interested in art because I found it quite boring. I remember I usually felt sleepy during my art lessons, and I got quite low marks in that subject.' },
        { kind: 'model', text: 'No, I didn\'t. When I was little, I spent most of my time playing with dolls. I did listen to some children\'s songs sometimes, but not too often.' },
        { kind: 'model', text: 'Yes, I did. Sometimes I helped my mom with some household chores, like sweeping the floor or doing the dishes. My mom always encouraged me to do that because she wanted me to become more independent and responsible.' },
        { kind: 'model', text: 'Yes, when I was a kid, we met almost every day, because they lived quite near my house, just a 15-minute walk away. They took very good care of me and they taught me a lot.' },
        { kind: 'bad', text: 'They lived just a 15-minutes walk away.', vi: '15-minute là tính từ nên minute không thêm s: a 15-minute walk.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trả lời ở quá khứ đơn: Yes, I did / No, not really + một cách nói "khi còn nhỏ" khác nhau ở mỗi câu + 1–2 câu chi tiết. Thử dùng find it + tính từ, did + V để nhấn mạnh, và encourage sb to V.',
        shadow: [
          'I can\'t remember exactly how old I was, but I was probably about four or five years old.',
          'I found it quite boring.',
          'I did listen to some children\'s songs sometimes, but not too often.',
          'My mom always encouraged me to do that.'
        ],
        questions: [
          { part: 1, q: 'Did you watch a lot of cartoons when you were a child?', vi: 'Hồi nhỏ bạn có xem nhiều phim hoạt hình không?' },
          { part: 1, q: 'Did you like going to school when you were younger?', vi: 'Hồi nhỏ bạn có thích đi học không?' },
          { part: 1, q: 'Did you play any sports when you were a child?', vi: 'Hồi nhỏ bạn có chơi môn thể thao nào không?' },
          { part: 1, q: 'Did you do household work when you were a child?', vi: 'Hồi nhỏ bạn có làm việc nhà không?' }
        ]
      }
    },
    {
      id: 'hs11', video: 11, unit: 'Part 1: Is X suitable for...?', minutes: 22,
      title: 'Dạng câu hỏi Is X suitable for...?',
      goal: 'Trả lời Có, Không hoặc Còn tuỳ cho câu hỏi "có phù hợp không", đưa 1–2 lý do và chia trường hợp bằng If..., then...',
      points: [
        'Câu hỏi thường gặp: Is your hometown suitable for young people to live in? Are computers suitable for young children? Are outdoor sports / bicycles suitable for people of all ages? Do you think it\'s appropriate for museums to sell things to visitors? (appropriate = suitable).',
        'Có: Yes, I think so. / Yes, it\'s very suitable... / Yes, it would be a great idea... + lý do. Có 2 lý do thì nối bằng Plus, / Moreover, / In addition,',
        'Không: No, I don\'t think so. / No, not really. / No, it\'s not really suitable... / No, I don\'t think it\'s a good idea... + lý do hoặc ví dụ.',
        'Còn tuỳ: Well, I think it depends on what they use computers for. Chia 2 trường hợp: If..., then I would say yes. But if..., then... are not really suitable for them.',
        'Cụm hay: need money for their operation and maintenance; give sb sth as a gift; loved ones = friends and family members; there are not many job opportunities; that\'s the reason why...; in search of a better job (tìm kiếm); easy to use and environmentally friendly; anyone from kids to the elderly.',
        'Cụm về thể thao mạo hiểm: extreme sports such as rock climbing or bungee jumping are not for everyone; those who have undergone appropriate training (đã qua đào tạo bài bản); ensure that = make sure that; physically and mentally strong.',
        'adj + enough + to V = đủ... để làm gì, enough đứng sau tính từ: strong enough to take part in those risky sports; I think he\'s strong enough to lift this bag.'
      ],
      examples: [
        { kind: 'model', text: 'Yes, it would be a great idea because museums need money for their operation and maintenance. Plus, many people want to buy something at the places they visit to give to their loved ones as a gift.' },
        { kind: 'model', text: 'No, I don\'t think so, because there are not many job opportunities in my town. That\'s the reason why many young people leave the town and move to major cities in search of a better job.' },
        { kind: 'model', text: 'Well, I think it depends on what they use computers for. If they use their computers to take online courses or watch educational TV shows, then I would say yes. But if they use computers mainly for recreational activities, like chatting online or playing online games, then computers are not really suitable for them.' },
        { kind: 'model', text: 'Yes, I think so, because they are easy to use and environmentally friendly. Anyone from kids to the elderly can ride a bicycle. It\'s also a great way to relax and to be more active.' },
        { kind: 'model', text: 'No, I don\'t think so. For example, extreme sports such as rock climbing or bungee jumping are not for everyone. They are only suitable for those who have undergone appropriate training to ensure that they are physically and mentally strong enough to take part in those risky sports.' },
        { kind: 'bad', text: 'They are only suitable for people who are enough strong.', vi: 'enough đứng sau tính từ: strong enough (to take part in...).' }
      ],
      practice: {
        type: 'speak',
        task: 'Dùng đủ 3 hướng trong bài: 1 câu Có (2 lý do, nối bằng Plus/Moreover), 1 câu Không (có ví dụ), 1 câu Còn tuỳ (If..., then I would say yes. But if...). Thử dùng adj + enough + to V.',
        shadow: [
          'Yes, it would be a great idea.',
          'That\'s the reason why many young people move to major cities in search of a better job.',
          'Well, I think it depends on what they use computers for.',
          'They are physically and mentally strong enough to take part in those risky sports.'
        ],
        questions: [
          { part: 1, q: 'Are smartphones suitable for young children?', vi: 'Điện thoại thông minh có phù hợp với trẻ nhỏ không?' },
          { part: 1, q: 'Is your city suitable for elderly people to live in?', vi: 'Thành phố của bạn có phù hợp cho người già sống không?' },
          { part: 1, q: 'Do you think it\'s appropriate for students to have part-time jobs?', vi: 'Bạn có nghĩ sinh viên đi làm thêm là phù hợp không?' },
          { part: 1, q: 'Is swimming suitable for people of all ages?', vi: 'Bơi lội có phù hợp với mọi lứa tuổi không?' }
        ]
      }
    },
    {
      id: 'hs12', video: 12, unit: 'Part 1: Is it easy or difficult?', minutes: 20,
      title: 'Dạng câu hỏi Is it easy/difficult to do X?',
      goal: 'Trả lời Dễ, Khó hoặc "Ban đầu khó, lúc sau dễ" (cách cô dùng nhiều nhất), kèm chi tiết hoặc phần khó nhất.',
      points: [
        'Câu hỏi thường gặp: Is it difficult to learn to play a musical instrument? Is it difficult to learn another language? Is it hard to learn to ride a bike? Is it easy to travel around your city? Is it easy to learn to swim? (hard = difficult).',
        'Dễ: It\'s very / quite / really easy (simple) to + V, hoặc It\'s not really difficult (hard, challenging) to + V. Rồi giải thích vì sao dễ, có thể thêm một ý However,...',
        'Khó: It\'s very / quite / really difficult (hard, challenging), hoặc It\'s not really easy (simple) to + V. Triển khai bằng phần khó nhất: I think the hardest part is...',
        'Ban đầu khó, lúc sau dễ (cách cô thích nhất vì dễ kéo dài và khoe được từ vựng): It\'s always quite difficult at the beginning when you try something new. X is not an exception. At first, + khó khăn..., but after a while, things begin to get a bit easier.',
        'Cụm hay: catch a bus, take a taxi or hire a motorbike to get around the city (get around = travel around); the traffic gets crazy during rush hour; be afraid of water; breathe underwater; memorise new words, sentence structures and grammatical points; pronunciation is the hardest part for beginners; fall off your bike; your fingers can hurt a lot.',
        'Tốn thời gian: It takes + thời gian + for sb/sth + to V (It took three months for the project to be completed); It takes + sb + thời gian + to V (It took us three hours to get there). Lấy làm ví dụ: Take... as an example (Take Hoi An as an example) hoặc For example,...'
      ],
      examples: [
        { kind: 'model', text: 'Yes, it\'s very easy to travel around Ho Chi Minh City. You can catch a bus, take a taxi or hire a motorbike to get around the city. However, the traffic is not always good. It gets crazy during rush hour.' },
        { kind: 'model', text: 'No, it\'s very difficult, especially for people who are afraid of water like me. I think the hardest part is learning to breathe underwater, which took me nearly two weeks.' },
        { kind: 'model', text: 'I think it\'s always quite difficult at the beginning when you try something new. Learning to play a musical instrument is not an exception. Take learning to play the guitar as an example. At first, your fingers can hurt a lot, but after a while, things begin to get a bit easier.' },
        { kind: 'model', text: 'Yes, it\'s quite difficult because you have to memorise new words, sentence structures, grammatical points and so on. I think pronunciation is the hardest part for beginners who want to learn a foreign language.' },
        { kind: 'model', text: 'It\'s always quite difficult at the beginning when you try something new. Learning to ride a bike is not an exception. At first, you can fall off your bike several times, but after a while, things begin to get a bit easier.' },
        { kind: 'bad', text: 'It took for me three hours to get there.', vi: 'It took me three hours to get there (hoặc It took three hours for me to get there).' }
      ],
      practice: {
        type: 'speak',
        task: 'Dùng cả 3 cách: 1 câu Dễ (+ chi tiết, thêm However...), 1 câu Khó (+ I think the hardest part is...), và ít nhất 1 câu "It\'s always quite difficult at the beginning... X is not an exception. At first..., but after a while...".',
        shadow: [
          'It\'s always quite difficult at the beginning when you try something new.',
          'Learning to cook is not an exception.',
          'At first, things can be quite hard, but after a while, things begin to get a bit easier.',
          'I think the hardest part is learning to breathe underwater.'
        ],
        questions: [
          { part: 1, q: 'Is it difficult to learn to cook?', vi: 'Học nấu ăn có khó không?' },
          { part: 1, q: 'Is it easy to find a job in your city?', vi: 'Tìm việc ở thành phố của bạn có dễ không?' },
          { part: 1, q: 'Is it hard to learn to drive a car?', vi: 'Học lái ô tô có khó không?' },
          { part: 1, q: 'Is it easy to make new friends?', vi: 'Kết bạn mới có dễ không?' }
        ]
      }
    },
    {
      id: 'hs13', video: 13, unit: 'Part 1: What do you dislike about X?', minutes: 20,
      title: 'Dạng câu hỏi What do you dislike about X?',
      goal: 'Nói điều mình không thích bằng 3 cách: nói thẳng, nói vòng (thích nói chung nhưng...), hoặc liệt kê vài điều.',
      points: [
        'Câu hỏi thường gặp: What do you dislike about parties? What don\'t you like about your job? (What don\'t you like = What do you dislike) What do you dislike about eating in restaurants / living in a big city? What don\'t you like about listening to live music?',
        'Cách 1, nói thẳng: I don\'t really like / love... + lý do, chi tiết. Ngắn gọn nhất.',
        'Cách 2, nói vòng (cô thích nhất vì kéo dài được): Well, generally speaking, I love X, but sometimes... hoặc Well, generally speaking, I love X, but the only thing I don\'t really like about X is (that)...',
        'Cách 3, liệt kê: Well, there are a few things that I don\'t really love about X. First, / Firstly, / The first thing is... Second, / The second thing is... Finally,...',
        'Kết gọn ý: ..., but apart from that, I\'m fine (ngoài điều đó ra thì tôi ổn). Khó, dễ cho ai: It\'s hard / difficult / easy (for sb) to + V: It\'s really hard for me to calculate my spending at the end of the month.',
        'Cụm hay: loud music, too much drinking, get drunk, behave weirdly; they don\'t take cards (không nhận thanh toán thẻ), pay in cash, pay by card; work overtime, exhausted; the air is seriously polluted; put on a face mask; get stuck in traffic jams; on the way to and from work; the crowd shout and even scream.'
      ],
      examples: [
        { kind: 'model', text: 'Well, I don\'t really like going to parties where there\'s loud music and too much drinking. People talk a lot and even behave weirdly when they get drunk.' },
        { kind: 'model', text: 'Generally speaking, I love eating in restaurants. The only thing that I don\'t like about some restaurants here is that they don\'t take cards. It means that I have to pay in cash, and it\'s really hard for me to calculate my spending at the end of the month.' },
        { kind: 'model', text: 'I love my job, but sometimes it\'s really stressful. Sometimes, I have to work overtime, which makes me really exhausted, but apart from that, I\'m fine.' },
        { kind: 'model', text: 'Well, there are a few things that I don\'t really love about living in a large city. First, the air is seriously polluted, and I always have to put on a face mask whenever I go out. The second thing is the traffic. I often have to spend at least an hour getting stuck in traffic jams on the way to and from work.' },
        { kind: 'model', text: 'Well, generally speaking, I love live music, but the only thing I don\'t really like about some live music concerts is that they are too noisy, and the crowd often shout and even scream. I can\'t really enjoy the music.' },
        { kind: 'bad', text: 'It\'s really hard to me to calculate my spending.', vi: 'Khó cho ai làm gì: It\'s really hard for me to...' }
      ],
      practice: {
        type: 'speak',
        task: 'Dùng mỗi cách ít nhất 1 lần: nói thẳng (I don\'t really like...), nói vòng (Generally speaking, I love X, but the only thing I don\'t really like... is that...), và liệt kê (There are a few things... First... The second thing is...).',
        shadow: [
          'Well, generally speaking, I love my hometown, but sometimes it\'s a bit boring.',
          'The only thing I don\'t really like about it is that it\'s too noisy.',
          'Well, there are a few things that I don\'t really love about living in a large city.',
          'But apart from that, I\'m fine.'
        ],
        questions: [
          { part: 1, q: 'What do you dislike about your hometown?', vi: 'Bạn không thích điều gì ở quê mình?' },
          { part: 1, q: 'What don\'t you like about public transport in your city?', vi: 'Bạn không thích điều gì ở giao thông công cộng trong thành phố của bạn?' },
          { part: 1, q: 'What do you dislike about shopping in supermarkets?', vi: 'Bạn không thích điều gì khi mua sắm ở siêu thị?' },
          { part: 1, q: 'What don\'t you like about social media?', vi: 'Bạn không thích điều gì ở mạng xã hội?' }
        ]
      }
    },
    {
      id: 'hs14', video: 14, unit: 'Part 1: How often do you do X?', minutes: 22,
      title: 'Dạng câu hỏi How often do you do X?',
      goal: 'Nói mức độ thường xuyên bằng đúng từ chỉ tần suất, rồi thêm chi tiết khi nào, với ai, làm gì.',
      points: [
        'Câu hỏi thường gặp: How often do you go out with friends? / watch programmes or read articles about wild animals? / buy new clothes for yourself? / sing now? / make telephone calls?',
        'Công thức: mức độ thường xuyên + lý do, chi tiết (khi nào, với ai, làm gì). Bắt buộc có từ chỉ tần suất, và nên nói khác câu hỏi: thay "I make telephone calls every day" bằng "I have to call my clients every day to...".',
        'Rất thường xuyên: always, all the time, every day, almost every day, five days a week, very often / very frequently, a lot. Thường xuyên: usually, often, regularly, frequently, quite often, 2 or 3 times a week.',
        'Thỉnh thoảng: sometimes, occasionally, once or twice a week, not often, don\'t usually, every two months, every now and then, once in a while. Hiếm khi: rarely, seldom, hardly ever, almost never, once in a blue moon. Không bao giờ: never. Thứ tự giảm dần: always → usually / normally → often → sometimes → occasionally → hardly ever → never.',
        'none of làm chủ ngữ: văn trang trọng dùng động từ số ít (None of these pens works), văn nói thường dùng số nhiều (none of us have to work).',
        'call (động từ) + người, không có giới từ: My brother called me from Spain; call (danh từ): make a call to sb. contact (động từ) + người: I\'ve been trying to contact you all day; contact (danh từ): have contact with, keep in contact with sb.',
        'too + tính từ / trạng từ + to V = quá... nên không...: I\'m too shy to sing; He is too weak to lift the bag (too đã mang nghĩa phủ định).',
        'Cụm hay: go out for dinner, go to see a movie; wildlife and their habitats; prey and predators; documentaries; I\'m not a big fan of shopping; clothes that feel comfortable.'
      ],
      examples: [
        { kind: 'model', text: 'We just meet once a week at the weekend when none of us have to work. We usually go out for dinner or go to see a movie.' },
        { kind: 'model', text: 'I have to call my clients every day to confirm the products they ordered. I also call my parents very often, I\'d say every two days, because I miss them so much.' },
        { kind: 'model', text: 'Well, I love watching programmes about wildlife and their habitats, so I often watch programmes like Planet Earth or ones about prey and predators. But I hardly ever read articles about wildlife because it\'s much more interesting to watch documentaries than to read articles.' },
        { kind: 'model', text: 'I\'m not a big fan of shopping, so I think I buy new clothes every two or three months. I usually buy clothes that feel comfortable, like jeans or T-shirts.' },
        { kind: 'model', text: 'Well, when I\'m alone, I sing a lot. It helps me relax and temporarily forget all the worries that I have at the time. But when I\'m with friends or other people, I\'m too shy to sing.' },
        { kind: 'bad', text: 'I call to my parents every two days.', vi: 'call (động từ) + người, không có to: I call my parents...; hoặc I make a call to my parents.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu dùng một từ chỉ tần suất khác nhau (every two days, once in a while, hardly ever...) + 1–2 câu chi tiết. Có 1 câu dùng too... to... và 1 câu dùng call/contact đúng cách.',
        shadow: [
          'We just meet once a week at the weekend when none of us have to work.',
          'I\'d say every two days.',
          'I hardly ever read articles about wildlife.',
          'When I\'m with friends or other people, I\'m too shy to sing.'
        ],
        questions: [
          { part: 1, q: 'How often do you use public transport?', vi: 'Bạn có thường đi phương tiện công cộng không?' },
          { part: 1, q: 'How often do you cook at home?', vi: 'Bạn có thường nấu ăn ở nhà không?' },
          { part: 1, q: 'How often do you read books?', vi: 'Bạn có thường đọc sách không?' },
          { part: 1, q: 'How often do you visit your relatives?', vi: 'Bạn có thường đi thăm họ hàng không?' }
        ]
      }
    },
    {
      id: 'hs15', video: 15, unit: 'Part 1: How has X changed?', minutes: 26,
      title: 'Dạng câu hỏi How has X changed?',
      goal: 'Nói X thay đổi nhiều hay ít, so sánh quá khứ với hiện tại bằng đúng thì (quá khứ đơn, hiện tại, hiện tại hoàn thành).',
      points: [
        'Câu hỏi thường gặp: How has your hometown changed in recent years? How has education changed in the past 10 years? How have shops changed in your town in the last five years? How have TV shows in your country changed over the years? In what ways have families in your country changed in recent years? (In what ways = How).',
        'Thay đổi nhiều: (I have to say that) it has changed a lot / a great deal / quite a bit / significantly. Rồi nói quá khứ thế nào, bây giờ thế nào.',
        'Thay đổi ít: It hasn\'t changed much. / It has changed very slightly. Rồi: The only change is that...',
        'Thì đi theo mốc thời gian: in the past, several years ago, ten years ago, a decade / a few decades ago, not so long ago → quá khứ đơn; now, today, these days, nowadays → hiện tại đơn hoặc tiếp diễn; recently, in recent years → hiện tại hoàn thành (have/has + V3). Bị động hiện tại hoàn thành: have/has been + V3 (have been constructed).',
        'Hiện tại hoàn thành dùng cho việc đã bắt đầu trong quá khứ, vẫn còn ở hiện tại và có thể tiếp tục. Đổi "in recent years" để không lặp: in recent times, over the past few years / decades, since I was a child.',
        'So sánh bằng: as + tính từ / trạng từ + as; không bằng: not as... as (e-learning was not as popular as it is now). access (động từ) + sth; danh từ: have access to sth. an increasing number of = more and more (học thuật hơn).',
        'Cụm hay: the main streets have become much wider; high-rise buildings = tall buildings; small and family-run shops; take card payments; dominate our television screens; globalisation and the influence of Western cultures; three or four generations lived under the same roof; nuclear and single-parent families; take on the role of the family breadwinner; take on childcare responsibilities.'
      ],
      examples: [
        { kind: 'model', text: 'I have to say that it has changed a great deal. A few decades ago, the main streets were very narrow, and there were not many tall buildings. But recently, the main streets have become much wider, and lots of shopping malls and high-rise buildings have been constructed.' },
        { kind: 'model', text: 'They haven\'t changed much. Most of them are still quite small and family-run. The only change is that several years ago, they didn\'t take credit or debit card payments, so I had to pay in cash. But recently, some shops have started taking card payments.' },
        { kind: 'model', text: 'I think education has changed quite a lot over the past 10 years. A decade ago, students studied mainly through textbooks, and they had to go to class because e-learning was not as popular as it is now. In recent years, an increasing number of students have decided to take online courses instead of attending traditional classes. It\'s much easier for them to access online materials to serve their learning needs.' },
        { kind: 'model', text: 'Well, they have changed a lot. In the past, TV shows were mostly locally produced. There were not many international TV programmes. But in recent years, international TV shows and movies have dominated our television screens. I think this is because of globalisation and the influence of Western cultures.' },
        { kind: 'model', text: 'Well, families have changed a great deal over the past few decades. In the past, normally three or four generations lived under the same roof. But now, nuclear and single-parent families are becoming more popular.' },
        { kind: 'model', text: 'In the past, fathers traditionally took on the role of the family breadwinner, while mothers stayed at home and took on childcare responsibilities. But now, more men are deciding to stay at home and take care of their children, while their wives go to work.', vi: 'Cách khác: nói về vai trò trong gia đình.' },
        { kind: 'bad', text: 'Recently, the main streets became much wider.', vi: 'recently / in recent years đi với hiện tại hoàn thành: have become.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu: nói thay đổi nhiều hay ít + 1 câu quá khứ (A decade ago... / In the past...) ở quá khứ đơn + 1 câu hiện tại (But recently... / But now...) ở hiện tại hoàn thành hoặc hiện tại tiếp diễn.',
        shadow: [
          'I have to say that it has changed a great deal.',
          'A few decades ago, there were not many tall buildings.',
          'But recently, lots of high-rise buildings have been constructed.',
          'E-learning was not as popular as it is now.'
        ],
        questions: [
          { part: 1, q: 'How has your city changed in recent years?', vi: 'Thành phố của bạn đã thay đổi thế nào trong những năm gần đây?' },
          { part: 1, q: 'How has transport in your city changed over the past few years?', vi: 'Giao thông ở thành phố bạn đã thay đổi thế nào vài năm qua?' },
          { part: 1, q: 'How has the way people shop changed in recent years?', vi: 'Cách mọi người mua sắm đã thay đổi thế nào gần đây?' },
          { part: 1, q: 'In what ways have families in your country changed in recent years?', vi: 'Gia đình ở nước bạn đã thay đổi theo những cách nào gần đây?' }
        ]
      }
    },
    {
      id: 'hs16', video: 16, unit: 'Part 2: Describe a person', minutes: 31,
      title: 'Part 2: Tả người, khung 5 phần (bài mẫu: ông của tôi)',
      goal: 'Nói đủ 2 phút cho mọi đề tả người bằng khung 5 phần: mở đầu, thông tin cơ bản, cốt lõi (tính cách), cảm nhận, kết.',
      points: [
        'Part 2: nhận cue card có đề "Describe..." và phần You should say với 2–4 gợi ý (bullet points), được 1 phút chuẩn bị rồi nói khoảng 2 phút. Cô chia Part 2 thành 7 chủ đề chính; bài này là tả người (người chăm sóc bạn khi nhỏ, người nổi tiếng muốn gặp, một giáo viên...).',
        'Thay vì nói theo từng gợi ý, dùng khung 5 phần cho mọi đề tả người (nói được 1 phút 40 giây đến 2 phút, đổi đề vẫn dùng được): (1) Mở đầu, (2) Thông tin cơ bản, (3) Cốt lõi, (4) Cảm nhận, (5) Kết. Phần cốt lõi thường dài nhất (1 phút đến 1 phút 30).',
        'Mở đầu: I\'m going to talk about + người + paraphrase đề (looked after → took very good care of; as a child → when I was little). Tên riêng hoặc người cụ thể cả hai bên đều hiểu (my grandpa) thì có dấu phẩy trước who.',
        'Thông tin cơ bản (không cần nói hết): tên (His name\'s...), tuổi (He\'s 70 years old now), nghề (She\'s a doctor / He retired from the bank five years ago), sống ở đâu, với ai (He lives with my parents in Dong Nai province), sở thích (He likes... in his spare time).',
        'Mẹo kéo dài thông tin cơ bản: tên tiếng Anh + tên tiếng Việt; tuổi bây giờ + sinh nhật tháng sau (but he\'ll turn 71 next month); thêm kinh nghiệm (She has over 30 years\' teaching experience); xưa và nay (He used to live..., but now he lives... / but he moved to... several years ago).',
        'Cốt lõi là tính cách: chọn 2–3 tính cách dùng được cho mọi kiểu người (knowledgeable, caring, kind and generous). Cách nói: He/She is very / so / really + tính từ, hoặc He/She is a very + tính từ + person. Mỗi tính cách triển khai bằng chi tiết, giải thích hoặc 1 câu chuyện; đánh dấu bằng First, / Second, / Finally,',
        'Thủ sẵn 1 câu truyền cảm hứng đơn giản (Never give up. / Keep trying.) và cụm: during his younger years, encounter (= face) various problems / challenges, pass on to, put your heart into, be busy with work, naughty, engage in (= take part in) voluntary activities, local environmental campaigns, community service projects.',
        'Cảm nhận: yêu, nhớ, ngưỡng mộ, muốn gặp trong tương lai, muốn thăm thường xuyên hơn: Although I\'m quite busy with work now, I still manage to go back home to visit him every two months (manage to V = sắp xếp làm được). Kết 1 câu: So, if I had to talk about + đề (vội thì lấy lại nguyên đề), it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about my grandpa, who took very good care of me when I was little.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'He\'s 75 years old now, and he lives with my parents in Dong Nai province, which is not far from here.', vi: 'Thông tin cơ bản.' },
        { kind: 'model', text: 'First, he\'s a very knowledgeable person. He travelled a lot during his younger years. I know he has encountered various problems, so he has lots of valuable experience and life lessons to pass on to his children and grandchildren.', vi: 'Cốt lõi, tính cách 1: chi tiết, giải thích.' },
        { kind: 'model', text: 'I remember when I first started learning to ride a bike, I fell off my bike several times. Every time I fell, I just wanted to give up, but he told me, "No matter how hard a situation is, never give up. If you fail, that\'s okay! If you put your heart into whatever you\'re doing, you can do anything." What he said is so inspirational and means so much to me.', vi: 'Cốt lõi, tính cách 1: kể câu chuyện.' },
        { kind: 'model', text: 'Second, he\'s a caring person. When I was a kid, my parents were very busy with work, so I stayed at home with grandpa most of the time. My grandpa told me that when I was small, I was very naughty. If I wanted something, I cried for hours until I got it. I know he loves me very much because he often gave me what I wanted without telling my parents about it.', vi: 'Cốt lõi, tính cách 2.' },
        { kind: 'model', text: 'Finally, he\'s very kind and generous. He spends lots of time engaging in voluntary activities such as local environmental campaigns or other community service projects.', vi: 'Cốt lõi, tính cách 3.' },
        { kind: 'model', text: 'Although I\'m quite busy with work now, I still manage to go back home to visit him every two months. I miss him so much, and I know he misses me, too.', vi: 'Cảm nhận.' },
        { kind: 'model', text: 'So, if I had to talk about a person who looked after me when I was a kid, it would have to be my grandpa.', vi: 'Kết.' },
        { kind: 'model', text: 'His name\'s Mike. Actually, Mike is his English name. His Vietnamese name is Minh, but I\'ll use Mike because I know he likes that. He\'s 70 years old now, but he\'ll turn 71 next month, and I\'ll definitely come home and celebrate his birthday.', vi: 'Mẹo kéo dài phần thông tin cơ bản (tên, tuổi).' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút: ghi từ khoá cho 5 phần. Rồi nói khoảng 2 phút: mở đầu (paraphrase đề), thông tin cơ bản (dùng 1–2 mẹo kéo dài), 2–3 tính cách (mỗi tính cách có chi tiết hoặc 1 câu chuyện), cảm nhận, câu kết So, if I had to talk about..., it would have to be...',
        shadow: [
          'I\'m going to talk about my grandpa, who took very good care of me when I was little.',
          'He\'s 70 years old now, but he\'ll turn 71 next month.',
          'First, he\'s a very knowledgeable person.',
          'So, if I had to talk about a person who looked after me when I was a kid, it would have to be my grandpa.'
        ],
        questions: [
          { part: 2, q: 'Describe a person who looked after you as a child.', vi: 'Hãy tả một người đã chăm sóc bạn khi bạn còn nhỏ.', bullets: ['who this person is', 'what he or she is like', 'how he or she looked after you', 'and explain how you feel about this person'] },
          { part: 2, q: 'Describe a family member you admire.', vi: 'Hãy tả một người trong gia đình mà bạn ngưỡng mộ.', bullets: ['who the person is', 'what he or she is like', 'what he or she has done', 'and explain why you admire him or her'] },
          { part: 2, q: 'Describe a friend who is important to you.', vi: 'Hãy tả một người bạn quan trọng với bạn.', bullets: ['who this friend is', 'how you met', 'what he or she is like', 'and explain why this friend is important to you'] }
        ]
      }
    },
    {
      id: 'hs17', video: 17, unit: 'Part 2: Describe a person', minutes: 23,
      title: 'Part 2: Tả người nổi tiếng bạn muốn gặp (Emma Watson)',
      goal: 'Áp khung 5 phần cho đề người nổi tiếng, học thêm 3 nhóm tính cách: mạnh mẽ và truyền cảm hứng, tốt bụng và hào phóng, có khiếu hài hước.',
      points: [
        'Đề: Describe a famous person you\'d like to meet. Dùng lại khung 5 phần: mở đầu, thông tin cơ bản, cốt lõi (tính cách), cảm nhận, kết.',
        'Mở đầu: I\'m going to talk about Emma Watson, who I\'ve always wanted to meet (would like → have always wanted to; tên riêng nên có dấu phẩy trước who).',
        'Thông tin cơ bản chỉ chọn vài ý (tên đã nói thì bỏ), ví dụ nghề: She\'s a successful actress and also an activist who takes part in many campaigns about gender equality (bình đẳng giới, cũng hay gặp trong Writing). Phần này ngắn để dành thời gian cho tính cách.',
        'Mạnh mẽ, tự lập, truyền cảm hứng (strong, independent and inspiring). Mô típ dùng cho mọi người mạnh mẽ: be willing to stand up for anything that he/she thinks is right (sẵn sàng đứng lên vì điều mình cho là đúng). Thêm: be inspired by + N; What I\'ve learned from her is that...; as long as (miễn là); be passionate about = have a passion for; put their heart into. Có thể thêm 1 câu nói nổi tiếng (inspirational quote) của người đó; không nhớ thì bỏ.',
        'Tốt bụng, hào phóng (kind and generous): mô típ dành thời gian cho từ thiện, tình nguyện: Although she\'s super busy with her work, she manages to spend time engaging in lots of charity work (charity work = từ thiện; voluntary work = tình nguyện) + 1 ví dụ cụ thể.',
        'funny là từ đơn giản, nên thay bằng has a good sense of humour (có khiếu hài hước); mô típ: she\'s very good at making people laugh (be good at + danh từ / V-ing).',
        'Cảm nhận: I really admire Emma and want to meet her one day in the future. Kết: So, if I had to talk about a celebrity I\'d love to meet, it would have to be... (celebrity = famous person, cũng là một chủ đề lớn ở Part 3).'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about Emma Watson, who I\'ve always wanted to meet. She\'s a successful actress and also an activist who takes part in many campaigns about gender equality.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'First, she\'s a very strong, independent and inspiring woman. I was really inspired by the speech she gave at the UN about gender equality and women\'s empowerment. I feel that Emma is willing to stand up for anything that she thinks is right.', vi: 'Tính cách 1.' },
        { kind: 'model', text: 'I\'ve learned a lot from her and from the characters that she\'s played in her movies. What I\'ve learned from her is that women can do anything they want as long as they are passionate about it and put their heart into what they\'re doing. I still remember one of her inspirational quotes: "I don\'t want other people to decide who I am. I want to decide that for myself."', vi: 'Tính cách 1: điều học được và câu nói truyền cảm hứng.' },
        { kind: 'model', text: 'Second, she is very kind and generous. Although she\'s super busy with her work, she manages to spend time engaging in lots of charity work. For example, a few years ago, Emma donated $1 million to help support victims of sexual harassment.', vi: 'Tính cách 2.' },
        { kind: 'model', text: 'Finally, she has a good sense of humour. I\'ve watched many of her interviews and talk shows on YouTube, and I have to say that she\'s very good at making people laugh.', vi: 'Tính cách 3.' },
        { kind: 'model', text: 'I really admire Emma and want to meet her one day in the future. So, if I had to talk about a celebrity I\'d love to meet, it would have to be Emma Watson.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'She is very good at make people laugh.', vi: 'be good at + V-ing: good at making people laugh.' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút rồi nói khoảng 2 phút theo khung 5 phần. Phần cốt lõi chọn 2–3 tính cách trong các bài đã học (knowledgeable, caring, kind and generous, strong and inspiring, a good sense of humour), mỗi tính cách có 1 chi tiết hoặc ví dụ.',
        shadow: [
          'I\'m going to talk about Emma Watson, who I\'ve always wanted to meet.',
          'I feel that she is willing to stand up for anything that she thinks is right.',
          'She has a good sense of humour.',
          'So, if I had to talk about a celebrity I\'d love to meet, it would have to be Emma Watson.'
        ],
        questions: [
          { part: 2, q: 'Describe a famous person you would like to meet.', vi: 'Hãy tả một người nổi tiếng bạn muốn gặp.', bullets: ['who this person is', 'what he or she is famous for', 'what he or she is like', 'and explain why you would like to meet him or her'] },
          { part: 2, q: 'Describe a successful person you know or have heard about.', vi: 'Hãy tả một người thành công mà bạn biết hoặc từng nghe nói tới.', bullets: ['who this person is', 'what he or she does', 'how he or she became successful', 'and explain how you feel about this person'] },
          { part: 2, q: 'Describe a person who has a good sense of humour.', vi: 'Hãy tả một người có khiếu hài hước.', bullets: ['who this person is', 'how you know him or her', 'what he or she does to make people laugh', 'and explain how you feel when you are with this person'] }
        ]
      }
    },
    {
      id: 'hs18', video: 18, unit: 'Part 2: Describe a person', minutes: 25,
      title: 'Part 2: Tả một giáo viên bạn biết (thầy Vinh)',
      goal: 'Áp khung 5 phần cho đề giáo viên và học thêm cách nói về phương pháp dạy, khả năng giải thích, sự truyền cảm hứng.',
      points: [
        'Đề: Describe a teacher you know. Dùng lại khung 5 phần: mở đầu, thông tin cơ bản, cốt lõi (tính cách), cảm nhận, kết.',
        'Mở đầu: I\'m going to talk about Mr Vinh, who was one of the greatest teachers I\'ve ever had (paraphrase "a teacher you know"; tên riêng nên có dấu phẩy trước who).',
        'Thông tin cơ bản: tên đã nói thì bỏ; nói dạy môn gì, dạy khi nào, và dùng mẹo kéo dài nơi sống: từng sống ở đâu, giờ chuyển đi đâu (He used to live near my house but his family moved to the US several years ago).',
        'Cách nói mới về điểm nổi bật: I was / I\'m really impressed by his/her + danh từ (ấn tượng bởi), ví dụ his unique way of teaching English. Kể về thầy cô thời đi học thì dùng quá khứ đơn.',
        'Cụm hay: force somebody to do something (ép ai làm gì); memorise long lists of new words (học thuộc); instead (thay vào đó); attach A to B (gắn A với B); find it hard to do something (thấy khó khi làm gì).',
        'Thêm 2 cách nói khả năng: be good at + danh từ / V-ing; be able to + V nguyên mẫu: He\'s able to explain something complicated in a much simpler way. Sau đó luôn có ví dụ cụ thể.',
        'Truyền cảm hứng (inspiring): give somebody the motivation to do something, by telling us motivational stories of famous people who have failed thousands of times before accomplishing their goals. Có thể thêm một câu nói truyền cảm hứng; không có thật thì có thể tự nghĩ ra câu đơn giản (Keep trying, don\'t give up).',
        'Quan trọng nhất là linh hoạt: các tính cách đã học ở 3 bài Describe a person (knowledgeable, kind and generous, inspiring...) đều dùng lại được cho người khác. Ghi chúng vào vở theo dạng tính cách → ý triển khai.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about Mr Vinh, who was one of the greatest teachers I\'ve ever had. He was my English teacher in secondary school. He used to live near my house, but his family moved to the US several years ago.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'First, I was really impressed by his unique way of teaching English. He didn\'t force us to memorise long lists of new words or grammatical points. Instead, he told us stories and attached each word to an image, so we could remember that word more easily.', vi: 'Điểm nổi bật 1: phương pháp dạy.' },
        { kind: 'model', text: 'Second, he\'s able to explain something complicated in a much simpler way. I remember that lots of my friends in other classes found it hard to memorise the usage of 12 basic tenses in English. But in my class, it was not really difficult to do that because Mr Vinh explained it very clearly and in the simplest way.', vi: 'Điểm nổi bật 2: giải thích đơn giản.' },
        { kind: 'model', text: 'Third, he\'s so inspiring. He gave us the motivation to learn English, to try harder and to not give up by telling us motivational stories of famous people who have failed thousands of times before accomplishing their goals. I still remember one of his inspirational quotes: "If you don\'t believe in yourself, how can you expect others to believe in you?"', vi: 'Điểm nổi bật 3: truyền cảm hứng.' },
        { kind: 'model', text: 'I haven\'t met him since I finished secondary school. I really hope to see him again one day. So, if I had to talk about one of my favourite teachers, it would have to be Mr Vinh.', vi: 'Cảm nhận và kết.' },
        { kind: 'note', say: false, text: 'Knowledgeable → travel a lot + encounter lots of challenges → have lots of experience, life lessons\nKind & generous → spend lots of time engaging in charity work (e.g. environmental campaigns)', vi: 'Cách ghi vở: tính cách → ý triển khai.' },
        { kind: 'bad', text: 'He attached each word with an image.', vi: 'attach A to B: attached each word to an image.' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút rồi nói khoảng 2 phút theo khung 5 phần về một thầy cô của bạn. Phần cốt lõi dùng ít nhất 2 trong 3 cách nói mới: I was really impressed by his/her..., He/She is able to..., He/She gave us the motivation to..., mỗi ý có một ví dụ cụ thể.',
        shadow: [
          'I\'m going to talk about Mr Vinh, who was one of the greatest teachers I\'ve ever had.',
          'I was really impressed by his unique way of teaching English.',
          'He\'s able to explain something complicated in a much simpler way.',
          'He gave us the motivation to learn English, to try harder and to not give up.',
          'So, if I had to talk about one of my favourite teachers, it would have to be Mr Vinh.'
        ],
        questions: [
          { part: 2, q: 'Describe a teacher you know.', vi: 'Hãy tả một giáo viên mà bạn biết.', bullets: ['who this teacher is', 'what subject he or she teaches', 'what he or she is like', 'and explain how you feel about this teacher'] },
          { part: 2, q: 'Describe a teacher who has greatly influenced you.', vi: 'Hãy tả một giáo viên có ảnh hưởng lớn đến bạn.', bullets: ['who this teacher is', 'when and where you met him or her', 'what he or she taught you', 'and explain how he or she influenced you'] },
          { part: 2, q: 'Describe a person who inspired you to do something.', vi: 'Hãy tả một người đã truyền cảm hứng cho bạn làm một việc gì đó.', bullets: ['who this person is', 'how you know him or her', 'what he or she inspired you to do', 'and explain why he or she inspired you'] }
        ]
      }
    },
    {
      id: 'hs19', video: 19, unit: 'Part 2: Describe a building', minutes: 30,
      title: 'Part 2: Tả một toà nhà / nơi chốn (phòng trà Teaspoon)',
      goal: 'Áp khung 5 phần cho đề Describe a building: tả thiết kế, bầu không khí, sản phẩm dịch vụ và nhân viên.',
      points: [
        'Dạng Describe a place được cô tách làm 2: building (thứ được xây lên: quán cà phê, nhà hàng, nhà, toà nhà lịch sử) và an area of land (thành phố, thị trấn, đất nước). Bài này học building, vẫn dùng khung 5 phần như Describe a person.',
        'Mở đầu: I\'m going to talk about a tearoom which I usually go to if I need some relaxation (paraphrase "often go to relax"). Không có tên riêng thì không phẩy trước which; có tên riêng (Secret Garden, which...) thì có phẩy.',
        'Thông tin cơ bản: tên (It has a very nice name – ...), vị trí (It\'s located on + đường + quận), diện tích (It\'s quite small / large / spacious, I think it can hold a maximum of 20 people) và một câu đánh giá với which makes it a perfect place for... Tên dài thì kéo dài: At first, it was really hard for me to remember its name.',
        'Cốt lõi 1, thiết kế bên ngoài và bên trong: is/are decorated with (tiny flowers, coloured string lights, star and moon ornaments, colourful balloons); is/are surrounded by (tall trees, souvenir shops); is/are made of (glass, wood); There is/are... in front of / behind / outside; enjoy the breathtaking view of the city/sea.',
        'Bầu không khí: making the atmosphere even cosier / more relaxing; câu "đinh": ... creates a very relaxing atmosphere that I can\'t really describe in words.',
        'Cốt lõi 2, sản phẩm dịch vụ: It serves a wide range of teas/foods/drinks, including... rồi I usually order... because...; chất lượng (high/low quality); giá (cheap, affordable, reasonable, expensive) kèm số tiền: It only costs.../I only have to pay... for...; nhân viên (fast, polite, helpful, friendly; They always welcome their customers with a smile). Chọn điểm mình thích nhất: The thing that I love most about... is...',
        'Cảm nhận: recommend something to somebody (nhớ giới từ to), kéo dài bằng mệnh đề who; This tearoom is the first place I think of whenever I want to relax. Kết: So, if I had to talk about + chép lại đề, it would have to be + tên.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about a tearoom which I usually go to if I need some relaxation. It has a very nice name – Teaspoon. It\'s located on Ly Tu Trong Street, District 1. It\'s quite small; I think it can hold a maximum of 20 people.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'Although it\'s right in the city centre, it\'s on a quiet corner of the street, which makes it a perfect place for those who need a little silence to unwind or escape from the hustle and bustle of the city.', vi: 'Câu đánh giá.' },
        { kind: 'model', text: 'I really love the windows, which are decorated with tiny flowers and coloured string lights. I also love the ceiling, which is nicely decorated with moon and star ornaments, making the atmosphere even cosier. Also, the chairs, the tables, the candles... everything there creates a very relaxing atmosphere that I can\'t really describe in words.', vi: 'Thiết kế và bầu không khí.' },
        { kind: 'model', text: 'Speaking of tea, it serves a wide range of teas, including black tea, green tea, herbal tea and fermented tea, but I often order herbal tea because I love the taste and the smell. The thing that I love most about this tearoom is its staff. They are so fast and friendly. They always welcome their customers with a smile, and they show them to the best seat to enjoy their tea.', vi: 'Sản phẩm và nhân viên.' },
        { kind: 'model', text: 'This tearoom is the first place I think of whenever I want to relax. I would recommend this tearoom to anyone who loves drinking tea and who wants to find a place to relax or to escape for a while from their work or their stressful lives. So, if I had to talk about a place where I usually go to relax, it would have to be Teaspoon.', vi: 'Cảm nhận và kết.' },
        { kind: 'note', say: false, text: 'Building: tên → vị trí → diện tích (hold a maximum of...) → câu đánh giá → thiết kế (decorated with / surrounded by / made of) → không khí → sản phẩm, giá, nhân viên → recommend... to... → kết', vi: 'Dàn ý nhanh.' },
        { kind: 'bad', text: 'I would recommend this tearoom for my friends.', vi: 'recommend something to somebody: to my friends.' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút rồi nói khoảng 2 phút theo khung 5 phần về một quán cà phê / nhà hàng / nơi bạn hay đến. Bắt buộc có: It\'s located on..., can hold a maximum of..., ít nhất 2 cấu trúc thiết kế (decorated with / surrounded by / made of), câu về bầu không khí, It serves a wide range of... và recommend... to...',
        shadow: [
          'It\'s quite small; I think it can hold a maximum of 20 people.',
          'I really love the windows, which are decorated with tiny flowers and coloured string lights.',
          'Everything there creates a very relaxing atmosphere that I can\'t really describe in words.',
          'They always welcome their customers with a smile.',
          'This tearoom is the first place I think of whenever I want to relax.'
        ],
        questions: [
          { part: 2, q: 'Describe a place where you often go to relax.', vi: 'Hãy tả một nơi bạn thường đến để thư giãn.', bullets: ['where it is', 'what it is like', 'what you do there', 'and explain why you go there to relax'] },
          { part: 2, q: 'Describe a café that you have been to.', vi: 'Hãy tả một quán cà phê bạn từng đến.', bullets: ['where it is', 'why you went there', 'what you ate or drank', 'and explain why you liked or disliked the café'] },
          { part: 2, q: 'Describe a restaurant you like.', vi: 'Hãy tả một nhà hàng bạn thích.', bullets: ['where it is', 'what kind of food it serves', 'how often you go there', 'and explain why you like it'] }
        ]
      }
    },
    {
      id: 'hs20', video: 20, unit: 'Part 2: Describe a building', minutes: 23,
      title: 'Part 2: Tả một nhà hàng bạn thích (Marukame Udon)',
      goal: 'Tả một nhà hàng theo khung 5 phần, thêm 3 cách kéo dài mới: so sánh với nơi khác, món chưa thử, đã giới thiệu cho bạn bè.',
      points: [
        'Đề: Describe a restaurant you like (cùng nhóm Describe a building). Dùng khung 5 phần như bài tả người và bài tả quán trà ở video trước.',
        'Mở đầu: I\'m going to talk about + tên (tên riêng có dấu phẩy), which is one of my favourite restaurants so far. favourite đã là "thích nhất", không nói most favourite.',
        'Thông tin cơ bản, chọn linh hoạt: vị trí (It\'s located on Hai Ba Trung Street, District 3), diện tích (It\'s quite spacious. I think it can hold a maximum of 100 people), câu đánh giá (Although it\'s right in the city centre, it\'s on a quiet corner of the street, which makes it a perfect place for those who need a little silence to unwind...). Trong phòng thi được tưởng tượng thêm chi tiết cho câu trả lời hay hơn.',
        'Mới: so sánh với nơi khác: Unlike some other Japanese restaurants that are quite small, this one is very spacious. Rồi thêm lý do mô típ: I think this is because the owner wants to create a comfortable environment for his customers.',
        'Cốt lõi 1, thiết kế: It doesn\'t have any windows, but the walls are made of glass (be made of + chất liệu: glass, wood, plastic, silver), which makes it look even more spacious. The ceiling is beautifully / nicely decorated with coloured string lights and moon and star ornaments; a cosy and relaxing atmosphere I can\'t really describe in words.',
        'Cốt lõi 2, đồ ăn và phục vụ: Speaking of food, it serves a wide range of dishes, including...; I often order... because I love the taste and the smell. Mới: I\'ve never tried...; maybe next time I\'ll give it a try. Điều thích nhất: The thing that I love most about this restaurant is its staff: fast and friendly, welcome their customers with a smile, show them to the best seat.',
        'Cảm nhận: I\'d recommend it to anyone who loves Japanese food, hoặc mới: I\'ve recommended this restaurant to many of my friends, and they all said good things about it. Kết: So, if I had to talk about one of my favourite restaurants, it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about Marukame Udon, which is one of my favourite restaurants so far.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'It\'s located on Hai Ba Trung Street, District 3. It\'s quite spacious. I think it can hold a maximum of 100 people. Unlike some other Japanese restaurants that are quite small, this one is very spacious. I think this is because the owner wants to create a comfortable environment for his customers.', vi: 'Thông tin cơ bản và so sánh.' },
        { kind: 'model', text: 'Although it\'s right in the city centre, it\'s on a quiet corner of the street, which makes it a perfect place for those who need a little silence to unwind or escape from the hustle and bustle of the city.', vi: 'Câu đánh giá.' },
        { kind: 'model', text: 'It doesn\'t have any windows, but the walls are made of glass, which makes it look even more spacious. I really love the ceiling, which is beautifully decorated with coloured string lights and moon and star ornaments, creating a very cosy and relaxing atmosphere that I can\'t really describe in words.', vi: 'Cốt lõi: thiết kế.' },
        { kind: 'model', text: 'Speaking of food, it serves a wide range of dishes, including chicken, pork, beef and seafood noodles, but I often order beef noodles because I love the taste and the smell. Oh, it\'s so good! I\'ve never tried the seafood noodles; maybe next time I\'ll give it a try.', vi: 'Cốt lõi: đồ ăn.' },
        { kind: 'model', text: 'The thing that I love most about this restaurant is its staff. They are so fast and friendly. They always welcome their customers with a smile, and they show them to the best seat to enjoy their food.', vi: 'Cốt lõi: nhân viên.' },
        { kind: 'model', text: 'I\'ve recommended this restaurant to many of my friends, and they all said good things about it. So, if I had to talk about one of my favourite restaurants, it would have to be Marukame Udon.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'It is one of my most favourite restaurants.', vi: 'favourite đã mang nghĩa nhất: one of my favourite restaurants.' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút theo 5 phần rồi nói khoảng 2 phút. Cố dùng 3 cách kéo dài mới: so sánh với nơi khác (Unlike...), món chưa thử (I\'ve never tried...; maybe next time I\'ll give it a try), và đã giới thiệu cho bạn bè (I\'ve recommended... to...).',
        shadow: [
          'I\'m going to talk about Marukame Udon, which is one of my favourite restaurants so far.',
          'Unlike some other Japanese restaurants that are quite small, this one is very spacious.',
          'I\'ve never tried the seafood noodles; maybe next time I\'ll give it a try.',
          'I\'ve recommended this restaurant to many of my friends, and they all said good things about it.'
        ],
        questions: [
          { part: 2, q: 'Describe a restaurant you like.', vi: 'Hãy tả một nhà hàng bạn thích.', bullets: ['where it is', 'what kind of food it serves', 'how often you go there', 'and explain why you like it'] },
          { part: 2, q: 'Describe a shop you like to visit.', vi: 'Hãy tả một cửa hàng bạn thích ghé.', bullets: ['where it is', 'what it sells', 'what it looks like', 'and explain why you like visiting it'] },
          { part: 2, q: 'Describe a place where you like to relax.', vi: 'Hãy tả một nơi bạn thích đến để thư giãn.', bullets: ['where it is', 'what it looks like', 'what you do there', 'and explain why it helps you relax'] }
        ]
      }
    },
    {
      id: 'hs21', video: 21, unit: 'Part 2: Describe a building', minutes: 23,
      title: 'Part 2: Tả một công trình lịch sử (Bảo tàng Chứng tích Chiến tranh)',
      goal: 'Tả một địa điểm lịch sử theo khung 5 phần, phần cốt lõi tập trung vào cái đặc trưng nhất của nơi đó.',
      points: [
        'Đề: Describe a historic building in your country, bài cuối của nhóm Describe a building. Vẫn khung 5 phần, nhưng cốt lõi khác bài quán trà và nhà hàng: tập trung vào những gì đặc trưng nhất của nơi đó.',
        'Mở đầu: I\'m going to talk about the War Remnants Museum, which is one of the most famous tourist attractions here in Ho Chi Minh City. Cụm thay thế: one of the most popular tourist destinations / one of the most famous tourist attractions / one of the most important historic sites.',
        'Thông tin cơ bản ngắn gọn: vị trí (It\'s located on Vo Van Tan Street, District 3) + câu đánh giá (Although it\'s right in the city centre, it\'s on a quiet corner of the street).',
        'Cốt lõi, bên ngoài: There is / are... in front of / behind / outside...; bên trong: There are several themed rooms inside the museum (phòng trưng bày theo chủ đề). Some rooms display a wide range of photos... These photos show how... Thủ sẵn từ: military equipment, helicopters, tanks, fighter planes, fight in battle, weapons, enemies.',
        'Đi sâu vào phần ấn tượng nhất (chuồng cọp: political prisoners were kept and tortured very brutally; dragged out of the cage; lost consciousness). Không nói sâu được thì liệt kê thêm các phòng khác. Cấu trúc so... that...: so frightening and brutal that they can\'t be described in words.',
        'Giá vé + lý do mô típ: The admission fee is only 40,000 dong for an adult. I think the local government wants to encourage more people to visit the city\'s historic sites and to learn more about the history of the country (encourage sb to V).',
        'Cảm nhận: I would recommend this museum to anyone who loves history or who wants to learn more about... Kết: So, if I had to talk about a historic building in Vietnam, it would have to be... Ôn lại cả 3 bài building và ghi các công thức theo 5 phần vào vở.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about the War Remnants Museum, which is one of the most famous tourist attractions here in Ho Chi Minh City. It\'s located on Vo Van Tan Street, District 3. Although it\'s right in the city centre, it\'s on a quiet corner of the street.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'There is a collection of some military equipment, such as helicopters, tanks and fighter planes, outside the museum. There are several themed rooms inside the museum. Some rooms display a wide range of photos from the Vietnam War. These photos show how Vietnamese soldiers fought in battle, the weapons they used and the military equipment their enemies used.', vi: 'Cốt lõi: bên ngoài và bên trong.' },
        { kind: 'model', text: 'I\'ve watched lots of interviews and TV shows about this museum, and I remember the majority of the people who were interviewed said the thing that they remembered most was the tiger cages. They\'re like prisons where political prisoners were kept and tortured very brutally. There are various kinds of torture, and they are so frightening and brutal that they can\'t be described in words.', vi: 'Cốt lõi: phần ấn tượng nhất.' },
        { kind: 'model', text: 'The admission fee is only 40,000 dong for an adult. I think the local government wants to encourage more people to visit the city\'s historic sites and to learn more about the history of the country.', vi: 'Cốt lõi: giá vé và lý do.' },
        { kind: 'model', text: 'I would recommend this museum to anyone who loves history or who wants to learn more about the Vietnam War. So, if I had to talk about a historic building in Vietnam, it would have to be the War Remnants Museum.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'There are some helicopters and tankers outside the museum.', vi: 'Xe tăng là tanks; tanker là tàu hoặc xe chở dầu.' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút rồi nói khoảng 2 phút theo khung 5 phần. Phần cốt lõi: tả bên ngoài (There is/are... outside...), bên trong (There are several themed rooms...), rồi đi sâu vào 1 phần ấn tượng nhất hoặc liệt kê các phần khác; thêm giá vé và lý do.',
        shadow: [
          'It\'s one of the most important historic sites in my country.',
          'There are several themed rooms inside the museum.',
          'They are so frightening that they can\'t be described in words.',
          'I would recommend this museum to anyone who loves history.'
        ],
        questions: [
          { part: 2, q: 'Describe a historic building in your country.', vi: 'Hãy tả một công trình lịch sử ở nước bạn.', bullets: ['what it is', 'where it is', 'what it looks like', 'and explain why it is important'] },
          { part: 2, q: 'Describe a museum you have visited.', vi: 'Hãy tả một bảo tàng bạn từng đến.', bullets: ['what museum it was', 'when you went there', 'what you saw there', 'and explain how you felt about it'] },
          { part: 2, q: 'Describe a place in your city that tourists like to visit.', vi: 'Hãy tả một nơi ở thành phố bạn mà du khách thích đến.', bullets: ['where it is', 'what people can see or do there', 'why it is popular', 'and explain whether you would recommend it'] }
        ]
      }
    },
    {
      id: 'hs22', video: 22, unit: 'Part 2: Describe a place', minutes: 33,
      title: 'Part 2: Tả một đất nước, thành phố (Hàn Quốc)',
      goal: 'Tả một vùng đất theo khung 5 phần với 4 mảng cốt lõi: cảnh đẹp, ẩm thực, thời tiết theo mùa, lễ hội.',
      points: [
        'Nhóm Describe a place chia 2 loại: building (toà nhà) và an area of land (vùng đất: thành phố, thị trấn, làng, đất nước). Bài này là vùng đất. Đề: Describe a country you would like to visit in the future / a city you have recently visited / a country where you would like to work for a short time.',
        'Mở đầu: I\'m going to talk about South Korea, which I\'ve always dreamt of visiting. Đổi would like to: want to / would love to / have always wanted to + V; have always dreamt of + V-ing.',
        'Thông tin cơ bản: vị trí (It\'s a country in East Asia / Southeast Asia / Southern Europe; It\'s the capital city of Vietnam; It\'s located in northern / southern / central Vietnam, on the east coast of...), quy mô (a small / large / huge country; one of the largest / most populous cities), câu đánh giá (one of the most beautiful countries in East Asia; one of the most famous tourist destinations that attract millions of tourists every year).',
        'Cốt lõi là phần dài nhất, gồm 4 mảng: cảnh đẹp và nơi nổi tiếng (thành thị hoặc miền quê), ẩm thực (món truyền thống), thời tiết (chia theo mùa), lễ hội (các hoạt động dùng được cho mọi lễ hội). Đủ dài thì dừng, không cần nói hết.',
        'Thành thị: international, multicultural, crowded, lively; X is a multicultural city that attracts millions of tourists every year; X is famous for its modern facilities and famous landmarks such as skyscrapers, large shopping centres, 5-star hotels and restaurants, night markets, rooftop bars, historic sites. Hoạt động: visit night markets, explore the lively nightlife, enjoy the breathtaking view of the city centre.',
        'Miền quê: peaceful, tranquil, lovely, enchanting; X is famous for its spectacular natural landscapes such as colourful flower fields, stunning sea views, breathtaking mountain scenery, paddy fields, rice terraces. Hoạt động: escape the hustle and bustle of the city, enjoy colourful flowers blooming, rivers flowing and birds singing, take a relaxing nature walk, watch the sunset, try water sports or outdoor activities; I really love the idea / feeling of + V-ing.',
        'Ẩm thực, cách kéo dài dùng cho mọi nước: I\'d love to try... I know I can try these dishes in Vietnam because many restaurants have them on their menus, but it would be great if I could try them right in the country where those dishes originated.',
        'Thời tiết theo mùa: The country has four amazing seasons + I\'ve watched some travel vlogs and documentaries about..., and I\'m really amazed by the beauty of seasonal changes in nature. Each season has its own unique beauty. Lễ hội: There are various festivals celebrated in...; sing, dance and play music together, watch firework displays, participate in a parade, wear colourful costumes. Cảm nhận: I would travel with a group of friends because... Kết: So, if I had to talk about a country I\'d love to visit in the future, it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about South Korea, which I\'ve always dreamt of visiting. It\'s one of the most beautiful countries in East Asia.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'South Korea is famous for its spectacular natural landscapes such as colourful flower fields, stunning sea views and breathtaking mountain scenery. If you visit the countryside in the spring, you can enjoy colourful flowers blooming, rivers flowing and birds singing. You can also visit some beautiful sandy beaches. I really love the idea of sitting on the beach and watching the sunset and the sunrise.', vi: 'Cốt lõi: cảnh đẹp miền quê.' },
        { kind: 'model', text: 'I\'d love to try South Korean food, such as kimchi, bibimbap or japchae. I know I can try these dishes in Vietnam because many restaurants have them on their menus, but it would be great if I could try them right in the country where those dishes originated.', vi: 'Cốt lõi: ẩm thực.' },
        { kind: 'model', text: 'The country has four amazing seasons. I\'ve watched some travel vlogs and documentaries about the four seasons in South Korea, and I\'m really amazed by the beauty of seasonal changes in nature. Each season has its own unique beauty. For example, we can enjoy cherry blossoms in spring, flowers blooming in summer, colourful foliage in autumn and celebrate a white Christmas in winter.', vi: 'Cốt lõi: thời tiết theo mùa.' },
        { kind: 'model', text: 'I would like to visit this country one day in the future. I think I would travel with a group of friends because it is much more exciting when you have someone to talk to and share experiences with during your journey. So, if I had to talk about a country I\'d love to visit in the future, it would have to be South Korea.', vi: 'Cảm nhận và kết.' },
        { kind: 'model', text: 'Ho Chi Minh City is a multicultural city that attracts millions of tourists every year. It is famous for its modern facilities and famous landmarks such as Bitexco Financial Tower, large shopping centres and many 5-star hotels and restaurants.', vi: 'Mẫu cho thành phố.' },
        { kind: 'bad', text: 'Seoul is one of the most famous tourist destinations that attracts millions of tourists.', vi: 'that thay cho destinations (số nhiều) nên dùng attract.' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút rồi nói khoảng 2 phút. Phần cốt lõi chọn 2–3 trong 4 mảng: cảnh đẹp (thành thị hoặc miền quê), ẩm thực (dùng cách kéo dài "I know I can try these dishes in Vietnam, but..."), thời tiết theo mùa, lễ hội.',
        shadow: [
          'I\'m going to talk about South Korea, which I\'ve always dreamt of visiting.',
          'It is famous for its spectacular natural landscapes.',
          'It would be great if I could try them right in the country where those dishes originated.',
          'Each season has its own unique beauty.'
        ],
        questions: [
          { part: 2, q: 'Describe a country you would like to visit in the future.', vi: 'Hãy tả một đất nước bạn muốn đến trong tương lai.', bullets: ['which country it is', 'where it is', 'what you would like to do there', 'and explain why you would like to visit it'] },
          { part: 2, q: 'Describe a city you have recently visited.', vi: 'Hãy tả một thành phố bạn mới đến gần đây.', bullets: ['where it is', 'when you went there', 'what you did there', 'and explain how you felt about it'] },
          { part: 2, q: 'Describe a country where you would like to work for a short time.', vi: 'Hãy tả một đất nước bạn muốn đến làm việc trong thời gian ngắn.', bullets: ['which country it is', 'what job you would like to do there', 'how long you would like to stay', 'and explain why you would like to work there'] }
        ]
      }
    },
    {
      id: 'hs23', video: 23, unit: 'Part 2: Describe a place', minutes: 21,
      title: 'Part 2: Tả một thành phố bạn vừa đến (Đà Nẵng)',
      goal: 'Dùng lại khung tả vùng đất cho một chuyến đi đã qua: chuyển sang quá khứ, kể hoạt động theo từng ngày, đổi cách kéo dài phần ẩm thực.',
      points: [
        'Đề: Describe a city you have recently visited. Vẫn khung 5 phần và các cụm của bài trước, nhưng chuyến đi đã xảy ra nên chuyển hết sang quá khứ.',
        'Mở đầu: I\'m going to talk about Da Nang, which my friends and I visited last month (nói luôn đi với ai, khi nào).',
        'Thông tin cơ bản: It\'s a coastal city in Central Vietnam (thành phố biển); Hà Nội là the capital city; TP.HCM là one of the largest / busiest cities in Vietnam. Thêm câu đánh giá: one of the most famous tourist destinations that attract millions of tourists every year.',
        'Cốt lõi 1, cảnh đẹp và hoạt động: This city is famous for its landmarks, such as..., and its spectacular natural landscapes, from beautiful sandy beaches to stunning mountain scenery. We spent five days there exploring many interesting places and doing loads of things together (spend + thời gian + V-ing). Kể theo ngày: We spent the first day swimming and sunbathing at the beach. We also tried various water sports, such as...',
        'Cốt lõi 2, ẩm thực ở quá khứ: We had dinner in a very nice restaurant by the seaside and tried famous Da Nang dishes, like... Câu kéo dài đổi thì: Actually, we could have tried these dishes here in Ho Chi Minh City..., but it was great to try them right in the city where they originated (could have + V3 = lẽ ra đã có thể).',
        'Cốt lõi 3, các ngày tiếp theo: mỗi địa điểm thêm mệnh đề which is one of Da Nang\'s most popular tourist attractions để kéo dài; stroll around, take lots of photos, an amazing experience, before heading back to the city centre, do some shopping in a famous night market, enjoy the city\'s lively nightlife.',
        'Cảm nhận: I would definitely visit this beautiful coastal city again because there are still many places for us to discover. Kết: So, if I had to talk about a city I\'ve recently visited, it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about Da Nang, which my friends and I visited last month. It\'s a coastal city in Central Vietnam, and it is one of the most famous tourist destinations that attract millions of tourists every year.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'This city is famous for its landmarks, such as Dragon Bridge, Linh Ung Pagoda and Marble Mountains, and its spectacular natural landscapes, from beautiful sandy beaches to stunning mountain scenery. We spent five days there exploring many interesting places and doing loads of things together. We spent the first day swimming and sunbathing at the beach. We also tried various water sports, such as scuba diving, parasailing and windsurfing.', vi: 'Cốt lõi: cảnh đẹp và hoạt động.' },
        { kind: 'model', text: 'We had dinner in a very nice restaurant by the seaside and tried famous Da Nang dishes, like mi Quang, bun cha ca and bun mam. Actually, we could have tried these dishes here in Ho Chi Minh City because many restaurants have them on their menus, but it was great to try them right in the city where they originated.', vi: 'Cốt lõi: ẩm thực (quá khứ).' },
        { kind: 'model', text: 'We spent the next two days exploring Ba Na Hills, which is one of Da Nang\'s most popular tourist attractions. We strolled around the French Village and took lots of photos. On the second day, we visited the Wax Museum, which was an amazing experience, and explored some other interesting places before heading back to the city centre. There, we did some shopping in a famous night market, visited a rooftop bar and enjoyed the city\'s lively nightlife.', vi: 'Cốt lõi: các ngày tiếp theo.' },
        { kind: 'model', text: 'I would definitely visit this beautiful coastal city again because there are still many places for us to discover. So, if I had to talk about a city I\'ve recently visited, it would have to be Da Nang.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'We spent five days there to explore many interesting places.', vi: 'spend + thời gian + V-ing: We spent five days there exploring...' }
      ],
      practice: {
        type: 'speak',
        task: 'Kể về một nơi bạn đã đến, dùng quá khứ đơn. Cốt lõi kể theo ngày (We spent the first day... On the second day...), mỗi địa điểm thêm "which is one of...\'s most popular tourist attractions", ẩm thực dùng "we could have tried... but it was great to...".',
        shadow: [
          'I\'m going to talk about Da Nang, which my friends and I visited last month.',
          'We spent five days there exploring many interesting places.',
          'Actually, we could have tried these dishes here in Ho Chi Minh City.',
          'I would definitely visit this beautiful coastal city again.'
        ],
        questions: [
          { part: 2, q: 'Describe a city you have recently visited.', vi: 'Hãy tả một thành phố bạn mới đến gần đây.', bullets: ['where it is', 'when you went there', 'what you did there', 'and explain how you felt about it'] },
          { part: 2, q: 'Describe a holiday you really enjoyed.', vi: 'Hãy tả một kỳ nghỉ bạn rất thích.', bullets: ['where you went', 'who you went with', 'what you did there', 'and explain why you enjoyed it'] },
          { part: 2, q: 'Describe a place you visited that left a strong impression on you.', vi: 'Hãy tả một nơi bạn từng đến để lại ấn tượng mạnh.', bullets: ['where it is', 'when you went there', 'what you did there', 'and explain why it impressed you'] }
        ]
      }
    },
    {
      id: 'hs24', video: 24, unit: 'Part 2: Describe a place', minutes: 21,
      title: 'Part 2: Tả một đất nước bạn muốn đến làm việc (nước Anh)',
      goal: 'Xoay khung tả vùng đất sang chủ đề công việc mà không lạc đề, vẫn dùng lại được các cụm của bài du lịch.',
      points: [
        'Đề: Describe a country where you would like to work for a short time. Khác 2 đề trước (du lịch): mọi phần phải xoay quanh công việc để không lạc đề, nhưng vẫn dùng lại được nhiều cụm cũ.',
        'Mở đầu: I\'m going to talk about England, where I\'ve always dreamt of living and working for a couple of years (for a short time → for a couple of years; have always dreamt of + V-ing; nơi chốn dùng where).',
        'Thông tin cơ bản: câu đánh giá gắn với công việc: I\'ve watched lots of documentaries about this beautiful country, and I think it\'s one of the best countries to live and work in.',
        'Cốt lõi 1, vì sao nhiều người đến làm việc (dùng được cho Mỹ, Úc, Singapore...): It\'s famous for its modern facilities, professional work environments, generous social benefits and high average salaries.',
        'Cốt lõi 2, công việc cụ thể: I\'ve always wanted to work in the field of education (technology...); England has many prestigious universities (uy tín), such as..., which offer a range of great job opportunities for non-native English speakers. I\'m obsessed with British accents (rất mê), and working in England would be a golden opportunity for me to practise my English and improve my accent.',
        'Cốt lõi 3, nối sang du lịch: This country is also well-known for its spectacular landscapes and famous landmarks. It would be great if you could combine working and travelling at the same time: work in the city centre during the week and take trips to lovely little villages at weekends to escape from the hustle and bustle of the city for a little while.',
        'Cảm nhận: I\'d love to work in this amazing country one day in the future. Kết: So, if I had to talk about a country where I\'d like to work for a short time, it would have to be England. Ôn lại cả 3 bài tả vùng đất và ghi công thức vào vở.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about England, where I\'ve always dreamt of living and working for a couple of years. I\'ve watched lots of documentaries about this beautiful country, and I think it\'s one of the best countries to live and work in.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'It\'s famous for its modern facilities, professional work environments, generous social benefits and high average salaries.', vi: 'Cốt lõi 1: vì sao đến làm việc.' },
        { kind: 'model', text: 'I\'ve always wanted to work in the field of education, and England has many prestigious universities, such as the University of Oxford and the University of Manchester, which offer a range of great job opportunities for non-native English speakers. I\'m obsessed with British accents, and working in England would be a golden opportunity for me to practise my English and improve my accent.', vi: 'Cốt lõi 2: công việc cụ thể.' },
        { kind: 'model', text: 'This country is also well-known for its spectacular landscapes and famous landmarks. It would be great if you could combine working and travelling at the same time. I would like to work in the city centre during the week and take trips to lovely little villages at weekends to enjoy the beautiful nature and to escape from the hustle and bustle of the city for a little while.', vi: 'Cốt lõi 3: kết hợp làm việc và du lịch.' },
        { kind: 'model', text: 'I\'d love to work in this amazing country one day in the future. So, if I had to talk about a country where I\'d like to work for a short time, it would have to be England.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'I\'ve always dreamt of live and work in England.', vi: 'dream of + V-ing: I\'ve always dreamt of living and working in England.' }
      ],
      practice: {
        type: 'speak',
        task: 'Nói khoảng 2 phút theo khung 5 phần, mọi phần đều gắn với công việc hoặc việc học (đúng đề). Dùng: is famous for its professional work environments..., work in the field of..., offer a range of great job opportunities for..., combine working and travelling.',
        shadow: [
          'I\'m going to talk about England, where I\'ve always dreamt of living and working for a couple of years.',
          'It\'s famous for its professional work environments and high average salaries.',
          'Working there would be a golden opportunity for me to improve my English.',
          'It would be great if you could combine working and travelling at the same time.'
        ],
        questions: [
          { part: 2, q: 'Describe a country where you would like to work for a short time.', vi: 'Hãy tả một đất nước bạn muốn đến làm việc trong thời gian ngắn.', bullets: ['which country it is', 'what job you would like to do there', 'how long you would like to stay', 'and explain why you would like to work there'] },
          { part: 2, q: 'Describe a job you would like to do in the future.', vi: 'Hãy tả một công việc bạn muốn làm trong tương lai.', bullets: ['what the job is', 'where you would like to do it', 'what skills it needs', 'and explain why you would like to do this job'] },
          { part: 2, q: 'Describe a foreign country you would like to study in.', vi: 'Hãy tả một nước ngoài bạn muốn đến du học.', bullets: ['which country it is', 'what you would like to study there', 'how long you would stay', 'and explain why you would like to study there'] }
        ]
      }
    },
    {
      id: 'hs25', video: 25, unit: 'Part 2: Describe an event', minutes: 24,
      title: 'Part 2: Tả một sự kiện, lễ hội (Tết)',
      goal: 'Tả một sự kiện theo khung 5 phần: thông tin cơ bản là thời gian và ý nghĩa, cốt lõi chia TRƯỚC và TRONG sự kiện, có 3 cách kéo dài.',
      points: [
        'Chủ đề mới: Describe an event. Đề thường gặp: Describe a festival that is important in your country / an important event in your life / an event that changed you in a positive way. Vẫn khung 5 phần.',
        'Mở đầu: I\'m going to talk about the Tet holiday, which is one of the most important festivals in Vietnam (paraphrase "that is important in your country").',
        'Thông tin cơ bản gồm 2 phần: thời gian, địa điểm (It takes place / starts / is celebrated...; It often lasts + thời gian: It usually starts in late January or early February, depending on the lunar calendar) và ý nghĩa hoặc nguồn gốc của sự kiện. Phần cốt lõi dài thì phần này nói ngắn.',
        'Cốt lõi, TRƯỚC sự kiện (chuẩn bị): Thời gian + before + sự kiện (Two weeks before Tet,...): clean their houses; decorate their houses with... (ornaments, coloured string lights, colourful balloons); be busy shopping for new clothes, new shoes and new household items; people living far away return home to celebrate... with their families. Kéo dài bằng ý nghĩa của hoạt động: because they believe that cleaning helps get rid of all the bad things of the old year.',
        'Cốt lõi, TRONG sự kiện: câu giới thiệu During this time, loads of activities take place across the country, rồi liệt kê: firework displays, late-night parties, family gatherings on New Year\'s Eve, visit grandparents, give / receive lucky money, play cards, go to the pagoda to pray for their families (dùng thêm các hoạt động lễ hội đã học).',
        'Hai cách kéo dài mới: (1) nói ngược để thêm hoạt động: I live in a small town where there are no fireworks, so my family and I usually stay at home...; (2) gắn hoạt động với một kỷ niệm: I remember when I was a child, the thing that I found most interesting was that...',
        'Cảm nhận cho sự kiện, chọn 1: lần gần nhất bạn đã làm gì / năm tới sẽ làm gì / học được gì / vì sao sự kiện có ý nghĩa với bạn. Kết: So, if I had to talk about a festival that is important in Vietnam, it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about the Tet holiday, which is one of the most important festivals in Vietnam. It usually starts in late January or early February, depending on the lunar calendar.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'Two weeks before Tet, people clean their houses because they believe that cleaning helps get rid of all the bad things of the old year to prepare for the new year. I really love the atmosphere during this time when everyone, from children to the elderly, is busy shopping for new clothes, new shoes and new household items. People living far away return home to celebrate Tet with their families.', vi: 'Cốt lõi: trước sự kiện.' },
        { kind: 'model', text: 'During this time, loads of activities take place across the country. There are firework displays, late-night parties and family gatherings on New Year\'s Eve. I live in a small town where there are no fireworks, so my family and I usually stay at home, have dinner together and watch the Tao Quan show, which is one of the most popular shows to watch then.', vi: 'Cốt lõi: trong sự kiện, nói ngược để thêm hoạt động.' },
        { kind: 'model', text: 'On the first day of the new year, we often visit our grandparents. I remember when I was a child, the thing that I found most interesting was that the children were given lucky money! Our grandparents, parents, aunts and uncles all gave us lucky money, which we were all waiting for. There are also many other activities. People go to the pagoda to pray for their families and share meals with friends or family members.', vi: 'Cốt lõi: hoạt động gắn với kỷ niệm.' },
        { kind: 'model', text: 'Last year, I went out with some of my friends, and we played cards together. You know, I lost all of my lucky money, but we had a great time together. So, if I had to talk about a festival that is important in Vietnam, it would have to be the Tet holiday.', vi: 'Cảm nhận và kết.' },
        { kind: 'model', text: 'Over 2,000 years ago, people believed that on the night of the 31st of October, the boundary between the world of the living and the world of the dead disappeared, and spirits could cross into the world of the living. People were very scared, so they wore handmade masks and scary costumes to disguise themselves from the spirits.', vi: 'Mẫu nói về nguồn gốc một lễ hội (Halloween).' },
        { kind: 'bad', text: 'Everyone is busy to shop for new clothes.', vi: 'be busy + V-ing: is busy shopping for new clothes.' }
      ],
      practice: {
        type: 'speak',
        task: 'Nói khoảng 2 phút về một sự kiện: thông tin cơ bản (thời gian + ý nghĩa), cốt lõi chia TRƯỚC (chuẩn bị, kèm ý nghĩa) và TRONG (liệt kê hoạt động, thêm 1 kỷ niệm hoặc 1 câu "nói ngược"), cảm nhận chọn 1 hướng, rồi câu kết.',
        shadow: [
          'It usually starts in late January or early February, depending on the lunar calendar.',
          'During this time, loads of activities take place across the country.',
          'I remember when I was a child, the thing that I found most interesting was the lucky money.',
          'We had a great time together.'
        ],
        questions: [
          { part: 2, q: 'Describe a festival that is important in your country.', vi: 'Hãy tả một lễ hội quan trọng ở nước bạn.', bullets: ['what the festival is', 'when it is celebrated', 'what people do during it', 'and explain why it is important'] },
          { part: 2, q: 'Describe an important event in your life.', vi: 'Hãy tả một sự kiện quan trọng trong đời bạn.', bullets: ['what the event was', 'when and where it happened', 'who was there', 'and explain why it was important to you'] },
          { part: 2, q: 'Describe an event that changed you in a positive way.', vi: 'Hãy tả một sự kiện đã thay đổi bạn theo hướng tích cực.', bullets: ['what happened', 'when it happened', 'who was involved', 'and explain how it changed you'] }
        ]
      }
    },
    {
      id: 'hs26', video: 26, unit: 'Part 2: Describe an event', minutes: 20,
      title: 'Part 2: Tả một sự kiện quan trọng (sinh nhật 18 tuổi)',
      goal: 'Tả một sự kiện đã qua ở thì quá khứ, thêm chiến thuật đổi ý và cách kéo dài bằng "phần thú vị nhất".',
      points: [
        'Đề: Describe an important event in your life. Khung 5 phần; bài mẫu là tiệc sinh nhật 18 tuổi.',
        'Mở đầu: I\'m going to talk about my 18th birthday party, which I think was one of the most important events in my life (sự kiện đã qua nên dùng quá khứ; sự kiện cụ thể nên có dấu phẩy).',
        'Chiến thuật đổi ý, dùng được cho nhiều đề (ví dụ chọn quà): At first, we thought we would hold the party at a nice restaurant near my house. But after a while, we realized that our home was the best place to do that, so we decided to celebrate my birthday at home. (hold / organize a party)',
        'Cốt lõi, TRƯỚC sự kiện: We spent all day decorating the living room with colourful balloons, tiny flowers and a big poster with my name and my family\'s wishes on it. My mom and my sisters prepared a special meal for dinner, while my dad went to a shop nearby to buy me a big birthday cake.',
        'Cốt lõi, TRONG sự kiện: câu giới thiệu (Some of my best friends also came over for dinner. We did lots of things that evening.), rồi liệt kê: They sang me birthday songs and gave me their best wishes. Then, we danced, played music and sang together.',
        'Cách kéo dài thứ 3 (sau "nói ngược" và "gắn kỷ niệm" ở bài trước): nói phần thú vị nhất: The most exciting part for me was opening my presents. I can\'t remember them all, but I remember some... Yeah, those are all the gifts I can remember.',
        'Cảm nhận, chọn hướng "vì sao có ý nghĩa": mean so much to sb (That birthday meant so much to me) + lý do (Now, I\'m very busy with my work and I live far away from my family, so I hardly ever have a chance to celebrate my birthday with them). Kết: So, if I had to talk about an important event in my life, it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about my 18th birthday party, which I think was one of the most important events in my life.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'At first, we thought we would hold the party at a nice restaurant near my house. But after a while, we realized that our home was the best place to do that, so we decided to celebrate my birthday at home.', vi: 'Thông tin cơ bản: chiến thuật đổi ý.' },
        { kind: 'model', text: 'We spent all day decorating the living room with colourful balloons, tiny flowers and a big poster with my name and my family\'s wishes on it. My mom and my sisters prepared a special meal for dinner, while my dad went to a shop nearby to buy me a big birthday cake.', vi: 'Cốt lõi: trước sự kiện.' },
        { kind: 'model', text: 'Some of my best friends also came over for dinner. We did lots of things that evening. They sang me birthday songs and gave me their best wishes. Then, we danced, played music and sang together.', vi: 'Cốt lõi: trong sự kiện.' },
        { kind: 'model', text: 'The most exciting part for me was opening my presents. I can\'t remember them all, but I remember some. My dad bought me a bag that I used for the first two years at uni, and my mom gave me a book called Awaken the Giant Within, which I still have today. I also got things like a T-shirt, a hat and a pair of shoes. Yeah, those are all the gifts I can remember.', vi: 'Kéo dài: phần thú vị nhất.' },
        { kind: 'model', text: 'Now, I\'m very busy with my work and I live far away from my family, so I hardly ever have a chance to celebrate my birthday with them. Therefore, that birthday meant so much to me. So, if I had to talk about an important event in my life, it would have to be my 18th birthday.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'We spent all day to decorate the living room.', vi: 'spend + thời gian + V-ing: spent all day decorating.' }
      ],
      practice: {
        type: 'speak',
        task: 'Kể một sự kiện đã qua ở thì quá khứ trong khoảng 2 phút. Bắt buộc dùng: chiến thuật đổi ý (At first, we thought... But after a while, we realized that...), phần TRƯỚC và TRONG sự kiện, và 1 câu "The most exciting part for me was...".',
        shadow: [
          'At first, we thought we would hold the party at a nice restaurant.',
          'But after a while, we realized that our home was the best place to do that.',
          'The most exciting part for me was opening my presents.',
          'That birthday meant so much to me.'
        ],
        questions: [
          { part: 2, q: 'Describe an important event in your life.', vi: 'Hãy tả một sự kiện quan trọng trong đời bạn.', bullets: ['what the event was', 'when and where it happened', 'who was there', 'and explain why it was important to you'] },
          { part: 2, q: 'Describe a birthday celebration you enjoyed.', vi: 'Hãy tả một buổi mừng sinh nhật bạn thích.', bullets: ['whose birthday it was', 'where it was celebrated', 'what people did', 'and explain why you enjoyed it'] },
          { part: 2, q: 'Describe a party you attended.', vi: 'Hãy tả một bữa tiệc bạn từng tham dự.', bullets: ['whose party it was', 'where it was held', 'what happened at the party', 'and explain how you felt about it'] }
        ]
      }
    },
    {
      id: 'hs27', video: 27, unit: 'Part 2: Describe an event', minutes: 24,
      title: 'Part 2: Tả một sự kiện thay đổi bạn (buổi workshop quản lý tiền)',
      goal: 'Tả một sự kiện tích cực: lý do dẫn tới sự kiện, nội dung chính, rồi cảm nhận theo hướng "học được gì và áp dụng ra sao".',
      points: [
        'Đề: Describe an event that changed you in a positive way. Bài này cho nhiều cụm hay về quản lý tiền, chủ đề cũng hay gặp ở Writing Task 2.',
        'Mở đầu: I\'m going to talk about an event which has brought a positive change to my life (nói chung chung, người nghe chưa biết là sự kiện nào nên không có dấu phẩy; changed me in a positive way = brought a positive change to my life). Câu tiếp: It was the day I attended a workshop on money management (workshop on + chủ đề).',
        'Thông tin cơ bản, lý do dẫn tới sự kiện: Back in September 2015, when I was struggling to find a better way to manage my money (struggle to V = chật vật làm gì), I suddenly saw an advert on the internet about a workshop on how to manage personal finances more effectively, which was exactly what I was looking for. I clicked the link and registered without any hesitation. It cost me around $50 for three hours, but it was absolutely worth it.',
        'Dùng lại mẹo Part 1 khi không nhớ ngày: I can\'t remember the exact date the workshop took place, but it was held in a large meeting room of a big hotel right in the city centre (be held / organized).',
        'Cốt lõi, TRƯỚC (đơn giản: dậy sớm, ăn sáng, đi xe): I got up quite early that day because I was so excited about the workshop. After breakfast, I went to the bus station near my flat, and it took me nearly an hour to get there. TRONG: nói nội dung chính: There were two speakers who had lots of experience with financial management. The first speaker talked about the factors leading to financial stress, credit card debt and other money-related issues..., while the second one showed us the most effective ways to tackle those problems.',
        'Cảm nhận theo hướng "học được gì": I knew more about why I always struggled financially even though I earned quite a good salary; how to track my daily spending more wisely; how much I needed to set aside (để dành) as soon as I got my paycheck.',
        'Áp dụng vào cuộc sống: I still apply those methods to my daily life (apply sth to sth); I\'m becoming much better at money management than I was before; I make more careful decisions when it comes to shopping; I save at least 10% of my total income every month; I set aside a certain amount for emergencies or unexpected events. Kết: So, if I had to talk about an event that changed me in a positive way, it would have to be this workshop.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about an event which has brought a positive change to my life. It was the day I attended a workshop on money management.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'Back in September 2015, when I was struggling to find a better way to manage my money, I suddenly saw an advert on the internet about a workshop on how to manage personal finances more effectively, which was exactly what I was looking for. I clicked the link and registered without any hesitation. It cost me around $50 for three hours, but it was absolutely worth it.', vi: 'Thông tin cơ bản: lý do dẫn tới sự kiện.' },
        { kind: 'model', text: 'I can\'t remember the exact date the workshop took place, but it was held in a large meeting room of a big hotel right in the city centre.', vi: 'Thông tin cơ bản: thời gian, địa điểm.' },
        { kind: 'model', text: 'I got up quite early that day because I was so excited about the workshop. After breakfast, I went to the bus station near my flat, and it took me nearly an hour to get there. There were two speakers who had lots of experience with financial management. I remember the first speaker talked about the factors leading to financial stress, credit card debt and other money-related issues that we were dealing with, while the second one showed us the most effective ways to tackle those problems. I learned a great deal from them.', vi: 'Cốt lõi: trước và trong sự kiện.' },
        { kind: 'model', text: 'I knew more about why I always struggled financially even though I earned quite a good salary. I learned more about how to track my daily spending more wisely and how much I needed to set aside as soon as I got my paycheck.', vi: 'Cảm nhận: học được gì.' },
        { kind: 'model', text: 'I still apply those methods to my daily life, and I feel that I\'m becoming much better at money management than I was before. I make more careful decisions when it comes to shopping, especially shopping for clothes and beauty products. I save at least 10% of my total income every month, and I set aside a certain amount for emergencies or unexpected events. So, if I had to talk about an event that changed me in a positive way, it would have to be this workshop.', vi: 'Cảm nhận: áp dụng, và kết.' },
        { kind: 'bad', text: 'I still apply those methods into my daily life.', vi: 'apply sth to sth: apply those methods to my daily life.' }
      ],
      practice: {
        type: 'speak',
        task: 'Kể về một sự kiện giúp bạn thay đổi tích cực trong khoảng 2 phút: lý do dẫn tới sự kiện (struggle to...), thời gian địa điểm (có thể dùng "I can\'t remember the exact date..."), nội dung chính, rồi cảm nhận theo hướng học được gì và áp dụng thế nào.',
        shadow: [
          'I\'m going to talk about an event which has brought a positive change to my life.',
          'I clicked the link and registered without any hesitation.',
          'It cost me around $50, but it was absolutely worth it.',
          'I still apply those methods to my daily life.'
        ],
        questions: [
          { part: 2, q: 'Describe an event that changed you in a positive way.', vi: 'Hãy tả một sự kiện đã thay đổi bạn theo hướng tích cực.', bullets: ['what the event was', 'when and where it happened', 'what happened', 'and explain how it changed you'] },
          { part: 2, q: 'Describe a course or workshop you attended.', vi: 'Hãy tả một khoá học hoặc buổi hội thảo bạn từng tham gia.', bullets: ['what it was about', 'when and where it took place', 'what you learned', 'and explain how it helped you'] },
          { part: 2, q: 'Describe a time when you learned something useful.', vi: 'Hãy tả một lần bạn học được điều gì đó hữu ích.', bullets: ['what you learned', 'when and where you learned it', 'how you learned it', 'and explain why it was useful'] }
        ]
      }
    },
    {
      id: 'hs28', video: 28, unit: 'Part 2: Describe a situation', minutes: 27,
      title: 'Part 2: Tả một tình huống (lần đi lạc trong rừng)',
      goal: 'Kể một tình huống thành câu chuyện có đầu, diễn biến, kết quả, dùng từ nối thời gian và từ chỉ cảm xúc.',
      points: [
        'Chủ đề mới: Describe a situation (when you got lost / when you were late for something / when you had to be polite). Vẫn 5 phần, nhưng thông tin cơ bản và cốt lõi gộp lại thành một câu chuyện có đầu, diễn biến, kết quả.',
        'Mở đầu: I\'m going to talk about a situation / a time when + paraphrase đề, không lặp nguyên "I got lost": ...when my friends and I got lost during our trip to explore the Black Forest.',
        'Trước khi nói, hình dung bức tranh lớn (đầu: đi cắm trại ở khu rừng; diễn biến: mải chơi tới tối, quên đường, bị lạc; kết quả: có người phát hiện và giúp), rồi chi tiết từng phần: khi nào, với ai, đi bằng gì; làm gì, mang gì, lạc lúc nào, cảm xúc ra sao; ai giúp, giúp thế nào.',
        'Từ nối diễn biến: At first / At the beginning; After that / Afterwards / After lunch / After hearing... / After learning that... / Two hours later; At that time / At that moment / At this point / Meanwhile / During my flight / On the way home; Eventually / Finally / Since then / From that moment.',
        'Từ cảm xúc (I felt / I was + tính từ). Tích cực: excited, cheerful, satisfied, motivated, touched, impressed. Tiêu cực: bored, lonely, disappointed, nervous, worried, scared, hopeless, confused, embarrassed. Câu chuyện hay có cảm xúc thay đổi (excited → scared → hopeless → relieved).',
        'Cụm hay: decide to V; set up our camp; set out to V (= bắt đầu làm gì); so + tính từ + that...; get back to; it was getting dark; torches; find our way back; traces or signs; go beyond; After + thời gian + of + V-ing; luckily for us; forest rangers who were on patrol (đang đi tuần); take sb back to. Có cơ hội thì so sánh để kéo dài: If we had got lost in the city, it would have been much easier to find the way back thanks to GPS.',
        'Cảm nhận: Whenever I think of that time when I..., I still feel...; hoặc From that moment, I knew that I needed to stay calm / think more carefully. Kết của dạng situation chỉ cần 1 câu cố định: So, this is the situation that I wanted to tell you about today.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about a situation when my friends and I got lost during our trip to explore the Black Forest.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'About two years ago, some of my friends and I decided to go camping in the Black Forest, which is one of the most famous tourist attractions in our town. It has an area called the safe zone where people are allowed to go camping or to explore plants and animals. I remember it took us nearly two hours to get to the forest and half an hour to set up our camp.', vi: 'Câu chuyện: phần đầu.' },
        { kind: 'model', text: 'After lunch, we set out to explore the safe zone. We did lots of things such as mushroom hunting and bird watching. We were all so excited that we forgot about the time. When we finally realised that we needed to get back to our camp, it was getting dark. We forgot to bring torches, so we had to use the lights on our mobile phones.', vi: 'Câu chuyện: diễn biến (1).' },
        { kind: 'model', text: 'If we had got lost in the city, it would have been much easier to find the way back thanks to GPS, but in the forest, we couldn\'t use it. It was almost impossible to find our way back because we couldn\'t find any traces or signs. We were all very scared and hoped that we hadn\'t gone beyond the safe zone.', vi: 'Câu chuyện: diễn biến (2), có so sánh.' },
        { kind: 'model', text: 'After nearly an hour of going around and feeling hopeless, we suddenly saw some lights. It seemed that someone else was also lost. Luckily for us, it was two forest rangers who were on patrol. They found us and took us back to our camp.', vi: 'Câu chuyện: kết quả.' },
        { kind: 'model', text: 'Whenever I think of that time when I was lost in the forest, I still feel scared. So, this is the situation that I wanted to tell you about today.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'We were all so excited so we forgot about the time.', vi: 'Cấu trúc so... that...: We were all so excited that we forgot about the time.' }
      ],
      practice: {
        type: 'speak',
        task: 'Chuẩn bị 1 phút: ghi 3 từ khoá cho đầu – diễn biến – kết quả và 2–3 cảm xúc. Rồi kể khoảng 2 phút, dùng ít nhất 4 từ nối thời gian (At first, After that, At that moment, Finally...) và kết bằng câu cố định của dạng situation.',
        shadow: [
          'We were all so excited that we forgot about the time.',
          'When we finally realised that we needed to get back, it was getting dark.',
          'Luckily for us, it was two forest rangers who were on patrol.',
          'Whenever I think of that time, I still feel scared.'
        ],
        questions: [
          { part: 2, q: 'Describe a situation when you got lost.', vi: 'Hãy tả một lần bạn bị lạc.', bullets: ['where you were', 'what you were doing', 'how you got lost', 'and explain how you felt and what happened in the end'] },
          { part: 2, q: 'Describe a situation when you were late for something.', vi: 'Hãy tả một lần bạn bị trễ.', bullets: ['what you were late for', 'why you were late', 'what happened', 'and explain how you felt about it'] },
          { part: 2, q: 'Describe a situation when you had to be polite.', vi: 'Hãy tả một lần bạn phải cư xử lịch sự.', bullets: ['when and where it happened', 'who you were with', 'why you had to be polite', 'and explain how you felt about it'] }
        ]
      }
    },
    {
      id: 'hs29', video: 29, unit: 'Part 2: Describe a situation', minutes: 23,
      title: 'Part 2: Tả một lần bạn bị trễ (lỡ hẹn bác sĩ)',
      goal: 'Kể tình huống bị trễ theo đầu – diễn biến – kết quả, có so sánh để kéo dài và cụm diễn tả sự vội vã.',
      points: [
        'Đề: Describe a situation when you were late for something. Mở đầu: I\'m going to talk about a situation when I was late for my appointment with my doctor (an appointment with sb = cuộc hẹn với ai).',
        'Lập dàn ý bằng câu hỏi: bối cảnh (bệnh gì, hẹn mấy giờ, ở đâu, bác sĩ thế nào) → diễn biến (vì sao quên giờ, trước cuộc hẹn làm gì, trễ bao lâu, cảm xúc) → kết quả (chờ bao lâu mới có lịch mới). Đặt càng nhiều câu hỏi càng dễ có ý.',
        'Đầu câu chuyện: suffer from + bệnh (gastritis = viêm dạ dày); visit my doctor every month for a check-up to make sure that it was not getting worse. So sánh để kéo dài: I didn\'t want to go to hospital because it was always overcrowded, so I decided to go to a private health centre. The doctors there were very experienced but very busy, so I needed to turn up on time (đến đúng giờ) if I didn\'t want to miss my appointment.',
        'Diễn biến: I got up quite early...; After breakfast, I looked at the clock and it was only 7:30; I had plenty of time to do other things; I was so immersed in the show that I forgot about the appointment (be immersed in = mải mê). Cụm diễn tả sự vội: grabbed my bag, rushed out of the house, called / ran for a taxi; the traffic was crazy; it took me 45 minutes to get to...',
        'Kết quả, câu dùng được cho nhiều đề: You can guess what happened next. I missed my appointment and had to wait for two weeks.',
        'Cảm nhận: Whenever I think of that time when I..., I still feel guilty (thấy có lỗi). On the way home that day, I constantly blamed myself for what had happened (blame sb for sth). Kết cố định: So, this is the situation that I wanted to tell you about today.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about a situation when I was late for my appointment with my doctor.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'I suffered from gastritis a year ago, so I had to visit my doctor every month for a check-up to make sure that it was not getting worse. I didn\'t want to go to hospital because it was always overcrowded, so I decided to go to a private health centre. The doctors there were very experienced, but they were also very busy. So, I needed to turn up on time if I didn\'t want to miss my appointment, which would mean that I would have to wait for at least a week for a new appointment.', vi: 'Câu chuyện: phần đầu (có so sánh).' },
        { kind: 'model', text: 'I remember it was a Sunday morning. I got up quite early because I knew that I had an appointment with my doctor at 9 am. After breakfast, I looked at the clock and it was only 7:30. The health centre was just 20 minutes from my house by taxi, so I had plenty of time to do other things. I turned on my laptop, opened YouTube and watched my favourite TV show about Vietnamese celebrities.', vi: 'Câu chuyện: diễn biến (1).' },
        { kind: 'model', text: 'I was so immersed in the show that I forgot about the appointment. When I looked at the clock, it was 8:45. I grabbed my bag, rushed out of the house and called a taxi. The traffic was crazy, and it took me 45 minutes to get to the health centre.', vi: 'Câu chuyện: diễn biến (2).' },
        { kind: 'model', text: 'You can guess what happened next. I missed my appointment and had to wait for two weeks, because at that time, the number of patients had increased quickly.', vi: 'Câu chuyện: kết quả.' },
        { kind: 'model', text: 'Whenever I think of that time when I missed my appointment with my doctor, I still feel guilty. On the way home that day, I constantly blamed myself for what had happened. So, this is the situation that I wanted to tell you about today.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'I was so immersed on the show that I forgot the appointment.', vi: 'be immersed in sth: so immersed in the show that I forgot about the appointment.' }
      ],
      practice: {
        type: 'speak',
        task: 'Kể một lần bạn bị trễ hoặc lỡ hẹn trong khoảng 2 phút: đầu câu chuyện (có 1 câu so sánh), diễn biến (có so... that... và cụm vội vã grabbed / rushed out of), kết quả (You can guess what happened next...), cảm nhận (guilty, blamed myself for...).',
        shadow: [
          'I needed to turn up on time if I didn\'t want to miss my appointment.',
          'I was so immersed in the show that I forgot about the appointment.',
          'I grabbed my bag, rushed out of the house and called a taxi.',
          'You can guess what happened next.'
        ],
        questions: [
          { part: 2, q: 'Describe a situation when you were late for something.', vi: 'Hãy tả một lần bạn bị trễ.', bullets: ['what you were late for', 'why you were late', 'what happened', 'and explain how you felt about it'] },
          { part: 2, q: 'Describe a time when you missed an important appointment.', vi: 'Hãy tả một lần bạn lỡ một cuộc hẹn quan trọng.', bullets: ['what the appointment was', 'why you missed it', 'what happened after that', 'and explain how you felt'] },
          { part: 2, q: 'Describe a time when you forgot something important.', vi: 'Hãy tả một lần bạn quên một việc quan trọng.', bullets: ['what you forgot', 'when it happened', 'what you did about it', 'and explain how you felt'] }
        ]
      }
    },
    {
      id: 'hs30', video: 30, unit: 'Part 2: Describe a situation', minutes: 23,
      title: 'Part 2: Tả một lần bạn phải cư xử lịch sự (xếp hàng ở sân bay)',
      goal: 'Kể tình huống phải lịch sự có hội thoại ngắn, cảm xúc thay đổi và bài học rút ra, mọi chi tiết bám đúng đề.',
      points: [
        'Đề: Describe a situation when you had to be polite. Mở đầu nói rõ tình huống thay vì lặp "I had to be polite": I\'m going to talk about a situation when I was queueing at the airport (queue = xếp hàng).',
        'Dàn ý: đầu (ra sân bay làm gì, với ai, mấy giờ) → diễn biến (khung cảnh, xếp hàng nào, ai chen ngang, mình nói gì, người kia đáp gì, cảm xúc) → kết quả (người đó về cuối hàng). Mọi chi tiết xoay quanh việc cư xử lịch sự để không lạc đề.',
        'Đầu câu chuyện: Last month, I went to visit Thailand with some of my friends. I remembered that our return flight would be taking off at 7:30, so we had to be at the airport at least an hour in advance for check-in. Tương lai tiếp diễn (will be + V-ing) cho việc diễn ra vào một thời điểm xác định trong tương lai; khi kể ở quá khứ thì will → would. Thời gian + in advance (two hours in advance = trước 2 tiếng).',
        'Diễn biến: we were amazed at the long lines of people waiting for check-in; I couldn\'t imagine how long we would have to wait for our turn; Everything was going normally when a man came out of nowhere and cut in front of me in the queue (chen ngang); I was shocked and almost lost my temper (suýt nổi nóng), but I knew that I needed to stay calm and be polite.',
        'Dùng hội thoại cho sinh động: I said politely, "Excuse me, there is a queue, and we need to wait in line." He said, "I know, but I\'m tired of waiting." (be tired of + V-ing). be polite = behave in the right way = behave politely. Câu điều kiện loại 3: It would have been rude if I had shouted or yelled at him in front of so many people.',
        'Kết quả: After learning that I had been waiting for that length of time, he slowly returned to the back of the queue.',
        'Cảm nhận: Whenever I think of that time, I still feel glad. I was very glad that I had controlled my temper and behaved politely (lose my temper ≠ control my temper). Now, I constantly remind myself that I have to stay calm in every situation, whether it\'s good or bad, so that I don\'t regret anything. Kết cố định của dạng situation. Ôn lại cả 3 bài situation.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about a situation when I was queueing at the airport. Last month, I went to visit Thailand with some of my friends. I remembered that our return flight would be taking off at 7:30, so we had to be at the airport at least an hour in advance for check-in.', vi: 'Mở đầu và đầu câu chuyện.' },
        { kind: 'model', text: 'When we got to the airport, we were amazed at the long lines of people waiting for check-in. We went to queue in line 1, and I couldn\'t imagine how long we would have to wait for our turn. Everything was going normally when a man came out of nowhere and suddenly cut in front of me in the queue. I was shocked and almost lost my temper, but I knew that I needed to stay calm and be polite.', vi: 'Diễn biến (1).' },
        { kind: 'model', text: 'I said politely, "Excuse me, there is a queue, and we need to wait in line." Then he said, "I know, but I\'m tired of waiting." After hearing what he said, I became very angry, but I needed to behave in the right way. It would have been rude if I had shouted or yelled at him in front of so many people, so I smiled and said, "I know, we\'re all tired. No one likes waiting, but we have to. I\'ve been waiting for nearly an hour."', vi: 'Diễn biến (2): hội thoại.' },
        { kind: 'model', text: 'After learning that I had been waiting for that length of time, he slowly returned to the back of the queue.', vi: 'Kết quả.' },
        { kind: 'model', text: 'Whenever I think of that time, I still feel glad. I was very glad that I had controlled my temper and behaved politely. Now, I constantly remind myself that I have to stay calm in every situation, whether it\'s good or bad, so that I don\'t regret anything. So, this is the situation that I wanted to tell you about today.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'It would have been rude if I shouted at him.', vi: 'Điều kiện loại 3 (việc trong quá khứ): if I had shouted at him.' }
      ],
      practice: {
        type: 'speak',
        task: 'Kể một tình huống bạn phải giữ lịch sự hoặc bình tĩnh trong khoảng 2 phút. Có ít nhất 1 câu hội thoại trích dẫn (I said politely, "..."), 2 cảm xúc khác nhau (shocked → glad...), và 1 bài học (Now, I constantly remind myself that...).',
        shadow: [
          'Everything was going normally when a man came out of nowhere.',
          'I was shocked and almost lost my temper, but I knew that I needed to stay calm.',
          'It would have been rude if I had shouted at him in front of so many people.',
          'I was very glad that I had controlled my temper.'
        ],
        questions: [
          { part: 2, q: 'Describe a situation when you had to be polite.', vi: 'Hãy tả một lần bạn phải cư xử lịch sự.', bullets: ['when and where it happened', 'who you were with', 'why you had to be polite', 'and explain how you felt about it'] },
          { part: 2, q: 'Describe a time when you had to stay calm.', vi: 'Hãy tả một lần bạn phải giữ bình tĩnh.', bullets: ['what happened', 'when and where it happened', 'why it was hard to stay calm', 'and explain how you felt afterwards'] },
          { part: 2, q: 'Describe a time when someone was rude to you.', vi: 'Hãy tả một lần có người cư xử thô lỗ với bạn.', bullets: ['who the person was', 'what they did', 'how you reacted', 'and explain how you felt about it'] }
        ]
      }
    },
    {
      id: 'hs31', video: 31, unit: 'Part 2: Describe an object', minutes: 27,
      title: 'Part 2: Tả một đồ vật (chiếc ghế lười trong nhà)',
      goal: 'Tả một đồ vật bằng khung 5 phần: nguồn gốc, vẻ bề ngoài (kích thước, màu, trọng lượng, chất liệu, hình dáng), công dụng và cảm nhận.',
      points: [
        'Chủ đề mới: Describe an object (an item of clothing bought for you / a piece of furniture in your home / a gift you gave or received). furniture là danh từ không đếm được nên nói a piece of furniture.',
        'Mở đầu: nói thẳng tên đồ vật + paraphrase đề: I\'m going to talk about my beanbag chair (ghế lười), which my friend gave me on my last birthday.',
        'Thông tin cơ bản: đồ từ đâu mà có. Tự mua: I bought it two years ago at a souvenir shop near where I live. Được tặng: My dad gave me a teddy bear for my 5th birthday (for my birthday thiên về món quà; on my birthday = vào hôm đó).',
        'Kéo dài bằng Ban đầu – Lúc sau: At first, I didn\'t know what to buy / what gift to give... because... Then, I realised / knew that... So I decided to buy / choose... Hoặc dùng chiến thuật đổi ý: định mua A, sau đó đổi sang B.',
        'Cốt lõi 1, vẻ bề ngoài: kích thước (It\'s quite small / big; It\'s huge, không nói very huge; so sánh: It\'s even bigger than me; số đo: It\'s about 50 cm long and 30 cm wide, số trước rồi mới long / wide / high / deep); màu (It\'s blue, but not exactly plain blue. It has some images of stars on it); trọng lượng (It\'s not too heavy. It weighs around 5 kilograms; It\'s even lighter than the last one); chất liệu (It\'s made of natural cotton / rubber / metal / plastic / wood / glass); hình dáng (circular, triangular, rectangular, square; It\'s shaped like a boot).',
        'Cốt lõi 2, chỗ đặt và công dụng: I put it by the window because I thought it was the perfect spot to...; I use it to + V / for + V-ing. Kéo dài: người khác cũng dùng: I\'m not the only one in my family who uses that chair... especially my little brother. (Mảng thứ 3, câu chuyện gắn với đồ vật, học ở bài sau.)',
        'Cảm nhận: đồ đó quan trọng, hữu ích, ý nghĩa ra sao; học được gì; giữ gìn thế nào; có thay không. Kéo dài: I\'m thinking of buying another one for my bedroom, but...; when it comes to beanbag chairs, the bigger the better. Kết: So, if I had to talk about a piece of furniture in my home, it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about my beanbag chair, which my friend gave me on my last birthday. She told me that at first, she didn\'t know what gift to give me because there were so many choices. But she knew that I had just moved into a new apartment and I had always wanted to have a big beanbag chair in my living room. So she decided to buy me one.', vi: 'Mở đầu và thông tin cơ bản (Ban đầu – Lúc sau).' },
        { kind: 'model', text: 'It\'s blue, but not exactly plain blue. It has some images of stars on it. It\'s huge. It\'s even bigger than me! But it\'s not too heavy. I think it weighs around 5 or 6 kilograms. It\'s made of natural cotton, so it\'s very soft and easy to wash.', vi: 'Cốt lõi: vẻ bề ngoài.' },
        { kind: 'model', text: 'I put it by the window because I thought it was the perfect spot to relax and enjoy fresh air and the beautiful view of my rose garden. I use it almost every day to read books, watch movies, or sometimes, I just sit and enjoy the view and do nothing.', vi: 'Cốt lõi: chỗ đặt và công dụng.' },
        { kind: 'model', text: 'I\'m not the only one in my family who uses that chair. All of my family members use it, and they really love it, especially my little brother. I think he could sit on that chair all day without feeling bored.', vi: 'Kéo dài: người khác cũng dùng.' },
        { kind: 'model', text: 'I have to say that I really love it; it\'s so comfortable, and it makes our living room more relaxing. I\'m thinking of buying another one for my bedroom, but my room is quite small for a big chair like that. I don\'t want to buy a small one because for me, when it comes to beanbag chairs, the bigger the better. So, if I had to talk about a piece of furniture in my home, it would have to be my beanbag chair.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'It\'s very huge, and it\'s the most perfect spot to relax.', vi: 'huge, perfect đã là mức cao nhất: It\'s huge; the perfect spot.' }
      ],
      practice: {
        type: 'speak',
        task: 'Tả một đồ vật trong khoảng 2 phút. Bắt buộc có: nguồn gốc (tự mua hoặc được tặng, kéo dài bằng At first... Then... So...), ít nhất 3 đặc điểm bề ngoài (có 1 câu so sánh hoặc số đo), công dụng (I use it to...), và 1 câu "I\'m thinking of...".',
        shadow: [
          'It\'s blue, but not exactly plain blue.',
          'It\'s even bigger than me!',
          'It\'s made of natural cotton, so it\'s very soft and easy to wash.',
          'When it comes to beanbag chairs, the bigger the better.'
        ],
        questions: [
          { part: 2, q: 'Describe a piece of furniture in your home.', vi: 'Hãy tả một món đồ nội thất trong nhà bạn.', bullets: ['what it is', 'where you got it', 'what it looks like', 'and explain why it is important to you'] },
          { part: 2, q: 'Describe a useful object you use every day.', vi: 'Hãy tả một đồ vật hữu ích bạn dùng mỗi ngày.', bullets: ['what it is', 'where you got it', 'how you use it', 'and explain why it is useful'] },
          { part: 2, q: 'Describe something you bought recently that you are happy with.', vi: 'Hãy tả một món bạn mới mua mà bạn rất hài lòng.', bullets: ['what it is', 'where you bought it', 'how much it cost', 'and explain why you are happy with it'] }
        ]
      }
    },
    {
      id: 'hs32', video: 32, unit: 'Part 2: Describe an object', minutes: 20,
      title: 'Part 2: Tả một món quần áo được tặng (chiếc áo phông)',
      goal: 'Tả quần áo bằng khung đồ vật: kéo dài từng câu một chút, tả kiểu dáng, màu, chất liệu, cách mặc và tặng ngược lại.',
      points: [
        'Đề: Describe an item of clothing bought for you. Mở đầu nói rõ món đồ và kéo dài dần từng chút: I\'m going to talk about a T-shirt that one of my best friends gave me on my last birthday, which was three months ago.',
        'Thông tin cơ bản, dùng lại Ban đầu – Lúc sau: She told me that at first, she didn\'t know what gift to give me because there were so many choices. But she knew that I liked wearing white T-shirts with some motivational quotes on them, so she decided to buy me one.',
        'Vẻ bề ngoài của quần áo: It\'s a basic T-shirt with short sleeves (tay ngắn) and a round neckline (cổ tròn); It\'s white, but not exactly plain white. It has some images of stars and an inspirational quote on it; It\'s made of pure cotton (100% cotton), so it\'s very soft and easy to wash. Được tưởng tượng chi tiết cho dễ dùng các công thức đã học.',
        'Nói ra câu chữ in trên áo để kéo dài: I really love the quote, which is "Your dream doesn\'t have an expiration date. Take a deep breath and try again."',
        'Công dụng của quần áo dùng động từ wear: I usually wear it when I hang out with my friends. It\'s very comfortable and easy to mix and match with my jeans. I can wear it with almost everything I have: jeans, shorts or skirts. Dùng lại cụm Part 1: It will never be out of fashion; white T-shirts are always trendy and stylish.',
        'Cảm nhận: Whenever I wear that T-shirt, I feel like I have more motivation, and whenever I fail to do something (fail to V), I look at the quote printed on the T-shirt, and it immediately lifts my spirits (vực tinh thần).',
        'Cách kéo dài thứ hai với "thinking of": tặng ngược lại người tặng mình: My friend\'s birthday is coming, and I\'m thinking of buying her a similar T-shirt with a different quote. One of the quotes that I love most is... Kết: So, if I had to talk about an item of clothing bought for me, it would have to be this T-shirt.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about a T-shirt that one of my best friends gave me on my last birthday, which was three months ago. She told me that at first, she didn\'t know what gift to give me because there were so many choices. But she knew that I liked wearing white T-shirts with some motivational quotes on them, so she decided to buy me one.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'It\'s a basic T-shirt with short sleeves and a round neckline. It is quite simple; it\'s white, but not exactly plain white. It has some images of stars and an inspirational quote on it. I really love the quote, which is "Your dream doesn\'t have an expiration date. Take a deep breath and try again." It\'s made of pure cotton, so it\'s very soft and easy to wash.', vi: 'Cốt lõi: vẻ bề ngoài.' },
        { kind: 'model', text: 'I usually wear it when I hang out with my friends. It\'s very comfortable and easy to mix and match with my jeans. I can wear it with almost everything I have: jeans, shorts or skirts. I think it will never be out of fashion. We can see that white T-shirts are always trendy and stylish.', vi: 'Cốt lõi: cách mặc.' },
        { kind: 'model', text: 'I have to say that I really love it. Whenever I wear that T-shirt, I feel like I have more motivation, and whenever I fail to do something, I often look at the quote printed on the T-shirt, and it immediately lifts my spirits.', vi: 'Cảm nhận.' },
        { kind: 'model', text: 'My friend\'s birthday is coming, and I\'m thinking of buying her a similar T-shirt with a different quote. One of the quotes that I love most is "Push yourself, because no one else is going to do it for you." I think I\'ll buy her a T-shirt with that quote. So, if I had to talk about an item of clothing bought for me, it would have to be this T-shirt.', vi: 'Kéo dài bằng tặng ngược lại, và kết.' },
        { kind: 'bad', text: 'I usually use it when I hang out with my friends.', vi: 'Với quần áo dùng wear: I usually wear it when...' }
      ],
      practice: {
        type: 'speak',
        task: 'Tả một món quần áo trong khoảng 2 phút: mở đầu kéo dài dần, nguồn gốc (At first... But... so...), kiểu dáng – màu – chất liệu, cách mặc (wear, mix and match with), cảm nhận, và 1 câu "I\'m thinking of buying..." cho mình hoặc để tặng người khác.',
        shadow: [
          'It\'s a basic T-shirt with short sleeves and a round neckline.',
          'It\'s white, but not exactly plain white.',
          'It\'s very comfortable and easy to mix and match with my jeans.',
          'I\'m thinking of buying her a similar T-shirt with a different quote.'
        ],
        questions: [
          { part: 2, q: 'Describe an item of clothing bought for you.', vi: 'Hãy tả một món quần áo ai đó đã mua cho bạn.', bullets: ['what it is', 'who bought it for you', 'when you wear it', 'and explain how you feel about it'] },
          { part: 2, q: 'Describe your favourite piece of clothing.', vi: 'Hãy tả món quần áo bạn thích nhất.', bullets: ['what it is', 'when you got it', 'when you wear it', 'and explain why it is your favourite'] },
          { part: 2, q: 'Describe something you wear on special occasions.', vi: 'Hãy tả thứ bạn mặc vào những dịp đặc biệt.', bullets: ['what it is', 'where you got it', 'when you wear it', 'and explain why you like wearing it'] }
        ]
      }
    },
    {
      id: 'hs33', video: 33, unit: 'Part 2: Describe an object', minutes: 21,
      title: 'Part 2: Tả một món quà bạn đã tặng (bức hình có câu nói truyền cảm hứng)',
      goal: 'Tả món quà đã tặng: giữ bí mật món quà để kéo dài, kể quá trình mua, câu chuyện của người nhận và thông điệp bạn muốn gửi.',
      points: [
        'Đề: Describe a gift you recently gave to someone (bài cuối nhóm đồ vật). Mở đầu kéo dài: I\'m going to talk about a gift that I gave to my younger sister on her 18th birthday, which was two months ago (thay recently bằng thời điểm cụ thể).',
        'Thông tin cơ bản dùng Ban đầu – Lúc sau, kéo dài thêm bằng cách chưa nói ngay món quà mà nói ý nghĩa trước: At first, I didn\'t know what gift to give her because there were so many choices. Then, I realised that after her birthday, she would enter university, which meant that she would have to live far from home. So, I decided to choose a gift that she could bring with her anywhere she went, and it had to be something meaningful. After two days of thinking, I eventually decided to buy her...',
        'Kể quá trình mua: There was a souvenir shop near where I live, so I went to the shop that afternoon. After looking for a while, I stopped at a photo with a quote that I found really inspiring. It read: "..." (It read = dòng chữ viết là).',
        'Vẻ bề ngoài: It\'s a simple photo. The quote is written in black on a white background (written in + màu, on a ... background). The frame is made of metal and painted black, but not exactly plain black. It has some images of stars on it.',
        'Cốt lõi theo hướng câu chuyện gắn với món quà, do người nhận kể lại: She told me that she hung it above her desk (hang – hung) because that was where she worked every day. Last month, she called me and said, "... whenever I feel like quitting (feel like + V-ing = muốn làm gì), I look at the photo, and it lifts my spirits immediately."',
        'Cảm nhận khi tặng quà: nói thông điệp muốn gửi: The reason why I chose this photo is that I wanted my sister to have faith in herself, to believe that she can do anything as long as she puts her heart into it... I wanted my sister to be stronger and more confident in her abilities (want sb to V).',
        'Kết: So, if I had to talk about a gift I recently gave to someone, it would have to be this photo. Ôn lại cả 3 bài đồ vật và ghi công thức vào vở.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about a gift that I gave to my younger sister on her 18th birthday, which was two months ago.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'At first, I didn\'t know what gift to give her because there were so many choices. Then, I realised that after her birthday, she would enter university, which meant that she would have to live far from home. So, I decided to choose a gift that she could bring with her anywhere she went, and it had to be something meaningful. After two days of thinking, I eventually decided to buy her a photo with an inspirational quote on it.', vi: 'Thông tin cơ bản: giữ bí mật món quà.' },
        { kind: 'model', text: 'There was a souvenir shop near where I live, so I went to the shop that afternoon. After looking for a while, I stopped at a photo with a quote that I found really inspiring. It read: "There are no limits to what you can accomplish, except the limits you place on your own thinking."', vi: 'Quá trình mua.' },
        { kind: 'model', text: 'It\'s a simple photo. The quote is written in black on a white background. The frame is made of metal and painted black, but not exactly plain black. It has some images of stars on it.', vi: 'Cốt lõi: vẻ bề ngoài.' },
        { kind: 'model', text: 'She told me that she hung it above her desk because that was where she worked every day. Last month, she called me and said, "Hey sis, do you remember the quote in the photo you gave me on my 18th birthday? It\'s so meaningful. Whenever I feel like quitting, I look at the photo, and it lifts my spirits immediately."', vi: 'Cốt lõi: câu chuyện của người nhận.' },
        { kind: 'model', text: 'The reason why I chose this photo is that I wanted my sister to have faith in herself, to believe that she can do anything as long as she puts her heart into it. I knew that living far away from home for the first time would be very difficult, and I wanted my sister to be stronger and more confident in her abilities. So, if I had to talk about a gift I recently gave to someone, it would have to be this photo.', vi: 'Cảm nhận (thông điệp) và kết.' },
        { kind: 'bad', text: 'I wanted my sister has faith in herself.', vi: 'want sb to V: I wanted my sister to have faith in herself.' }
      ],
      practice: {
        type: 'speak',
        task: 'Tả một món quà trong khoảng 2 phút: chưa nói ngay món quà (nói hoàn cảnh và ý nghĩa trước), kể quá trình mua, tả vẻ bề ngoài, 1 câu chuyện của người nhận, rồi thông điệp (The reason why I chose... is that I wanted... to...).',
        shadow: [
          'So, I decided to choose a gift that she could bring with her anywhere she went.',
          'After two days of thinking, I eventually decided to buy her a photo.',
          'The quote is written in black on a white background.',
          'I wanted my sister to have faith in herself.'
        ],
        questions: [
          { part: 2, q: 'Describe a gift you recently gave to someone.', vi: 'Hãy tả một món quà bạn mới tặng ai đó.', bullets: ['what the gift was', 'who you gave it to', 'why you chose it', 'and explain how the person felt about it'] },
          { part: 2, q: 'Describe a gift you received that was special to you.', vi: 'Hãy tả một món quà bạn nhận được và rất đặc biệt với bạn.', bullets: ['what it was', 'who gave it to you', 'when you received it', 'and explain why it was special'] },
          { part: 2, q: 'Describe a present you would like to give to a friend.', vi: 'Hãy tả một món quà bạn muốn tặng một người bạn.', bullets: ['who the friend is', 'what the present is', 'why you would choose it', 'and explain how you think your friend would feel'] }
        ]
      }
    },
    {
      id: 'hs34', video: 34, unit: 'Part 2: Describe your favourite', minutes: 27,
      title: 'Part 2: Tả thứ bạn yêu thích (trang web yêu thích)',
      goal: 'Biết đề "favourite" nào dùng lại khung cũ, đề nào phải tự lập dàn ý từ gợi ý You should say, và tả một trang web yêu thích.',
      points: [
        'Chủ đề cuối của Part 2: Describe your favourite... Chia 2 loại. Tổng hợp: favourite teacher (tả người), favourite piece of clothing (đồ vật), favourite restaurant (toà nhà), favourite country / city (vùng đất) → dùng lại khung đã học. Tự triển khai: favourite website, part of the day, wild animal → tự lập dàn ý.',
        'Cách tự triển khai: lấy các gợi ý You should say của đề (website loại gì, biết tới thế nào, cho phép làm gì, vì sao hữu ích), xếp vào 3 phần giữa (thông tin cơ bản, cốt lõi, cảm nhận); phần nói được nhiều nhất cho vào cốt lõi; rồi tự đặt thêm câu hỏi (thành lập khi nào, của ai, thiết kế ra sao, hay đọc chủ đề nào...).',
        'Mở đầu: I\'m going to talk about a website called tonyrobbins.com, which is one of the most useful websites that I\'ve ever visited.',
        'Thông tin cơ bản: I first heard about the website about two years ago when... (dùng được cho book, TV programme, advert). Kéo dài bằng cách kể vòng: bạn tặng sách → sách hay nên tìm hiểu tác giả → biết website: I have to say that this book is so inspirational and helpful that I decided to do more research about the author. That is how I found out about his useful website, which provides its readers with a wide range of skills, tips and strategies to make life more meaningful (provide sb with sth).',
        'Cốt lõi là nội dung: This website has thousands of articles about different aspects of life, such as career and business, love and relationships, leadership, health... (dùng lại các chủ đề của Writing Task 2). Chủ đề mình thích: I\'m more interested in... / I love... most, so I usually read articles related to these areas.',
        'Cảm nhận theo hướng học được gì: I\'ve learned a great deal from those articles. For example, the articles about productivity have taught me how to use time more wisely to get more things done...; reading articles about business helps me to know more about the steps that I could take to accomplish my goals. Lấy thêm ý từ bảng lý do thích, phần giáo dục, ở bài 2: learn various skills, manage my money better, widen my horizons, enrich my knowledge...',
        'Kết: So, if I had to talk about one of my favourite websites, it would have to be...'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about a website called tonyrobbins.com, which is one of the most useful websites that I\'ve ever visited.', vi: 'Mở đầu.' },
        { kind: 'model', text: 'I first heard about the website about two years ago when my friend gave me a book written by Tony Robbins on my birthday. The book is called Awaken the Giant Within. I have to say that this book is so inspirational and helpful that I decided to do more research about the author. That is how I found out about his useful website, which provides its readers with a wide range of skills, tips and strategies to make life more meaningful.', vi: 'Thông tin cơ bản: kể vòng.' },
        { kind: 'model', text: 'This website has thousands of articles about different aspects of life, such as career and business, love and relationships, leadership and impact, or health and vitality. If I have a problem, I feel like I can just go to his website and find the solution there. I\'m more interested in business and leadership, so I usually read articles related to these areas.', vi: 'Cốt lõi: nội dung.' },
        { kind: 'model', text: 'I\'ve learned a great deal from those articles. For example, the articles about productivity have taught me how to use time more wisely to get more things done, how to increase my work performance and how to have more energy to work more effectively. Another example is that I really want to start my own business in the future, and reading articles about business on his website helps me to know more about the steps that I could take to accomplish my goals.', vi: 'Cảm nhận: học được gì.' },
        { kind: 'model', text: 'So, if I had to talk about one of my favourite websites, it would have to be tonyrobbins.com.', vi: 'Kết.' },
        { kind: 'bad', text: 'It provides its readers a wide range of skills.', vi: 'provide sb with sth: provides its readers with a wide range of skills.' }
      ],
      practice: {
        type: 'speak',
        task: 'Trước khi nói, đọc các gợi ý của đề và xếp chúng vào thông tin cơ bản, cốt lõi, cảm nhận; tự thêm 1–2 câu hỏi. Rồi nói khoảng 2 phút, có "I first heard about... when...", một câu "so... that... I decided to..." và phần "I\'ve learned a great deal from...".',
        shadow: [
          'I first heard about the website about two years ago.',
          'That is how I found out about his useful website.',
          'I\'m more interested in business, so I usually read articles related to this area.',
          'I\'ve learned a great deal from those articles.'
        ],
        questions: [
          { part: 2, q: 'Describe your favourite website.', vi: 'Hãy tả trang web bạn yêu thích.', bullets: ['what type of website it is', 'how you found out about it', 'what it allows you to do', 'and explain why you find it useful'] },
          { part: 2, q: 'Describe your favourite book.', vi: 'Hãy tả cuốn sách bạn yêu thích.', bullets: ['what book it is', 'how you found out about it', 'what it is about', 'and explain why you like it'] },
          { part: 2, q: 'Describe a TV programme you enjoy watching.', vi: 'Hãy tả một chương trình TV bạn thích xem.', bullets: ['what it is', 'how you first heard about it', 'what it is about', 'and explain why you enjoy it'] }
        ]
      }
    },
    {
      id: 'hs35', video: 35, unit: 'Part 2: Describe your favourite', minutes: 26,
      title: 'Part 2: Tả khoảng thời gian yêu thích trong ngày (buổi sáng)',
      goal: 'Tự lập dàn ý cho đề "favourite" lạ: lý do 1 là một câu chuyện, lý do 2 là các hoạt động có chi tiết, cảm nhận về thói quen.',
      points: [
        'Đề: Describe your favourite part of the day (dạng tự triển khai). Gợi ý: What time of the day / What you do / Why that time is your favourite. Xếp: thông tin cơ bản = mấy giờ; cốt lõi = vì sao thích + làm gì; cảm nhận = cảm thấy thế nào hoặc học được gì.',
        'Mở đầu: I\'m going to talk about the morning, which is my favourite part of the day (the morning ở đây là buổi sáng nói chung).',
        'Thông tin cơ bản: I love the morning, especially the early morning, from 5 to 6 am, which I think is the ideal time of the day to watch the sunrise and enjoy the tranquillity of the city before it wakes up (dùng lại cụm Part 1: the ideal time of the day to...; không nhớ từ mới thì dùng breathtaking view).',
        'Cốt lõi, lý do 1 là kể chuyện: One of the reasons why I love the morning is that I have a story associated with it (gắn với nó). I consider myself a morning person (consider oneself + danh từ). I used to get up very late (used to + V = đã từng; khác be / get used to + V-ing = quen với). After a long period of getting up late and skipping breakfast, I realised that... That period was really a nightmare for me. Then one day, I decided to make a positive change... And I did it.',
        'Cốt lõi, lý do 2 kèm hoạt động: Another reason is that the early morning is the best time of the day when I can have some real "me time" (thời gian cho riêng mình). It\'s very quiet, so I can easily concentrate on anything I want to do. Kể hoạt động bằng spend + thời gian + V-ing, mỗi hoạt động thêm 1 chi tiết: I love spending the first 10 minutes doing some basic exercises. It\'s a great way to kick off a productive day.',
        'Cụm hay: look at my vision board, which reminds me of the goals I need to accomplish; look through my daily to-do list; go straight to the kitchen; prepare a healthy breakfast; tuna salad, boiled eggs with lots of veggies; listen to an audio book.',
        'Cảm nhận: I know it looks like a perfect morning, but I have to say that it took me a very long time to get into the habits of getting up early, exercising regularly... Now, I\'m still trying to maintain these habits. (Hoặc hướng học được gì: I\'ve learned a great deal from getting up early. It helps me...) Kết: So, if I had to talk about my favourite part of the day, it would have to be the morning.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about the morning, which is my favourite part of the day. I love the morning, especially the early morning, from 5 to 6 am, which I think is the ideal time of the day to watch the sunrise and enjoy the tranquillity of the city before it wakes up.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'One of the reasons why I love the morning is that I have a story associated with it that I want to tell you. I consider myself a morning person. I get up quite early, at around 5:30 am every morning, but I used to get up very late, around 9 or 10 am. After a long period of getting up late and skipping breakfast, I realised that my health was getting worse and I always felt tired. That period was really a nightmare for me. Then one day, I decided to make a positive change, which was getting up early, because I wanted to improve my health as well as my work productivity. And I did it.', vi: 'Cốt lõi, lý do 1: câu chuyện.' },
        { kind: 'model', text: 'Another reason is that I think the early morning is the best time of the day when I can have some real "me time". It\'s very quiet, so I can easily concentrate on anything I want to do. I love spending the first 10 minutes doing some basic exercises. It\'s a great way to kick off a productive day. Then, I spend the next 5 to 10 minutes looking at my vision board, which reminds me of the goals I need to accomplish this month or this year.', vi: 'Cốt lõi, lý do 2: hoạt động (1).' },
        { kind: 'model', text: 'Next, I look through my daily to-do list, which I usually prepare the night before. After that, I go straight to the kitchen and prepare a healthy breakfast. I usually have tuna salad or boiled eggs with lots of veggies for breakfast. After breakfast, I often read a book or listen to an audio book for 20 minutes before starting my work.', vi: 'Cốt lõi, lý do 2: hoạt động (2).' },
        { kind: 'model', text: 'I know it looks like a perfect morning, but I have to say that it took me a very long time to get into the habits of getting up early, exercising regularly, having a healthy breakfast and reading books in the morning. Now, I\'m still trying to maintain these habits. So, if I had to talk about my favourite part of the day, it would have to be the morning.', vi: 'Cảm nhận và kết.' },
        { kind: 'bad', text: 'I used to getting up very late.', vi: 'used to + V nguyên mẫu (đã từng): I used to get up very late. Còn quen với: I\'m used to getting up early.' }
      ],
      practice: {
        type: 'speak',
        task: 'Lập dàn ý từ gợi ý của đề (thời điểm → thông tin cơ bản; làm gì và vì sao thích → cốt lõi; cảm nhận). Nói khoảng 2 phút, có 1 câu chuyện "I used to... Then one day, I decided to...", 2–3 hoạt động với spend + thời gian + V-ing, mỗi hoạt động thêm 1 chi tiết.',
        shadow: [
          'I consider myself a morning person.',
          'I used to get up very late, around 9 or 10 am.',
          'It\'s a great way to kick off a productive day.',
          'It took me a very long time to get into the habit of getting up early.'
        ],
        questions: [
          { part: 2, q: 'Describe your favourite part of the day.', vi: 'Hãy tả khoảng thời gian bạn thích nhất trong ngày.', bullets: ['what time of the day it is', 'what you usually do then', 'and explain why it is your favourite'] },
          { part: 2, q: 'Describe a good habit you have.', vi: 'Hãy tả một thói quen tốt của bạn.', bullets: ['what the habit is', 'when you started it', 'how it helps you', 'and explain how you keep it'] },
          { part: 2, q: 'Describe a time of the year you enjoy most.', vi: 'Hãy tả khoảng thời gian trong năm bạn thích nhất.', bullets: ['what time of the year it is', 'what the weather is like', 'what you do then', 'and explain why you enjoy it'] }
        ]
      }
    },
    {
      id: 'hs36', video: 36, unit: 'Part 2: Describe your favourite', minutes: 27,
      title: 'Part 2: Tả loài động vật hoang dã yêu thích (con báo)',
      goal: 'Tả một loài động vật: nơi sống, vẻ ngoài, cách săn mồi và cảm nhận, với các cụm dùng được cho hầu hết loài vật.',
      points: [
        'Đề: Describe your favourite wild animal (bài cuối Part 2). Gợi ý: what the animal is and what it looks like / where it lives / how you feel about it. Gợi ý ít thì tự thêm: đã từng thấy chưa, cách săn mồi, sống theo bầy hay riêng lẻ...',
        'Mở đầu: I\'m going to talk about leopards, which are one of my favourite wild animals. Nói về cả một loài: dùng số nhiều (leopards are...) hoặc the + số ít (the leopard is...).',
        'Thông tin cơ bản. Nơi sống: Leopards can be found in various places such as sub-Saharan Africa, eastern and southern Asia, India and China. Môi trường sống: They live in a variety of habitats including rainforests, mountains, grasslands and deserts. Đã thấy chưa: I\'ve never had the chance to see a leopard in the wild, but I saw one at the zoo near where I live.',
        'Cốt lõi, vẻ bề ngoài (dùng lại công thức bài đồ vật): They are quite small compared to lions or tigers. An adult leopard can weigh between 30 and 90 kilograms (weigh + số). Bộ phận dùng được cho hầu hết con vật: relatively short / long limbs (chi), a long body, a long tail, black fur (lông), green / yellow eyes. Đặc điểm nhận dạng: They are distinguished by their unique and attractive fur.',
        'Cốt lõi, cách săn mồi (dùng cho hổ, sư tử...): When it comes to their hunting techniques, leopards are supremely skilled hunters. I\'ve watched lots of videos about leopards hunting in the wild, and I\'m really amazed by their strategies to stalk (rình) and kill their prey (con mồi). Cụm: choose their target very carefully, keep their heads low, bend their legs, approach as close as possible, wait until they think it\'s the right time to attack, take down their prey with a bite to the neck or throat.',
        'Cảm nhận, 2 hướng. Học được gì: I\'ve learned a great deal from leopards. By watching documentaries about them, I\'ve learned how to make more careful decisions / be more patient. Hoặc cảm thấy thế nào: The sad thing is that in recent years, the number of wild leopards has declined dramatically because of habitat loss (mất môi trường sống), illegal hunting and poaching (săn trộm). I really hope that governments and wildlife conservationists will do more to protect these animals.',
        'Kết: So, if I had to talk about my favourite wild animal, it would have to be the leopard. Đây là video cuối Part 2: ôn lại toàn bộ trước khi sang Part 3.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m going to talk about leopards, which are one of my favourite wild animals. Leopards can be found in various places such as sub-Saharan Africa, eastern and southern Asia, India and China. They live in a variety of habitats including rainforests, mountains, grasslands and deserts. I\'ve never had the chance to see a leopard in the wild, but I saw one at the zoo near where I live.', vi: 'Mở đầu và thông tin cơ bản.' },
        { kind: 'model', text: 'They are quite small compared to lions or tigers. An adult leopard can weigh between 30 and 90 kilograms. They have relatively short limbs and a long body. They are distinguished by their unique and attractive fur. I think this is the reason why a large number of leopards have been hunted, which is so sad.', vi: 'Cốt lõi: vẻ bề ngoài.' },
        { kind: 'model', text: 'When it comes to their hunting techniques, leopards are supremely skilled hunters. I\'ve watched lots of videos about leopards hunting in the wild, and I\'m really amazed by their strategies to stalk and kill their prey. They choose their target very carefully and are willing to wait until they think it\'s the right time to attack. They try to approach as close as possible and take down their prey with a bite to the neck or throat.', vi: 'Cốt lõi: cách săn mồi.' },
        { kind: 'model', text: 'The sad thing is that in recent years, the number of wild leopards has declined dramatically because of habitat loss, illegal hunting and poaching. I really hope that governments and wildlife conservationists will do more to protect these animals. So, if I had to talk about my favourite wild animal, it would have to be the leopard.', vi: 'Cảm nhận và kết.' },
        { kind: 'model', text: 'I\'ve learned a great deal from leopards. By watching documentaries about them, I\'ve learned how to make more careful decisions and how to be more patient.', vi: 'Cảm nhận theo hướng học được gì.' },
        { kind: 'bad', text: 'The number of wild leopards have declined dramatically.', vi: 'The number of... là chủ ngữ số ít: has declined.' }
      ],
      practice: {
        type: 'speak',
        task: 'Tả một loài động vật trong khoảng 2 phút: nơi sống và môi trường sống, đã thấy chưa, vẻ bề ngoài (kích thước, cân nặng, 2–3 bộ phận, đặc điểm nhận dạng), một điều đặc biệt (cách săn mồi hoặc cách sống), rồi cảm nhận.',
        shadow: [
          'Leopards can be found in various places such as Africa and Asia.',
          'They are distinguished by their unique and attractive fur.',
          'When it comes to their hunting techniques, leopards are supremely skilled hunters.',
          'The number of wild leopards has declined dramatically because of habitat loss.'
        ],
        questions: [
          { part: 2, q: 'Describe your favourite wild animal.', vi: 'Hãy tả loài động vật hoang dã bạn yêu thích.', bullets: ['what the animal is and what it looks like', 'where it lives', 'and explain how you feel about this animal'] },
          { part: 2, q: 'Describe an animal that is important in your country.', vi: 'Hãy tả một loài vật quan trọng ở nước bạn.', bullets: ['what animal it is', 'what it looks like', 'why it is important', 'and explain how you feel about it'] },
          { part: 2, q: 'Describe a zoo or wildlife park you have visited.', vi: 'Hãy tả một sở thú hoặc công viên động vật hoang dã bạn từng đến.', bullets: ['where it is', 'when you went there', 'what animals you saw', 'and explain how you felt about the visit'] }
        ]
      }
    },
    {
      id: 'hs37', video: 37, unit: 'Part 3', minutes: 30,
      title: 'Part 3: Lưu ý quan trọng và 4 cách trả lời (dạng Agree or Disagree)',
      goal: 'Biết cách xin giám khảo nhắc lại, câu kéo dài thời gian suy nghĩ, và 4 cách triển khai câu trả lời Part 3: liệt kê, tuỳ trường hợp, nói điều ngược lại, ví dụ.',
      points: [
        'Part 3 hỏi sâu, học thuật hơn về chủ đề của Part 2. Lưu ý 1, không nghe rõ hoặc không hiểu thì đề nghị giám khảo: I\'m sorry, I didn\'t catch that. Could you speak more slowly, please? / Could you repeat that, please? / Could you explain the word "workaholics" to me, please?',
        'Lưu ý 2, câu kéo dài thời gian suy nghĩ: Well, I\'m not sure because I don\'t know much about..., but I guess... / That\'s a difficult question. To be honest, I don\'t know much about..., but if I had to guess, I would say...',
        'Trả lời trực tiếp trước: I completely / totally agree with that. / I completely disagree with that. / I don\'t really agree with that. Rồi triển khai bằng 1 trong 4 cách dưới đây; khi làm bài thật thường kết hợp nhiều cách.',
        'Cách 1, liệt kê: First / The first reason is that... Second / Another reason is that... Finally,... Bí ý thì chép nội dung chính của câu hỏi lên Google, đọc vài bài báo đầu, ghi lại ý và từ vựng (ví dụ: celebrities have a great impact on the spending habits of ordinary people; young people are vulnerable to celebrities).',
        'Cách 2, tuỳ trường hợp: I think it really depends (on...). If..., then I would say yes... However, if..., then I don\'t think... (involve + V-ing = bao gồm việc gì).',
        'Cách 3, nói điều ngược lại: nêu lý do rồi nói viễn cảnh ngược lại: If we teach children about financial management at an early age, they might not face the problems that many young adults do now. These days, a lot of young adults are struggling financially and are burdened with thousands of dollars in credit card debt (be burdened with sth)...',
        'Cách 4, ví dụ: lý do → triển khai → ví dụ cụ thể: when we reach the age of 18 (reach the age of + số), we are mature enough to make our own decisions (tính từ + enough to V)... We can actually do basic things, such as cooking, paying bills and managing our own money.',
        'Cụm hay: whether A or B (không biết A hay B); have a great / detrimental impact on; the spending habits of; be willing to; pay huge amounts of money; dress up (mặc trang trọng); do paperwork; live on their own.'
      ],
      examples: [
        { kind: 'model', text: 'I\'m sorry, I didn\'t catch that. Could you speak more slowly, please? / Could you repeat that, please? / Could you explain the word "workaholics" to me, please?', vi: 'Đề nghị giám khảo.' },
        { kind: 'model', text: 'That\'s a difficult question. To be honest, I don\'t know much about this topic, but if I had to guess, I would say...', vi: 'Kéo dài thời gian suy nghĩ.' },
        { kind: 'model', text: 'I don\'t really agree with that. First, a lot of celebrities don\'t actually use the products they advertise, so they don\'t really know whether those products are good or bad. Another reason is that they do it mainly because of the money they get. Celebrities have a great impact on the spending habits of ordinary people, especially their fans. So, companies are willing to pay huge amounts of money to hire famous people to advertise their products on TV.', vi: 'Cách 1, liệt kê. Câu hỏi: Do you agree that famous people should be used to advertise products on TV?' },
        { kind: 'model', text: 'I think it really depends. If they have to meet with clients every day, then I would say yes. They should definitely dress up for their clients. However, if their work only involves sitting at their desks and doing paperwork, then I don\'t think they need to wear very formal clothes because it is not necessary, and it would make them feel uncomfortable.', vi: 'Cách 2, tuỳ trường hợp. Câu hỏi: Should office workers all wear very formal clothes?' },
        { kind: 'model', text: 'Yes, it would be a great idea for children to learn about money management skills at school. I think if we teach children about financial management at an early age, they might not face the problems that many young adults do now. These days, a lot of young adults are struggling financially and are burdened with thousands of dollars in credit card debt. I think the main reason for this is that they didn\'t have a chance to learn how to manage their money at school.', vi: 'Cách 3, điều ngược lại. Câu hỏi: Should schools teach children how to manage money?' },
        { kind: 'model', text: 'Yes, I think 18 is the perfect age for young adults to live on their own. This is because when we reach the age of 18, I think we are mature enough to make our own decisions and to explore the outside world. At that age, I don\'t think we need our parents to be with us all the time. We can actually do basic things, such as cooking, paying bills and managing our own money.', vi: 'Cách 4, ví dụ. Câu hỏi: Is there a right age for young adults to stop living with their parents?' },
        { kind: 'bad', text: 'We are enough mature to make our own decisions.', vi: 'enough đứng sau tính từ: mature enough to make our own decisions.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu: trả lời trực tiếp (agree / disagree / it depends) rồi triển khai bằng ít nhất 1 trong 4 cách (liệt kê, tuỳ trường hợp, điều ngược lại, ví dụ), cố kết hợp 2 cách. Bí ý thì dùng câu kéo dài thời gian suy nghĩ trước.',
        shadow: [
          'I\'m sorry, I didn\'t catch that. Could you repeat that, please?',
          'That\'s a difficult question, but if I had to guess, I would say...',
          'I think it really depends.',
          'Another reason is that they do it mainly because of the money they get.'
        ],
        questions: [
          { part: 3, q: 'Do you agree that children should be allowed to use smartphones at school?', vi: 'Bạn có đồng ý rằng trẻ em nên được dùng điện thoại ở trường không?' },
          { part: 3, q: 'Do you agree that celebrities should be role models for young people?', vi: 'Bạn có đồng ý rằng người nổi tiếng nên là hình mẫu cho người trẻ không?' },
          { part: 3, q: 'Do you agree or disagree that people should retire at the age of 60?', vi: 'Bạn đồng ý hay không với việc mọi người nên nghỉ hưu ở tuổi 60?' },
          { part: 3, q: 'Do you agree that it is better to work for a big company than a small one?', vi: 'Bạn có đồng ý rằng làm cho công ty lớn tốt hơn công ty nhỏ không?' }
        ]
      }
    },
    {
      id: 'hs38', video: 38, unit: 'Part 3', minutes: 40,
      title: 'Part 3: Dạng Advantages and disadvantages',
      goal: 'Trả lời câu hỏi lợi ích, bất lợi ở Part 3 bằng câu giới thiệu + liệt kê có triển khai, kết hợp ví dụ và câu chốt.',
      points: [
        'Câu hỏi thường gặp: What disadvantages are there in a society where the gap between rich and poor is very large? / What are the advantages and disadvantages of wearing uniforms at work? / Are there any disadvantages of working from home? / What are the advantages of living in the countryside compared to the city? / What benefits do international sporting events bring? Câu dài thì bắt các từ khoá chính.',
        'Cách trả lời: câu giới thiệu + liệt kê (kết hợp triển khai, ví dụ). Câu giới thiệu: There are many / several / numerous / a range of / loads of advantages (benefits) / disadvantages (drawbacks) of...; hoặc X brings / has numerous benefits...',
        'Liệt kê: Firstly / First,... Secondly / Second,... Finally,... Đề hỏi cả lợi lẫn hại thì chuyển sang phần hại bằng Regarding the drawbacks,... (= In terms of / Speaking of). Đổi cách nói: advantages and disadvantages = pros and cons = benefits and drawbacks.',
        'Câu chốt để kéo dài khi câu trả lời còn ngắn: So, those are some of the advantages / drawbacks of X. / So, those are some of the pros and cons that I can think of when it comes to X.',
        'Mỗi ý phải có triển khai hoặc ví dụ, không liệt kê suông. Bí ý thì dùng mẹo bài trước: tìm từ khoá trên Google, đọc vài bài báo.',
        'Cụm về đồng phục và làm việc ở nhà: create a sense of team spirit, reach a common goal, boost work productivity, spend time wondering what to wear, be required to, uncomfortable and unfashionable, prevent creativity; easily distracted by things like movies, games or social media, lower their work productivity, have fewer opportunities to develop social skills, interact directly with colleagues or clients.',
        'Cụm về xã hội, nông thôn, sự kiện thể thao: lead to social instability, protests and strikes, growing income inequality, higher levels of crime, those who can hardly afford even their most basic needs, regardless of whether it is legal or not, engage in criminal activities, pose a serious threat to society; respiratory problems such as asthma, beneficial for mental health, the pace of life; the host country, boost the tourism industry and the local economy, invest money in improving infrastructure and facilities, local residents benefit from, improve their living standards.'
      ],
      examples: [
        { kind: 'model', text: 'Wearing uniforms at work has some benefits. Firstly, it helps create a sense of team spirit. When I walk into an office and see all the employees wearing uniforms, I feel like they are a team trying to reach a common goal. Secondly, it can boost work productivity because employees, especially those who love fashion, don\'t have to spend time wondering what they should wear every day, so they have more time to focus on their work.', vi: 'Đồng phục: lợi ích.' },
        { kind: 'model', text: 'Regarding the drawbacks, some people who are required to wear uniforms every day may feel uncomfortable and unfashionable. Uniforms may also prevent creativity. It\'s really hard for me to be creative if I work in an environment where everyone looks the same. So, those are some of the pros and cons that I can think of when it comes to wearing uniforms at work.', vi: 'Đồng phục: bất lợi và câu chốt.' },
        { kind: 'model', text: 'I think working from home has some drawbacks. Firstly, those who work from home are easily distracted by things like movies, games or social media. Instead of focusing on work, they may spend hours on these distractions, which can lower their work productivity. Secondly, they have fewer opportunities to develop social skills because they have little time to interact directly with their colleagues or clients.', vi: 'Làm việc ở nhà: bất lợi.' },
        { kind: 'model', text: 'There are loads of drawbacks when we live in a society with a big gap between the rich and the poor. First, if the gap between the wealthy and the poor increases, this can lead to social instability. For example, we can see protests and strikes taking place more frequently in impoverished areas. Second, growing income inequality can lead to higher levels of crime. Those who can hardly afford even their most basic needs, such as food, may be willing to do anything, regardless of whether it is legal or not, just to survive.', vi: 'Khoảng cách giàu nghèo: bất lợi.' },
        { kind: 'model', text: 'Living in the countryside brings a wide range of benefits compared to living in major cities. First, there\'s less traffic, so there\'s less pollution. The air is much cleaner, and not too many people suffer from respiratory problems such as asthma. Second, it\'s beneficial for mental health because the pace of life is slower and more peaceful than in the city, where an increasing number of people suffer from stress and anxiety disorders.', vi: 'Sống ở nông thôn: lợi ích.' },
        { kind: 'model', text: 'International sporting events such as the World Cup or the Olympic Games can bring a great number of benefits. First, the host country receives a huge number of tourists, which boosts the tourism industry and the local economy. Second, before the event, the host country needs to invest money in improving infrastructure and facilities such as roads and stadiums, and local residents will benefit from these improvements. Finally, the preparation provides more job opportunities for local people, helping them increase their income and improve their living standards.', vi: 'Sự kiện thể thao quốc tế: lợi ích.' },
        { kind: 'bad', text: 'Instead of focus on work, they engage in distractions.', vi: 'Sau instead of dùng V-ing: instead of focusing on work; "engage in distractions" không tự nhiên, nói: they spend hours on these distractions.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu: 1 câu giới thiệu (There are several benefits / drawbacks of... hoặc X brings numerous benefits), 2–3 ý liệt kê có triển khai hoặc ví dụ, đề hỏi cả hai mặt thì dùng Regarding the drawbacks, và kết bằng câu chốt.',
        shadow: [
          'There are several drawbacks of working from home.',
          'Regarding the drawbacks, some people may feel uncomfortable.',
          'So, those are some of the pros and cons that I can think of.',
          'It helps create a sense of team spirit.'
        ],
        questions: [
          { part: 3, q: 'What are the advantages and disadvantages of online shopping?', vi: 'Mua sắm trực tuyến có những lợi ích và bất lợi gì?' },
          { part: 3, q: 'Are there any disadvantages of living in a big city?', vi: 'Sống ở thành phố lớn có bất lợi gì không?' },
          { part: 3, q: 'What benefits does tourism bring to a country?', vi: 'Du lịch mang lại lợi ích gì cho một đất nước?' },
          { part: 3, q: 'What are the pros and cons of children having smartphones?', vi: 'Trẻ em có điện thoại thông minh có những mặt lợi và hại gì?' }
        ]
      }
    },
    {
      id: 'hs39', video: 39, unit: 'Part 3', minutes: 29,
      title: 'Part 3: Dạng Predictions (dự đoán tương lai)',
      goal: 'Trả lời câu hỏi dự đoán tương lai bằng câu mở rào đón, 2–3 dự đoán có lý do và câu chốt, đúng ngữ pháp will / might / bị động tương lai.',
      points: [
        'Dạng Predictions (= forecasts), câu hỏi về tương lai: How do you think home designs will change in the future? / What important events do you think might take place in the future? / Do you think life will be more stressful in the future? / How do you think people\'s free time activities will change in the next 10 years? / How do you think censorship laws will change in the next 20 years? (censorship = kiểm duyệt).',
        'Mở câu trả lời: trả lời thẳng (I think... / Yes, I think so.) hoặc mở dài hơn (cô hay dùng): Well, I\'m not sure because I don\'t know much about..., but I guess... / Well, it\'s hard to say what the future will bring, but I think... / Well, no one knows what the future holds, but I think...',
        'Sau đó nêu 2–3 dự đoán, mỗi dự đoán có lý do hoặc chi tiết. Kết bằng: That\'s all I can think of (when it comes to...).',
        'Ngữ pháp dự đoán: will / might / may + V; bị động tương lai: houses will be designed..., natural building materials might be used..., new laws will be introduced; rút gọn mệnh đề quan hệ chủ động: more people competing for jobs, people engaging in online activities. Sau hope có thể dùng hiện tại đơn cho việc tương lai: I hope these events never happen.',
        'Cụm về nhà cửa: in a more environmentally friendly way, natural building materials instead of artificial ones, more storeys, overpopulation and a scarcity of land (khan hiếm đất), energy-efficient, take advantage of natural light.',
        'Cụm về cuộc sống và sự kiện: the world population will continue to increase, compete for jobs and houses, make ends meet (kiếm đủ sống), the cost of living will rise dramatically, cope with; major events such as nuclear wars, fatal epidemics or asteroid collisions; like I said earlier; thanks to technological and scientific breakthroughs; future generations.',
        'Cụm về sở thích và kiểm duyệt: people hardly ever change their hobbies; The one thing that I can think of is that...; stricter regulations; be censored more carefully; reduce the amount of violence; when it comes to programmes for children; internet censorship; have less privacy; comment sections.'
      ],
      examples: [
        { kind: 'model', text: 'Well, I\'m not sure because I don\'t know much about architecture, but I guess houses will be designed in a more environmentally friendly way. Natural building materials might be used instead of artificial ones. Houses may also have more storeys because of overpopulation and a scarcity of land. I think houses will be more energy-efficient; maybe they will have more windows to take advantage of natural light. That\'s all I can think of.', vi: 'Thiết kế nhà trong tương lai.' },
        { kind: 'model', text: 'Yes, I think so. I think the world population will continue to increase, so there\'ll be more people competing for jobs, houses and many other things. Life will be extremely hard, especially for poor people who might find it more difficult to make ends meet. And I think the cost of living will also rise dramatically. People will have to work much harder to cope with it.', vi: 'Cuộc sống sẽ căng thẳng hơn?' },
        { kind: 'model', text: 'Well, it\'s hard to say what the future will bring, but I think some major events might happen, such as nuclear wars, fatal epidemics or asteroid collisions. I hope these events never ever happen, but like I said earlier, we don\'t know what the future holds. Perhaps thanks to technological and scientific breakthroughs, future generations will live on another planet where there will be less pollution and less traffic, and life will be much easier compared to life on Earth.', vi: 'Sự kiện quan trọng trong tương lai.' },
        { kind: 'model', text: 'I don\'t think people\'s hobbies will change much in the next decade because I think people hardly ever change their hobbies. When they love to do something, I think they will continue to do it even when they\'re older. The one thing that I can think of is that there\'ll be more people engaging in online free-time activities, such as browsing the internet or watching online movies, rather than reading or playing outdoor games.', vi: 'Hoạt động lúc rảnh trong 10 năm tới.' },
        { kind: 'model', text: 'I think there\'ll be stricter regulations when it comes to censorship. I think movies, TV programmes and newspapers will be censored more carefully to reduce the amount of violence, especially when it comes to programmes for children. I also think some new laws will be introduced to increase internet censorship. Internet users will have less privacy, so people will have to be more careful when they want to post or write something on Facebook or in comment sections.', vi: 'Luật kiểm duyệt trong 20 năm tới.' },
        { kind: 'bad', text: 'In the future, houses will design in a more environmentally friendly way.', vi: 'Nhà được thiết kế nên dùng bị động: houses will be designed...' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu: mở bằng 1 câu rào đón (Well, it\'s hard to say what the future will bring, but I think...), nêu 2–3 dự đoán có lý do (dùng will / might / may và ít nhất 1 câu bị động tương lai), kết bằng That\'s all I can think of.',
        shadow: [
          'Well, it\'s hard to say what the future will bring, but I think...',
          'Well, no one knows what the future holds.',
          'Natural building materials might be used instead of artificial ones.',
          'That\'s all I can think of.'
        ],
        questions: [
          { part: 3, q: 'How do you think transport will change in the future?', vi: 'Bạn nghĩ giao thông sẽ thay đổi thế nào trong tương lai?' },
          { part: 3, q: 'Do you think people will read fewer books in the future?', vi: 'Bạn có nghĩ trong tương lai người ta sẽ đọc ít sách hơn không?' },
          { part: 3, q: 'How might schools be different in 20 years?', vi: 'Trường học có thể khác đi thế nào sau 20 năm nữa?' },
          { part: 3, q: 'What jobs do you think will disappear in the future?', vi: 'Bạn nghĩ những nghề nào sẽ biến mất trong tương lai?' }
        ]
      }
    },
    {
      id: 'hs40', video: 40, unit: 'Part 3', minutes: 30,
      title: 'Part 3: Dạng Differences (sự khác nhau)',
      goal: 'Nói sự khác nhau giữa 2 đối tượng bằng câu mở, 2 vế so sánh có chi tiết và câu chốt, dùng lại cụm từ các bài trước.',
      points: [
        'Dạng Differences: nêu sự khác nhau giữa A và B. Câu hỏi thường gặp: celebrities in the past and nowadays / the clothes young and old people like to wear / being a boss and working for others / traditional and modern education systems / houses built in the past and now.',
        'Mở câu trả lời: thẳng I think..., hoặc dài hơn: I think the main difference is that... / I think there are many differences between A and B. Rồi nêu khác biệt có chi tiết. Kết: That\'s all I can think of (when it comes to the differences between A and B).',
        'Nối 2 vế bằng while / whereas / However,...; nói dễ, khó: it\'s much easier / more difficult for sb to V (it\'s hard for you not to think about your business).',
        'Làm chủ và làm thuê: When you are the CEO of a company, you have to worry about all sorts of things, such as sales figures, monthly profits, monthly expenses and marketing strategies; get your work done (làm xong việc); be completely relaxed at home; earn a stable income; your income depends on how your business is growing.',
        'Người nổi tiếng: become celebrities overnight just by creating a big scandal; be in the headlines of famous newspapers; it was much more difficult for ordinary people to appear in the media; have real talent.',
        'Quần áo: youngsters tend to follow fashion; clothes that are considered trendy and stylish (be considered + tính từ); don\'t pay much attention to the traditional values attached to the clothes they wear; elderly people are more likely to wear clothes that are associated with their traditions (attached to = associated with); on special occasions like Tet or weddings; ao dai, a traditional Vietnamese garment.',
        'Giáo dục và nhà ở (dùng lại câu của bài How has X changed và bài dự đoán): get a university qualification, attend classes, offer online learning courses, which allow students to study at their own pace and at any time they prefer; learning materials, tonnes of materials are available online; due to a scarcity of land and overpopulation, high-rise buildings, a yard or garden, skyscrapers and tall apartment blocks dominate.',
        'Đây là video cuối của khoá. Lời khuyên của cô: dùng đi dùng lại một cấu trúc cho nhiều câu trả lời khác nhau thì sẽ nhớ cấu trúc đó rất lâu.'
      ],
      examples: [
        { kind: 'model', text: 'I think there are many differences between working as a boss and working as an employee. When you are the CEO of a company, for example, you have to worry about all sorts of things, such as sales figures, monthly profits, monthly expenses and marketing strategies. Even when you\'re at home, it\'s hard for you not to think about your business. However, if you are an employee, you just need to get your work done, and then you can be completely relaxed at home. You earn a stable income every month, while if you work for yourself, your income depends on how your business is growing.', vi: 'Làm chủ và làm thuê.' },
        { kind: 'model', text: 'I think nowadays it\'s much easier for people to become famous. Some people become celebrities overnight just by creating a big scandal, and they will be in the headlines of famous newspapers, so everyone knows them. In the past, it was much more difficult for ordinary people to appear in the media. They needed to have real talent if they wanted to appear in newspapers or on TV.', vi: 'Người nổi tiếng xưa và nay.' },
        { kind: 'model', text: 'I think the main difference is that youngsters are the ones who tend to follow fashion, so they choose clothes that are considered trendy and stylish. They don\'t pay much attention to the traditional values attached to the clothes they wear, while elderly people are more likely to wear clothes that are associated with their traditions. For example, on special occasions like Tet or weddings, we can see old people wearing ao dai, which is a traditional Vietnamese garment, while young people hardly ever wear it.', vi: 'Quần áo của người trẻ và người già.' },
        { kind: 'model', text: 'Several decades ago, if people wanted to get a university qualification, they had to attend classes. Now, many universities and colleges offer online learning courses, which allow students to study at their own pace and at any time they prefer. Another thing is that in the past, the main learning materials were textbooks. Nowadays, tonnes of materials are available online. With an internet-connected laptop, you can download lots of e-books in almost every area that you want.', vi: 'Giáo dục truyền thống và hiện đại.' },
        { kind: 'model', text: 'I think in the past, houses just had one or two floors, but now due to a scarcity of land and overpopulation, the number of high-rise buildings is rising dramatically. Another thing is that several decades ago, houses often had a yard or a garden where children could play. But now, it\'s really hard to find houses like that in major cities, where skyscrapers and tall apartment blocks dominate. That\'s all I can think of when it comes to the differences between houses built in the past and now.', vi: 'Nhà ở xưa và nay, có câu chốt.' },
        { kind: 'bad', text: 'Ao dai is a Vietnamese traditional garment.', vi: 'Thứ tự tính từ: a traditional Vietnamese garment.' }
      ],
      practice: {
        type: 'speak',
        task: 'Mỗi câu: mở bằng I think the main difference is that... hoặc I think there are many differences between A and B, nêu 2 khác biệt có chi tiết (nối bằng while / however), kết bằng That\'s all I can think of when it comes to... Cố dùng lại câu, cụm của các bài trước.',
        shadow: [
          'I think there are many differences between A and B.',
          'I think the main difference is that youngsters tend to follow fashion.',
          'It was much more difficult for ordinary people to appear in the media.',
          'That\'s all I can think of when it comes to the differences between them.'
        ],
        questions: [
          { part: 3, q: 'What are the differences between shopping online and shopping in stores?', vi: 'Mua sắm trực tuyến và mua ở cửa hàng khác nhau thế nào?' },
          { part: 3, q: 'What is the difference between living in a city and living in the countryside?', vi: 'Sống ở thành phố và sống ở nông thôn khác nhau thế nào?' },
          { part: 3, q: 'How are children\'s games today different from those in the past?', vi: 'Trò chơi của trẻ em ngày nay khác ngày xưa thế nào?' },
          { part: 3, q: 'What are the differences between studying alone and studying in a group?', vi: 'Học một mình và học nhóm khác nhau thế nào?' }
        ]
      }
    }
  ]
};
