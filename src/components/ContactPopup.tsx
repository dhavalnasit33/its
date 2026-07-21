// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// import apiService from "@/lib/apiService";
// import { useToast } from "./ui/snackbar-provider";

// function getCurrentUserId(): string | null {
//   try {
//     const stored = localStorage.getItem("user");
//     if (!stored) return null;
//     const parsed = JSON.parse(stored);
//     return parsed?._id || parsed?.id || null;
//   } catch {
//     return null;
//   }
// }


// export default function ContactPopup() {
//   const { toast } = useToast();

//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedBudget, setSelectedBudget] = useState<string>("");
//   const REOPEN_TIME = 60 * 60 * 1000; // 1 hour
  
//   const budgetOptions = [
//     "UP TO $10K",
//     "$10-$20K",
//     "$20-$50K",
//     "$50-$100K",
//     "$100K +",
// ];

//   const [formData, setFormData] = useState({
//   firstname: "",
//   lastname: "",
//   email: "",
//   phone: "",
//   subject: "",
//   message: "",
// });

//   // useEffect(() => {
//   //   let timer: NodeJS.Timeout;
    
//   //   const handlePopup = () => {
//   //     const closedAt = localStorage.getItem("contactPopupClosedAt");

//   //     // Case 1: never closed
//   //     if (!closedAt) {
//   //       timer = setTimeout(() => 
//   //         setIsOpen(true), 3000);
//   //       return;
//   //     }

//   //     const diff = Date.now() - Number(closedAt);

//   //     // Case 2: cooldown finished
//   //     if (diff >= REOPEN_TIME) {
//   //       timer = setTimeout(() => 
//   //         setIsOpen(true), 3000);

//   //       return;
//   //     }

//   //     // Case 3: still in cooldown → wait remaining time
//   //     const remaining = REOPEN_TIME - diff;

//   //      timer = setTimeout(() => 
//   //       setIsOpen(true), remaining);
//   //   };
  
//   //   handlePopup();

//   //   return () => clearTimeout(timer);
//   // }, [isOpen]); // 🔥 IMPORTANT CHANGE
  
// useEffect(() => {
//   const popupStatus = localStorage.getItem("contactPopup");

//   // Form submitted successfully
//   if (popupStatus === "submitted") {
//     return;
//   }

//   const closedAt = localStorage.getItem("contactPopupClosedAt");

//   if (popupStatus === "closed" && closedAt) {
//     const diff = Date.now() - Number(closedAt);

//     if (diff < REOPEN_TIME) {
//       const remainingTime = REOPEN_TIME - diff;

//       const timer = setTimeout(() => {
//         setIsOpen(true);
//       }, remainingTime);  

//       return () => clearTimeout(timer);
//     }
//   }

//   const timer = setTimeout(() => {
//     setIsOpen(true);
//   }, 45000);

//   return () => clearTimeout(timer);
// }, []);


//   const closePopup = () => {
//   localStorage.setItem("contactPopup", "closed");
//   localStorage.setItem(
//     "contactPopupClosedAt",
//     Date.now().toString()
//   );

//   setIsOpen(false);

//   setTimeout(() => {
//     localStorage.removeItem("contactPopup");
//     localStorage.removeItem("contactPopupClosedAt");
//     setIsOpen(true);
//   }, REOPEN_TIME);
// };

// const handleChange = (
//   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//   });
// };
// const handleBudgetSelect = (budget: string) => {
//   setSelectedBudget(budget);
// };

// const onSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   // const userId = getCurrentUserId();

//   const payload = {
//     type: "PopupForm",
//     source: "popup_form",

//     name: `${formData.firstname} ${formData.lastname}`.trim(),
//     firstname: formData.firstname,
//     lastname: formData.lastname,

//     email: formData.email,
//     phone: formData.phone,

//     subject: formData.subject,
//     message: formData.message,

//     budget: selectedBudget,
//     // userId,
//   };

//   console.log("Payload:", payload);

//   try {
//     const response = await apiService<{
//       success: boolean;
//       message?: string;
//     }>("/enquiries", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     console.log("API Response:", response);

