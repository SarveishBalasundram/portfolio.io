import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import sbLogo from '../SB_Logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'projects',     label: 'Projects' },
  { id: 'experience',   label: 'Experience' },
  { id: 'skills',       label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact',      label: 'Contact' },
];

/* ── Theme Toggle Pill ──────────────────────────────────────── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <div className="theme-toggle__track">
        <motion.div
          className="theme-toggle__thumb"
          animate={{ x: isDark ? 0 : 24 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
        <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
          <FaMoon />
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
          <FaSun />
        </span>
      </div>
    </button>
  );
}

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [drawerOpen,     setDrawerOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const drawerRef  = useRef(null);
  const menuBtnRef = useRef(null);

  /* ── Scroll: transparency + progress bar ─────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? window.scrollY / docH : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ─────────── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.id);

    const observer = new IntersectionObserver((entries) => {
      // Find the most prominent intersecting section
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        intersecting.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        setActiveSection(intersecting[0].target.id);
      }
    }, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0, 0.2, 0.5]
    });

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Close drawer on Escape ──────────────────────────── */
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { setDrawerOpen(false); menuBtnRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  /* ── Lock body scroll when drawer open ──────────────── */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleNavClick = useCallback((id) => {
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    menuBtnRef.current?.focus();
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ─────────────────────────── */}
      <div
        className="nav-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* ── AppBar ──────────────────────────────────────── */}
      <header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="banner"
      >
        <div className="navbar__inner">
          {/* SB Monogram Logo */}
          <motion.a
            href="#home"
            className="navbar__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            aria-label="Sarveish Balasundram — Go to top"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <img
              src={sbLogo}
              alt="SB Monogram"
              className="navbar__logo-img"
            />
          </motion.a>

          {/* Desktop links */}
          <nav className="navbar__links" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    className="navbar__link-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right-side controls */}
          <div className="navbar__controls">
            <ThemeToggle />

            <a
              href="#contact"
              className="navbar__cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              Let's Talk
            </a>

            {/* Mobile burger */}
            <button
              ref={menuBtnRef}
              className="navbar__burger"
              onClick={() => setDrawerOpen(o => !o)}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              {drawerOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ───────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-drawer"
              ref={drawerRef}
              className="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="drawer__header">
                <img src={sbLogo} alt="SB" className="drawer__logo" />
                <button
                  className="drawer__close"
                  onClick={() => { setDrawerOpen(false); menuBtnRef.current?.focus(); }}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>

              <ul className="drawer__list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={`#${link.id}`}
                      className={`drawer__link ${activeSection === link.id ? 'drawer__link--active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                      aria-current={activeSection === link.id ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Theme toggle inside drawer */}
              <div className="drawer__footer">
                <ThemeToggle />
                <span className="drawer__theme-label">Toggle Theme</span>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
