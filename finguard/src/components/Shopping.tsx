import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './shopping.css';

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  'Get 2% cashback on every international purchase.',
  'Access exclusive travel deals and discounts on flights and hotels.',
  'Includes travel insurance and purchase protection as standard.',
];

export default function Shopping() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.shopping__card-front', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to('.shopping__card-back', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
      gsap.from('.shopping__point', {
        x: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.shopping__points', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="benefits" className="shopping" ref={root}>
      <div className="wrap shopping__inner">
        <div className="shopping__visual">
          <div className="shopping__card-back" />
          <div className="shopping__card-front">
            <span className="shopping__chip" />
            <span className="shopping__brand">finguard</span>
            <span className="shopping__number">4921 3310 0982 0324</span>
          </div>
        </div>

        <div>
          <p className="eyebrow">Benefits</p>
          <h2 className="shopping__title">
            Shopping on
            <br />
            international
          </h2>
          <ul className="shopping__points">
            {POINTS.map((p) => (
              <li className="shopping__point" key={p}>
                <span className="shopping__point-icon" />
                {p}
              </li>
            ))}
          </ul>
          <a className="btn" href="#learn-more" data-cursor>
            Learn more <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
