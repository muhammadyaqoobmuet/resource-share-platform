import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function TimelineFooter() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-16 text-center"
    >
      <Button
        variant="outline"
        size="lg"
        className="group  bg-white hover:border-white hover:bg-black hover:text-white   transition-all duration-300"
        onClick={() => navigate("/signup")}
      >
        <span>Join the Community</span>
        <ArrowRightCircle className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div >
  );
}