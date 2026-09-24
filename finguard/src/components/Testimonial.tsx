import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './testimonial.css';

const QUOTES = [
  {
    quote:
      'finguard has completely transformed the way I manage my finances. The real-time updates and personalised advice have been invaluable.',
    name: 'Kelly Williams',
    role: 'Head of Design, Layers',
    avatar: 'https://i.pravatar.cc/80?img=13',
  },
  {
    quote:
      'Switching providers felt risky, but the onboarding was seamless and the support team answered every question within minutes.',
    name: 'John Terry',
    role: 'Founder, Northwind',
    avatar: 'https://i.pravatar.cc/80?img=14',
  },
  {
    quote:
      'The spending insights alone paid for the subscription in the first month. I finally understand where my money goes.',
    name: 'Caitlin Clark',
    role: 'Freelance Consultant',
    avatar: 'https://i.pravatar.cc/80?img=15',
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const current = QUOTES[index];

  const go = (dir: number) => {
    setIndex((i) => (i + dir + QUOTES.length) % QUOTES.length);
  };

  return (
    <section className="testimonial">
      <div className="wrap testimonial__inner">
        <p className="eyebrow">What they say about us</p>
        <span className="testimonial__mark">"</span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.quote}
          </motion.blockquote>
        </AnimatePresence>

        <div className="testimonial__footer">
          <AnimatePresence mode="wait">
            <motion.div
              className="testimonial__person"
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={current.avatar} alt="" />
              <div>
                <strong>{current.name}</strong>
                <span>{current.role}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial__controls">
            <button onClick={() => go(-1)} data-cursor aria-label="Previous">
              ←
            </button>
            <button onClick={() => go(1)} data-cursor aria-label="Next">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
