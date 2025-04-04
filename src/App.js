import { useState, useEffect, useCallback } from "react";
import { Box, CssBaseline, useScrollTrigger, Fab, Fade } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import Header from "./header/header";
import AboutMe from "./about-me/aboutMe";
import Education from "./education/education";
import Skills from "./skills/skills";
import Cert from "./certifications/cert";
import Footer from "./footer/footer";
import PreLoader from "./pre_loader/pre_loader";
import Navbar from "./navBar/Navbar";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function ScrollTop({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#header"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [showPage, setShowPage] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Initialize animations and scroll effects
  // Replace your current GSAP initialization with this optimized version
  useEffect(() => {
    if (!showPage) return;

    // Batch all animations together
    gsap.registerEffect({
      name: "fadeUp",
      effect: (targets) => {
        return gsap.from(targets, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        });
      },
      defaults: { duration: 0.8 },
      extendTimeline: true,
    });

    // Create a single timeline for all scroll animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    // Add all animations to the timeline
    tl.fadeUp("[data-scroll]", 0.1);

    // Simplified section detection
    const sections = gsap.utils.toArray("section");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
        markers: false,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, [showPage]);

  // Loading simulation
  useEffect(() => {
    const loadInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    const timeoutId = setTimeout(() => {
      setShowPage(true);
      document.body.classList.add("loaded");
    }, 4000);

    return () => {
      clearInterval(loadInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <AnimatePresence>
        {!showPage ? (
          <PreLoader progress={loadingProgress} />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              background:
                "linear-gradient(to bottom, #00081a 0%, #000000 100%)",
              color: "common.white",
              position: "relative",
              overflowX: "hidden",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <Navbar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            <Box
              component="main"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                pt: { xs: "56px", md: "64px" }, // Add padding to account for fixed navbar
              }}
            >
              <section id="header">
                <Header />
              </section>

              <Box
                sx={{
                  pt: { xs: 8, md: 10 },
                  flex: 1,
                }}
              >
                <section id="aboutMe">
                  <AboutMe />
                </section>

                <section id="experience">
                  <Education />
                </section>

                <section id="skills">
                  <Skills />
                </section>

                <section id="certification">
                  <Cert />
                </section>
              </Box>
            </Box>

            <Box component="footer" sx={{ mt: "auto" }}>
              <Footer />
            </Box>

            <ScrollTop>
              <Fab size="medium" aria-label="scroll back to top">
                <KeyboardArrowUp />
              </Fab>
            </ScrollTop>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
