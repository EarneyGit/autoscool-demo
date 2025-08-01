import { useLanguage } from '@/contexts/LanguageContext';
import { Course, Package, Instructor, Statistic } from './driving-school-data';

// Multilingual course data
export const getMultilingualCourses = (language: 'en' | 'fr'): Course[] => {
  const coursesData = {
    en: [
      {
        id: "first-aid",
        name: "First Aid Course (Samaritans)",
        category: "Common",
        type: "mandatory" as const,
        duration: "10 hours",
        price: "CHF 120-150",
        description: "Mandatory certificate for license application. Covers CPR, recovery position, hemorrhages, fractures.",
        validity: "10 years",
        timing: "Before learner's permit",
      },
      {
        id: "theory-exam",
        name: "Theory Exam",
        category: "Common",
        type: "mandatory" as const,
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
        type: "mandatory" as const,
        duration: "8 hours (2 sessions)",
        price: "CHF 300-400",
        description: "Covers vision, road users, environment, physical forces. Required for exam registration.",
        validity: "Permanent",
        timing: "Before practical exam",
      },
      {
        id: "road-theory",
        name: "Road Theory Course",
        category: "Car (B)",
        type: "recommended" as const,
        duration: "8-12 sessions of 90 minutes",
        price: "CHF 200-350",
        description: "Theory exam preparation covering road signs, right-of-way, speeds, distances.",
        timing: "Before theory exam",
      },
      {
        id: "car-driving-lessons",
        name: "Practical Car Driving Lessons",
        category: "Car (B)",
        type: "recommended" as const,
        duration: "45-90 minutes per lesson",
        price: "CHF 80-100/lesson",
        description: "Dual-control vehicles mandatory. Average 25-35 lessons for beginners.",
      },
    ],
    fr: [
      {
        id: "first-aid",
        name: "Cours de Premiers Secours (Samaritains)",
        category: "Commun",
        type: "mandatory" as const,
        duration: "10 heures",
        price: "CHF 120-150",
        description: "Certificat obligatoire pour la demande de permis. Couvre la RCP, position latérale de sécurité, hémorragies, fractures.",
        validity: "10 ans",
        timing: "Avant le permis d'élève",
      },
      {
        id: "theory-exam",
        name: "Examen Théorique",
        category: "Commun",
        type: "mandatory" as const,
        duration: "Variable",
        price: "CHF 35",
        description: "Base commune pour les permis auto/moto.",
        validity: "Permanent",
        timing: "Avant le permis d'élève",
      },
      {
        id: "traffic-awareness",
        name: "Cours de Sensibilisation à la Circulation",
        category: "Commun",
        type: "mandatory" as const,
        duration: "8 heures (2 séances)",
        price: "CHF 300-400",
        description: "Couvre la vision, les usagers de la route, l'environnement, les forces physiques. Requis pour l'inscription à l'examen.",
        validity: "Permanent",
        timing: "Avant l'examen pratique",
      },
      {
        id: "road-theory",
        name: "Cours de Théorie Routière",
        category: "Auto (B)",
        type: "recommended" as const,
        duration: "8-12 séances de 90 minutes",
        price: "CHF 200-350",
        description: "Préparation à l'examen théorique couvrant les panneaux routiers, priorités, vitesses, distances.",
        timing: "Avant l'examen théorique",
      },
      {
        id: "car-driving-lessons",
        name: "Leçons de Conduite Pratique Auto",
        category: "Auto (B)",
        type: "recommended" as const,
        duration: "45-90 minutes par leçon",
        price: "CHF 80-100/leçon",
        description: "Véhicules à double commande obligatoires. Moyenne de 25-35 leçons pour débutants.",
      },
    ],
  };

  return coursesData[language];
};

