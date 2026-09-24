import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './partners.css';

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = ['Apple Pay', 'PayPal', 'Wise', 'G Pay'];

export default function Partners() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partner-tile', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.partner-grid', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="partners" className="partners" ref={root}>
      <div className="wrap partners__inner">
        <div className="partners__copy">
          <p className="eyebrow">Our trusted partners</p>
          <h2 className="partners__title">
            Real-time financial
            <br />
            monitoring
          </h2>
          <p className="about__copy partners__desc">
            Just like us, finguard believes in building long-term relationships with clients.
            Their focus on customer service aligns perfectly with our own values.
          </p>
          <div className="partners__stat">
            <span className="partners__stat-num">98%</span>
            <p>Partners are happy with our collaboration, noting mutual growth since joining.</p>
          </div>
        </div>

        <div className="partner-grid">
          {PARTNERS.map((p) => (
            <div className="partner-tile" key={p} data-cursor>
              {p}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap partners__cta">
        <p>Creating impactful solutions and lasting partnerships.</p>
        <a className="btn ghost" href="#contact" data-cursor>
          Let's work together
        </a>
      </div>
    </section>
  );
}
