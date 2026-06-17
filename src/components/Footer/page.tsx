// "use client";

// import { IoLogoBehance } from "react-icons/io5";
// import { FaR, FaSquareInstagram, FaW, FaAndroid, FaLinkedin, FaInstagram } from "react-icons/fa6";
// import { DiAndroid } from "react-icons/di";
// import { AiOutlineLinkedin } from "react-icons/ai";
// import { RiFacebookCircleLine } from "react-icons/ri";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import TrainingContactForm from "./TrainingContactForm";
// import GeneralContactForm from "./GeneralContactForm";
// import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaYoutube,
//   FaMicrosoft,
//   FaWordpress,
//   FaPhp,
//   FaReact,
//   FaNodeJs,
// } from "react-icons/fa";
// import { MdEmail, MdMarkEmailRead, MdPhone, MdWork } from "react-icons/md";
// import { BiHelpCircle, BiPhone } from "react-icons/bi";
// import { FaLaptopCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
// import Section from "../Section";
// import Row from "../Row";
// import { HiMail } from "react-icons/hi";

// // -------------------- Main Page --------------------
// export default function ContactFooterPage() {
//   const pathname = usePathname();
//   const isTrainingPage = pathname === "/training";
//   const isContactPage = pathname === "/contact";

//   const {
//     hrEmail,
//     salesEmail,
//     phonePrimary,
//     phonePrimaryClean,
//     microsoftHandle,
//     linkedinLink,
//     facebookLink,
//     instagramLink,
//     youtubeLink,
//     behanceLink,
//   } = useWebsiteSettings();

//   return (
//     <footer id="contact-form-section" className={` relative bg-white scroll-mt-14 ${
//       !isContactPage ? " pt-16 lg:pt-18 xl:pt-22" : ""
//     }`}>
//       {/* ---------------- Contact Form Floating Card ---------------- */}
//       {/* <div className="w-full relative mx-auto max-w-[90%] lg:max-w-[80%] pb-16 "> */}
//       <Row className={`${
//           !isContactPage ? "pb-16 lg:pb-18 xl:pb-22" : ""
//         }`}
//       >
//         {/* <div className="  w-full mx-auto md:-mb-90 relative z-10">
//           <div className="bg-white md:shadow-[0_0_12.2px_0_rgba(0,0,0,0.25)] rounded-2xl p-2 md:p-10">
//             {isTrainingPage ? (
//               <TrainingContactForm />
//             ) : (
//               <GeneralContactForm />
//             )}
//           </div>
//         </div> */}

//         {!isContactPage && (
//           <div className="w-full mx-auto  relative z-10 ">
//             <div className="bg-white ">
//               {isTrainingPage ? (
//                 <TrainingContactForm />
//               ) : (
//                 <GeneralContactForm />
//               )}
//             </div>
//           </div>
//         )}
//       </Row>

//   {/* <Row className=" mx-auto bg-gray-100 rounded-xl p-6 md:p-8 lg:px-10 py-9 " >
//         <div className="flex max-lg:flex-wrap items-center gap-6 justify-between">

//         <div className="max-lg:pb-4">
//           <Link href="/" className="flex items-center">
//               <Image
//                 src="/logo.png"
//                 alt="Inspire Techno Solution"
//                 width={210}
//                 height={50}
//                 priority
//               />
//             </Link>
//         </div>

//         <div className=" flex gap-8 lg:gap-10 lg:justify-end max-lg:flex-wrap">

//           <div className="flex items-center gap-4">
//             <Link
//               href={`tel:${phonePrimaryClean}`}
//             > 
//               <div
//                 className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
//                 <MdPhone
//                   size={22}
//                   className="text-white"
//                 />
//               </div>
//             </Link>

//               <div className="relative pl-4">
//                 <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

//                 <p className="text-[13px] text-[#161616] uppercase">
//                   Ready to Build? Let's Talk!
//                 </p>

//                 <Link
//                   href={`tel:${phonePrimaryClean}`}
//                   className="flex items-center gap-4"
//                 >
//                   <h4 className="font-semibold text-lg lg:text-xl text-[#0d1b2a] break-all">
//                     {phonePrimary}
//                   </h4>
//                 </Link>
//               </div>

//           </div>

//           <div className="flex items-center gap-4">
//             <Link
//               href={`mailto:${hrEmail}`}
//             > 
//               <div
//                 className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
//                 <MdEmail
//                   size={22}
//                   className="text-white"
//                 />
//               </div>
//             </Link>

//             <div className="relative pl-4">
//               <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

//               <p className="text-[13px] text-[#161616] uppercase">
//                 Mail to our HR Department
//               </p>

