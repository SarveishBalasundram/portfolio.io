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

const StyledFooter = styled("footer")`
  background-color: #111;
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-top: 1px solid #333;
  gap: 1.5rem;

  @media (min-width: 900px) {
    flex-direction: row;
    padding: 2.5rem 2rem;
    gap: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #db06b1, #fc29d2);
    animation: ${glow} 3s ease infinite;
  }
`;

const FooterLinks = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 1.25rem;
  margin-bottom: 1rem;

  @media (min-width: 900px) {
    margin-bottom: 0;
  }
`;

const FooterLink = styled(Link)`
  color: #eee;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    color: #fc29d2;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #fc29d2;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (min-width: 900px) {
    font-size: 1rem;
  }
`;

const SocialIcon = styled(IconButton)`
  color: #fff;
  background-color: #222;
  margin: 0 0.5rem;
  width: 2rem;
  height: 2rem;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  & svg {
    font-size: 1rem;
  }

  &:hover {
    background-color: #db06b1;
    transform: scale(1.1);
  }

  &:nth-of-type(1) {
    animation-delay: 0.1s;
  }
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.3s;
  }

  @media (min-width: 600px) {
    width: 2.5rem;
    height: 2.5rem;

    & svg {
      font-size: 1.25rem;
    }
  }
`;

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 900px) {
    align-items: flex-start;
  }
`;

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
    <StyledFooter>
      <ContentWrapper>
        <FooterLinks>
          {links.map((link, index) => (
            <FooterLink key={index} href={link.href} underline="none">
              {link.label}
            </FooterLink>
          ))}
        </FooterLinks>
        <Typography variant="body2" sx={{ color: "#888", textAlign: "center" }}>
          Sarveish Balasundram &copy; {new Date().getFullYear()}
        </Typography>
      </ContentWrapper>

      <Box sx={{ display: "flex" }}>
        {socialLinks.map((social, index) => (
          <SocialIcon
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.icon.iconName}
          >
            <FontAwesomeIcon icon={social.icon} />
          </SocialIcon>
        ))}
      </Box>
    </StyledFooter>
  );
}

export default Footer;
