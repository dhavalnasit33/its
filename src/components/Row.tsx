import { ReactNode } from "react";

type RowProps = {
  children: ReactNode;
  className?: string;
};

const Row = ({ children, className = "" }: RowProps) => {
  return (
    <div
      // className={`w-full max-w-[90%] lg:max-w-[73.81%] mx-auto relative ${className}`}
     className={`w-[90%] max-w-[1400px] mx-auto relative ${className}`}
    >
      {children}
    </div>
  );
};

export default Row;