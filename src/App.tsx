import { useState } from "react";
import { AnimatedHero } from "./components/AnimatedHero";
import { ProductGrid } from "./components/ProductGrid";
import { ShoppingCart } from "./components/ShoppingCart";
import { FeaturesSection } from "./components/FeaturesSection";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Luxury Designer Bag",
      price: 299,
      image: "https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWd8ZW58MXx8fHwxNzY0NzA3NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Bags",
    },
    {
      id: 2,
      name: "Premium Watch Collection",
      price: 499,
      image: "https://images.unsplash.com/photo-1717157197005-b851de4abc63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2F0Y2h8ZW58MXx8fHwxNzY0NzM2MDgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Watches",
    },
    {
      id: 3,
      name: "Designer Sunglasses",
      price: 199,
      image: "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2NDcwMTk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Eyewear",
    },
    {
      id: 4,
      name: "Fashion Accessories Set",
      price: 149,
      image: "https://images.unsplash.com/photo-1569388330292-79cc1ec67270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzY0NzE0NTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
    },
    {
      id: 5,
      name: "Modern Jewelry Set",
      price: 349,
      image: "https://images.unsplash.com/photo-1764591576264-ad2e0e4e793c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBqZXdlbHJ5fGVufDF8fHx8MTc2NDczNjA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Jewelry",
    },
    {
      id: 6,
      name: "Premium Leather Goods",
      price: 259,
      image: "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzY0NjU2MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Leather",
    },
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-900 text-white">
      <AnimatedHero />
      <FeaturesSection />
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      <Newsletter />
      <Footer />
      <ShoppingCart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}