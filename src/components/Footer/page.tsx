"use client";

import { IoLogoBehance } from "react-icons/io5";
import { FaR, FaSquareInstagram, FaW, FaAndroid } from "react-icons/fa6";
import { DiAndroid } from "react-icons/di";
import { AiOutlineLinkedin } from "react-icons/ai";
import { RiFacebookCircleLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TrainingContactForm from "./TrainingContactForm";
import GeneralContactForm from "./GeneralContactForm";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaMicrosoft,
  FaWordpress,
  FaPhp,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdWork } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";

// -------------------- Main Page --------------------
export default function ContactFooterPage() {
  const pathname = usePathname();
  const isTrainingPage = pathname === "/training";
  const isContactPage = pathname === "/contact";

  const {
    hrEmail,
    salesEmail,
    phonePrimary,
    phonePrimaryClean,
    microsoftHandle,
    linkedinLink,
    facebookLink,
    instagramLink,
    youtubeLink,
    behanceLink,
  } = useWebsiteSettings();

  return (
    <footer id="contact-form-section" className={` relative bg-white scroll-mt-18 ${
      !isContactPage ? "pt-16" : ""
    }`}>
      {/* ---------------- Contact Form Floating Card ---------------- */}
      {/* <div className="w-full relative mx-auto max-w-[90%] lg:max-w-[80%] pb-16 "> */}
      <div className={`w-full relative mx-auto max-w-[90%] lg:max-w-[80%] ${
          !isContactPage ? "pb-16" : ""
        }`}
      >
        {/* <div className="  w-full mx-auto md:-mb-90 relative z-10">
          <div className="bg-white md:shadow-[0_0_12.2px_0_rgba(0,0,0,0.25)] rounded-2xl p-2 md:p-10">
            {isTrainingPage ? (
              <TrainingContactForm />
            ) : (
              <GeneralContactForm />
            )}
          </div>
        </div> */}

        {!isContactPage && (
          <div className="w-full mx-auto  relative z-10 ">
            <div className="bg-white ">
              {isTrainingPage ? (
                <TrainingContactForm />
              ) : (
                <GeneralContactForm />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ---------------- Footer Content ---------------- */}
      {/* <div className="bg-[url('/footer-bg.png')] bg-cover bg-center md:pt-112.5 py-16 px-6"> */}
      <div
        className={`bg-[url('/footer-bg.png')] bg-cover bg-center  py-16`}
      >
        <div className="w-full relative mx-auto max-w-[90%] lg:max-w-[80%]">
          {/* HR Inquiry + Sales Inquiry */}
          <div className=" w-full  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 text-gray-800">
            <div className="space-y-8">
              {/* HR Inquiry */}
              <div>
                <h4 className="font-bold text-lg mb-4">HR Inquiry</h4>
                <Link
                  href={`mailto:${hrEmail}`}
                  className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
                >
                  {/* <Image
                    src="/icon/Mail.png"
                    alt="mail"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "} */}
                  <MdEmail size={20}  className="flex-shrink-0"/>
                  <h4>{hrEmail}</h4>
                </Link>
                <Link
                  href={`tel:${phonePrimaryClean}`}
                  className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] "
                >
                  <MdPhone size={20}  className="flex-shrink-0"/>
                  {/* <Image
                    src="/icon/Ringer Volume.png"
                    alt="Volume"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "} */}
                  <h4>{phonePrimary}</h4>
                </Link>
              </div>

              {/* Sales Inquiry */}
              <div>
                <h4 className="font-bold text-lg mb-4">Sales Inquiry</h4>
                <Link
                  href={`mailto:${salesEmail}`}
                  className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
                >
                  <MdEmail size={20}  className="flex-shrink-0"/>
                  {/* <Image
                    src="/icon/Mail.png"
                    alt="mail"
                    width={24}
                    height={24}
                    className="object-contain"
                  />{" "} */}
                  <h4>{salesEmail}</h4>
                </Link>
                 <Link
                  href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-70 hover:text-[#d68029] "
                >
                  <FaMicrosoft size={20}  className="flex-shrink-0" />
                  <h4>{microsoftHandle}</h4>
                </Link>

                {/* Social Icons */}
                <div className="flex flex-wrap gap-4 mt-4 text-white">
                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-1 text-2xl rounded-2xl"
                  >
                    <AiOutlineLinkedin className="text-xl hover:text-[#d68029] transition-colors" />
                  </a>
                  <a href={behanceLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
                    <IoLogoBehance className="text-xl hover:text-[#d68029] transition-colors" />
                  </a>
                  <a
                    href={facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-1 text-2xl rounded-2xl"
                  >
                    <RiFacebookCircleLine className="text-xl hover:text-[#d68029] transition-colors" />
                  </a>
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-1 text-2xl rounded-2xl"
                  >
                    <FaSquareInstagram className="text-xl hover:text-[#d68029] transition-colors" />
                  </a>
                  <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
                    <FaYoutube className="text-xl hover:text-[#d68029] transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Help & Advice */}
            <div>
              <h4 className="font-bold text-lg mb-4">Help & Advice</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about-us"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <BiHelpCircle size={20} />
                    {/* <Image
                      src="/icon/Safety Collection Place.png"
                      alt="about us"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <MdWork size={20} />
                    {/* <Image
                      src="/icon/Mail.png"
                      alt="career"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <BiHelpCircle size={20} />
                    {/* <Image
                      src="/icon/icons8-faqs-66 1.png"
                      alt="icons8-faqs-66 1"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Ringer Volume.png"
                      alt="Volume"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <MdPhone size={20} />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* All Services */}
            <div>
              <h4 className="font-bold text-lg mb-4">All Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/wordpress-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaWordpress size={20} />
                    {/* <Image
                      src="/icon/WordPress.png"
                      alt="WordPress"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    WordPress Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/core-php"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/PHP Logo.png"
                      alt="PHP"
                      width={24}
                      height={24}
                      className="object-contain"
                    /> */}
                    <FaPhp size={20} />
                    PHP Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/uiux-design"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Create Icon.png"
                      alt="uiux"
                      width={24}
                      height={24}
                      className="object-contain"
                    /> */}
                    <FaPaintBrush size={20} />
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reactjs-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/React.png"
                      alt="Reactjs"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaReact size={20} />
                    React Js Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="nodejs-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Nodejs.png"
                      alt="Nodejs"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaNodeJs size={20} />
                    Node Js Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/angularjs-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Backend Development.png"
                      alt="full stack"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaLaptopCode size={20} />
                    Full Stack Development
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hire Developers */}
            <div>
              <h4 className="font-bold text-lg mb-4">Hire Us</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/hire/hire-full-stack-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Backend Development.png"
                      alt="full stack"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaLaptopCode size={20} />
                    Hire - Full Stack Developers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-nodejs-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Nodejs.png"
                      alt="nodejs"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaNodeJs size={20} />
                    Hire - NodeJS Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-reactjs-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/React.png"
                      alt="React"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaReact size={20} />
                    Hire - ReactJS Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-wordpress-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/WordPress.png"
                      alt="WordPress"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaWordpress size={20} />
                    Hire - WordPress Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-uiux-designer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Create Icon.png"
                      alt="uiux"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaPaintBrush size={20} />
                    Hire - UI/UX & Designer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-iphone-app-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/iOS Logo.png"
                      alt="iOS"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <DiAndroid size={20} />
                    Hire - iOS App Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-android-app-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    {/* <Image
                      src="/icon/Android OS.png"
                      alt="Android"
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "} */}
                    <FaMobileAlt size={20} />
                    Hire - Android App Developer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0f1b2d] text-gray-300 text-sm py-4">
        <div className="w-full relative mx-auto max-w-[90%] lg:max-w-[80%]  ">
          <div className=" w-full mx-auto flex flex-col md:flex-row items-center justify-between md:px-6">
            <p className="text-center">
              © 2026 Inspire Techno Solution. All Rights Reserved.
            </p>
            <div className="flex gap-6 mt-2 md:mt-0">
              <a href="/" className="hover:text-[#d68029] transition-colors">
                Privacy Policy
              </a>
              <a href="/" className="hover:text-[#d68029] transition-colors">
                Terms & Condition
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
