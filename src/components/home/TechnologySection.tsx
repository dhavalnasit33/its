"use client";

import { useState } from "react";
import Image from "next/image";
import Motion from "@/components/motionbar";
import TechBackground from "./TechBackground";
import Row from "../Row";

const technologies: Record<string, { image: string; label: string }[]> = {
  "Mobile": [
    { image: "/technologies/ios.svg", label: "iOS" },
    { image: "/technologies/swift.svg", label: "Swift" },
    { image: "/technologies/react-native.svg", label: "React Native" },
    { image: "/technologies/android.svg", label: "Android" },
    { image: "/technologies/ionic.svg", label: "Ionic" },
    { image: "/technologies/kotlin.svg", label: "Kotlin" },
  ],

  "Back-End": [
    { image: "/technologies/java.svg", label: "Java" },
    { image: "/technologies/nodejs.svg", label: "Node.js" },
    { image: "/technologies/dotnet.svg", label: ".NET Core" },
    { image: "/technologies/php.svg", label: "PHP" },
    { image: "/technologies/cpp.svg", label: "C++" },
    { image: "/technologies/laravel.svg", label: "Laravel" },
  ],

  "Front-End": [
    { image: "/technologies/html.svg", label: "HTML 5" },
    { image: "/technologies/javascript.svg", label: "JavaScript" },
    { image: "/technologies/angular.svg", label: "Angular" },
    { image: "/technologies/reactjs.svg", label: "React.js" },
    { image: "/technologies/vue.svg", label: "Vue.js" },
    { image: "/technologies/css.svg", label: "CSS 3" },
  ],

  "DevOps": [
    { image: "/technologies/aws.svg", label: "AWS" },
    { image: "/technologies/cloudflare.svg", label: "Cloudflare" },
    { image: "/technologies/docker.svg", label: "Docker" },
    { image: "/technologies/kubernetes.svg", label: "Kubernetes" },
    { image: "/technologies/digitalocean.svg", label: "DigitalOcean" },
    { image: "/technologies/azure.svg", label: "Azure" },
  ],

  "Database": [
    { image: "/technologies/my-sql.svg", label: "MySQL" },
    { image: "/technologies/firebase.svg", label: "Firebase" },
    { image: "/technologies/ms-sql.svg", label: "Ms SQL" },
    { image: "/technologies/mongo-db.svg", label: "MongoDB" },
  ],
};

export default function TechnologyTabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof technologies>("Mobile");

  return (
    <section className="w-full relative lg:min-h-[100vh] ">
      <div className="lg:fixed lg:top-0 w-full py-16 md:py-22 lg:py-25 relative overflow-hidden z-0 lg:min-h-[100vh]">
        <TechBackground />
        {/* <div className="absolute inset-0 bg-[#0a1a33]/90"></div> */}
        <div className="w-full relative   ">
          {/* <div className="w-full relative max-w-[90%] lg:max-w-[80%]  mx-auto "> */}
          <Row >
            {/* px-4 sm:px-8 md:px-20 */}
            {/* Section Header */}
            <div className="text-center w-full mb-12 lg:pt-20">
              <h2 className="text-center w-full  text-black common-h2 ">
                <span className="text-[#D68029]">Technologies</span>{" "}
                <span className="text-white">That We Work With</span>
              </h2>
              <Motion />
              <p className="text-slate-200 text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto">
                Here you can see some of the most popular technologies including frameworks,
                libraries, and many more to create various applications.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex justify-center w-full gap-4 md:gap-6 mb-10 flex-wrap">
              {Object.keys(technologies).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as keyof typeof technologies)}
                  className={`px-6 py-2 cursor-pointer rounded-md font-medium text-[18px] transition-all duration-300 ${activeTab === tab
                    ? "bg-[#ff7f000f] text-[#D68029] border border-[#D68029] shadow-md"
                    : "bg-white/[0.07] text-slate-200  border border-white/20 hover:bg-[#ff7f000f] hover:text-[#D68029] hover:border-[#D68029]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Technology Grid with flex-wrap & center */}
            <div className="flex justify-center w-full flex-wrap gap-5 md:gap-7 pt-10">
              {technologies[activeTab].map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-5 bg-white/[0.07] rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 
                    max-[360px]:w-full w-35 sm:w-40 md:w-45 "
                >
                  <div className="w-15 h-15 flex items-center justify-center rounded-lg mb-3 relative">
                    <Image
                      src={tech.image}
                      alt={tech.label}
                      fill
                      sizes="60px"
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-base font-medium text-slate-200 ">{tech.label}</h4>
                </div>
              ))}
            </div>
            </Row>
          </div>
          
        {/* </div> */}
      </div>
    </section>
  );
}