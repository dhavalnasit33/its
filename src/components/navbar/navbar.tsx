"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavigationStructure } from "@/lib/navigationService";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

interface NavbarProps {
  navStructure: NavigationStructure;
}

export default function Navbar({ navStructure }: NavbarProps) {
  const { hrEmail, contactEmail, phonePrimary, phonePrimaryClean } =
    useWebsiteSettings();

  // State for mobile menu toggles
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    number | null
  >(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileHireUsOpen, setMobileHireUsOpen] = useState(false);
  const [activeMobileHireCategory, setActiveMobileHireCategory] = useState<
    number | null
  >(null);

  // State for desktop dropdowns
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [hireUsOpen, setHireUsOpen] = useState(false);

  // Refs for closing dropdowns on outside click
  const pathname = usePathname();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLLIElement>(null);
  const aboutRef = useRef<HTMLLIElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const hireUsRef = useRef<HTMLLIElement>(null);
  const hireUsDropdownRef = useRef<HTMLDivElement>(null);

  // Make the 'About Us' and 'Career' links dynamic
  const aboutLink = (navStructure.mainNav || []).find(
    (link) => link.systemIdentifier === "about-us",
  );
  const careerLink = (navStructure.mainNav || []).find(
    (link) => link.systemIdentifier === "career",
  );

  //also take hire and ourservie  and portfolio page link daynbamic
  const hireLink = (navStructure.mainNav || []).find(
    (link) => link.systemIdentifier === "hire",
  );
  const ourServiesLink = (navStructure.mainNav || []).find(
    (link) => link.systemIdentifier === "services",
  );
  const portfolioLink = (navStructure.mainNav || []).find(
    (link) => link.systemIdentifier === "portfolio",
  );

  const ContactLink = (navStructure.mainNav || []).find(
    (link) => link.systemIdentifier === "contact",
  );    

  const servicesData = (navStructure.servicesNav || []).map((group) => {
    const icon = typeof group.icon === "string" ? group.icon.trim() : "";
    return {
      title: group.category,
      icon: icon, // Safe string
      services: group.links.map((link) => ({
        href: `/${link.slug}`,
        label: link.title,
      })),
    };
  });

  const hireSlugPrefix = hireLink ? hireLink.slug : "hire";
  const hireData = (navStructure.hireNav || []).map((group) => {
    const icon = typeof group.icon === "string" ? group.icon.trim() : "";
    return {
      title: group.category,
      icon: icon, // Safe string
      services: group.links.map((link) => ({
        href: `/${hireSlugPrefix}/${link.slug}`,
        label: link.title,
      })),
    };
  });
  const aboutData = [
    { href: aboutLink ? `/${aboutLink.slug}` : "/about-us", label: "About Us" },
    { href: careerLink ? `/${careerLink.slug}` : "/career", label: "Career" },
    {
      href: `mailto:${hrEmail}`,
      label: hrEmail,
    },
    {
      href: `mailto:${contactEmail}`,
      label: contactEmail,
    },
    { href: `tel:${phonePrimaryClean}`, label: `${phonePrimary} (HR)` },
  ];

  const hireBottomBar = [
    {
      src: "/navbar/image-112-Traced.png",
      label: "On-Time Delivery",
      alt: "On-Time Delivery",
    },
    {
      src: "/navbar/transparency.png",
      label: "100% Transparency",
      alt: "100% Transparency",
    },
    {
      src: "/navbar/messaging.png",
      label: "One-to-one Communication",
      alt: "One-to-one Communication",
    },
    {
      src: "/navbar/handshake-1.png",
      label: "Engagement Models",
      alt: "Engagement Models",
    },
  ];
  const awards = [
    { src: "/navbar/appfutura.png", alt: "AppFutura" },
    { src: "/navbar/businessofapps.png", alt: "Business of Apps" },
    { src: "/navbar/clutch.png", alt: "Clutch" },
    { src: "/navbar/softwareworld.png", alt: "Software World" },
    { src: "/navbar/GoodFirms.png", alt: "GoodFirms" },
    { src: "/navbar/Upwork.png", alt: "Upwork" },
  ];
  const stats = [
    {
      icon: "/navbar/handshake.svg",
      value: "750+",
      label: "Completed Projects",
    },
    { icon: "/navbar/medal.svg", value: "20+", label: "Professionals" },
    { icon: "/navbar/star.svg", value: "12+", label: "Years of Experience" },
  ];

  const baseNavItems = (navStructure.mainNav || []).map((link) => {
    const href = link.slug === "home" ? "/" : `/${link.slug}`;
    return { href, label: link.title };
  });

  const navItems = [
    baseNavItems.find((item) => item?.label === "Home"),
    {
      href: ourServiesLink ? `/${ourServiesLink.slug}` : "/our-services",
      label: "Our Services",
    },
    {
      href: portfolioLink ? `/${portfolioLink.slug}` : "/our-portfolio",
      label: "Our Portfolio",
    },
    { href: aboutLink ? `/${aboutLink.slug}` : "/about-us", label: "About Us" },
    { href: hireLink ? `/${hireLink.slug}` : "/hire", label: "Hire Us" },
    // baseNavItems.find((item) => item?.label === "Training"),
    // baseNavItems.find((item) => item?.label === "Blog"),
    // baseNavItems.find((item) => item?.label === "Faqs"),
  ].filter(Boolean) as { href: string; label: string }[];

  useEffect(() => {
    setServicesOpen(false);
    setAboutOpen(false);
    setHireUsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node) &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      )
        setServicesOpen(false);
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node) &&
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      )
        setAboutOpen(false);
      if (
        hireUsDropdownRef.current &&
        !hireUsDropdownRef.current.contains(event.target as Node) &&
        hireUsRef.current &&
        !hireUsRef.current.contains(event.target as Node)
      )
        setHireUsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    // <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
    <nav className="w-full bg-white shadow-sm sticky top-0 z-[9999]">
      <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Inspire Techno Solution"
            width={200}
            height={50}
            priority
          />
        </Link>

        {/* --- Desktop Menu --- */}
        <ul className="hidden xl:flex items-center gap-8 text-[18px] font-medium text-gray-900">
          {navItems.map((item) => {
            if (item.label === "Our Services") {
              const allServiceHrefs = servicesData.flatMap((g) =>
                g.services.map((s) => s.href),
              );
              const active =
                pathname === "/our-services" ||
                allServiceHrefs.includes(pathname) ||
                servicesOpen;
              return (
                <li
                  key={item.href}
                  ref={servicesRef}
                  className={`relative group cursor-pointer ${
                    active ? "text-[#D68029]" : ""
                  } hover:text-[#D68029]`}
                  onMouseEnter={() => {
                    setServicesOpen(true);
                    setAboutOpen(false);
                    setHireUsOpen(false);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (!servicesDropdownRef.current?.matches(":hover"))
                        setServicesOpen(false);
                    }, 100);
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center transition-colors"
                    onClick={() => {
                      setServicesOpen(false);
                      setAboutOpen(false);
                      setHireUsOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    <RiArrowDropDownLine className="text-2xl leading-none" />
                  </Link>
                  {servicesOpen && (
                    <div
                      className="fixed top-20 left-1/2 transform -translate-x-1/2 w-screen max-w-full bg-white shadow-xl border border-gray-200 rounded-lg z-10 px-0 py-6 pb-0 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar"
                      ref={servicesDropdownRef}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {/* ADD gap-y-10 to this div to create space between rows */}
                      <div className="grid grid-cols-2 relative md:grid-cols-5 gap-y-10 max-w-full mx-auto text-sm font-medium">
                        {servicesData.map((serviceCategory, index) => (
                          <div
                            key={index}
                            className="px-8 border-r relative about_menu_mails border-[#757575] last:border-r-0 flex flex-col"
                          >
                            <h4 className="font-bold flex relative items-center gap-6 text-black mb-4 text-lg">
                              {serviceCategory.icon ? (
                                <Image
                                  src={serviceCategory.icon}
                                  alt={serviceCategory.title}
                                  width={25}
                                  height={25}
                                />
                              ) : null}
                              {serviceCategory.title}
                            </h4>
                            <ul className="space-y-2 relative w-full text-base pt-2 text-gray-500 flex-1">
                              {serviceCategory.services.map(
                                (service, serviceIndex) => (
                                  <li
                                    key={serviceIndex}
                                    className="flex relative items-center border-b border-dashed gap-2 pl-4 w-full pb-1"
                                    style={{ borderColor: "#D68029" }}
                                  >
                                    <Link
                                      href={service.href}
                                      className="p-1 relative px-3.75 hover:text-[#D68029] transition-colors"
                                      onClick={() => setServicesOpen(false)}
                                    >
                                      {service.label}
                                    </Link>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 grid grid-cols-1 md:grid-cols-[60%_40%] border-t border-gray-200 pb-0">
                        <div className="bg-white p-6 border-r border-gray-200 flex flex-col gap-6">
                          <h4 className="text-lg font-bold text-black">
                            Awards & Recognition
                          </h4>
                          <div className="flex gap-x-15 items-center justify-center flex-wrap">
                            {awards.map((award, index) => (
                              <Image
                                key={index}
                                src={award.src}
                                alt={award.alt}
                                width={100}
                                height={40}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-950 text-white p-10 flex items-center">
                          <div className="grid grid-cols-3 gap-6 w-full text-center">
                            {stats.map((stat, index) => (
                              <div
                                key={index}
                                className="flex flex-col items-center"
                              >
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white mb-4">
                                  <Image
                                    src={stat.icon}
                                    alt={stat.label}
                                    width={30}
                                    height={30}
                                    className="object-contain"
                                  />
                                </div>
                                <p className="text-2xl font-bold text--[#D68029]">
                                  {stat.value}
                                </p>
                                <p className="text-sm mt-1">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            }
            if (item.label === "About Us") {
              const active =
                pathname.startsWith(item.href) ||
                (careerLink && pathname.startsWith(`/${careerLink.slug}`)) ||
                aboutOpen;
              return (
                <li
                  key={item.href}
                  ref={aboutRef}
                  className={`relative group cursor-pointer ${
                    active ? "text-[#D68029]" : ""
                  } hover:text-[#D68029]`}
                  onMouseEnter={() => {
                    setAboutOpen(true);
                    setServicesOpen(false);
                    setHireUsOpen(false);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (!aboutDropdownRef.current?.matches(":hover"))
                        setAboutOpen(false);
                    }, 100);
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center transition-colors"
                    onClick={() => {
                      setServicesOpen(false);
                      setAboutOpen(false);
                      setHireUsOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    <RiArrowDropDownLine className="text-2xl leading-none" />
                  </Link>
                  {aboutOpen && (
                    <div
                      ref={aboutDropdownRef}
                      className="fixed top-20 left-1/2 transform -translate-x-1/2 w-screen max-w-full bg-white shadow-xl border border-gray-200 rounded-lg z-10 py-12.5 px-[7%] border-b-4 border-b-[#12203d] mx-auto border-t-px border-t-black max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar"
                      onMouseEnter={() => setAboutOpen(true)}
                      onMouseLeave={() => setAboutOpen(false)}
                    >
                      <div className="flex items-start gap-10">
                        <div className="flex flex-col w-full max-w-[25%] content-start gap-4 pt-2">
                          <Link
                            href={aboutData[0].href}
                            onClick={() => setAboutOpen(false)}
                            className="flex mb-5 items-center gap-3 text-gray-800 hover:text-[#D68029] transition-colors"
                          >
                            <div className="p-2.75 bg-[#f4f4f4] rounded-full justify-center items-center mr-3.75 ">
                              <Image
                                src="/navbar/About-us.svg"
                                width={32}
                                height={32}
                                alt="About us icon"
                              />
                            </div>
                            <span className="font-medium text-lg">
                              {aboutData[0].label}
                            </span>
                          </Link>
                          <Link
                            href={aboutData[1].href}
                            onClick={() => setAboutOpen(false)}
                            className="flex items-center gap-3 text-gray-800 hover:tex-[#D68029] transition-colors"
                          >
                            <div className="p-2.75 bg-[#f4f4f4] rounded-full justify-center items-center mr-3.75 ">
                              <Image
                                src="/navbar/career.svg"
                                width={32}
                                height={32}
                                alt="Career icon"
                              />
                            </div>
                            <span className="font-medium text-lg">
                              {aboutData[1].label}
                            </span>
                          </Link>
                        </div>
                        <div className="flex flex-col w-full max-w-[49.64%] gap-2">
                          <div className=" text-xl/[28px] text-[#484848] font-normal mb-7.5 pr-[4%] w-full max-w-[90%] ">
                            Create disruptive business innovations through
                            high-end creativity and world-class alliances.
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="relative w-full max-w-[50%] about_menu_mails border-r border-r-[#484848] border-dashed px-2.5 flex flex-col ">
                              <div className=" relative mb-5">
                                <h4 className="font-semibold text-[24px] text-[#d68229] mb-[3%]">
                                  or mail us at
                                </h4>
                              </div>
                              <ul className=" relative text-gray-600">
                                <li className="relative flex items-center gap-2 pl-3 pb-2.5 mb-4 border-b border-b-[#d68029] border-dashed hover:text-[#D68029] transition-colors">
                                  <a
                                    href={aboutData[2].href}
                                    className="break-all px-3.75 text-center font-medium text-[18px] "
                                  >
                                    {aboutData[2].label}
                                  </a>
                                </li>
                                <li className="relative flex items-center gap-2 pl-3 pb-2.5 mb-4 border-b border-b-[#d68029] border-dashed hover:text-[#D68029] transition-colors">
                                  <a
                                    href={aboutData[3].href}
                                    className="break-all px-3.75 text-center font-medium text-[18px] "
                                  >
                                    {aboutData[3].label}
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="relative w-full max-w-[50%] about_menu_mails border-l border-l-[#484848] border-dashed px-2.5 flex flex-col ">
                              <div className="relative mb-5 ">
                                <h4 className="font-semibold text-[24px] text-[#d68029] mb-[3%]">
                                  or call us at
                                </h4>
                              </div>
                              <ul className="relative text-gray-600">
                                <li className=" relative flex items-center gap-2 pl-3 mb-4 pb-2.5 border-b border-b-[#d68029] border-dashed hover:text-[#D68029] transition-colors">
                                  <a
                                    href={aboutData[4].href}
                                    className="break-all px-3.75 text-center font-medium text-[18px] "
                                  >
                                    {aboutData[4].label}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="text-white p-6 rounded-lg flex flex-col content-start items-center text-center w-full max-w-[25%] -my-2">
                          <div className="flex flex-wrap relative justify-center w-full py-5 px-10 rounded-[10px] bg-[url('/navbar/view-opening-bg-image.svg')] text-center bg-cover bg-no-repeat ">
                            <div className="bg-white relative p-3 rounded-full mb-3">
                              <Image
                                src="/navbar/View-Opening-Icon.svg"
                                width={30}
                                height={30}
                                alt="Vacancies Icon"
                              />
                            </div>
                            <div className="w-full relative text-center justify-center flex flex-col">
                              <p className="text-white font-semibold mb-5">
                                Vacancies for skilled developers and designers
                                are available at all times!
                              </p>
                              <p className="p-2.5 rounded-lg w-[80%] m-auto bg-white text-black font-semibold transition-colors hover:text-[#D68029] ">
                                <Link
                                  href={aboutData[1].href}
                                  onClick={() => setAboutOpen(false)}
                                  className="px-3.75 pb-3.75 text-center"
                                >
                                  View Opening
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            }
            if (item.label === "Hire Us") {
              const hireActivePrefix = hireLink ? `/${hireLink.slug}` : "/hire";
              const active =
                pathname.startsWith(hireActivePrefix) || hireUsOpen;
              return (
                <li
                  key={item.href}
                  ref={hireUsRef}
                  className={`relative group cursor-pointer ${
                    active ? "text-[#D68029]" : ""
                  } hover:text-[#D68029]`}
                  onMouseEnter={() => {
                    setHireUsOpen(true);
                    setServicesOpen(false);
                    setAboutOpen(false);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (!hireUsDropdownRef.current?.matches(":hover"))
                        setHireUsOpen(false);
                    }, 100);
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center transition-colors"
                    onClick={() => {
                      setServicesOpen(false);
                      setAboutOpen(false);
                      setHireUsOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    <RiArrowDropDownLine className="text-2xl leading-none" />
                  </Link>
                  {hireUsOpen && (
                    <div
                      ref={hireUsDropdownRef}
                      className="fixed top-20 left-1/2 transform -translate-x-1/2 w-screen max-w-full bg-white shadow-xl border border-gray-200 rounded-lg z-10 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar"
                      onMouseEnter={() => setHireUsOpen(true)}
                      onMouseLeave={() => setHireUsOpen(false)}
                    >
                      <div className="flex flex-row items-stretch mx-auto relative gap-x-7.5 px-10 py-12.5 w-full">
                        {/* Left Side: Categories Grid (Max 4 columns per row) */}
                        <div className="grid grid-cols-3 gap-x-7.5 gap-y-10 flex-1">
                          {hireData.map((category, index) => (
                            <div
                              key={index}
                              className="flex flex-col relative w-full border-r border-r-[#dee2e6] pr-4"
                            >
                              <div className="flex relative w-full flex-wrap ">
                                <div className="mb-2.5 pr-5 relative ">
                                  <div className="flex flex-row text-left items-center ">
                                    {category.icon ? (
                                      <figure className=" mr-3.75 p-3.75 bg-[#f8f8f8] justify-center flex shrink-0 w-16 h-16 rounded-full">
                                        <Image
                                          src={category.icon}
                                          alt={category.title}
                                          width={45}
                                          height={45}
                                        />
                                      </figure>
                                    ) : null}
                                    <div className="w-full">
                                      <h3 className="text-[20px] text-black font-semibold my-2.5 wrap-break-word">
                                        {category.title}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full about_menu_mails flex justify-center relative pr-7.5 px-1.5 ">
                                  <ul className=" relative w-full text-gray-600">
                                    {category.services.map(
                                      (service, serviceIndex) => (
                                        <li
                                          key={serviceIndex}
                                          className=" pl-5 mt-2.5 pb-1.75 items-center relative border-b border-dashed border-b-[#d68029]"
                                        >
                                          <Link
                                            href={service.href}
                                            onClick={() => setHireUsOpen(false)}
                                            className="flex items-center text-start text-[18px] font-medium text-[#717375] px-3.75 hover:text-[#D68029] transition-colors"
                                          >
                                            {service.label}
                                          </Link>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Right Side: Fixed Illustration Column */}
                        <div className="flex items-center w-full max-w-[22%] justify-center pl-4">
                          <Image
                            src="/navbar/hire-us.svg"
                            alt="Hire Developers Illustration"
                            width={780}
                            height={780}
                            className="object-contain inline-block w-full max-w-full h-auto align-middle "
                          />
                        </div>
                      </div>
                      <div className="bg-[#f8f8f8] p-2.5 relative w-full border-b-4 border-b-[#d68029] ">
                        <div className="w-full mx-auto flex relative flex-wrap items-center px-8 py-6">
                          <div className="flex items-center relative w-[70.01%] flex-row ">
                            {hireBottomBar.map((bottombar, index) => (
                              <div
                                key={index}
                                className="w-full max-w-[25%] flex relative "
                              >
                                <div className="w-full flex flex-wrap relative text-center ">
                                  <figure className="flex items-center justify-center h-18.5 w-18.5 bg-white rounded-[50%] m-auto ">
                                    <Image
                                      src={bottombar.src}
                                      alt={bottombar.alt}
                                      width={48}
                                      height={48}
                                      className=""
                                    />
                                  </figure>
                                  <div className="w-full">
                                    <h3 className="text-[18px]/[24px] font-medium mt-2.5 text-[#484848cc] wrap-break-word ">
                                      {bottombar.label}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="w-[29.61%] bg-[#12203d] px-11 py-4 rounded-[30px] flex flex-col justify-center">
                            <div className="mb-5 text-white text-[22px]">
                              Empower{" "}
                              <span className="font-semibold text-[#d68029]">
                                Your Business
                              </span>{" "}
                              with Dedicated{" "}
                              <span className="font-semibold text-[#d68029]">
                                Developers
                              </span>
                            </div>
                            <div className="w-full">
                              <Link
                                href={hireLink ? `/${hireLink.slug}` : "/hire"}
                                className="inline-block cursor-pointer rounded-[10px] bg-[#d68029] px-7.5 py-3.75 text-center text-[18px] font-medium text-white transition-colors hover:bg-white hover:text-[#d68029] duration-300 "
                              >
                                Hire Us
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            }
            return (
              <li
                key={item.href}
                className={`cursor-pointer ${
                  isActive(item.href) ? "text-[#D68029]" : ""
                } hover:text-[#D68029]`}
              >
                <Link href={item.href} className="transition-colors block">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="relative hidden xl:inline-flex items-center justify-center overflow-hidden gap-2 rounded-md bg-[#0d1b2a] px-5 py-3 text-sm font-semibold text-white transition-colors group">
          <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#D68029] rounded group-hover:w-56 group-hover:h-56"></span>
          <Link
            href={ContactLink ? `/${ContactLink.slug}` : "/contact"}
            className="relative tracking-tight flex items-center justify-center gap-2 rounded-[10px] text-sm font-semibold text-white transition-colors "
          >
            <h1 className="flex flex-row gap-3 justify-center">
              {/* GET A QUOTE */}
              GET IN TOUCH
            </h1>
            <Image
              src="/navbar/btn_icon.png"
              alt="Get a Quote Arrow"
              width={20}
              height={20}
            />
          </Link>
        </div>

        <div
          className="flex flex-col gap-1.5 cursor-pointer xl:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <LuMenu
            size={40}
            className=" leading-10 "
            fontWeight={600}
            color="#d68029"
          />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-opacity-50 z-50 xl:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 xl:hidden overflow-y-auto"
              style={{
                zIndex: 3000,
              }}
            >
              <div>
                <div className="flex justify-end w-full items-center mb-3 mt-2">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 text-[#d68029] rounded-full mr-2 hover:bg-gray-100"
                  >
                    <FiX size={30} />
                  </button>
                </div>
                <ul className="flex flex-col ">
                  {navItems.map((item) => {
                    if (item.label === "Our Services") {
                      return (
                        <li key={item.href} className="relative">
                          <Link
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex justify-between items-center py-3 px-4 cursor-pointer text-gray-800 border-b border-b-[#d68029] border-dashed hover:text-[#D68029] font-medium "
                          >
                            <span>{item.label}</span>
                            <motion.span
                              animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setMobileServicesOpen(!mobileServicesOpen);
                              }}
                            >
                              <FiChevronDown />
                            </motion.span>
                          </Link>
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className=" overflow-hidden rounded-lg "
                              >
                                {servicesData.map((category, index) => (
                                  <div key={index} className="">
                                    <div
                                      className="flex justify-between items-center py-3 px-3 cursor-pointer border-b border-dashed border-b-[#d68029] "
                                      onClick={() =>
                                        setActiveMobileCategory(
                                          activeMobileCategory === index
                                            ? null
                                            : index,
                                        )
                                      }
                                    >
                                      <div className="flex items-center gap-2">
                                        {category.icon ? (
                                          <Image
                                            src={category.icon}
                                            alt={category.title}
                                            width={18}
                                            height={18}
                                            className="text-[#D68029]"
                                          />
                                        ) : null}
                                        <span className="font-medium hover:text-[#D68029] ">
                                          {category.title}
                                        </span>
                                      </div>
                                      <motion.span
                                        animate={{
                                          rotate:
                                            activeMobileCategory === index
                                              ? 180
                                              : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <FiChevronDown size={16} />
                                      </motion.span>
                                    </div>
                                    {activeMobileCategory === index && (
                                      <motion.ul
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className=" list-none"
                                      >
                                        {category.services.map(
                                          (service, serviceIndex) => (
                                            <li key={serviceIndex} className="">
                                              <Link
                                                href={service.href}
                                                onClick={() =>
                                                  setMenuOpen(false)
                                                }
                                                className=" hover:text-[#D68029] flex items-center gap-2 py-3 px-3 cursor-pointer border-b border-dashed border-b-[#d68029] "
                                              >
                                                {service.label}
                                              </Link>
                                            </li>
                                          ),
                                        )}
                                      </motion.ul>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    if (item.label === "Hire Us") {
                      return (
                        <li key={item.href} className="relative">
                          <Link
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex justify-between items-center py-3 px-4 cursor-pointer text-gray-800 border-b border-b-[#d68029] border-dashed hover:text-[#D68029] font-medium "
                          >
                            <span>{item.label}</span>
                            <motion.span
                              animate={{ rotate: mobileHireUsOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setMobileHireUsOpen(!mobileHireUsOpen);
                              }}
                            >
                              <FiChevronDown />
                            </motion.span>
                          </Link>
                          <AnimatePresence>
                            {mobileHireUsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className=" overflow-hidden rounded-lg "
                              >
                                {hireData.map((category, index) => (
                                  <div key={index} className="">
                                    <div
                                      className="flex justify-between items-center py-3 px-3 cursor-pointer border-b border-dashed border-b-[#d68029] "
                                      onClick={() =>
                                        setActiveMobileHireCategory(
                                          activeMobileHireCategory === index
                                            ? null
                                            : index,
                                        )
                                      }
                                    >
                                      <div className="flex items-center gap-2">
                                        {category.icon ? (
                                          <Image
                                            src={category.icon}
                                            alt={category.title}
                                            width={18}
                                            height={18}
                                            className="text-[#D68029]"
                                          />
                                        ) : null}
                                        <span className="font-medium hover:text-[#D68029] ">
                                          {category.title}
                                        </span>
                                      </div>
                                      <motion.span
                                        animate={{
                                          rotate:
                                            activeMobileHireCategory === index
                                              ? 180
                                              : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <FiChevronDown size={16} />
                                      </motion.span>
                                    </div>
                                    {activeMobileHireCategory === index && (
                                      <motion.ul
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className=" list-none"
                                      >
                                        {category.services.map(
                                          (service, serviceIndex) => (
                                            <li key={serviceIndex} className="">
                                              <Link
                                                href={service.href}
                                                onClick={() =>
                                                  setMenuOpen(false)
                                                }
                                                className=" hover:text-[#D68029] flex items-center gap-2 py-3 px-3 cursor-pointer border-b border-dashed border-b-[#d68029] "
                                              >
                                                {service.label}
                                              </Link>
                                            </li>
                                          ),
                                        )}
                                      </motion.ul>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    if (item.label === "About Us") {
                      return (
                        <li key={item.href} className="relative">
                          <Link
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex justify-between items-center py-3 px-4 cursor-pointer text-gray-800 border-b border-b-[#d68029] border-dashed hover:text-[#D68029] font-medium"
                          >
                            <span>{item.label}</span>
                            <motion.span
                              animate={{ rotate: mobileAboutOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setMobileAboutOpen(!mobileAboutOpen);
                              }}
                            >
                              <FiChevronDown />
                            </motion.span>
                          </Link>
                          <AnimatePresence>
                            {mobileAboutOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden bg-gray-50/50"
                              >
                                <ul className="">
                                  {aboutData.map((aboutItem, index) => (
                                    <li key={index}>
                                      <Link
                                        href={aboutItem.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="flex py-3 px-4 cursor-pointer border-b border-b-[#d68029] border-dashed font-medium text-gray-700 hover:text-[#D68029]"
                                      >
                                        {aboutItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex py-3 px-4 cursor-pointer border-b border-b-[#d68029] border-dashed font-medium ${
                            isActive(item.href)
                              ? "text-[#D68029]"
                              : "text-gray-800 hover:text-[#D68029]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mt-6 px-4">
                    <Link
                      href={ContactLink ? `/${ContactLink.slug}` : "/contact"}
                      onClick={() => setMenuOpen(false)}
                      className="relative inline-flex items-center justify-center overflow-hidden gap-2 rounded-md bg-[#0d1b2a] px-5 py-3 text-sm font-semibold text-white transition-colors group"
                    >
                      <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#D68029] rounded group-hover:w-56 group-hover:h-56"></span>
                      <span className="relative tracking-tight flex items-center justify-center gap-2 rounded-[10px] text-sm font-semibold text-white transition-colors">
                        <span className="flex flex-row gap-3 justify-center">
                          GET A QUOTE
                        </span>
                        <Image
                          src="/navbar/btn_icon.png"
                          alt="Get a Quote Arrow"
                          width={20}
                          height={20}
                        />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
