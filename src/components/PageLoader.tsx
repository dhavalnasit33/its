"use client";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/80">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#d68029]"></div>
    </div>
  );
};

export default Loader;
