
"use client";

import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  Home, UserCircle, Info, Layers, MessageCircle, Briefcase, Boxes,
  LayoutList, Factory, GraduationCap, ClipboardList, Layers2, Pickaxe,
  Handshake, LineChart, DoorOpen, Inbox, BookPlus, BookOpenText, BookType,
  SearchCheck, Presentation, Milestone, ToolCase, Server, House,
  SignpostBig, Navigation, FileText, X,
  Building2, Mail, Settings, FolderTree, Tag, Tags,
  CircleHelp
} from "lucide-react";
import NavItems from "./NavItems";
import { NavItem } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const navItemsList: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle },

  { label: "manegment", isTitle: true },

  { href: "/dashboard/pages", label: "All pages", icon: Layers },

  
  { href: "/dashboard/home-page-data", label: "HomePage Data", icon: House },

  

  {
    label: "Category & Subcategory",
    icon: FolderTree,
    children: [
      { href: "/dashboard/category", label: "Category", icon: Tag },
      { href: "/dashboard/subcategory", label: "Subcategory", icon: Tags },
    ]
  },
  {
    label: "Our Services",
    icon: Briefcase,
    children: [
      // { href: "/dashboard/service-Tecnology", label: "Service Technology", icon: LayoutList },
      { href: "/dashboard/service-main-page", label: "Service Main Page", icon: ToolCase },
      { href: "/dashboard/service-manager", label: "Service Manager", icon: Boxes },
      {href :"/dashboard/service-category-page" ,label:"Service Category", icon: LayoutList }
    ],
  },
  {
    label: "Hire",
    icon: SignpostBig,
    children: [
      { href: "/dashboard/hire-main-page", label: "Hire Main Page ", icon: ToolCase },
      { href: "/dashboard/hire", label: "Hire", icon: Handshake },
    ],
  },

  { href: "/dashboard/Blog", label: "Blog", icon: FileText },

  { href: "/dashboard/About", label: "About Us", icon: Building2 },
  {
    label: "Career",
    icon: GraduationCap,
    children: [
      { href: "/dashboard/career", label: "Career", icon: Boxes },
      { href: "/dashboard/openning-position", label: "Openning Position", icon: ClipboardList },
    ]
  },
  {
    label: "Portfolio",
    icon: Layers2,
    children: [
      { href: "/dashboard/portfolio", label: "Portfolio Main page", icon: Layers2 },
      { href: "/dashboard/creativeWork", label: "Creative Work", icon: Pickaxe },
    ]
  },
  {
    label: "Faq",
    icon: CircleHelp,
    children: [
      { href: "/dashboard/faq-category", label: "Faq Category", icon: Tag },
      { href: "/dashboard/Faqs", label: "Faqs", icon: Info },
    ]
  },
  {
    label: "Training",
    icon: GraduationCap,
    children: [
      { href: "/dashboard/trainingMainPage", label: "Training MainPage Data", icon: Presentation },
    ]
  },
  {
    label: "Global-Model",
    icon: Server,
    children: [
      { href: "/dashboard/Why-Choose-ITS", label: "Why Chooes ITS", icon: Info },
      { href: "/dashboard/EngagementModel", label: "Engagement Model", icon: Layers },
      { href: "/dashboard/Testimonials", label: "Testimonials", icon: MessageCircle },
      { href: "/dashboard/expertise-industry", label: "Expertise Industries", icon: Factory },
      { href: "/dashboard/ReadOurReview", label: "Read Our Review", icon: Navigation },
    ],
  },
  { href: "/dashboard/enquiries", label: "Contact List (Enquiry)", icon: Mail },
  { label: "Yoast SEO", isTitle: true },
  { href: "/dashboard/yoast-seo", label: "Yoast SEO Manager", icon: SearchCheck },
  // { href: "/dashboard/seo-manager", label: "SEO Manager", icon: SearchCheck },
  { href: "/dashboard/website-settings", label: "Website Settings", icon: Settings },








  // { href: "/dashboard/Faqs", label: "Faqs", icon: Info },
  // { href: "/dashboard/home-page-data", label: "HomePage Data", icon: House },
  // {
  //   label: "Global-Model",
  //   icon: Server,
  //   children: [
  //     { href: "/dashboard/Why-Choose-ITS", label: "Why Chooes ITS", icon: Info },
  //     { href: "/dashboard/EngagementModel", label: "Engagement Model", icon: Layers },
  //     { href: "/dashboard/Testimonials", label: "Testimonials", icon: MessageCircle },
  //     { href: "/dashboard/expertise-industry", label: "Expertise Industries", icon: Factory },
  //   ],
  // },

  // { label: "Service", isTitle: true },
  // {
  //   label: "Our Services",
  //   icon: Briefcase,
  //   children: [
  //     { href: "/dashboard/service-manager", label: "Service Manager", icon: Boxes },
  //     { href: "/dashboard/service-Tecnology", label: "Service Technology", icon: LayoutList },
  //     { href: "/dashboard/service-main-page", label: "Service Main Page", icon: ToolCase },
  //   ],
  // },
  // { label: "Portfolio", isTitle: true },
  // { href: "/dashboard/portfolio", label: "Portfolio", icon: Layers2 },
  // { href: "/dashboard/creativeWork", label: "Creative Work", icon: Pickaxe },
  // { label: "Career", isTitle: true },
  // {
  //   label: "Position",
  //   icon: GraduationCap,
  //   children: [
  //     { href: "/dashboard/openning-position", label: "Openning Position", icon: ClipboardList },
  //     { href: "/dashboard/apply-position", label: "Apply Position", icon: DoorOpen },
  //   ],
  // },
  // { href: "/dashboard/career", label: "Career Content", icon: LineChart },
  // { label: "Hire", isTitle: true },
  // {
  //   label: "Hire",
  //   icon: SignpostBig,
  //   children: [
  //     { href: "/dashboard/hire", label: "Hire", icon: Handshake },
  //     { href: "/dashboard/hire-form", label: "Hire-from", icon: BookPlus },
  //     { href: "/dashboard/hire-main-page", label: "Hire Main Page ", icon: ToolCase },
  //   ],
  // },
  // { label: "Blog", isTitle: true },
  // { href: "/dashboard/Blog", label: "Blog", icon: FileText },
  // { label: "About Us", isTitle: true },
  // { href: "/dashboard/About", label: "About", icon: Info },
  // { label: "Faqs", isTitle: true },
  // { href: "/dashboard/Faqs", label: "Faqs", icon: Info },
  // { label: "Training", isTitle: true },
  // {
  //   label: "Course",
  //   icon: GraduationCap,
  //   children: [
  //     { href: "/dashboard/master-course", label: "Master Course", icon: BookOpenText },
  //     { href: "/dashboard/programming-language", label: "Programming Language", icon: BookType },
  //   ],
  // },
  // { href: "/dashboard/trainingMainPage", label: "Training MainPage Data", icon: Presentation },
  // { label: "Footer", isTitle: true },
  // { href: "/dashboard/contact", label: "Contact", icon: Inbox },
  // { href: "/dashboard/training-contact", label: "Training Contact ", icon: Milestone },
];

// 2. Component માં Props સ્વીકારો
export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay: જ્યારે સાઈડબાર ખુલે ત્યારે બહાર ક્લિક કરવાથી બંધ થાય */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white text-slate-900 transition-transform duration-300 ease-in-out sm:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } print:hidden`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/Main_logoW 1.png"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
              style={{ height: 'auto' }}
            />
          </Link>

          {/* Mobile Close Button */}
          <button
            className="sm:hidden p-2 hover:bg-slate-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
          <NavItems items={navItemsList} />
        </nav>

        <div className="mt-auto p-4 border-t bg-slate-50">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
            © {new Date().getFullYear()} Inspire Techno Solution
          </p>
        </div>
      </aside>
    </>
  );
}