import sys
import json
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model
import os
from pathlib import Path

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

# Feature extraction function (based on the notebook's features)
def extract_features(audio_path):
    print(f"Loading audio file from path: {audio_path}")  # Debugging

    # Ensure that the audio path is sanitized and normalized
    audio_path = str(Path(audio_path).resolve(strict=True))  # Use pathlib to resolve path properly
    print(f"Sanitized audio path: {audio_path}")  # Debugging
    
    try:
        y, sr = librosa.load(audio_path, sr=22050)  # Load audio at 22050 Hz
        print(f"Audio loaded successfully from {audio_path}")  # Debugging
    except Exception as e:
        raise ValueError(f"Error loading audio file: {e}")
    
    # Extract MFCC features (choose number of MFCC coefficients based on the model's training)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)  # Use 40 MFCCs
    mfccs_mean = np.mean(mfccs, axis=1)  # Mean over time frames (shape becomes (40,))

    # Extract additional features
    chroma_stft = np.mean(librosa.feature.chroma_stft(y=y, sr=sr), axis=1)
    rms = np.mean(librosa.feature.rms(y=y), axis=1)
    spectral_centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr), axis=1)
    spectral_bandwidth = np.mean(librosa.feature.spectral_bandwidth(y=y, sr=sr), axis=1)
    rolloff = np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr), axis=1)
    zero_crossing_rate = np.mean(librosa.feature.zero_crossing_rate(y=y), axis=1)

    # Limit the number of additional features to match the expected input size
    additional_features = np.concatenate([ 
        chroma_stft[:10],  # 10 chroma features
        rms[:10],  # 10 RMS features
        spectral_centroid[:10],  # 10 Spectral Centroid features
        spectral_bandwidth[:10],  # 10 Spectral Bandwidth features
        rolloff[:10],  # 10 Spectral Rolloff features
        zero_crossing_rate[:10]  # 10 Zero Crossing Rate features
    ])

    # Combine MFCC and additional features into one feature vector
    feature_vector = np.concatenate([mfccs_mean, additional_features])

    # Ensure the feature vector matches the input expected by the model (640 features)
    if feature_vector.shape[0] < 640:
        padding = np.zeros(640 - feature_vector.shape[0])
        feature_vector = np.concatenate([feature_vector, padding])

    # Reshape the feature vector to match the expected input shape of (26, 1)
    feature_vector_reshaped = feature_vector[:26].reshape(26, 1)  # Take first 26 features, reshape to (26, 1)
    return feature_vector_reshaped.T  # Return as (1, 26, 1) for model input compatibility

# Perform prediction with the model
def predict(model, features):
    print("Making prediction...")  # Debugging
    try:
        # Get the raw output from the model prediction
        probabilities = model.predict(features)

        # DEBUG: Directly print the raw output (as a numpy array) to inspect it
        print(f"Raw output (probabilities array): {probabilities}")

        # Convert the output into a Python list (to avoid numpy-related issues)
        probabilities_list = probabilities.tolist()  # Convert numpy array to list
        print(f"Raw output (converted to list): {probabilities_list}")

        # Get prediction index and map it to the label
        prediction_index = np.argmax(probabilities, axis=1)[0]
        confidence = probabilities[0][prediction_index] * 100
        
        # Map index to label
        label_mapping = {0: "Fake", 1: "Partial_Fake", 2: "Real"}
        label = label_mapping.get(prediction_index, "Unknown")  # Default to "Unknown" if not found

        # DEBUG: Print the confidence value and label
        print(f"Prediction label: {label}")
        print(f"Prediction confidence (raw): {confidence}%")

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
        
        # Extract features from the audio
        features = extract_features(audio_path)
        
        # Get prediction from the model
        result = predict(model, features)
        
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
