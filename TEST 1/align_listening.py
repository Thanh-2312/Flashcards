import base64
import json
import os
import sys
import requests

ENCODED_KEY = 'QVEuQWI4Uk42SWNWMUUzR0ZYRVpsOU55RGtOYnNRUmxzRUVyRzJkcDh6ZkhyT202dVVUZkE='
API_KEY = base64.b64decode(ENCODED_KEY).decode('utf-8')

SECTIONS = [
    {
        'id': 'section1',
        'file': 'Cam10-Test1-Section1.mp3',
        'key': 'SECTION 1',
        'title': 'Section 1: Self-Drive Tours in California'
    },
    {
        'id': 'section2',
        'file': 'Cam10-Test1-Section2.mp3',
        'key': 'SECTION 2',
        'title': 'Section 2: LP Leisure Clubs & Facilities'
    },
    {
        'id': 'section3',
        'file': 'Cam10-Test1-Section3.mp3',
        'key': 'SECTION 3',
        'title': 'Section 3: Global Design Competition'
    },
    {
        'id': 'section4',
        'file': 'Cam10-Test1-Section4.mp3',
        'key': 'SECTION 4',
        'title': 'Section 4: Spirit Bear Ecology & Conservation'
    }
]

with open('TEST 1/transcript_parsed.json', 'r', encoding='utf-8') as f:
    all_transcripts = json.load(f)

for sec in SECTIONS:
    output_path = f"TEST 1/{sec['id']}_timed.json"
    if os.path.exists(output_path):
        print(f"File {output_path} already exists, skipping.")
        continue

    print(f"\n================ Processing {sec['title']} ================")
    audio_path = os.path.join('TEST 1/File Listening', sec['file'])
    with open(audio_path, 'rb') as f:
        audio_b64 = base64.b64encode(f.read()).decode('utf-8')

    transcript_text = "\n".join(all_transcripts[sec['key']])

    prompt = f"""You are an expert IELTS listening examiner and audio alignment specialist.
We are synchronizing the audio recording with difficult/academic vocabulary and the transcript for IELTS students.

Section: {sec['title']}
Audio File: {sec['file']}

Official Transcript:
\"\"\"
{transcript_text}
\"\"\"

Listen to the audio very carefully from 0:00 to the end.
Provide:
1. 'section_id': '{sec['id']}'
2. 'title': '{sec['title']}'
3. 'audio_file': 'TEST 1/File Listening/{sec['file']}'
4. 'vocabulary': A comprehensive chronological list of ALL difficult, academic, C1/B2/B1 level words, topic-specific terms, and IELTS collocations spoken in the audio.
   For EVERY word/phrase:
   - 'word': the word or phrase in English (canonical form e.g. 'refurbish', 'brochure')
   - 'matched_text': the exact form heard in speech (e.g. 'refurbished', 'brochures')
   - 'start': exact float seconds in audio when this word begins being spoken (e.g. 82.4)
   - 'end': exact float seconds in audio when this word finishes being spoken (e.g. 83.3)
   - 'ipa': accurate phonetic transcription (e.g. '/ˌriːˈfɜː.bɪʃ/')
   - 'type': part of speech ('noun', 'verb', 'adjective', 'collocation', 'idiom', 'phrase')
   - 'level': CEFR / IELTS band level ('B1', 'B2', 'C1', 'C2')
   - 'meaning': clear Vietnamese definition/meaning
   - 'context': the exact sentence spoken in the audio containing this word
   - 'tip': short IELTS study tip, collocations or memory cue in Vietnamese
5. 'segments': The spoken transcript segmented chronologically with start and end times:
   - 'speaker': speaker name or 'Narrator'
   - 'start': float (seconds)
   - 'end': float (seconds)
   - 'text': string

Requirements:
- Timestamps MUST be aligned with the actual spoken speech in the audio (taking into account the introductory announcement before the conversation begins).
- Extract at least 25 to 40 rich vocabulary entries per section so the user has an impactful, continuous learning experience as the audio plays.
- Return ONLY valid JSON (no markdown formatting, no code blocks).
"""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"
    payload = {
        'contents': [{
            'parts': [
                {'inlineData': {'mimeType': 'audio/mp3', 'data': audio_b64}},
                {'text': prompt}
            ]
        }],
        'generationConfig': {
            'responseMimeType': 'application/json'
        }
    }

    try:
        print(f"Calling Gemini 2.5 Flash for {sec['id']}...")
        res = requests.post(url, json=payload, timeout=240)
        if res.status_code == 200:
            data = res.json()
            raw_text = data['candidates'][0]['content']['parts'][0]['text']
            parsed = json.loads(raw_text)
            with open(output_path, 'w', encoding='utf-8') as out_f:
                json.dump(parsed, out_f, ensure_ascii=False, indent=2)
            print(f"Successfully processed {sec['id']}: {len(parsed.get('vocabulary', []))} vocab words, {len(parsed.get('segments', []))} transcript segments.")
        else:
            print(f"Error for {sec['id']}: HTTP {res.status_code} - {res.text[:300]}")
    except Exception as e:
        print(f"Exception while processing {sec['id']}: {e}")

print("\nAll done!")
