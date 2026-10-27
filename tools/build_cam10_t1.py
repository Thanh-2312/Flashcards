# -*- coding: utf-8 -*-
"""
Constructs data/tests/cam10_t1.js adhering strictly to Schema 3.1
from existing real data in cambridge_data.js and listening_data.js.
"""
import os
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

def build_cam10_t1():
    out_dir = os.path.join(os.path.dirname(__file__), "..", "data", "tests")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "cam10_t1.js")

    # 1. Read cambridge_data.js from git HEAD (where original rich CAM 10 T1 data lives)
    import subprocess
    try:
        res = subprocess.run(["git", "show", "HEAD:cambridge_data.js"], capture_output=True, text=True, encoding="utf-8")
        cam_text = res.stdout if res.returncode == 0 else ""
    except Exception:
        cam_text = ""
    if not cam_text or "books" not in cam_text:
        with open("cambridge_data.js", "r", encoding="utf-8") as f:
            cam_text = f.read()
    prefix = "window.CAMBRIDGE_DATA = "
    idx = cam_text.find(prefix)
    cam_json = json.loads(cam_text[idx+len(prefix):].rstrip(";\n "))
    cam10_t1_data = cam_json["books"][0]["tests"][0]

    # 2. Read listening_data.js
    with open("listening_data.js", "r", encoding="utf-8") as f:
        lis_text = f.read()
    lis_idx = lis_text.find("{")
    lis_json = json.loads(lis_text[lis_idx:].rstrip(";\n "))
    lis_sections = lis_json["tests"][0]["sections"]

    # Build Reading Passages
    passages = []
    for p_idx, p in enumerate(cam10_t1_data["reading"]["passages"], start=1):
        # Paragraphs
        p_text = p["text"]
        # Split text into paragraphs
        raw_paras = [x.strip() for x in re.split(r'\n+', p_text) if x.strip()]
        paragraphs = []
        for i, pt in enumerate(raw_paras, start=1):
            # Check if paragraph starts with letter A-H
            m_letter = re.match(r'^([A-H])[\.\s]+(.+)$', pt)
            if m_letter:
                para_id = m_letter.group(1)
                paragraphs.append({"id": para_id, "text": pt})
            else:
                paragraphs.append({"id": f"P{i}", "text": pt})

        # Group questions
        # In CAM 10 T1:
        # Passage 1: Q1-5 (tfng), Q6-8 (fill), Q9-13 (match/identification)
        # Passage 2: Q14-21 (match/headings), Q22-26 (fill)
        # Passage 3: Q27-30 (mcq), Q31-35 (match), Q36-40 (ynng)
        groups = []
        p_questions = p["questions"]
        if p_questions:
            min_q = min(q["q"] for q in p_questions)
            max_q = max(q["q"] for q in p_questions)

            # Subdivide questions into groups by type
            current_type = None
            current_qs = []
            for q_raw in p_questions:
                q_type = q_raw.get("type", "fill")
                if q_type not in {'fill', 'tfng', 'ynng', 'mcq', 'mcq_multi', 'match', 'map'}:
                    q_type = "fill"

                # Standardize evidence
                clue_p = q_raw.get("clue_paragraph", "")
                m_p = re.search(r'([A-H]|\d+)', clue_p)
                p_id = f"P{m_p.group(1)}" if m_p and m_p.group(1).isdigit() else (m_p.group(1) if m_p else "P1")

                # Keyword extract
                q_stem = q_raw.get("question", "")
                clue_quote = q_raw.get("clue_quote", "")
                words_stem = [w for w in re.findall(r'[a-zA-Z]{5,}', q_stem) if w.lower() not in {'which', 'where', 'their', 'there', 'about'}]
                kw_q = words_stem[0] if words_stem else "statement"
                words_quote = [w for w in re.findall(r'[a-zA-Z]{5,}', clue_quote) if w.lower() not in {'which', 'where', 'their', 'there', 'about'}]
                kw_p = words_quote[0] if words_quote else "passage"

                std_q = {
                    "q": q_raw["q"],
                    "stem": q_stem,
                    "answer": q_raw.get("answer", []),
                    "evidence": {
                        "para": p_id,
                        "quote": clue_quote
                    },
                    "keywords": [
                        {"q": kw_q, "p": kw_p}
                    ],
                    "trap": "Cần chú ý từ hạn định hoặc ngữ cảnh đối lập trong bài để tránh bẫy gây nhiễu." if q_type in {'tfng', 'ynng', 'mcq'} else "",
                    "explain": q_raw.get("explanation", "")
                }

                if current_type is None or q_type == current_type:
                    current_type = q_type
                    current_qs.append(std_q)
                else:
                    groups.append({
                        "range": [min(x["q"] for x in current_qs), max(x["q"] for x in current_qs)],
                        "type": current_type,
                        "instruction": f"Questions {min(x['q'] for x in current_qs)}-{max(x['q'] for x in current_qs)}",
                        "options": None,
                        "image": None,
                        "questions": current_qs
                    })
                    current_type = q_type
                    current_qs = [std_q]

            if current_qs:
                groups.append({
                    "range": [min(x["q"] for x in current_qs), max(x["q"] for x in current_qs)],
                    "type": current_type,
                    "instruction": f"Questions {min(x['q'] for x in current_qs)}-{max(x['q'] for x in current_qs)}",
                    "options": None,
                    "image": None,
                    "questions": current_qs
                })

        passages.append({
            "n": p_idx,
            "title": p.get("title", f"Reading Passage {p_idx}"),
            "paragraphs": paragraphs,
            "groups": groups
        })

    # Build Listening Parts
    parts = []
    for s_idx, sec in enumerate(lis_sections, start=1):
        sec_cam = cam10_t1_data["listening"]["parts"][s_idx - 1]
        
        # Segments
        segments = []
        for seg in sec.get("segments", []):
            segments.append({
                "id": seg["id"].replace("section", "s").replace("_seg_", "_"),
                "speaker": seg.get("speaker", "SPEAKER"),
                "text": seg.get("text", ""),
                "start": seg.get("start", 0),
                "end": seg.get("end", 0)
            })

        # Words
        words = []
        for w in sec.get("vocabulary", []):
            if w.get("level") in {"B2", "C1", "C2"}:
                words.append({
                    "w": w.get("word", "").lower(),
                    "s": w.get("start", 0),
                    "e": w.get("end", 0),
                    "seg": segments[0]["id"] if segments else "s1_1"
                })

        # Groups & Questions
        sec_qs = sec_cam.get("questions", [])
        q_list = []
        for q_raw in sec_qs:
            q_num = q_raw["q"]
            c_time = q_raw.get("clue_time", {})
            q_list.append({
                "q": q_num,
                "stem": q_raw.get("label", f"Question {q_num}"),
                "answer": q_raw.get("answer", []),
                "evidence": {
                    "seg": [segments[min(len(segments)-1, max(0, q_num - 1))]["id"] if segments else "s1"],
                    "quote": q_raw.get("clue_quote", ""),
                    "start": c_time.get("start", 0),
                    "end": c_time.get("end", 0)
                },
                "keywords": [
                    {"q": "detail", "p": "clue"}
                ],
                "trap": "",
                "explain": q_raw.get("explanation", "")
            })

        groups = [{
            "range": [min(q["q"] for q in q_list), max(q["q"] for q in q_list)],
            "type": sec_qs[0].get("type", "fill") if sec_qs else "fill",
            "instruction": f"Questions {min(q['q'] for q in q_list)}-{max(q['q'] for q in q_list)}",
            "options": None,
            "image": None,
            "questions": q_list
        }]

        # Audio src (compressed / web ready path)
        audio_src = f"audio/cam10/t1_p{s_idx}.mp3"
        # If audio folder not yet populated, keep fallback to existing path
        if not os.path.exists(os.path.join(os.path.dirname(__file__), "..", audio_src)):
            audio_src = f"CAMBRIDGE/CAMBRIDGE IELTS 10-20/CAM 10/LISTENING/TEST 1/File Listening/Cam10-Test1-Section{s_idx}.mp3"

        parts.append({
            "n": s_idx,
            "title": sec.get("title", f"Part {s_idx}"),
            "audio": {
                "src": audio_src,
                "offset": 0
            },
            "segments": segments,
            "words": words,
            "groups": groups
        })

    # Vocab cards for this test
    # Extract B2-C2 words from legacy topics for cam10_t1
    vocab = []
    with open("data/legacy_topics.json", "r", encoding="utf-8") as f:
        legacy = json.load(f)
    for topic in legacy:
        t_id = topic.get("topic_id", "communication")
        if t_id == "business":
            t_id = "economy"
        for w in topic.get("words", []):
            if "cam 10" in w.get("source", "").lower() or "cam10" in w.get("source", "").lower():
                lemma = re.sub(r'[^a-z0-9]+', '-', w["word"].strip().lower()).strip('-')
                vocab.append({
                    "id": f"cam-{lemma}",
                    "category": "words" if w.get("type") in {"noun", "verb", "adjective", "adverb"} else "collocations",
                    "topic": t_id,
                    "english": w["word"],
                    "ipa": f"{w.get('ipa', '')} ({w.get('type', '')} - {w.get('level', 'B2')})",
                    "vietnamese": w.get("vietnamese", ""),
                    "frontText": w.get("frontBlank", f"Context with __________ for {w['word']}"),
                    "context": w.get("exampleEn", ""),
                    "exampleEn": w.get("exampleEn", ""),
                    "acceptedAnswers": w.get("acceptedAnswers", [w["word"]]),
                    "source": [w.get("source", "cam10_t1:L1")],
                    "interval": 1,
                    "boxLevel": 1,
                    "nextReviewDate": 0,
                    "createdDate": 0
                })

    test_obj = {
        "id": "cam10_t1",
        "book": 10,
        "test": 1,
        "title": "Cambridge IELTS 10 • Test 1",
        "reading": {
            "passages": passages
        },
        "listening": {
            "parts": parts
        },
        "vocab": vocab
    }

    js_content = f"""/**
 * Cambridge IELTS 10 • Test 1 Complete Test Data
 * Auto-generated according to Schema 3.1
 */
window.CAM_TESTS = window.CAM_TESTS || {{}};
window.CAM_TESTS['cam10_t1'] = {json.dumps(test_obj, ensure_ascii=False, indent=2)};
"""
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"SUCCESS: Generated {out_path} ({os.path.getsize(out_path)} bytes)")
    return out_path

if __name__ == '__main__':
    build_cam10_t1()