// Multilingual package data
export const getMultilingualPackages = (language: 'en' | 'fr'): Package[] => {
  const packagesData = {
    en: [
      {
        id: "basic-car",
        name: "Basic Car Package",
        category: "Car",
        price: "CHF 1,200",
        originalPrice: "CHF 1,400",
        savings: "CHF 200",
        includes: [
          "Theory course (8 sessions)",
          "10 practical lessons",
          "Traffic awareness course",
          "Exam registration support"
        ],
        description: "Perfect starter package for new drivers",
      },
      {
        id: "premium-car",
        name: "Premium Car Package",
        category: "Car",
        price: "CHF 2,100",
        originalPrice: "CHF 2,500",
        savings: "CHF 400",
        includes: [
          "Theory course (12 sessions)",
          "20 practical lessons",
          "Traffic awareness course",
          "Mock exams (3 sessions)",
          "Exam registration support",
          "Highway driving training"
        ],
        description: "Comprehensive package with extra practice and support",
      },
    ],
    fr: [
      {
        id: "basic-car",
        name: "Forfait Auto de Base",
        category: "Auto",
        price: "CHF 1,200",
        originalPrice: "CHF 1,400",
        savings: "CHF 200",
        includes: [
          "Cours de théorie (8 séances)",
          "10 leçons pratiques",
          "Cours de sensibilisation à la circulation",
          "Support pour l'inscription à l'examen"
        ],
        description: "Forfait de démarrage parfait pour nouveaux conducteurs",
      },
      {
        id: "premium-car",
        name: "Forfait Auto Premium",
        category: "Auto",
        price: "CHF 2,100",
        originalPrice: "CHF 2,500",
        savings: "CHF 400",
        includes: [
          "Cours de théorie (12 séances)",
          "20 leçons pratiques",
          "Cours de sensibilisation à la circulation",
          "Examens blancs (3 séances)",
          "Support pour l'inscription à l'examen",
          "Formation conduite autoroute"
        ],
        description: "Forfait complet avec pratique supplémentaire et support",
      },
    ],
  };

  return packagesData[language];
};

// Multilingual instructor data
export const getMultilingualInstructors = (language: 'en' | 'fr'): Instructor[] => {
  const instructorsData = {
    en: [
      {
        id: "jean-pierre",
        name: "Jean-Pierre Dubois",
        specialties: ["Car Training", "Highway Driving", "Nervous Drivers"],
        languages: ["French", "English", "German"],
        experience: "15 years",
        image: "/instructors/jean-pierre.jpg",
      },
      {
        id: "marie-claire",
        name: "Marie-Claire Rousseau",
        specialties: ["Motorcycle Training", "Advanced Techniques", "Women Drivers"],
        languages: ["French", "English", "Italian"],
        experience: "12 years",
        image: "/instructors/marie-claire.jpg",
      },
    ],
    fr: [
      {
        id: "jean-pierre",
        name: "Jean-Pierre Dubois",
        specialties: ["Formation Auto", "Conduite Autoroute", "Conducteurs Nerveux"],
        languages: ["Français", "Anglais", "Allemand"],
        experience: "15 ans",
        image: "/instructors/jean-pierre.jpg",
      },
      {
        id: "marie-claire",
        name: "Marie-Claire Rousseau",
        specialties: ["Formation Moto", "Techniques Avancées", "Conductrices"],
        languages: ["Français", "Anglais", "Italien"],
        experience: "12 ans",
        image: "/instructors/marie-claire.jpg",
      },
    ],
  };

  return instructorsData[language];
};

// Multilingual statistics data
export const getMultilingualStatistics = (language: 'en' | 'fr'): Statistic[] => {
  const statisticsData = {
    en: [
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
    ],
    fr: [
      {
        category: "Examen Théorique",
        rate: "85%",
        average: "75%",
        description: "Taux de réussite vs moyenne suisse",
      },
      {
        category: "Examen Pratique Auto",
        rate: "78%",
        average: "68%",
        description: "Taux de réussite vs moyenne suisse",
      },
      {
        category: "Examen Pratique Moto A",
        rate: "82%",
        average: "72%",
        description: "Taux de réussite vs moyenne suisse",
      },
      {
        category: "Examen Pratique Moto A1",
        rate: "88%",
        average: "80%",
        description: "Taux de réussite vs moyenne suisse",
      },
    ],
  };

  return statisticsData[language];
};

// Hook to get multilingual data
export const useMultilingualData = () => {
  const { language } = useLanguage();

  return {
    courses: getMultilingualCourses(language),
    packages: getMultilingualPackages(language),
    instructors: getMultilingualInstructors(language),
    statistics: getMultilingualStatistics(language),
  };
};