"use client";

import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ContactPageForm from "./ContactPageForm";
import ParallaxShape from "@/components/home/ParallaxShape";

export default function ContactClient() {
  return (
    <section className="bg-white">

      <div className="bg-[#0d1b2a] py-16 max-[767px]:py-8 relative w-full z-10">
        <div className=" text-left   max-w-[90%] lg:max-w-[80%] mx-auto">
          <p className="text-white opacity-60  text-sm leading-[1.25] font-semibold uppercase tracking-[0.2em] max-[767px]:text-[12px] max-[767px]:tracking-[0.15em]">
            WE TURN BOLD IDEAS INTO SUCCESSFUL PRODUCTS
          </p>
          <h1 className="font-bricolage text-white font-medium text-[76px] leading-[1.1] mt-4 max-[767px]:text-[40px] max-[767px]:leading-[1.15] max-[767px]:mt-3">Got an idea?</h1>
          <h2 className="font-bricolage text-white font-medium text-[76px] leading-[1.1] max-[767px]:text-[40px] max-[767px]:leading-[1.15] max-[767px]:mt-1">Let's talk!</h2>
        </div>
      </div>
      <ContactPageForm />
      <div className="w-full text-center relative z-20 bg-[#0d1b2a]  lg:pb-0 py-15 md:py-20   ">
        <div className="w-full relative max-w-[90%] lg:max-w-[80%] mx-auto">
        <div className="max-w-3xl space-y-3 mx-auto ">
          <p className="text-sm uppercase tracking-[0.2em] text-white opacity-70">VISIT OUR OFFICE OR DROP A LINE</p>
          <h3 className="text-3xl md:text-4xl font-bricolage font-medium text-white">Based in Surat,
            <br className="max-lg:hidden"/> building products for the world.  
          </h3>
          <p className="text-sm sm:text-base text-white opacity-70">
            Whether you prefer email, a quick call, or an in‑person meeting, our team is ready to explore your product idea and help you plan the next steps.
          </p>
        </div>
        </div>
      </div>

      <ParallaxShape type="bottom" bg="bg-[#0d1b2a]"  />




      {/* Full-Width Map */}
      <div className="lg:mt-10 relative lg:min-h-[100vh] ">
        <div className="lg:fixed max-md:top-[50px] top-0 w-full z-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043.5734208756965!2d72.88582798399636!3d21.236917844703505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fda718c65f9%3A0xb1fe219539f59c50!2sInspire%20Techno%20Solution%20-%20Web%20%26%20App%20Development%20Company%20in%20Surat!5e0!3m2!1sen!2sin!4v1758687073167!5m2!1sen!2sin"
            width="100%"
            height="1000vh"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    
      <Testimonials />

    </section>
  );
}



