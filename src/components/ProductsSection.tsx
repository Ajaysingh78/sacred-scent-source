import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import sandalwoodImage from "@/assets/sandalwood-incense.jpg";
import roseImage from "@/assets/rose-incense.jpg";
import jasmineImage from "@/assets/jasmine-incense.jpg";

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "Sandalwood Premium",
      image: sandalwoodImage,
      description: "Rich, woody fragrance with authentic sandalwood essence. Perfect for meditation and spiritual practices.",
      packaging: "50 sticks per box",
      category: "Premium",
      features: ["Long burning", "Natural ingredients", "Export quality"],
    },
    {
      id: 2,
      name: "Rose Garden",
      image: roseImage,
      description: "Delicate rose fragrance that creates a romantic and peaceful atmosphere in any space.",
      packaging: "50 sticks per box",
      category: "Floral",
      features: ["Fresh fragrance", "Long lasting", "Handcrafted"],
    },
    {
      id: 3,
      name: "Jasmine Delight",
      image: jasmineImage,
      description: "Sweet, enchanting jasmine scent that brings the essence of blooming gardens indoors.",
      packaging: "50 sticks per box",
      category: "Floral",
      features: ["Natural essence", "Premium quality", "Smooth burn"],
    },
    {
      id: 4,
      name: "Lavender Dreams",
      image: sandalwoodImage, // Reusing for demo
      description: "Calming lavender fragrance perfect for relaxation, stress relief, and better sleep.",
      packaging: "50 sticks per box",
      category: "Wellness",
      features: ["Stress relief", "Sleep aid", "Natural herbs"],
    },
    {
      id: 5,
      name: "Mogra Special",
      image: jasmineImage, // Reusing for demo
      description: "Traditional mogra fragrance that captures the essence of Indian festivals and celebrations.",
      packaging: "50 sticks per box",
      category: "Traditional",
      features: ["Festival special", "Authentic fragrance", "Cultural essence"],
    },
    {
      id: 6,
      name: "Premium Mix",
      image: roseImage, // Reusing for demo
      description: "Carefully curated blend of our bestselling fragrances for a unique aromatic experience.",
      packaging: "60 sticks per box",
      category: "Special",
      features: ["Mixed varieties", "Best sellers", "Value pack"],
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Premium": return "bg-accent";
      case "Floral": return "bg-pink-500";
      case "Wellness": return "bg-green-500";
      case "Traditional": return "bg-orange-500";
      case "Special": return "bg-purple-500";
      default: return "bg-primary";
    }
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Premium Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our wide range of authentic fragrances, each crafted with care using traditional methods and premium ingredients
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="card-gradient border-0 shadow-card hover:shadow-warm transition-smooth group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} - Premium incense sticks`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${getCategoryColor(product.category)} text-white`}
                >
                  {product.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    📦 {product.packaging}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                >
                  Request Quote
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="cta" size="lg" className="px-8">
            View Complete Catalog
          </Button>
          <p className="text-muted-foreground mt-4">
            Custom fragrances and packaging available on request
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;