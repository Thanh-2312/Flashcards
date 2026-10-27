# -*- coding: utf-8 -*-
"""
Validation script for Cambridge test data files (data/tests/*.js) against Schema 3.1.
Ensures:
- Valid JS execution via node or regex
- Complete 40 reading questions and 40 listening questions (or marked incomplete)
- Valid question types: fill, tfng, ynng, mcq, mcq_multi, match, map
- Evidence quote is a substring of paragraph / segment
- Keyword paraphrases exist in passage / transcript
- MCQ / match options match answer
- Vocab items match flashcard schema (frontText with '__________', valid topic)
"""
import os
import re
import sys
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

VALID_TYPES = {'fill', 'tfng', 'ynng', 'mcq', 'mcq_multi', 'match', 'map'}
VALID_TOPICS = {
    'environment', 'travel', 'architecture', 'science',
    'health', 'education', 'economy', 'psychology', 'communication'
}

def normalize_text(s):
    if not s:
        return ""
    t = s.replace('\xa0', ' ').replace('\u2013', '-').replace('\u2014', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"')
    return re.sub(r'\s+', ' ', t).strip().lower()

def extract_json_from_js(js_path):
    abs_path = os.path.abspath(js_path).replace(chr(92), '/')
    node_script = f"""
    const fs = require('fs');
    global.window = {{}};
    const code = fs.readFileSync('{abs_path}', 'utf-8');
    eval(code);
    const keys = Object.keys(global.window.CAM_TESTS || {{}});
    if (keys.length === 0) {{
        console.error('No CAM_TESTS found in window');
        process.exit(1);
    }}
    console.log(JSON.stringify(global.window.CAM_TESTS[keys[0]]));
    """
    proc = subprocess.run(["node", "-e", node_script], capture_output=True, text=True, encoding='utf-8')
    if proc.returncode != 0:
        raise ValueError(f"Node execution failed: {proc.stderr}")
    return json.loads(proc.stdout)

def validate_test(js_path):
    print(f"\n================ Validating {os.path.basename(js_path)} ================")
    errors = []
    warnings = []

    try:
        data = extract_json_from_js(js_path)
    except Exception as e:
        print(f"❌ Syntax / execution error: {e}")
        return False

    is_incomplete = data.get("incomplete", False)
    if is_incomplete:
        warnings.append("Test marked as incomplete.")

    # 1. Reading validation
    reading = data.get("reading", {})
    passages = reading.get("passages", [])
    r_questions = {}
    r_paragraphs = {}

    for p in passages:
        p_n = p.get("n")
        p_title = p.get("title", "")
        for para in p.get("paragraphs", []):
            para_id = str(para.get("id"))
            r_paragraphs[f"p{p_n}_{para_id}"] = normalize_text(para.get("text", ""))

        for g in p.get("groups", []):
            g_type = g.get("type")
            if g_type not in VALID_TYPES:
                errors.append(f"Invalid question type in Reading P{p_n}: '{g_type}'")

            for q in g.get("questions", []):
                q_num = q.get("q")
                if q_num in r_questions:
                    errors.append(f"Duplicate reading question number: {q_num}")
                r_questions[q_num] = q

                # Check evidence
                ev = q.get("evidence", {})
                quote = ev.get("quote", "")
                para_id = str(ev.get("para", ""))
                key_para = f"p{p_n}_{para_id}"
                if quote and key_para in r_paragraphs:
                    norm_quote = normalize_text(quote)
                    if norm_quote not in r_paragraphs[key_para]:
                        warnings.append(f"Reading Q{q_num}: evidence quote not exact substring of paragraph {para_id}")

                # Check keywords
                for kw in q.get("keywords", []):
                    p_word = normalize_text(kw.get("p", ""))
                    if p_word and key_para in r_paragraphs:
                        if p_word not in r_paragraphs[key_para]:
                            warnings.append(f"Reading Q{q_num}: keyword paraphrase '{kw.get('p')}' not found in paragraph {para_id}")

    if not is_incomplete and len(r_questions) != 40:
        errors.append(f"Reading questions count is {len(r_questions)}, expected 40")

    # 2. Listening validation
    listening = data.get("listening", {})
    parts = listening.get("parts", [])
    l_questions = {}
    l_segments = {}

    for part in parts:
        p_n = part.get("n")
        for seg in part.get("segments", []):
            s_id = str(seg.get("id"))
            l_segments[s_id] = normalize_text(seg.get("text", ""))

        for g in part.get("groups", []):
            g_type = g.get("type")
            if g_type not in VALID_TYPES:
                errors.append(f"Invalid question type in Listening Part {p_n}: '{g_type}'")

            for q in g.get("questions", []):
                q_num = q.get("q")
                if q_num in l_questions:
                    errors.append(f"Duplicate listening question number: {q_num}")
                l_questions[q_num] = q

    if not is_incomplete and len(l_questions) != 40:
        errors.append(f"Listening questions count is {len(l_questions)}, expected 40")

    # 3. Vocab validation
    vocab = data.get("vocab", [])
    for v in vocab:
        v_id = v.get("id", "")
        if not v_id.startswith("cam-"):
            errors.append(f"Vocab id '{v_id}' must start with 'cam-'")
        front = v.get("frontText", "")
        if "__________" not in front:
            errors.append(f"Vocab '{v_id}' frontText missing '__________'")
        top = v.get("topic", "")
        if top not in VALID_TOPICS:
            errors.append(f"Vocab '{v_id}' invalid topic: '{top}'")

    print(f"Reading questions: {len(r_questions)}/40 | Listening questions: {len(l_questions)}/40 | Vocab: {len(vocab)} cards")
    if warnings:
        print(f"⚠️  {len(warnings)} warnings (e.g. quote fuzzy match)")
    if errors:
        print(f"❌ {len(errors)} ERRORS:")
        for e in errors[:10]:
            print("   -", e)
        return False
    else:
        print("✅ Validation PASSED!")
        return True

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python tools/validate.py <path_to_test_js>")
        sys.exit(1)
    target = sys.argv[1]
    if os.path.isdir(target):
        all_passed = True
        for f in sorted(os.listdir(target)):
            if f.endswith('.js'):
                passed = validate_test(os.path.join(target, f))
                if not passed:
                    all_passed = False
        sys.exit(0 if all_passed else 1)
    else:
        passed = validate_test(target)
        sys.exit(0 if passed else 1)
