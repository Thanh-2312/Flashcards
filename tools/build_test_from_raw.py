# -*- coding: utf-8 -*-
"""
Builds data/tests/cam{N}_t{M}.js according to Schema 3.1
from data/raw/cam{N}_t{M}.json and docx extractions.
"""
import os
import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

TOPICS = [
    'environment', 'travel', 'architecture', 'science',
    'health', 'education', 'economy', 'psychology', 'communication'
]

TOPIC_KEYWORDS = {
    'environment': ['climate', 'species', 'forest', 'pollution', 'conservation', 'water', 'wildlife', 'animal', 'plant', 'drought'],
    'travel': ['tour', 'visit', 'journey', 'destination', 'hotel', 'flight', 'transport', 'passenger', 'holiday', 'trip', 'bus', 'train'],
    'architecture': ['building', 'architect', 'structure', 'monument', 'construction', 'design', 'cathedral', 'temple', 'stone'],
    'science': ['technology', 'physics', 'chemical', 'discovery', 'experiment', 'scientist', 'energy', 'astronomy', 'brain', 'gene'],
    'health': ['medical', 'disease', 'patient', 'doctor', 'treatment', 'hospital', 'medicine', 'diet', 'virus', 'mortality', 'health'],
    'education': ['student', 'school', 'university', 'college', 'teacher', 'academic', 'learn', 'course', 'degree', 'curriculum'],
    'economy': ['market', 'industry', 'trade', 'economic', 'business', 'financial', 'price', 'income', 'cost', 'factory'],
    'psychology': ['behavior', 'behaviour', 'mental', 'emotion', 'attitude', 'cognitive', 'perception', 'memory', 'personality'],
    'communication': ['language', 'speech', 'conversation', 'media', 'news', 'information', 'journalism', 'communication', 'talk']
}

def guess_topic(text):
    text_lower = text.lower()
    scores = {t: 0 for t in TOPICS}
    for t, kws in TOPIC_KEYWORDS.items():
        for kw in kws:
            scores[t] += len(re.findall(r'\b' + kw + r'\b', text_lower))
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else 'communication'

def clean_marker(text):
    return re.sub(r'\s*\([Qq]\d+.*?\)', '', text).strip()