//               <Link
//                 href={`mailto:${hrEmail}`}
//                 className="flex items-center gap-4"
//               >
//                 <h4 className="font-semibold  text-lg lg:text-xl  text-[#0d1b2a] break-all">
//                   {hrEmail}
//                 </h4>
//               </Link>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link
//                href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
//             > 
//               <div
//                 className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
//                 <FaMicrosoft
//                   size={22}
//                   className="text-white"
//                 />
//               </div>
//             </Link>

//             <div className="relative pl-4">
//               <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

//               <p className="text-[13px] text-[#161616] uppercase">
//                 Official Microsoft Partner
//               </p>

//               <Link
//                 href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
//                 className="flex items-center gap-4"
//               >
//                 <h4 className="font-semibold text-lg lg:text-xl text-[#0d1b2a] break-all">
//                   {microsoftHandle}
//                 </h4>
//               </Link>
//             </div>
//           </div>
//         </div>               
//         </div>

//         <div className="h-px bg-gray-300 my-8" />
//         <div
//           className="
//             flex
//             flex-col
//             lg:flex-row
//             justify-between
//             items-center text-center
//             gap-6
//           "
//         >
//             <p className=" break-all text-gray-700 ">
//             Driving innovation through digital transformation
//             for businesses across industries.
//           </p>

//            <div className="flex flex-wrap gap-4 text-white">
//                   <a
//                     href={linkedinLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <AiOutlineLinkedin className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={behanceLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <IoLogoBehance className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={facebookLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <RiFacebookCircleLine className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={instagramLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <FaSquareInstagram className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <FaYoutube className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                 </div>
//         </div>
//       </Row> */}
//       {/* ---------------- Footer Content ---------------- */}
//       {/* <div className="bg-[url('/footer-bg.png')] bg-cover bg-center md:pt-112.5 py-16 px-6"> */}
//       <Section
//         className={`bg-[url('/footer-bg.png')] bg-cover bg-center `}
//       >
//         <Row>
//           {/* HR Inquiry + Sales Inquiry */}
//           <div className=" w-full  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 text-gray-800">
//             <div className="space-y-8">
//               {/* HR Inquiry */}
//               <div>
//                 <h4 className="font-bold text-lg mb-4">HR Inquiry</h4>
//                 <Link
//                   href={`mailto:${hrEmail}`}
//                   className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
//                 >
//                   <MdEmail size={20}  className="flex-shrink-0"/>
//                   <h4>{hrEmail}</h4>
//                 </Link>
//                 <Link
//                   href={`tel:${phonePrimaryClean}`}
//                   className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] "
//                 >
//                   <MdPhone size={20}  className="flex-shrink-0"/>
//                   <h4>{phonePrimary}</h4>
//                 </Link>
//               </div>

//               {/* Sales Inquiry */}
//               <div>
//                 <h4 className="font-bold text-lg mb-4">Sales Inquiry</h4>
//                 <Link
//                   href={`mailto:${salesEmail}`}
//                   className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
//                 >
//                   <MdEmail size={20}  className="flex-shrink-0"/>
//                   <h4>{salesEmail}</h4>
//                 </Link>
//                  <Link
//                   href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-4 text-gray-70 hover:text-[#d68029] "
//                 >
//                   <FaMicrosoft size={20}  className="flex-shrink-0" />
//                   <h4>{microsoftHandle}</h4>
//                 </Link>

//                 {/* Social Icons */}
//                 <div className="flex flex-wrap gap-4 mt-4 text-white">
//                   <a
//                     href={linkedinLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <AiOutlineLinkedin className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={behanceLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <IoLogoBehance className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={facebookLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <RiFacebookCircleLine className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={instagramLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <FaSquareInstagram className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <FaYoutube className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Help & Advice */}
//             <div>
//               <h4 className="font-bold text-lg mb-4">Help & Advice</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/about-us"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <BiHelpCircle size={20} />
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/career"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <MdWork size={20} />
//                     Careers
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link
//                     href="/faqs"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <BiHelpCircle size={20} />
//                     <Image
//                       src="/icon/icons8-faqs-66 1.png"
//                       alt="icons8-faqs-66 1"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "}
//                     FAQs
//                   </Link>
//                 </li> */}

