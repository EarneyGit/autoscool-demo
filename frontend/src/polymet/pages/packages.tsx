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
  CarIcon,
  BikeIcon,
  CheckCircleIcon,
  StarIcon,
  TrophyIcon,
  GiftIcon,
  ArrowRightIcon,
  PercentIcon,
  ClockIcon,
  ShieldCheckIcon,
  HeartHandshakeIcon,
  CrownIcon,
} from "lucide-react";
import { packages } from "@/polymet/data/driving-school-data";

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPackages = packages.filter(
    (pkg) =>
      selectedCategory === "all" ||
      pkg.category.toLowerCase().includes(selectedCategory)
  );

  const premiumServices = [
    {
      title: "VIP Home Lessons",
      description: "Pick-up and drop-off at your location",
      price: "+CHF 25/lesson",
      icon: <CarIcon className="h-5 w-5" />,
    },
    {
      title: "Flexible Scheduling",
      description: "Evening and weekend lessons available",
      price: "+20%",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      title: "Dedicated Instructor",
      description: "Same instructor for all lessons",
      price: "+CHF 15/lesson",
      icon: <HeartHandshakeIcon className="h-5 w-5" />,
    },
    {
      title: "Premium Vehicles",
      description: "BMW, Audi, and luxury motorcycles",
      price: "+CHF 20/lesson",
      icon: <CrownIcon className="h-5 w-5" />,
    },
  ];

  const discounts = [
    {
      title: "Student Discount",
      description: "Valid student ID required",
      discount: "10% off",
      icon: <GiftIcon className="h-5 w-5 text-primary" />,
    },
    {
      title: "Unemployed Discount",
      description: "Certificate required",
      discount: "15% off",
      icon: <GiftIcon className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Family Discount",
      description: "2+ family members",
      discount: "5% per person",
      icon: <GiftIcon className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Cash Payment",
      description: "Full payment upfront",
      discount: "3% off",
      icon: <GiftIcon className="h-5 w-5 text-orange-500" />,
    },
  ];

  const getPackageIcon = (category: string) => {
    if (category.toLowerCase().includes("car"))
      return <CarIcon className="h-6 w-6" />;

    if (category.toLowerCase().includes("motorcycle"))
      return <BikeIcon className="h-6 w-6" />;

    if (category.toLowerCase().includes("combined"))
      return <TrophyIcon className="h-6 w-6" />;

    return <GiftIcon className="h-6 w-6" />;
  };

  const PackageCard = ({
    pkg,
    featured = false,
  }: {
    pkg: (typeof packages)[0];
    featured?: boolean;
  }) => (
    <Card
      className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg ${featured ? "ring-2 ring-primary/40 scale-105 bg-primary/5" : ""}`}
    >
      {featured && (
        <div className="bg-primary text-white text-center py-2 text-sm font-medium rounded-t-lg shadow-lg">
          <StarIcon className="inline h-4 w-4 mr-1" />
          Most Popular
        </div>
      )}
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary p-3 rounded-full text-white shadow-lg">
            {getPackageIcon(pkg.category)}
          </div>
        </div>
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
        <CardDescription className="text-lg">{pkg.category}</CardDescription>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">
            {pkg.price}
          </div>
          {pkg.originalPrice && (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg text-muted-foreground line-through">
                {pkg.originalPrice}
              </span>
              <Badge
                variant="secondary"
                className="bg-primary/80 text-white shadow-lg"
              >
                <PercentIcon className="h-3 w-3 mr-1" />
                Save {pkg.savings}
              </Badge>
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
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />

              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          size="lg"
          asChild
        >
          <Link to="/contact">
            Choose Package
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
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
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 shadow-lg">
                <GiftIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              Complete Training Packages
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md">
              Save money with our comprehensive training packages designed for
              your success. Everything you need in one convenient bundle with
              significant savings.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/30 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">
                  Up to 25%
                </div>
                <div className="text-sm text-white/80">Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">
                  3
                </div>
                <div className="text-sm text-white/80">Package Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">
                  100%
                </div>
                <div className="text-sm text-white/80">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Categories */}
      <section className="container mx-auto px-4">
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="space-y-8"
        >
          <div className="text-center">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <TrophyIcon className="h-4 w-4" />

                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="car" className="flex items-center space-x-2">
                <CarIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Car</span>
              </TabsTrigger>
              <TabsTrigger
                value="motorcycle"
                className="flex items-center space-x-2"
              >
                <BikeIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Motorcycle</span>
              </TabsTrigger>
              <TabsTrigger
                value="combined"
                className="flex items-center space-x-2"
              >
                <GiftIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Combined</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">All Training Packages</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete overview of all our training packages with significant
                savings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <PackageCard key={pkg.id} pkg={pkg} featured={index === 2} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="car" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Car Training Packages</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete car license training with everything included.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="motorcycle" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Motorcycle Training Packages
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized motorcycle training for A and A1 categories.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combined" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Combined License Packages</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get both car and motorcycle licenses with maximum savings.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="max-w-md">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} featured={true} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Premium Services */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Premium Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your learning experience with our premium add-on services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumServices.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {service.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discounts & Offers */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Available Discounts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take advantage of our special discounts and save even more on your
            training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discounts.map((discount, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
            >
              <CardHeader>
                <div className="flex justify-center mb-4">{discount.icon}</div>
                <CardTitle className="text-lg">{discount.title}</CardTitle>
                <CardDescription>{discount.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-green-600">
                  {discount.discount}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-2xl border-0 shadow-xl text-center">
          <h3 className="text-2xl font-semibold mb-4">Cancellation Policy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-green-600">+48 Hours</div>
              <div className="text-muted-foreground">Free cancellation</div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-yellow-600">24-48 Hours</div>
              <div className="text-muted-foreground">50% charge</div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-red-600">-24 Hours</div>
              <div className="text-muted-foreground">100% charge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose Packages?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our packages offer significant advantages over individual course
              bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <PercentIcon className="h-6 w-6 text-green-500 mt-1" />

                  <div>
                    <h3 className="text-xl font-semibold">
                      Significant Savings
                    </h3>
                    <p className="text-muted-foreground">
                      Save up to 25% compared to booking individual courses
                      separately.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheckIcon className="h-6 w-6 text-primary mt-1" />

                  <div>
                    <h3 className="text-xl font-semibold">
                      Guaranteed Availability
                    </h3>
                    <p className="text-muted-foreground">
                      Priority booking ensures you get the schedule you need.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <HeartHandshakeIcon className="h-6 w-6 text-purple-500 mt-1" />

                  <div>
                    <h3 className="text-xl font-semibold">
                      Personalized Support
                    </h3>
                    <p className="text-muted-foreground">
                      Dedicated support throughout your entire learning journey.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrophyIcon className="h-6 w-6 text-orange-500 mt-1" />

                  <div>
                    <h3 className="text-xl font-semibold">Success Guarantee</h3>
                    <p className="text-muted-foreground">
                      Additional support if you don't pass on the first attempt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-0 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6">Ready to Save?</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span>Individual Courses:</span>
                  <span className="line-through text-muted-foreground">
                    CHF 3,000+
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Package Price:</span>
                  <span className="text-2xl font-bold text-primary">
                    CHF 2,250
                  </span>
                </div>
                <div className="flex justify-between items-center text-green-600 font-semibold">
                  <span>Your Savings:</span>
                  <span>CHF 750+</span>
                </div>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                size="lg"
                asChild
              >
                <Link to="/contact">
                  Get Your Package Quote
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Start Saving Today
            </h2>
            <p className="text-xl opacity-90">
              Choose the perfect package for your needs and start your driving
              journey with confidence. Our packages are designed to save you
              time, money, and ensure your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8 bg-white text-primary hover:bg-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
              >
                <Link to="/contact">
                  Get Free Consultation
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/courses">Browse Individual Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
