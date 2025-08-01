import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation function
const getTranslation = (key: string, language: Language): string => {
  const translations = getTranslations();
  const keys = key.split('.');
  let value: Record<string, unknown> | string = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
};

// Translations object
const getTranslations = () => ({
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      packages: 'Packages',
      about: 'About',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
      carCourses: 'Car Courses (B)',
      motorcycleCourses: 'Motorcycle Courses (A/A1)',
      professionalLicenses: 'Professional Licenses',
      specializedTraining: 'Specialized Training',
      carPackages: 'Car Packages',
      motorcyclePackages: 'Motorcycle Packages',
      combinedOffers: 'Combined Offers',
      premiumServices: 'Premium Services',
      ourSchool: 'Our School',
      instructors: 'Instructors',
      fleetFacilities: 'Fleet & Facilities',
      successStories: 'Success Stories',
      registrationProcess: 'Registration Process',
      examPrep: 'Exam Preparation',
      supportFollowup: 'Support & Follow-up'
    },
    company: {
      name: 'Autoscool',
      tagline: 'Your Path to Safe Driving Excellence',
      description: 'Premier Autoscool driving school offering comprehensive training for all license categories with certified instructors and proven success rates.'
    },
    common: {
      bookLesson: 'Book Lesson',
      phone: 'Phone',
      email: 'Email',
      hours: 'Hours',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
      weekdays: 'Mon-Fri',
      language: 'Language'
    },
    courses: {
      firstAid: 'First Aid Course (Samaritans)',
      theoryExam: 'Theory Exam',
      trafficAwareness: 'Traffic Awareness Course',
      roadTheory: 'Road Theory Course',
      carDrivingLessons: 'Practical Car Driving Lessons',
      mandatory: 'Mandatory',
      recommended: 'Recommended',
      optional: 'Optional',
      duration: 'Duration',
      price: 'Price',
      description: 'Description',
      validity: 'Validity',
      timing: 'Timing'
    },
    home: {
      ratedDrivingSchool: '#1 Rated Driving School in Switzerland',
      heroTitle: 'Master the Road with',
      heroSubtitle: 'Swiss Excellence',
      heroDescription: 'Professional driving instruction for all license categories. Certified instructors, proven methods, and exceptional success rates.',
      startJourney: 'Start Your Journey',
      viewCourses: 'View Courses',
      successRate: 'Success Rate',
      expertInstructors: 'Expert Instructors',
      happyStudents: 'Happy Students',
      carLicense: 'Car License',
      motorcycle: 'Motorcycle',
      professional: 'Professional',
      specialized: 'Specialized',
      training: 'Training',
      provenExcellence: 'Proven Excellence',
      excellenceDescription: 'Our success rates speak for themselves. We consistently outperform Swiss averages.',
      featuredCourses: 'Featured Courses',
      coursesDescription: 'Start your driving journey with our most popular courses',
      viewAllCourses: 'View All Courses',
      bestPackages: 'Best Value Packages',
      packagesDescription: 'Save money with our comprehensive training packages',
      viewAllPackages: 'View All Packages',
      whyChooseUs: 'Why Choose Swiss Drive Academy?',
      certifiedInstructors: 'Certified Instructors',
      certifiedDescription: 'All our instructors are certified professionals with years of experience',
      modernFleet: 'Modern Fleet',
      modernFleetDescription: 'Learn with the latest vehicles equipped with dual controls and safety features',
      flexibleScheduling: 'Flexible Scheduling',
      flexibleDescription: 'Book lessons that fit your schedule with our convenient online booking system',
      provenResults: 'Proven Results',
      provenResultsDescription: 'High success rates and satisfied students across all license categories',
      readyToStart: 'Ready to Start Your Driving Journey?',
      readyDescription: 'Join thousands of drivers who have learned with Swiss Drive Academy',
      getStarted: 'Get Started Today',
      followUs: 'Follow us on Instagram',
      whyChooseUsDescription: 'Experience the difference with Switzerland\'s premier driving school.',
      certifiedExcellence: 'Certified Excellence',
      certifiedExcellenceDescription: 'All instructors are federally certified with continuous professional development.',
      provenSuccess: 'Proven Success',
      provenSuccessDescription: 'Consistently higher success rates than Swiss averages across all license categories.',
      personalizedTraining: 'Personalized Training',
      personalizedTrainingDescription: 'Individual assessment and customized training plans for optimal learning.',
      flexibleSchedulingDescription: 'Evening and weekend lessons available with home pickup service.',
      fiveStarService: '5-Star Service',
      fiveStarServiceDescription: '4.7/5 customer satisfaction rating with 92% recommendation rate.',
      readyToStartDescription: 'Join thousands of successful drivers who chose Swiss Drive Academy. Book your consultation today and take the first step towards driving independence.',
      bookConsultation: 'Book Free Consultation'
    },
    footer: {
      quickLinks: 'Quick Links',
      carCourses: 'Car Courses',
      motorcycleCourses: 'Motorcycle Courses',
      coursePackages: 'Course Packages',
      ourInstructors: 'Our Instructors',
      registrationProcess: 'Registration Process',
      courseCategories: 'Course Categories',
      carLicense: 'Car License (B)',
      motorcycle: 'Motorcycle (A/A1)',
      professionalLicenses: 'Professional Licenses',
      specializedTraining: 'Specialized Training',
      contactInfo: 'Contact Info',
      allRightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      legalNotice: 'Legal Notice',
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun'
    },
    chat: {
      howCanWeHelp: 'How can we help you?',
      talkToAI: 'Talk to AI Agent',
      aiDescription: 'Get instant answers to your questions',
      customerSupport: 'Chat with Customer Support',
      supportDescription: 'Connect with our support team'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      courses: 'Cours',
      packages: 'Forfaits',
      about: 'À Propos',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
      carCourses: 'Cours Auto (B)',
      motorcycleCourses: 'Cours Moto (A/A1)',
      professionalLicenses: 'Permis Professionnels',
      specializedTraining: 'Formation Spécialisée',
      carPackages: 'Forfaits Auto',
      motorcyclePackages: 'Forfaits Moto',
      combinedOffers: 'Offres Combinées',
      premiumServices: 'Services Premium',
      ourSchool: 'Notre École',
      instructors: 'Moniteurs',
      fleetFacilities: 'Flotte et Installations',
      successStories: 'Témoignages',
      registrationProcess: 'Processus d\'Inscription',
      examPrep: 'Préparation aux Examens',
      supportFollowup: 'Support et Suivi'
    },
    company: {
      name: 'Autoscool',
      tagline: 'Votre Chemin vers l\'Excellence en Conduite',
      description: 'École de conduite suisse de premier plan offrant une formation complète pour toutes les catégories de permis avec des moniteurs certifiés et des taux de réussite prouvés.'
    },
    common: {
      bookLesson: 'Réserver une Leçon',
      phone: 'Téléphone',
      email: 'E-mail',
      hours: 'Horaires',
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche',
      closed: 'Fermé',
      weekdays: 'Lun-Ven',
      language: 'Langue'
    },
    courses: {
      firstAid: 'Cours de Premiers Secours (Samaritains)',
      theoryExam: 'Examen Théorique',
      trafficAwareness: 'Cours de Sensibilisation à la Circulation',
      roadTheory: 'Cours de Théorie Routière',
      carDrivingLessons: 'Leçons de Conduite Pratique Auto',
      mandatory: 'Obligatoire',
      recommended: 'Recommandé',
      optional: 'Optionnel',
      duration: 'Durée',
      price: 'Prix',
      description: 'Description',
      validity: 'Validité',
      timing: 'Calendrier'
    },
    home: {
      ratedDrivingSchool: 'École de Conduite #1 en Suisse',
      heroTitle: 'Maîtrisez la Route avec',
      heroSubtitle: 'l\'Excellence Suisse',
      heroDescription: 'Formation de conduite professionnelle pour toutes les catégories de permis. Moniteurs certifiés, méthodes éprouvées et taux de réussite exceptionnels.',
      startJourney: 'Commencez Votre Parcours',
      viewCourses: 'Voir les Cours',
      successRate: 'Taux de Réussite',
      expertInstructors: 'Moniteurs Experts',
      happyStudents: 'Élèves Satisfaits',
      carLicense: 'Permis Auto',
      motorcycle: 'Moto',
      professional: 'Professionnel',
      specialized: 'Spécialisé',
      training: 'Formation',
      provenExcellence: 'Excellence Prouvée',
      excellenceDescription: 'Nos taux de réussite parlent d\'eux-mêmes. Nous surpassons constamment les moyennes suisses.',
      featuredCourses: 'Cours Vedettes',
      coursesDescription: 'Commencez votre parcours de conduite avec nos cours les plus populaires',
      viewAllCourses: 'Voir Tous les Cours',
      bestPackages: 'Forfaits Avantageux',
      packagesDescription: 'Économisez avec nos forfaits de formation complets',
      viewAllPackages: 'Voir Tous les Forfaits',
      whyChooseUs: 'Pourquoi Choisir l\'Académie de Conduite Suisse?',
      certifiedInstructors: 'Moniteurs Certifiés',
      certifiedDescription: 'Tous nos moniteurs sont des professionnels certifiés avec des années d\'expérience',
      modernFleet: 'Flotte Moderne',
      modernFleetDescription: 'Apprenez avec les derniers véhicules équipés de doubles commandes et de dispositifs de sécurité',
      flexibleScheduling: 'Horaires Flexibles',
      flexibleDescription: 'Réservez des leçons qui s\'adaptent à votre emploi du temps avec notre système de réservation en ligne pratique',
      provenResults: 'Résultats Prouvés',
      provenResultsDescription: 'Taux de réussite élevés et élèves satisfaits dans toutes les catégories de permis',
      readyToStart: 'Prêt à Commencer Votre Parcours de Conduite?',
      readyDescription: 'Rejoignez des milliers de conducteurs qui ont appris avec l\'Académie de Conduite Suisse',
      getStarted: 'Commencez Aujourd\'hui',
      followUs: 'Suivez-nous sur Instagram',
      whyChooseUsDescription: 'Découvrez la différence avec l\'école de conduite de premier plan en Suisse.',
      certifiedExcellence: 'Excellence Certifiée',
      certifiedExcellenceDescription: 'Tous nos moniteurs sont certifiés fédéralement avec un développement professionnel continu.',
      provenSuccess: 'Succès Prouvé',
      provenSuccessDescription: 'Taux de réussite constamment supérieurs aux moyennes suisses dans toutes les catégories de permis.',
      personalizedTraining: 'Formation Personnalisée',
      personalizedTrainingDescription: 'Évaluation individuelle et plans de formation personnalisés pour un apprentissage optimal.',
      flexibleSchedulingDescription: 'Leçons en soirée et week-end disponibles avec service de prise en charge à domicile.',
      fiveStarService: 'Service 5 Étoiles',
      fiveStarServiceDescription: 'Note de satisfaction client de 4,7/5 avec un taux de recommandation de 92%.',
      readyToStartDescription: 'Rejoignez des milliers de conducteurs qui ont choisi l\'Académie de Conduite Suisse. Réservez votre consultation aujourd\'hui et franchissez le premier pas vers l\'indépendance de conduite.',
      bookConsultation: 'Réserver une Consultation Gratuite'
    },
    footer: {
      quickLinks: 'Liens Rapides',
      carCourses: 'Cours Auto',
      motorcycleCourses: 'Cours Moto',
      coursePackages: 'Forfaits de Cours',
      ourInstructors: 'Nos Moniteurs',
      registrationProcess: 'Processus d\'Inscription',
      courseCategories: 'Catégories de Cours',
      carLicense: 'Permis Auto (B)',
      motorcycle: 'Moto (A/A1)',
      professionalLicenses: 'Permis Professionnels',
      specializedTraining: 'Formation Spécialisée',
      contactInfo: 'Informations de Contact',
      allRightsReserved: 'Tous droits réservés.',
      privacyPolicy: 'Politique de Confidentialité',
      termsOfService: 'Conditions d\'Utilisation',
      legalNotice: 'Mentions Légales',
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mer',
      thursday: 'Jeu',
      friday: 'Ven',
      saturday: 'Sam',
      sunday: 'Dim'
    },
    chat: {
      howCanWeHelp: 'Comment pouvons-nous vous aider?',
      talkToAI: 'Parler à l\'Agent IA',
      aiDescription: 'Obtenez des réponses instantanées à vos questions',
      customerSupport: 'Chat avec le Support Client',
      supportDescription: 'Connectez-vous avec notre équipe de support'
    }
  }
});