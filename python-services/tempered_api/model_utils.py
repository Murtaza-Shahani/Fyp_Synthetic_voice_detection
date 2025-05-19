import os
import torch
import torch.nn as nn
import numpy as np
import librosa
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

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
        x = x.permute(0, 2, 1)
        output, (hn, cn) = self.lstm(x)
        out = self.fc(hn[-1])
        return out

def extract_22_features(y, sr):
    features = []
    features.append(librosa.feature.chroma_stft(y=y, sr=sr).mean())
    features.append(librosa.feature.rms(y=y).mean())
    features.append(librosa.feature.spectral_centroid(y=y, sr=sr).mean())
    features.append(librosa.feature.spectral_bandwidth(y=y, sr=sr).mean())
    features.append(librosa.feature.spectral_rolloff(y=y, sr=sr).mean())
    features.append(librosa.feature.zero_crossing_rate(y).mean())
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=16)
    features.extend([mfcc.mean() for mfcc in mfccs])
    return np.array(features).reshape(1, -1)

def load_model_and_scaler(model_path, scaler_path):
    scaler = joblib.load(scaler_path)
    model = CNNLSTM(input_size=32, hidden_size=64, num_classes=2)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model, scaler

def predict(model, scaler, audio_path):
    y, sr = librosa.load(audio_path, sr=None)
    half_len = len(y) // 2
    halves = {"first_half": y[:half_len], "second_half": y[half_len:]}

    label_encoder = LabelEncoder()
    label_encoder.classes_ = np.array(['Fake', 'Real'])

    results = {}
    for half_name, half_audio in halves.items():
        features = extract_22_features(half_audio, sr)
        feature_names = [f'f{i}' for i in range(22)]
        df = pd.DataFrame(features, columns=feature_names)
        scaled = scaler.transform(df)
        tensor_input = torch.tensor(scaled, dtype=torch.float32).unsqueeze(1)  # shape (1, 1, 22)

        with torch.no_grad():
            output = model(tensor_input)
            predicted_index = torch.argmax(output, dim=1).item()
            predicted_label = label_encoder.inverse_transform([predicted_index])[0]
        results[half_name] = predicted_label
    return results
