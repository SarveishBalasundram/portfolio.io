import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaCopy, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import './Contact.css';

const CONTACT_CHANNELS = [
  {
    icon: <FaEnvelope />,
    label: 'Direct Email',
    value: 'b.sarveish26@gmail.com',
    href: 'mailto:b.sarveish26@gmail.com',
    desc: 'Best channel for formal inquiries & opportunities',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn Profile',
    value: 'sarveish-balasundram',
    href: 'https://www.linkedin.com/in/sarveish-balasundram/',
    desc: 'Professional network & career updates',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub Repositories',
    value: 'SarveishBalasundram',
    href: 'https://github.com/SarveishBalasundram',
    desc: 'Open source work, scripts & side projects',
  },
  {
    icon: <FaInstagram />,
    label: 'Instagram',
    value: '@sarveish',
    href: 'https://www.instagram.com/sarveish/',
    desc: 'Life, tech community & casual updates',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('b.sarveish26@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="contact" ref={ref} aria-labelledby="contact-heading">
      {/* Background ambient elements */}
      <div className="contact__glow contact__glow--1" aria-hidden="true" />
      <div className="contact__glow contact__glow--2" aria-hidden="true" />
      <div className="contact__backdrop-text" aria-hidden="true">CONNECT</div>

      <div className="contact__inner">
        <motion.div
          className="contact__content"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="eyebrow-wrap">
            <span className="eyebrow-line" aria-hidden="true" />
            <p className="eyebrow">Initiate Contact</p>
          </div>

          <h2 id="contact-heading" className="contact__heading">
            Let's Build Something <span className="accent">Exceptional</span>
          </h2>

          <p className="contact__sub">
            Whether you have an upcoming project, a potential role, or simply want to exchange ideas on modern engineering — my inbox is always open.
          </p>

          {/* Quick status pill */}
          <div className="contact__availability-pill">
            <span className="contact__pulse-dot" />
            <span>Open to freelancing &amp; collaborations — let's build something great</span>
          </div>

          {/* Email Primary Card */}
          <div className="contact__primary-box">
            <a href="mailto:b.sarveish26@gmail.com" className="contact__primary-email">
              <FaEnvelope className="contact__primary-icon" />
              <span>b.sarveish26@gmail.com</span>
            </a>
            <button
              onClick={copyEmail}
              className="contact__copy-btn"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <FaCheck className="contact__copy-icon contact__copy-icon--success" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="contact__copy-icon" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Channels Grid */}
          <div className="contact__cards-grid">
            {CONTACT_CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                className="contact__card"
                target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                rel={ch.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.45 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="contact__card-icon-box">
                  {ch.icon}
                </div>
                <div className="contact__card-meta">
                  <div className="contact__card-top">
                    <span className="contact__card-label">{ch.label}</span>
                    <FaExternalLinkAlt className="contact__card-arrow" />
                  </div>
                  <span className="contact__card-val">{ch.value}</span>
                  <span className="contact__card-desc">{ch.desc}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