//                 <li>
//                   <Link
//                     href="/contact"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <MdPhone size={20} />
//                     Contact Us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* All Services */}
//             <div>
//               <h4 className="font-bold text-lg mb-4">All Services</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/wordpress-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <FaWordpress size={20} />
//                     {/* <Image
//                       src="/icon/WordPress.png"
//                       alt="WordPress"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     WordPress Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/core-php"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/PHP Logo.png"
//                       alt="PHP"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     /> */}
//                     <FaPhp size={20} />
//                     PHP Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/uiux-design"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Create Icon.png"
//                       alt="uiux"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     /> */}
//                     <FaPaintBrush size={20} />
//                     UI/UX Design
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/reactjs-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/React.png"
//                       alt="Reactjs"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaReact size={20} />
//                     React Js Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="nodejs-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Nodejs.png"
//                       alt="Nodejs"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaNodeJs size={20} />
//                     Node Js Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/angularjs-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Backend Development.png"
//                       alt="full stack"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaLaptopCode size={20} />
//                     Full Stack Development
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Hire Developers */}
//             <div>
//               <h4 className="font-bold text-lg mb-4">Hire Us</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/hire/hire-full-stack-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Backend Development.png"
//                       alt="full stack"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaLaptopCode size={20} />
//                     Hire - Full Stack Developers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-nodejs-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Nodejs.png"
//                       alt="nodejs"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaNodeJs size={20} />
//                     Hire - NodeJS Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-reactjs-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/React.png"
//                       alt="React"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaReact size={20} />
//                     Hire - ReactJS Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-wordpress-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/WordPress.png"
//                       alt="WordPress"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaWordpress size={20} />
//                     Hire - WordPress Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-uiux-designer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Create Icon.png"
//                       alt="uiux"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaPaintBrush size={20} />
//                     Hire - UI/UX & Designer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-iphone-app-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/iOS Logo.png"
//                       alt="iOS"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <DiAndroid size={20} />
//                     Hire - iOS App Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-android-app-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Android OS.png"
//                       alt="Android"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaMobileAlt size={20} />
//                     Hire - Android App Developer
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </Row>
//       </Section>

//       {/* Bottom Bar */}
//       <div className="bg-[#0f1b2d] text-gray-300 text-sm py-4">
//         <Row>
//           <div className=" w-full mx-auto flex flex-col md:flex-row items-center justify-between md:px-6">
//             <p className="text-center">
//               © 2026 Inspire Techno Solution. All Rights Reserved.
//             </p>
//             <div className="flex gap-6 mt-2 md:mt-0">
//               <a href="/" className="hover:text-[#d68029] transition-colors">
//                 Privacy Policy
//               </a>
//               <a href="/" className="hover:text-[#d68029] transition-colors">
//                 Terms & Condition
//               </a>
//             </div>
//           </div>
//         </Row>
//       </div>
//     </footer>
//   );
// }


// "use client";

// import { IoLogoBehance } from "react-icons/io5";
// import { FaR, FaSquareInstagram, FaW, FaAndroid, FaLinkedin, FaInstagram } from "react-icons/fa6";
// import { DiAndroid } from "react-icons/di";
// import { AiOutlineLinkedin } from "react-icons/ai";
// import { RiFacebookCircleLine } from "react-icons/ri";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import TrainingContactForm from "./TrainingContactForm";
// import GeneralContactForm from "./GeneralContactForm";
// import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaYoutube,
//   FaMicrosoft,
//   FaWordpress,
//   FaPhp,
//   FaReact,
//   FaNodeJs,
// } from "react-icons/fa";
// import { MdEmail, MdMarkEmailRead, MdPhone, MdWork } from "react-icons/md";
// import { BiHelpCircle, BiPhone } from "react-icons/bi";
// import { FaLaptopCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
// import Section from "../Section";
// import Row from "../Row";
// import { HiMail } from "react-icons/hi";

// // -------------------- Main Page --------------------
// export default function ContactFooterPage() {
//   const pathname = usePathname();
//   const isTrainingPage = pathname === "/training";
//   const isContactPage = pathname === "/contact";

//   const {
//     hrEmail,
//     salesEmail,
//     phonePrimary,
//     phonePrimaryClean,
//     microsoftHandle,
//     linkedinLink,
//     facebookLink,
//     instagramLink,
//     youtubeLink,
//     behanceLink,
//   } = useWebsiteSettings();

//   return (
//     <footer id="contact-form-section" className={` relative bg-white scroll-mt-14 ${
//       !isContactPage ? " pt-16 lg:pt-18 xl:pt-22" : ""
//     }`}>
//       {/* ---------------- Contact Form Floating Card ---------------- */}
//       {/* <div className="w-full relative mx-auto max-w-[90%] lg:max-w-[80%] pb-16 "> */}
//       <Row className={`${
//           !isContactPage ? "pb-16 lg:pb-18 xl:pb-22" : ""
//         }`}
//       >
//         {/* <div className="  w-full mx-auto md:-mb-90 relative z-10">
//           <div className="bg-white md:shadow-[0_0_12.2px_0_rgba(0,0,0,0.25)] rounded-2xl p-2 md:p-10">
//             {isTrainingPage ? (
//               <TrainingContactForm />
//             ) : (
//               <GeneralContactForm />
//             )}
//           </div>
//         </div> */}

