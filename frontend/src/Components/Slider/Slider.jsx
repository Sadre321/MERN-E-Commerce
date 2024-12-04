import { useState } from "react"
import "./Slider.css"
import SliderItem from './SliderItem'

const Slider = () => {

  const [currentSlider,setCurrentSlider]=useState(0);

  const nextSlide = ()=>{
    setCurrentSlider((prevSlider)=> (prevSlider+1)%3);
  }

  const prevSlide = ()=>{
    setCurrentSlider((prevSlider)=> (prevSlider-1+3)%3);

  }

  return (
    <section className="slider">
    <div className="slider-elements">
    { currentSlider===0&&<SliderItem imageSrc={"img/slider/slider1.jpg"}/>}
    { currentSlider===1&&<SliderItem imageSrc={"img/slider/slider2.jpg"}/>}
    { currentSlider===2&&<SliderItem imageSrc={"img/slider/slider3.jpg"}/>}
      <div className="slider-buttons">
        <button onClick={()=>prevSlide()}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button onClick={()=>nextSlide()}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="slider-dots">
        <button className={`slider-dot ${currentSlider===0&&"active"}`} onClick={()=>setCurrentSlider(0)}>
          <span></span>
        </button>
        <button className={`slider-dot ${currentSlider===1&&"active"}`} onClick={()=>setCurrentSlider(1)}>
          <span></span>
        </button>
        <button className={`slider-dot ${currentSlider===2&&"active"}`} onClick={()=>setCurrentSlider(2)}>
          <span></span>
        </button>
      </div>
    </div>
  </section>
  )
}

export default Slider