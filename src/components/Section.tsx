"use client";

import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";

interface CommonSectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  spacing?: string;
  style?: CSSProperties;
  id?: string;

}

// export default function Section({
//   children,
//   className = "",
//   spacing = "",
//   style,
//   id,
//    ...props
// }: CommonSectionProps) {
//   return (
//     <section
//         id={id}
//       className={`w-full relative z-10 py-16 lg:py-18 xl:py-22 ${spacing} ${className}`}
//        style={style}
//     >
//       {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative"> */}
//         {children}
//       {/* </div> */}
//     </section>
//   );
// }


const Section = forwardRef<HTMLElement, CommonSectionProps>(
  (
    {
      children,
      className = "",
      spacing = "",
      style,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <section
        id={id}
        ref={ref}
        className={`w-full relative z-10 py-16 lg:py-18 xl:py-22 ${spacing} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
