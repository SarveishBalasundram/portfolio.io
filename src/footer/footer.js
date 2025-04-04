import { Box, Typography, Link, IconButton } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(219, 6, 177, 0.5); }
  50% { box-shadow: 0 0 20px rgba(219, 6, 177, 0.8); }
  100% { box-shadow: 0 0 5px rgba(219, 6, 177, 0.5); }
`;

const StyledFooter = styled(Box)({
  backgroundColor: "#111",
  width: "100%",
  padding: "40px 20px",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  borderTop: "1px solid #333",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #db06b1, #fc29d2)",
    animation: `${glow} 3s ease infinite`,
  },
});

const FooterLinks = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
});

const FooterLink = styled(Link)({
  color: "#eee",
  fontWeight: 600,
  textDecoration: "none",
  position: "relative",
  padding: "4px 0",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#fc29d2",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: "2px",
    background: "#fc29d2",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
  },
});

const SocialIcon = styled(IconButton)({
  color: "#fff",
  backgroundColor: "#222",
  margin: "0 5px",
  transition: "all 0.3s ease",
  animation: `${float} 3s ease-in-out infinite`,
  "&:hover": {
    backgroundColor: "#db06b1",
    transform: "scale(1.1)",
  },
  "&:nth-of-type(1)": { animationDelay: "0.1s" },
  "&:nth-of-type(2)": { animationDelay: "0.2s" },
  "&:nth-of-type(3)": { animationDelay: "0.3s" },
});

function Footer() {
  const links = [
    { label: "Home", href: "#header" },
    { label: "About Me", href: "#aboutMe" },
    { label: "Experiences", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certification" },
  ];

  const socialLinks = [
    { icon: faFacebook, href: "https://www.facebook.com/vijaysarveish/" },
    {
      icon: faLinkedin,
      href: "https://www.linkedin.com/in/sarveish-balasundram-486344224/",
    },
    { icon: faInstagram, href: "https://www.instagram.com/sarveish/" },
  ];

  return (
    <StyledFooter component="footer">
      <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
        <FooterLinks>
          {links.map((link, index) => (
            <FooterLink key={index} href={link.href} underline="none">
              {link.label}
            </FooterLink>
          ))}
        </FooterLinks>
        <Typography variant="body2" sx={{ color: "#888" }}>
          Sarveish Balasundram &copy; {new Date().getFullYear()}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mt: { xs: 2, md: 0 } }}>
        {socialLinks.map((social, index) => (
          <SocialIcon
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={social.icon} />
          </SocialIcon>
        ))}
      </Box>
    </StyledFooter>
  );
}

export default Footer;