//         {!isContactPage && (
//           <div className="w-full mx-auto  relative z-10 ">
//             <div className="bg-white ">
//               {isTrainingPage ? (
//                 <TrainingContactForm />
//               ) : (
//                 <GeneralContactForm />
//               )}
//             </div>
//           </div>
//         )}
//       </Row>

//   {/* <Row className=" mx-auto bg-gray-100 rounded-xl p-6 md:p-8 lg:px-10 py-9 " >
//         <div className="flex max-lg:flex-wrap items-center gap-6 justify-between">

//         <div className="max-lg:pb-4">
//           <Link href="/" className="flex items-center">
//               <Image
//                 src="/logo.png"
//                 alt="Inspire Techno Solution"
//                 width={210}
//                 height={50}
//                 priority
//               />
//             </Link>
//         </div>

//         <div className=" flex gap-8 lg:gap-10 lg:justify-end max-lg:flex-wrap">

//           <div className="flex items-center gap-4">
//             <Link
//               href={`tel:${phonePrimaryClean}`}
//             > 
//               <div
//                 className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
//                 <MdPhone
//                   size={22}
//                   className="text-white"
//                 />
//               </div>
//             </Link>

//               <div className="relative pl-4">
//                 <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

//                 <p className="text-[13px] text-[#161616] uppercase">
//                   Ready to Build? Let's Talk!
//                 </p>

//                 <Link
//                   href={`tel:${phonePrimaryClean}`}
//                   className="flex items-center gap-4"
//                 >
//                   <h4 className="font-semibold text-lg lg:text-xl text-[#0d1b2a] break-all">
//                     {phonePrimary}
//                   </h4>
//                 </Link>
//               </div>

//           </div>

//           <div className="flex items-center gap-4">
//             <Link
//               href={`mailto:${hrEmail}`}
//             > 
//               <div
//                 className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
//                 <MdEmail
//                   size={22}
//                   className="text-white"
//                 />
//               </div>
//             </Link>

//             <div className="relative pl-4">
//               <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

//               <p className="text-[13px] text-[#161616] uppercase">
//                 Mail to our HR Department
//               </p>

//               <Link
//                 href={`mailto:${hrEmail}`}
//                 className="flex items-center gap-4"
//               >
//                 <h4 className="font-semibold  text-lg lg:text-xl  text-[#0d1b2a] break-all">
//                   {hrEmail}
//                 </h4>
//               </Link>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link
//                href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
//             > 
//               <div
//                 className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
//                 <FaMicrosoft
//                   size={22}
//                   className="text-white"
//                 />
//               </div>
//             </Link>

//             <div className="relative pl-4">
//               <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

//               <p className="text-[13px] text-[#161616] uppercase">
//                 Official Microsoft Partner
//               </p>

//               <Link
//                 href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
//                 className="flex items-center gap-4"
//               >
//                 <h4 className="font-semibold text-lg lg:text-xl text-[#0d1b2a] break-all">
//                   {microsoftHandle}
//                 </h4>
//               </Link>
//             </div>
//           </div>
//         </div>               
//         </div>

//         <div className="h-px bg-gray-300 my-8" />
//         <div
//           className="
//             flex
//             flex-col
//             lg:flex-row
//             justify-between
//             items-center text-center
//             gap-6
//           "
//         >
//             <p className=" break-all text-gray-700 ">
//             Driving innovation through digital transformation
//             for businesses across industries.
//           </p>

//            <div className="flex flex-wrap gap-4 text-white">
//                   <a
//                     href={linkedinLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <AiOutlineLinkedin className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={behanceLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <IoLogoBehance className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={facebookLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <RiFacebookCircleLine className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={instagramLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <FaSquareInstagram className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <FaYoutube className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                 </div>
//         </div>
//       </Row> */}
//       {/* ---------------- Footer Content ---------------- */}
//       {/* <div className="bg-[url('/footer-bg.png')] bg-cover bg-center md:pt-112.5 py-16 px-6"> */}
//       <Section
//         className={`bg-[url('/footer-bg.png')] bg-cover bg-center `}
//       >
//         <Row>
//           {/* HR Inquiry + Sales Inquiry */}
//           <div className=" w-full  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 text-gray-800">
//             <div className="space-y-8">
//               {/* HR Inquiry */}
//               <div>
//                 <h4 className="font-bold text-lg mb-4">HR Inquiry</h4>
//                 <Link
//                   href={`mailto:${hrEmail}`}
//                   className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
//                 >
//                   <MdEmail size={20}  className="flex-shrink-0"/>
//                   <h4>{hrEmail}</h4>
//                 </Link>
//                 <Link
//                   href={`tel:${phonePrimaryClean}`}
//                   className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] "
//                 >
//                   <MdPhone size={20}  className="flex-shrink-0"/>
//                   <h4>{phonePrimary}</h4>
//                 </Link>
//               </div>

