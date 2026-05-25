import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import * as z from "zod";

export interface User {
  id: string;
  _id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string; // Usually omitted in frontend, but included here if needed for forms
  profile_picture?: string | null;
  roles: "Admin"[]; // Enum from backend
  lastLogin?: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface AuthResponse {
  json(): unknown;
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface SingleResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AdminUser {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
    profile_picture?: string | null;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
  status?: any;
  message?: string;
}

export interface SingleResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/* -------------------- HomeChooseIts -------------------- */
export const HomeChooseItsSchema = z.object({
  _id: z.string(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: z.string().url("Image required"), // required now
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type HomeChooseIts = z.infer<typeof HomeChooseItsSchema>;

/* -------------------- EngagementModel -------------------- */
export const EngagementModelSchema = z.object({
  _id: z.string(),
  modelTitle: z.string().min(2, "Title must be at least 2 characters"),
  modelDescription: z
    .string()
    .min(5, "Description must be at least 5 characters"),
  modelImage: z.string().url("Image required"), // required image
  keyPoints: z
    .array(z.string().nonempty("Key point cannot be empty"))
    .min(1, "At least one key point required"),
  supportModel: z.string().min(1, "Support model is required"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type EngagementModel = z.infer<typeof EngagementModelSchema>;


/*------------------Blog----------*/
export const blogSchema = z.object({
  categories: z.string().min(2, "Category required"),
  subCategories: z.string().min(2, "SubCategory required"),
  slug: z.string().min(1).max(200),
  image: z.string().url("Valid image URL required"),
  details: z.object({
    title: z.string().min(2, "Title required"),
    description: z.string().min(5, "Description required"),
    author: z.string().min(2, "Author required"),
    answerOrDetails: z.string().min(5, "Answer/Details required"),
  }),
  seo_title: z.string().optional(),
  meta_description: z.string().max(500, "Meta description is too long").optional(),
  seo_keyphrase: z.string().optional(),
  cover_image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type Blogs = z.infer<typeof blogSchema>;

/* -------------------- Testimonials -------------------- */
export const TestimonialsSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url("Image required"), // required now
  description: z.string().min(5, "Description must be at least 5 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Testimonials = z.infer<typeof TestimonialsSchema>;

/* -------------------- ReadOurReview -------------------- */
export const ReadOurReviewSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url("Image required"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ReadOurReview = z.infer<typeof ReadOurReviewSchema>;

/* -------------------- Service Manager -------------------- */
export interface FAQ {
  question: string;
  answer: string;
}

export interface KeyPoint {
  description: ReactNode;
  title: ReactNode;
  name: string;
  image?: string | null;
}

export interface KeyPointBox {
  description: string;
  content: KeyPoint[];
}

export interface ToolDetail {
  title: string;
  section: number;
  keyPoints: string[];
}

export interface Tool {
  description?: string;
  details: ToolDetail[];
}

export interface ContentBlock {
  category: ReactNode;
  title: string;
  description: string;
  image?: string | null;
}

export interface WhyWorkWith {
  description: string;
  image?: string | null;
  content: {
    title: string;
    description: string;
  }[];
}

export interface ServiceManager {
  title: string;
  name: string;
  image: string | Blob | undefined | any;
  // image: any;
  _id: string;
  category: string;
  subCategory: string;
  slug: string;
  mainTitle: string;
  description: string;
  subMainTitle: string;
  subMainTitleDescription: string;
  contentBlocks: ContentBlock[];
  WhyWorkWithThis: WhyWorkWith;
  workProgress?: string | null;
  toolsAndTechnology: Tool;
  whyCompanyPerfersThis: KeyPointBox;
  faqs: FAQ[];
  createdAt: string;
  updatedAt: string;
}

export interface categoryManeger {
  category: string;
  image: string | Blob | undefined | any;
  _id: string;
}

export interface ServiceTecnology {
  image: string;
  _id: string;
  serviceId: ServiceManager;
  label: string;
  createdAt: string;
  updatedAt: string;
}

// types/index.ts
export interface Blog {
  slug: string;
  subCategories: string;
  categories: string;
  _id: string;
  category: string;
  subCategory?: string;
  image: string;
  details: {
    title: string;
    description: string;
    author: string;
    keyPointsOrQuestion: string[];
    answerOrDetails: string;
  };
  seo_title?: string;
  meta_description?: string;
  seo_keyphrase?: string;
  cover_image?: string;
  createdAt: string; // Also good to have timestamps
  updatedAt: string;
}
export interface CategoryRef {
  _id: string;
  category: string;
}
export interface Faqs {
  // categories: string;
  categories: string | CategoryRef;
  title: string;
  _id: string;
  question: string;
  answer: string;
}

export type BlogFormValues = {
  category: string;
  subCategory: string;
  slug: string;
  image: string;
  details: {
    title: string;
    description: string;
    author: string;
    answerOrDetails: string;
  };
  seo_title?: string;
  meta_description?: string;
  seo_keyphrase?: string;
  cover_image?: string;
};

export interface ExpertiesIndustries {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const OpenningPositionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z
    .string()
    .min(1, "Image is required")
    .url("A valid image URL is required"),
  openning: z.union([z.number(), z.string()]),
  qualifications: z
    .string()
    .min(2, "Qualifications must be at least 2 characters"),
  experience: z.string().min(1, "Experience is required"),
});

export const PortfolioContentFormValues = z.object({
  heroSection: z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    image: z.string().url("Image required"),
    points: z.array(
      z.object({
        label: z.string().min(2, "Label must be at least 2 characters"),
        image: z.string().url("Image required"),
      }),
    ),
  }),
  seo: z.object({
    title: z.string(),
    keyphrase: z.string(),
    seoDescription: z.string(),
    featureImage: z.string().nullable().optional().or(z.literal("")),
  }),
});

export type PortfolioContentFormValues = z.infer<
  typeof PortfolioContentFormValues
>;

export interface PortfolioContent {
  _id: string;
  heroSection: {
    title: string;
    description: string;
    image: string;
    points: {
      label: string;
      image: string;
    }[];
  };
  seo: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreativeWork {
  _id: string;
  category: string;
  image: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

// hire page schemas
export const FAQSchema = z.object({
  question: z.string().min(2, "Question is required"),
  answer: z.string().min(2, "Answer is required"),
});
export type FAQFormValues = z.infer<typeof FAQSchema>;

/* Our Expertise */
export const OurExpertiseSchema = z.object({
  keyPoints: z.array(z.string().min(2, "Key point is required")),
});
export type OurExpertiseFormValues = z.infer<typeof OurExpertiseSchema>;

/* Hiring Process */
export const HiringProcessSchema = z.object({
  steps: z.array(z.string().min(2, "Step is required")),
});
export type HiringProcessFormValues = z.infer<typeof HiringProcessSchema>;

/* Why Hire Us */
export const WhyHireUsSchema = z.object({
  title: z.string().min(2, "Title required"),
  details: z.array(
    z.object({
      title: z.string().min(2, "Detail title required"),
      description: z.string().min(2, "Detail description required"),
    }),
  ),
});
export type WhyHireUsFormValues = z.infer<typeof WhyHireUsSchema>;

/* Hire Dedicated */
export const HireDedicatedSchema = z.object({
  title: z.string().min(2, "Title required"),
  description: z.string().min(5, "Description required"),
  image: z.string().url("Image required"),
});
export type HireDedicatedFormValues = z.infer<typeof HireDedicatedSchema>;

/* Success Speaks */
export const SuccessSpeaksSchema = z.object({
  title: z.string().min(2, "Title required"),
  description: z.string().min(5, "Description required"),
  image: z.string().url("Image required"),
});
export type SuccessSpeaksFormValues = z.infer<typeof SuccessSpeaksSchema>;

/* Unlock Power */
export const UnlockPowerSchema = z.object({
  title: z.string().min(2, "Title required"),
  description: z.string().min(5, "Description required"),
  image: z.string().url("Image required"),
});
export type UnlockPowerFormValues = z.infer<typeof UnlockPowerSchema>;

/* Tech Stack */
export const TechStackDetailSchema = z.object({
  title: z.string().min(2, "Title required"),
  section: z.number().int().positive("Section must be a positive number"),
  keyPoints: z.array(z.string().min(2, "Key point is required")),
});
export type TechStackDetailFormValues = z.infer<typeof TechStackDetailSchema>;

export const TechStackSchema = z.object({
  title: z.string().min(2, "Title required"),
  description: z.string().min(5, "Description required"),
  details: z.array(TechStackDetailSchema),
});
export type TechStackFormValues = z.infer<typeof TechStackSchema>;

/* Hire Developers As Your Needs */
export const HireDevelopersAsYourNeedsSchema = z.object({
  title: z.string().min(2, "Title required"),
  planDetails: z.array(
    z.object({
      timelLine: z.string().min(2, "Timeline required"),
      price: z.string().min(1, "Price required"),
      keyPoints: z.array(z.string().min(2, "Key point required")),
    }),
  ),
  benefits: z.array(z.string().min(2, "Benefit required")),
});
export type HireDevelopersAsYourNeedsFormValues = z.infer<
  typeof HireDevelopersAsYourNeedsSchema
>;

/* Hire Page Main Schema */
export const HirePageDataSchema = z.object({
  category: z.string().min(2, "Category required"),
  subCategory: z.string().min(2, "Subcategory required"),
  title: z.string().min(2, "Title required"),
  slug: z.string().min(2, "Slug required"),
  description: z.string().min(5, "Description required"),
  keyPoints: z.array(z.string().min(2, "Key point required")),
  successSpeacks: SuccessSpeaksSchema,
  hireDevelopersAsYourNeeds: HireDevelopersAsYourNeedsSchema,
  hireDadiated: HireDedicatedSchema,
  ourExpertise: OurExpertiseSchema,
  techStack: TechStackSchema,
  whyHireUs: WhyHireUsSchema,
  unloackPower: UnlockPowerSchema,
  hireingProcess: HiringProcessSchema,
  faq: z.array(FAQSchema),
  seo: z.object({
    title: z.string(),
    keyphrase: z.string(),
    seoDescription: z.string(),
    featureImage: z.string().nullable().optional().or(z.literal("")),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type HirePageDataFormValues = z.infer<typeof HirePageDataSchema>;

/* -------------------- Hire Page Interfaces -------------------- */

export interface HireFAQ {
  question: string;
  answer: string;
}
export interface OurExpertise {
  keyPoints: string[];
}

export interface HiringProcess {
  steps: string[];
}

export interface WhyHireUsDetail {
  title: string;
  description: string;
}

export interface WhyHireUs {
  title: string;
  details: WhyHireUsDetail[];
}

export interface HireDedicated {
  title: string;
  description: string;
  image: string;
}

export interface SuccessSpeaks {
  title: string;
  description: string;
  image: string;
}

export interface UnlockPower {
  title: string;
  description: string;
  image: string;
}

export interface TechStackDetail {
  title: string;
  section: number;
  keyPoints: string[];
}

export interface TechStack {
  title: string;
  description: string;
  details: TechStackDetail[];
}

export interface HireDevelopersPlanDetail {
  timelLine: string;
  price: string;
  keyPoints: string[];
}

export interface HireDevelopersAsYourNeeds {
  title: string;
  planDetails: HireDevelopersPlanDetail[];
  benefits: string[];
}

export interface HirePageData {
  _id?: string;
  category: string;
  subCategory: string;
  title: string;
  slug: string;
  description: string;
  keyPoints: string[];
  successSpeacks: SuccessSpeaks;
  hireDevelopersAsYourNeeds: HireDevelopersAsYourNeeds;
  hireDadiated: HireDedicated; // matches your schema spelling (but I’d recommend renaming)
  ourExpertise: OurExpertise;
  techStack: TechStack;
  whyHireUs: WhyHireUs;
  unloackPower: UnlockPower; // matches schema spelling
  hireingProcess: HiringProcess;
  faq: HireFAQ[];
  seo?: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type OpenningPositionFormValues = z.infer<typeof OpenningPositionSchema>;

export interface OpenningPosition {
  _id: string;
  name: string;
  image: string;
  openning: number | string;
  qualifications: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
}

/* -------------------- Career Content -------------------- */
export const CareerHeroSectionSchema = z.object({
  image: z.string().url("Image is required"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});
export type CareerHeroSection = z.infer<typeof CareerHeroSectionSchema>;

export const CareerAtItsSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  image: z.string().url("Image is required"),
  points: z.array(z.string().min(2, "Point is required")),
});
export type CareerAtIts = z.infer<typeof CareerAtItsSchema>;

export const WhyJoinItsPointSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: z.string().url("Image is required"),
});
export type WhyJoinItsPoint = z.infer<typeof WhyJoinItsPointSchema>;

export const WhyJoinItsSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  points: z
    .array(WhyJoinItsPointSchema)
    .min(1, "At least one point is required"),
});
export type WhyJoinIts = z.infer<typeof WhyJoinItsSchema>;

export const CareerContentSchema = z.object({
  heroSection: CareerHeroSectionSchema,
  careerAtIts: CareerAtItsSchema,
  whyJoinIts: WhyJoinItsSchema,
  seo: z.object({
    title: z.string(),
    keyphrase: z.string(),
    seoDescription: z.string(),
    featureImage: z.string().nullable().optional().or(z.literal("")),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type CareerContentFormValues = z.infer<typeof CareerContentSchema>;

/* Interfaces (for fetched data) */
export interface CareerContent {
  _id?: string;
  heroSection: CareerHeroSection;
  careerAtIts: CareerAtIts;
  whyJoinIts: WhyJoinIts;
  seo: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ApplyPosition {
  _id: string;
  name: string;
  email: string;
  phone: string;
  graduation: string;
  experience: string;
  positionApplied: OpenningPosition;
  currentCTC: string;
  noticePeriod: string;
  message: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  href?: string;
  label: string;
  icon?: LucideIcon;
  adminOnly?: boolean;
  isTitle?: boolean;
  badge?: string | number;
  children?: NavItem[];
  target?: string;
}

export interface HireForm {
  _id: string;
  name: string;
  email: string;
  phone: string;
  recruitment: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

/* -------------------- MasterCourse -------------------- */

export interface MasterCourse {
  _id?: string;
  category: string;
  subCategory: string;
  courseTitle: string;
  slug: string;
  aboutCourseDescription: string;
  keyPointsOfTeachnology: {
    title: string;
    points: string[];
  }[];
  faqs: {
    question: string;
    answer: string[];
  }[];
  courseDuration: string;
  courseTime: string;
  skillLevel: string;
  createdAt?: string;
  updatedAt?: string;
}

export const MasterCourseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Subcategory is required"),
  courseTitle: z.string().min(1, "Course title is required"),
  slug: z.string().min(1, "Slug is required"),
  aboutCourseDescription: z
    .string()
    .min(1, "About course description is required"),
  keyPointsOfTeachnology: z
    .array(
      z.object({
        title: z.string().min(1, "Group title is required"),
        points: z
          .array(z.string().min(1, "Key point cannot be empty"))
          .min(1, "At least one key point is required"),
      }),
    )
    .min(1, "At least one technology group is required"),
  faqs: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z
        .array(z.string().min(1, "Answer cannot be empty"))
        .min(1, "At least one answer is required"),
    }),
  ),
  courseDuration: z.string().min(1, "Course duration is required"),
  courseTime: z.string().min(1, "Course time is required"),
  skillLevel: z.string().min(1, "Skill level is required"),
});

export type MasterCourseFormValues = z.infer<typeof MasterCourseSchema>;

/* -------------------- ProgrammingLanguageAndDesign -------------------- */

export interface ProgrammingLanguageAndDesign {
  _id?: string;
  category: string;
  subCategory: string;
  title: string;
  slug: string;
  descriptionOfCourse: string;
  courseDuration: string;
  courseTime: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  courseDetails: string[];
  keyPointsOfTechnology: {
    title: string;
    points: string[];
  }[];
  faqs: {
    question: string;
    answer: string[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export const ProgrammingLanguageAndDesignSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Subcategory is required"),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  descriptionOfCourse: z.string().min(1, "Description is required"),
  courseDuration: z.string().min(1, "Course duration is required"),
  courseTime: z.string().min(1, "Course time is required"),
  // skillLevel: z.enum(["beginner", "intermediate", "advanced"], {
  //   required_error: "Skill level is required",
  // }),
  skillLevel: z
    .enum(["beginner", "intermediate", "advanced"] as const)
    .refine((val) => val !== undefined, {
      message: "Skill level is required",
    }),
  courseDetails: z
    .array(z.string().min(1, "Course detail cannot be empty"))
    .min(1, "At least one course detail is required"),
  keyPointsOfTechnology: z
    .array(
      z.object({
        title: z.string().min(1, "Group title is required"),
        points: z
          .array(z.string().min(1, "Key point cannot be empty"))
          .min(1, "At least one key point is required"),
      }),
    )
    .min(1, "At least one technology group is required"),
  faqs: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z
        .array(z.string().min(1, "Answer cannot be empty"))
        .min(1, "At least one answer is required"),
    }),
  ),
});

export type ProgrammingLanguageAndDesignFormValues = z.infer<
  typeof ProgrammingLanguageAndDesignSchema
>;

// Add to your existing index.ts file

/* -------------------- SEO Manager -------------------- */
export const SeoManagerSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  seo_keyphrase: z.string().optional(),
  seo_title: z.string().optional(),
  meta_description: z
    .string()
    .max(500, "Meta description must be less than 160 characters")
    .optional(),
  cover_image: z
    .string()
    .url("Valid image URL required")
    .optional()
    .or(z.literal("")),
  // Add these new fields
  linkedService: z.string().optional(),
  linkedHirePage: z.string().optional(),
  linkedType: z
    .enum(["service", "hire", "independent"])
    .optional()
    .default("independent"),
  isAutoManaged: z.boolean().optional().default(false),
});

export type SeoManagerFormValues = z.infer<typeof SeoManagerSchema>;

export interface SeoManager {
  _id: string;
  title: string;
  slug: string;
  seo_keyphrase?: string;
  seo_title?: string;
  meta_description?: string;
  cover_image?: string;
  // Add these new fields
  linkedService?: string;
  linkedHirePage?: string;
  linkedType?: "service" | "hire" | "independent";
  isAutoManaged?: boolean;
  createdAt: string;
  updatedAt: string;
}
/* -------------------- About Us Content -------------------- */
export const HeroSectionAboutUsSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: z.string().url("A valid image URL is required"),
  points: z
    .array(
      z.object({
        label: z.string().min(2, "Label must be at least 2 characters"),
        image: z.string().url("Image URL is required"),
      }),
    )
    .min(1, "At least one point is required"),
});

export const WhoWeAreSchema = z.object({
  description: z
    .array(z.string().min(5, "Description must be at least 5 characters"))
    .min(1, "At least one description point is required"),
  image: z.string().url("A valid image URL is required"),
});

export const GoalsSchema = z.object({
  missionTitle: z.string().min(2, "Mission title is required"),
  missionDescription: z.string().min(5, "Mission description is required"),
  missionImage: z.string().url("Mission image URL is required"),
  visionTitle: z.string().min(2, "Vision title is required"),
  visionDescription: z.string().min(5, "Vision description is required"),
  visionImage: z.string().url("Vision image URL is required"),
  valuesTitle: z.string().min(2, "Values title is required"),
  valuesDescription: z.string().min(5, "Values description is required"),
  valuesImage: z.string().url("Values image URL is required"),
});
export const AboutUsSEOSchema = z.object({
  title: z.string(),
  keyphrase: z.string(),
  seoDescription: z.string(),
  featureImage: z.string().nullable().optional().or(z.literal("")),
});




export const AboutUsContentSchema = z.object({
  heroSection: HeroSectionAboutUsSchema,
  whoWeAre: WhoWeAreSchema,
  goals: GoalsSchema,
  seo: AboutUsSEOSchema,
});



export type AboutUsContentFormValues = z.infer<typeof AboutUsContentSchema>;

// This interface is for data coming from the API (includes _id, timestamps etc.)
export interface AboutUsContent {
  _id: string;
  heroSection: {
    title: string;
    description: string;
    image: string;
    points: {
      label: string;
      image: string;
    }[];
  };
  whoWeAre: {
    description: string[];
    image: string;
  };
  goals: {
    missionTitle: string;
    missionDescription: string;
    missionImage: string;
    visionTitle: string;
    visionDescription: string;
    visionImage: string;
    valuesTitle: string;
    valuesDescription: string;
    valuesImage: string;
  };
  seo: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage: string | null;
  };
  createdAt: string;
  updatedAt: string;
}


/* -------------------- Training Main Page Content -------------------- */
export const TrainingMainPageDataSchema = z.object({
  heroSection: z.object({
    subTitle: z.string().min(2, "Subtitle is required"),
    mainTitle: z.string().min(2, "Main title is required"),
    description: z.string().min(5, "Description is required"),
    image: z.string().url("A valid image URL is required"),
  }),
  aboutusSection: z.object({
    image: z.string().url("A valid image URL is required"),
    subTitle: z.string().min(2, "Subtitle is required"),
    mainTitle: z.string().min(2, "Main title is required"),
    description: z.string().min(5, "Description is required"),
    detailbox: z.object({
      title: z.string().min(2, "Detail box title is required"),
      detailbox: z
        .array(
          z.object({
            heading: z.string().min(2, "Heading is required"),
            description: z.string().min(5, "Description is required"),
          }),
        )
        .min(1, "At least one detail is required"),
    }),
  }),
  itsInstituteFacilitiesSection: z.object({
    title: z.string().min(2, "Title is required"),
    points: z
      .array(
        z.object({
          heading: z.string().min(2, "Heading is required"),
          image: z.string().url("A valid image URL is required"),
        }),
      )
      .min(1, "At least one facility point is required"),
  }),
  rightCoursePickSection: z.object({
    mainHeading: z.string().min(2, "Main heading is required"),
    cardBox: z
      .array(
        z.object({
          heading: z.string().min(2, "Card heading is required"),
          image: z.string().url("A valid image URL is required"),
        }),
      )
      .min(1, "At least one card is required"),
    subTitle: z.string().min(2, "Subtitle is required"),
    mainTitle: z.string().min(2, "Main title is required"),
    description: z.string().min(5, "Description is required"),
    detailbox: z
      .array(
        z.object({
          image: z.string().url("A valid image URL is required"),
          title: z.string().min(2, "Detail title is required"),
          description: z.string().min(5, "Detail description is required"),
        }),
      )
      .min(1, "At least one detail box is required"),
  }),
  seo: z.object({
    title: z.string(),
    keyphrase: z.string(),
    seoDescription: z.string(),
    featureImage: z.string().nullable().optional().or(z.literal("")),
  }),
});

export type TrainingMainPageDataFormValues = z.infer<
  typeof TrainingMainPageDataSchema
>;

// Interface for data coming from API (includes _id, etc.)
export interface TrainingMainPageData {
  _id: string;
  heroSection: {
    subTitle: string;
    mainTitle: string;
    description: string;
    image: string;
  };
  aboutusSection: {
    image: string;
    subTitle: string;
    mainTitle: string;
    description: string;
    detailbox: {
      title: string;
      detailbox: {
        heading: string;
        description: string;
      }[];
    };
  };
  itsInstituteFacilitiesSection: {
    title: string;
    points: {
      heading: string;
      image: string;
    }[];
  };
  rightCoursePickSection: {
    mainHeading: string;
    cardBox: {
      heading: string;
      image: string;
    }[];
    subTitle: string;
    mainTitle: string;
    description: string;
    detailbox: {
      image: string;
      title: string;
      description: string;
    }[];
  };
  seo: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface TranningContact {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  location: string;
  selectedCourse: string;
  createdAt: string;
  updatedAt: string;
}

/* -------------------- Our Services Main -------------------- */

// Point that links to a service
const ManualPointWithServiceSchema = z.object({
  label: z.string().min(1, "Label is required"),
  image: z.string().url("A valid image URL is required"),
  serviceId: z.string().min(1, "A service must be selected for each point"),
});

// Simple point with no service link
const ManualPointSimpleSchema = z.object({
  label: z.string().min(1, "Label is required"),
  image: z.string().url("A valid image URL is required"),
});

export const OurServiceHeroSectionSchema = z.object({
  image: z.string().url("A valid section image is required"),
  title: z.string().min(2, "Title is required"),
  points: z.array(ManualPointWithServiceSchema),
});

export const OurServiceTechnologyDetailSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  image: z.string().url("A valid section image is required"),
  technologyDetail: z.array(ManualPointSimpleSchema), // No serviceId
  developmentDetail: z.array(ManualPointWithServiceSchema), // Has serviceId
});

export const OurServicesMainSchema = z.object({
  mainTitle: z.string().min(5, "Main title is required"),
  description: z.string().min(10, "Description is required"),
  heroSections: z
    .array(OurServiceHeroSectionSchema)
    .min(1, "At least one hero section is required"),
  technologyDetails: z
    .array(OurServiceTechnologyDetailSchema)
    .min(1, "At least one technology detail section is required"),
  seo: z.object({
    title: z.string().optional().or(z.literal("")),
    keyphrase: z.string().optional().or(z.literal("")),
    seoDescription: z.string().optional().or(z.literal("")),
    featureImage: z.string().optional().or(z.literal("")),
  }),
});

export type OurServicesMainFormValues = z.infer<typeof OurServicesMainSchema>;

// Interface for data coming from API
export interface OurServicesMain {
  _id: string;
  mainTitle: string;
  description: string;
  heroSections: {
    _id?: string;
    image: string;
    title: string;
    points: {
      label: string;
      image: string;
      serviceId: {
        // This will be populated
        _id: string;
        slug: string;
        mainTitle: string;
      };
    }[];
  }[];
  technologyDetails: {
    _id?: string;
    title: string;
    description: string;
    image: string;
    technologyDetail: { label: string; image: string }[]; // Simple points
    developmentDetail: OurServicesMain["heroSections"][0]["points"]; // Points with populated serviceId
  }[];
  seo?: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage: string | null;
  };
}

/* -------------------- Home Page Content -------------------- */

// Schemas for nested objects
const TechnologySectionSchema = z.object({
  title: z.string().min(2, "Title is required"),
  // description: z.string().min(5, "Description is required"),
  // image: z.string().url("A valid image URL is required"),
});

const HeroSectionSchema = z.object({
  title: z.string().min(2, "Title is required"),
  // image: z.string().url("A valid image URL is required"),
  description: z.string().min(5, "Description is required"),
  technologySection: z.array(TechnologySectionSchema),
});

const DetailBoxSchema = z.object({
  // image: z.string().url("A valid image URL is required"),
  total: z.string().min(1, "Total is required"),
  title: z.string().min(2, "Title is required"),
});

const ReasonsToChooseSchema = z.object({
  // mainTitle: z.string().min(2, "Main title is required"),
  deatailBox: z.array(DetailBoxSchema), // Corrected spelling to match schema
});
const aiDetailBoxSchema = z.object({
  title: z.string().min(2, "Title is required"),
  heading: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  // gradient: z.string().min(5, "Gradient is required").optional(),
});

const aiSectionSchema = z.object({
  subtitle: z.string().min(2, "Title is required"),
  mainTitle: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  deatailBox: z.array(aiDetailBoxSchema),
});

const AboutDetailBoxSchema = z.object({
  label: z.string().min(2, "Label is required"),
  image: z.string().url("A valid image URL is required"),
});

const ButtonContentSchema = z.object({
  total: z.string().min(1, "Total is required"),
  label: z.string().min(2, "Label is required"),
  image: z.string().url("A valid image URL is required"),
});

const AboutOurCompanySchema = z.object({
  subtitle: z.string().min(2, "Subtitle is required"),
  mainTitle: z.string().min(2, "Main title is required"),
  description: z.string().min(5, "Description is required"),
  deatailBox: z.array(AboutDetailBoxSchema), // Corrected spelling to match schema
  image: z.string().url("A valid image URL is required"),
  buttonContent: ButtonContentSchema,
});

const OverseasDetailSchema = z.object({
  title: z.string().min(2, "Title is required"),
  subtitle: z.string().min(2, "Subtitle is required"),
});

const OverseasWebAgenciesSchema = z.object({
  mainTitle: z.string().min(2, "Main title is required"),
  image: z.string().url("A valid image URL is required"),
  desctiption: z.string().min(5, "Description is required"), // Corrected spelling to match schema
  detail: OverseasDetailSchema,
});

const SEOSchema= z.object({
    title: z.string(),
    keyphrase: z.string(),
    seoDescription: z.string(),
    featureImage: z.string().nullable().optional().or(z.literal("")),
  });

// Main Schema for the form
export const HomePageDataSchema = z.object({
  heroSecton: HeroSectionSchema,
  reasonsToChoose: ReasonsToChooseSchema,
  aisection: aiSectionSchema,
  aboutOurCompany: AboutOurCompanySchema,
  overseasWebAgencies: OverseasWebAgenciesSchema,
  seo: SEOSchema
});

export type HomePageDataFormValues = z.infer<typeof HomePageDataSchema>;

// Interface for data coming from the API
export interface HomePageData {
  _id: string;
  heroSecton: {
    // Matches your Mongoose schema key
    title: string;
    description: string;
    // image: string;
    technologySection: {
      title: string;
      // description: string;
      // image: string;
    }[];
  };
  reasonsToChoose: {
    // mainTitle: string;
    deatailBox: {
      // image: string;
      total: string;
      title: string;
    }[];
  };
  aisection: {
    subtitle: string;
    mainTitle: string;
    description: string;
    deatailBox: {
      title: string;
      heading: string;
      description: string;
      // gradient: string;
    }[];
  };
  aboutOurCompany: {
    subtitle: string;
    mainTitle: string;
    description: string;
    deatailBox: {
      label: string;
      image: string;
    }[];
    image: string;
    buttonContent: {
      total: string;
      label: string;
      image: string;
    };
  };
  overseasWebAgencies: {
    mainTitle: string;
    image: string;
    desctiption: string;
    detail: {
      title: string;
      subtitle: string;
    };
  };
  seo: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

/* -------------------- Hire Main Page Types -------------------- */

// Zod Schemas for Validation
const HireMainDevelopmentTeamSectionSchema = z.object({
  heading: z.string().min(2, "Heading is required"),
  description: z.string().min(5, "Description is required"),
  image: z.string().url("A valid image URL is required"),
});

const HireMainDedicatedDeveloperServiceItemBoxSchema = z.object({
  image: z.string().url("A valid image URL is required"),
  hirepageId: z.string().min(1, "A hire page must be selected"),
});

const HireMainDedicatedDeveloperServiceSchema = z.object({
  title: z.string().min(2, "Service category title is required"),
  serviceItemBox: z
    .array(HireMainDedicatedDeveloperServiceItemBoxSchema)
    .min(1, "At least one service item is required in a category"),
});

const HireMainDedicatedDeveloperSectionSchema = z.object({
  maintitle: z.string().min(2, "Main title is required"),
  services: z
    .array(HireMainDedicatedDeveloperServiceSchema)
    .min(1, "At least one service category is required"),
});

const HireMainWhyHireDetailBoxSchema = z.object({
  image: z.string().url("A valid image URL is required"),
  label: z.string().min(2, "Label is required"),
});

const HireMainWhyHireDeveloperForYourProjectSchema = z.object({
  mainTitle: z.string().min(2, "Main title is required"),
  detailBox: z
    .array(HireMainWhyHireDetailBoxSchema)
    .min(1, "At least one detail box is required"),
});

const HireMainWhyChooseDetailBoxSchema = z.object({
  image: z.string().url("A valid image URL is required"),
  label: z.string().min(2, "Label is required"),
  description: z.string().min(5, "Description is required"), // Using textarea
});

const HireMainWhyChooseItsForDedicatedResourcesSchema = z.object({
  mainTitle: z.string().min(2, "Main title is required"),
  detailBox: z
    .array(HireMainWhyChooseDetailBoxSchema)
    .min(1, "At least one detail box is required"),
});

// ✅ UPDATED: Removed 'description' from this schema
const HireMainDedicatedResourcesAndTalentsSchema = z.object({
  subTitle: z.string().min(2, "Subtitle is required"),
  mainTitle: z.string().min(2, "Main title is required"),
  keyPoints: z
    .array(z.string().min(2, "Key point is required"))
    .min(1, "At least one key point is required"),
  buttonTitle: z.string().min(2, "Button title is required"),
});

export const HireMainPageDataSchema = z.object({
  mainTitle: z.string().min(5, "Main title is required"),
  description: z.string().min(10, "Description is required"),
  developmentTeamSection: HireMainDevelopmentTeamSectionSchema,
  dedicatedDeveloperSection: HireMainDedicatedDeveloperSectionSchema,
  whyHireDeveloperforYourProject: HireMainWhyHireDeveloperForYourProjectSchema,
  whyChooseItsForDedicatedResources:
    HireMainWhyChooseItsForDedicatedResourcesSchema,
  hireDedicatedResourcesAndTalents: z
    .array(HireMainDedicatedResourcesAndTalentsSchema)
    .min(1, "At least one resources section is required"),
  pricePathAndFAQ: z
    .string()
    .min(1, "A hire page for pricing and FAQ must be selected"),
  seo: z.object({
    title: z.string().optional().or(z.literal("")),
    keyphrase: z.string().optional().or(z.literal("")),
    seoDescription: z.string().optional().or(z.literal("")),
    featureImage: z.string().optional().or(z.literal("")),
  }),
});

export type HireMainPageDataFormValues = z.infer<typeof HireMainPageDataSchema>;

// TypeScript Interfaces for API Data
interface HirePageLink {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subCategory: string;
}

export interface HireMainPageData {
  _id: string;
  mainTitle: string;
  description: string;
  developmentTeamSection: {
    heading: string;
    description: string;
    image: string;
  };
  dedicatedDeveloperSection: {
    maintitle: string;
    services: {
      _id?: string;
      title: string;
      serviceItemBox: {
        _id?: string;
        image: string;
        hirepageId: HirePageLink;
      }[];
    }[];
  };
  whyHireDeveloperforYourProject: {
    mainTitle: string;
    detailBox: {
      image: string;
      label: string;
    }[];
  };
  whyChooseItsForDedicatedResources: {
    mainTitle: string;
    detailBox: {
      image: string;
      label: string;
      description: string;
    }[];
  };
  // ✅ UPDATED: Removed 'description' from this interface
  hireDedicatedResourcesAndTalents: {
    subTitle: string;
    mainTitle: string;
    keyPoints: string[];
    buttonTitle: string;
  }[];
  pricePathAndFAQ: HirePageLink;
  seo?: {
    title: string;
    keyphrase: string;
    seoDescription: string;
    featureImage: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Enquiry {
  _id: string;
  type: "Career" | "Training" | "Contact" | "Hire" | "FooterForm";
  name: string;
  firstname?: string;
  lastname?: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  // Career Specific
  graduation?: string;
  experience?: string;
  positionApplied?: {
    _id: string;
    name: string;
  } | null;
  currentCTC?: string;
  noticePeriod?: string;
  // Training Specific
  location?: string;
  selectedCourse?: string;
  // Contact/Hire Specific
  budget?: string;
  recruitment?: string;
  source?: string;
  // File
  fileUrl?: string | null;
  // Admin Metadata
  status: "Pending" | "Reviewed" | "Contacted" | "Closed";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

/* -------------------- Yoast SEO -------------------- */
export interface YoastSEO {
  _id: string;
  seo_keyphrase: string;
  seo_title: string;
  meta_description: string;
  cover_image: string;
  page_description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface YoastSEOFormValues {
  seo_keyphrase: string;
  seo_title: string;
  meta_description: string;
  cover_image: string;
  page_description: string;
}

/* -------------------- Website Settings -------------------- */
export interface SocialMedia {
  _id?: string;
  socialMediaName: string;
  link: string;
  image: string;
}

export interface WebsiteSettingsEmail {
  _id?: string;
  email: string;
  emailType: "hr" | "sales" | "contact";
}

export interface WebsiteSettings {
  _id: string;
  favicon: string;
  logo_img: string;
  address: string[];
  emails: WebsiteSettingsEmail[];
  phone: string[];
  social_media: SocialMedia[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WebsiteSettingsFormValues {
  favicon: string;
  logo_img: string;
  address: { value: string }[];
  emails: { email: string; emailType: "hr" | "sales" | "contact" }[];
  phone: { value: string }[];
  social_media: { socialMediaName: string; link: string; image: string; }[];
}
