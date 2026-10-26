import json
import re

def parse_time_to_seconds(raw_val, section_id=""):
    """
    Convert raw timestamp to seconds.
    - If raw_val >= 10.0 and section_id == 'section2': already pure seconds
    - Otherwise format is M.SS... (e.g. 1.42507 -> 1m 42.507s = 102.507s)
    """
    v = float(raw_val)
    if v == 0:
        return 0.0
    
    # In section 2, values like 23.951, 31.789, 58.649 are pure seconds
    if section_id == 'section2' and v >= 10.0:
        return round(v, 2)
    
    # Format M.SS
    s = f"{v:.5f}"
    parts = s.split('.')
    mins = int(parts[0])
    frac = parts[1]
    sec = float(frac[:2] + '.' + frac[2:])
    return round(mins * 60 + sec, 2)

sections_meta = [
    {
        'id': 'section1',
        'file': 'section1_timed.json',
        'audio': 'TEST 1/File Listening/Cam10-Test1-Section1.mp3',
        'title': 'Section 1: Self-Drive Tours in California',
        'topic': 'Du lịch & Thuê xe tự lái tại Mỹ (Travel & Tourism)',
        'description': 'Cuộc hội thoại giữa khách hàng Andrea Brown và nhân viên đại lý du lịch Jamie về chuyến đi tự lái ở California.',
        'target_score': 'Band 5.5 - 7.0'
    },
    {
        'id': 'section2',
        'file': 'section2_timed.json',
        'audio': 'TEST 1/File Listening/Cam10-Test1-Section2.mp3',
        'title': 'Section 2: LP Leisure Clubs & Facilities',
        'topic': 'Cơ sở vật chất & Thẻ hội viên CLB thể thao (Fitness & Memberships)',
        'description': 'Bài giới thiệu của quản lý Sandy Fisher về hồ bơi, phòng gym, gói hội viên và các quy định tại LP Leisure Club.',
        'target_score': 'Band 6.0 - 7.5'
    },
    {
        'id': 'section3',
        'file': 'section3_timed.json',
        'audio': 'TEST 1/File Listening/Cam10-Test1-Section3.mp3',
        'title': 'Section 3: Global Design Competition',
        'topic': 'Thiết kế nhà bếp học thuật & Tiết kiệm năng lượng (Design & Innovation)',
        'description': 'Cuộc thảo luận giữa sinh viên John Wishart và giáo sư hướng dẫn về bản vẽ dự thi thiết kế quốc tế.',
        'target_score': 'Band 6.5 - 8.0'
    },
    {
        'id': 'section4',
        'file': 'section4_timed.json',
        'audio': 'TEST 1/File Listening/Cam10-Test1-Section4.mp3',
        'title': 'Section 4: Spirit Bear Ecology & Conservation',
        'topic': 'Sinh thái học & Bảo tồn gấu trắng Kermode (Ecology & Wildlife)',
        'description': 'Bài giảng đại học chuyên sâu về môi trường sống, chuỗi thức ăn và thách thức bảo tồn loài gấu Spirit Bear.',
        'target_score': 'Band 7.0 - 8.5'
    }
]

output_data = {
    'tests': [
        {
            'test_id': 'cam10_test1',
            'test_name': 'Cambridge IELTS 10 • Test 1',
            'sections': []
        }
    ]
}

for sec in sections_meta:
    with open(f"TEST 1/{sec['file']}", 'r', encoding='utf-8') as f:
        raw = json.load(f)
    
    # Process segments
    cleaned_segments = []
    for i, s in enumerate(raw.get('segments', [])):
        start_sec = parse_time_to_seconds(s['start'], sec['id'])
        end_sec = parse_time_to_seconds(s['end'], sec['id'])
        if end_sec <= start_sec:
            end_sec = start_sec + 3.0
        cleaned_segments.append({
            'id': f"{sec['id']}_seg_{i+1}",
            'speaker': s.get('speaker', 'Speaker'),
            'start': start_sec,
            'end': end_sec,
            'text': s.get('text', '').strip()
        })
    
    # Process vocabulary
    cleaned_vocab = []
    for j, v in enumerate(raw.get('vocabulary', [])):
        v_word = v.get('word', '').strip()
        v_matched = v.get('matched_text', v_word).strip()
        v_context = v.get('context', '').strip()
        
        # Try to find corresponding segment for rock-solid timing
        best_seg = None
        for s in cleaned_segments:
            s_text = s['text'].lower()
            if v_word.lower() in s_text or v_matched.lower() in s_text:
                best_seg = s
                break
        
        raw_start = v.get('start', 0)
        raw_end = v.get('end', 0)
        
        if best_seg:
            # Word is within this segment
            # Calculate word start/end based on position inside sentence
            seg_len = max(len(best_seg['text']), 1)
            try:
                char_pos = best_seg['text'].lower().index(v_word.lower())
            except ValueError:
                try:
                    char_pos = best_seg['text'].lower().index(v_matched.lower())
                except ValueError:
                    char_pos = seg_len // 2
            
            ratio = char_pos / seg_len
            word_dur = max(len(v_matched) * 0.08, 0.6)
            seg_duration = best_seg['end'] - best_seg['start']
            
            calc_start = round(best_seg['start'] + (ratio * seg_duration), 2)
            calc_end = round(min(calc_start + word_dur, best_seg['end'] + 0.5), 2)
            
            start_sec = calc_start
            end_sec = calc_end
        else:
            start_sec = parse_time_to_seconds(raw_start, sec['id'])
            end_sec = parse_time_to_seconds(raw_end, sec['id'])
            if end_sec <= start_sec:
                end_sec = start_sec + 2.0

        cleaned_vocab.append({
            'id': f"{sec['id']}_w_{j+1}",
            'word': v_word,
            'matched_text': v_matched,
            'start': start_sec,
            'end': end_sec,
            'ipa': v.get('ipa', ''),
            'type': v.get('type', 'word'),
            'level': v.get('level', 'B2'),
            'meaning': v.get('meaning', ''),
            'context': v_context,
            'tip': v.get('tip', '')
        })

    # Sort vocab by start time
    cleaned_vocab.sort(key=lambda x: x['start'])

    sec_obj = {
        'section_id': sec['id'],
        'title': sec['title'],
        'topic': sec['topic'],
        'description': sec['description'],
        'target_score': sec['target_score'],
        'audio_src': sec['audio'],
        'total_words': len(cleaned_vocab),
        'total_segments': len(cleaned_segments),
        'vocabulary': cleaned_vocab,
        'segments': cleaned_segments
    }
    output_data['tests'][0]['sections'].append(sec_obj)
    print(f"Sec {sec['id']}: {len(cleaned_vocab)} vocab words, {len(cleaned_segments)} segments calibrated.")

# Output to listening_data.js
js_content = "/**\n * IELTS LISTENING REAL-TIME AUDIO SYNCHRONIZED DATA\n * Cambridge 10 Test 1 (All 4 Sections)\n */\nwindow.LISTENING_DATA = " + json.dumps(output_data, ensure_ascii=False, indent=2) + ";\n"

with open('listening_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\nGenerated listening_data.js successfully! Total size: {len(js_content)} chars")
