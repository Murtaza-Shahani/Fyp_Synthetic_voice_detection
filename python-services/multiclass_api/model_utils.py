import os
import json
import numpy as np
import librosa
import pandas as pd
from tensorflow.keras.models import load_model
from joblib import load

# Load scaler (update path if needed)
SCALER_PATH = os.path.join(os.path.dirname(__file__), "model", "audio_feature_scaler.pkl")

# Load model (update path if needed)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "3Class_deepfake_cnn10_model.h5")

def load_tf_model():
    print(f"Loading TensorFlow model from: {MODEL_PATH}")
    model = load_model(MODEL_PATH)
    print(f"Model loaded with input shape: {model.input_shape}")
    return model

# Feature extraction function
def extract_features(audio_path):
    y, sr = librosa.load(audio_path, sr=None)
    features = {}

    features['chroma_stft'] = librosa.feature.chroma_stft(y=y, sr=sr).mean()
    features['rms'] = librosa.feature.rms(y=y).mean()
    features['spectral_centroid'] = librosa.feature.spectral_centroid(y=y, sr=sr).mean()
    features['spectral_bandwidth'] = librosa.feature.spectral_bandwidth(y=y, sr=sr).mean()
    features['rolloff'] = librosa.feature.spectral_rolloff(y=y, sr=sr).mean()
    features['zero_crossing_rate'] = librosa.feature.zero_crossing_rate(y).mean()

    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)
    for i in range(1, 21):
        features[f'mfcc{i}'] = mfccs[i-1].mean()

    return features

def prepare_input(audio_path, scaler):
    features = extract_features(audio_path)
    df = pd.DataFrame([features])
    features_scaled = scaler.transform(df.values)
    # Reshape to (1, number_of_features, 1)
    features_scaled = features_scaled.reshape(1, features_scaled.shape[1], 1)
    return features_scaled

def predict(model, scaler, audio_path):
    try:
        input_data = prepare_input(audio_path, scaler)
        prediction = model.predict(input_data)
        predicted_class = np.argmax(prediction)
        label_map = {0: 'Fake', 1: 'Partial_Fake', 2: 'Real'}
        label = label_map.get(predicted_class, "Unknown")
        confidence = round(prediction[0][predicted_class] * 100, 3)

        return {"label": label, "confidence": confidence}
    except Exception as e:
        return {"error": str(e)}
