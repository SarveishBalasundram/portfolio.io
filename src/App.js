import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./navBar/Navbar";
import Header from "./header/header";
import AboutMe from "./about-me/aboutMe";
import Education from "./education/education";
import Skills from "./skills/skills";
import Cert from "./certifications/cert";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./footer/footer";
import Loader from "./loader/Loader";
import "./global.css";

/* ══════════════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════════════ */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, label',
      );
      if (target) document.body.classList.add("cursor-hover");
      else document.body.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.12;
        ring.current.y += (pos.current.y - ring.current.y) * 0.12;
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   SCROLL-TO-TOP
══════════════════════════════════════════════════════════ */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════
   APP ROOT

   loading   → <Loader /> plays; the site is NOT mounted yet, so the
               main thread is free and every animation stays smooth.
   revealing → the loader's curtain opens (pure CSS, GPU) and the site
               mounts underneath it, so its entrance animations play
               as the curtain parts.
   done      → loader is removed, scrolling is unlocked.
══════════════════════════════════════════════════════════ */
const defer = React.startTransition || ((fn) => fn());

function AppInner() {
  const [phase, setPhase] = useState("loading");

  const handleReveal = useCallback(() => {
    defer(() => setPhase((p) => (p === "loading" ? "revealing" : p)));
  }, []);
  const handleDone = useCallback(() => setPhase("done"), []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <>
      <CustomCursor />

      {phase !== "loading" && (
        <div key="main">
          <Navbar />
          <main>
            <section id="home" aria-labelledby="hero-heading">
              {" "}
              <Header />{" "}
            </section>
            <section id="about" aria-labelledby="about-heading">
              {" "}
              <AboutMe />{" "}
            </section>
            <section id="projects" aria-labelledby="projects-heading">
              <Projects />{" "}
            </section>
            <section id="experience" aria-labelledby="experience-heading">
              <Education />
            </section>
            <section id="skills" aria-labelledby="skills-heading">
              {" "}
              <Skills />{" "}
            </section>
            <section id="achievements" aria-labelledby="achievements-heading">
              <Cert />
            </section>
            <section id="contact" aria-labelledby="contact-heading">
              <Contact />{" "}
            </section>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      )}

      {phase !== "done" && (
        <Loader onReveal={handleReveal} onDone={handleDone} />
      )}

      <style>{`
        /* ════════════════════════════════════════════════════
           SCROLL-TO-TOP BUTTON
        ════════════════════════════════════════════════════ */
        .scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--purple-500, #8B5CF6), var(--purple-deep, #5B21B6));
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          z-index: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.5);
        }
        .scroll-top-btn:focus-visible {
          outline: 2px solid #C4B5FD;
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppInner />
    </ThemeProvider>
  );
}
