"use client";

import { useEffect, useState } from "react";
import { FiDatabase, FiDownload, FiFileText, FiGlobe, FiSettings, FiShare2, FiShield } from "react-icons/fi";
import Section from "../Section";
import Row from "../Row";


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
        These Terms of Use govern your access to and use of our website, applications, and professional services. By engaging with our platform, you agree to comply with these terms in full.
      </>
    ),
      points: [],
  },
  {
    id: "acceptance",
    icon: FiDatabase,
    title: "Acceptance of Terms",
    description:
      "Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service",
    points: [],
  },
  {
    id: "services-overview",
    icon: FiDownload,
    title: "Services Overview",
    description:
      "Inspire Techno Solutions provides digital transformation services, including but not limited to web development, mobile application development, AI/ML solutions, and cloud consulting. Specific service terms may apply to individual project engagements.",
    points: [
      "Contact forms submitted on our website.",
      "Newsletter subscriptions.",
    ],
  },
  {
    id: "usage",
    icon: FiSettings,
    title: "User Eligibility",
    description:
      "You must be at least 18 years old to use our Services. By using our platform, you represent that you have the legal capacity to enter into a binding agreement and meet all eligibility requirements.",
    points: [],
  },
];

export default function TermsCondition() {
    
  return (
    <Section className=" z-10">
      <Row>

        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%]">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:mr-10">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6">

              <h3 className="font-semibold text-2xl mb-5 text-[#0d1b2a]">
                Agreement Guide
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
                            <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-r from-[#d68029] to-[#f7b733] flex items-center justify-center">
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
                        {index !== sections.length - 1 && (
                            <div className="border-b border-gray-200 mt-8 lg:mt-12"></div>
                        )}
                    </div>
                );
            })}
            <div className="mt-16 p-6 mt:p-8 rounded-2xl bg-gray-50 border-gray-200 shadow-sm">
                <h3 className="text-xl font-heading font-bold mb-4">Need Clarification?</h3>
                <p className="text-lg text-gray-600">
                    If any part of these terms is unclear, or you require a custom service agreement for enterprise needs, please reach out to our legal team.
                </p>
                {/* <Button
                bgColor="#d68029"
                hoverColor="#0d1b2a"
                    text="Contact Privacy Team"
                    href="#contact-form-section"
                    // icon="/navbar/btn_icon.png"
                /> */}
            </div>
          </div>
            
        </div>

      </Row>
    </Section>
  );
}