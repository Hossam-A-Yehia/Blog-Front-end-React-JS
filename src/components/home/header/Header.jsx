import React from 'react'
import Img from "../../../assets/landing.webp"
import IMG from "../../../assets/images-removebg-preview.png"

function Header() {
  return (
    <div className='header text-center my-2 position-relative'>
      <p className="fs-5 m-0">فكر & ابدع</p>
      <img src={IMG} alt="" style={{width:"70px"}} />
      <img src={Img} alt="Landing" style={{ height: "560px" }} />
    </div>
  )
}

export default Header