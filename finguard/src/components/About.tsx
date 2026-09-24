import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './about.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 500, suffix: 'K', label: 'Users', sub: 'finguard rapidly attracting a substantial user base of over 600,000 customers within its first year.', tone: 'signal' },
  { value: 98, suffix: '%', label: 'Faster transactions', sub: 'Users enjoy faster transaction processing time across every account.', tone: 'ink' },
  { value: 24, suffix: 'K', label: 'Partner ATMs', sub: 'A network of over 200,000 partner ATMs worldwide, always in reach.', tone: 'light' },
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              val: target,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(counter.val).toString();
              },
            }),
        });
      });

      gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stat-row', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={root}>
      <div className="wrap">
        <div className="about__head">
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="about__title">
              Getting to know
              <br />
              finguard
            </h2>
          </div>
          <p className="about__copy">
            We are more than a financial service provider — we're your trusted partner in
            navigating the complexities of modern finance, one clear decision at a time.
          </p>
        </div>

        <div className="stat-row">
          {STATS.map((s) => (
            <div className={`stat-card stat-card--${s.tone}`} key={s.label}>
              <div className="stat-card__num">
                <span className="stat-num" data-value={s.value}>
                  0
                </span>
                <span>{s.suffix}</span>
              </div>
              <p className="stat-card__label">{s.label}</p>
              <p className="stat-card__sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
