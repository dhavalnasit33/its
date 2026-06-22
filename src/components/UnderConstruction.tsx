// "use client";

// export default function UnderConstruction() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
//       <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
//         🚧 Under Construction
//       </h1>

//       <p className="mt-4 text-lg text-gray-600 max-w-xl">
//         We're currently working on improving our website.
//         Please check back soon.
//       </p>

//       <a
//         href="https://api.whatsapp.com/send?phone=919327220484"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mt-8 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
//       >
//         Contact Us on WhatsApp
//       </a>
//     </div>
//   );
// }


"use client";

import Row from "./Row";
import Section from "./Section";

export default function UnderConstructionPage() {
  return (
    <Section className="xl:h-screen relative flex items-center justify-center  bg-[#0B1622] text-center ">

      <Row className="md:!max-w-xl">
        {/* ICON */}
        <div className="text-8xl mb-6 animate-bounce">
          🚧
        </div>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          We’re Under Construction
        </h1>

        {/* DESCRIPTION */}
        <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
          Our website is currently undergoing improvements to serve you better.
          We’ll be back online very soon.
        </p>

        {/* PROGRESS BAR */}
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-2">
          <div className="h-full w-[70%] bg-[#d68029] animate-pulse" />
        </div>

        <p className="text-sm text-slate-400 mb-6">
          70% completed
        </p>

        <div className=" inline-flex mt-4 border border-gray-300 hover:bg-[#ffffff] hover:border-transparent rounded-md">
           <a href="mailto:hr@inspiretechnosolution.com" className="text-white hover:text-[#0B1622] p-4 ">
          hr@inspiretechnosolution.com  
        </a>
        </div>
      </Row>
    </Section>
  );
}