import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Social from "../../../util/social/Social"
import { useSelector } from 'react-redux'

function Sidebar() {
  const PB = "https://blog-back-end-express.vercel.app/images/"
  const { users } = useSelector(state => state.user)
  const [category, setCategory] = useState([])
  useEffect(() => {
    const getCategory = async () => {
      const result = await axios.get("https://blog-back-end-express.vercel.app/api/category")
      setCategory(result.data)
    }
    getCategory()

  }, [])
  return (
    <div className='sidebar col-3 bg-light p-2 d-flex align-items-center flex-column' style={{ height: "fit-content" }}>
      {users &&       <div className='aboutMe w-100 p-2 '>
        <p className='border-bottom border-top text-center mb-3 fs-2'>من انا </p>
        <img src={PB + users?.profilePic} alt="AboutMe" />
        <p className='my-4' style={{ lineHeight: "18px", color: "#777" }}> {users?.about}</p>
      </div>}
      <div className='category w-100'>
        <p className='border-bottom border-top text-center mb-3 fs-2'>التصنيف </p>
        <ul className='row w-100 p-2 text-center '>
          {category?.map(cat => <li className='col-6 my-2' key={cat._id}><Link className='text-success' style={{ fontSize: "14px" }} to={`/?cat=${cat.name}`}>{cat.name}</Link></li>)}
        </ul>
      </div>
      <div className='social w-100'>
        <p className='border-bottom border-top text-center mb-3 fs-2'>تابعنا</p>
        <Social />
      </div>
    </div>
  )
}

export default Sidebar