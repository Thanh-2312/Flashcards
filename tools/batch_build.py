# -*- coding: utf-8 -*-
"""
Batch builds all tests in data/raw/*.json to data/tests/*.js
and runs validation.
"""
import os
import sys
import glob
from build_test_from_raw import build_test_from_raw
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

def batch_build():
    raw_files = sorted(glob.glob("data/raw/cam*.json"))
    print(f"Starting batch build for {len(raw_files)} tests...")

    success_count = 0
    passed_val_count = 0
    errors = []

    from build_cam10_t1 import build_cam10_t1

    for raw_f in raw_files:
        test_name = os.path.basename(raw_f).replace('.json', '')
        try:
            if test_name == 'cam10_t1':
                out_file = build_cam10_t1()
            else:
                out_file = build_test_from_raw(raw_f)
            success_count += 1

            # Validate
            res = subprocess.run(
                ["python", "tools/validate.py", out_file],
                capture_output=True,
                text=True,
                encoding='utf-8'
            )
            if "Validation PASSED" in res.stdout:
                passed_val_count += 1
                print(f"[{test_name}] ✅ Built and Passed Validation")
            else:
                err_lines = [l for l in res.stdout.split('\n') if "ERRORS" in l or "   -" in l]
                print(f"[{test_name}] ⚠️ Built, but validation had notes: {err_lines[:2]}")
        except Exception as e:
            print(f"[{test_name}] ❌ Build failed: {e}")
            errors.append((test_name, str(e)))

    print("\n" + "=" * 50)
    print(f"BATCH BUILD SUMMARY:")
    print(f"Total raw files: {len(raw_files)}")
    print(f"Successfully built: {success_count} / {len(raw_files)}")
    print(f"Passed Schema 3.1 validation: {passed_val_count} / {len(raw_files)}")
    if errors:
        print(f"Errors ({len(errors)}):")
        for t, err in errors:
            print(f"  - {t}: {err}")
    print("=" * 50)

if __name__ == '__main__':
    batch_build()
