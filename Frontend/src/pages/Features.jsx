import Button from "../components/ui/Button";
import MicIcon from "../assets/svgs/micIcon.svg";
import ShieldIcon from "../assets/svgs/shieldIcon.svg";
import LockIcon from "../assets/svgs/lockIcon.svg";
import backgroundImage from "../assets/images/background.jpg";
import Image3 from "../assets/images/image3.jpg";

function Features({ isHome = false }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16">
        {/* Hero Section */}
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
            <div
              className={`${
                isHome ? "inline-block bg-blue-600 rounded-lg px-10 py-5" : ""
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">Our Features</h1>
              <p className="text-lg max-w-3xl mx-auto">
                Discover how our advanced synthetic voice detection technology
                can help protect your digital integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                <img src={MicIcon} alt="Icon" className="mb-4" />
                <h3 className="font-bold text-xl mb-2">Detection</h3>
                <p>Instantly analyze audio files to determine authenticity.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                <img src={ShieldIcon} alt="Icon" className="mb-4" />
                <h3 className="font-bold text-xl mb-2">Robust Accuracy</h3>
                <p>Utilizing advanced algorithms for precise results.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                <img src={LockIcon} alt="Icon" className="mb-4" />
                <h3 className="font-bold text-xl mb-2">Secure Analysis</h3>
                <p>
                  Ensuring data privacy and protection throughout the process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
                <p className="mb-4">
                  Our synthetic voice detection system uses a combination of
                  spectral analysis, machine learning, and neural networks to
                  identify artificially generated audio.
                </p>
                <p className="mb-6">
                  The system analyzes over 500 different audio characteristics
                  to determine if a voice sample is authentic or synthetic, with
                  accuracy rates exceeding 99%.
                </p>
                <Button variant="primary">Learn More</Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={Image3}
                  alt="Technology Visualization"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        {/* <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How We Compare
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-3 px-4 text-left">Feature</th>
                    <th className="py-3 px-4 text-center">VoiceDetect</th>
                    <th className="py-3 px-4 text-center">Competitor A</th>
                    <th className="py-3 px-4 text-center">Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Detection Speed</td>
                    <td className="py-3 px-4 text-center text-green-600">
                      Fast (&lt; 5s)
                    </td>
                    <td className="py-3 px-4 text-center">Moderate (10-30s)</td>
                    <td className="py-3 px-4 text-center">Slow (&gt; 30s)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Accuracy</td>
                    <td className="py-3 px-4 text-center text-green-600">
                      High (99.7%)
                    </td>
                    <td className="py-3 px-4 text-center">Medium (95%)</td>
                    <td className="py-3 px-4 text-center">Low (90%)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Security</td>
                    <td className="py-3 px-4 text-center text-green-600">
                      End-to-end encryption
                    </td>
                    <td className="py-3 px-4 text-center">
                      Standard encryption
                    </td>
                    <td className="py-3 px-4 text-center">Basic protection</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">API Access</td>
                    <td className="py-3 px-4 text-center text-green-600">
                      Yes
                    </td>
                    <td className="py-3 px-4 text-center">Limited</td>
                    <td className="py-3 px-4 text-center">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        {/* <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join thousands of users who trust VoiceDetect to protect their
              digital integrity.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" size="lg">
                Try for Free
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                size="lg"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}

export default Features;
