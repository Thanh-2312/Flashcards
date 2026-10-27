# -*- coding: utf-8 -*-
"""
Fixes audio src paths in data/tests/*.js to ensure all audio sources
point to valid relative paths on disk.
"""
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('data/tests/cam*.js'))
fixed_count = 0
total_audio_refs = 0
verified_refs = 0

changed_in_file = False

def fix_all_audio_paths():
    files = sorted(glob.glob('data/tests/cam*.js'))
    fixed_count = 0
    total_audio_refs = 0
    verified_refs = 0
    unverified_list = []

    for f in files:
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()

        file_changed = [False]

        def replace_src(match):
            nonlocal total_audio_refs, verified_refs
            total_audio_refs += 1
            path = match.group(1)

            # Check direct existence
            if os.path.exists(path):
                verified_refs += 1
                return f'"src": "{path}"'

            # Check with CAMBRIDGE/ prefix
            with_cam = ('CAMBRIDGE/' + path.lstrip('/')).replace('\\', '/')
            if os.path.exists(with_cam):
                file_changed[0] = True
                verified_refs += 1
                return f'"src": "{with_cam}"'

            unverified_list.append((os.path.basename(f), path))
            return f'"src": "{path}"'

        new_content = re.sub(r'"src":\s*"([^"]+)"', replace_src, content)

        if file_changed[0]:
            fixed_count += 1
            with open(f, 'w', encoding='utf-8') as fp:
                fp.write(new_content)

    print(f"Fixed audio paths in {fixed_count} test files.")
    print(f"Total audio references: {total_audio_refs}, Verified existing on disk: {verified_refs}")
    if unverified_list:
        print(f"Sample unverified paths ({len(unverified_list)}):")
        for test_f, p in unverified_list[:8]:
            print(f"  [{test_f}] {p}")

if __name__ == '__main__':
    fix_all_audio_paths()
