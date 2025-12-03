import { motion } from "motion/react";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("✨ Thanks for subscribing! ✨");
    setEmail("");
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-900 via-purple-900 to-pink-900"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Glass Bubbles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full backdrop-blur-xl border border-pink-400/20"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "rgba(236, 72, 153, 0.2)" : "rgba(168, 85, 247, 0.2)"
              }, transparent)`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Join Our Exclusive Club ✨
          </h2>
          <p className="text-pink-200 text-lg mb-8">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email ✨"
              required
              className="flex-1 px-6 py-4 backdrop-blur-xl bg-white/10 border border-pink-400/50 rounded-full text-white placeholder:text-pink-200/50 focus:outline-none focus:border-pink-400 transition-all duration-300 shadow-lg"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-pink-500/50 border border-pink-400/30 transition-all duration-300"
            >
              Subscribe
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}