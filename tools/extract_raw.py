# -*- coding: utf-8 -*-
"""
Phase 1: Raw extraction of Cambridge IELTS 10-20 materials.
Extracts raw docx text, answers, transcript markers, audio paths, and images.
Generates data/raw/{testId}.json and data/raw/_report.md.
"""
import os
import re
import sys
import json
from docx_utils import (
    get_docx_paragraphs,
    clean_text,
    extract_docx_images,
    parse_answer_key,
    extract_transcript_markers
)

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"CAMBRIDGE/CAMBRIDGE IELTS 10-20"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
IMG_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "img")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

def find_test_files(cam_num, test_num):
    cam_folder = os.path.join(BASE_DIR, f"CAM {cam_num}")
    if not os.path.exists(cam_folder):
        return None

    res = {
        "reading_doc": None,
        "reading_key_doc": None,
        "listening_q_doc": None,
        "listening_tr_doc": None,
        "listening_key_doc": None,
        "audio_files": []
    }

    t_str = f"test {test_num}"
    t_compact = f"test{test_num}"
    t_short = f"t{test_num}"

    def matches_test(name):
        n = name.lower()
        return (t_str in n or t_compact in n or t_short in n) and not n.startswith("~$")

    # 1. Reading
    r_candidates = [d for d in os.listdir(cam_folder) if "read" in d.lower() and os.path.isdir(os.path.join(cam_folder, d))]
    if r_candidates:
        rp = os.path.join(cam_folder, r_candidates[0])
        # Check files/dirs in Reading folder
        for item in os.listdir(rp):
            if item.startswith("~$"):
                continue
            item_path = os.path.join(rp, item)
            if os.path.isdir(item_path):
                if matches_test(item):
                    # Inside test folder (e.g. CAM 10 TEST 1, CAM 17 Test 1, etc.)
                    sub_files = [f for f in os.listdir(item_path) if f.lower().endswith(".docx") and not f.startswith("~$")]
                    for sf in sub_files:
                        sfp = os.path.join(item_path, sf)
                        sfl = sf.lower()
                        if "key" in sfl or "ans" in sfl:
                            res["reading_key_doc"] = sfp
                        else:
                            res["reading_doc"] = sfp
            elif item.lower().endswith(".docx"):
                # Direct file in reading folder (e.g. CAM 12 TEST 1.docx)
                if matches_test(item):
                    if "key" in item.lower() or "ans" in item.lower():
                        res["reading_key_doc"] = item_path
                    else:
                        res["reading_doc"] = item_path

    # 2. Listening
    l_candidates = [d for d in os.listdir(cam_folder) if "listen" in d.lower() and os.path.isdir(os.path.join(cam_folder, d))]
    if l_candidates:
        lp = os.path.join(cam_folder, l_candidates[0])
        for item in os.listdir(lp):
            if item.startswith("~$"):
                continue
            item_path = os.path.join(lp, item)
            if os.path.isdir(item_path) and matches_test(item):
                # Search inside test folder (including nested folders like CAM 18's LISTENING subfolder)
                all_docx = []
                for root, dirs, files in os.walk(item_path):
                    for f in files:
                        fp = os.path.join(root, f)
                        fl = f.lower()
                        if fl.endswith((".mp3", ".m4a", ".wav")):
                            res["audio_files"].append(fp)
                        elif fl.endswith(".docx") and not f.startswith("~$"):
                            all_docx.append(fp)

                # Classify docx files in listening
                for dp in all_docx:
                    dname = os.path.basename(dp).lower()
                    if "key" in dname:
                        res["listening_key_doc"] = dp
                    elif "trans" in dname or "script" in dname:
                        res["listening_tr_doc"] = dp
                    elif "question" in dname or "đề" in dname or "q" in dname:
                        res["listening_q_doc"] = dp
                    else:
                        # Fallback heuristic: check if transcript or questions
                        if not res["listening_q_doc"]:
                            res["listening_q_doc"] = dp
                        elif not res["listening_tr_doc"]:
                            res["listening_tr_doc"] = dp

    # Sort audio files naturally
    res["audio_files"].sort()
    return res

