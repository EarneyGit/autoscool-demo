export interface Course {
  id: string;
  name: string;
  category: string;
  type: "mandatory" | "recommended" | "optional";
  duration: string;
  price: string;
  description: string;
  validity?: string;
  timing?: string;
  modules?: string[];
}

export interface Package {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  savings: string;
  includes: string[];
  description: string;
}

export interface Instructor {
  id: string;
  name: string;
  specialties: string[];
  languages: string[];
  experience: string;
  image: string;
}

export interface Statistic {
  category: string;
  rate: string;
  average: string;
  description: string;
}

// Course Data
export const courses: Course[] = [
  // Common Mandatory Courses
  {
    id: "first-aid",
    name: "First Aid Course (Samaritans)",
    category: "Common",
    type: "mandatory",
    duration: "10 hours",
    price: "CHF 120-150",
    description:
      "Mandatory certificate for license application. Covers CPR, recovery position, hemorrhages, fractures.",
    validity: "10 years",
    timing: "Before learner's permit",
  },
  {
    id: "theory-exam",
    name: "Theory Exam",
    category: "Common",
    type: "mandatory",
    duration: "Variable",
    price: "CHF 35",
    description: "Common base for car/motorcycle licenses.",
    validity: "Permanent",
    timing: "Before learner's permit",
  },
  {
    id: "traffic-awareness",
    name: "Traffic Awareness Course",
    category: "Common",
    type: "mandatory",
    duration: "8 hours (2 sessions)",
    price: "CHF 300-400",
    description:
      "Covers vision, road users, environment, physical forces. Required for exam registration.",
    validity: "Permanent",
    timing: "Before practical exam",
  },

  // Car Courses - Category B
  {
    id: "road-theory",
    name: "Road Theory Course",
    category: "Car (B)",
    type: "recommended",
    duration: "8-12 sessions of 90 minutes",
    price: "CHF 200-350",
    description:
      "Theory exam preparation covering road signs, right-of-way, speeds, distances.",
    timing: "Before theory exam",
  },
  {
    id: "car-driving-lessons",
    name: "Practical Car Driving Lessons",
    category: "Car (B)",
    type: "recommended",
    duration: "45-90 minutes per lesson",
    price: "CHF 80-100/lesson",
    description:
      "Dual-control vehicles mandatory. Average 25-35 lessons for beginners.",
    timing: "After learner's permit",
  },
  {
    id: "car-2phase-1",
    name: "2-Phase Car Training (Phase 1)",
    category: "Car (B)",
    type: "mandatory",
    duration: "8 hours",
    price: "CHF 350-450",
    description: "Eco-driving, dangerous situations, night driving.",
    timing: "3-9 months after license",
  },
  {
    id: "car-2phase-2",
    name: "2-Phase Car Training (Phase 2)",
    category: "Car (B)",
    type: "mandatory",
    duration: "8 hours",
    price: "CHF 350-450",
    description: "Advanced eco-driving and safety techniques.",
    timing: "6-12 months after license",
  },

  // Motorcycle Courses - Category A1
  {
    id: "cbm-a1-module1",
    name: "CBM A1 - Module 1",
    category: "Motorcycle A1",
    type: "mandatory",
    duration: "4 hours",
    price: "CHF 200-250",
    description: "Slow-speed maneuverability and balance training.",
    timing: "Within 4 months of learner's permit",
  },
  {
    id: "cbm-a1-module2",
    name: "CBM A1 - Module 2",
    category: "Motorcycle A1",
    type: "mandatory",
    duration: "4 hours",
    price: "CHF 200-250",
    description: "Road traffic and independence training.",
    timing: "After Module 1",
  },
  {
    id: "a1-driving-lessons",
    name: "A1 Driving Lessons",
    category: "Motorcycle A1",
    type: "recommended",
    duration: "50 minutes per lesson",
    price: "CHF 90-110/lesson",
    description: "Recommended 10-20 lessons depending on experience.",
    timing: "After full CBM",
  },

  // Motorcycle Courses - Category A
  {
    id: "cbm-a-module1",
    name: "CBM A - Module 1",
    category: "Motorcycle A",
    type: "mandatory",
    duration: "4 hours",
    price: "CHF 200-250",
    description: "Slow maneuverability, balance, and slalom training.",
    timing: "Within 4 months of learner's permit",
  },
  {
    id: "cbm-a-module2",
    name: "CBM A - Module 2",
    category: "Motorcycle A",
    type: "mandatory",
    duration: "4 hours",
    price: "CHF 200-250",
    description: "Sporty maneuverability and emergency braking.",
    timing: "After Module 1",
  },
  {
    id: "cbm-a-module3",
    name: "CBM A - Module 3",
    category: "Motorcycle A",
    type: "mandatory",
    duration: "4 hours",
    price: "CHF 200-250",
    description: "Road traffic, independence, and anticipation.",
    timing: "After Module 2",
  },

  // Professional Licenses
  {
    id: "truck-theory",
    name: "Heavy Vehicle Theory Course",
    category: "Trucks (C/C1)",
    type: "mandatory",
    duration: "Variable",
    price: "CHF 800-1200",
    description:
      "Transport regulations, driving and rest times, load securing.",
    timing: "Before exam",
  },
  {
    id: "taxi-course",
    name: "Professional Taxi Course",
    category: "Taxi (B121/B122)",
    type: "mandatory",
    duration: "40 hours",
    price: "CHF 600-1000",
    description:
      "Local topographical knowledge, taxi regulations, customer relations.",
    timing: "Post-license B",
  },
];

