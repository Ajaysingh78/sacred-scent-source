import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Leaf, Users } from "lucide-react";
import factoryImage from "@/assets/factory-interior.png";

const AboutSection = () => {
  const certifications = [
    "ISO 9001:2015",
    "100% Natural",
    "Handcrafted",
    "Export Quality",
  ];

  const features = [
    {
      icon: Award,
      title: "20+ Years Legacy",
      description:
        "Established in 2005, we have been spreading divine fragrances across India with consistent quality and innovation.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every batch undergoes rigorous quality checks ensuring consistent fragrance, burn time, and customer satisfaction.",
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description:
        "We use only premium natural ingredients sourced from trusted suppliers to create pure, authentic fragrances.",
    },
    {
      icon: Users,
      title: "Trusted by 500+ Distributors",
      description:
        "Our extensive network of satisfied distributors and wholesalers across India speaks for our reliability.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            About <span className="text-primary">Namami Enterprises</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From Struggles to Success — The Inspiring Journey of Namami Enterprises
          </p>
        </div>

        {/* Story + Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700"></div>
            <img
              src={factoryImage}
              alt="Namami Enterprises manufacturing facility"
              className="relative rounded-3xl shadow-xl w-full object-cover"
            />
          </div>

          {/* Text side */}
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              From a Dream to a Legacy
            </h3>

            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                Every achievement begins with a dream — and such a dream was envisioned by{" "}
                <strong className="text-foreground">Mr. Pawan Singh</strong>, the Founder
                and Managing Director of Namami Enterprises.
              </p>
              <p>
                While working at reputed positions in the corporate world, Mr. Singh gained
                deep experience, leadership excellence, and sharp business acumen. Yet, he
                longed for something greater —{" "}
                <em>to build his own legacy of quality, trust, and innovation.</em>
              </p>
              <p>
                With courage and vision, he took the leap toward entrepreneurship. Alongside
                his higher education, he pursued Professional Development Programs that
                strengthened his strategic and managerial skills.
              </p>
              <p>
                The early days were tough — limited resources, intense competition, and
                multiple setbacks tested his determination. But instead of giving up, he
                turned every obstacle into an opportunity and every failure into a lesson.
              </p>
              <p>
                Through perseverance and belief,{" "}
                <strong className="text-foreground">Namami Enterprises</strong> rose to
                become a symbol of quality and reliability — a story of dreams realized
                through dedication and integrity.
              </p>
            </div>

            <blockquote className="mt-8 border-l-4 border-primary pl-5 italic text-foreground text-lg leading-relaxed">
              “Dreams come true only when we believe in them, live them, and dedicate
              ourselves every day to making them real.” <br />
              <span className="block mt-2 font-semibold text-primary">
                — Mr. Pawan Singh, Founder & Managing Director
              </span>
            </blockquote>

            <div className="flex flex-wrap gap-3 mt-10">
              {certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="secondary"
                  className="text-sm px-4 py-2 bg-secondary/80 hover:bg-secondary/100 transition"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-card hover:shadow-warm transition-all duration-500 hover:-translate-y-1 bg-background/90 backdrop-blur"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="text-primary" size={28} />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
