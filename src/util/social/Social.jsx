import React from 'react'
import { AiFillFacebook } from "react-icons/ai"
import { AiFillTwitterSquare } from "react-icons/ai"
import { FaInstagramSquare } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"

function Social() {
  return (
    <div className="social ">
      <ul className="d-flex align-items-center justify-content-center p-0">
        <li className="me-2">
          <AiFillFacebook className="fs-2" style={{ color: "#3f51b5" }} />
        </li>
        <li className="me-2">
          <AiFillTwitterSquare className="fs-2" style={{ color: "#2196f3" }} />
        </li>
        <li className="me-2">
          <FaInstagramSquare className="fs-2" style={{ color: "#e92063" }} />
        </li>
        <li className="me-2">
          <AiFillGithub className="fs-2" style={{ color: "#404040" }} />
        </li>

      </ul>
    </div>
  )
}

export default Social