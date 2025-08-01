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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CarIcon,
  BikeIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  TrophyIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  instructors,
  statistics,
  companyInfo,
} from "@/polymet/data/driving-school-data";

export default function AboutPage() {
  const achievements = [
    {
      title: "Federal Certification",
      description:
        "All instructors are federally certified with continuous education",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
    },
    {
      title: "Proven Success",
      description: "Consistently higher success rates than Swiss averages",
      icon: <TrophyIcon className="h-6 w-6" />,
    },
    {
      title: "Modern Fleet",
      description: "20+ vehicles with latest safety features and dual controls",
      icon: <CarIcon className="h-6 w-6" />,
    },
    {
      title: "Expert Team",
      description: "12+ specialized instructors with multilingual capabilities",
      icon: <UsersIcon className="h-6 w-6" />,
    },
  ];

  const facilities = [
    {
      title: "Training Vehicles",
      items: [
        "12 School Cars (VW Golf, Renault Clio)",
        "8 Motorcycles (Honda CB 125, Yamaha MT-07)",
        "4 Scooters (Piaggio Liberty 125)",
        "2 Adapted Vehicles for Disabilities",
      ],
    },
    {
      title: "Safety Equipment",
      items: [
        "Mandatory dual controls (brakes, clutch)",
        "Additional mirrors for instructors",
        "Full motorcycle protective gear",
        "Preventive maintenance every 10,000 km",
      ],
    },
    {
      title: "Modern Technology",
      items: [
        "Driving simulators for emergency situations",
        "Interactive tablets for theory tests",
        "Educational videos and materials",
        "Mobile app for road code revision",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mueller",
      course: "Car License (B)",
      rating: 5,
      text: "Excellent instruction and support throughout the process. Passed on first attempt!",
      avatar: "https://github.com/kdrnp.png",
    },
    {
      name: "Marco Rossi",
      course: "Motorcycle License (A)",
      rating: 5,
      text: "Professional motorcycle training with focus on safety. Highly recommended!",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    {
      name: "Emma Johnson",
      course: "Combined Package",
      rating: 5,
      text: "Great value package deal. Saved money and got both car and motorcycle licenses.",
      avatar: "https://github.com/shoaibux1.png",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl border border-white/30 shadow-lg">
                  <GraduationCapIcon className="h-6 w-6" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                >
                  Since 2010
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                About {companyInfo.name}
              </h1>
              <p className="text-xl text-white/90 drop-shadow-md">
                {companyInfo.description} With over a decade of experience,
                we've helped thousands of students achieve their driving goals
                safely and successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-primary hover:bg-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
                >
                  <Link to="/contact">
                    Get Started Today
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent text-white border-white/50 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link to="/about/instructors">Meet Our Team</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <Card
                  key={stat.category}
                  className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                      {index === 0 && (
                        <div className="bg-primary/80 p-2 rounded-full">
                          <TrophyIcon className="h-8 w-8 text-white" />
                        </div>
                      )}
                      {index === 1 && (
                        <div className="bg-primary p-2 rounded-full">
                          <CarIcon className="h-8 w-8 text-white" />
                        </div>
                      )}
                      {index === 2 && (
                        <div className="bg-primary/90 p-2 rounded-full">
                          <BikeIcon className="h-8 w-8 text-white" />
                        </div>
                      )}
                      {index === 3 && (
                        <div className="bg-primary/70 p-2 rounded-full">
                          <BikeIcon className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-yellow-300">
                      {stat.rate}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-white/80">
                      {stat.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-white/60">
                      vs {stat.average} average
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To provide the highest quality driving education in Switzerland,
            ensuring every student becomes a safe, confident, and responsible
            driver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
            >
              <CardHeader>
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-white">{achievement.icon}</div>
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Meet Our Expert Instructors</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our certified instructors bring years of experience and passion
              for teaching safe driving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((instructor) => (
              <Card
                key={instructor.id}
                className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardHeader>
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={instructor.image} alt={instructor.name} />

                    <AvatarFallback>
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{instructor.name}</CardTitle>
                  <CardDescription>
                    {instructor.experience} experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Specialties:</div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {instructor.specialties.map((specialty, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Languages:</div>
                    <div className="text-sm text-muted-foreground">
                      {instructor.languages.join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/about/instructors">
                View All Instructors
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Facilities & Equipment */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Our Facilities & Equipment</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art facilities and modern equipment ensure the best
            learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <div className="bg-primary p-2 rounded-xl shadow-lg">
                    {index === 0 && <CarIcon className="h-5 w-5 text-white" />}
                    {index === 1 && (
                      <ShieldCheckIcon className="h-5 w-5 text-white" />
                    )}
                    {index === 2 && (
                      <GraduationCapIcon className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <span>{facility.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {facility.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />

                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our successful
              students have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />

                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.course}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/about/success">
                Read More Success Stories
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Visit Our School</h2>
            <p className="text-lg text-muted-foreground">
              Located in the heart of Lausanne, our modern facilities are easily
              accessible by public transport and offer convenient parking.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary mt-1" />

                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-muted-foreground">
                    {companyInfo.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary mt-1" />

                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-muted-foreground">
                    {companyInfo.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MailIcon className="h-5 w-5 text-primary mt-1" />

                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground">
                    {companyInfo.email}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-primary mt-1" />

                <div>
                  <div className="font-semibold">Hours</div>
                  <div className="text-muted-foreground space-y-1">
                    <div>Mon-Fri: {companyInfo.hours.weekdays}</div>
                    <div>Sat: {companyInfo.hours.saturday}</div>
                    <div>Sun: {companyInfo.hours.sunday}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border-0 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">Ready to Start?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of successful drivers who chose Swiss Drive
              Academy. Contact us today for a free consultation.
            </p>
            <div className="space-y-4">
              <Button className="w-full" size="lg" asChild>
                <Link to="/contact">
                  Schedule Free Consultation
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link to="/courses">Browse Our Courses</Link>
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
              Experience the Swiss Drive Academy Difference
            </h2>
            <p className="text-xl opacity-90">
              Join our family of successful drivers and experience personalized
              instruction, modern facilities, and proven teaching methods that
              ensure your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8 bg-white text-primary hover:bg-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
              >
                <Link to="/contact">
                  Start Your Journey
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
