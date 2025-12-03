import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ShoppingCart, Heart, Eye, Star, Award, Zap, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useRef } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  // Glow effect following cursor
  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseXPos = (e.clientX - centerX) / (rect.width / 2);
    const mouseYPos = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Mock product details
  const productDetails = {
    rating: 4.8,
    reviews: 128,
    inStock: true,
    features: ["Premium Quality", "Fast Shipping", "Authentic"],
    description: "Elevate your style with this exquisite piece from our curated collection.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden border border-pink-400/30 hover:border-pink-400/60 transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
      >
        {/* Cursor Following Glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]: number[]) =>
                `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(236, 72, 153, 0.4), transparent 50%)`
            ),
          }}
        />

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-500/10 to-purple-500/10">
          <motion.div
            style={{
              transform: useTransform(
                [mouseX, mouseY],
                ([x, y]: number[]) => `translate(${x * 10}px, ${y * 10}px) scale(1.1)`
              ),
            }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </motion.div>

          {/* Info Overlay - Expands on Hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-900/95 to-purple-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Rating */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isHovered ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1 mb-4"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(productDetails.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-pink-200"
                  }`}
                />
              ))}
              <span className="ml-2 text-pink-100">
                {productDetails.rating} ({productDetails.reviews})
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-pink-100 text-center mb-4"
            >
              {productDetails.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center mb-6"
            >
              {productDetails.features.map((feature, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="px-3 py-1 backdrop-blur-xl bg-white/20 rounded-full text-xs border border-pink-400/30 flex items-center gap-1"
                >
                  {i === 0 && <Award className="w-3 h-3" />}
                  {i === 1 && <Zap className="w-3 h-3" />}
                  {i === 2 && <Shield className="w-3 h-3" />}
                  {feature}
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/50 border border-white/30"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="w-6 h-6 text-white" />
              </motion.button>

              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/20 flex items-center justify-center shadow-lg border border-white/30"
              >
                <Eye className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Stock Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 backdrop-blur-xl bg-green-500/80 rounded-full text-xs border border-green-300/30 shadow-lg flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
              In Stock - Ready to Ship
            </motion.div>
          </motion.div>

          {/* Category Badge - Always Visible */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 backdrop-blur-xl bg-pink-500/80 rounded-full text-xs border border-pink-300/30 shadow-lg"
            style={{ transform: "translateZ(30px)" }}
            whileHover={{ scale: 1.1 }}
          >
            ✨ {product.category}
          </motion.div>

          {/* Like Button - Always Visible */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-xl bg-white/20 flex items-center justify-center border border-white/30 shadow-lg"
            style={{ transform: "translateZ(30px)" }}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked ? "fill-pink-500 text-pink-500" : "text-white"
                }`}
              />
            </motion.div>
          </motion.button>

          {/* Floating Particles */}
          {isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 50 : -50)],
                    y: [0, -50 - Math.random() * 30],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="absolute w-2 h-2 rounded-full bg-pink-400"
                  style={{
                    left: `${(i / 8) * 100}%`,
                    bottom: 0,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Product Info - Bottom Section */}
        <motion.div
          className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 relative"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* 3D Depth Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              transform: useTransform(
                [mouseX, mouseY],
                ([x, y]: number[]) => `translate(${x * 5}px, ${y * 5}px)`
              ),
            }}
          />

          <div className="relative">
            <motion.h3
              className="mb-2 text-pink-100"
              animate={isHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {product.name}
            </motion.h3>

            <div className="flex items-center justify-between">
              <motion.span
                className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ${product.price}
              </motion.span>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product)}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-sm shadow-lg shadow-pink-500/30 border border-pink-400/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={isHovered ? { x: ["-100%", "100%"] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                />
                <span className="relative">Add to Cart</span>
              </motion.button>
            </div>

            {/* Mini Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={isHovered ? { width: "100%" } : { width: 0 }}
              className="mt-4 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* 3D Edge Highlight */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]: number[]) =>
                `linear-gradient(${Math.atan2(y, x) * (180 / Math.PI) + 90}deg, rgba(236, 72, 153, 0.5), transparent 50%, rgba(168, 85, 247, 0.5))`
            ),
            opacity: isHovered ? 0.6 : 0,
          }}
        />
      </motion.div>

      {/* Shadow that follows card rotation */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-2xl -z-10 rounded-3xl"
        style={{
          opacity: isHovered ? 0.8 : 0,
          transform: useTransform(
            [rotateX, rotateY],
            ([x, y]: number[]) => `rotateX(${x}deg) rotateY(${y}deg) translateZ(-50px)`
          ),
        }}
      />
    </motion.div>
  );
}