"use client";

import { FaFacebookF, FaTwitter, FaYoutube, FaMicrosoft, FaWordpress, FaPhp, FaReact, FaNodeJs } from "react-icons/fa";
import { IoLogoBehance } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiOutlineLinkedin } from "react-icons/ai";
import { MdEmail, MdPhone, MdWork } from "react-icons/md";
import { RiTeamFill, RiFacebookCircleLine } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

export default function Footer() {
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
    <footer className="font-sans ">
      {/* Top Section */}
      <div className="relative bg-cover bg-center py-12 px-6" >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-800">
          {/* HR Inquiry + Sales Inquiry */}
          <div className="space-y-8">
            {/* HR Inquiry */}
            <div>
              <h3 className="font-bold text-lg mb-4">HR Inquiry</h3>
              <p className="flex items-center gap-4 text-gray-700 mb-2">
                <MdEmail className="text-xl font-bold" /> {hrEmail}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <MdPhone className="text-xl font-bold" /> {phonePrimary}
              </p>
            </div>

            {/* Sales Inquiry */}
            <div>
              <h3 className="font-bold text-lg mb-4">Sales Inquiry</h3>
              <p className="flex items-center gap-4 text-gray-700 mb-2">
                <MdEmail className="text-xl font-bold" /> {salesEmail}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <FaMicrosoft className="text-xl font-bold" /> {microsoftHandle}
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-4 text-white ">
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl"><AiOutlineLinkedin className="text-xl hover:text-orange-600 transition-colors" /></a>
                <a href={behanceLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl"><IoLogoBehance className="text-xl hover:text-orange-600 transition-colors" /></a>
                <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl"><RiFacebookCircleLine className="text-xl hover:text-orange-600 transition-colors" /></a>
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl"><FaSquareInstagram className="text-xl hover:text-orange-600 transition-colors" /></a>
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl"><FaYoutube className="text-xl hover:text-orange-600 transition-colors" /></a>
              </div>
            </div>
          </div>

          {/* Help & Advice */}
          <div>
            <h3 className="font-bold text-lg mb-4">Help & Advice</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><BiHelpCircle className="text-xl font-bold" /> About Us</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><MdWork className="text-xl font-bold" /> Careers</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><BiHelpCircle className="text-xl font-bold" /> FAQs</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><MdPhone className="text-xl font-bold" /> Contact Us</a></li>
            </ul>
          </div>

          {/* All Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">All Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaWordpress className="text-xl font-bold" /> WordPress Development</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaPhp className="text-xl font-bold" /> PHP Development</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaPaintBrush className="text-xl font-bold" /> UI/UX Design</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaReact className="text-xl font-bold" /> React Js Development</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaNodeJs className="text-xl font-bold" /> Node Js Development</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaLaptopCode className="text-xl font-bold" /> Full Stack Development</a></li>
            </ul>
          </div>

          {/* Hire Developers */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hire Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaLaptopCode className="text-xl font-bold" /> Hire - Full Stack Developers</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaNodeJs className="text-xl font-bold" /> Hire - NodeJS Developer</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaReact className="text-xl font-bold" /> Hire - ReactJS Developer</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaWordpress className="text-xl font-bold" /> Hire - WordPress Developer</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaPaintBrush className="text-xl font-bold" /> Hire - UI/UX & Designer</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaMobileAlt className="text-xl font-bold" /> Hire - iOS App Developer</a></li>
              <li><a href="#" className="flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors"><FaMobileAlt className="text-xl font-bold" /> Hire - Android App Developer</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0f1b2d] text-gray-300 text-sm py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <p>© 2024 Inspire Techno Solution. All Rights Reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
