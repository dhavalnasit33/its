"use client";

import { useEffect, useState } from "react";
import { FiDatabase, FiDownload, FiFileText, FiGlobe, FiSettings, FiShare2, FiShield } from "react-icons/fi";
import Section from "../Section";
import Row from "../Row";
import { FaAmazonPay, FaDiagramProject, FaPhoneVolume } from "react-icons/fa6";
import { FaCookie, FaPhone } from "react-icons/fa";
import SafeEmail from "../SafeEmail";


const sections = [
  {
    id: "acceptance",
    icon: FiDatabase,
    title: "Acceptance of Terms",
    description:
      "By accessing this website, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. If you do not agree with any part of these terms, you should discontinue the use of our website and services.",
    points: [],
  },
  {
    id: "services-overview",
    icon: FiDownload,
    title: "Services Overview",
    description:
      "Inspire Techno Solution provides professional IT services including, but not limited to:",
    points: [
      "Website Design & Development",
      "Mobile Application Development",
      "UI/UX Design ",
      "PHP Development",
      "Full Stack Development"
    ],
    descriptions: "The scope, timeline, and deliverables for each project shall be defined in separate agreements, proposals, or contracts."
  },
  {
    id: "property",
    icon: FiSettings,
    title: "Intellectual Property Rights",
    description: "All content available on this website, including text, graphics, logos, images, designs, source code, and other materials, is the property of Inspire Techno Solution unless otherwise stated. You may not copy, reproduce, distribute, modify, or exploit any content from this website without prior written consent.",
      points: [],
  },
  {
    id: "project",
    icon: FaDiagramProject,
    title: "Project Engagement and Deliverables",
    description: "Upon project approval, clients agree to provide all necessary information, content, feedback, and approvals required for successful project completion. Project timelines may be affected by:",
      points: ["Delayed client feedback",
        "Incomplete requirements",
        "Third-party service interruptions",
        "Unforeseen technical challenges"
      ],
    descriptions: "Any changes requested beyond the approved project scope may result in additional charges and timeline adjustments.",
  },
  {
    id: "payment",
    icon: FaAmazonPay,
    title: "Payments and Billing",
    description: "All payments shall be made according to the agreed proposal, quotation, or contract.",
    points: [
        "Deposits are generally non-refundable once work has commenced.",
        "Milestone payments must be completed as agreed.",
        "Final deliverables may be withheld until outstanding payments are cleared.",
        "Late payments may result in project suspension or additional fees."
    ],
  },
  {
    id: "third-party",
    icon: FaCookie,
    title: "Third-Party Services",
    description: "Projects may involve third-party services, platforms, plugins, APIs, hosting providers, payment gateways, or software products. Inspire Techno Solution is not responsible for:",
    points: [
        "Third-party service outages",
        "Pricing changes by third-party providers",
        "Policy changes implemented by third parties",
        "Security vulnerabilities originating from third-party products"
    ],
  },
    {
    id: "terms",
    icon: FiShare2,
    title: "Changes to Terms",
    description:
      "We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Updated versions will be posted on this page with the revised effective date.",
    points: [],
  },
    {
      id: "contact",
      icon: FaPhoneVolume,
      title: "Contact Us",
      description: (
        <>If you have any questions about this Privacy Policy, contact us:<br /><br />
          Email: <SafeEmail email="hr@inspiretechnosolution.com" /> <br />
          Email: <SafeEmail email="sales@inspiretechnosolution.com" /> <br />
          Phone: +91 93272 20484<br />
          Website: https://inspiretechnosolution.com
        </>
      ),
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
            <p className="text-lg text-gray-600 leading-8 mb-3">Last Updated: June 2026</p>
            <p className="text-lg text-gray-600 leading-8 ">Welcome to  <a href="/" className="text-[#d68029] underline font-semibold">
          Inspire Techno Solution
        </a> , By accessing and using our website and services, you agree to comply with and be bound by the following Terms & Conditions. 
              Please read them carefully before using our website or engaging our services.</p>

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
                             <p className="text-lg text-gray-600 leading-8 mt-6">
                            {item.descriptions}
                        </p>
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