//               {/* Sales Inquiry */}
//               <div>
//                 <h4 className="font-bold text-lg mb-4">Sales Inquiry</h4>
//                 <Link
//                   href={`mailto:${salesEmail}`}
//                   className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
//                 >
//                   <MdEmail size={20}  className="flex-shrink-0"/>
//                   <h4>{salesEmail}</h4>
//                 </Link>
//                  <Link
//                   href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-4 text-gray-70 hover:text-[#d68029] "
//                 >
//                   <FaMicrosoft size={20}  className="flex-shrink-0" />
//                   <h4>{microsoftHandle}</h4>
//                 </Link>

//                 {/* Social Icons */}
//                 <div className="flex flex-wrap gap-4 mt-4 text-white">
//                   <a
//                     href={linkedinLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <AiOutlineLinkedin className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={behanceLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <IoLogoBehance className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={facebookLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <RiFacebookCircleLine className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a
//                     href={instagramLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 p-1 text-2xl rounded-2xl"
//                   >
//                     <FaSquareInstagram className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                   <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-1 text-2xl rounded-2xl">
//                     <FaYoutube className="text-xl hover:text-[#d68029] transition-colors" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Help & Advice */}
//             <div>
//               <h4 className="font-bold text-lg mb-4">Help & Advice</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/about-us"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <BiHelpCircle size={20} />
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/career"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <MdWork size={20} />
//                     Careers
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link
//                     href="/faqs"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <BiHelpCircle size={20} />
//                     <Image
//                       src="/icon/icons8-faqs-66 1.png"
//                       alt="icons8-faqs-66 1"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "}
//                     FAQs
//                   </Link>
//                 </li> */}

//                 <li>
//                   <Link
//                     href="/contact"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <MdPhone size={20} />
//                     Contact Us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* All Services */}
//             <div>
//               <h4 className="font-bold text-lg mb-4">All Services</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/wordpress-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     <FaWordpress size={20} />
//                     {/* <Image
//                       src="/icon/WordPress.png"
//                       alt="WordPress"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     WordPress Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/core-php"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/PHP Logo.png"
//                       alt="PHP"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     /> */}
//                     <FaPhp size={20} />
//                     PHP Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/uiux-design"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Create Icon.png"
//                       alt="uiux"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     /> */}
//                     <FaPaintBrush size={20} />
//                     UI/UX Design
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/reactjs-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/React.png"
//                       alt="Reactjs"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaReact size={20} />
//                     React Js Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="nodejs-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Nodejs.png"
//                       alt="Nodejs"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaNodeJs size={20} />
//                     Node Js Development
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/angularjs-development"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Backend Development.png"
//                       alt="full stack"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaLaptopCode size={20} />
//                     Full Stack Development
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Hire Developers */}
//             <div>
//               <h4 className="font-bold text-lg mb-4">Hire Us</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/hire/hire-full-stack-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Backend Development.png"
//                       alt="full stack"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaLaptopCode size={20} />
//                     Hire - Full Stack Developers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-nodejs-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Nodejs.png"
//                       alt="nodejs"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaNodeJs size={20} />
//                     Hire - NodeJS Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-reactjs-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/React.png"
//                       alt="React"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaReact size={20} />
//                     Hire - ReactJS Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-wordpress-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/WordPress.png"
//                       alt="WordPress"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaWordpress size={20} />
//                     Hire - WordPress Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-uiux-designer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Create Icon.png"
//                       alt="uiux"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaPaintBrush size={20} />
//                     Hire - UI/UX & Designer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-iphone-app-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/iOS Logo.png"
//                       alt="iOS"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <DiAndroid size={20} />
//                     Hire - iOS App Developer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/hire/hire-android-app-developer"
//                     className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
//                   >
//                     {/* <Image
//                       src="/icon/Android OS.png"
//                       alt="Android"
//                       width={24}
//                       height={24}
//                       className="object-contain"
//                     />{" "} */}
//                     <FaMobileAlt size={20} />
//                     Hire - Android App Developer
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </Row>
//       </Section>

