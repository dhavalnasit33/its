"use client";

export default function ParallaxShape({
  type = "top",
  bg = "bg-white",
  className = "",
}) {
  return (
    <section className={`relative z-10 ${className}`}>
      <span
        className={`
          ${type === "top" ? "clipped-top -mb-1" : "clipped-bottom -mt-1"}
          ${bg} h-[150px] w-full hidden lg:block 
          
        `} // rounded-tl-[100px] rounded-tr-[100px]
      />
    </section>
  );
}

// "use client";

// export default function ParallaxShape ({ type = "top", className = "" })  {
//   return (
//     <section className={`bg-[rgba(255,255,255,0.08)] relative ${type === "top" ? "-mb-1" : "z-10"} ${className}`}>
//       <span
//         className={`
//           ${type === "top" ? "clipped-top" : "clipped-bottom"}
//           bg-white h-[150px] w-full hidden lg:block rounded-tl-[100px] rounded-tr-[100px]
//         `}
//       />
//     </section>
//   );
// };
