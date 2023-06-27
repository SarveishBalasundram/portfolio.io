import "../footer/footer.css"
import { faFacebook,faLinkedin,faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer(){
return(
<footer className="footer-distributed">

<div className="footer-right">

    <a target="_blank" href="https://www.facebook.com/vijaysarveish/"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a>
    <a target="_blank" href="https://www.linkedin.com/in/sarveish-balasundram-486344224/"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
    <a target="_blank" href="https://www.instagram.com/sarveish/"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a>

</div>

<div className="footer-left">

    <p className="footer-links">
        <a className="link-1" href="#header">Home</a>

        <a href="#aboutMe">About Me</a>

        <a href="#experience">Experiences</a>

        <a href="#skills">Skills</a>

        <a href="#certification">Certifications</a>

        <a href="">Contact</a>
    </p>

    <p>Sarveish Balasundram &copy; 2023</p>
</div>

</footer>
)

}

export default Footer