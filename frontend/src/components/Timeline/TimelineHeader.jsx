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
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neutral-900 text-white">
          Getting Started
        </span>
      </motion.div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Your Journey Starts Here
      </h2>
      <p className="text-lg text-neutral-600">
        Follow these simple steps to join our resource-sharing community
      </p>
    </motion.div>
  );
}