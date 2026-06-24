/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
  stats?: any;
  message?: string;
}


// ✅ આ ટાઇપ્સ તમારી types ફાઇલમાં નીચે મુજબ ઉમેરો
export interface NavLink {
  label: string;
  href: string;
}

export interface NavCategoryGroup {
  category: string;
  links: NavLink[];
}

export interface NavigationStructure {
  mainNav: NavLink[];
  servicesNav: NavCategoryGroup[];
  hireNav: NavCategoryGroup[];
}


export interface SingleResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}


export interface WhyChooseIts {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  image?: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutUs {
	_id: string;
	heroSection: {
		title: string;
    subtitle: string;
		description: string;
		image: string;
    ratings: {
      rating: number;
      image: string;
    }[];
		// points: {
		// 	label: string;
		// 	image: string;
		// }[];
	};
  whyCompany: {
    title: string;
    description: string;
    companyDetails: {
      image: string;
      title: string;
      description: string;
    }[];
  };
	// whoWeAre: {
	// 	description: string[];
	// 	image: string;
	// };
	goals: {
    goalsDetails: {
      title: string;
      description: string;
    };
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
  flags: {
    title: string;
    flagsDetails: {
      image: string;
      title: string;
    }[];
  }
	createdAt: string;
	updatedAt: string;
}
export interface EngagementModel {
  _id: string;
  modelTitle: string;
  modelDescription: string;
  modelImage: string;
  keyPoints: string[];
  supportModel?: string;
}

export interface Testimonial {
  name: string;
  location: string;
  description: string;
  image?: string;
}

export interface WhyChooseItem {
  id: number;
  title: string;
  description: string;
  image: string;
  borderColor: string;
}


// types/ITSService.ts

export interface ContentBlock {
  title: string;
  description: string;
  image: string;
}

export interface WhyWorkWithThisContent {
  title: string;
  description: string;
}

export interface WhyWorkWithThis {
  description: string;
  title: string;
  image: string;
  content: WhyWorkWithThisContent[];
}


export interface ToolsAndTechnologyDetail {
  title: string;
  section: number;
  keyPoints: string[];
}

export interface ToolsAndTechnology {
  title: string;
  description: string;
  details: ToolsAndTechnologyDetail[];
}

export interface WhyCompanyPrefersContent {
  name: string;
  image: string;
}

export interface WhyCompanyPrefersThis {
  title: string;
  description: string;
  content: WhyCompanyPrefersContent[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ITSService {
  _id: { $oid: string };
  category: string;
  subCategory: string;
  mainTitle: string;
  description: string;
  subMainTitle: string;
  subMainTitleDescription: string;
  contentBlocks: ContentBlock[];
  WhyWorkWithThis: WhyWorkWithThis;
  workProgress: string;
  toolsAndTechnology: ToolsAndTechnology;
  whyCompanyPerfersThis: WhyCompanyPrefersThis;
  faqs: FAQ[];
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
  slug: string;
}

export interface ExpertiesIndustries {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type ITSServiceList = ITSService[];

export interface PortfolioContent {
  _id: string;
  heroSection: {
    title: string;
    description: string;
    image: string;
    // points: {
    //   label: string;
    //   image: string;
    // }[];
  };
  createdAt: string;
  updatedAt: string;
}
export interface PortfolioCategory {
  _id: string;
  category: string;
  image: string;
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

interface BlogCategory {
  _id: string;
  category: string;
}

interface BlogSubCategory {
  _id: string;
  subcategory: string;
}

export interface Blog {
  slug: string;
  // subCategories: string;
  // categories: string;
  categories: string | BlogCategory;

  subCategories: string | BlogSubCategory;
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
};

/* -------------------- Career Content Interfaces -------------------- */

export interface HeroSection {
  image: string;
  title: string;
  description: string;
}

export interface CareerAtIts {
  title: string;
  image: string;
  points: string[];
}

export interface WhyJoinItsPoint {
  title: string;
  description: string;
  image: string;
}

export interface WhyJoinIts {
  title: string;
  points: WhyJoinItsPoint[];
}

export interface CareerContent {
  _id?: string;
  heroSection: HeroSection;
  careerAtIts: CareerAtIts;
  whyJoinIts: WhyJoinIts;
  createdAt?: string;
  updatedAt?: string;
}


/* ------------------- openning position ------------------------------ */

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


// --- NEW: Interface for the Apply Position Form ---
export interface ApplyPositionFormValues {
  name: string;
  email: string;
  phone: string;
  graduation: string;
  experience: string;
  positionApplied: string;
  currentCTC: string;
  noticePeriod: string;
  message: string;
  file?: FileList;
}


/* -------------------- Hire Page Data Interfaces -------------------- */

export interface FAQ {
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

export interface PlanDetail {
  timelLine: string;
  price: string;
  keyPoints: string[];
}

export interface HireDevelopersAsYourNeeds {
  title: string;
  planDetails: PlanDetail[];
  benefits: string[];
}

export interface HirePageData {
  _id: string;
  category: string;
  subCategory: string;
  title: string;
  slug: string;
  description: string;
  keyPoints: string[];
  successSpeacks: SuccessSpeaks;
  hireDevelopersAsYourNeeds: HireDevelopersAsYourNeeds;
  hireDadiated: HireDedicated;
  ourExpertise: OurExpertise;
  techStack: TechStack;
  whyHireUs: WhyHireUs;
  unloackPower: UnlockPower;
  hireingProcess: HiringProcess;
  faq: FAQ[];
  createdAt: string;
  updatedAt: string;
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
  createdAt?: string;
  updatedAt?: string;
}

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
      serviceId: { // This will be populated
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
    technologyDetail: { label: string; image: string; }[]; // Simple points
    developmentDetail: OurServicesMain['heroSections'][0]['points']; // Points with populated serviceId
  }[];
}

export interface HomePageData {
  _id: string;
  heroSecton: { // Matches your Mongoose schema key
    title: string;
    // image: string;
    description: string;
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
      gradient: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface dedicatedDeveloperSectionService {
  _id?: string;
  title: string;
  serviceItemBox: {
    _id?: string;
    image: string;
    hirepageId: {
      _id: string;
      title: string;
      slug: string;
      category: string;
      subCategory: string;
    };
  }[];
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
    services: dedicatedDeveloperSectionService[];
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
  pricePathAndFAQ: {
    _id: string;
    title: string;
    slug: string;
    category: string;
    subCategory: string;
    hireDevelopersAsYourNeeds: HireDevelopersAsYourNeeds;
    faq: FAQ[];
  };
  createdAt?: string;
  updatedAt?: string;
}


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
  linkedType?: 'service' | 'hire' | 'independent';
  isAutoManaged?: boolean;
  createdAt: string;
  updatedAt: string;
}