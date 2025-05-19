from flask import Flask, request, jsonify
import os
from model_utils import load_model_and_scaler, predict

app = Flask(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "tamperedFilesCNN.pth")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "model", "standard_scaler1.pkl")

model, scaler = load_model_and_scaler(MODEL_PATH, SCALER_PATH)

@app.route('/predict', methods=['POST'])
def predict_route():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    audio_file = request.files['audio']

    temp_dir = os.path.join(os.path.dirname(__file__), 'temp')
    os.makedirs(temp_dir, exist_ok=True)
    temp_audio_path = os.path.join(temp_dir, 'uploaded_audio.wav')

    try:
        audio_file.save(temp_audio_path)
        result = predict(model, scaler, temp_audio_path)
        os.remove(temp_audio_path)
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Prediction error: {e}")
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
