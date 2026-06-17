// "use client";

// import SitemapCard from "./SitemapCard";
// import Section from "../Section";
// import Row from "../Row";
// import { NavigationStructure } from "@/lib/navigationService";

// interface Props {
//   navStructure: NavigationStructure;
// }

// const buildSlug = (prefix: string, slug: string) => {
//   if (!slug) return "#";
//   return `/${prefix}/${slug}`.replace(/\/+/g, "/");
// };

// const getTitle = (item: any) =>
//   item?.title || item?.name || item?.category || "Untitled Category";

// const getSlug = (item: any) =>
//   item?.slug || item?.link || item?.url || "#";

// export default function SitemapSection({ navStructure }: Props) {
// //   const hireLinks = navStructure?.hireNav?.map((category: any) => ({
// //       title: getTitle(category),
// //       slug: getSlug(category),
// //       children:
// //         category?.links?.map((sub: any) => ({
// //           title: getTitle(sub),
// //           slug: getSlug(sub),
// //         })) || [],
// //     })) || [];

// const hireLinks = navStructure?.hireNav?.map((category: any) => {
//     const categorySlug = category?.slug || category?.name || "hire";

//     return {
//       title: getTitle(category),
//       slug: `/${categorySlug}`,
//       children:
//         category?.links?.map((sub: any) => {
//           const subSlug = sub?.slug || sub?.name;

//           return {
//             title: getTitle(sub),
//             slug: buildSlug("hire", subSlug),
//           };
//         }) || [],
//     };
//   }) || [];

//   const serviceLinks = navStructure?.servicesNav?.map((category: any) => ({
//       title: getTitle(category),
//       slug: getSlug(category),
//       children:
//         category?.links?.map((sub: any) => ({
//           title: getTitle(sub),
//           slug: getSlug(sub),
//         })) || [],
//     })) || [];

//   return (
//     <Section className="relative z-10 !pt-12">
//       <Row>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           <SitemapCard title="Home" links={[{ title: "Visit page", slug: "/" }]} />

//           <SitemapCard title="About Us" links={[{ title: "Visit page", slug: "/about-us" }]} />

//           <SitemapCard title="Career" links={[{ title: "Visit page", slug: "/career" }]} />

//           <SitemapCard title="Blogs" links={[{ title: "Visit page", slug: "/blog" }]} />
          
//           <SitemapCard title="Training" links={[{ title: "Visit page", slug: "/training" }]} />
          
//           <SitemapCard title="Our Portfolio" links={[{ title: "Visit page", slug: "/my-portfolio" }]} />

//           <SitemapCard title="Hire Us" links={hireLinks} />

//           <SitemapCard title="Contact Us" links={[{ title: "Visit page", slug: "/contact" }]} />

//           <SitemapCard title="Services" links={serviceLinks} />

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

export default function SitemapSection({ navStructure }: Props) {
  // ---------------- Main Navigation ----------------
  // const mainPages = (navStructure?.mainNav || [])
  // .filter(
  //   (item) =>
  //     item.systemIdentifier !== "services" &&
  //     item.systemIdentifier !== "hire"
  // )
  // .map((item) => ({
  //   title: item.title,
  //   slug: item.slug === "home" ? "/" : `/${item.slug}`,
  // }));


  const aboutLink = navStructure?.mainNav?.find(
  (link) => link.systemIdentifier === "about-us"
);

const careerLink = navStructure?.mainNav?.find(
  (link) => link.systemIdentifier === "career"
);

const contactLink = navStructure?.mainNav?.find(
  (link) => link.systemIdentifier === "contact"
);

const blogLink = navStructure?.mainNav?.find(
  (link) => link.systemIdentifier === "blog"
);

const portfolioLink = navStructure?.mainNav?.find(
  (link) => link.systemIdentifier === "portfolio"
);

const trainingLink = navStructure?.mainNav?.find(
  (link) => link.systemIdentifier === "training"
);

// const PrivacyLink = navStructure?.mainNav?.find(
//   (link) => link.systemIdentifier === "privacy-policy"
// );

const pageCards = [
  { title: "Home", links: [{ title: "Visit page", slug: "/" }], },
  { title: "About Us", 
    links: [{ title: "Visit page", slug: aboutLink ? `/${aboutLink.slug}` : "/about-us", }],
  },
  { title: "Career", 
    links: [{ title: "Visit page", slug: careerLink ? `/${careerLink.slug}` : "/career", }],
  },
  { title: "Blogs",
    links: [{ title: "Visit page", slug: blogLink ? `/${blogLink.slug}` : "/blog", }],
  },
  { title: "Training", 
    links: [ { title: "Visit page", slug: trainingLink ? `/${trainingLink.slug}` : "/training", }],
  },
  { title: "Our Portfolio",
    links: [ { title: "Visit page", slug: portfolioLink ? `/${portfolioLink.slug}` : "/my-portfolio", }],
  },
  { title: "Contact Us",
    links: [ { title: "Visit page", slug: contactLink ? `/${contactLink.slug}` : "/contact", }],
  },
  //  { title: "Privacy policy",
  //   links: [ { title: "Visit page", slug: PrivacyLink ? `/${PrivacyLink.slug}` : "/privacy-policy", }],
  // },
];

  // ---------------- Services ----------------
  // const serviceLinks =
  //   navStructure?.servicesNav?.map((category) => ({
  //     title: category.category,
  //     children:
  //       category?.links?.map((service) => ({
  //         title: service.title,
  //         slug: `/${service.slug}`,
  //       })) || [],
  //   })) || [];
const serviceLinks =
  navStructure?.servicesNav?.map((category) => ({
    title: category.category,
    slug: `/our-service`, // add category page
    children:
      category?.links?.map((service) => ({
        title: service.title,
        slug: `/${service.slug}`,
      })) || [],
  })) || [];
  // ---------------- Hire ----------------
  const hirePage = navStructure?.mainNav?.find(
    (link) => link.systemIdentifier === "hire"
  );

  const hirePrefix = hirePage?.slug || "hire";

  // const hireLinks =
  //   navStructure?.hireNav?.map((category) => ({
  //     title: category.category,
  //     children:
  //       category?.links?.map((developer) => ({
  //         title: developer.title,
  //         slug: `/${hirePrefix}/${developer.slug}`,
  //       })) || [],
  //   })) || [];

  const hireLinks =
  navStructure?.hireNav?.map((category) => ({
    title: category.category,
    slug: `/hire`, // add category page
    children:
      category?.links?.map((developer) => ({
        title: developer.title,
        slug: `/${hirePrefix}/${developer.slug}`,
      })) || [],
  })) || [];

  return (
    <Section className="relative z-10 !py-16 ">
      <Row>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          {/* Main Pages */}
          {/* <SitemapCard
            title="Website Pages"
            links={mainPages}
          /> */}
          {pageCards.map((page) => (
          <SitemapCard
            key={page.title}
            title={page.title}
            links={page.links}
          />
        ))}
         </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Services */}
          <SitemapCard
            title="Services"
            links={serviceLinks}
          />

          {/* Hire Developers */}
          <SitemapCard
            title="Hire Developers"
            links={hireLinks}
          />

       </div>
      </Row>
    </Section>
  );
}