//     if (response.success) {
//       toast("Form submitted successfully!", "success");

//       setFormData({
//         firstname: "",
//         lastname: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });

//       setSelectedBudget("");
      
//       localStorage.setItem("contactPopup", "submitted");
//       setIsOpen(false);

//     }
//   } catch (error: any) {
//     console.error("Submit Error:", error);

//     toast(
//       error?.message || "Failed to send message",
//       "error"
//     );
//   }
// };

// if (!isOpen) return null;

  
//   return (
//     <div className="fixed inset-0 z-[9999]">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-xs"
//         // onClick={closePopup}
//       />

//       {/* Modal */}
//       <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
//         <div className=" relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[1000px] z-10 " >
//           {/* Close Button */}
//           <button
//             onClick={closePopup}
//             className=" absolute top-4 right-4 z-20  w-10 h-10 rounded-full  bg-white shadow-md flex font-bold text-[#D68029] items-center
//               justify-center text-xl hover:bg-gray-100 cursor-pointer "
//           >
//             ✕
//           </button>

//           <div className="grid lg:grid-cols-[55%_45%] ">
//             {/* LEFT SECTION */}
//             <div className="p-6 md:p-6 lg:p-8 h-full overflow-y-auto max-h-[92vh]">
//               <h2 className="common-h2 mb-8">
//                 Let's Get Started
//               </h2>
//                 <form className="space-y-4 md:space-y-6" onSubmit={(onSubmit)}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                       <div>
//                           <input
//                               name="firstname"
//                             value={formData.firstname}
//                             onChange={handleChange}
//                             type="text"
//                             placeholder="First Name"
//                             className="w-full border-b border-gray-300 py-2"
//                           />
//                       </div>
//                       <div>
//                           <input
//                                 name="lastname"
//                               value={formData.lastname}
//                               onChange={handleChange}
//                               type="text"
//                               placeholder="Last Name"
//                               className="w-full border-b border-gray-300 py-2"
//                           />         
//                       </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                       <div>
//                           <input
//                                 name="email"
//                               value={formData.email}
//                               onChange={handleChange}
//                               type="email"
//                               placeholder="Email"
//                               className="w-full border-b border-gray-300 py-2"
//                           /> 
//                       </div>
//                       <div>
//                           <input
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 type="tel"
//                                 placeholder="Phone Number"
//                               className="w-full border-b border-gray-300 py-2"
//                           />    
//                       </div>
//                   </div>

//                   <div>
//                       <label className="text-gray-700 font-semibold">
//                           Select Subject?
//                       </label>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3 pt-2">
//                           {[
//                               "Hire Developer(s)",
//                               "Web Development",
//                               "Mobile App Development",
//                               "UI/UX Design",
//                               "QA Service",
//                               "Digital Marketing",
//                               "Other Services",
//                           ].map((subject) => (
//                               <label
//                                   key={subject}
//                                   className="flex items-center gap-1 md:gap-2 cursor-pointer"
//                               >
//                                   <input
//                                       type="radio"
//                                       name="subject"
//                                       value={subject}
//                                       onChange={() =>
//                                         setFormData({ ...formData, subject })
//                                       }
                                    
//                                       className="hidden peer"
//                                   />
//                                   <span className="h-4 w-4 flex items-center justify-center rounded-full border border-gray-400 peer-checked:bg-orange-500 peer-checked:border-orange-500 text-white text-xs">
//                                       ✓
//                                   </span>
//                                   <span className="text-gray-700 text-xs sm:text-[13px]">{subject}</span>
//                               </label>
//                           ))}
//                       </div>
//                   </div>

//                   <div>
//                       <textarea
//                           name="message"
//                           value={formData.message}
//                           onChange={handleChange}
//                           rows={4}
//                           placeholder="Write your message.."
//                           className="w-full border-b border-gray-300 "
//                       ></textarea>
                      
