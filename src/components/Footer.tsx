import { motion } from "motion/react";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  const footerLinks = {
    Shop: ["New Arrivals", "Best Sellers", "Sale", "Collections"],
    Company: ["About Us", "Careers", "Press", "Contact"],
    Support: ["FAQ", "Shipping", "Returns", "Track Order"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
  };

  return (
    <footer className="backdrop-blur-xl bg-gradient-to-br from-purple-950/80 to-pink-950/80 border-t border-pink-400/30 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.h3
              className="text-3xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
              whileHover={{ scale: 1.05 }}
            >
              ✨ SHASHIK
            </motion.h3>
            <p className="text-purple-200 mb-6">
              Where luxury meets kawaii magic. Discover premium accessories that define elegance.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-pink-400/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 hover:border-pink-400/60 transition-all duration-300 shadow-lg"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#f472b6" }}
                      className="text-purple-200 hover:text-pink-400 transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-pink-400/30 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-purple-200 text-sm">
            © 2025 Shashik. All rights reserved. Made with ✨
          </p>
          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ color: "#f472b6" }}
              className="text-purple-200 text-sm hover:text-pink-400 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#f472b6" }}
              className="text-purple-200 text-sm hover:text-pink-400 transition-colors"
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}