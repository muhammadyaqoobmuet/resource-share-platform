import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';
import { features } from './features';
import { FeatureCard } from './FeatureCard';
import { SectionTitle } from './SectionTitle';
import { Button } from '@/components/ui/button';

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-neutral-50/50">
      <div className="container px-4 mx-auto">
        <SectionTitle />
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="group hover:bg-neutral-900 hover:text-white transition-all duration-300"
          >
            <span>Get Started Today</span>
            <ArrowRightCircle className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}