// Package Data
export const packages: Package[] = [
  {
    id: "complete-car",
    name: "Complete Car Package",
    category: "Car",
    price: "CHF 2,500-3,500",
    originalPrice: "CHF 3,000-4,100",
    savings: "15%",
    includes: [
      "All mandatory courses included",
      "25 practical driving lessons",
      "Exam accompaniment",
      "Comprehensive theoretical support",
    ],

    description:
      "Everything you need to get your car license with significant savings.",
  },
  {
    id: "complete-moto-a",
    name: "Complete Moto A Package",
    category: "Motorcycle",
    price: "CHF 1,800-2,500",
    originalPrice: "CHF 2,250-3,125",
    savings: "20%",
    includes: [
      "Full CBM (12h)",
      "10 driving lessons",
      "2-Phase training included",
      "All mandatory courses",
    ],

    description: "Complete motorcycle training package with maximum savings.",
  },
  {
    id: "combined-license",
    name: "Complete License Package (Car + Motorcycle)",
    category: "Combined",
    price: "CHF 3,800-5,200",
    originalPrice: "CHF 5,100-6,900",
    savings: "25%",
    includes: [
      "Complete car training",
      "Moto A1 or A training",
      "All common mandatory courses",
      "Priority scheduling",
    ],

    description: "Ultimate package for both car and motorcycle licenses.",
  },
];

// Instructor Data
export const instructors: Instructor[] = [
  {
    id: "instructor-1",
    name: "Marc Dubois",
    specialties: ["Car (B)", "Motorcycle (A/A1)", "Advanced Safety"],
    languages: ["French", "English", "German"],
    experience: "12 years",
    image: "https://github.com/yusufhilmi.png",
  },
  {
    id: "instructor-2",
    name: "Sophie Mueller",
    specialties: ["Car (B)", "Senior Courses", "Adapted Driving"],
    languages: ["German", "French", "Italian"],
    experience: "8 years",
    image: "https://github.com/kdrnp.png",
  },
  {
    id: "instructor-3",
    name: "Antonio Rossi",
    specialties: ["Motorcycle (A/A1)", "Off-Road", "Sport Riding"],
    languages: ["Italian", "French", "English"],
    experience: "15 years",
    image: "https://github.com/yahyabedirhan.png",
  },
  {
    id: "instructor-4",
    name: "Elena Kowalski",
    specialties: ["Trucks (C/D)", "Professional Licenses", "Taxi"],
    languages: ["French", "Polish", "English"],
    experience: "10 years",
    image: "https://github.com/denizbuyuktas.png",
  },
];

// Statistics Data
export const statistics: Statistic[] = [
  {
    category: "Theory Exam",
    rate: "85%",
    average: "75%",
    description: "Success rate vs Swiss average",
  },
  {
    category: "Car Practical Exam",
    rate: "78%",
    average: "68%",
    description: "Success rate vs Swiss average",
  },
  {
    category: "Motorcycle Practical Exam A",
    rate: "82%",
    average: "72%",
    description: "Success rate vs Swiss average",
  },
  {
    category: "Motorcycle Practical Exam A1",
    rate: "88%",
    average: "80%",
    description: "Success rate vs Swiss average",
  },
];

// Navigation Data
export const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Courses",
    href: "/courses",
    submenu: [
      { title: "Car Courses (B)", href: "/courses/car" },
      { title: "Motorcycle Courses (A/A1)", href: "/courses/motorcycle" },
      { title: "Professional Licenses", href: "/courses/professional" },
      { title: "Specialized Training", href: "/courses/specialized" },
    ],
  },
  {
    title: "Packages",
    href: "/packages",
    submenu: [
      { title: "Car Packages", href: "/packages/car" },
      { title: "Motorcycle Packages", href: "/packages/motorcycle" },
      { title: "Combined Offers", href: "/packages/combined" },
      { title: "Premium Services", href: "/packages/premium" },
    ],
  },
  {
    title: "About",
    href: "/about",
    submenu: [
      { title: "Our School", href: "/about/school" },
      { title: "Instructors", href: "/about/instructors" },
      { title: "Fleet & Facilities", href: "/about/fleet" },
      { title: "Success Stories", href: "/about/success" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    submenu: [
      { title: "Registration Process", href: "/services/registration" },
      { title: "Exam Preparation", href: "/services/exam-prep" },
      { title: "Premium Services", href: "/services/premium" },
      { title: "Support & Follow-up", href: "/services/support" },
    ],
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

// Company Information
export const companyInfo = {
  name: "Swiss Drive Academy",
  tagline: "Your Path to Safe Driving Excellence",
  description:
    "Premier Autoscool offering comprehensive training for all license categories with certified instructors and proven success rates.",
  phone: "079 423 26 96",
  email: "info@autoscool.ch",
  address: "123 Route de Genève, 1000 Lausanne, Switzerland",
  hours: {
    weekdays: "8:00 - 19:00",
    saturday: "8:00 - 17:00",
    sunday: "Closed",
  },
  social: {
    facebook: "https://facebook.com/swissdriveacademy",
    instagram: "https://instagram.com/swissdriveacademy",
    linkedin: "https://linkedin.com/company/swissdriveacademy",
  },
};
