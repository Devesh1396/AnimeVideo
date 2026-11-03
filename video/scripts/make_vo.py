"""Generate the draft Hindi VO (edge-tts, hi-IN-SwaraNeural) with word timings.
Writes video/public/audio/vo/<id>.wav (trimmed, 48 kHz mono, sped up slightly) and video/src/vo-timings.json."""
import asyncio, json, os, ssl, subprocess, sys
import edge_tts
import edge_tts.communicate as ecm

ecm._SSL_CTX = ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
PROXY = os.environ.get('HTTPS_PROXY')
OUT = '/home/user/AnimeVideo/video/public/audio/vo'
TEMPO = 1.05  # gentle speed-up so the whole read fits the reel

LINES = {
    's1': ('कॉन्सेप्ट्स क्लियर हैं, फिर भी सिली मिस्टेक्स?', '+15%'),
    's2': ('जल्दबाज़ी, ध्यान भटकना, फ़ॉर्मूले भूल जाना। ये तो सिर्फ़ साइन्स हैं।', '+18%'),
    's3': ('सिर्फ़ प्रैक्टिस बढ़ाने से, ये गलतियाँ नहीं रुकेंगी।', '+18%'),
    's4': ('इसीलिए, फ़्री कैलकुलेशन एफ़िशिएंसी टेस्ट! गिनीज़ रिकॉर्ड होल्डर देवेश सर का बनाया। जानिए गलतियाँ क्यों होती हैं, और पहले क्या सुधारें।', '+22%'),
    's5': ('साथ में बोनस, पाँच सौ रुपये की सी टी एम मास्टरक्लास, सिर्फ़ लिमिटेड पीरियड के लिए!', '+18%'),
    's6': ('क्लास तीन से ऊपर के बच्चों के लिए। अभी व्हाट्सऐप करें!', '+15%'),
}


async def gen(key, text, rate):
    c = edge_tts.Communicate(text, 'hi-IN-SwaraNeural', rate=rate, proxy=PROXY, boundary='WordBoundary')
    audio = bytearray()
    words = []
    async for m in c.stream():
        if m['type'] == 'audio':
            audio += m['data']
        elif m['type'] == 'WordBoundary':
            words.append({'w': m['text'], 't': m['offset'] / 1e7, 'd': m['duration'] / 1e7})
    mp3 = f'{OUT}/{key}.mp3'
    open(mp3, 'wb').write(audio)
    return mp3, words


def lead_silence(path):
    # seconds of leading silence (same threshold as the trim)
    r = subprocess.run(['ffmpeg', '-v', 'info', '-i', path, '-af', 'silencedetect=n=-45dB:d=0.05', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    for line in r.splitlines():
        if 'silence_end' in line:
            start = float(line.split('silence_end:')[1].split('|')[0])
            first = [l for l in r.splitlines() if 'silence_start' in l][0]
            if float(first.split('silence_start:')[1]) <= 0.01:
                return start
            return 0.0
    return 0.0


async def main():
    os.makedirs(OUT, exist_ok=True)
    timings = {}
    for key, (text, rate) in LINES.items():
        mp3, words = await gen(key, text, rate)
        lead = lead_silence(mp3)
        wav = f'{OUT}/{key}.wav'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp3, '-af',
                        f'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo={TEMPO}',
                        '-ar', '48000', '-ac', '1', wav], check=True)
        os.remove(mp3)
        dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav],
                                   capture_output=True, text=True).stdout)
        timings[key] = {
            'text': text,
            'duration': round(dur, 3),
            'words': [{'w': w['w'], 't': round(max(0, w['t'] - lead) / TEMPO, 3)} for w in words],
        }
        print(key, round(dur, 2), [(w['w'], timings[key]['words'][i]['t']) for i, w in enumerate(words)])
    json.dump(timings, open('/home/user/AnimeVideo/video/src/vo-timings.json', 'w'), ensure_ascii=False, indent=1)


asyncio.run(main())
