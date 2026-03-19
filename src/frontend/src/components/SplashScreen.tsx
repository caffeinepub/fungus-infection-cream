import { motion } from "motion/react";

export function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <img
          src="/assets/generated/fungus-killer-logo.dim_300x300.png"
          alt="Fungus Killer Logo"
          className="w-32 h-32 rounded-full shadow-2xl border-4 border-yellow-400"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </motion.div>

      {/* App Name */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-bold text-yellow-300 mb-2 text-center px-4"
        style={{ fontFamily: "sans-serif" }}
      >
        फंगस किलर क्रीम
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-emerald-200 text-sm mb-8"
      >
        दाद • खाज • खुजली • फंगल इन्फेक्शन
      </motion.p>

      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-10 h-10 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin" />
        <p className="text-emerald-200 text-sm animate-pulse">
          लोड हो रहा है...
        </p>
      </motion.div>
    </motion.div>
  );
}
