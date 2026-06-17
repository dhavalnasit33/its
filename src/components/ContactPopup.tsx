// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function ContactPopup() {
//   // const [isOpen, setIsOpen] = useState(false);


//   // useEffect(() => {
//   //   const popupShown = localStorage.getItem("contactPopupShown");

//   //   if (!popupShown) {
//   //     const timer = setTimeout(() => {
//   //       setIsOpen(true);
//   //       localStorage.setItem("contactPopupShown", "true");
//   //     }, 2000);

//   //     return () => clearTimeout(timer);
//   //   }
//   // }, []);

//   // const closePopup = () => {
//   //   setIsOpen(false);
//   // };

//   // if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999]">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-xs"
//         // onClick={closePopup}
//       />

//       {/* Modal */}
//       <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
//         <div
//           className="
//             relative
//             bg-white
//             rounded-2xl
//             overflow-hidden
//             shadow-2xl
//             w-full
//             max-w-[1000px]
//             z-10
//           "
//         >
//           {/* Close Button */}
//           <button
//             // onClick={closePopup}
//             className="
//               absolute
//               top-4
//               right-4
//               z-20
//               w-10
//               h-10
//               rounded-full
//               bg-white
//               shadow-md
//               flex
//               font-bold
//               text-[#D68029]
//               items-center
//               justify-center
//               text-xl
//               hover:bg-gray-100
//             "
//           >
//             ✕
//           </button>

//           <div className="grid lg:grid-cols-[55%_45%]">
//             {/* LEFT SECTION */}
//             <div className="p-6 md:p-8 lg:p-10">
//               <h2 className="common-h2 mb-8">
//                 Let's Get Started
//               </h2>

//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     First Name *
//                   </label>

//                   <input
//                     type="text"
//                     placeholder="First name"
//                     className="
//                       w-full
//                       border
//                       border-gray-300
//                       rounded-lg
//                       px-4
//                       py-3
//                       outline-none
//                     "
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Last Name *
//                   </label>

//                   <input
//                     type="text"
//                     placeholder="Smith"
//                     className=" w-full  border  border-gray-300 rounded-lg px-4 py-3 outline-none "
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Email ID *
//                   </label>

//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className=" w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Contact No. *
//                   </label>

//                   <div className="flex border border-gray-300 rounded-lg overflow-hidden">


//                     <input
//                       type="text"
//                       placeholder="9876543210"
//                       className=" -1 px-4 py-3 outline-none "
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Message *
//                   </label>

//                   <textarea
//                     rows={4}
//                     placeholder="Message"
//                     className=" w-full  border border-gray-300 rounded-lg px-4 py-3 resize-none outline-none "
//                   />
//                 </div>
//                 <div className=" text-center">
//                   <div className="bg-[#D68029] relative inline-flex items-center justify-center w-full max-w-50 overflow-hidden text-white rounded-xl group ">
//                             <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56 uration-750 delay-300 ease-in-out"></span>
//                             <span className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-7.5 py-2.5 sm:px-8 sm:py-4 cursor-pointer font-semibold">
//                                 <span>
//                                     Submit
//                                 </span>
//                             </span>
//                         </div>
//                 </div>
//               </form>
        
         
//             </div>

//             {/* RIGHT SECTION */}
//             <div
//               className=" hidden bg-[#d68029] p-8 lg:flex flex-col items-center justify-center text-white "
//             >
//               <div className="text-center">
//                 <h2 className="common-h2-small">
//                   Hey, wait up!
//                   <br />
//                   Don't miss this! 
//                 </h2>

//                 <p className="mt-4 text-md">
//                   Grab your FREE 30-minute consultation and let us help
//                   you with the perfect tech solution.
//                 </p>
//               </div>

