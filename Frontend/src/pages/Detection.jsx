import { useState } from "react";
import Button from "../components/ui/Button";
import backgroundImage from "../assets/images/background.jpg";
import ReactAudioSpectrum from "react-audio-spectrum";
import Guidence from "./Guidence";

import { ToastContainer, toast } from "react-toastify";  // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";  // Import CSS for Toastify

function Detection({ isHome = false }) {
  // Binary Classification States
  const [fileBinary, setFileBinary] = useState(null);
  const [isAnalyzingBinary, setIsAnalyzingBinary] = useState(false);
  const [resultBinary, setResultBinary] = useState(null);
  const [errorBinary, setErrorBinary] = useState("");
  const [audioUrlBinary, setAudioUrlBinary] = useState("");

  // Tempered Detection States
  const [fileTempered, setFileTempered] = useState(null);
  const [isAnalyzingTempered, setIsAnalyzingTempered] = useState(false);
  const [resultTempered, setResultTempered] = useState(null);
  const [errorTempered, setErrorTempered] = useState("");
  const [audioUrlTempered, setAudioUrlTempered] = useState("");
  const [descriptionTempered, setDescriptionTempered] = useState("");

  // Check if the user is logged in by checking the token in localStorage
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("authToken"); // Returns true if token exists
  };

  // Handle Binary File Upload (onChange)
  const handleFileChangeBinary = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["audio/mp3", "audio/wav", "audio/m4a"];
      const maxSize = 10 * 1024 * 1024;
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorBinary("Invalid file type. Please upload an MP3, WAV, or M4A file.");
        setFileBinary(null);
        return;
      }
      if (selectedFile.size > maxSize) {
        setErrorBinary("File size exceeds 10MB limit.");
        setFileBinary(null);
        return;
      }
      setErrorBinary("");
      setFileBinary(selectedFile);
      setAudioUrlBinary(URL.createObjectURL(selectedFile));
    }
  };

  // Handle Tempered File Upload (onChange)
  const handleFileChangeTempered = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["audio/mp3", "audio/wav", "audio/m4a"];
      const maxSize = 10 * 1024 * 1024;
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorTempered("Invalid file type. Please upload an MP3, WAV, or M4A file.");
        setFileTempered(null);
        return;
      }
      if (selectedFile.size > maxSize) {
        setErrorTempered("File size exceeds 10MB limit.");
        setFileTempered(null);
        return;
      }
      setErrorTempered("");
      setFileTempered(selectedFile);
      setAudioUrlTempered(URL.createObjectURL(selectedFile));
    }
  };

  // Handle Binary File Input Click (to prevent file dialog for non-logged in users)
  const handleFileClickBinary = (e) => {
    if (!isUserLoggedIn()) {
      e.preventDefault();  // Prevent the file dialog from opening
      // Show toast message to inform the user that they need to be logged in
      toast.error("You should be logged in to upload and analyze audio", {
        position: "top-center",  // Position of the toast on the screen
        autoClose: 3000,  // The toast will close after 3 seconds
        hideProgressBar: true,  // Don't show progress bar
      });
    }
  };

  // Handle Tempered File Input Click (to prevent file dialog for non-logged in users)
  const handleFileClickTempered = (e) => {
    if (!isUserLoggedIn()) {
      e.preventDefault();  // Prevent the file dialog from opening
      // Show toast message to inform the user that they need to be logged in
      toast.error("You should be logged in to upload and analyze audio", {
        position: "top-center",  // Position of the toast on the screen
        autoClose: 3000,  // The toast will close after 3 seconds
        hideProgressBar: true,  // Don't show progress bar
      });
    }
  };

  // Handle Binary Analysis
  const handleSubmitBinary = async (e) => {
    e.preventDefault();
    if (!fileBinary) {
      setErrorBinary("Please select a file to upload.");
      return;
    }
    setIsAnalyzingBinary(true);
    setErrorBinary("");
    const formData = new FormData();
    formData.append("audio", fileBinary);
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResultBinary({ isReal: data.isReal, confidence: data.confidence });
    } catch (error) {
      setErrorBinary("Error analyzing audio. Please try again.");
    }
    setIsAnalyzingBinary(false);
  };

  // Handle Tempered Analysis
  const handleSubmitTempered = async (e) => {
    e.preventDefault();
    if (!fileTempered) {
      setErrorTempered("Please select a file to upload.");
      return;
    }
    setIsAnalyzingTempered(true);
    setErrorTempered("");
    const formData = new FormData();
    formData.append("audio", fileTempered);
    try {
      const response = await fetch("http://localhost:5000/analyze-tempered", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResultTempered({ isReal: data.isReal, confidence: data.confidence });
      setDescriptionTempered(data.description); // <-- Description from backend
    } catch (error) {
      setErrorTempered("Error analyzing audio. Please try again.");
    }
    setIsAnalyzingTempered(false);
  };

  // Reset Binary Form
  const resetFormBinary = () => {
    setFileBinary(null);
    setResultBinary(null);
    setErrorBinary("");
    setAudioUrlBinary("");
  };

  // Reset Tempered Form
  const resetFormTempered = () => {
    setFileTempered(null);
    setResultTempered(null);
    setErrorTempered("");
    setAudioUrlTempered("");
    setDescriptionTempered("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16">
        <section
          className="text-white py-16"
          style={
            isHome
              ? {}
              : {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
          }
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`${isHome ? "inline-block bg-blue-600 rounded-lg px-6 py-4" : ""}`}>
              <h1 className="text-4xl font-bold mb-4">Audio Detection</h1>
              <p className="text-lg max-w-3xl mx-auto">
                Upload your audio file to analyze and determine if it contains synthetic voice elements.
              </p>
            </div>
          </div>
        </section>

        <Guidence />

        {/* Two Upload Sections */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Analyze Audio</h1>

            <div className="flex flex-wrap gap-8 justify-center">
              {/* Binary Classification Section */}
              <div className="w-full md:w-[48%] bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmitBinary}>
                  <h2 className="text-2xl font-bold mb-4">Binary Classification</h2>
                  <p className="text-gray-600 mb-4">Supported: MP3, WAV, M4A (Max 10MB)</p>

                  {/* Upload Area */}
                  <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChangeBinary}
                      onClick={handleFileClickBinary}  // Add onClick handler to prevent file input for non-logged-in users
                      className="hidden"
                      id="binary-upload"
                    />
                    <label htmlFor="binary-upload" className="flex flex-col items-center cursor-pointer">
                      <i className="fas fa-upload text-gray-400 text-4xl mb-2"></i>
                      <span className="text-gray-500">{fileBinary ? fileBinary.name : "Click to upload or drag"}</span>
                    </label>
                  </div>
                  {errorBinary && <p className="text-red-500 text-sm mb-4">{errorBinary}</p>}

                  {/* Submit Button */}
                  <Button type="submit" variant="primary" className="w-full" disabled={!fileBinary || isAnalyzingBinary}>
                    {isAnalyzingBinary ? "Analyzing..." : "Analyze Audio"}
                  </Button>
                </form>

                {/* Result */}
                {resultBinary && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Analysis Result</h3>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Detection Result:</span>
                      <span className={`font-bold ${!resultBinary.isReal ? "text-green-600" : "text-red-600"}`}>
                        {!resultBinary.isReal ? "Real Voice" : "Synthetic Voice"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Confidence:</span>
                      <span className="font-bold">{resultBinary.confidence}%</span>
                    </div>

                    {/* Audio Spectrum */}
                    <ReactAudioSpectrum
                      id="audio-spectrum-binary"
                      height={200}
                      width={640}
                      audioId="audio-element-binary"
                      capColor="blue"
                      capHeight={2}
                      meterWidth={2}
                      meterCount={512}
                      value={1}
                      borderColor={"transparent"}
                      fftSize={512}
                      backgroundColor={"#f0f0f0"}
                      gradientStops={[0, 0.5, 1]}
                      gradientColors={["#4f46e5", "#06b6d4", "#3b82f6"]}
                    />
                    {audioUrlBinary && <audio id="audio-element-binary" src={audioUrlBinary} controls className="w-full mt-4" />}

                    {/* Reset */}
                    <Button onClick={resetFormBinary} variant="secondary" className="w-full mt-4">
                      Analyze Another File
                    </Button>
                  </div>
                )}
              </div>

              {/* Tempered Detection Section */}
              <div className="w-full md:w-[48%] bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmitTempered}>
                  <h2 className="text-2xl font-bold mb-4">Tempered Detection</h2>
                  <p className="text-gray-600 mb-4">Supported: MP3, WAV, M4A (Max 10MB)</p>

                  {/* Upload Area */}
                  <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChangeTempered}
                      onClick={handleFileClickTempered}  // Add onClick handler to prevent file input for non-logged-in users
                      className="hidden"
                      id="tempered-upload"
                    />
                    <label htmlFor="tempered-upload" className="flex flex-col items-center cursor-pointer">
                      <i className="fas fa-upload text-gray-400 text-4xl mb-2"></i>
                      <span className="text-gray-500">{fileTempered ? fileTempered.name : "Click to upload or drag"}</span>
                    </label>
                  </div>
                  {errorTempered && <p className="text-red-500 text-sm mb-4">{errorTempered}</p>}

                  {/* Submit Button */}
                  <Button type="submit" variant="primary" className="w-full" disabled={!fileTempered || isAnalyzingTempered}>
                    {isAnalyzingTempered ? "Analyzing..." : "Analyze Audio"}
                  </Button>
                </form>

                {/* Result */}
                {resultTempered && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Analysis Result</h3>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Detection Result:</span>
                      <span className={`font-bold ${!resultTempered.isReal ? "text-green-600" : "text-red-600"}`}>
                        {!resultTempered.isReal ? "Real Voice" : "Synthetic Voice"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Confidence:</span>
                      <span className="font-bold">{resultTempered.confidence}%</span>
                    </div>

                    {/* Audio Spectrum */}
                    <ReactAudioSpectrum
                      id="audio-spectrum-tempered"
                      height={200}
                      width={640}
                      audioId="audio-element-tempered"
                      capColor="blue"
                      capHeight={2}
                      meterWidth={2}
                      meterCount={512}
                      value={1}
                      borderColor={"transparent"}
                      fftSize={512}
                      backgroundColor={"#f0f0f0"}
                      gradientStops={[0, 0.5, 1]}
                      gradientColors={["#4f46e5", "#06b6d4", "#3b82f6"]}
                    />
                    {audioUrlTempered && <audio id="audio-element-tempered" src={audioUrlTempered} controls className="w-full mt-4" />}

                    {/* Description for Tempered Section */}
                    {descriptionTempered && (
                      <div className="mt-4 text-left">
                        <h4 className="font-medium mb-2">Voice Authenticity Segments:</h4>
                        <p className="text-gray-700 text-sm whitespace-pre-line">{descriptionTempered}</p>
                      </div>
                    )}

                    {/* Reset */}
                    <Button onClick={resetFormTempered} variant="secondary" className="w-full mt-4">
                      Analyze Another File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Toast Container for success/error messages */}
      <ToastContainer />
    </div>
  );
}

export default Detection;
