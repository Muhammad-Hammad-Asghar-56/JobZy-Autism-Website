import React from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24 p-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        {/* Detailed Paragraph */}
        <p className="text-lg mb-6">
          At Ambitious About Autism, we are dedicated to providing the best
          support and services to individuals with autism and their families. We
          are here to assist with any questions or concerns you may have.
          Whether you are looking for more information about our programs, need
          guidance on how to get involved, or require help with specific
          resources, our team is ready to help.
        </p>

        <p className="text-lg mb-6">
          Our organization has years of experience in creating tailored
          solutions for young individuals with autism, helping them navigate
          their journey into the workplace, education, or other aspects of life.
          Our mission is to ensure that everyone has equal access to
          opportunities, support, and services that cater to their needs. If you
          require assistance, don't hesitate to reach out to us.
        </p>

        <p className="text-lg">
          If you have any questions or need assistance, feel free to reach out
          to us:
        </p>

        <p className="mt-4">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:info@ambitiousaboutautism.org.uk"
            className="text-blue-600">
            S_musa1@outlook.com
          </a>
        </p>

        <p className="mt-2">
          <strong>Mobile:</strong>{" "}
          <a href="tel:+07883350591" className="text-blue-600">
            +07883350591
          </a>
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg p-6">
        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Card 1 */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Customer Support
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Our customer support team is available 24/7 to help you with any
              questions, concerns, or inquiries you may have. Whether it’s a
              question about our programs or guidance for accessing resources,
              we’re here to assist.
            </p>
            <p className="font-medium text-blue-600">
              <a href="mailto:support@ambitiousaboutautism.org.uk">Email us</a>
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Call Us
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You can also reach us directly via phone for immediate assistance.
              Our dedicated team is here to help with any questions or concerns
              you might have about autism-related services and support.
            </p>
            <p className="font-medium text-blue-600">
              <a href="tel:+442088155444">Call us now</a>
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Our office is located in the heart of the UK, and we welcome
              visits from anyone who would like more information or direct
              assistance. Feel free to stop by during our office hours for
              guidance on our services.
            </p>
            <p className="font-medium text-blue-600">
              <strong>Address:</strong> 123 Autism Lane, London, UK
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
