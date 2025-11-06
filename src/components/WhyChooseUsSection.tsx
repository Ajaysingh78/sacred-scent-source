import { Card, CardContent } from "@/components/ui/card";
import { Factory, DollarSign, Award, Package } from "lucide-react";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Factory,
      title: "Direct Factory Supply",
      description: "No middlemen involved. Get the best prices directly from our manufacturing unit with guaranteed authenticity and freshness.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: DollarSign,
      title: "Cost-Effective Bulk Pricing",
      description: "Competitive wholesale rates with attractive margins for distributors. Volume discounts available for larger orders.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Award,
      title: "Consistent Quality",
      description: "ISO certified manufacturing process ensures every batch meets the highest standards of quality, fragrance, and burn time.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Package,
      title: "Wide Range of Fragrances",
      description: "Over 50 unique fragrances including traditional, floral, woody, and wellness variants to cater to diverse customer preferences.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="text-primary"> Namami Enterprises</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for premium incense sticks with unmatched quality, service, and pricing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="card-gradient border-0 shadow-card hover:shadow-warm transition-smooth group text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className={`w-20 h-20 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth`}>
                  <benefit.icon className={`${benefit.color}`} size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-card">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-lg font-medium text-foreground mb-2">Customer Support</div>
              <div className="text-muted-foreground">Always available to assist you</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15 Days</div>
              <div className="text-lg font-medium text-foreground mb-2">Quality Guarantee</div>
              <div className="text-muted-foreground">Return or exchange if unsatisfied</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Pan India</div>
              <div className="text-lg font-medium text-foreground mb-2">Delivery Network</div>
              <div className="text-muted-foreground">Fast and reliable shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;