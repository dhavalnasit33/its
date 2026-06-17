"use client";

import { useEffect, useState } from "react";
import { FiDatabase, FiDownload, FiFileText, FiGlobe, FiSettings, FiShare2, FiShield } from "react-icons/fi";
import Section from "../Section";
import Row from "../Row";
import Button from "../Button";
import { FaPhone } from "react-icons/fa";
import { title } from "node:process";


const sections = [
  {
    id: "introduction",
    icon: FiFileText,
    title: "Introduction",
     description: (
      <>
        Welcome to{" "}
        <a href="/" className="text-[#d68029] underline font-semibold">
          Inspire Techno Solution
        </a>{" "}
        We are an IT services company providing web development, software
        development, and digital solutions. This Privacy Policy explains how we
        collect, use, and protect your information when you visit our website or
        use our services. By using our website, you agree to the terms of this
        Privacy Policy.
      </>
    ),
    points: [],
  },
  {
    id: "information",
    icon: FiDatabase,
    title: "Information We Collect",
    description:
      "We may collect the following types of information:",
    points: [
      "Personal information such as name, email address, phone number, and company name.",
      "Technical information such as IP address, browser type, and device information.",
      "Usage data including pages visited, session duration, and interaction history.",
    ],
  },
  {
    id: "usage",
    icon: FiSettings,
    title: "How We Use Your Information",
    description:
      "We use the collected information for:",
    points: [
      "Responding to inquiries",
      "Providing IT services and support",
      "Improving website performance",
      "Sending project updates or responses",
      "Marketing and promotional communication (only if consented)"
    ],
  },
  {
    id: "cookies",
    icon: FiGlobe,
    title: "Cookies & Policy",
    description:
      "Our website uses cookies to:",
    points: [
      "Improve user experience",
      "Analyze website traffic",
      "Remember user preferences",
    ],
    descriptions: "You can disable cookies in your browser settings anytime.",
  },
  {
    id: "security",
    icon: FiShield,
    title: "Data Protection & Security",
    description:
      "We implement industry-standard security measures to protect your data, including:",
    points: [
      "Secure servers",
      "Encrypted communication (SSL)",
      "Restricted access to sensitive data",
    ],
    descriptions: "However, no method of transmission over the internet is 100% secure."
  },
    {
    id: "sharing",
    icon: FiShare2,
    title: "Data Sharing",
    description:
      "We do not sell, trade, or rent your personal information. We may share data only with:",
    points: [
      "Trusted service providers (hosting, email services)",
      "Legal authorities if required by law",
    ],
  },
  {
    id: "third",
    icon: FiShare2,
    title: "Third-Party Links",
    description:
      "Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.",
    points: [],
  },
  {
    id: "contact",
    icon: FaPhone,
    title: "Contact Us",
    description: (
      <>If you have any questions about this Privacy Policy, contact us:<br /><br />
        Email: hr@inspiretechnosolution.com <br />
        Email: sales@inspiretechnosolution.com <br />
        Phone: +91 93272 20484<br />
        Website: https://inspiretechnosolution.com
      </>
    ),
    points: [],
  },
  
];

export default function PrivacyPolicy() {
    
  return (
    <Section className=" z-10">
      <Row>

        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%]">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:mr-10">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6">

              <h3 className="font-semibold text-2xl mb-5 text-[#0d1b2a]">
                On this page
              </h3>

              <div className="border-b border-gray-200 mb-5"></div>

              <ul className="space-y-4">
                {sections.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                    //   className="block transition-all duration-300 text-md font-normal text-[#6f6f6f] leading-8 tracking-wide  hover:text-[#d68029]"
                    className="block text-md text-[#6f6f6f] hover:text-[#d68029] transition-colors  font-medium border-l-2 border-transparent hover:border-[#d68029] pl-4 py-1"
                    >     
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8 lg:space-y-12">

            {sections.map((item, index) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        id={item.id}
                        className="scroll-mt-24"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-r from-[#d68029] to-[#f7b733] hover:bg-[#0d1b2a] flex items-center justify-center">
                                {Icon && (
                                    <Icon
                                    size={20}
                                    className="text-white"
                                    />
                                )}
                            </div>
                            <h4 className=" text-2xl md:text-3xl font-bold">
                                {index + 1}. {item.title}
                            </h4>
                        </div>

                        <p className="text-lg text-gray-600 leading-8">
                            {item.description}
                        </p>
                        {item.points?.length > 0 && (
                            <ul className="mt-6 space-y-3">
                                {item.points.map((point, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-lg text-gray-600"
                                >
                                    <span className="mt-2.5 h-2 w-2 rounded-full bg-[#d68029] flex-shrink-0"></span>
                                    <span>{point}</span>
                                </li>
                                ))}
                            </ul>
                            )}
                        
                        <p className="text-lg text-gray-600 leading-8 mt-6">
                            {item.descriptions}
                        </p>
                        {index !== sections.length - 1 && (
                            <div className="border-b border-gray-200 mt-8 lg:mt-12"></div>
                        )}
                    </div>
                );
            })}
            <div className="mt-16 p-6 md:p-8 rounded-2xl bg-gray-50  border-gray-200 shadow-sm">
                <h3 className="text-xl font-heading font-bold mb-4">Privacy Concerns?</h3>
                <p className="text-lg text-gray-600 mb-6">If you have specific questions about how your data is handled or wish to exercise your data rights, 
                    please reach out to our privacy officer.
                </p>
                <Button
                bgColor="#d68029"
                hoverColor="#0d1b2a"
                    text="Contact Privacy Team"
                    href="#contact-form-section"
                    // icon="/navbar/btn_icon.png"
                />
            </div>
          </div>
            
        </div>

      </Row>
    </Section>
  );
}