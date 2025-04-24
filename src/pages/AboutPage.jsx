import React from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto bg-white  rounded-lg mt-24 p-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-left text-gray-600 mb-6">
          About SpecWorks
        </h1>

        {/* Introduction Section */}
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to **SpecWorks**, a platform designed to empower individuals
            with autism in the workforce. Whether you're an employer looking to
            create a more inclusive environment or an employee on the autism
            spectrum seeking career opportunities, we are here to support you.
            Our goal is to bridge the gap, promote inclusion, and ensure that
            everyone, regardless of their neurodiversity, has access to
            meaningful work.
          </p>
        </section>

        {/* Mission Statement Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            At **SpecWorks**, our mission is to empower neurodiverse
            individuals, especially those on the autism spectrum, by providing
            the tools, resources, and opportunities they need to succeed in the
            workplace. We believe that inclusive workplaces not only support
            individuals with autism but also enhance the overall success and
            innovation of businesses.
          </p>
        </section>

        {/* Our Services Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We offer a variety of services tailored to both employers and
            employees with autism:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>
              <strong>For Employers:</strong> Training and resources to create a
              neurodiverse and inclusive workplace.
            </li>
            <li>
              <strong>For Employees:</strong> Job search support, career advice,
              and resources to succeed in the workplace.
            </li>
            <li>
              <strong>For Both:</strong> Access to mentorship programs,
              educational workshops, and a network of supportive employers and
              employees.
            </li>
          </ul>
        </section>

        {/* Core Values Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Our Core Values
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>
              Inclusion: We strive for a world where everyone, regardless of
              their neurodiversity, has equal access to opportunities.
            </li>
            <li>
              Empowerment: We focus on providing the resources and support
              needed for individuals with autism to thrive in their careers.
            </li>
            <li>
              Collaboration: We believe in creating strong partnerships between
              employers and employees to ensure mutual growth and success.
            </li>
            <li>
              Respect: We honor the unique abilities and contributions of every
              individual and foster a culture of respect and understanding.
            </li>
            <li>
              Innovation: We are committed to constantly evolving to meet the
              needs of our community through innovative solutions and resources.
            </li>
          </ul>
        </section>

        {/* Team Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Our team at **SpecWorks** is dedicated to making the workplace
            accessible and inclusive for individuals on the autism spectrum. We
            bring together a diverse range of skills, from experts in autism
            advocacy to HR professionals and mentors, to provide the support
            needed for both employers and employees to succeed.
          </p>
          <p className="text-lg text-gray-700">
            [You can add short descriptions of key team members here, or include
            images if applicable.]
          </p>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            If you’re an employer looking to make your workplace more inclusive
            or an individual seeking employment opportunities, we’re here to
            help. Please don’t hesitate to reach out to us for more information
            or support.
          </p>
          <p className="text-lg text-gray-700">
            Email us at:{" "}
            <a href="mailto:contact@SpecWorks.com" className="text-gray-600">
              contact@SpecWorks.com
            </a>
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
