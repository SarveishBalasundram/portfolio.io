import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaTrophy, FaCertificate, FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import achievements from '../data/achievements.js';
import './certifications.css';

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const filteredItems = filter === 'all'
    ? achievements
    : achievements.filter(a => a.type === filter);

  // Ensure active index is within bounds of filtered items
  const currentIndex = Math.min(active, filteredItems.length - 1);
  const entry = filteredItems[currentIndex] || filteredItems[0];

  const prev = () => setActive(i => (i - 1 + filteredItems.length) % filteredItems.length);
  const next = () => setActive(i => (i + 1) % filteredItems.length);

  return (
    <div className="certs" ref={ref} aria-labelledby="achievements-heading">
      <div className="certs__glow certs__glow--1" aria-hidden="true" />
      <div className="certs__glow certs__glow--2" aria-hidden="true" />

      <div className="certs__inner">
        {/* ── Section Header ───────────────────────────── */}
        <motion.div
          className="certs__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow-wrap">
            <span className="eyebrow-line" aria-hidden="true" />
            <p className="eyebrow">Honors &amp; Credentials</p>
          </div>
          <h2 id="achievements-heading" className="section-heading">
            Certifications &amp; <span className="accent">Awards</span>
          </h2>
          <p className="certs__header-sub">
            Accredited credentials and competitive recognitions reflecting continuous skill acquisition.
          </p>
        </motion.div>

        {/* ── Filter Bar & Counter ─────────────────────── */}
        <div className="certs__controls">
          <div className="certs__filters">
            {[
              { key: 'all', label: 'All Credentials' },
              { key: 'award', label: 'Awards & Honors' },
              { key: 'cert', label: 'Certifications' },
            ].map(tab => (
              <button
                key={tab.key}
                className={`certs__filter-tab ${filter === tab.key ? 'certs__filter-tab--active' : ''}`}
                onClick={() => { setFilter(tab.key); setActive(0); }}
              >
                {filter === tab.key && (
                  <motion.span
                    layoutId="certsTabPill"
                    className="certs__filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="certs__filter-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="certs__counter">
            <span className="certs__counter-current">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="certs__counter-sep">/</span>
            <span className="certs__counter-total">
              {String(filteredItems.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Main Showcase Carousel ───────────────────── */}
        <div className="certs__showcase">
          <button
            className="certs__nav-arrow certs__nav-arrow--prev"
            onClick={prev}
            aria-label="Previous credential"
          >
            <FaChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            {entry && (
              <motion.div
                key={entry.id}
                className="certs__card"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image Display */}
                <div className="certs__img-container">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="certs__img"
                    loading="lazy"
                  />
                  <button
                    className="certs__expand-btn"
                    onClick={() => setLightbox(entry)}
                    aria-label={`View full certificate: ${entry.title}`}
                  >
                    <FaExpand />
                    <span>Enlarge</span>
                  </button>
                </div>

                {/* Metadata & Description */}
                <div className="certs__details">
                  <div className="certs__badge-row">
                    <span className={`certs__type-badge certs__type-badge--${entry.type}`}>
                      {entry.type === 'award' ? <FaTrophy /> : <FaCertificate />}
                      <span>{entry.type === 'award' ? 'Official Award' : 'Verified Certificate'}</span>
                    </span>
                    <span className="certs__date">{entry.date}</span>
                  </div>

                  <h3 className="certs__title">{entry.title}</h3>
                  <div className="certs__issuer">Issued by <strong>{entry.issuer}</strong></div>

                  <p className="certs__desc">{entry.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="certs__nav-arrow certs__nav-arrow--next"
            onClick={next}
            aria-label="Next credential"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* ── Thumbnail Strip ──────────────────────────── */}
        <div className="certs__thumbnails-wrap" role="tablist">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={idx === currentIndex}
              className={`certs__thumb-btn ${idx === currentIndex ? 'certs__thumb-btn--active' : ''}`}
              onClick={() => setActive(idx)}
            >
              <img src={item.image} alt={item.title} className="certs__thumb-img" />
              {idx === currentIndex && (
                <motion.span
                  layoutId="activeThumbBorder"
                  className="certs__thumb-glow-border"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Fullscreen Lightbox ────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="certs__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="certs__lightbox-box"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="certs__lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="certs__lightbox-img"
              />
              <div className="certs__lightbox-caption">
                <span className="certs__lightbox-title">{lightbox.title}</span>
                <span className="certs__lightbox-issuer">{lightbox.issuer} • {lightbox.date}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
