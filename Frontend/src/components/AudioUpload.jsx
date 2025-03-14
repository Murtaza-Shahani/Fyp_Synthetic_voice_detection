import { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import WaveSurfer from "wavesurfer.js";

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  //const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const waveRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Generate waveform after analysis
  const generateWaveform = () => {
    if (!file) return;
    if (waveSurfer) waveSurfer.destroy(); // Destroy previous waveform if any

    const newWaveSurfer = WaveSurfer.create({
      container: waveRef.current,
      waveColor: "#4F46E5",
      progressColor: "#1E40AF",
      barWidth: 3,
      height: 80,
      responsive: true,
      hideScrollbar: true,
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      newWaveSurfer.load(event.target.result);
    };
    reader.readAsDataURL(file);

    setWaveSurfer(newWaveSurfer);
  };

  // Toggle Play/Pause
  const togglePlay = () => {
    if (waveSurfer) {
      waveSurfer.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  // Handle form submission (mock analysis)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult({ isReal: true, confidence: 95 });

    // Generate waveform after analysis
    setTimeout(() => {
      generateWaveform();
    }, 500);
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Audio Detection
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Section */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
                id="audio-upload"
              />
              <label
                htmlFor="audio-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="mt-2 text-sm text-gray-500">
                  {file ? file.name : "Upload audio file"}
                </span>
              </label>
            </div>

            {/* Description Field */}
            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for your audio file..."
                className="w-full min-h-[100px] rounded-md border border-gray-300 p-2"
              />
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={!file}
            >
              Analyze Audio
            </Button>
          </form>

          {/* Results Section */}
          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
              <p className="text-lg">
                Detection Result:{" "}
                <span
                  className={result.isReal ? "text-green-600" : "text-red-600"}
                >
                  {result.isReal ? "Real" : "Synthetic"}
                </span>
              </p>
              <p className="text-lg">Confidence Score: {result.confidence}%</p>
            </div>
          )}

          {/* Waveform Display Section (ONLY after result) */}
          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Waveform Preview</h3>
              <div
                ref={waveRef}
                className="bg-gray-100 p-4 rounded-md"
              ></div>
              <button
                type="button"
                onClick={togglePlay}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AudioUpload;
