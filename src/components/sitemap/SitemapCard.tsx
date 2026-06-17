// import Link from "next/link";

// interface SitemapCardProps {
//   title: string;
//   links: any[];
// }

// export default function SitemapCard({
//   title,
//   links,
// }: SitemapCardProps) {
//   return (
//     <div className=" bg-white rounded-2xl border border-gray-200  p-6 shadow-sm h-full " >
//       {/* Card Title */}
//       <h2 className="text-3xl font-semibold mb-4">
//         {title}
//       </h2>

//       <div className="border-b border-gray-200 mb-4" />

//       {/* Links */}
//       <ul className="space-y-3">
//         {links?.map((item, index) => {
//           const href = item.slug || item.link || item.url ||  "#";

//           return (
//             <li
//              key={`${item.slug || item.title || "item"}-${index}`}
//             >
//               <Link
//                 href={href}
//                 className=" flex items-center gap-2 text-black hover:text-[#D68029] transition-colors "
//               >
//                 <span className="w-2 h-2 rounded-full bg-[#D68029]" />

//                 <span>{item.title}</span>
//               </Link>

//               {/* Child Links */}
//               {Array.isArray(item.children) && item.children.length > 0 && (
//                 <ul className=" ml-5 mt-3  border-l border-gray-200 pl-4 space-y-2 " >
//                   {item.children.map(( child: any, childIndex: number ) => {
//                       const childHref = child.slug || child.link || child.url || "#";

//                       return (
//                         <li
//                          key={`${child.slug || child.title || "child"}-${childIndex}`}
//                         >
//                           <Link
//                             href={childHref}
//                             className="  text-gray-600 hover:text-[#D68029] transition-colors "
//                           >
//                             {child.title}
//                           </Link>
//                         </li>
//                       );
//                     }
//                   )}
//                 </ul>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

import Link from "next/link";

const normalizeSlug = (slug?: string) => {
  if (!slug) return "#";
  if (slug === "/" || slug === "home" || slug === "/home") return "/";
  return slug.startsWith("/") ? slug : `/${slug}`;
};

export default function SitemapCard({ title, links }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <div className="border-b mb-4 border-gray-200" />

      <ul className="space-y-3">
        {links?.map((item: any, index: number) => {
          const href = normalizeSlug(item.slug ?? item.link ?? item.url);
          const label = item.title ?? item.name ?? "Untitled";

          return (
            <li key={index}>
              <Link href={href} className="flex gap-2 text-black hover:text-[#D68029] items-center">
                <span className="w-2 h-2 rounded-full bg-[#D68029]" />
                <span>{label}</span>
              </Link>
                {/* {href !== "#" ? (
                  <Link
                    href={href}
                    className="flex gap-2 text-black hover:text-[#D68029] items-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#D68029]" />
                    <span>{label}</span>
                  </Link>
                ) : (
                  <div className="flex gap-2 items-center font-semibold text-black">
                    <span className="w-2 h-2 rounded-full bg-[#D68029]" />
                    <span>{label}</span>
                  </div>
              )} */}
              {item.children?.length > 0 && (
                <ul className="ml-5 mt-3 border-l border-gray-200 pl-4 space-y-2">
                  {item.children.map((child: any, i: number) => {
                    const childHref = normalizeSlug(child.slug ?? child.link ?? child.url);
                    const childLabel = child.title ?? child.name ?? "Untitled";

                    return (
                      <li key={i}>
                        <Link href={childHref} className="text-gray-500 hover:text-[#D68029]">
                          {childLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}