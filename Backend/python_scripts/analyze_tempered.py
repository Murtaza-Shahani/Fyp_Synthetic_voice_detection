import sys
import json
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

if len(sys.argv) < 2:
    print(json.dumps({"error": "No file path provided"}))
    sys.exit(1)

audio_path = sys.argv[1]
print(f"Processing file: {audio_path}")

try:
    y, sr = librosa.load(audio_path, sr=22050)
    print(f"Audio loaded: {len(y)} samples at {sr} Hz")

    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=32)
    mfccs = np.mean(mfccs, axis=1).reshape(1, 32, 1)

    model = load_model("model/tempered_voice.h5", compile=False)
    print("Tempered model loaded successfully")

    prediction = model.predict(mfccs)
    print(f"Prediction (Real or Fake): {prediction}")

    segments = []  # Segment-wise analysis
    for i in range(len(y)//len(mfccs)):
        start = i * len(mfccs)
        end = (i + 1) * len(mfccs)
        label = "Real" if prediction[i] < 0.5 else "Fake"
        segments.append({"start": start, "end": end, "label": label})

    confidence = float(prediction[0][0] * 100)
    result = {
        "label": "Real" if prediction[0][0] < 0.5 else "Fake",
        "confidence": round(confidence, 2),
        "segments": segments
    }

    print(json.dumps(result, ensure_ascii=False))

except Exception as e:
    error_message = str(e).encode('utf-8', 'ignore').decode('utf-8')
    print(json.dumps({"error": error_message}, ensure_ascii=False))
    sys.exit(1)
