import { useState, useRef } from "react";
import { Box, Typography, Button, useTheme, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import firstCert from "./first.png";
import secondCert from "./second.png";
import thirdCert from "./third.png";
import iHaxPic from "./iHaxPic.png";
import inventX from "./inventX.jpeg";
import iTank from "./itank.jpeg";
import forthCert from "./forth.png";
import fifthCert from "./fifth.png";

const certifications = [
  {
    id: 1,
    image: firstCert,
    title: "HTML, CSS & JS Certification",
    issuer: "Coding Academy",
    date: "June 2023",
    description:
      "Mastered front-end web development fundamentals through intensive project-based learning",
  },
  {
    id: 2,
    image: secondCert,
    title: "Back-End Development Certification",
    issuer: "Tech Institute",
    date: "August 2023",
    description:
      "Developed RESTful APIs and database architectures for scalable web applications",
  },
  {
    id: 3,
    image: thirdCert,
    title: "Python for Data Science & AI",
    issuer: "Data Science Org",
    date: "September 2023",
    description:
      "Applied machine learning algorithms and data visualization techniques using Python",
  },
  {
    id: 4,
    image: iHaxPic,
    title: "I-Hax 2023 Winner",
    issuer: "National Hackathon",
    date: "October 2023",
    description:
      "Champion in a national hackathon focused on technology to craft solutions for real-world challenges. Also won the Best Business Idea Award and the Most Impactful Idea Award.",
  },
  {
    id: 5,
    image: inventX,
    title: "InventX 2023 Gold Medal Winner",
    issuer: "UTM Innovation",
    date: "November 2023",
    description:
      "Gold Medal winner at iNVENTX (formerly RICES) exhibition for innovative inventions. Also received the Best of Best Special Award.",
  },
  {
    id: 6,
    image: iTank,
    title: "I-Tank 2023 Winner",
    issuer: "International Intervarsity",
    date: "December 2023",
    description:
      "Champion in an international intervarsity think tank competition that was held in Penang, Malaysia.",
  },
  {
    id: 7,
    image: forthCert,
    title: "Top 10 Finalist BizMaker 2023",
    issuer: "BizMaker",
    date: "October 2023",
    description:
      "Recognized among top business innovators in national entrepreneurship competition",
  },
  {
    id: 8,
    image: fifthCert,
    title: "Best Presenter GPBL 3.0",
    issuer: "GPBL",
    date: "November 2023",
    description:
      "Awarded for exceptional technical presentation and communication skills",
  },
];

function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef();
  const theme = useTheme();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };
  const [particles] = useState(
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
  );
  return (
    <Box
      sx={{
        py: 10,
        px: { xs: 3, md: 8 },
        overflow: "hidden",
      }}
      component="section"
      id="certifications"
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "50%",
              filter: "blur(1px)",
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: ["0%", "-10%", "0%"],
              transition: {
                duration: 5 + particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: "left",
            mb: 6,
            background: "linear-gradient(45deg, #c62368, #f562a9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
            fontSize: { xs: "2.8rem", md: "4rem" },
            textShadow: `
              0 0 5px rgba(198, 35, 104, 0.5),
              0 0 10px rgba(198, 35, 104, 0.4),
              0 0 15px rgba(198, 35, 104, 0.3),
              0 0 20px rgba(198, 35, 104, 0.2),
              0 0 25px rgba(198, 35, 104, 0.1),
              0 4px 8px rgba(0,0,0,0.3),
              0 8px 16px rgba(0,0,0,0.2)
            `,
            letterSpacing: "1px",
            lineHeight: "1.2",
            fontFamily: "'Poppins', sans-serif",
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              mixBlendMode: "overlay",
              borderRadius: "inherit",
              pointerEvents: "none",
            },
          }}
        >
          <TypeAnimation
            sequence={[
              "Awards",
              1000,
              "Certifications",
              1000,
              "Achievements",
              1000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  mb: 4,
                  maxWidth: "100%",
                  mx: { xs: "auto", md: 0 },
                  p: 3,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: "2px solid transparent",
                    background:
                      "linear-gradient(90deg, #ff4d9a, #ff9500) border-box",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    borderRadius: "8px",
                    animation: "borderAnimation 6s linear infinite",
                    pointerEvents: "none",
                  },
                  "@keyframes borderAnimation": {
                    "0%": {
                      backgroundPosition: "0% 50%",
                    },
                    "50%": {
                      backgroundPosition: "100% 50%",
                    },
                    "100%": {
                      backgroundPosition: "0% 50%",
                    },
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    position: "relative",
                    zIndex: 1,
                    textAlign: { xs: "center", md: "left" },
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    letterSpacing: "0.5px",
                    "&::first-letter": {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      fontSize: "1.5em",
                      color: "#ff4d9a",
                      fontWeight: 700,
                      mr: "2px",
                    },
                  }}
                >
                  Throughout my journey, I've earned recognition for my skills
                  and dedication. Here are some of my proudest achievements and
                  certifications.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Box
              sx={{
                position: "relative",
                "& .slick-slide": {
                  px: 2,
                  transition: "all 0.3s ease",
                  opacity: 0.7,
                  transform: "scale(0.9)",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                },
                "& .slick-center": {
                  opacity: 1,
                  transform: "scale(1.05)",
                  filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.2))",
                },
                "& .slick-dots": {
                  bottom: -40,
                  "& li button:before": {
                    color: theme.palette.primary.main,
                    fontSize: "10px",
                  },
                },
                "& .slick-arrow": {
                  zIndex: 1,
                  width: 40,
                  height: 40,
                  "&:before": {
                    fontSize: 32,
                    color: theme.palette.primary.main,
                  },
                  "&:hover": {
                    opacity: 0.8,
                  },
                },
                "& .slick-prev": {
                  left: -10,
                },
                "& .slick-next": {
                  right: -10,
                },
              }}
            >
              <Slider
                ref={sliderRef}
                {...settings}
                autoplay
                autoplaySpeed={3000}
                nextArrow={
                  <Box
                    sx={{
                      "&:before": {
                        content: '"→"',
                      },
                    }}
                  />
                }
                prevArrow={
                  <Box
                    sx={{
                      "&:before": {
                        content: '"←"',
                      },
                    }}
                  />
                }
              >
                {certifications.map((cert, index) => (
                  <Box key={cert.id}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <Box
                        sx={{
                          height: 500, // Increased height to accommodate description
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: 4,
                          boxShadow: 3,
                          overflow: "hidden",
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor: theme.palette.divider,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: 6,
                            transform: "translateY(-5px)",
                          },
                        }}
                        onClick={() => sliderRef.current.slickGoTo(index)}
                      >
                        <Box
                          component="img"
                          src={cert.image}
                          alt={cert.title}
                          sx={{
                            width: "100%",
                            height: "55%",
                            objectFit: "contain",
                            mb: 2,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            textAlign: "center",
                            mb: 1,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {cert.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.primary.main, // Highlighted date color
                            fontWeight: 600,
                            textAlign: "center",
                            mb: 1,
                          }}
                        >
                          {cert.issuer} •{" "}
                          <Box
                            component="span"
                            sx={{ color: theme.palette.secondary.main }}
                          >
                            {cert.date}
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            textAlign: "center",
                            fontSize: "0.9rem",
                            px: 2,
                          }}
                        >
                          {cert.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>
                ))}
              </Slider>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Certifications;