//                   </div>
//                     <div>
//                       <label className="text-gray-700 mb-3 font-semibold">
//                           Your budget for this project?
//                       </label>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                           {budgetOptions.map((budget, index) => (
//                               <button
//                                   key={index}
//                                   type="button"
//                                   onClick={() => handleBudgetSelect(budget)}
//                                   className={`
//                                       hover:cursor-pointer
//                                       rounded-lg px-2   sm:px-4 py-2 text-[12px] font-medium
//                                       uppercase tracking-wide transition-colors
//                                       hover:bg-[#D68029] hover:text-white
//                                       ${selectedBudget === budget
//                                           ? "bg-[#D68029] text-white"
//                                           : "bg-[#13213d] text-white "
//                                       }
//                                     `}
//                               >
//                                   {budget}
//                               </button>
//                           ))}
//                       </div>
//                   </div>


//                   {/* <div className="my-4 flex justify-start"> 
//                       <div className="scale-75 sm:scale-100 origin-left">
//                         <ReCAPTCHA
//                           ref={recaptchaRef}
//                           sitekey={GOOGLE_CAPTACH_CLIENT_KEY}
//                           onChange={(token) => {
//                             console.log("CAPTCHA TOKEN:", token);
//                             setCaptchaToken(token || "");
//                           }}
//                         />
//                       </div>
//                   </div> */}

//                   <button
//                       type="submit"
//                           onClick={() => toast("Submitted", "success")}

//                       className="block cursor-pointer"
//                   >
//                       <div className="bg-[#D68029] relative inline-flex items-center justify-center w-full max-w-50 overflow-hidden text-white rounded-xl group ">
//                           <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56 uration-750 delay-300 ease-in-out"></span>
//                           <span className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 sm:px-8 py-3 cursor-pointer font-semibold">
//                               submit
//                           </span>
//                       </div>
//                   </button>
//               </form>
//             </div>

//             {/* RIGHT SECTION */}
//             <div
//               className=" hidden bg-[#d68029] p-8 lg:flex flex-col items-center justify-center text-white h-full"
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

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import apiService from "@/lib/apiService";
import { useToast } from "./ui/snackbar-provider";

function getCurrentUserId(): string | null {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?._id || parsed?.id || null;
  } catch {
    return null;
  }
}

