import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CarIcon,
  BikeIcon,
  TruckIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayCircleIcon,
} from "lucide-react";
import {
  statistics,
} from "@/polymet/data/driving-school-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMultilingualData } from "@/polymet/data/multilingual-data";
import InstagramFeed from "@/polymet/components/InstagramFeed";

export default function HomePage() {
  const { t } = useLanguage();
  const { courses: multilingualCourses, packages: multilingualPackages } = useMultilingualData();
  
  const featuredCourses = multilingualCourses.filter((course) =>
    [
      "first-aid",
      "car-driving-lessons",
      "cbm-a-module1",
      "truck-theory",
    ].includes(course.id)
  );

  const featuredPackages = multilingualPackages.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.3),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="w-fit bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                >
                  🏆 {t('home.ratedDrivingSchool')}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                  {t('home.heroTitle')}
                  <span className="text-yellow-300 block animate-pulse">
                    {t('home.heroSubtitle')}
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
                  {t('home.heroDescription')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="text-lg px-8 bg-white text-primary hover:bg-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
                >
                  <Link to="/contact">
                    {t('home.startJourney')}
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 bg-transparent text-white border-white/50 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link to="/courses">
                    <PlayCircleIcon className="mr-2 h-5 w-5" />
                    {t('home.viewCourses')}
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 drop-shadow-lg">
                    85%
                  </div>
                  <div className="text-sm text-white/80">{t('home.successRate')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 drop-shadow-lg">
                    12+
                  </div>
                  <div className="text-sm text-white/80">
                    {t('home.expertInstructors')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 drop-shadow-lg">
                    5000+
                  </div>
                  <div className="text-sm text-white/80">{t('home.happyStudents')}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center space-y-2 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                    <CarIcon className="h-8 w-8 text-primary-foreground/70 mx-auto" />

                    <div className="font-semibold text-white">{t('home.carLicense')}</div>
                    <div className="text-sm text-white/70">Category B</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center space-y-2 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                    <BikeIcon className="h-8 w-8 text-purple-200 mx-auto" />

                    <div className="font-semibold text-white">{t('home.motorcycle')}</div>
                    <div className="text-sm text-white/70">A/A1</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center space-y-2 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                    <TruckIcon className="h-8 w-8 text-pink-200 mx-auto" />

                    <div className="font-semibold text-white">{t('home.professional')}</div>
                    <div className="text-sm text-white/70">C/D</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center space-y-2 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                    <GraduationCapIcon className="h-8 w-8 text-green-200 mx-auto" />

                    <div className="font-semibold text-white">{t('home.specialized')}</div>
                    <div className="text-sm text-white/70">{t('home.training')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Which category are you interested in?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
            {/* Motorcycle Categories */}
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <BikeIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">A</div>
            </div>
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <BikeIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">A</div>
            </div>
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <BikeIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">A1</div>
            </div>

            {/* Car Categories */}
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <CarIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">B</div>
            </div>
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="flex items-center justify-center mb-2">
                <CarIcon className="h-6 w-6 text-white" />
                <div className="w-4 h-2 bg-white rounded-sm ml-1"></div>
              </div>
              <div className="text-white font-semibold text-lg">BE</div>
            </div>
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <CarIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">B1</div>
            </div>

            {/* Truck Categories - First Row */}
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <TruckIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">C</div>
            </div>
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="flex items-center justify-center mb-2">
                <TruckIcon className="h-6 w-6 text-white" />
                <TruckIcon className="h-6 w-6 text-white ml-1" />
              </div>
              <div className="text-white font-semibold text-lg">CE</div>
            </div>
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <TruckIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">C1</div>
            </div>
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="flex items-center justify-center mb-2">
                <TruckIcon className="h-6 w-6 text-white" />
                <TruckIcon className="h-6 w-6 text-white ml-1" />
              </div>
              <div className="text-white font-semibold text-lg">C1E</div>
            </div>

            {/* Bus Categories */}
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="h-8 w-8 mx-auto mb-2 bg-white rounded flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-white font-semibold text-lg">D</div>
            </div>
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="h-8 w-8 mx-auto mb-2 bg-white rounded flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-white font-semibold text-lg">DE</div>
            </div>
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="h-8 w-8 mx-auto mb-2 bg-white rounded flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-white font-semibold text-lg">D1</div>
            </div>
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="h-8 w-8 mx-auto mb-2 bg-white rounded flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-white font-semibold text-lg">D1E</div>
            </div>

            {/* Special Categories - Second Row */}
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <BikeIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">M</div>
            </div>
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <TruckIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">F</div>
            </div>
            <div className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <TruckIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold text-lg">G</div>
            </div>

            {/* Professional Categories */}
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="h-8 w-8 mx-auto mb-2 bg-white rounded flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-white font-semibold text-sm">TPP</div>
            </div>
            <div className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer group">
              <div className="h-8 w-8 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-white font-semibold text-sm">OACP</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {t('home.provenExcellence')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.excellenceDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card
                key={stat.category}
                className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    {index === 0 && (
                      <div className="bg-primary/80 p-3 rounded-full shadow-lg">
                        <TrophyIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                    {index === 1 && (
                      <div className="bg-primary p-3 rounded-full shadow-lg">
                        <CarIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                    {index === 2 && (
                      <div className="bg-primary/90 p-3 rounded-full shadow-lg">
                        <BikeIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                    {index === 3 && (
                      <div className="bg-primary/70 p-3 rounded-full shadow-lg">
                        <BikeIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">
                    {stat.rate}
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700">
                    {stat.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    vs {stat.average} Swiss average
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">{t('home.featuredCourses')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.coursesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg hover:shadow-blue-200/50"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={
                        course.type === "mandatory"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {course.type}
                    </Badge>
                    {course.id.includes("car") && (
                      <CarIcon className="h-5 w-5 text-primary" />
                    )}
                    {course.id.includes("moto") && (
                      <BikeIcon className="h-5 w-5 text-primary" />
                    )}
                    {course.id.includes("truck") && (
                      <TruckIcon className="h-5 w-5 text-primary" />
                    )}
                    {course.id.includes("first-aid") && (
                      <ShieldCheckIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {course.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {course.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <div className="font-medium">{course.duration}</div>
                      <div className="text-primary font-bold">
                        {course.price}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/courses">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/courses">
                {t('home.viewAllCourses')}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Package Offers */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {t('home.bestPackages')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.packagesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg ${index === 1 ? "ring-2 ring-primary/40 scale-105 bg-primary/5" : ""}`}
              >
                {index === 1 && (
                  <div className="bg-primary text-white text-center py-2 text-sm font-medium rounded-t-lg shadow-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-lg">
                    {pkg.category}
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      {pkg.price}
                    </div>
                    {pkg.originalPrice && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg text-muted-foreground line-through">
                          {pkg.originalPrice}
                        </span>
                        <Badge variant="secondary">Save {pkg.savings}</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground text-center">
                    {pkg.description}
                  </p>
                  <div className="space-y-3">
                    {pkg.includes.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />

                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/packages">Choose Package</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {t('home.whyChooseUs')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.whyChooseUsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-primary/80 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{t('home.certifiedExcellence')}</h3>
              <p className="text-muted-foreground">
                {t('home.certifiedExcellenceDescription')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <TrophyIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{t('home.provenSuccess')}</h3>
              <p className="text-muted-foreground">
                {t('home.provenSuccessDescription')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/90 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{t('home.personalizedTraining')}</h3>
              <p className="text-muted-foreground">
                {t('home.personalizedTrainingDescription')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/70 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <ClockIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{t('home.flexibleScheduling')}</h3>
              <p className="text-muted-foreground">
                {t('home.flexibleSchedulingDescription')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/60 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <CarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{t('home.modernFleet')}</h3>
              <p className="text-muted-foreground">
                {t('home.modernFleetDescription')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <StarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{t('home.fiveStarService')}</h3>
              <p className="text-muted-foreground">
                {t('home.fiveStarServiceDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {t('home.readyToStart')}
            </h2>
            <p className="text-xl opacity-90">
              {t('home.readyToStartDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8 bg-white text-primary hover:bg-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
              >
                <Link to="/contact">
                  {t('home.bookConsultation')}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/packages">{t('home.viewAllPackages')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
