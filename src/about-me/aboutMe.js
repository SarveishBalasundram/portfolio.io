import { useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaLaptopCode, FaAward, FaDownload, FaPaperPlane } from 'react-icons/fa';
import resume from './resume.pdf';
import sarveishImage from './sarveish_new.jpg';
import './aboutMe.css';

/* ── 3D Tilt Card ─────────────────────────────────────────────── */
function TiltPortrait({ src, alt }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 240, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 240, damping: 25 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      className="about__photo-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="about__photo-frame">
        {/* Animated glowing border */}
        <div className="about__photo-glow-border" aria-hidden="true" />
        <div className="about__photo-inner">
          <img src={src} alt={alt} className="about__photo" loading="lazy" />
          <div className="about__photo-overlay" aria-hidden="true" />
        </div>
      </div>

      {/* Floating status badge */}
      <motion.div
        className="about__status-badge"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="about__status-dot" />
        <span>Digital Business Analyst @ Hilti</span>
      </motion.div>
    </motion.div>
  );
}

const STATS = [
  { icon: <FaLaptopCode />, label: 'Tech Stack', value: '25+ Skills' },
  { icon: <FaAward />, label: 'Achievements', value: '8 Awards & Certs' },
  { icon: <FaGraduationCap />, label: 'Degree', value: 'UTM First Class (3.99)' },
];

export default function AboutMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="about" ref={ref} aria-labelledby="about-heading">
      <div className="about__glow about__glow--1" aria-hidden="true" />
      <div className="about__glow about__glow--2" aria-hidden="true" />

      <div className="about__inner">
        {/* ── Left: Portrait ─────────────────────────── */}
        <motion.div
          className="about__visual-col"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltPortrait src={sarveishImage} alt="Sarveish Balasundram" />

          {/* Location & Uni chips */}
          <div className="about__chips">
            <span className="about__chip">
              <FaMapMarkerAlt className="about__chip-icon" /> Malaysia
            </span>
            <span className="about__chip">
              <FaGraduationCap className="about__chip-icon" /> UTM Graduate (3.99 CGPA)
            </span>
          </div>
        </motion.div>

        {/* ── Right: Text & Stats ─────────────────────── */}
        <motion.div
          className="about__text-col"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow-wrap">
            <span className="eyebrow-line" aria-hidden="true" />
            <p className="eyebrow">Get to know me</p>
          </div>

          <h2 id="about-heading" className="about__heading">
            Architecting Future-Proof <span className="accent">Digital Solutions</span>
          </h2>

          <div className="about__bio-group">
            <p className="about__bio">
              I'm <strong className="text-highlight">Sarveish Balasundram</strong>, a{' '}
              <strong className="text-highlight">Digital Business Analyst</strong> at{' '}
              <strong className="text-highlight">Hilti Asia Services Sdn Bhd</strong> and a Software Engineering graduate from{' '}
              <strong className="text-highlight">Universiti Teknologi Malaysia (UTM)</strong> with a First-Class Honours CGPA of <strong>3.99</strong>.
            </p>

            <p className="about__bio">
              With hands-on experience spanning production fintech systems at <strong>Ant International</strong>, full-stack enterprise solutions at <strong>Worldtech Solutions</strong>, and winning national hackathons, I bridge business requirements and engineering execution. I specialize in <strong>React, Spring Boot, Java, and Agile digital transformation</strong>.
            </p>

            <p className="about__bio">
              Beyond enterprise systems, I also actively <strong className="text-highlight">freelance developing custom websites and business applications</strong> — crafting fast, responsive, and production-ready digital experiences for clients.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="about__stats-grid">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="about__stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, borderColor: 'rgba(196, 181, 253, 0.4)' }}
              >
                <div className="about__stat-icon">{stat.icon}</div>
                <div className="about__stat-val">{stat.value}</div>
                <div className="about__stat-lbl">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="about__actions">
            <motion.a
              href={resume}
              download="Sarveish_Balasundram_Resume.pdf"
              className="btn btn--primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload className="btn__icon" aria-hidden="true" />
              <span>Download Resume</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="btn btn--ghost"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FaPaperPlane className="btn__icon" aria-hidden="true" />
              <span>Let's Talk</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
