# -*- coding: utf-8 -*-
"""
Export referenced audio files for Cam 12 - Cam 20 into a single flat directory
ready for 1-click drag-and-drop upload to GitHub Releases.
"""
import glob
import os
import re
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.join(os.getcwd(), 'release_audio')
os.makedirs(OUT_DIR, exist_ok=True)

files = sorted(glob.glob('data/tests/cam*.js'))
all_srcs = set()

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        all_srcs.update(re.findall(r'"src":\s*"([^"]+)"', fp.read()))

# We focus on Cam 12 - 20 (since Cam 10 - 11 are already in git repository)
target_srcs = [s for s in all_srcs if not ('CAM 10' in s or 'CAM 11' in s or 'Cam10' in s or 'Cam11' in s)]

print(f"Total target audio files for Cam 12-20: {len(target_srcs)}")

copied_count = 0
total_bytes = 0

for src in sorted(target_srcs):
    if not os.path.exists(src):
        print(f"  [MISSING] {src}")
        continue
    
    fname = os.path.basename(src)
    dest_path = os.path.join(OUT_DIR, fname)
    fsize = os.path.getsize(src)
    total_bytes += fsize
    
    # Use copyfile or copy2
    if not os.path.exists(dest_path) or os.path.getsize(dest_path) != fsize:
        shutil.copy2(src, dest_path)
    copied_count += 1

print(f"\nSuccessfully gathered {copied_count} files into: {OUT_DIR}")
print(f"Total size: {total_bytes / (1024*1024):.2f} MB")
