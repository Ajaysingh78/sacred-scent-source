import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Leaf, Users } from "lucide-react";
import factoryImage from "@/assets/factory-interior.jpg";

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
      description: "Established in 2005, we have been spreading divine fragrances across India with consistent quality and innovation.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every batch undergoes rigorous quality checks ensuring consistent fragrance, burn time, and customer satisfaction.",
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "We use only premium natural ingredients sourced from trusted suppliers to create pure, authentic fragrances.",
    },
    {
      icon: Users,
      title: "Trusted by 500+ Distributors",
      description: "Our extensive network of satisfied distributors and wholesalers across India speaks for our reliability.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-primary">Agarwood Creations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Since 2005, spreading fragrance across India
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Our Story
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Started as a small family business in 2005, Agarwood Creations has grown into 
              one of India's most trusted incense stick manufacturers. Our journey began with 
              a simple vision: to create pure, authentic fragrances that bring peace and 
              positivity to every home.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Today, we operate from our state-of-the-art manufacturing facility, combining 
              traditional craftsmanship with modern technology to produce premium quality 
              incense sticks that meet international standards.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-sm px-4 py-2">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={factoryImage}
              alt="Modern incense stick manufacturing facility with quality control"
              className="rounded-2xl shadow-warm w-full"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-transparent" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-gradient border-0 shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary-foreground" size={28} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
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