export default function ContactPopup() {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const REOPEN_TIME = 60 * 60 * 1000; // 1 hour
  
  const budgetOptions = [
    "UP TO $10K",
    "$10-$20K",
    "$20-$50K",
    "$50-$100K",
    "$100K +",
];

  const [formData, setFormData] = useState({
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

// useEffect(() => {
//   let timer: NodeJS.Timeout;

//   const checkPopupStatus = async () => {
//     const userId = getCurrentUserId();

//     // Logged in user -> check DB first
//     if (userId) {
//       try {
//         const res = await apiService<{
//           success: boolean;
//           submitted: boolean;
//         }>(`/enquiries/popup-status/${userId}`);

//         if (res.submitted) return; 
//       } catch (err) {
//         console.error("Popup status error:", err);
//       }
//     }

//     const popupStatus = localStorage.getItem("contactPopup");

//     if (popupStatus === "submitted") {
//       return;
//     }

//     const closedAt = localStorage.getItem("contactPopupClosedAt");

//     if (popupStatus === "closed" && closedAt) {
//       const diff = Date.now() - Number(closedAt);

//       if (diff < REOPEN_TIME) {
//         timer = setTimeout(() => {
//           setIsOpen(true);
//         }, REOPEN_TIME - diff);

//         return;
//       }
//     }

//     timer = setTimeout(() => {
//       setIsOpen(true);
//     }, 2000);
//   };

//   checkPopupStatus();

//   return () => {
//     if (timer) clearTimeout(timer);
//   };
// }, []);
useEffect(() => {
  let timer: NodeJS.Timeout;

  const checkPopupStatus = async () => {
    const userId = getCurrentUserId();

    try {
      // 1. Check logged-in user or guest IP in DB
      const res = await apiService<{
        success: boolean;
        submitted: boolean;
      }>(`/enquiries/popup-status/${userId || "guest"}`);

      if (res && res.submitted) {
        setIsOpen(false);
        return; // STOP popup completely
      }

      // 2. Check localStorage for guest
      if (localStorage.getItem("contactPopup") === "submitted") {
        setIsOpen(false);
        return;
      }

      const closedAt = localStorage.getItem("contactPopupClosedAt");

      if (closedAt) {
        const diff = Date.now() - Number(closedAt);

        if (diff < REOPEN_TIME) {
          timer = setTimeout(() => {
            setIsOpen(true);
          }, REOPEN_TIME - diff);

          return;
        }
      }

      // 3. DEFAULT OPEN
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 45000);

    } catch (error) {
      console.error("Popup API failed:", error);

      // fallback check localStorage
      if (localStorage.getItem("contactPopup") === "submitted") {
        setIsOpen(false);
        return;
      }

      // fallback open
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 45000);
    }
  };

  checkPopupStatus();

  return () => {
    if (timer) clearTimeout(timer);
  };
}, []);

  const closePopup = () => {
  localStorage.setItem("contactPopup", "closed");
  localStorage.setItem(
    "contactPopupClosedAt",
    Date.now().toString()
  );

  setIsOpen(false);
  setTimeout(() => {
    setIsOpen(true);
  }, REOPEN_TIME);

  // setTimeout(() => {
  //   localStorage.removeItem("contactPopup");
  //   localStorage.removeItem("contactPopupClosedAt");
  //   setIsOpen(true);
  // }, REOPEN_TIME);
};

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  if (e.target.name === "phone") {
    const cleaned = e.target.value.replace(/[^\d+]/g, "").slice(0, 15);
    setFormData({
      ...formData,
      phone: cleaned,
    });
    return;
  }
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleBudgetSelect = (budget: string) => {
  setSelectedBudget(budget);
};

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const userId = getCurrentUserId();

  const payload = {
    user:userId,
    type: "PopupForm",
    source: "popup_form",

    name: `${formData.firstname} ${formData.lastname}`.trim(),
    firstname: formData.firstname,
    lastname: formData.lastname,

    email: formData.email,
    phone: formData.phone,

    subject: formData.subject,
    message: formData.message,

    budget: selectedBudget,
    // userId,
  };

  console.log("Payload:", payload);

  setIsSubmitting(true);

  try {
    const response = await apiService<{
      success: boolean;
      submitted?: boolean;
      message?: string;
    }>("/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("API Response:", response);

     if (response.submitted) {
      localStorage.setItem("contactPopup", "submitted");
      setIsOpen(false);
      return;
    }

    if (response.success) {
      toast("Form submitted successfully!", "success");

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setSelectedBudget("");
      
      localStorage.setItem("contactPopup", "submitted");
      localStorage.removeItem("contactPopupClosedAt");
      setIsOpen(false);

    }
  } catch (error: any) {
    console.error("Submit Error:", error);

    toast(
      error?.message || "Failed to send message",
      "error"
    );
  }
   finally {
        setIsSubmitting(false);
    }
};

if (!isOpen) return null;

  
  return (
    <div className="fixed inset-0 z-9999">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        // onClick={closePopup}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className=" relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-250 z-10 " >
          {/* Close Button */}
          <button
            onClick={closePopup}
            className=" absolute top-4 right-4 z-20  w-10 h-10 rounded-full  bg-white shadow-md flex font-bold text-[#D68029] items-center
              justify-center text-xl hover:bg-gray-100 cursor-pointer "
          >
            ✕
          </button>

          <div className="grid lg:grid-cols-[55%_45%] ">
            {/* LEFT SECTION */}
            <div className="p-6 md:p-6 lg:p-8 h-full overflow-y-auto max-h-[92vh]">
              <h2 className="common-h2 mb-8">
                Let's Get Started
              </h2>
                <form className="space-y-4 md:space-y-6" onSubmit={(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                          <input
                              name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            type="text"
                            placeholder="First Name"
                            className="w-full border-b border-gray-300 py-2"
                          />
                      </div>
                      <div>
                          <input
                                name="lastname"
                              value={formData.lastname}
                              onChange={handleChange}
                              type="text"
                              placeholder="Last Name"
                              className="w-full border-b border-gray-300 py-2"
                          />         
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                          <input
                                name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email"
                              placeholder="Email"
                              className="w-full border-b border-gray-300 py-2"
                          /> 
                      </div>
                      <div>
                          <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                placeholder="Phone Number"
                                maxLength={15}
                                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^\d+]/g, "");
                                }}
                                className="w-full border-b border-gray-300 py-2"
                          />    
                      </div>
                  </div>

                  <div>
                      <label className="text-gray-700 font-semibold">
                          Select Subject?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3 pt-2">
                          {[
                              "Hire Developer(s)",
                              "Web Development",
                              "Mobile App Development",
                              "UI/UX Design",
                              "QA Service",
                              "Digital Marketing",
                              "Other Services",
                          ].map((subject) => (
                              <label
                                  key={subject}
                                  className="flex items-center gap-1 md:gap-2 cursor-pointer"
                              >
                                  <input
                                      type="radio"
                                      name="subject"
                                      value={subject}
                                      onChange={() =>
                                        setFormData({ ...formData, subject })
                                      }
                                    
                                      className="hidden peer"
                                  />
                                  <span className="h-4 w-4 flex items-center justify-center rounded-full border border-gray-400 peer-checked:bg-orange-500 peer-checked:border-orange-500 text-white text-xs">
                                      ✓
                                  </span>
                                  <span className="text-gray-700 text-xs sm:text-[13px]">{subject}</span>
                              </label>
                          ))}
                      </div>
                  </div>

                  <div>
                      <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Write your message.."
                          className="w-full border-b border-gray-300 "
                      ></textarea>
                      
                  </div>
                    <div>
                      <label className="text-gray-700 mb-3 font-semibold">
                          Your budget for this project?
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                          {budgetOptions.map((budget, index) => (
                              <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleBudgetSelect(budget)}
                                  className={`
                                      hover:cursor-pointer
                                      rounded-lg px-2   sm:px-4 py-2 text-[12px] font-medium
                                      uppercase tracking-wide transition-colors
                                      hover:bg-[#D68029] hover:text-white
                                      ${selectedBudget === budget
                                          ? "bg-[#D68029] text-white"
                                          : "bg-[#13213d] text-white "
                                      }
                                    `}
                              >
                                  {budget}
                              </button>
                          ))}
                      </div>
                  </div>


                  {/* <div className="my-4 flex justify-start"> 
                      <div className="scale-75 sm:scale-100 origin-left">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={GOOGLE_CAPTACH_CLIENT_KEY}
                          onChange={(token) => {
                            console.log("CAPTCHA TOKEN:", token);
                            setCaptchaToken(token || "");
                          }}
                        />
                      </div>
                  </div> */}

                  {/* <button
                      type="submit"
                          // onClick={() => toast("Submitted", "success")}

                      className="block cursor-pointer"
                  >
                      <div className="bg-[#D68029] relative inline-flex items-center justify-center w-full max-w-50 overflow-hidden text-white rounded-xl group ">
                          <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56 uration-750 delay-300 ease-in-out"></span>
                          <span className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 sm:px-8 py-3 cursor-pointer font-semibold">
                              submit
                          </span>
                      </div>
                  </button> */}
                   <button
                        type="submit"
                        disabled={isSubmitting}
                        className={` block ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        <div className="bg-[#D68029] relative inline-flex items-center justify-center w-full max-w-50 overflow-hidden text-white rounded-xl group ">
                            <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56 uration-750 delay-300 ease-in-out"></span>
                            <span className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 sm:px-8 py-3 cursor-pointer font-semibold">
                                {isSubmitting ? (
                                    <>
                                        <span>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        </span>
                                        <span>
                                            Sending...
                                        </span>
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </span>
                        </div>
                    </button>
              </form>
            </div>

            {/* RIGHT SECTION */}
            <div
              className=" hidden bg-[#d68029] p-8 lg:flex flex-col items-center justify-center text-white h-full"
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
