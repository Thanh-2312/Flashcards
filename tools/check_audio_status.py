# -*- coding: utf-8 -*-
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('data/tests/cam*.js'))
print(f"Total test files: {len(files)}")

found_audio = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    srcs = re.findall(r'"src":\s*"([^"]+)"', txt)
    valid_srcs = []
    for s in srcs:
        if os.path.exists(s):
            valid_srcs.append(s)
        elif os.path.exists(os.path.join('CAMBRIDGE', s)):
            valid_srcs.append(os.path.join('CAMBRIDGE', s))
    bname = os.path.basename(f).replace('.js', '')
    if valid_srcs:
        found_audio += 1
    if 't1' in bname:
        sample = srcs[0] if srcs else 'None'
        print(f"{bname}: {len(srcs)} audio refs, {len(valid_srcs)} exist (sample: {sample})")

print(f"Tests with valid audio: {found_audio} / {len(files)}")
