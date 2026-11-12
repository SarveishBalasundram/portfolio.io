import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import sbLogo from '../SB_Logo.png';
import './footer.css';

const NAV_LINKS = [
  { label: 'Home',         href: '#home'         },
  { label: 'About',        href: '#about'        },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Experience',   href: '#experience'   },
  { label: 'Skills',       href: '#skills'       },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact'      },
];

const SOCIAL_LINKS = [
  { icon: <FaGithub />,    href: 'https://github.com/SarveishBalasundram',              label: 'GitHub'    },
  { icon: <FaLinkedin />,  href: 'https://www.linkedin.com/in/sarveish-balasundram/',   label: 'LinkedIn'  },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/sarveish/',                 label: 'Instagram' },
  { icon: <FaFacebook />,  href: 'https://www.facebook.com/vijaysarveish/',             label: 'Facebook'  },
];

function handleNavClick(e, href) {
  e.preventDefault();
  const id = href.replace('#', '');
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Brand with SB Logo */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo-link" onClick={(e) => handleNavClick(e, '#home')} aria-label="Sarveish Balasundram — back to top">
            <img src={sbLogo} alt="SB Monogram" className="footer__logo-img" />
            <div className="footer__brand-text">
              <span className="footer__brand-name">Sarveish Balasundram</span>
              <span className="footer__brand-role">Full-Stack Developer</span>
            </div>
          </a>
          <p className="footer__tagline">
            Crafting elegant, high-performance digital experiences — one commit at a time.
          </p>
        </div>

        {/* Nav */}
        <nav className="footer__nav" aria-label="Footer navigation">
          <ul className="footer__nav-list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} className="footer__nav-link" onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="footer__socials" aria-label="Social links">
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="footer__social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} Sarveish Balasundram. All rights reserved.
        </p>
        <p className="footer__copy footer__copy--muted">
          Built with React, Three.js &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
