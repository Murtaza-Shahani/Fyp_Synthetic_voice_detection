import { useState } from "react";
import Button from "../components/ui/Button";
import TextareaField from "../components/ui/TextareaField";
import backgroundImage from "../assets/images/background.jpg";
import ReactAudioSpectrum from "react-audio-spectrum";
import Guidence from "./Guidence";

function Detection({ isHome = false }) {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["audio/mp3", "audio/wav", "audio/m4a"];
      const maxSize = 10 * 1024 * 1024;

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload an MP3, WAV, or M4A file.");
        setFile(null);
        return;
      }

      if (selectedFile.size > maxSize) {
        setError("File size exceeds the maximum limit of 10MB.");
        setFile(null);
        return;
      }

      setError("");
      setFile(selectedFile);
      setAudioUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult({ isReal: data.isReal, confidence: data.confidence });
    } catch (error) {
      setError("Error analyzing audio. Please try again.");
    }

    setIsAnalyzing(false);
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError("");
    setAudioUrl("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16">
        <section className="text-white py-16" style={isHome ? {} : { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`${isHome ? "inline-block bg-blue-600 rounded-lg px-6 py-4" : ""}`}>
              <h1 className="text-4xl font-bold mb-4">Audio Detection</h1>
              <p className="text-lg max-w-3xl mx-auto">Upload your audio file to analyze and determine if it contains synthetic voice elements.</p>
            </div>
          </div>
        </section>

        <Guidence />

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Upload Audio File</h2>
                  <p className="text-gray-600 mb-4">Supported formats: MP3, WAV, M4A (Max size: 10MB)</p>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                    <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="audio-upload" />
                    <label htmlFor="audio-upload" className="flex flex-col items-center cursor-pointer">
                      <i className="fas fa-upload text-gray-400 text-4xl mb-2"></i>
                      <span className="text-gray-500">{file ? file.name : "Click to upload or drag and drop"}</span>
                    </label>
                  </div>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                </div>
                <div className="mt-6">
                  <Button type="submit" variant="primary" className="w-full" disabled={!file || isAnalyzing}>
                    {isAnalyzing ? "Analyzing..." : "Analyze Audio"}
                  </Button>
                </div>
              </form>

              {result && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Detection Result:</span>
                      <span className={`font-bold ${result.isReal ? "text-green-600" : "text-red-600"}`}>{result.isReal ? "Real Voice" : "Synthetic Voice"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence Score:</span>
                      <span className="font-bold">{result.confidence}%</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Audio Spectrum</h4>
                    <ReactAudioSpectrum id="audio-spectrum" height={200} width={640} audioId="audio-element" capColor="blue" capHeight={2} meterWidth={2} meterCount={512} meterColor={[{ stop: 0, color: "#f00" }, { stop: 0.5, color: "#0f0" }, { stop: 1, color: "#00f" }]} gap={4} />
                    <audio id="audio-element" src={audioUrl} controls />
                  </div>
                  <div className="flex justify-center">
                    <Button type="button" variant="secondary" onClick={resetForm}>Analyze Another File</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Detection;