//       {/* Bottom Bar */}
//       <div className="bg-[#0f1b2d] text-gray-300 text-sm py-4">
//         <Row>
//           <div className=" w-full mx-auto flex flex-col md:flex-row items-center justify-between md:px-6">
//             <p className="text-center">
//               © 2026 Inspire Techno Solution. All Rights Reserved.
//             </p>
//             <div className="flex gap-6 mt-2 md:mt-0">
//               <a href="/" className="hover:text-[#d68029] transition-colors">
//                 Privacy Policy
//               </a>
//               <a href="/" className="hover:text-[#d68029] transition-colors">
//                 Terms & Condition
//               </a>
//             </div>
//           </div>
//         </Row>
//       </div>
//     </footer>
//   );
// }



"use client";

import { IoLogoBehance } from "react-icons/io5";
import { FaR, FaSquareInstagram, FaW, FaAndroid, FaLinkedin, FaInstagram } from "react-icons/fa6";
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
import { MdEmail, MdMarkEmailRead, MdPhone, MdWork } from "react-icons/md";
import { BiHelpCircle, BiPhone } from "react-icons/bi";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import Section from "../Section";
import Row from "../Row";
import { HiMail } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { getNavigationStructure, NavigationStructure } from "@/lib/navigationService";


// -------------------- Main Page --------------------
export default function ContactFooterPage() {
  const pathname = usePathname();
  const isTrainingPage = pathname === "/training";
  const isContactPage = pathname === "/contact";

  const [navStructure, setNavStructure] = useState<NavigationStructure | null>(null);

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
    blogSlug,
    portfolioSlug
  } = useWebsiteSettings();



  const nav: NavigationStructure = navStructure ?? {
    mainNav: [],
    servicesNav: [],
    hireNav: [],
  };

  const hireLink = nav.mainNav.find(
      (l) => l.systemIdentifier === "hire"
    );
    const aboutLink = nav.mainNav.find(
      (link) => link.systemIdentifier === "about-us"
    );

    const careerLink = nav.mainNav.find(
      (link) => link.systemIdentifier === "career"
    );

    const contactLink = nav.mainNav.find(
      (link) => link.systemIdentifier === "contact"
    );

    const blogLink = nav.mainNav.find(
      (link) => link.systemIdentifier === "blog"
    );

    const portfolioLink = nav.mainNav.find(
      (link) => link.systemIdentifier === "portfolio"
    );

    const trainingLink = nav.mainNav.find(
      (link) => link.systemIdentifier === "training"
    );

    const footerLinks = [
      {
        title: "About Us",
        href: aboutLink ? `/${aboutLink.slug}` : "/about-us",
      },
      {
        title: "Blogs",
        href: blogLink ? `/${blogLink.slug}` : "/blog",
      },
      {
        title: "Careers",
        href: careerLink ? `/${careerLink.slug}` : "/career",
      },
      {
        title: "Contact Us",
        href: contactLink ? `/${contactLink.slug}` : "/contact",
      },
      {
        title: "Our Portfolio",
        href: portfolioLink ? `/${portfolioLink.slug}` : "/my-portfolio",
      },
      {
        title: "Training",
        href: trainingLink ? `/${trainingLink.slug}` : "/training",
      },
    ];

    useEffect(() => {
        const fetchNavData = async () => {
          try {
            const data = await getNavigationStructure();

            setNavStructure(data);
          } catch (error) {
            console.error(error);
          }
        };

        fetchNavData();
      }, []);

    const serviceData = nav.servicesNav.flatMap((category) =>
      (category.links ?? []).map((s) => ({
        title: s.title,
        slug: s.slug,
      }))
    );

    const hireSlugPrefix = hireLink?.slug ?? "hire";
    const hireServices = nav.hireNav.flatMap((group) =>
      (group.links ?? []).map((link) => ({
        title: link.title,
        href: `/${hireSlugPrefix}/${link.slug}`,
      }))
    );

    if (!navStructure) return null;

  return (
    <footer id="contact-form-section" className={` relative bg-white scroll-mt-14 ${
      !isContactPage ? " pt-16 lg:pt-18 xl:pt-22" : ""
    }`}>
      {/* ---------------- Contact Form Floating Card ---------------- */}
      {/* <div className="w-full relative mx-auto max-w-[90%] lg:max-w-[80%] pb-16 "> */}
      <Row className={`${
          !isContactPage ? "pb-16 lg:pb-18 xl:pb-22" : ""
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
      </Row>

<Section className="bg-gray-100 !py-14">
  <Row className=" mx-auto  rounded-xl " >
  {/* <Row> */}
        <div className="flex max-lg:flex-wrap items-center gap-6 justify-between">

        <div className="max-lg:pb-4">
          <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Inspire Techno Solution"
                width={210}
                height={50}
                priority
              />
            </Link>
        </div>

        <div className=" flex gap-8 lg:gap-10 lg:justify-end max-lg:flex-wrap">

          <div className="flex items-center gap-4">
            <Link
              href={`tel:${phonePrimaryClean}`}
            > 
              <div
                className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
                <MdPhone
                  size={22}
                  className="text-white"
                />
              </div>
            </Link>

              <div className="relative pl-4">
                <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

                <p className="text-[13px] text-[#161616] uppercase">
                  Ready to Build? Let's Talk!
                </p>

                <Link
                  href={`tel:${phonePrimaryClean}`}
                  className="flex items-center gap-4"
                >
                  <h4 className="font-semibold text-lg lg:text-xl text-[#0d1b2a] break-all">
                    {phonePrimary}
                  </h4>
                </Link>
              </div>

          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`mailto:${hrEmail}`}
            > 
              <div
                className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
                <MdEmail
                  size={22}
                  className="text-white"
                />
              </div>
            </Link>

            <div className="relative pl-4">
              <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

              <p className="text-[13px] text-[#161616] uppercase">
                Mail to our HR Department
              </p>

              <Link
                href={`mailto:${hrEmail}`}
                className="flex items-center gap-4"
              >
                <h4 className="font-semibold  text-lg lg:text-xl  text-[#0d1b2a] break-all">
                  {hrEmail}
                </h4>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
               href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
            > 
              <div
                className="  w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d68029] to-[#f7b733] ">
                <FaMicrosoft
                  size={22}
                  className="text-white"
                />
              </div>
            </Link>

            <div className="relative pl-4">
              <div className=" absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#e6e6e6] via-[#0d1b2a] to-[#e6e6e6] " />

              <p className="text-[13px] text-[#161616] uppercase">
                Official Microsoft Partner
              </p>

              <Link
                href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
                className="flex items-center gap-4"
              >
                <h4 className="font-semibold text-lg lg:text-xl text-[#0d1b2a] break-all">
                  {microsoftHandle}
                </h4>
              </Link>
            </div>
          </div>
        </div>               
        </div>

        <div className="h-px bg-gray-300 my-8" />
        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center text-center
            gap-6
          "
        >
            <p className=" break-all text-gray-700 ">
            Driving innovation through digital transformation
            for businesses across industries.
          </p>

           <div className="flex flex-wrap gap-4 text-white">
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
  </Row>
</Section>
      {/* ---------------- Footer Content ---------------- */}
      {/* <div className="bg-[url('/footer-bg.png')] bg-cover bg-center md:pt-112.5 py-16 px-6"> */}
      {/* <Section
        className={`bg-[url('/footer-bg.png')] bg-cover bg-center `}
      >
        <Row>
          <div className=" w-full  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 text-gray-800">
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-lg mb-4">HR Inquiry</h4>
                <Link
                  href={`mailto:${hrEmail}`}
                  className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
                >
                  <MdEmail size={20}  className="flex-shrink-0"/>
                  <h4>{hrEmail}</h4>
                </Link>
                <Link
                  href={`tel:${phonePrimaryClean}`}
                  className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] "
                >
                  <MdPhone size={20}  className="flex-shrink-0"/>
                  <h4>{phonePrimary}</h4>
                </Link>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">Sales Inquiry</h4>
                <Link
                  href={`mailto:${salesEmail}`}
                  className="flex items-center break-all gap-4 text-gray-700 hover:text-[#d68029]  mb-2"
                >
                  <MdEmail size={20}  className="flex-shrink-0"/>
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

            <div>
              <h4 className="font-bold text-lg mb-4">Help & Advice</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about-us"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <BiHelpCircle size={20} />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <MdWork size={20} />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <BiHelpCircle size={20} />
                    FAQs
                  </Link>
                </li> 

                <li>
                  <Link
                    href="/contact"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <MdPhone size={20} />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">All Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/wordpress-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaWordpress size={20} />
                    WordPress Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/core-php"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaPhp size={20} />
                    PHP Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/uiux-design"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaPaintBrush size={20} />
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reactjs-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaReact size={20} />
                    React Js Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="nodejs-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaNodeJs size={20} />
                    Node Js Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/angularjs-development"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaLaptopCode size={20} />
                    Full Stack Development
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Hire Us</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/hire/hire-full-stack-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaLaptopCode size={20} />
                    Hire - Full Stack Developers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-nodejs-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaNodeJs size={20} />
                    Hire - NodeJS Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-reactjs-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaReact size={20} />
                    Hire - ReactJS Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-wordpress-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaWordpress size={20} />
                    Hire - WordPress Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-uiux-designer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaPaintBrush size={20} />
                    Hire - UI/UX & Designer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-iphone-app-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <DiAndroid size={20} />
                    Hire - iOS App Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire/hire-android-app-developer"
                    className="flex items-center gap-4 text-gray-700 hover:text-[#d68029] transition-colors"
                  >
                    <FaMobileAlt size={20} />
                    Hire - Android App Developer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Row>
      </Section> */}

      <Section className="!py-8">
        <Row className="flex flex-col space-y-5 md:space-y-7 ">
          <div>  
            {/* <ul className="flex flex-wrap ">
                <li>
                  <Link href="/about-us"
                    className=" text-gray-700 hover:text-[#D68029] transition-all hover:underlin text-[14px]"
                  >
                    About Us
                  </Link>
                  <span className="mx-2 text-[#D68029]"> | </span>
                </li>
                <li>
                  <Link href={`/${blogSlug}`}
                    className=" text-gray-700 hover:text-[#D68029] transition-all hover:underline text-[14px]"
                  >
                    Blogs
                  </Link>
                  <span className="mx-2 text-[#D68029]"> | </span>
                </li> 
                
                <li>
                  <Link href="/career"
                    className=" text-gray-700 hover:text-[#D68029] transition-all hover:underline text-[14px]"
                  >
                    Careers
                  </Link>
                  <span className="mx-2 text-[#D68029]"> | </span>
                </li> 
                
                <li>
                  <Link href="/contact"
                    className=" text-gray-700 hover:text-[#D68029] transition-all hover:underline text-[14px]"
                  >
                    Contact Us
                  </Link>
                  <span className="mx-2 text-[#D68029]"> | </span>
                </li>
                <li>
                  <Link href={`/${portfolioSlug}`}
                    className=" text-gray-700 hover:text-[#D68029] transition-all hover:underline text-[14px]"
                  >
                   Our Portfoilo
                  </Link>
                  <span className="mx-2 text-[#D68029]"> | </span>
                </li> 
                 <li>
                  <Link href="/training"
                    className=" text-gray-700 hover:text-[#D68029] transition-all hover:underline text-[14px]"
                  >
                    Training
                  </Link>
                </li>
            </ul> */}
            <ul className="flex flex-wrap">
              {footerLinks.map((item, index) => (
                <li
                  key={item.href}
                  className="list-none py-1"
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[#D68029] transition-all hover:underline text-[14px]"
                  >
                    {item.title}
                  </Link>

                  {index !== footerLinks.length - 1 && (
                    <span className="mx-2 text-[#D68029]">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Our Services</h4>
            <ul className="flex flex-wrap ">
                {serviceData.map((service, index) => (
                  <li
                    key={service.slug || index}
                    className="list-none py-1"
                  >
                    <Link
                      href={`/${service.slug}`}
                      className="  text-gray-700  hover:text-[#D68029] transition-all hover:underline  "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D68029]" />

                      <span className="text-[14px] leading-5">
                        {service.title}
                      </span>
                    </Link>
                    {index !== serviceData.length - 1 && (
                      <span className="mx-2 text-[#D68029]">
                        |
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Hire Developer</h4>
            <ul className="flex flex-wrap ">
               {hireServices.map((item, i) => (
              <li key={item.href} className="py-1">
                <Link
                  href={item.href}
                  className=" text-gray-700  hover:text-[#D68029]  transition-all hover:underline "
                >
                <span className="text-[14px] leading-5">
                    {item.title}
                  </span>
                </Link>

                {i !== hireServices.length - 1 && (
                  <span className="mx-2 text-[#D68029]">|</span>
                )}
              </li>
            ))}
            </ul>
          </div>
          </Row>

          </Section>
      {/* Bottom Bar */}
      <div className="bg-[#0f1b2d] text-gray-300 text-sm py-4">
        <Row>
          <div className=" w-full mx-auto flex flex-col lg:flex-row items-center justify-between ">
            <p className="text-center">
              © 2026 Inspire Techno Solution. All Rights Reserved.
            </p>
            <div className="flex max-md:flex-wrap gap-4 md:gap-6 max-lg:mt-4  items-center justify-center">
              <div className="cursor-pointer">
                <Image
                  alt="DMCA.com"
                  src="/home/dmca.png"
                  width={100}
                  height={20}
                  className=" w-auto"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center">
                <a href="/privacy-policy"
                  className="pr-2 md:pr-3 border-r border-white/20 hover:text-[#d68029]"
                >
                  Privacy Policy
                </a>
                <a href="/"
                  className="px-2 md:px-3 border-r border-white/20 hover:text-[#d68029]"
                >
                  Terms & Conditions
                </a>
                <a href="/sitemap"
                  className="pl-2 md:pl-3 hover:text-[#d68029]"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </footer>
  );
}
