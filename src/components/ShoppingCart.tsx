import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart as CartIcon, X, Minus, Plus, Trash2, Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function ShoppingCart({ items, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center z-50 border border-pink-400/30 backdrop-blur-xl transition-all duration-300"
        style={{ boxShadow: "0 0 40px rgba(236, 72, 153, 0.6)" }}
      >
        <motion.div
          animate={itemCount > 0 ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <CartIcon className="w-6 h-6 text-white" />
        </motion.div>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-full flex items-center justify-center text-sm border-2 border-white shadow-lg"
          >
            {itemCount}
          </motion.span>
        )}
        
        {/* Pulse Effect */}
        {itemCount > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-500"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md backdrop-blur-2xl bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-l border-pink-400/30 z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-pink-400/30 flex items-center justify-between backdrop-blur-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6 text-pink-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Shopping Cart</h2>
                      <p className="text-xs text-purple-200">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 flex items-center justify-center hover:bg-pink-500/50 transition-colors border border-pink-400/30"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <CartIcon className="w-20 h-20 text-pink-400/30 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-purple-200 mb-2">Your cart is empty</p>
                      <p className="text-sm text-purple-300/50">Add some kawaii items! ✨</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {items.map((item, index) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -50, scale: 0.8 }}
                            transition={{ 
                              type: "spring", 
                              damping: 25, 
                              stiffness: 300,
                              delay: index * 0.05 
                            }}
                            onHoverStart={() => setHoveredItem(item.id)}
                            onHoverEnd={() => setHoveredItem(null)}
                            className="relative group"
                          >
                            {/* Glow Effect on Hover */}
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"
                              animate={hoveredItem === item.id ? { opacity: 0.5 } : { opacity: 0 }}
                            />

                            <motion.div
                              whileHover={{ y: -4 }}
                              className="relative backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-4 border border-pink-400/20 shadow-lg overflow-hidden"
                            >
                              {/* Animated Background Pattern */}
                              <motion.div
                                className="absolute inset-0 opacity-10"
                                animate={{
                                  backgroundPosition: ["0% 0%", "100% 100%"],
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                style={{
                                  backgroundImage: "radial-gradient(circle, rgba(236,72,153,0.3) 1px, transparent 1px)",
                                  backgroundSize: "20px 20px",
                                }}
                              />

                              <div className="relative flex gap-4">
                                {/* Image Container with Effects */}
                                <motion.div 
                                  className="relative w-24 h-24 flex-shrink-0"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-400/30 shadow-lg">
                                    <ImageWithFallback
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  
                                  {/* Sparkle Effect on Hover */}
                                  <AnimatePresence>
                                    {hoveredItem === item.id && (
                                      <>
                                        {[...Array(4)].map((_, i) => (
                                          <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ 
                                              opacity: [0, 1, 0],
                                              scale: [0, 1, 0],
                                              x: [0, (i % 2 === 0 ? 20 : -20)],
                                              y: [0, (i < 2 ? -20 : 20)]
                                            }}
                                            exit={{ opacity: 0 }}
                                            transition={{ 
                                              duration: 1,
                                              repeat: Infinity,
                                              delay: i * 0.2
                                            }}
                                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-400 rounded-full"
                                          />
                                        ))}
                                      </>
                                    )}
                                  </AnimatePresence>

                                  {/* Quantity Badge */}
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs border-2 border-white shadow-lg"
                                  >
                                    {item.quantity}
                                  </motion.div>
                                </motion.div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-pink-100 mb-1 truncate">{item.name}</h3>
                                  
                                  {/* Price with Animation */}
                                  <motion.p 
                                    className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3"
                                    animate={hoveredItem === item.id ? { scale: [1, 1.05, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                  >
                                    ${item.price} × {item.quantity} = <span className="text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                  </motion.p>

                                  {/* Quantity Controls */}
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 backdrop-blur-xl bg-white/10 rounded-full p-1 border border-pink-400/30">
                                      <motion.button
                                        whileHover={{ scale: 1.2, backgroundColor: "rgba(236, 72, 153, 0.5)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                        className="w-7 h-7 rounded-full backdrop-blur-xl bg-white/10 flex items-center justify-center transition-colors"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </motion.button>

                                      <motion.span 
                                        key={item.quantity}
                                        initial={{ scale: 1.5, color: "#ec4899" }}
                                        animate={{ scale: 1, color: "#fce7f3" }}
                                        className="w-8 text-center"
                                      >
                                        {item.quantity}
                                      </motion.span>

                                      <motion.button
                                        whileHover={{ scale: 1.2, backgroundColor: "rgba(236, 72, 153, 0.5)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        className="w-7 h-7 rounded-full backdrop-blur-xl bg-white/10 flex items-center justify-center transition-colors"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </motion.button>
                                    </div>

                                    {/* Action Buttons */}
                                    <motion.button
                                      whileHover={{ scale: 1.15 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="w-8 h-8 rounded-full backdrop-blur-xl bg-white/10 flex items-center justify-center hover:bg-pink-500/30 transition-colors border border-pink-400/20"
                                    >
                                      <Heart className="w-4 h-4" />
                                    </motion.button>

                                    <motion.button
                                      whileHover={{ 
                                        scale: 1.15,
                                        backgroundColor: "rgba(239, 68, 68, 0.3)",
                                        rotate: [0, -10, 10, -10, 0]
                                      }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => onRemoveItem(item.id)}
                                      className="w-8 h-8 rounded-full backdrop-blur-xl bg-white/10 flex items-center justify-center transition-colors border border-pink-400/20"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </div>
                              </div>

                              {/* Progress Bar for Item Value */}
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((item.price * item.quantity / 500) * 100, 100)}%` }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-b-2xl"
                              />
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-pink-400/30 backdrop-blur-xl bg-white/5">
                    {/* Savings Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-xl backdrop-blur-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-pink-200 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Free shipping unlocked!
                        </span>
                        <span className="text-purple-200">✨</span>
                      </div>
                    </motion.div>

                    {/* Total */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-lg text-pink-100 block">Total</span>
                        <span className="text-xs text-purple-200">Including all taxes</span>
                      </div>
                      <motion.span 
                        className="text-4xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ${total.toFixed(2)}
                      </motion.span>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)" }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-lg shadow-pink-500/50 border border-pink-400/30 transition-all duration-300 overflow-hidden"
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        ✨ Proceed to Checkout
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}