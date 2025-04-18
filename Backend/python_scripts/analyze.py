import sys
import json
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model
import io

# Force UTF-8 encoding for standard output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Ensure we received a file path
if len(sys.argv) < 2:
    print(json.dumps({"error": "No file path provided"}))
    sys.exit(1)

audio_path = sys.argv[1]
print(f"Processing file: {audio_path}")

try:
    # Load and preprocess audio
    y, sr = librosa.load(audio_path, sr=22050)
    print(f"Audio loaded: {len(y)} samples at {sr} Hz")

    # Extract MFCC features (Ensure 32 MFCCs per frame)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=32)
    print(f"Extracted MFCCs shape: {mfccs.shape}")

    # Ensure the input shape is (1, 32, 1) for the model
    # Average MFCCs across time frames and reshape
    mfccs = np.mean(mfccs, axis=1).reshape(1, 32, 1)  # Now it's 32 MFCCs and 1 channel
    print(f"Final input shape before prediction: {mfccs.shape}")

    # Load model
    model = load_model("model/deepfake_voice.h5", compile=False)
    print("Model loaded successfully")
    print(f"Model expected input shape: {model.input_shape}")

    # Predict
    prediction = model.predict(mfccs)
    print(f"Raw prediction: {prediction}")

    # Format response
    confidence = float(prediction[0, 0] * 100)
    label = "Fake" if confidence > 50 else "Real"  # Adjusted the logic based on the confidence value
    result = {
        "label": label,
        "confidence": round(confidence, 2)
    }

    print(json.dumps(result, ensure_ascii=False))

except Exception as e:
    error_message = str(e).encode('utf-8', 'ignore').decode('utf-8')
    print(json.dumps({"error": error_message}, ensure_ascii=False))
    sys.exit(1)
