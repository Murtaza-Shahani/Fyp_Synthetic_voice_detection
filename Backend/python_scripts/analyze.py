import sys
import json
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model

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

    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)
    print(f"Extracted MFCCs shape: {mfccs.shape}")

    mfccs = np.mean(mfccs, axis=1).reshape(1, -1)  # Ensure correct shape
    print(f"Final input shape: {mfccs.shape}")

    # Load model
    model = load_model("model/deepfake_voice.h5", compile=False)
    print("Model loaded successfully")

    # Predict
    prediction = model.predict(mfccs)
    print(f"Raw prediction: {prediction}")

    # Convert result to JSON and print it for Node.js
    result = {"prediction": float(prediction[0, 0])}  # Assuming single output
    print(json.dumps(result))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
