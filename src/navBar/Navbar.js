import { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const Navbar = ({ activeSection, setActiveSection }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };
  const navLinks = [
    { id: 1, name: "Home", href: "#header" },
    { id: 2, name: "About Me", href: "#aboutMe" },
    { id: 3, name: "Experiences", href: "#experience" },
    { id: 4, name: "Skills", href: "#skills" },
    { id: 5, name: "Certifications", href: "#certification" },
  ];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);

    const scrollPosition = window.scrollY + window.innerHeight * 0.3;
    const sections = Array.from(document.querySelectorAll("section"));

    // Find the section that's most centered in viewport
    let closestSection = null;
    let smallestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2 + window.scrollY;
      const distance = Math.abs(scrollPosition - sectionCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestSection = section.id;
      }
    });

    // Special case for aboutMe when near threshold
    if (
      closestSection === "aboutMe" &&
      scrollPosition >= 818 &&
      scrollPosition <= 1583
    ) {
      console.log(`Forcing aboutMe activation at scroll: ${scrollPosition}`);
      closestSection = "aboutMe";
    }

    if (closestSection && closestSection !== activeSection) {
      console.log(`Updating active section to: ${closestSection}`);
      setActiveSection(closestSection);
    }
  }, [activeSection, setActiveSection]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      originX: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
    hover: { scaleX: 1, originX: 0 },
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled
          ? "rgba(0, 8, 26, 0.9)"
          : "rgba(0, 8, 26, 0.7)",
        backdropFilter: "blur(10px)",
        transition: "all 0.4s ease",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 4 },
          justifyContent: "space-between",
        }}
      >
        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
          }}
        >
          {navLinks.map((link) => (
            <Box
              component="a"
              href={link.href}
              key={link.id}
              sx={{
                color:
                  activeSection === link.href.substring(1)
                    ? "#ff4081"
                    : "common.white",
                textDecoration: "none",
                position: "relative",
                px: 1,
                py: 2,
                fontWeight: 500,
                fontSize: "1rem",
                "&:hover": {
                  color: "#ff4081",
                },
              }}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={underlineVariants}
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "#ff4081",
                    transformOrigin: "left center",
                  }}
                />
              )}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "#ff4081",
                  transformOrigin: "left center",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{
            display: { md: "none" },
            color: "common.white",
          }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              width: "70%",
              maxWidth: "300px",
              backgroundColor: "rgba(0, 18, 32, 0.98)",
              backdropFilter: "blur(10px)",
              color: "common.white",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              py: 2,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={handleDrawerToggle} color="inherit">
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />
            <List>
              {navLinks.map((link) => (
                <ListItem
                  button
                  component="a"
                  href={link.href}
                  onClick={handleDrawerToggle}
                  key={link.id}
                  sx={{
                    py: 2,
                    color:
                      activeSection === link.href.substring(1)
                        ? "#ff4081"
                        : "common.white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "#ff4081",
                    },
                    position: "relative",
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "1.1rem",
                    }}
                  />
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: "absolute",
                        bottom: 8,
                        left: 16,
                        right: 16,
                        height: "2px",
                        backgroundColor: "#ff4081",
                        transformOrigin: "left center",
                      }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
