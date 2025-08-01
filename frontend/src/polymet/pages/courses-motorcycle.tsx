import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BikeIcon,
  ClockIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  GraduationCapIcon,
  MapPinIcon,
  TargetIcon,
  TrendingUpIcon,
} from "lucide-react";
import { courses } from "@/polymet/data/driving-school-data";

export default function MotorcycleCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("a1");

  const motorcycleCourses = courses.filter(
    (course) =>
      course.category.includes("Motorcycle") || course.category === "Common"
  );

  const a1Courses = motorcycleCourses.filter(
    (course) =>
      course.category === "Motorcycle A1" || course.category === "Common"
  );

  const aCourses = motorcycleCourses.filter(
    (course) =>
      course.category === "Motorcycle A" || course.category === "Common"
  );

  const a1ProcessSteps = [
    {
      step: 1,
      title: "Prerequisites",
      description: "Complete first aid course and theory exam",
      duration: "Variable",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
    },
    {
      step: 2,
      title: "Learner's Permit",
      description: "Obtain motorcycle learner's permit",
      duration: "1 day",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
    {
      step: 3,
      title: "CBM Module 1",
      description: "Slow-speed maneuverability and balance",
      duration: "4 hours",
      icon: <TargetIcon className="h-5 w-5" />,
    },
    {
      step: 4,
      title: "CBM Module 2",
      description: "Road traffic and independence",
      duration: "4 hours",
      icon: <MapPinIcon className="h-5 w-5" />,
    },
    {
      step: 5,
      title: "Additional Lessons",
      description: "Individual practice lessons (recommended)",
      duration: "10-20 lessons",
      icon: <BikeIcon className="h-5 w-5" />,
    },
    {
      step: 6,
      title: "Practical Exam",
      description: "Official motorcycle driving test",
      duration: "45 minutes",
      icon: <GraduationCapIcon className="h-5 w-5" />,
    },
    {
      step: 7,
      title: "2-Phase Training",
      description: "Mandatory post-license training",
      duration: "16 hours total",
      icon: <TrendingUpIcon className="h-5 w-5" />,
    },
  ];

  const aProcessSteps = [
    {
      step: 1,
      title: "Prerequisites",
      description: "Complete first aid course and theory exam",
      duration: "Variable",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
    },
    {
      step: 2,
      title: "Learner's Permit",
      description: "Obtain motorcycle learner's permit",
      duration: "1 day",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
    {
      step: 3,
      title: "CBM Module 1",
      description: "Slow maneuverability, balance, slalom",
      duration: "4 hours",
      icon: <TargetIcon className="h-5 w-5" />,
    },
    {
      step: 4,
      title: "CBM Module 2",
      description: "Sporty maneuverability, emergency braking",
      duration: "4 hours",
      icon: <AlertCircleIcon className="h-5 w-5" />,
    },
    {
      step: 5,
      title: "CBM Module 3",
      description: "Road traffic, independence, anticipation",
      duration: "4 hours",
      icon: <MapPinIcon className="h-5 w-5" />,
    },
    {
      step: 6,
      title: "Additional Lessons",
      description: "Individual practice lessons (recommended)",
      duration: "8-15 lessons",
      icon: <BikeIcon className="h-5 w-5" />,
    },
    {
      step: 7,
      title: "Practical Exam",
      description: "Official motorcycle driving test",
      duration: "45 minutes",
      icon: <GraduationCapIcon className="h-5 w-5" />,
    },
    {
      step: 8,
      title: "2-Phase Training",
      description: "Mandatory post-license training",
      duration: "16 hours total",
      icon: <TrendingUpIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <BikeIcon className="h-8 w-8 text-primary" />

                <Badge variant="secondary">Categories A/A1</Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Motorcycle Licenses
              </h1>
              <p className="text-xl text-muted-foreground">
                Specialized motorcycle training for both A1 (125cc) and
                unlimited A category licenses. Master the art of motorcycle
                riding with our expert instructors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Start Your Journey
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/packages/motorcycle">
                    View Motorcycle Packages
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <BikeIcon className="h-12 w-12 text-primary mx-auto mb-2" />

                  <CardTitle>Category A1</CardTitle>
                  <CardDescription>125cc Motorcycle</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    CHF 1,400-1,900
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Complete package
                  </div>
                  <div className="text-sm">
                    Success Rate:{" "}
                    <span className="font-semibold text-primary">88%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <BikeIcon className="h-12 w-12 text-primary mx-auto mb-2" />

                  <CardTitle>Category A</CardTitle>
                  <CardDescription>Unlimited Motorcycle</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    CHF 1,800-2,500
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Complete package
                  </div>
                  <div className="text-sm">
                    Success Rate:{" "}
                    <span className="font-semibold text-primary">82%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Category Comparison */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Choose Your Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding the differences between A1 and A categories will help
            you make the right choice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <BikeIcon className="h-6 w-6 text-primary" />

                <CardTitle className="text-2xl">Category A1 (125cc)</CardTitle>
              </div>
              <CardDescription>
                Perfect for city riding and beginners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">Motorcycles up to 125cc</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">Maximum 11kW power</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">Minimum age: 16 years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">2 CBM modules (8 hours total)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">Lower insurance costs</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link to="#a1-courses">Learn More About A1</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BikeIcon className="h-6 w-6 text-primary" />

                  <CardTitle className="text-2xl">
                    Category A (Unlimited)
                  </CardTitle>
                </div>
                <Badge variant="secondary">Most Popular</Badge>
              </div>
              <CardDescription>
                Full motorcycle freedom and power
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">Unlimited motorcycle size</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">No power restrictions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">
                    Minimum age: 25 years (or 2 years A2)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">
                    3 CBM modules (12 hours total)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm">
                    Highway and long-distance riding
                  </span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link to="#a-courses">Learn More About A</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Course Details */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="space-y-8"
          >
            <div className="text-center">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="a1" className="flex items-center space-x-2">
                  <BikeIcon className="h-4 w-4" />

                  <span>A1 Process</span>
                </TabsTrigger>
                <TabsTrigger value="a" className="flex items-center space-x-2">
                  <BikeIcon className="h-4 w-4" />

                  <span>A Process</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="a1" className="space-y-8" id="a1-courses">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Category A1 Process</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  7-step process to get your A1 motorcycle license (125cc).
                </p>
              </div>

              <div className="space-y-8">
                {a1ProcessSteps.map((step, index) => (
                  <div key={step.step} className="relative">
                    {index < a1ProcessSteps.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-16 bg-border"></div>
                    )}
                    <div className="flex items-start space-x-6">
                      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <Card className="flex-1 hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-primary">{step.icon}</div>
                              <CardTitle className="text-lg">
                                {step.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <ClockIcon className="h-4 w-4" />

                              <span>{step.duration}</span>
                            </div>
                          </div>
                          <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {a1Courses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant={
                            course.type === "mandatory"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {course.type}
                        </Badge>
                        <BikeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />

                          <span>{course.duration}</span>
                        </div>
                        {course.timing && (
                          <div className="flex items-center space-x-2 text-sm">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                            <span>{course.timing}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-lg font-bold text-primary">
                          {course.price}
                        </div>
                        <Button size="sm" asChild>
                          <Link to="/contact">Book Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="a" className="space-y-8" id="a-courses">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Category A Process</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  8-step process to get your unlimited motorcycle license.
                </p>
              </div>

              <div className="space-y-8">
                {aProcessSteps.map((step, index) => (
                  <div key={step.step} className="relative">
                    {index < aProcessSteps.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-16 bg-border"></div>
                    )}
                    <div className="flex items-start space-x-6">
                      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <Card className="flex-1 hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-primary">{step.icon}</div>
                              <CardTitle className="text-lg">
                                {step.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <ClockIcon className="h-4 w-4" />

                              <span>{step.duration}</span>
                            </div>
                          </div>
                          <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant={
                            course.type === "mandatory"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {course.type}
                        </Badge>
                        <BikeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />

                          <span>{course.duration}</span>
                        </div>
                        {course.timing && (
                          <div className="flex items-center space-x-2 text-sm">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                            <span>{course.timing}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-lg font-bold text-primary">
                          {course.price}
                        </div>
                        <Button size="sm" asChild>
                          <Link to="/contact">Book Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Safety & Equipment */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Safety First</h2>
            <p className="text-lg text-muted-foreground">
              Motorcycle riding requires proper safety equipment and training.
              We provide everything you need.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />

                <div>
                  <h3 className="font-semibold">Professional Equipment</h3>
                  <p className="text-sm text-muted-foreground">
                    Helmets, gloves, protective gear provided for all lessons
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />

                <div>
                  <h3 className="font-semibold">Modern Motorcycles</h3>
                  <p className="text-sm text-muted-foreground">
                    Well-maintained Honda and Yamaha motorcycles
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />

                <div>
                  <h3 className="font-semibold">Specialized Instructors</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified motorcycle instructors with years of experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
            <p className="text-muted-foreground mb-6">
              Choose your motorcycle category and begin your journey to freedom
              on two wheels.
            </p>
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <Link to="/contact">
                  Book Free Consultation
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/packages/motorcycle">View Motorcycle Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Experience the Freedom of Motorcycling
            </h2>
            <p className="text-xl opacity-90">
              Join our successful motorcycle riders and discover the joy of
              two-wheel freedom. Expert instruction, proven methods, and
              exceptional success rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8"
              >
                <Link to="/contact">
                  Start Your Motorcycle Journey
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/packages/motorcycle">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
