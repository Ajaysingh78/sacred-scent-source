import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Leaf,
  Users,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import factoryImage from "@/assets/factory-interior.png";
import factoryImage2 from "@/assets/mimg11.jpeg";
import factoryImage3 from "@/assets/pwangurjar.jpeg";

const AboutSection = () => {
  const certifications = [
    "ISO 9001:2015",
    "100% Natural",
    "Handcrafted",
    "Export Quality",
  ];

  const carouselImages = [
    {
      src: factoryImage3,
      alt: "State-of-the-art manufacturing facility",
      caption: "Founder Mr. Pawan Singh Gurjar",
    },
    {
      src: factoryImage2,
      alt: "Quality assurance and testing lab",
      caption: "Rigorous Quality Control",
    },
    {
      src: factoryImage,
      alt: "Distribution network across India",
      caption: "Pan-India Distribution",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const stats = [
    { icon: Users, value: "500+", label: "Trusted Partners" },
    { icon: Award, value: "ISO", label: "Certified Quality" },
    { icon: TrendingUp, value: "", label: "Years Legacy" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every batch undergoes rigorous quality checks ensuring consistent fragrance, burn time, and customer satisfaction.",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description:
        "We use only premium natural ingredients sourced from trusted suppliers to create pure, authentic fragrances.",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Heart,
      title: "Trusted by 500+ Distributors",
      description:
        "Our extensive network of satisfied distributors and wholesalers across India speaks for our reliability.",
      gradient: "from-rose-500/10 to-pink-500/10",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background"
    >
      {/* Sophisticated background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Premium heading section */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary">
              About Namami
            </span>
            <br />
            <span className="text-primary">Enterprises</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From Struggles to Success — The Inspiring Journey of Excellence
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Enhanced Carousel - 5 columns */}
          <div
            className="lg:col-span-5 relative group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="sticky top-24">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-secondary/30 backdrop-blur-xl border border-primary/10">
                {/* Carousel container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {carouselImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                      }`}
                    >
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                      {/* Image caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-foreground font-semibold text-lg md:text-xl">{image.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Premium navigation controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-primary/20 hover:border-primary/40"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="text-foreground" size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-primary/20 hover:border-primary/40"
                    aria-label="Next"
                  >
                    <ChevronRight className="text-foreground" size={20} />
                  </button>
                </div>

                {/* Elegant progress indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx)} className="group/dot relative" aria-label={`Slide ${idx + 1}`}>
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          idx === currentSlide ? "w-12 bg-primary" : "w-8 bg-background/40 group-hover/dot:bg-background/60"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats overlay */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Premium story content - 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                From a Dream to a <span className="text-primary">Legacy</span>
              </h3>

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                  Every achievement begins with a dream — and such a dream was envisioned by{" "}
                  <strong className="text-foreground font-semibold">Mr. Pawan Singh</strong>, the Founder and
                  Managing Director of Namami Enterprises.
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  While working at reputed positions in the corporate world, Mr. Singh gained deep experience, leadership excellence,
                  and sharp business acumen. Yet, he longed for something greater —{" "}
                  <em className="text-foreground/90 not-italic font-medium">to build his own legacy of quality, trust, and innovation.</em>
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  With courage and vision, he took the leap toward entrepreneurship. Alongside his higher education, he pursued Professional
                  Development Programs that strengthened his strategic and managerial skills.
                </p>

                <div className="relative pl-6 border-l-2 border-primary/30 py-2 my-8">
                  <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                    The early days were tough — limited resources, intense competition, and multiple setbacks tested his determination. But instead
                    of giving up, he turned every obstacle into an opportunity and every failure into a lesson.
                  </p>
                </div>

                <p className="text-base md:text-lg leading-relaxed">
                  Through perseverance and belief, <strong className="text-foreground font-semibold">Namami Enterprises</strong> rose to become a
                  symbol of quality and reliability — a story of dreams realized through dedication and integrity.
                </p>
              </div>

              {/* Founder quote */}
              <div className="mt-10 relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                <blockquote className="pl-8 py-6 relative">
                  <svg className="absolute -left-2 -top-2 w-12 h-12 text-primary/10" fill="currentColor" viewBox="0 0 32 32" aria-hidden>
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                  </svg>
                  <p className="text-lg md:text-xl text-foreground/90 italic leading-relaxed mb-4">
                    Dreams come true only when we believe in them, live them, and dedicate ourselves every day to making them real.
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="w-12 h-0.5 bg-primary rounded-full" />
                    <cite className="text-primary font-semibold not-italic">Mr. Pawan Singh</cite>
                    <span className="text-sm text-muted-foreground">Founder &amp; Managing Director</span>
                  </footer>
                </blockquote>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-3 mt-8">
                {certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="secondary"
                    className="px-5 py-2.5 text-sm font-medium bg-gradient-to-br from-secondary/80 to-secondary/60 hover:from-secondary hover:to-secondary/80 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Award className="w-3.5 h-3.5 mr-1.5 inline" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative border-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <CardContent className="relative p-8">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="text-primary" size={28} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h4>

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feature.description}</p>

                  <div className="mt-6 pt-6 border-t border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-primary text-sm font-medium inline-flex items-center gap-2">
                      Learn more
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 4rem 4rem;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
