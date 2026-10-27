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

all_srcs = set()
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        all_srcs.update(re.findall(r'"src":\s*"([^"]+)"', fp.read()))

total_bytes = sum(os.path.getsize(s) for s in all_srcs if os.path.exists(s))
print(f"Distinct referenced audio files: {len(all_srcs)}")
cam10_11_srcs = {s for s in all_srcs if 'CAM 10' in s or 'CAM 11' in s or 'Cam10' in s or 'Cam11' in s}
cam12_20_srcs = all_srcs - cam10_11_srcs
print(f"Cam 10-11 audio: {len(cam10_11_srcs)} files, {sum(os.path.getsize(s) for s in cam10_11_srcs if os.path.exists(s))/(1024*1024):.2f} MB")
print(f"Cam 12-20 audio: {len(cam12_20_srcs)} files, {sum(os.path.getsize(s) for s in cam12_20_srcs if os.path.exists(s))/(1024*1024):.2f} MB")
