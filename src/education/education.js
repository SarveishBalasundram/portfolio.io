import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { motion, useInView } from "framer-motion";
import logoSMKRM from "./logoSMKRM.png";
import pidmLogo from "./pidm.png";
import uthmLogo from "./logoUTHM.png";
import worldtechLogo from "./logoWTECH.png";
import utmLogo from "./utm.png";

const TypewriterTitle = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ["Education Journey", "Work Experiences"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenTexts = 2000;

  useEffect(() => {
    let timeout;
    const currentText = texts[currentTextIndex];

    if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBetweenTexts);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting]);

  return (
    <Typography
      variant="h1"
      sx={{
        textAlign: "left",
        mb: { xs: 4, sm: 6 },
        background: "linear-gradient(45deg, #c62368, #f562a9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 800,
        fontSize: { xs: "2rem", sm: "2.8rem", md: "4rem" },
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
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          marginLeft: "4px",
          textShadow: "0 0 8px rgba(198, 35, 104, 0.7)",
          fontWeight: 400,
        }}
      >
        |
      </motion.span>
    </Typography>
  );
};

const Education = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [experiences] = useState([
    {
      id: 0,
      place: "SMK RAJA MAHADI",
      image: logoSMKRM,
      title: "SPM",
      date: "2013-2019",
      description: [
        "Achieved outstanding academic performance: 1A+, 4A, 3A-, 2B+",
        "Ranked among top 5% of students in the school",
        "Active participant in science and mathematics competitions",
        "Developed strong foundation in problem-solving and analytical thinking",
      ],
    },
    {
      id: 1,
      place: "PIDM SCHOLARSHIP",
      image: pidmLogo,
      title: "Pembangunan Insan Didik Malaysia Scholar",
      date: "2022-Current",
      description: [
        "Awarded prestigious national scholarship for outstanding academic achievements",
        "Recognized as one of Malaysia's top diploma students in IT field",
        "Participated in leadership development programs and community initiatives",
        "Represented PIDM at various academic and professional events",
      ],
    },
    {
      id: 2,
      place: "UNIVERSITI TUN HUSSEIN ONN MALAYSIA",
      image: uthmLogo,
      title: "Diploma in Information Technology",
      date: "Oct 2020- Jan 2023",
      description: [
        "Dean's List achiever for all 6 semesters (Perfect 4.00 for 4 semesters)",
        "Graduated with First Class Honors (CGPA: 3.98/4.00)",
        "Course Representative for Diploma in IT program",
        "Developed multiple full-stack projects including inventory systems",
        "Specialized in software development, database systems, and web technologies",
        "Active in competitive programming and hackathon events",
      ],
    },
    {
      id: 3,
      place: "WORLDTECH SOLUTIONS SDN BHD",
      image: worldtechLogo,
      title: "Intern → Junior Software Developer",
      date: "Aug 2022 - July 2023",
      description: [
        "Promoted from Intern to Junior Developer",
        "Led project teams through full Agile lifecycle",
        "Developed production systems using Angular and Spring Boot",
        "Implemented Power BI integrations for data analytics",
        "Enhanced software quality through automated testing",
      ],
    },
    {
      id: 4,
      place: "UNIVERSITI TEKNOLOGI MALAYSIA",
      image: utmLogo,
      title: "Bachelor of Computer Science (Software Engineering)",
      date: "2023-Current",
      description: [
        "Current CGPA: 3.98/4.00",
        "Specializing in advanced software engineering principles",
        "Research focus on Web and Mobile applications",
        "Active in university's tech society and programming competitions",
      ],
    },
  ]);

  const [particles] = useState(
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const renderExperienceCard = (exp, index) => (
    <motion.div
      key={exp.id}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      style={{ width: "100%" }}
    >
      <Paper
        elevation={activeIndex === exp.id ? 6 : 3}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          cursor: "pointer",
          transform: activeIndex === exp.id ? "scale(1.02)" : "scale(1)",
          transition: "all 0.3s ease",
          borderLeft: `4px solid ${
            activeIndex === exp.id ? "#2196F3" : "transparent"
          }`,
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
        onClick={() => setActiveIndex(exp.id)}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={exp.image}
            alt={exp.place}
            sx={{
              width: { xs: 48, sm: 60 },
              height: { xs: 48, sm: 60 },
              mr: 2,
              border: `2px solid #2196F3`,
            }}
          />
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="h6"
              sx={{
                color: "#000000",
                fontWeight: 700,
                mb: 0.5,
                lineHeight: 1.2,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {exp.place}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#2196F3",
                fontWeight: 600,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {exp.title}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: theme.palette.grey[700],
            mb: 2,
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          {exp.date}
        </Typography>

        <Box
          component="ul"
          sx={{
            pl: 0,
            mb: 0,
            listStyleType: "none",
            "& li": {
              color: "#000000",
              mb: 1,
              position: "relative",
              pl: "20px",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "10px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#2196F3",
              },
            },
          }}
        >
          {exp.description.map((desc, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: i * 0.1 + index * 0.05,
                },
              }}
            >
              <Typography variant="body2" component="span">
                {desc}
              </Typography>
            </motion.li>
          ))}
        </Box>
      </Paper>
    </motion.div>
  );

  return (
    <Box
      component="section"
      id="education"
      ref={ref}
      sx={{
        position: "relative",
        py: { xs: 6, sm: 8, md: 12 },
        px: { xs: 1, sm: 2, md: 6 },
        color: "#ffffff",
        overflow: "hidden",
        minWidth: "300px",
      }}
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
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, pl: { xs: 1, sm: 2, md: 0 } }}>
          <TypewriterTitle />
        </Box>

        {isMobile ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              px: { xs: 1, sm: 0 },
            }}
          >
            {experiences.map((exp, index) => renderExperienceCard(exp, index))}
          </Box>
        ) : (
          <Timeline
            position="right"
            sx={{
              p: 0,
              m: 0,
              width: "100%",
              "& .MuiTimelineItem-root:before": {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} sx={{ minHeight: "200px" }}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor:
                        activeIndex === exp.id
                          ? "#2196F3"
                          : theme.palette.grey[600],
                      width: 24,
                      height: 24,
                      p: 0,
                      overflow: "hidden",
                      border: `2px solid ${theme.palette.background.paper}`,
                      boxShadow:
                        activeIndex === exp.id
                          ? `0 0 0 4px ${theme.palette.primary.light}`
                          : "none",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => setActiveIndex(exp.id)}
                  >
                    <Avatar
                      src={exp.image}
                      alt={exp.place}
                      sx={{
                        width: "100%",
                        height: "100%",
                        filter:
                          activeIndex === exp.id ? "none" : "grayscale(70%)",
                      }}
                    />
                  </TimelineDot>
                  {index < experiences.length - 1 && (
                    <TimelineConnector
                      sx={{
                        bgcolor:
                          activeIndex === exp.id
                            ? "#2196F3"
                            : theme.palette.grey[600],
                        width: "2px",
                        flexGrow: 1,
                        transition: "all 0.3s ease",
                      }}
                    />
                  )}
                </TimelineSeparator>

                <TimelineContent sx={{ py: 2, px: { xs: 1, md: 3 } }}>
                  {renderExperienceCard(exp, index)}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </Box>
    </Box>
  );
};

export default Education;
