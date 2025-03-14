import { useState, useEffect } from "react";
import Button from "./ui/Button";
import backgroundImage from "../assets/images/background.jpg"
import Image1 from "../assets/images/image1.webp"
import Image2 from "../assets/images/image2.jpeg"
import Image3 from "../assets/images/image3.jpg"
import LeftArrow from "../assets/icons/leftArrow";
import RightArrow from "../assets/icons/rightArrow";

const carouselImages = [
  Image1,
  Image2,
  Image3,
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <section
      className="bg-blue-600 text-white py-20 mt-16"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">
              Protecting Digital Integrity with Synthetic Voice Detection
            </h1>
            <p className="text-lg mb-8">
              Accurately detect deepfake audio to safeguard privacy, security,
              and authenticity.
            </p>
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg aspect-video">
              <img
                src={carouselImages[currentImage] || "/placeholder.svg"}
                alt={`Slide ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white"
              >
                <LeftArrow className="absolute"/>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-4 text-white"
              >
                <RightArrow className="absolute"/>
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImage === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
