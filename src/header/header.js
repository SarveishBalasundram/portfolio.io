import { parse } from "postcss";
import "./header.css"

import React from 'react';
import { useEffect,useState } from "react";
function Header({scroll, changeToggler,sectionScroll}){



    if(sectionScroll ==""){
        sectionScroll = "certification"
    }

    console.log(sectionScroll)

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };



function clickNavLinks(){
    changeToggler()
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
        const links = document.querySelectorAll(".nav-links li");

        navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fades");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
}

return (
<header className="header">
<nav  className={scroll ? "block" : "none"} >
    <div className="hamburger" onClick={()=>{
        changeToggler()
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
        const links = document.querySelectorAll(".nav-links li");

        navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fades");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
    }}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
    </div>
    <ul className="nav-links">
        <li><a onClick={()=>{
        clickNavLinks()
        }} href="#header" className={sectionScroll=="header"? "actives":""}>Home</a></li>

        <li><a href="#aboutMe" className={sectionScroll=="aboutMe"? "actives":""} onClick={()=>{
        clickNavLinks()
        }}>About Me</a></li>

        <li><a href="#experience" className={sectionScroll=="experience"? "actives":""} onClick={()=>{
        clickNavLinks()
         }}>Experiences</a></li>

        <li><a href="#skills" className={sectionScroll=="skills"? "actives":""} onClick={()=>{
        clickNavLinks()
         }}>Skills</a></li>

        <li><a href="#certification" className={sectionScroll=="certification"? "actives":""} onClick={()=>{
        clickNavLinks()
         }}>Certifications</a></li>
    </ul>
</nav>


<div className="container-fluid">
<div className="svg-container">
<svg  viewBox="0 0 200 480" preserveAspectRatio="xMinYMin meet" className="svg-content" ><rect x="0" y="0" width="100vw" height="100vh" fill="#001220"></rect><path d="M0 327L22.8 331.7C45.7 336.3 91.3 345.7 137 351.8C182.7 358 228.3 361 274 366.3C319.7 371.7 365.3 379.3 411.2 371.3C457 363.3 503 339.7 548.8 340.3C594.7 341 640.3 366 686 380C731.7 394 777.3 397 823 385.2C868.7 373.3 914.3 346.7 937.2 333.3L960 320L960 541L937.2 541C914.3 
541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z" fill="#fa7268"></path><path d="M0 392L22.8 393.7C45.7 395.3 91.3 398.7 137 402.8C182.7 407 228.3 412 274 408.2C319.7 404.3 365.3 391.7 411.2 387C457 382.3 503 385.7 548.8 391C594.7 396.3 640.3 403.7 686 403.2C731.7 402.7 777.3 394.3 823 387.2C868.7 380 914.3 374 937.2 371L960 368L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z" fill="#ef5f67"></path><path d="M0 419L22.8 418.8C45.7 418.7 91.3 418.3 137 415C182.7 411.7 228.3 405.3 274 411C319.7 416.7 365.3 434.3 411.2 441.5C457 448.7 503 445.3 548.8 445.2C594.7 445 640.3 448 686 446.2C731.7 444.3 777.3 437.7 823 431.3C868.7 425 914.3 419 937.2 416L960 413L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z" fill="#e34c67"></path><path d="M0 487L22.8 479.5C45.7 472 91.3 457 137 455.8C182.7 454.7 228.3 467.3 274 467.8C319.7 468.3 365.3 456.7 411.2 454C457 451.3 503 457.7 548.8 457.7C594.7 457.7 640.3 451.3 686 449.8C731.7 448.3 777.3 451.7 823 457.7C868.7 463.7 914.3 472.3 937.2 476.7L960 481L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z" fill="#d53867"></path><path d="M0 477L22.8 482.7C45.7 488.3 91.3 499.7 137 506.2C182.7 512.7 228.3 514.3 274 510.7C319.7 507 365.3 498 411.2 491.8C457 485.7 503 482.3 548.8 479.7C594.7 477 640.3 475 686 475C731.7 475 777.3 477 823 484C868.7 491 914.3 503 937.2 509L960 515L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z" fill="#c62368"></path></svg>
</div>

    <div className="box">
        <h1 className="text-center">Sarveish Balasundram</h1>
        <h3>Unlocking limitless possibilities through the art of software engineering.</h3>
    </div>

  </div>

</header>

)
}

export default Header