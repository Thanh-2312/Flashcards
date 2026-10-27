# -*- coding: utf-8 -*-
"""
Docx parsing and answer key extraction utilities for Cambridge IELTS materials.
"""
import os
import re
import zipfile
import xml.etree.ElementTree as ET

def clean_text(s):
    if not s:
        return ""
    t = s.replace('\xa0', ' ').replace('\u2013', '-').replace('\u2014', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"')
    return re.sub(r'\s+', ' ', t).strip()

def get_docx_paragraphs(path):
    """
    Extracts ordered text paragraphs from a docx file (including table cells).
    """
    if not os.path.exists(path):
        return []
    try:
        with zipfile.ZipFile(path) as z:
            if 'word/document.xml' not in z.namelist():
                return []
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            texts = []
            for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                t = ''.join([node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text])
                ct = clean_text(t)
                if ct:
                    texts.append(ct)
            return texts
    except Exception as e:
        print(f"Error reading docx {path}: {e}")
        return []

def extract_docx_images(docx_path, out_dir, prefix):
    """
    Extracts all images from word/media/ inside docx to out_dir with prefix.
    Returns list of relative paths to extracted images.
    """
    if not os.path.exists(docx_path):
        return []
    os.makedirs(out_dir, exist_ok=True)
    saved_images = []
    try:
        with zipfile.ZipFile(docx_path) as z:
            media_files = [m for m in z.namelist() if m.startswith('word/media/')]
            for i, media_name in enumerate(sorted(media_files), start=1):
                ext = os.path.splitext(media_name)[1].lower()
                if not ext:
                    ext = '.png'
                out_filename = f"{prefix}_{i}{ext}"
                target_path = os.path.join(out_dir, out_filename)
                with open(target_path, 'wb') as f_out:
                    f_out.write(z.read(media_name))
                # Store path with forward slashes for cross-platform web usage
                rel_path = f"data/img/{out_filename}"
                saved_images.append(rel_path)
    except Exception as e:
        print(f"Error extracting images from {docx_path}: {e}")
    return saved_images

def parse_answer_key(paragraphs_or_path):
    """
    Parses answer key from list of lines or docx file.
    Supports formats:
    - 1. TRUE or 1 TRUE
    - 1-2 B, D or 1 & 2 B, D or 1 and 2 B, D
    - 21/22 B/D
    - Handles notes and explanations after the key
    """
    if isinstance(paragraphs_or_path, str):
        lines = get_docx_paragraphs(paragraphs_or_path)
    else:
        lines = paragraphs_or_path

    answers = {}
    for line in lines:
        cleaned = clean_text(line)
        if not cleaned:
            continue
        
        # Stop or skip known non-answer header/glossary lines if encountered
        # e.g., 'republican regime: chế độ cộng hoà'
        if ':' in cleaned and not re.match(r'^\d', cleaned):
            continue
            
        # Pattern for multi-question range: e.g. "1-2 B, D" or "21 & 22 C, E" or "21 and 22 C, E"
        m_range = re.match(r'^(\d+)[\s\-–—&,]+(?:and\s+)?(\d+)[\.\s:]+(.+)$', cleaned, re.IGNORECASE)
        if m_range:
            q1 = int(m_range.group(1))
            q2 = int(m_range.group(2))
            val = m_range.group(3).strip()
            # If val contains comma/slash separated answers like "B, D" or "C / E"
            parts = [p.strip() for p in re.split(r'[,/]', val) if p.strip()]
            if len(parts) == 2 and (q2 - q1 == 1):
                answers[q1] = parts[0]
                answers[q2] = parts[1]
            else:
                answers[q1] = val
        # Pattern for single question: e.g. "1. FALSE" or "14 C" or "1. (the) newspaper"
        m_single = re.match(r'^(\d+)[\.\s:]+(.+)$', cleaned)
        if m_single:
            q_num = int(m_single.group(1))
            val = m_single.group(2).strip()
            if 1 <= q_num <= 40:
                answers[q_num] = val
            continue

    # If direct line matching found fewer than 30 answers, try inline (Qn - ans) patterns
    if len(answers) < 30:
        for line in lines:
            cleaned = clean_text(line)
            # Match: (Q1 - deer antlers) or (Q14 - C)
            for m in re.finditer(r'\(Q(\d+)\s*[-–:]\s*([^\)]+)\)', cleaned, re.IGNORECASE):
                q = int(m.group(1))
                a = m.group(2).strip()
                if 1 <= q <= 40 and q not in answers:
                    answers[q] = a
            # Match: word(s) (Q6) e.g., 'druids (Q6)'
            for m in re.finditer(r'([A-Za-z0-9\s\/\'\-]+)\s*\(Q(\d+)\)', cleaned, re.IGNORECASE):
                word_cand = m.group(1).strip().split()
                q = int(m.group(2))
                if 1 <= q <= 40 and q not in answers and word_cand:
                    answers[q] = ' '.join(word_cand[-3:])

    return answers

def extract_transcript_markers(paragraphs):
    """
    Extracts question markers like (Q1), (Q2) from transcript lines.
    Returns dict { q_num_str: line_text }
    """
    markers = {}
    for l in paragraphs:
        cleaned = clean_text(l)
        found = re.findall(r'\(Q(\d+)\)', cleaned, re.IGNORECASE)
        for q in found:
            markers[str(int(q))] = cleaned
    return markers
