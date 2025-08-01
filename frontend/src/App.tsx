import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MainLayout from "@/polymet/layouts/main-layout";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/polymet/pages/home";
import CoursesPage from "@/polymet/pages/courses";
import CarCoursesPage from "@/polymet/pages/courses-car";
import MotorcycleCoursesPage from "@/polymet/pages/courses-motorcycle";
import PackagesPage from "@/polymet/pages/packages";
import AboutPage from "@/polymet/pages/about";
import ContactPage from "@/polymet/pages/contact";
import BlogPage from "@/polymet/pages/blog";
import BlogPostPage from "@/polymet/pages/blog-post";

export default function SwissDrivingSchoolPrototype() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <MainLayout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Courses */}
          <Route path="/courses" element={<CoursesPage />} />

          <Route path="/courses/car" element={<CarCoursesPage />} />

          <Route
            path="/courses/motorcycle"
            element={<MotorcycleCoursesPage />}
          />

          <Route path="/courses/professional" element={<CoursesPage />} />

          <Route path="/courses/specialized" element={<CoursesPage />} />

          {/* Packages */}
          <Route path="/packages" element={<PackagesPage />} />

          <Route path="/packages/car" element={<PackagesPage />} />

          <Route path="/packages/motorcycle" element={<PackagesPage />} />

          <Route path="/packages/combined" element={<PackagesPage />} />

          <Route path="/packages/premium" element={<PackagesPage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />

          <Route path="/about/school" element={<AboutPage />} />

          <Route path="/about/instructors" element={<AboutPage />} />

          <Route path="/about/fleet" element={<AboutPage />} />

          <Route path="/about/success" element={<AboutPage />} />

          {/* Services */}
          <Route path="/services" element={<AboutPage />} />

          <Route path="/services/registration" element={<AboutPage />} />

          <Route path="/services/exam-prep" element={<AboutPage />} />

          <Route path="/services/premium" element={<AboutPage />} />

          <Route path="/services/support" element={<AboutPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Blog */}
          <Route path="/blog" element={<BlogPage />} />
          
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<ContactPage />} />

          <Route path="/terms" element={<ContactPage />} />

          <Route path="/legal" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
        </MainLayout>
      </Router>
    </LanguageProvider>
  );
}
