// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import ArrowIcon from "../../../public/icon/arrow";

// interface AiServicesCardProps {
//   title: string;
//   heading: string;
//   description: string;
//   glowColor: string;
//   //   gradient: string;
// }

// const getSolidColor = (rgba: string) => {
//   return rgba.replace(/rgba?\(([^)]+)\)/, (_, values) => {
//     const [r, g, b] = values.split(",");
//     return `rgb(${r.trim()}, ${g.trim()}, ${b.trim()})`;
//   });
// };

// export default function AiServices({ title, heading, description, glowColor }: AiServicesCardProps) {

//   const [isHover, setIsHover] = React.useState(false);


//   const textColor = glowColor ? getSolidColor(glowColor) : "#10b981";
//   const softColor = glowColor ? getSolidColor(glowColor) : "rgba(16,185,129,0.5)";

//   return (
//     <motion.div
//       className="group relative overflow-hidden rounded-xl h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 border border-white/10 shadow-lg 
//                  hover:border-emerald-500/40 transition-all duration-500"
//       onMouseEnter={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//       style={{
//         borderColor: isHover ? textColor : "rgba(255,255,255,0.1)"
//       }}
//     >
//       <a href="#" className="relative z-10 flex flex-col h-full">
//         {/* <span
//         className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl bg-gradient-to-r ${gradient}`}
//         />         */}

//         <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300 mb-2" style={{ color: textColor }}>
//           {title}
//         </p>

//         <h4 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-emerald-200 transition-colors "
//           style={{
//             color: isHover ? textColor : "#e2e8f0",
//           }}>
//           {heading}
//         </h4>
//         <p className="text-xs sm:text-sm text-slate-200 leading-relaxed group-hover:opacity-50 transition-opacity duration-500 "
//           dangerouslySetInnerHTML={{ __html: description || "", }}/>
//           {/* {description}</p> */}
//         <div className="mt-auto pt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-emerald-300 underline underline-offset-4 decoration-slate-500 "
//           style={{
//             color: isHover ? textColor : "#e2e8f0",
//             textDecorationColor: isHover ? textColor : "#64748b"
//           }}
//         >
//           View details
//           <ArrowIcon color={isHover ? textColor : "#e2e8f0"} />
//         </div>
//       </a>
//     </motion.div>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ArrowIcon from "../../../public/icon/arrow";

interface AiServicesCardProps {
  title: string;
  heading: string;
  description: string;
  glowColor: string;
  //   gradient: string;
}

const getSolidColor = (rgba: string) => {
  return rgba.replace(/rgba?\(([^)]+)\)/, (_, values) => {
    const [r, g, b] = values.split(",");
    return `rgb(${r.trim()}, ${g.trim()}, ${b.trim()})`;
  });
};

export default function AiServices({ title, heading, description, glowColor }: AiServicesCardProps) {

  const [isHover, setIsHover] = React.useState(false);


  const textColor = glowColor ? getSolidColor(glowColor) : "#10b981";
  const softColor = glowColor ? getSolidColor(glowColor) : "rgba(16,185,129,0.5)";

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl h-full bg-gradient-to-br  border border-white/10 shadow-lg 
                 hover:border-emerald-500/40 transition-all duration-500  bg-gray-100
                  rounded-[30px]
                  p-8
                  h-[430px]
                  flex
                  flex-col"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        borderColor: isHover ? textColor : "rgba(255,255,255,0.1)"
      }}
    >
      <a href="#" className="relative z-10 flex flex-col h-full">
        {/* <span
        className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl bg-gradient-to-r ${gradient}`}
        />         */}

        <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300 mb-2" style={{ color: textColor }}>
          {title}
        </p>

        <h4 className="text-[24px] sm:text-[40px] font-bold mb-2  group-hover:text-emerald-200 transition-colors leading-tight "
          style={{
            color: isHover ? textColor : "#000000",
          }}>
          {heading}
        </h4>
        <p className="fonts_16 text-gray-600 mb-6 group-hover:opacity-50 transition-opacity duration-500 "
          dangerouslySetInnerHTML={{ __html: description || "", }}/>
          {/* {description}</p> */}
        <div className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-emerald-300 underline underline-offset-4 decoration-slate-500 "
          style={{
            color: isHover ? textColor : "#000000",
            textDecorationColor: isHover ? textColor : "#64748b"
          }}
        >
          View details
          <ArrowIcon color={isHover ? textColor : "#000000"} />
        </div>
      </a>
    </motion.div>
  );
}
