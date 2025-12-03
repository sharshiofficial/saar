import { motion } from "motion/react";
import { Truck, Shield, Headphones, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Guaranteed authenticity",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(236, 72, 153, 0.5) 35px, rgba(236, 72, 153, 0.5) 70px)`,
        }} />
      </div>

      {/* Glass Orbs Background */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full backdrop-blur-3xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "rgba(236, 72, 153, 0.1)" : "rgba(168, 85, 247, 0.1)"
              }, transparent)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <motion.div
                  className="backdrop-blur-xl bg-white/10 border border-pink-400/30 rounded-3xl p-8 text-center hover:border-pink-400/60 transition-all duration-300 shadow-lg"
                  whileHover={{ boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)" }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl mb-6 mx-auto shadow-lg shadow-pink-500/50 border border-pink-400/30"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl mb-2 text-pink-100">{feature.title}</h3>
                  <p className="text-purple-200">{feature.description}</p>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}