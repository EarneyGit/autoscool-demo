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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CarIcon,
  BikeIcon,
  TruckIcon,
  GraduationCapIcon,
  SearchIcon,
  ClockIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  FilterIcon,
  CreditCardIcon,
} from "lucide-react";
import { courses } from "@/polymet/data/driving-school-data";
import PaymentForm from "@/polymet/components/PaymentForm";
import { Course } from "@/polymet/types/course";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || course.type === selectedType;
    return matchesSearch && matchesType;
  });

  const coursesByCategory = {
    common: filteredCourses.filter((course) => course.category === "Common"),
    car: filteredCourses.filter((course) => course.category === "Car (B)"),
    motorcycleA1: filteredCourses.filter(
      (course) => course.category === "Motorcycle A1"
    ),
    motorcycleA: filteredCourses.filter(
      (course) => course.category === "Motorcycle A"
    ),
    professional: filteredCourses.filter(
      (course) =>
        course.category.includes("Truck") || course.category.includes("Taxi")
    ),
  };

  const getCourseIcon = (courseId: string, category: string) => {
    if (courseId.includes("first-aid"))
      return <ShieldCheckIcon className="h-5 w-5" />;

    if (category.includes("Car")) return <CarIcon className="h-5 w-5" />;

    if (category.includes("Motorcycle"))
      return <BikeIcon className="h-5 w-5" />;

    if (category.includes("Truck") || category.includes("Taxi"))
      return <TruckIcon className="h-5 w-5" />;

    return <GraduationCapIcon className="h-5 w-5" />;
  };

  // Payment handling functions
  const handlePaymentClick = (course: Course) => {
    // Convert course data to Course type
    const courseData: Course = {
      _id: course.id,
      name: course.name,
      slug: course.id,
      category: course.category,
      description: course.description,
      price: {
        amount: parseFloat(course.price.replace(/[^\d.-]/g, '')),
        currency: 'CHF',
      },
      duration: course.duration,
      requirements: [],
      inclusions: [],
      features: [],
      curriculum: [],
      images: [],
      instructor: {
        name: 'Professional Instructor',
      },
      schedule: [],
      capacity: {
        min: 1,
        max: 20,
        current: 0,
      },
      active: true,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setSelectedCourse(courseData);
    setPaymentDialogOpen(true);
    setPaymentError(null);
    setPaymentSuccess(false);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentSuccess(true);
    setPaymentDialogOpen(false);
    // You can add additional success handling here
    alert(`Payment successful! Payment ID: ${paymentIntentId}`);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const handlePaymentCancel = () => {
    setPaymentDialogOpen(false);
    setSelectedCourse(null);
    setPaymentError(null);
  };

  const CourseCard = ({ course }: { course: (typeof courses)[0] }) => (
    <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg hover:shadow-blue-200/50">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant={
              course.type === "mandatory"
                ? "destructive"
                : course.type === "recommended"
                  ? "default"
                  : "secondary"
            }
          >
            {course.type}
          </Badge>
          <div className="text-primary">
            {getCourseIcon(course.id, course.category)}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
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
          {course.validity && (
            <div className="flex items-center space-x-2 text-sm">
              <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />

              <span>Valid for {course.validity}</span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t">
          <div className="text-lg font-bold text-primary text-center">
            {course.price}
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              asChild
              className="flex-1 border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Link to="/contact">
                Book Now
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={() => handlePaymentClick(course)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            >
              <CreditCardIcon className="mr-1 h-4 w-4" />
              Pay Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              Complete Course Catalog
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md">
              Comprehensive driving training for all license categories in
              Switzerland. From mandatory courses to specialized training
              programs.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FilterIcon className="h-4 w-4 text-white/70" />

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-white/30 bg-white/20 backdrop-blur-sm rounded-md text-sm text-white"
                >
                  <option value="all">All Types</option>
                  <option value="mandatory">Mandatory</option>
                  <option value="recommended">Recommended</option>
                  <option value="optional">Optional</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="container mx-auto px-4">
        <Tabs defaultValue="common" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="common" className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-4 w-4" />

              <span className="hidden sm:inline">Common</span>
            </TabsTrigger>
            <TabsTrigger value="car" className="flex items-center space-x-2">
              <CarIcon className="h-4 w-4" />

              <span className="hidden sm:inline">Car (B)</span>
            </TabsTrigger>
            <TabsTrigger
              value="motorcycle"
              className="flex items-center space-x-2"
            >
              <BikeIcon className="h-4 w-4" />

              <span className="hidden sm:inline">Motorcycle</span>
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="flex items-center space-x-2"
            >
              <TruckIcon className="h-4 w-4" />

              <span className="hidden sm:inline">Professional</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <GraduationCapIcon className="h-4 w-4" />

              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
          </TabsList>

          {/* Common Courses */}
          <TabsContent value="common" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Common Mandatory Courses</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These courses are required for all license categories and form
                the foundation of Swiss driving education.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesByCategory.common.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          {/* Car Courses */}
          <TabsContent value="car" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Car License Courses (Category B)
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete training program for obtaining your car driving license
                in Switzerland.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesByCategory.car.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          {/* Motorcycle Courses */}
          <TabsContent value="motorcycle" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Motorcycle Courses (A/A1)</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized motorcycle training for both A1 (125cc) and
                unlimited A category licenses.
              </p>
            </div>

            {/* A1 Courses */}
            {coursesByCategory.motorcycleA1.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold flex items-center space-x-2">
                  <BikeIcon className="h-6 w-6 text-primary" />

                  <span>Category A1 (125cc Motorcycle)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesByCategory.motorcycleA1.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}

            {/* A Courses */}
            {coursesByCategory.motorcycleA.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold flex items-center space-x-2">
                  <BikeIcon className="h-6 w-6 text-primary" />

                  <span>Category A (Unlimited Motorcycle)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesByCategory.motorcycleA.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Professional Courses */}
          <TabsContent value="professional" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Professional Licenses</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized training for commercial driving licenses including
                trucks, buses, and taxi permits.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesByCategory.professional.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          {/* All Courses */}
          <TabsContent value="all" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">All Available Courses</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete overview of all driving courses and training programs
                we offer.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Course Information */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Understanding Course Types</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="destructive" className="mt-1">
                    Mandatory
                  </Badge>
                  <div>
                    <h3 className="font-semibold">Required by Law</h3>
                    <p className="text-sm text-muted-foreground">
                      These courses are legally required to obtain your license.
                      You cannot skip them.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="default" className="mt-1">
                    Recommended
                  </Badge>
                  <div>
                    <h3 className="font-semibold">Highly Suggested</h3>
                    <p className="text-sm text-muted-foreground">
                      While not legally required, these courses significantly
                      improve your chances of success.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">
                    Optional
                  </Badge>
                  <div>
                    <h3 className="font-semibold">Additional Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Specialized courses for specific skills or situations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-0 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our experts can help you create a personalized learning path
                based on your goals, experience level, and timeline.
              </p>
              <div className="space-y-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                  asChild
                >
                  <Link to="/contact">
                    Get Free Consultation
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/packages">View Course Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <PaymentForm
              course={selectedCourse}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onCancel={handlePaymentCancel}
            />
          )}
          {paymentError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{paymentError}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
