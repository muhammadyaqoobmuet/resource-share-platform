import { TimelineHeader } from './TimelineHeader';
import { TimelineStep } from './TimelineStep';
import { TimelineFooter } from './TimelineFooter';
import { timelineSteps } from './timelineData';

export function Timeline() {
  return (
    <section className="py-24 md:py-32 bg-[#090909]">
      <div className="container px-4 mx-auto">
        <TimelineHeader />
        
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

        <TimelineFooter />
      </div>
    </section>
  );
}