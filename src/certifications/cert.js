import React, { useState,useEffect } from 'react';
import "../certifications/cert.css"

import first from './first.pdf'
import second from './second.pdf'
import third from './third.pdf'
import forth from './forth.pdf'
import fifth from './fifth.pdf'

import{FaSearch}  from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import Aos from "aos";




function Cert(){

  useEffect(()=>{
    Aos.init()
    Aos.refresh()
},[])
  let [file,setFile]= useState([
    {
      id:1,
      fileName: "cert/first.png",
      title:"HTML, CSS & JS",
      pdfName:first,
      name:"HTML_CSS_JS_CERT.pdf"
    },
    {
      id:2,
      fileName: "cert/second.png",
      title:"BACK-END DEVELOPMENT",
      pdfName:second,
      name:"BACKEND_DEV.pdf"
    },
    {
      id:3,
      fileName: "cert/third.png",
      title:"PYTHON FOR DATA SCIENCE & AI",
      pdfName:third,
      name:"PYTHON_DATASC_AI.pdf"
    },
    {
      id:4,
      fileName: "cert/forth.png",
      title:"TOP 10 FINALIST BIZMAKER 2023",
      pdfName:forth,
      name:"BIZMAKER2023.pdf"
    },
    {
      id:5,
      fileName: "cert/fifth.png",
      title:"BEST PRESENTER GPBL3.0",
      pdfName:fifth,
      name:"GPBL.pdf"
    },
  ])

  const [basicModal, setBasicModal] = useState(false);
  let [modalElement,seModalElement] = useState({})
  function toggleShow(e,elements){
    e.preventDefault();
    setBasicModal(!basicModal);
    if(elements !=null){
      seModalElement(modalElement = elements)
    }else{
      elements = null
    }

  }


  let modal = (
    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
    <MDBModalDialog className='modal-xl'>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle style={{color:'black'}}>More Information</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={(e)=>{
                        toggleShow(e,null)
                       }}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody >
          <div className='pdfHolder'>
          <embed src={modalElement.fileName}
                               frameborder="0" className='obj'></embed>
          </div>


        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='danger' onClick={(e)=>{
                        toggleShow(e,null)
                       }}>
            Close
          </MDBBtn>
          <a class="btn button" role="button" href={modalElement.pdfName} download={modalElement.name}>Download it!</a>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  )


    return(
        <>
<div className="container-fluid">
      <div className="row pl-4">
        <div className="col-12">
        <h1 id="cert" data-aos="fade-left" data-aos-duration="3000">Awards & Certifications</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 pl-5">

        <Swiper
        effect={"fade"}
        slidesPerView={'auto'}
        spaceBetween={190}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[ EffectFade,Autoplay, Pagination, Navigation]}
        className="swiper"
        grabCursor={true}
      >
        {file.map((elements,index)=>{
                 return(
                  <>
                  <SwiperSlide  key={index}>
                      <div className="swiper-slide-wrapper hover-overlay">
                        <img className='fun' src={elements.fileName}></img>
                        <div className='mask'>                        
                           <div className='mask-label justify-content-center align-items-center h-100'>
                           <FaSearch className='icons w-100 fs-1' onClick={(e)=>{
                            toggleShow(e,elements)
                           }}></FaSearch>
                                <h2 className='text-white text'>{elements.title}</h2>
                           </div>
                        </div>
                        </div>             
                    </SwiperSlide>
                  </>









                 )   
        })}


        </Swiper>

        <div>
          {basicModal==true?modal:""}
        </div>










        </div>
      </div>
</div>

      </>
    )
}

export default Cert