//               <div className="grid grid-cols-3 gap-6 mt-12">
//                 {[
//                   {
//                     name: "Upwork",
//                     img: "/navbar/Upwork.png",
//                   },
//                   {
//                     name: "Clutch",
//                     img: "/navbar/clutch.png",
//                   },
//                   {
//                     name: "GoodFirms",
//                     img: "/navbar/GoodFirms.png",
//                   },
//                   {
//                     name: "AppFutura",
//                     img: "/navbar/appfutura.png",
//                   },
//                   {
//                     name: "SoftwareWorld",
//                     img: "/navbar/softwareworld.png",
//                   },
//                   {
//                     name: "Businessofapps",
//                     img: "/navbar/businessofapps.png",
//                   },
//                 ].map((item, index) => (
//                   <div
//                     key={index}
//                     className="text-center"
//                   >
//                     <Image
//                       src={item.img}
//                       alt={item.name}
//                       width={100}
//                       height={100}
//                       className="mx-auto"
//                     />

//                     <h4 className="text-sm font-semibold mt-3 break-all ">
//                       {item.name}
//                     </h4>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ContactPopup() {
  // const [isOpen, setIsOpen] = useState(false);


  // useEffect(() => {
  //   const popupShown = localStorage.getItem("contactPopupShown");

  //   if (!popupShown) {
  //     const timer = setTimeout(() => {
  //       setIsOpen(true);
  //       localStorage.setItem("contactPopupShown", "true");
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  // const closePopup = () => {
  //   setIsOpen(false);
  // };

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        // onClick={closePopup}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <div
          className="
            relative
            bg-white
            rounded-2xl
            overflow-hidden
            shadow-2xl
            w-full
            max-w-[1000px]
            z-10
          "
        >
          {/* Close Button */}
          <button
            // onClick={closePopup}
            className="
              absolute
              top-4
              right-4
              z-20
              w-10
              h-10
              rounded-full
              bg-white
              shadow-md
              flex
              font-bold
              text-[#D68029]
              items-center
              justify-center
              text-xl
              hover:bg-gray-100
            "
          >
            ✕
          </button>

          <div className="grid lg:grid-cols-[55%_45%]">
            {/* LEFT SECTION */}
            <div className="p-6 md:p-8 lg:p-10">
              <h2 className="common-h2 mb-8">
                Let's Get Started
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    First Name *
                  </label>

                  <input
                    type="text"
                    placeholder="First name"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      px-4
                      py-3
                      outline-none
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Last Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Smith"
                    className=" w-full  border  border-gray-300 rounded-lg px-4 py-3 outline-none "
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email ID *
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className=" w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Contact No. *
                  </label>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">


                    <input
                      type="text"
                      placeholder="9876543210"
                      className=" -1 px-4 py-3 outline-none "
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message *
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Message"
                    className=" w-full  border border-gray-300 rounded-lg px-4 py-3 resize-none outline-none "
                  />
                </div>
                <div className=" text-center">
                  <div className="bg-[#D68029] relative inline-flex items-center justify-center w-full max-w-50 overflow-hidden text-white rounded-xl group ">
                            <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56 uration-750 delay-300 ease-in-out"></span>
                            <span className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-7.5 py-2.5 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                                <span>
                                    Submit
                                </span>
                            </span>
                        </div>
                </div>
              </form>
        
         
            </div>

            {/* RIGHT SECTION */}
            <div
              className=" hidden bg-[#d68029] p-8 lg:flex flex-col items-center justify-center text-white "
            >
              <div className="text-center">
                <h2 className="common-h2-small">
                  Hey, wait up!
                  <br />
                  Don't miss this! 
                </h2>

                <p className="mt-4 text-md">
                  Grab your FREE 30-minute consultation and let us help
                  you with the perfect tech solution.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  {
                    name: "Upwork",
                    img: "/navbar/Upwork.png",
                  },
                  {
                    name: "Clutch",
                    img: "/navbar/clutch.png",
                  },
                  {
                    name: "GoodFirms",
                    img: "/navbar/GoodFirms.png",
                  },
                  {
                    name: "AppFutura",
                    img: "/navbar/appfutura.png",
                  },
                  {
                    name: "SoftwareWorld",
                    img: "/navbar/softwareworld.png",
                  },
                  {
                    name: "Businessofapps",
                    img: "/navbar/businessofapps.png",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center"
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="mx-auto"
                    />

                    <h4 className="text-sm font-semibold mt-3 break-all ">
                      {item.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
