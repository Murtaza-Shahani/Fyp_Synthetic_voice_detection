import sys
import json
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model
import os
from pathlib import Path
import pandas as pd

# Force UTF-8 encoding by setting PYTHONUTF8 environment variable
os.environ["PYTHONUTF8"] = "1"  # Forces UTF-8 encoding for all string operations

# Ensure system stdout handles UTF-8 properly
sys.stdout.reconfigure(encoding='utf-8')  # Ensure proper output encoding

# Load the trained model
def load_model_from_h5(model_path):
    print(f"Loading model from: {model_path}")  # Debugging
    model = load_model(model_path)
    # Print only the model input shape summary to ensure we know the expected input format
    print(f"Model's expected input shape: {model.input_shape}")
    return model

# Feature extraction function (modified to match notebook features)
def extract_features(audio_path):
    print(f"Loading audio file from path: {audio_path}")  # Debugging

    # Ensure that the audio path is sanitized and normalized
    audio_path = str(Path(audio_path).resolve(strict=True))  # Use pathlib to resolve path properly
    print(f"Sanitized audio path: {audio_path}")  # Debugging
    
    try:
        y, sr = librosa.load(audio_path, sr=None)  # Load audio with the original sampling rate
        print(f"Audio loaded successfully from {audio_path}")  # Debugging
    except Exception as e:
        raise ValueError(f"Error loading audio file: {e}")
    
    # Extract features like in the notebook

    features = {}

    # Chroma (pitch-related feature)
    features['chroma_stft'] = librosa.feature.chroma_stft(y=y, sr=sr).mean()

    # RMS (energy of the signal)
    features['rms'] = librosa.feature.rms(y=y).mean()

    # Spectral centroid (brightness of the sound)
    features['spectral_centroid'] = librosa.feature.spectral_centroid(y=y, sr=sr).mean()

    # Spectral bandwidth (measures the width of the spectrum)
    features['spectral_bandwidth'] = librosa.feature.spectral_bandwidth(y=y, sr=sr).mean()

    # Spectral roll-off (the frequency below which most of the energy lies)
    features['rolloff'] = librosa.feature.spectral_rolloff(y=y, sr=sr).mean()

    # Zero crossing rate (rate at which the signal changes sign)
    features['zero_crossing_rate'] = librosa.feature.zero_crossing_rate(y).mean()

    # MFCCs (Mel Frequency Cepstral Coefficients)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)  # Using 20 MFCCs (as in the notebook)
    for i in range(1, 21):  # Loop to assign the mean of each MFCC
        features[f'mfcc{i}'] = mfccs[i-1].mean()

    return features

# Prepare input features for prediction (wrap in a DataFrame to match training format)
def prepare_input(audio_path):
    features = extract_features(audio_path)
    return pd.DataFrame([features])  # Wrap the features in a DataFrame

# Function to perform prediction
def predict(model, audio_path):
    print("Making prediction...")  # Debugging
    try:
        # Prepare features from the audio file
        input_features = prepare_input(audio_path)
        input_features = input_features.values  # Convert DataFrame to numpy array (for model input)

        # Predict using the model
        prediction = model.predict(input_features)
        
        # Get the predicted class index
        predicted_class = np.argmax(prediction)
        
        # Map index to label
        label_map = {0: 'Fake', 1: 'Partial_Fake', 2: 'Real'}
        label = label_map[predicted_class]
        
        # Confidence is the probability of the predicted class
        confidence = prediction[0][predicted_class] * 100
        
        # Return the result as JSON
        return {"label": label, "confidence": confidence}
    except Exception as e:
        raise ValueError(f"Error during prediction: {e}")

# Main function to process the audio file and get the prediction
def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No file path provided"}))
        sys.exit(1)

    audio_path = sys.argv[1]
    print(f"Received file path: {audio_path}")  # Debugging

    try:
        # Ensure the file exists before proceeding
        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"The file at {audio_path} does not exist.")
        
        # Load the model
        model = load_model_from_h5("model/3Class_deepfake_cnn_model.h5")
        
        # Get prediction from the model
        result = predict(model, audio_path)
        
        # Return the result as a valid JSON object to the backend
        print(json.dumps(result, ensure_ascii=True))
    
    except Exception as e:
        # If an error occurs, provide detailed error message
        error_message = str(e)
        print(f"Error occurred: {error_message}")  # Debugging
        print(json.dumps({"error": error_message}, ensure_ascii=True))
        sys.exit(1)

if __name__ == "__main__":
    main()
