"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OurServices() {
  const services = [
    {
      title: "Mobile App Development",
      subtitle:
        "Transforming business ideas into best solutions through creative mobile app development.",
      desc: "We design and develop high-performance mobile applications with cross-platform frameworks and native technologies to ensure seamless user experience.",
      img: "/services/Mobile-App-Development-1.svg",
      techIcons: [
        { img: "/services/Fluuter-icon.svg", label: "Flutter" },
        { img: "/services/Android-colorfull-Icon.svg", label: "Android" },
        { img: "/services/IOS-colorfull-icon.svg", label: "iOS" },
      ],
      list: [
        { img: "/icon/flutter.png", text: "Flutter App Development" },
        { img: "/icon/Android OS.png", text: "Android App Development" },
        { img: "/icon/iOS Logo.png", text: "iPhone App Development" },
      ],
      link: "/flutter-app-development",
    },
    {
      title: "Full Stack DEVELOPMENT",
      subtitle:
        "Transforming business ideas and build a best solutions through creative web-app development.",
      desc: "ITS covers a wide range of customized services and solutions. From system architecture and cloud integrations to modern UI frameworks, we help you scale your business with robust full-stack applications.",
      img: "/services/Full-Stack-Developemnt.svg",
      techIcons: [
        { img: "/services/react-colorfull-icon.svg", label: "React Js" },
        { img: "/services/node-colorfull-icon.svg", label: "Node Js" },
        { img: "/services/hpp-colorfull-icon.svg", label: "PHP" },
        { img: "/services/laravel-color-full-icon.svg", label: "Laravel" },
        {
          img: "/services/CodeIgniter-colorfull-icon.svg",
          label: "CodeIgniter",
        },
      ],
      list: [
        { img: "/icon/React.png", text: "ReactJS Development" },
        { img: "/icon/Nodejs.png", text: "NodeJS Development" },
        { img: "/icon/PHP Logo.png", text: "Core PHP" },
        { img: "/icon/Laravel.png", text: "Laravel Development" },
        { img: "/icon/icons8-codeigniter-96 1.png", text: "CodeIgniter Development" },
      ],
      link: "/reactjs-development",
    },
    {
      title: "ECommerce & CMS Development",
      subtitle:
        "Building powerful and scalable eCommerce and CMS solutions tailored to your business needs.",
      desc: "ITS specializes in Shopify, Magento, and WordPress platforms. We craft optimized storefronts, secure payment integrations, and content management systems that empower your business to grow online.",
      img: "/services/E-commerce-CMS-Development.svg",
      techIcons: [
        { img: "/services/Shopify-Development.svg", label: "Shopify" },
        { img: "/services/WordPress-Development.svg", label: "WordPress" },
        { img: "/services/Magento-Development.svg", label: "Magento" },
        { img: "/services/WooCommerce-Development.svg", label: "WooCommerce" },
      ],
      list: [
        { img: "/icon/WordPress.png", text: "WordPress Development" },
        { img: "/icon/Magento.png", text: "Magento Development" },
        { img: "/icon/Shopify.png", text: "Shopify Development" },
        { img: "/icon/WooCommerce.png", text: "WooCommerce Development" },
      ],
      link: "/wordpress-development",
    },
    {
      title: "UI/UX & Design Services",
      subtitle:
        "Delivering intuitive, creative, and user-friendly UI/UX designs for mobile and web platforms.",
      desc: "From prototypes to final product design, we ensure every interface is clean, aesthetic, and user-focused. Our team combines design thinking with modern tools to create delightful user experiences.",
      img: "/services/UI-UX-Design-Services.svg",
      techIcons: [
        { img: "/services/Sketch.svg", label: "Sketch" },
        { img: "/services/Photoshop.svg", label: "Photoshop" },
        { img: "/services/Illustrator.svg", label: "Illustrator" },
        { img: "/services/XD.svg", label: "XD" },
        { img: "/services/Figma.svg", label: "Figma" },
      ],
      list: [
        { img: "/icon/Mobile Taxi Service.png", text: "Mobile App Design" },
        { img: "/icon/Application Window.png", text: "Responsive Web Design" },
        { img: "/icon/ArtStation.png", text: "Logo Design" },
        { img: "/icon/Product Architecture.png", text: "Product Design" },
        { img: "/icon/Create Icon.png", text: "Design Prototyping" },
        { img: "/icon/PSD.png", text: "PSD to HTML Development" },
        { img: "/icon/Design.png", text: "Poster Design" },
      ],
      link: "/uiux-design",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex flex-wrap">
        {services.map((service, index) => (
          <div
            key={index}
            className={`w-full relative mx-auto flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center justify-between gap-10 px-6 md:px-12 py-16`}
          >
            {/* Image */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                x: [0, -20, 20, -10, 10, 0],
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src={service.img}
                alt={service.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-125 md:w-162.25 lg:w-175 h-auto object-contain"
              />
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className=" relative common_htags left_htags "
              >
                <h2 className="relative text-3xl md:text-4xl font-bold mb-4">
                  {service.title}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                className="text-gray-700 text-lg mb-3"
              >
                {service.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-gray-500 mb-6"
              >
                {service.desc}
              </motion.p>

              {/* Tech Icons */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="flex items-center gap-6 mb-6 flex-wrap"
              >
                {service.techIcons.map(({ img, label }, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Image src={img} alt={label} width={40} height={40} />
                    <span className="text-sm mt-1">{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* List */}
              <motion.ul
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                className="mb-6 text-gray-700 grid gap-3 grid-cols-1 md:grid-cols-2"
              >
                {service.list.map(({ img, text }, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Image src={img} alt={text} width={24} height={24} />
                    {text}
                  </li>
                ))}
              </motion.ul>

              {/* Button with link */}
              <Link href={service.link}>
                <motion.button
                  className="relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 
             bg-[#0b1833] text-white text-sm sm:text-base font-medium 
             rounded-lg shadow-md cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  animate="rest"
                  whileHover="hover"
                  variants={{
                    rest: { scale: 1, opacity: 1, y: 0 },
                    hover: { scale: 1.02 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-linear-to-r from-[#D68025] to-[#D68029]"
                    variants={{
                      rest: { scaleX: 0, originX: 0.5 },
                      hover: { scaleX: 1, originX: 0.5 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ transformOrigin: "center" }}
                  />
                  <span className="relative z-10">Know More</span>
                </motion.button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
