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
  ClockIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BookOpenIcon,
  GraduationCapIcon,
  UserIcon,
  MapPinIcon,
} from "lucide-react";
import { courses } from "@/polymet/data/driving-school-data";

export default function CarCoursesPage() {
  const carCourses = courses.filter(
    (course) => course.category === "Car (B)" || course.category === "Common"
  );

  const mandatoryCourses = carCourses.filter(
    (course) => course.type === "mandatory"
  );
  const recommendedCourses = carCourses.filter(
    (course) => course.type === "recommended"
  );

  const processSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Free assessment of your needs and experience level",
      duration: "30 minutes",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      step: 2,
      title: "First Aid Course",
      description: "Mandatory 10-hour Samaritans course",
      duration: "10 hours",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
    },
    {
      step: 3,
      title: "Theory Preparation",
      description: "Road theory course and exam preparation",
      duration: "8-12 sessions",
      icon: <BookOpenIcon className="h-5 w-5" />,
    },
    {
      step: 4,
      title: "Theory Exam",
      description: "Official theory examination",
      duration: "45 minutes",
      icon: <GraduationCapIcon className="h-5 w-5" />,
    },
    {
      step: 5,
      title: "Learner's Permit",
      description: "Obtain your learner's permit",
      duration: "1 day",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
    {
      step: 6,
      title: "Traffic Awareness",
      description: "Mandatory 8-hour awareness course",
      duration: "8 hours",
      icon: <AlertCircleIcon className="h-5 w-5" />,
    },
    {
      step: 7,
      title: "Practical Lessons",
      description: "Individual driving lessons with instructor",
      duration: "25-35 lessons",
      icon: <CarIcon className="h-5 w-5" />,
    },
    {
      step: 8,
      title: "Practical Exam",
      description: "Official driving test",
      duration: "45 minutes",
      icon: <MapPinIcon className="h-5 w-5" />,
    },
    {
      step: 9,
      title: "2-Phase Training",
      description: "Mandatory post-license training (2 phases)",
      duration: "16 hours total",
      icon: <GraduationCapIcon className="h-5 w-5" />,
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
                <CarIcon className="h-8 w-8 text-primary" />

                <Badge variant="secondary">Category B</Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Car Driving License
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete training program for obtaining your Swiss car driving
                license. From theory to practical skills, we guide you through
                every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Start Your Journey
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/packages/car">View Car Packages</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Age:</span>
                  <span className="font-semibold">18 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Average Duration:
                  </span>
                  <span className="font-semibold">8-12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate:</span>
                  <span className="font-semibold text-primary">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span className="font-semibold">CHF 2,500-3,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Step-by-Step Process</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow our proven 9-step process to get your car license efficiently
            and successfully.
          </p>
        </div>

        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < processSteps.length - 1 && (
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
                        <CardTitle className="text-lg">{step.title}</CardTitle>
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
      </section>

      {/* Mandatory Courses */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Mandatory Courses</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These courses are legally required and cannot be skipped.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mandatoryCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="destructive">Mandatory</Badge>
                    <CarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>{course.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
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
                    {course.validity && (
                      <div className="flex items-center space-x-2 text-sm">
                        <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />

                        <span>Valid for {course.validity}</span>
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
        </div>
      </section>

      {/* Recommended Courses */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Recommended Courses</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            While not legally required, these courses significantly improve your
            success rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="default">Recommended</Badge>
                  <CarIcon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription>{course.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
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
      </section>

      {/* Requirements & Tips */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Requirements</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />

                  <div>
                    <h3 className="font-semibold">Age Requirement</h3>
                    <p className="text-sm text-muted-foreground">
                      Minimum 18 years old (17 for accompanied driving)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />

                  <div>
                    <h3 className="font-semibold">Vision Test</h3>
                    <p className="text-sm text-muted-foreground">
                      Valid vision test certificate from optician or doctor
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />

                  <div>
                    <h3 className="font-semibold">Identity Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Valid ID or passport and residence permit (if applicable)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />

                  <div>
                    <h3 className="font-semibold">First Aid Certificate</h3>
                    <p className="text-sm text-muted-foreground">
                      Valid first aid course certificate (max 10 years old)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Success Tips</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />

                  <div>
                    <h3 className="font-semibold">Practice Regularly</h3>
                    <p className="text-sm text-muted-foreground">
                      Consistent practice is key. Book lessons regularly rather
                      than cramming.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />

                  <div>
                    <h3 className="font-semibold">Study Theory</h3>
                    <p className="text-sm text-muted-foreground">
                      Use our online theory tests and mobile app for effective
                      preparation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />

                  <div>
                    <h3 className="font-semibold">Listen to Your Instructor</h3>
                    <p className="text-sm text-muted-foreground">
                      Our certified instructors know what examiners look for.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />

                  <div>
                    <h3 className="font-semibold">Stay Calm</h3>
                    <p className="text-sm text-muted-foreground">
                      Exam nerves are normal. Practice relaxation techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Get Your Car License?
            </h2>
            <p className="text-xl opacity-90">
              Join our successful students and get your car license with
              confidence. Our expert instructors and proven methods ensure your
              success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8"
              >
                <Link to="/contact">
                  Book Free Consultation
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/packages/car">View Car Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
