import { motion } from 'framer-motion';

export function TimelineHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center mb-20"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="mb-6 inline-block"
      >
        {/* <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gradient-to-br border border-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Getting Started
        </span> */}
        <AnimatedPawBadge />
      </motion.div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4  bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent ">
        Your Journey Starts Here
      </h2>
      <p className="text-lg text-neutral-600">
        Follow these simple steps to join our resource-sharing community
      </p>
    </motion.div>
  );
}


function AnimatedPawBadge() {
  return (
    <div className="relative inline-block group">
      <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#6175AD]  to-[#443EA9] hover:from-[#443EA9] hover:to-[#6175AD] text-white text-sm font-medium hover:shadow-lg transition-all duration-900">
        Getting Started
      </span>

      <div className="absolute -right-4 -top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">
        <span className="text-2xl">❤️</span>
      </div>
    </div>
  );
}