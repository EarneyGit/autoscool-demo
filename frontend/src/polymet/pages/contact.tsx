import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  MessageSquareIcon,
  SendIcon,
  CheckCircleIcon,
  CarIcon,
  BikeIcon,
  TruckIcon,
  GraduationCapIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import { companyInfo } from "@/polymet/data/driving-school-data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseType: "",
    message: "",
    newsletter: false,
    preferredContact: "email",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const courseTypes = [
    {
      value: "car",
      label: "Car License (B)",
      icon: <CarIcon className="h-4 w-4" />,
    },
    {
      value: "motorcycle-a1",
      label: "Motorcycle A1 (125cc)",
      icon: <BikeIcon className="h-4 w-4" />,
    },
    {
      value: "motorcycle-a",
      label: "Motorcycle A (Unlimited)",
      icon: <BikeIcon className="h-4 w-4" />,
    },
    {
      value: "professional",
      label: "Professional License",
      icon: <TruckIcon className="h-4 w-4" />,
    },
    {
      value: "specialized",
      label: "Specialized Training",
      icon: <GraduationCapIcon className="h-4 w-4" />,
    },
    {
      value: "package",
      label: "Complete Package",
      icon: <GraduationCapIcon className="h-4 w-4" />,
    },
  ];

  const contactMethods = [
    {
      title: "Phone",
      description: "Call us for immediate assistance",
      value: companyInfo.phone,
      icon: <PhoneIcon className="h-6 w-6" />,

      action: `tel:${companyInfo.phone.replace(/\s/g, "")}`,
    },
    {
      title: "Email",
      description: "Send us a detailed message",
      value: companyInfo.email,
      icon: <MailIcon className="h-6 w-6" />,

      action: `mailto:${companyInfo.email}`,
    },
    {
      title: "Visit Us",
      description: "Come to our driving school",
      value: companyInfo.address,
      icon: <MapPinIcon className="h-6 w-6" />,

      action: "#location",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: companyInfo.hours.weekdays },
    { day: "Saturday", hours: companyInfo.hours.saturday },
    { day: "Sunday", hours: companyInfo.hours.sunday },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-primary p-4 rounded-full">
                <MessageSquareIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Ready to start your driving journey? Contact us today for a free
              consultation and let our experts guide you to success.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <a href={method.action} className="block">
                <CardHeader>
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">{method.icon}</div>
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium text-primary">
                    {method.value}
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Free Consultation Request</CardTitle>
                <CardDescription>
                  Tell us about your driving goals and we'll create a
                  personalized plan for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircleIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for your interest. We'll contact you within 24
                      hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="courseType">Course Interest</Label>
                      <Select
                        value={formData.courseType}
                        onValueChange={(value) =>
                          handleInputChange("courseType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course type" />
                        </SelectTrigger>
                        <SelectContent>
                          {courseTypes.map((course) => (
                            <SelectItem key={course.value} value={course.value}>
                              <div className="flex items-center space-x-2">
                                {course.icon}
                                <span>{course.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredContact">
                        Preferred Contact Method
                      </Label>
                      <Select
                        value={formData.preferredContact}
                        onValueChange={(value) =>
                          handleInputChange("preferredContact", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your driving goals, experience level, or any specific questions you have..."
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) =>
                          handleInputChange("newsletter", checked as boolean)
                        }
                      />

                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for driving tips and special
                        offers
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                      <SendIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                Multiple ways to reach us. Choose what works best for you.
              </p>
            </div>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5" />

                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Location */}
            <Card id="location">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5" />

                  <span>Our Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">Swiss Drive Academy</div>
                  <div className="text-muted-foreground">
                    {companyInfo.address}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    • 5 minutes walk from Lausanne train station
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Free parking available for students
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Accessible by public transport (Bus lines 1, 2, 3)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay updated with driving tips, success stories, and special
                  offers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <a
                    href={companyInfo.social.facebook}
                    className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={companyInfo.social.instagram}
                    className="bg-pink-100 text-pink-600 p-3 rounded-full hover:bg-pink-200 transition-colors"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={companyInfo.social.linkedin}
                    className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">
                  Emergency Contact
                </CardTitle>
                <CardDescription className="text-orange-700">
                  For urgent matters outside business hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-orange-800 font-medium">
                  Emergency Line: +41 79 123 45 67
                </div>
                <div className="text-sm text-orange-700 mt-1">
                  Available 24/7 for current students only
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and
              processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How long does it take to get a license?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Typically 8-12 months for car licenses and 4-6 months for
                  motorcycle licenses, depending on your availability and
                  learning pace.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you offer lessons in English?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes! We have certified instructors who speak English, German,
                  Italian, and Spanish in addition to French.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What's included in the packages?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our packages include all mandatory courses, practical lessons,
                  exam fees, and post-license training with significant savings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I cancel or reschedule lessons?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, free cancellation with 48+ hours notice. 24-48 hours: 50%
                  charge. Less than 24 hours: full charge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Driving Journey?
            </h2>
            <p className="text-xl opacity-90">
              Don't wait any longer. Contact us today and take the first step
              towards driving independence with Switzerland's premier driving
              school.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-lg px-8"
              >
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}>
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href={`mailto:${companyInfo.email}`}>
                  <MailIcon className="mr-2 h-5 w-5" />
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
