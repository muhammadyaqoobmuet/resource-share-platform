import { motion } from 'framer-motion';

export function SectionTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 inline-block"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neutral-900 text-white">
            Resource Sharing Platform
          </span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          How It Works
        </h2>
        <p className="text-lg md:text-xl text-neutral-600">
          Join our campus community in sharing and accessing resources efficiently and sustainably.
        </p>
      </div>
    </motion.div>
  );
}