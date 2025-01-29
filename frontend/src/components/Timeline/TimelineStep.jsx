import { motion } from 'framer-motion';

export function TimelineStep({ title, description, icon: Icon, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative pl-16"
    >
      {!isLast && (
        <div className="absolute left-[27px] top-[45px] w-[2px] h-[calc(100%+2rem)] bg-gradient-to-b from-neutral-900 to-neutral-300" />
      )}
      
      <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center">
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <div className="pt-3 pb-8">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {title}
        </h3>
        <p className="text-[#a7a6a6]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}