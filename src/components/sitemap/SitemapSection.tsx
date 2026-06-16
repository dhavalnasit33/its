// "use client";

// import Link from "next/link";
// import SitemapCard from "./SitemapCard";
// import Section from "../Section";
// import Row from "../Row";
// import { NavigationStructure } from "@/lib/navigationService";

// interface NavbarProps {
//   navStructure: NavigationStructure;
// }

// export default function SitemapSection({ navStructure}: NavbarProps) {

//     const homeLink = navStructure?.mainNav?.find(
//     (item) => item.slug === "/"
//   );

//    const aboutLink = (navStructure.mainNav || []).find(
//     (link) => link.systemIdentifier === "about-us",
//   );
//   const careerLink = (navStructure.mainNav || []).find(
//     (link) => link.systemIdentifier === "career",
//   );

//   //also take hire and ourservie  and portfolio page link daynbamic
//   const hireLink = (navStructure.mainNav || []).find(
//     (link) => link.systemIdentifier === "hire",
//   );
//   const ourServiesLink = (navStructure.mainNav || []).find(
//     (link) => link.systemIdentifier === "services",
//   );
//   const portfolioLink = (navStructure.mainNav || []).find(
//     (link) => link.systemIdentifier === "portfolio",
//   );

//   const ContactLink = (navStructure.mainNav || []).find(
//     (link) => link.systemIdentifier === "contact",
//   );    

//   const BlogLink = (navStructure.mainNav || []).find(
//     (link) => link.systemIdentifier === "blog",
//   );

// const baseNavItems = (navStructure.mainNav || []).map((link) => {
//     const href = link.slug === "home" ? "/" : `/${link.slug}`;
//     return { href, label: link.title };
//   });

//     const hireLinks =
//   navStructure?.hireNav?.flatMap(
//     (category: any) =>
//       category.links?.map((item: any) => ({
//         title: item.title,
//         slug: item.slug,
//       })) || []
//   ) || [];
// // const hireLinks =
// //   navStructure?.hireNav?.map((category: any) => ({
// //     title: category.title || category.name || "Untitled Category",
// //     slug: category.slug || "#",
// //     children:
// //       category.links?.map((sub: any) => ({
// //         title: sub.title,
// //         slug: sub.slug,
// //       })) || [],
// //   })) || [];
//   const serviceLinks =
//   navStructure?.servicesNav?.flatMap(
//     (category: any) =>
//       category.links?.map((item: any) => ({
//         title: item.title,
//         slug: item.slug,
//         children: item.children || [],
//       })) || []
//   ) || [];
// // const serviceLinks =
// //   navStructure?.servicesNav?.map((category: any) => ({
// //     title: category.title || category.name || "Untitled Category",
// //     slug: category.slug || "#",
// //     children:
// //       category.links?.map((sub: any) => ({
// //         title: sub.title,
// //         slug: sub.slug,
// //       })) || [],
// //   })) || [];
//   return (
//     <Section className="relative z-10 ">
//       <Row>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* Home */}
//           <SitemapCard
//             title="Home"
//             links={[
//               {
//                 title: "Visit page",
//                 slug: "/",
//               },
//             ]}
//           />

//           {/* About */}
//           <SitemapCard
//             title="About Us"
//             links={[
//               {
//                 title: "Visit page",
//                 slug: "/about-us",
//               },
//             ]}
//           />

//           {/* Career */}
//           <SitemapCard
//             title="Career"
//             links={[
//               {
//                 title: "Visit page",
//                 slug: "/career",
//               },
//             ]}
//           />

//           {/* Hire */}
//           <SitemapCard
//             title="Hire Us"
//             // links={navStructure.hireNav}
//              links={hireLinks}
//           />

//           {/* Services */}
//           <SitemapCard
//             title="Our Services"
//             // links={navStructure.servicesNav}
//             links={serviceLinks}
//           />

//           {/* Case Study */}
//           <SitemapCard
//             title="Contact Us"
//             links={[
//               {
//                 title: "Visit page",
//                 slug: "/contact",
//               },
//             ]}
//           />
        //   <SitemapCard
        //     title="Blogs"
        //     links={[
        //       {
        //         title: "Visit page",
        //         slug: "/blog",
        //       },
        //     ]}
        //   />
        //     <SitemapCard
        //     title="Training"
        //     links={[
        //       {
        //         title: "Visit page",
        //         slug: "/training",
        //       },
        //     ]}
        //   />
        //   <SitemapCard
        //     title="Our Portfolio"
        //     links={[
        //       {
        //         title: "Visit page",
        //         slug: "/my-portfolio",
        //       },
        //     ]}
        //   />
//         </div>

//       </Row>
//     </Section>
//   );
// }




"use client";

import SitemapCard from "./SitemapCard";
import Section from "../Section";
import Row from "../Row";
import { NavigationStructure } from "@/lib/navigationService";

interface Props {
  navStructure: NavigationStructure;
}

const buildSlug = (prefix: string, slug: string) => {
  if (!slug) return "#";
  return `/${prefix}/${slug}`.replace(/\/+/g, "/");
};

const getTitle = (item: any) =>
  item?.title || item?.name || item?.category || "Untitled Category";

const getSlug = (item: any) =>
  item?.slug || item?.link || item?.url || "#";

export default function SitemapSection({ navStructure }: Props) {
//   const hireLinks = navStructure?.hireNav?.map((category: any) => ({
//       title: getTitle(category),
//       slug: getSlug(category),
//       children:
//         category?.links?.map((sub: any) => ({
//           title: getTitle(sub),
//           slug: getSlug(sub),
//         })) || [],
//     })) || [];

const hireLinks = navStructure?.hireNav?.map((category: any) => {
    const categorySlug = category?.slug || category?.name || "hire";

    return {
      title: getTitle(category),
      slug: `/${categorySlug}`,
      children:
        category?.links?.map((sub: any) => {
          const subSlug = sub?.slug || sub?.name;

          return {
            title: getTitle(sub),
            slug: buildSlug("hire", subSlug),
          };
        }) || [],
    };
  }) || [];

  const serviceLinks = navStructure?.servicesNav?.map((category: any) => ({
      title: getTitle(category),
      slug: getSlug(category),
      children:
        category?.links?.map((sub: any) => ({
          title: getTitle(sub),
          slug: getSlug(sub),
        })) || [],
    })) || [];

  return (
    <Section className="relative z-10 !pt-12">
      <Row>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <SitemapCard title="Home" links={[{ title: "Visit page", slug: "/" }]} />

          <SitemapCard title="About Us" links={[{ title: "Visit page", slug: "/about-us" }]} />

          <SitemapCard title="Career" links={[{ title: "Visit page", slug: "/career" }]} />

          <SitemapCard title="Hire Us" links={hireLinks} />

          <SitemapCard title="Services" links={serviceLinks} />

          <SitemapCard title="Contact Us" links={[{ title: "Visit page", slug: "/contact" }]} />

          <SitemapCard title="Blogs" links={[{ title: "Visit page", slug: "/blog" }]} />
          
          <SitemapCard title="Training" links={[{ title: "Visit page", slug: "/training" }]} />
          
          <SitemapCard title="Our Portfolio" links={[{ title: "Visit page", slug: "/my-portfolio" }]} />
        </div>
      </Row>
    </Section>
  );
}