"use client";

import Image from "next/image";
import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const KEY_PREFIX_LENGTH = 3;
const YELLOW_ARROW_PATH =
  "M0.0629449 66.2957C0.0667798 66.848 0.517593 67.2926 1.06986 67.2888L10.0696 67.2263C10.6219 67.2224 11.0665 66.7716 11.0627 66.2193C11.0588 65.6671 10.608 65.2225 10.0558 65.2263L2.05595 65.2819L2.00041 57.2821C1.99657 56.7298 1.54576 56.2852 0.993487 56.289C0.441215 56.2929 -0.00338064 56.7437 0.000454386 57.2959L0.0629449 66.2957ZM120.447 21.1263L119.455 20.9927L120.447 21.1263ZM80.7387 34.3965L81.7103 34.6333V34.6333L80.7387 34.3965ZM1.06292 66.2888L1.77492 66.991C30.2063 38.162 61.247 17.2455 84.4525 8.38283C96.0998 3.9345 105.563 2.60503 111.712 4.59798C114.738 5.57871 116.944 7.35603 118.267 9.97972C119.605 12.6309 120.095 16.2522 119.455 20.9927L120.447 21.1263L121.438 21.2599C122.109 16.2767 121.633 12.2104 120.053 9.07889C118.459 5.91981 115.796 3.81918 112.329 2.69541C105.491 0.479375 95.4683 2.03476 83.739 6.51445C60.1913 15.5078 28.9181 36.62 0.350921 65.5866L1.06292 66.2888ZM120.447 21.1263L119.455 20.9927C116.363 43.928 104.576 55.1525 95.0032 56.7851C90.2379 57.5978 86.0082 56.0673 83.4129 52.465C80.7937 48.8295 79.699 42.8864 81.7103 34.6333L80.7387 34.3965L79.7671 34.1598C77.6743 42.7474 78.71 49.3588 81.7901 53.6341C84.8942 57.9425 89.9328 59.6787 95.3394 58.7567C106.111 56.9197 118.281 44.6684 121.438 21.2599L120.447 21.1263ZM80.7387 34.3965L81.7103 34.6333C86.353 15.5822 104.166 5.896 122.651 2.96944C131.868 1.5103 141.159 1.75359 148.882 3.32818C156.656 4.91308 162.644 7.80485 165.488 11.4666L166.277 10.8532L167.067 10.2398C163.777 6.00405 157.202 2.98331 149.281 1.3685C141.311 -0.256658 131.778 -0.500346 122.338 0.994045C103.513 3.97457 84.6904 13.9575 79.7671 34.1598L80.7387 34.3965Z";

export interface ScrollRevealParagraphProps {
  paragraph: string;
  className?: string;
  trackClassName?: string;
  stickyClassName?: string;
  revealProgress?: number;
  revealStart?: number;
}

export default function ScrollRevealParagraph({
  paragraph,
  className = "",
  trackClassName = "min-h-[200vh]",
  stickyClassName = "sticky top-0 flex min-h-[100dvh] items-center relative",
  revealProgress = 1,
  revealStart = 0,
}: ScrollRevealParagraphProps) {
  const shouldReduceMotion = useReducedMotion();
  const scrollTrack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollTrack,
    offset: ["start start", "end start"],
  });

  const words = paragraph.split(" ");
  const paragraphClasses = `text-3xl font-heading leading-relaxed font-medium ${className}`;
  const clampedRevealProgress = Math.min(Math.max(revealProgress, 0.1), 1);
  const clampedRevealStart = Math.min(Math.max(revealStart, 0), 0.95);
  const delayedProgress = useTransform(
    scrollYProgress,
    [clampedRevealStart, 1],
    [0, 1]
  );
  const arrowPathLength = useTransform(delayedProgress, [0, 0.24], [0, 1]);
  const ticketOpacity = useTransform(delayedProgress, [0.1, 0.20], [0, 1]);
  const ticketY = useTransform(delayedProgress, [0.1, 0.20], [40, 0]);

  const qrOpacity = useTransform(delayedProgress, [0.20, 0.30], [0, 1]);
  const qrY = useTransform(delayedProgress, [0.20, 0.30], [40, 0]);

  const crossSellingOpacity = useTransform(delayedProgress, [0.30, 0.40], [0, 1]);
  const crossSellingY = useTransform(delayedProgress, [0.30, 0.40], [40, 0]);

  if (shouldReduceMotion) {
    return <p className={paragraphClasses}>{paragraph}</p>;
  }

  return (
    <div className={trackClassName} ref={scrollTrack}>
      <div className={stickyClassName}>
        <motion.div
          className="absolute top-1/6 left-0 rotate-11 shadow-xl rounded-2xl"
          style={{ opacity: ticketOpacity, y: ticketY }}
        >
          <Image
            src="/images/ticket-medio-widget.png"
            alt="Ticket medio widget"
            width={800}
            height={800}
            className="h-auto w-[145px] md:w-[210px] rounded-xl border-green-50 border-4"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/6 left-0 -rotate-11 shadow-xl rounded-2xl"
          style={{ opacity: qrOpacity, y: qrY }}
        >
          <Image
            src="/images/qr-widget.png"
            alt="Ticket medio widget"
            width={800}
            height={800}
            className="h-auto w-[145px] md:w-[100px] rounded-xl border-gray-50 border-4"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/6 right-0 rotate-3 shadow-xl rounded-2xl"
          style={{ opacity: crossSellingOpacity, y: crossSellingY }}
        >
          <Image
            src="/images/cross-selling-widget.png"
            alt="Ticket medio widget"
            width={800}
            height={800}
            className="h-auto w-[250px] rounded-xl border-gray-50 border-4"
          />
        </motion.div>
        <motion.svg
          viewBox="0 0 168 68"
          className="absolute top-1/3 right-0 h-auto w-[150px] -translate-y-1/2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d={YELLOW_ARROW_PATH}
            stroke="#FFCD45"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0"
          />
          <motion.path
            d={YELLOW_ARROW_PATH}
            stroke="#FFCD45"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: arrowPathLength }}
          />
        </motion.svg>
        
        <p className={paragraphClasses}>
          {words.map((word, i) => {
            const start = (i / words.length) * clampedRevealProgress;
            const end = start + (1 / words.length) * clampedRevealProgress;
            return (
              <Word
                key={`word-${i}-${word.slice(0, KEY_PREFIX_LENGTH)}`}
                progress={delayedProgress}
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const shouldReduceMotion = useReducedMotion();
  const opacity = useTransform(
    progress,
    range,
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <span className="relative mr-2 inline-block">
      {shouldReduceMotion ? null : (
        <span className="text-foreground/10">{children}</span>
      )}
      <motion.span
        className="absolute inset-0 text-foreground"
        style={{ opacity }}
      >
        {children}
      </motion.span>
    </span>
  );
};
