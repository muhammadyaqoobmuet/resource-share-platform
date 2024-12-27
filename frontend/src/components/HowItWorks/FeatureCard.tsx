import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function FeatureCard({ title, description, icon: Icon, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group relative overflow-hidden bg-white hover:bg-neutral-900 transition-colors duration-500">
        <CardContent className="p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/5 to-neutral-900/0 group-hover:from-white/5 transition-all duration-500" />
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-neutral-900 group-hover:bg-white transition-colors duration-500">
              <Icon className="w-7 h-7 text-white group-hover:text-neutral-900 transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-neutral-900 group-hover:text-white transition-colors duration-500">
              {title}
            </h3>
            <p className="text-neutral-600 group-hover:text-neutral-300 transition-colors duration-500">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}