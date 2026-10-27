# -*- coding: utf-8 -*-
import os, sys, glob, json

sys.stdout.reconfigure(encoding='utf-8')
base_dir = r"c:\Users\thanh\Documents\English- IELTS\FLASHCARD\CAMBRIDGE\CAMBRIDGE IELTS 10-20"

for cam_num in range(12, 21):
    cam_folder = os.path.join(base_dir, f"CAM {cam_num}")
    if not os.path.exists(cam_folder):
        print(f"CAM {cam_num} NOT FOUND")
        continue
    
    print(f"\n==================== CAM {cam_num} ====================")
    
    # 1. Listening
    list_folders = [f for f in os.listdir(cam_folder) if 'listen' in f.lower() and os.path.isdir(os.path.join(cam_folder, f))]
    if list_folders:
        list_path = os.path.join(cam_folder, list_folders[0])
        test_subdirs = sorted(os.listdir(list_path))
        print(f"Listening Tests found: {test_subdirs}")
        for t_dir in test_subdirs[:2]: # check first 2
            tp = os.path.join(list_path, t_dir)
            if os.path.isdir(tp):
                files = os.listdir(tp)
                docxs = [f for f in files if f.endswith('.docx') and not f.startswith('~$')]
                audios = [f for f in files if f.endswith(('.mp3', '.m4a'))]
                # check subfolders
                for sf in [f for f in files if os.path.isdir(os.path.join(tp, f))]:
                    sub_files = os.listdir(os.path.join(tp, sf))
                    sub_audios = [f for f in sub_files if f.endswith(('.mp3', '.m4a'))]
                    if sub_audios:
                        audios.extend([os.path.join(sf, sa) for sa in sub_audios])
                print(f"  [{t_dir}] Docx: {docxs} | Audios: {audios[:4]}")
    
    # 2. Reading
    read_folders = [f for f in os.listdir(cam_folder) if 'read' in f.lower() and os.path.isdir(os.path.join(cam_folder, f))]
    if read_folders:
        read_path = os.path.join(cam_folder, read_folders[0])
        read_files = os.listdir(read_path)
        print(f"Reading folder files/dirs: {read_files[:6]}")
