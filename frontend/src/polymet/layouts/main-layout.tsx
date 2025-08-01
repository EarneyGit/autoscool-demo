import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  MenuIcon,
  CarIcon,
  BikeIcon,
  TruckIcon,
  GraduationCapIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import {
  companyInfo,
} from "@/polymet/data/driving-school-data";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ChatBox from "@/components/ChatBox";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActivePath = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  // Get translated navigation items
  const getTranslatedNavigationItems = () => {
    return [
      {
        title: t('nav.home'),
        href: "/",
      },
      {
        title: t('nav.courses'),
        href: "/courses",
        submenu: [
          { title: t('nav.carCourses'), href: "/courses/car" },
          { title: t('nav.motorcycleCourses'), href: "/courses/motorcycle" },
          { title: t('nav.professionalLicenses'), href: "/courses/professional" },
          { title: t('nav.specializedTraining'), href: "/courses/specialized" },
        ],
      },
      {
        title: t('nav.packages'),
        href: "/packages",
        submenu: [
          { title: t('nav.carPackages'), href: "/packages/car" },
          { title: t('nav.motorcyclePackages'), href: "/packages/motorcycle" },
          { title: t('nav.combinedOffers'), href: "/packages/combined" },
          { title: t('nav.premiumServices'), href: "/packages/premium" },
        ],
      },
      {
        title: t('nav.about'),
        href: "/about",
        submenu: [
          { title: t('nav.ourSchool'), href: "/about/school" },
          { title: t('nav.instructors'), href: "/about/instructors" },
          { title: t('nav.fleetFacilities'), href: "/about/fleet" },
          { title: t('nav.successStories'), href: "/about/success" },
        ],
      },
      {
        title: t('nav.services'),
        href: "/services",
        submenu: [
          { title: t('nav.registrationProcess'), href: "/services/registration" },
          { title: t('nav.examPrep'), href: "/services/exam-prep" },
          { title: t('nav.premiumServices'), href: "/services/premium" },
          { title: t('nav.supportFollowup'), href: "/services/support" },
        ],
      },
      {
        title: t('nav.blog'),
        href: "/blog",
      },
      {
        title: t('nav.contact'),
        href: "/contact",
      },
    ];
  };

  const translatedNavigationItems = getTranslatedNavigationItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/95 sticky top-0 z-50 shadow-lg">
        {/* Top Bar */}
        <div className="border-b border-primary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 text-primary" />

                  <span>{companyInfo.phone}</span>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <MailIcon className="h-4 w-4 text-primary" />

                  <span>{companyInfo.email}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4 text-primary" />
                  <span>{t('common.weekdays')}: {companyInfo.hours.weekdays}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LanguageSwitcher variant="compact" />
                  <a
                    href={companyInfo.social.facebook}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={companyInfo.social.instagram}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={companyInfo.social.linkedin}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/autoscool-logo.png" 
                alt="AUTOSCOOL Logo" 
                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {translatedNavigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger
                          className={`${isActivePath(item.href) ? "text-primary" : ""}`}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.submenu.map((subItem) => (
                              <NavigationMenuLink key={subItem.title} asChild>
                                <Link
                                  to={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.title}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            isActivePath(item.href) ? "text-primary" : ""
                          }`}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                asChild
                className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/contact">{t('common.bookLesson')}</Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {translatedNavigationItems.map((item) => (
                      <div key={item.title}>
                        {item.submenu ? (
                          <div className="space-y-2">
                            <div className="font-medium text-foreground">
                              {item.title}
                            </div>
                            <div className="pl-4 space-y-2">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  to={subItem.href}
                                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            to={item.href}
                            className={`block font-medium transition-colors ${
                              isActivePath(item.href)
                                ? "text-primary"
                                : "text-foreground hover:text-primary"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        )}
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <Button asChild className="w-full">
                        <Link
                          to="/contact"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t('common.bookLesson')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-white border-t border-primary/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white p-3 rounded-lg shadow-md">
                  <img 
                    src="/autoscool-logo.png" 
                    alt="AUTOSCOOL Logo" 
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-primary-foreground/80">{companyInfo.description}</p>
              <div className="flex items-center space-x-3">
                <a
                  href={companyInfo.social.facebook}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/30"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={companyInfo.social.instagram}
                  className="text-pink-200 hover:text-pink-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-pink-800/30"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={companyInfo.social.linkedin}
                  className="text-purple-200 hover:text-purple-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-purple-800/30"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white mb-2">{t('footer.quickLinks')}</h3>
              <div className="space-y-2">
                <Link
                  to="/courses/car"
                  className="block text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                >
                  {t('footer.carCourses')}
                </Link>
                <Link
                    to="/courses/motorcycle"
                    className="block text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.motorcycleCourses')}
                  </Link>
                  <Link
                    to="/packages"
                    className="block text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.coursePackages')}
                  </Link>
                  <Link
                    to="/about/instructors"
                    className="block text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.ourInstructors')}
                  </Link>
                  <Link
                    to="/services/registration"
                    className="block text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.registrationProcess')}
                  </Link>
              </div>
            </div>

            {/* Course Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white mb-2">
                {t('footer.courseCategories')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CarIcon className="h-4 w-4 text-primary-foreground/60" />

                  <Link
                    to="/courses/car"
                    className="text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.carLicense')}
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <BikeIcon className="h-4 w-4 text-purple-400" />

                  <Link
                    to="/courses/motorcycle"
                    className="text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.motorcycle')}
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <TruckIcon className="h-4 w-4 text-pink-400" />

                  <Link
                    to="/courses/professional"
                    className="text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.professionalLicenses')}
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCapIcon className="h-4 w-4 text-green-400" />

                  <Link
                    to="/courses/specialized"
                    className="text-sm text-primary-foreground/70 hover:text-white transition-colors hover:translate-x-1 duration-300"
                  >
                    {t('footer.specializedTraining')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white mb-2">{t('footer.contactInfo')}</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPinIcon className="h-4 w-4 text-primary-foreground/60 mt-0.5" />

                  <div className="text-sm text-primary-foreground/70">
                    {companyInfo.address}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 text-green-400" />

                  <div className="text-sm text-primary-foreground/70">
                    {companyInfo.phone}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MailIcon className="h-4 w-4 text-purple-400" />

                  <div className="text-sm text-primary-foreground/70">
                    {companyInfo.email}
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <ClockIcon className="h-4 w-4 text-pink-400 mt-0.5" />

                  <div className="text-sm text-primary-foreground/70">
                    <div>Mon-Fri: {companyInfo.hours.weekdays}</div>
                    <div>Sat: {companyInfo.hours.saturday}</div>
                    <div>Sun: {companyInfo.hours.sunday}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/40 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-primary-foreground/70">
                © 2025 {t('company.name')}. {t('footer.allRightsReserved')}
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <Link
                  to="/privacy"
                  className="text-primary-foreground/70 hover:text-white transition-colors hover:underline"
                >
                  {t('footer.privacyPolicy')}
                </Link>
                <Link
                  to="/terms"
                  className="text-primary-foreground/70 hover:text-white transition-colors hover:underline"
                >
                  {t('footer.termsOfService')}
                </Link>
                <Link
                  to="/legal"
                  className="text-primary-foreground/70 hover:text-white transition-colors hover:underline"
                >
                  {t('footer.legalNotice')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Chat Box */}
      <ChatBox />
    </div>
  );
}
