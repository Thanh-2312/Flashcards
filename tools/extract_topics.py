# -*- coding: utf-8 -*-
"""
Extract the 8 legacy IELTS vocabulary topics from build_cambridge_db .pyc cache
and save them into data/legacy_topics.json.
"""
import os
import sys
import json
import importlib.util

def extract_topics():
    pyc_path = os.path.join(os.path.dirname(__file__), '..', '__pycache__', 'build_cambridge_db.cpython-314.pyc')
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_dir, exist_ok=True)
    out_path = os.path.join(data_dir, 'legacy_topics.json')

    topics = []
    if os.path.exists(pyc_path):
        try:
            spec = importlib.util.spec_from_file_location('build_cambridge_db', pyc_path)
            mod = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(mod)
            topics = getattr(mod, 'VOCABULARY_TOPICS', [])
            print(f"Loaded {len(topics)} topics from {pyc_path}")
        except Exception as e:
            print(f"Error loading pyc: {e}")

    if not topics:
        # Fallback to check cambridge_data.js if any
        cam_data_path = os.path.join(os.path.dirname(__file__), '..', 'cambridge_data.js')
        if os.path.exists(cam_data_path):
            with open(cam_data_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Check if topics array is in cambridge_data
                if '"topics":' in content:
                    idx = content.find('"topics":')
                    # Could parse json
                    pass

    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(topics, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(topics)} topics to {out_path}")
    return topics

if __name__ == '__main__':
    extract_topics()
