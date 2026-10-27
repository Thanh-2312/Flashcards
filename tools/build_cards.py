# -*- coding: utf-8 -*-
"""
Phase 4: Generate cambridge_cards.js adhering to Schema 3.2.
Aggregates vocab from data/tests/*.js and data/legacy_topics.json,
maps legacy topics to 9 valid topics, deduplicates by lemma,
removes cards already in DEFAULT_CARDS, and ensures 100% compliant cloze blanks.
"""
import os
import re
import sys
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

TOPIC_MAP = {
    'travel': 'travel',
    'environment': 'environment',
    'architecture': 'architecture',
    'science': 'science',
    'health': 'health',
    'education': 'education',
    'business': 'economy',
    'economy': 'economy',
    'psychology': 'psychology',
    'communication': 'communication'
}

VALID_TOPICS = set(TOPIC_MAP.values())

def get_default_card_lemmas():
    """Extract lower-case english words already in DEFAULT_CARDS from app.js."""
    app_js_path = os.path.join(os.path.dirname(__file__), "..", "app.js")
    with open(app_js_path, "r", encoding="utf-8") as f:
        text = f.read()
    matches = re.findall(r"english:\s*['\"]([^'\"]+)['\"]", text)
    return {m.strip().lower() for m in matches}

def clean_lemma(word):
    lemma = word.strip().lower()
    lemma = re.sub(r'[^a-z0-9]+', '-', lemma).strip('-')
    return lemma

def ensure_cloze(front_text, target_word, vietnamese):
    if not front_text or "__________" not in front_text:
        if front_text and re.search(re.escape(target_word), front_text, re.IGNORECASE):
            front_text = re.sub(re.escape(target_word), "__________", front_text, flags=re.IGNORECASE)
        else:
            front_text = f"Context: __________ ({vietnamese})"
    return front_text

def build_cards():
    default_lemmas = get_default_card_lemmas()
    print(f"Found {len(default_lemmas)} existing lemmas in DEFAULT_CARDS.")

    cards_by_lemma = {}

    # 1. From data/legacy_topics.json
    legacy_path = os.path.join(os.path.dirname(__file__), "..", "data", "legacy_topics.json")
    if os.path.exists(legacy_path):
        with open(legacy_path, "r", encoding="utf-8") as f:
            legacy_topics = json.load(f)
        for t in legacy_topics:
            raw_tid = t.get("topic_id", "communication")
            mapped_topic = TOPIC_MAP.get(raw_tid, "communication")

            for w in t.get("words", []):
                eng = w.get("word", "").strip()
                if not eng:
                    continue
                lemma = clean_lemma(eng)
                if eng.lower() in default_lemmas:
                    continue

                w_type = w.get("type", "noun")
                category = "collocations" if (" " in eng or w_type == "phrase") else "words"
                front = ensure_cloze(w.get("frontBlank") or w.get("exampleEn"), eng, w.get("vietnamese", ""))

                card = {
                    "id": f"cam-{lemma}",
                    "category": category,
                    "topic": mapped_topic,
                    "english": eng,
                    "ipa": f"{w.get('ipa', '')} ({w_type} - {w.get('level', 'B2')})",
                    "vietnamese": w.get("vietnamese", ""),
                    "frontText": front,
                    "context": w.get("exampleEn") or w.get("context", ""),
                    "exampleEn": w.get("exampleEn", ""),
                    "acceptedAnswers": w.get("acceptedAnswers", [eng]),
                    "source": [w.get("source", "CAMBRIDGE Academic")],
                    "interval": 1,
                    "boxLevel": 1,
                    "nextReviewDate": 0,
                    "createdDate": 0
                }
                cards_by_lemma[lemma] = card

    # 2. From data/tests/*.js
    tests_dir = os.path.join(os.path.dirname(__file__), "..", "data", "tests")
    if os.path.exists(tests_dir):
        for f in os.listdir(tests_dir):
            if f.endswith(".js"):
                f_path = os.path.join(tests_dir, f)
                abs_p = os.path.abspath(f_path).replace("\\", "/")
                node_cmd = f"const fs = require('fs'); global.window = {{}}; eval(fs.readFileSync('{abs_p}', 'utf-8')); const k = Object.keys(global.window.CAM_TESTS)[0]; console.log(JSON.stringify(global.window.CAM_TESTS[k].vocab || []));"
                proc = subprocess.run(["node", "-e", node_cmd], capture_output=True, text=True, encoding="utf-8")
                if proc.returncode == 0 and proc.stdout.strip():
                    test_vocab = json.loads(proc.stdout)
                    for tv in test_vocab:
                        eng = tv.get("english", "").strip()
                        if not eng or eng.lower() in default_lemmas:
                            continue
                        lemma = clean_lemma(eng)
                        if lemma in cards_by_lemma:
                            # Merge sources
                            existing_src = cards_by_lemma[lemma].get("source", [])
                            for s in tv.get("source", []):
                                if s not in existing_src:
                                    existing_src.append(s)
                            cards_by_lemma[lemma]["source"] = existing_src
                        else:
                            tv["topic"] = TOPIC_MAP.get(tv.get("topic"), "communication")
                            tv["frontText"] = ensure_cloze(tv.get("frontText"), eng, tv.get("vietnamese", ""))
                            cards_by_lemma[lemma] = tv

    final_cards = list(cards_by_lemma.values())

    # Validation
    unique_ids = set()
    for c in final_cards:
        if c["id"] in unique_ids:
            print(f"ERROR: Duplicate card id {c['id']}")
        unique_ids.add(c["id"])
        if "__________" not in c["frontText"]:
            print(f"ERROR: Card {c['id']} missing blank in frontText!")
        if c["topic"] not in VALID_TOPICS:
            print(f"ERROR: Card {c['id']} invalid topic {c['topic']}")

    out_file = os.path.join(os.path.dirname(__file__), "..", "cambridge_cards.js")
    js_content = f"""/**
 * Cambridge IELTS B2-C2 Academic Flashcards Database
 * Auto-generated by tools/build_cards.py
 * Total cards: {len(final_cards)}
 */
window.CAMBRIDGE_CARDS = {json.dumps(final_cards, ensure_ascii=False, indent=2)};
"""
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"SUCCESS: Generated {out_file} with {len(final_cards)} cards ({os.path.getsize(out_file)} bytes).")
    by_topic = {}
    for c in final_cards:
        by_topic[c["topic"]] = by_topic.get(c["topic"], 0) + 1
    print("Cards by topic:", by_topic)

if __name__ == '__main__':
    build_cards()
