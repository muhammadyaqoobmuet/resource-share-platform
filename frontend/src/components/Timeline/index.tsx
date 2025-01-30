import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import { timelineSteps } from "./timelineData";
import { TimelineStep } from "./TimelineStep";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Timeline() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("clicked");
    navigate("/signup");
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-4 mx-auto">
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

        <div className="max-w-2xl mx-auto">
          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={index}
              {...step}
              index={index}
              isLast={index === timelineSteps.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            variant="outline"
            size="lg"
            className="group hover:bg-neutral-900 hover:text-white transition-all duration-300"
          >
            <a href="/signup">Join the Community</a>
            <ArrowRightCircle className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
