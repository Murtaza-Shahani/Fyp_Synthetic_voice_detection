import sys
import json
import torch
import torch.nn as nn
import numpy as np
import librosa
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from pathlib import Path
import os


# --- CNN + LSTM Model Definition ---
class CNNLSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(CNNLSTM, self).__init__()
        self.conv1 = nn.Conv1d(in_channels=1, out_channels=32, kernel_size=3, padding=1)
        self.relu = nn.ReLU()
        self.lstm = nn.LSTM(input_size=32, hidden_size=hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        x = self.conv1(x)
        x = self.relu(x)
        x = x.permute(0, 2, 1)  # (batch, seq_len, channels)
        output, (hn, cn) = self.lstm(x)
        out = self.fc(hn[-1])
        return out

# --- Feature extraction ---
def extract_22_features(y, sr):
    features = []
    features.append(librosa.feature.chroma_stft(y=y, sr=sr).mean())        # f0
    features.append(librosa.feature.rms(y=y).mean())                       # f1
    features.append(librosa.feature.spectral_centroid(y=y, sr=sr).mean())  # f2
    features.append(librosa.feature.spectral_bandwidth(y=y, sr=sr).mean()) # f3
    features.append(librosa.feature.spectral_rolloff(y=y, sr=sr).mean())   # f4
    features.append(librosa.feature.zero_crossing_rate(y).mean())          # f5
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=16)                    # f6–f21
    features.extend([mfcc.mean() for mfcc in mfccs])
    return np.array(features).reshape(1, -1)

# --- Main function to process audio and make predictions ---
def process_audio_and_predict(audio_path):
    # Load scaler and model
    scaler_path = r"model/standard_scaler1.pkl"  # Updated path to scaler
    model_path  = r"model/tamperedFilesCNN.pth"  # Path to your trained model

    scaler = joblib.load(scaler_path)

    # Instantiate model
    model = CNNLSTM(input_size=32, hidden_size=64, num_classes=2)
    model.load_state_dict(torch.load(model_path))
    model.eval()

    # Label encoder for converting predictions to labels
    label_encoder = LabelEncoder()
    label_encoder.classes_ = np.array(['Fake', 'Real'])

    # Load audio and split into two halves
    y, sr = librosa.load(audio_path, sr=None)
    half_len = len(y) // 2
    halves = {"first_half": y[:half_len], "second_half": y[half_len:]}

    results = {}

    for half_name, half_audio in halves.items():
        # Extract features
        features = extract_22_features(half_audio, sr)

        # Define feature names same as used during training
        feature_names = [f'f{i}' for i in range(22)]
        features_df = pd.DataFrame(features, columns=feature_names)

        # Scale the features
        features_scaled = scaler.transform(features_df)
        tensor_input = torch.tensor(features_scaled, dtype=torch.float32)  # (1, 22)
        tensor_input = tensor_input.unsqueeze(1)  # (1, 1, 22) — correct for Conv1D

        # Make prediction with the model
        with torch.no_grad():
            output = model(tensor_input)
            predicted_index = torch.argmax(output, dim=1).item()
            predicted_label = label_encoder.inverse_transform([predicted_index])[0]

        results[half_name] = predicted_label

    return results

# --- Script to execute when running from command line ---
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
        
        # Process the audio file and get predictions
        result = process_audio_and_predict(audio_path)
        
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