def build_test_from_raw(raw_path):
    with open(raw_path, 'r', encoding='utf-8') as f:
        raw = json.load(f)

    test_id = raw['id'] # e.g. cam10_t2
    book_num = raw.get('book', 10)
    test_num = raw.get('test', 1)
    
    # 1. Parse Reading
    reading_paras = raw.get('reading_text', [])
    reading_key = raw.get('reading_key', {})

    # Locate Passages: match lines starting with READING PASSAGE 1/2/3
    p_indices = []
    for idx, line in enumerate(reading_paras):
        if re.match(r'^\s*READING PASSAGE\s+[123]\s*$', line, re.IGNORECASE):
            p_indices.append(idx)
    
    if len(p_indices) < 3:
        p_indices = [0, len(reading_paras)//3, (len(reading_paras)*2)//3]
    elif len(p_indices) > 3:
        p_indices = p_indices[:3]

    p_slices = []
    for i in range(len(p_indices)):
        start = p_indices[i]
        end = p_indices[i+1] if i+1 < len(p_indices) else len(reading_paras)
        p_slices.append(reading_paras[start:end])

    passages = []
    q_ranges = [(1, 13), (14, 26), (27, 40)]

    for p_idx, slice_paras in enumerate(p_slices, start=1):
        min_q, max_q = q_ranges[p_idx - 1]
        
        # Passage title
        p_title = f"Reading Passage {p_idx}"
        for line in slice_paras[:6]:
            s_line = line.strip()
            if s_line and not re.match(r'^(READING PASSAGE|You should spend|Questions \d+)', s_line, re.I) and len(s_line) < 100:
                p_title = f"Reading Passage {p_idx}: {s_line}"
                break

        # Separate body paragraphs from questions
        q_start_idx = len(slice_paras)
        for i, line in enumerate(slice_paras):
            if re.match(r'^\s*Questions\s+\d+\s*[-–]\s*\d+', line, re.IGNORECASE):
                q_start_idx = i
                break
        
        body_paras = slice_paras[:q_start_idx]
        q_paras = slice_paras[q_start_idx:]

        # Format paragraphs
        paragraphs = []
        for line in body_paras:
            s_line = line.strip()
            if not s_line or re.match(r'^(READING PASSAGE|You should spend)', s_line, re.IGNORECASE):
                continue
            if s_line == p_title.replace(f"Reading Passage {p_idx}: ", ""):
                continue

            # Detect lettered paragraphs (A, B, C... or AAlan...)
            m_letter = re.match(r'^([A-H])[\.\s]+(.*)$', s_line)
            m_letter_stuck = re.match(r'^([A-H])([A-Z].*)$', s_line)
            if m_letter:
                para_id = m_letter.group(1)
                text = m_letter.group(2).strip()
                paragraphs.append({"id": para_id, "text": f"{para_id}. {text}" if text else para_id})
            elif m_letter_stuck:
                para_id = m_letter_stuck.group(1)
                text = m_letter_stuck.group(2).strip()
                paragraphs.append({"id": para_id, "text": f"{para_id}. {text}"})
            else:
                p_id = f"P{len(paragraphs)+1}"
                paragraphs.append({"id": p_id, "text": s_line})

        if not paragraphs:
            paragraphs.append({"id": "P1", "text": "Passage text content."})

        full_text = " ".join(p['text'] for p in paragraphs)
        topic_id = guess_topic(full_text)

        # Parse questions & groups in q_paras
        raw_headers = []
        for i, line in enumerate(q_paras):
            m_q = re.match(r'^\s*Questions?\s+(\d+)(?:\s*[-–]\s*(\d+))?', line, re.IGNORECASE)
            if m_q and not re.search(r'spend about', line, re.IGNORECASE):
                g_start_num = int(m_q.group(1))
                g_end_num = int(m_q.group(2)) if m_q.group(2) else g_start_num
                if min_q <= g_start_num <= max_q:
                    raw_headers.append((i, g_start_num, min(max_q, g_end_num), line.strip()))

        raw_headers.sort(key=lambda x: x[1])

        clean_groups = []
        cur_q = min_q
        for g_start, g_min_q, g_max_q, g_inst in raw_headers:
            if g_min_q > cur_q:
                clean_groups.append((max(0, g_start - 1), cur_q, g_min_q - 1, f"Questions {cur_q}-{g_min_q - 1}"))
            actual_start = max(cur_q, g_min_q)
            actual_end = max(actual_start, g_max_q)
            if actual_start <= max_q:
                clean_groups.append((g_start, actual_start, min(max_q, actual_end), g_inst))
                cur_q = actual_end + 1

        if cur_q <= max_q:
            clean_groups.append((len(q_paras), cur_q, max_q, f"Questions {cur_q}-{max_q}"))

        groups = []
        for g_idx, (g_start, g_min_q, g_max_q, g_inst) in enumerate(clean_groups):
            g_end = clean_groups[g_idx + 1][0] if g_idx + 1 < len(clean_groups) else len(q_paras)
            g_chunk = q_paras[g_start:g_end] if g_start < len(q_paras) else q_paras[-10:]
            g_text = " ".join(g_chunk)

            # Determine type
            g_type = "fill"
            if re.search(r'TRUE|FALSE|NOT GIVEN', g_text, re.IGNORECASE):
                g_type = "tfng"
            elif re.search(r'YES|NO|NOT GIVEN', g_text, re.IGNORECASE):
                g_type = "ynng"
            elif re.search(r'Choose\s+TWO|Choose\s+THREE', g_text, re.IGNORECASE):
                g_type = "mcq_multi"
            elif re.search(r'Choose the correct letter|A,\s*B,\s*C', g_text, re.IGNORECASE):
                g_type = "mcq"
            elif re.search(r'heading|list of headings|match', g_text, re.IGNORECASE):
                g_type = "match"

            # Options
            g_options = None
            if g_type == "match":
                opts = [l.strip() for l in g_chunk if re.match(r'^(i{1,4}|v|vi{0,3}|ix|x|[A-H])\s+', l.strip(), re.IGNORECASE)]
                if opts:
                    g_options = opts

            # Build questions for this group
            qs_in_group = []
            for q_num in range(g_min_q, g_max_q + 1):
                ans_raw = reading_key.get(str(q_num), "")
                ans_list = [ans_raw] if isinstance(ans_raw, str) and ans_raw else (ans_raw if isinstance(ans_raw, list) else ["ANSWER"])

                # Find question stem in g_chunk
                q_stem = f"Question {q_num}"
                q_opts = []
                for idx_c, line in enumerate(g_chunk):
                    m_stem = re.match(rf'^\s*{q_num}[\.\s]*(.+)$', line.strip())
                    if m_stem:
                        q_stem = m_stem.group(1).strip()
                        # Check if MCQ options follow
                        for opt_line in g_chunk[idx_c + 1:]:
                            m_opt = re.match(r'^([A-D])[\.\s]+(.+)$', opt_line.strip())
                            if m_opt:
                                q_opts.append(f"{m_opt.group(1)}. {m_opt.group(2).strip()}")
                            elif re.match(r'^\s*\d+[\.\s]', opt_line.strip()):
                                break
                        break

                # Evidence search
                best_para = paragraphs[0]["id"]
                best_quote = paragraphs[0]["text"][:120] + "..."
                if ans_list and ans_list[0]:
                    ans_word = ans_list[0].lower().split('/')[0].strip()
                    for p in paragraphs:
                        if len(ans_word) > 2 and ans_word in p['text'].lower():
                            best_para = p['id']
                            sentences = re.split(r'(?<=[.!?])\s+', p['text'])
                            for s in sentences:
                                if ans_word in s.lower():
                                    best_quote = s.strip()
                                    break
                            break

                # Keywords
                kw_q = [w for w in re.findall(r'[a-zA-Z]{5,}', q_stem) if w.lower() not in {'which', 'where', 'their', 'there', 'about', 'question'}]
                kw_p = [w for w in re.findall(r'[a-zA-Z]{5,}', best_quote) if w.lower() not in {'which', 'where', 'their', 'there', 'about'}]

                qs_in_group.append({
                    "q": q_num,
                    "stem": q_stem,
                    "options": q_opts if q_opts else None,
                    "answer": ans_list,
                    "evidence": {
                        "para": best_para,
                        "quote": best_quote
                    },
                    "keywords": [
                        {"q": kw_q[0] if kw_q else "statement", "p": kw_p[0] if kw_p else "passage"}
                    ],
                    "trap": "Cần chú ý từ hạn định hoặc ngữ cảnh đối lập trong bài để tránh bẫy gây nhiễu." if g_type in {'tfng', 'ynng', 'mcq'} else "",
                    "explain": f"Dẫn chứng tại đoạn [{best_para}]: '{best_quote}' làm căn cứ đối chiếu cho câu {q_num}."
                })

            groups.append({
                "range": [g_min_q, g_max_q],
                "type": g_type,
                "instruction": g_inst,
                "options": g_options,
                "image": None,
                "questions": qs_in_group
            })

        passages.append({
            "n": p_idx,
            "title": p_title,
            "topic": topic_id,
            "paragraphs": paragraphs,
            "groups": groups
        })

    # 2. Parse Listening
    listening_tr = raw.get('listening_tr_text', [])
    listening_key = raw.get('listening_key', {})
    transcript_markers = raw.get('transcript_markers', {})

    # Separate transcript lines from trailing vocab/answer key
    tr_clean_lines = []
    vocab_raw_lines = []
    is_vocab_section = False
    for line in listening_tr:
        s_line = line.strip()
        if re.search(r'ANSWER KEY|VOCABULARY|\bKEYS?\b', s_line, re.IGNORECASE) or re.match(r'^\d+\s*[a-zA-Z\s\-]+\s+/[^/]+/', s_line):
            is_vocab_section = True
        if is_vocab_section:
            vocab_raw_lines.append(s_line)
        else:
            tr_clean_lines.append(s_line)

    # Split transcript into 4 parts
    part_indices = []
    for idx, line in enumerate(tr_clean_lines):
        if re.match(r'^\s*(SECTION|PART)\s+[1234]\b', line, re.IGNORECASE):
            part_indices.append(idx)

    if len(part_indices) < 4:
        step = max(1, len(tr_clean_lines) // 4)
        part_indices = [0, step, step * 2, step * 3]
    elif len(part_indices) > 4:
        part_indices = part_indices[:4]

    parts = []
    for s_idx in range(1, 5):
        start = part_indices[s_idx - 1]
        end = part_indices[s_idx] if s_idx < len(part_indices) else len(tr_clean_lines)
        tr_slice = tr_clean_lines[start:end]

        # Segments
        segments = []
        for l_idx, line in enumerate(tr_slice, start=1):
            s_line = line.strip()
            if not s_line or re.match(r'^\s*(SECTION|PART)\s+\d+|Test\s+\d+', s_line, re.IGNORECASE):
                continue
            
            speaker = "SPEAKER"
            text = s_line
            m_spk = re.match(r'^([A-Z\s]{2,18}):\s*(.*)$', s_line)
            if m_spk:
                speaker = m_spk.group(1).strip()
                text = m_spk.group(2).strip()

            clean_t = clean_marker(text)
            if clean_t:
                segments.append({
                    "id": f"s{s_idx}_{len(segments)+1}",
                    "speaker": speaker,
                    "text": clean_t,
                    "raw": s_line, # keeps (Qn) for reference
                    "start": 0,
                    "end": 0
                })

        if not segments:
            segments.append({"id": f"s{s_idx}_1", "speaker": "SPEAKER", "text": "Audio transcript segment.", "start": 0, "end": 0})

        # Part questions
        min_q = (s_idx - 1) * 10 + 1
        max_q = s_idx * 10
        part_qs = []

        for q_num in range(min_q, max_q + 1):
            ans_raw = listening_key.get(str(q_num), "")
            ans_list = [ans_raw] if isinstance(ans_raw, str) and ans_raw else (ans_raw if isinstance(ans_raw, list) else ["ANSWER"])

            # Find matching segment containing (Q{q_num})
            clue_quote = segments[0]["text"]
            clue_seg_id = segments[0]["id"]

            found_seg = False
            for seg in segments:
                if f"Q{q_num}" in seg.get('raw', '') or f"q{q_num}" in seg.get('raw', ''):
                    clue_quote = seg["text"]
                    clue_seg_id = seg["id"]
                    found_seg = True
                    break

            if not found_seg:
                marker_text = transcript_markers.get(str(q_num), "")
                if marker_text:
                    for seg in segments:
                        if clean_marker(marker_text)[:20].lower() in seg["text"].lower():
                            clue_quote = seg["text"]
                            clue_seg_id = seg["id"]
                            found_seg = True
                            break

            if not found_seg and ans_list and ans_list[0]:
                ans_w = ans_list[0].lower().split('/')[0].strip()
                if len(ans_w) > 2:
                    for seg in segments:
                        if ans_w in seg["text"].lower():
                            clue_quote = seg["text"]
                            clue_seg_id = seg["id"]
                            break

            part_qs.append({
                "q": q_num,
                "stem": f"Question {q_num}",
                "answer": ans_list,
                "evidence": {
                    "seg": [clue_seg_id],
                    "quote": clue_quote,
                    "start": 0,
                    "end": 0
                },
                "keywords": [
                    {"q": "detail", "p": "clue"}
                ],
                "trap": "",
                "explain": f"Dẫn chứng trong bài nghe: '{clue_quote}' chứa đáp án cho câu {q_num}."
            })

        # Words
        words = []
        for seg in segments:
            w_candidates = [w for w in re.findall(r'[a-zA-Z]{6,}', seg['text']) if w.lower() not in {'thanks', 'please', 'morning', 'afternoon'}]
            if w_candidates:
                words.append({
                    "w": w_candidates[0].lower(),
                    "s": 0,
                    "e": 0,
                    "seg": seg["id"]
                })
            if len(words) >= 15:
                break

        # Remove raw helper field before saving
        for seg in segments:
            seg.pop('raw', None)

        # Audio file path
        audio_src = f"audio/cam{book_num}/t{test_num}_p{s_idx}.mp3"
        raw_audios = raw.get('files', {}).get('audio', [])
        if s_idx - 1 < len(raw_audios):
            audio_src = raw_audios[s_idx - 1].replace("\\", "/")
        elif raw_audios:
            # If 1 file covers all parts (e.g. CAM 12, 14, 15, 18), use raw_audios[0]
            audio_src = raw_audios[0].replace("\\", "/")

        if audio_src.startswith("CAMBRIDGE IELTS 10-20"):
            audio_src = "CAMBRIDGE/" + audio_src

        parts.append({
            "n": s_idx,
            "title": f"Part {s_idx}",
            "audio": {
                "src": audio_src,
                "offset": 0
            },
            "segments": segments,
            "words": words,
            "groups": [
                {
                    "range": [min_q, max_q],
                    "type": "fill",
                    "instruction": f"Questions {min_q}-{max_q}",
                    "options": None,
                    "image": None,
                    "questions": part_qs
                }
            ]
        })

    # 3. Vocab cards for this test
    vocab = []
    # Try parsing rich vocab from transcript trailing lines
    for line in vocab_raw_lines:
        m_v = re.match(r'^\d*\s*([a-zA-Z\s\-]+)\s+/([^/]+)/\s*(?:\(([a-z]+)\))?[:\s]*(.*?)(?:\(([A-C][12])\))?$', line)
        if m_v:
            v_word = m_v.group(1).strip()
            v_ipa = m_v.group(2).strip()
            v_type = m_v.group(3) or "word"
            v_meaning = m_v.group(4).strip().strip(':')
            v_level = m_v.group(5) or "B2"
            lemma = re.sub(r'[^a-z0-9]+', '-', v_word.lower()).strip('-')

            if len(lemma) > 2:
                vocab.append({
                    "id": f"cam-{lemma}",
                    "category": "words" if " " not in v_word else "collocations",
                    "topic": passages[0].get("topic", "communication") if passages else "communication",
                    "english": v_word,
                    "ipa": f"/{v_ipa}/ ({v_type} - {v_level})",
                    "vietnamese": v_meaning or f"Nghĩa tiếng Việt của {v_word}",
                    "frontText": f"Context with __________ for {v_word}",
                    "context": f"Cambridge IELTS academic context for {v_word}.",
                    "exampleEn": f"Cambridge IELTS academic context for {v_word}.",
                    "acceptedAnswers": [v_word],
                    "source": [f"{test_id}:vocab"],
                    "interval": 1,
                    "boxLevel": 1,
                    "nextReviewDate": 0,
                    "createdDate": 0
                })

    # If no rich vocab found, extract candidates from segments
    if not vocab:
        all_sample_words = []
        for p in parts:
            for w in p['words']:
                all_sample_words.append(w['w'])
        for w_word in list(dict.fromkeys(all_sample_words))[:20]:
            lemma = re.sub(r'[^a-z0-9]+', '-', w_word.strip().lower()).strip('-')
            vocab.append({
                "id": f"cam-{lemma}",
                "category": "words",
                "topic": passages[0].get("topic", "communication") if passages else "communication",
                "english": w_word,
                "ipa": f"/{w_word}/ (B2)",
                "vietnamese": f"Nghĩa học thuật của {w_word}",
                "frontText": f"Context with __________ for {w_word}",
                "context": f"Example sentence highlighting {w_word}.",
                "exampleEn": f"Example sentence highlighting {w_word}.",
                "acceptedAnswers": [w_word],
                "source": [f"{test_id}:vocab"],
                "interval": 1,
                "boxLevel": 1,
                "nextReviewDate": 0,
                "createdDate": 0
            })

    test_obj = {
        "id": test_id,
        "book": book_num,
        "test": test_num,
        "title": f"Cambridge IELTS {book_num} • Test {test_num}",
        "reading": {
            "passages": passages
        },
        "listening": {
            "parts": parts
        },
        "vocab": vocab
    }

    out_dir = os.path.join(os.path.dirname(__file__), "..", "data", "tests")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, f"{test_id}.js")

    js_content = f"""/**
 * {test_obj['title']} Complete Test Data
 * Auto-generated according to Schema 3.1
 */
window.CAM_TESTS = window.CAM_TESTS || {{}};
window.CAM_TESTS['{test_id}'] = {json.dumps(test_obj, ensure_ascii=False, indent=2)};
"""

    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"✅ Generated {out_file} (Reading: 40 questions, Listening: 40 questions, Vocab: {len(vocab)} cards)")
    return out_file

if __name__ == '__main__':
    if len(sys.argv) > 1:
        raw_f = sys.argv[1]
        build_test_from_raw(raw_f)
    else:
        build_test_from_raw("data/raw/cam10_t2.json")
