import { useState } from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import TextareaField from "../components/ui/TextareaField";
import SelectField from "../components/ui/SelectField";
import backgroundImage from "../assets/images/background.jpg";
import YoutubeIcon from "../assets/images/youtube.png";
import FacebookIcon from "../assets/images/facebook.png";
import WhatsappIcon from "../assets/images/whatsapp.png";
import LinkedinIcon from "../assets/images/linkedin.png";
import InstagramIcon from "../assets/images/instagram.png";

function Contact({ isHome = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    inquiryType: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null);

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "sales", label: "Sales Question" },
    { value: "partnership", label: "Partnership Opportunity" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        inquiryType: "",
        message: "",
      });
    }, 1500);
  };

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
                isHome ? "inline-block bg-blue-600 rounded-lg px-6 py-4" : ""
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg max-w-3xl mx-auto">
                Have questions or need assistance? We're here to help!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {formStatus === "success" ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <p>
                      Thank you for your message! We'll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <InputField
                      label="Name"
                      placeholder="Full Name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="Email"
                      placeholder="Email Address"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <SelectField
                      label="Inquiry Type"
                      placeholder="Select Inquiry Type"
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      options={inquiryTypes}
                      required
                    />

                    <InputField
                      label="Subject"
                      placeholder="Subject"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />

                    <TextareaField
                      label="Message"
                      placeholder="Enter Message Here"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Our Office</h3>
                    <p className="text-gray-600">
                      IBA University
                      <br />
                      Sukkur, Sindh
                      <br />
                      Pakistan
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-600">
                      General Inquiries:{" "}
                      <a
                        href="mailto:info@voicedetect.com"
                        className="text-blue-600 hover:underline"
                      >
                        info@voicedetect.com
                      </a>
                      <br />
                      Support:{" "}
                      <a
                        href="mailto:support@voicedetect.com"
                        className="text-blue-600 hover:underline"
                      >
                        support@voicedetect.com
                      </a>
                      <br />
                      Sales:{" "}
                      <a
                        href="mailto:sales@voicedetect.com"
                        className="text-blue-600 hover:underline"
                      >
                        sales@voicedetect.com
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                    <p className="text-gray-600">
                      Phone:{" "}
                      <a
                        href="tel:+1234567890"
                        className="text-blue-600 hover:underline"
                      >
                        +92 124-567890
                      </a>
                      <br />
                      Toll-free:{" "}
                      <a
                        href="tel:+18001234567"
                        className="text-blue-600 hover:underline"
                      >
                        +92 124-567890
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM PST
                      <br />
                      Saturday: 10:00 AM - 4:00 PM PST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <img src={FacebookIcon} alt="Facebook" />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <img src={WhatsappIcon} alt="Whatsapp" />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <img src={LinkedinIcon} alt="Linkedin" />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <img src={InstagramIcon} alt="Instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">
                  How accurate is the voice detection system?
                </h3>
                <p className="text-gray-600">
                  Our system achieves an accuracy rate of over 99% in detecting
                  synthetic voices, based on extensive testing with various
                  deepfake technologies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">
                  What file formats are supported?
                </h3>
                <p className="text-gray-600">
                  We support all common audio formats including MP3, WAV, M4A,
                  FLAC, and OGG. Files should be under 10MB for optimal
                  processing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">
                  How long does the analysis take?
                </h3>
                <p className="text-gray-600">
                  Most audio files are analyzed within 5 seconds, though
                  processing time may vary depending on file size and
                  complexity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Is my data secure?</h3>
                <p className="text-gray-600">
                  Yes, we use end-to-end encryption and do not store your audio
                  files after analysis. Your privacy and data security are our
                  top priorities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contact;