def run_extraction():
    reports = []
    print("Starting raw extraction for Cambridge 10-20...")

    for cam in range(10, 21):
        for test in range(1, 5):
            test_id = f"cam{cam}_t{test}"
            print(f"Processing {test_id}...")

            found = find_test_files(cam, test)
            if not found:
                print(f"  Skipping {test_id}: folder not found")
                continue

            extracted_images = []

            # 1. Reading
            reading_text = []
            if found["reading_doc"]:
                reading_text = get_docx_paragraphs(found["reading_doc"])
                imgs = extract_docx_images(found["reading_doc"], IMG_DIR, f"{test_id}_r")
                extracted_images.extend(imgs)

            reading_key = {}
            if found["reading_key_doc"]:
                reading_key = parse_answer_key(found["reading_key_doc"])
            else:
                # Try finding answers inside reading_doc
                if reading_text:
                    reading_key = parse_answer_key(reading_text)

            # 2. Listening questions & transcript
            listening_q_text = []
            if found["listening_q_doc"]:
                listening_q_text = get_docx_paragraphs(found["listening_q_doc"])
                imgs = extract_docx_images(found["listening_q_doc"], IMG_DIR, f"{test_id}_l")
                extracted_images.extend(imgs)

            listening_tr_text = []
            if found["listening_tr_doc"]:
                listening_tr_text = get_docx_paragraphs(found["listening_tr_doc"])

            # 3. Listening key
            listening_key = {}
            if found["listening_key_doc"]:
                listening_key = parse_answer_key(found["listening_key_doc"])
            if not listening_key and found["listening_tr_doc"]:
                # Try finding answers in transcript file (many tests put ANSWER KEY at the bottom)
                listening_key = parse_answer_key(listening_tr_text)
            if not listening_key and found["listening_q_doc"]:
                listening_key = parse_answer_key(listening_q_text)

            # 4. Transcript markers (Q1), (Q2), etc.
            transcript_markers = extract_transcript_markers(listening_tr_text)

            # Build record
            raw_data = {
                "id": test_id,
                "book": cam,
                "test": test,
                "files": {
                    "reading": os.path.relpath(found["reading_doc"], os.path.dirname(BASE_DIR)) if found["reading_doc"] else None,
                    "reading_key": os.path.relpath(found["reading_key_doc"], os.path.dirname(BASE_DIR)) if found["reading_key_doc"] else None,
                    "listening_q": os.path.relpath(found["listening_q_doc"], os.path.dirname(BASE_DIR)) if found["listening_q_doc"] else None,
                    "listening_tr": os.path.relpath(found["listening_tr_doc"], os.path.dirname(BASE_DIR)) if found["listening_tr_doc"] else None,
                    "listening_key": os.path.relpath(found["listening_key_doc"], os.path.dirname(BASE_DIR)) if found["listening_key_doc"] else None,
                    "audio": [os.path.relpath(a, os.path.dirname(BASE_DIR)) for a in found["audio_files"]]
                },
                "reading_text": reading_text,
                "reading_key": reading_key,
                "listening_q_text": listening_q_text,
                "listening_tr_text": listening_tr_text,
                "listening_key": listening_key,
                "transcript_markers": transcript_markers,
                "images": extracted_images
            }

            out_json = os.path.join(OUTPUT_DIR, f"{test_id}.json")
            with open(out_json, "w", encoding="utf-8") as f:
                json.dump(raw_data, f, ensure_ascii=False, indent=2)

            # Collect metrics for report
            reports.append({
                "id": test_id,
                "r_passages": len(reading_text),
                "r_key_count": len(reading_key),
                "l_q_lines": len(listening_q_text),
                "l_tr_lines": len(listening_tr_text),
                "l_key_count": len(listening_key),
                "audio_count": len(found["audio_files"]),
                "markers_count": len(transcript_markers),
                "images_count": len(extracted_images),
                "notes": []
            })

    # Write report
    report_md_path = os.path.join(OUTPUT_DIR, "_report.md")
    with open(report_md_path, "w", encoding="utf-8") as f:
        f.write("# Cambridge IELTS 10-20 Raw Extraction Report\n\n")
        f.write(f"Total tests processed: {len(reports)} / 44\n\n")
        f.write("| Test ID | Reading Key (Q/40) | Reading Doc | Listening Key (Q/40) | Transcript | Audio Files | Markers (Qn) | Images |\n")
        f.write("|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n")
        for r in reports:
            r_key_str = f"**{r['r_key_count']}**" if r['r_key_count'] == 40 else f"<span style='color:red'>{r['r_key_count']}</span>"
            l_key_str = f"**{r['l_key_count']}**" if r['l_key_count'] == 40 else f"<span style='color:red'>{r['l_key_count']}</span>"
            r_doc_ok = "✅" if r["r_passages"] > 0 else "❌"
            tr_ok = f"✅ ({r['l_tr_lines']} lines)" if r["l_tr_lines"] > 0 else "❌"
            audio_str = f"{r['audio_count']} file(s)"
            markers_str = f"{r['markers_count']} markers" if r['markers_count'] > 0 else "None"
            f.write(f"| {r['id']} | {r_key_str} | {r_doc_ok} | {l_key_str} | {tr_ok} | {audio_str} | {markers_str} | {r['images_count']} |\n")

    print(f"\nExtraction complete! Saved {len(reports)} JSON files to {OUTPUT_DIR}")
    print(f"Report written to {report_md_path}")

if __name__ == '__main__':
    run_extraction()
