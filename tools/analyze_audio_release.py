# -*- coding: utf-8 -*-
import glob
import os
import re
import sys
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('data/tests/cam*.js'))
audio_map = {} # test_name -> list of (section_num, src_path)

for f in files:
    test_id = os.path.basename(f).replace('.js', '')
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    srcs = re.findall(r'"src":\s*"([^"]+)"', content)
    audio_map[test_id] = srcs

all_srcs = set()
for s_list in audio_map.values():
    all_srcs.update(s_list)

print(f"Total distinct audio paths across all 44 tests: {len(all_srcs)}")

# Check duplicate basenames
basenames = [os.path.basename(s) for s in all_srcs]
counts = Counter(basenames)
dupes = {k: v for k, v in counts.items() if v > 1}

print(f"Total files: {len(basenames)}, Unique basenames: {len(counts)}")
if dupes:
    print(f"Duplicate basenames ({len(dupes)}):")
    for name, cnt in dupes.items():
        matching = [s for s in all_srcs if os.path.basename(s) == name]
        print(f"  '{name}' appears {cnt} times:")
        for m in matching:
            print(f"    - {m}")
else:
    print("All filenames are 100% UNIQUE!")
