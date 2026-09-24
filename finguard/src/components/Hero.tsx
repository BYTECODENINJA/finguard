import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './hero.css';

const AVATARS = [
  'https://i.pravatar.cc/64?img=12',
  'https://i.pravatar.cc/64?img=32',
  'https://i.pravatar.cc/64?img=45',
  'https://i.pravatar.cc/64?img=8',
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const cardWrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // one orchestrated load-in sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__line', { yPercent: 110, duration: 1, stagger: 0.12 })
        .from('.hero__sub', { y: 16, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero__actions > *', { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')
        .from(
          '.hero__card',
          { y: 60, opacity: 0, rotate: 0, duration: 0.9, stagger: 0.12 },
          '-=0.6'
        )
        .from('.hero__timeline-item', { x: 24, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.5')
        .from('.hero__users', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4');

      // cursor-driven tilt on the card stack
      const wrap = cardWrap.current;
      if (wrap) {
        const onMove = (e: MouseEvent) => {
          const rect = wrap.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to('.hero__card--1', { rotate: -14 + px * 10, x: px * 18, y: py * 14, duration: 0.6, ease: 'power3.out' });
          gsap.to('.hero__card--2', { rotate: 4 + px * 8, x: px * 14, y: py * 10, duration: 0.6, ease: 'power3.out' });
          gsap.to('.hero__card--3', { rotate: 18 + px * 12, x: px * 22, y: py * 16, duration: 0.6, ease: 'power3.out' });
        };
        wrap.addEventListener('mousemove', onMove);
        return () => wrap.removeEventListener('mousemove', onMove);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero__glow" />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <div className="hero__headline">
            <div className="hero__line-wrap">
              <span className="hero__line">SECURE YOUR</span>
            </div>
            <div className="hero__line-wrap">
              <span className="hero__line hero__line--accent">FINANCIAL FUTURE</span>
            </div>
          </div>
          <p className="hero__sub">
            Trusted protection and expert guidance for your finances — built for people who
            want their money to move as fast as they do.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#get-started" data-cursor>
              Get started <span className="arrow">↗</span>
            </a>
            <div className="hero__users">
              <span className="hero__dot" /> Active users
              <div className="hero__users-row">
                <strong>95K+</strong>
                <div className="hero__avatars">
                  {AVATARS.map((a, i) => (
                    <img src={a} key={i} alt="" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__visual" ref={cardWrap}>
          <div className="hero__card hero__card--1">
            <span className="hero__card-brand">finguard</span>
            <span className="hero__chip" />
          </div>
          <div className="hero__card hero__card--2" />
          <div className="hero__card hero__card--3">
            <span className="hero__card-label">VISA</span>
            <span className="hero__card-name">Jaylen Brown</span>
          </div>

          <ul className="hero__timeline">
            <li className="hero__timeline-item">
              <span>Selecting your provider</span>
            </li>
            <li className="hero__timeline-item">
              <span>Set up your account</span>
            </li>
            <li className="hero__timeline-item">
              <span>Enjoy seamless banking with finguard</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
