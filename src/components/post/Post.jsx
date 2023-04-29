import React from 'react'
import { Link } from 'react-router-dom'

function Post({ data }) {
  const PB = "https://blog-back-end-express.vercel.app/images/"
  return (
    <div className="card p-3 border-dark-subtle text-center" key={data._id} style={{ width: "49%", borderRadius: "0", height: "fit-content" }}>
      <img src={PB + data.photo} className="card-img-top " alt="..." />
      <div className='d-flex justify-content-center align-items-center'>
        {data.category?.map(category => <span className='ms-2 ' style={{ fontSize: "12px", color: "#777777ad", fontWeight: "600", cursor: "pointer" }}>{category}</span>)}
      </div>
      <Link to={`/posts/${data._id}`}>
        <h3 className=' my-4 text-black'>{data.title} </h3>
      </Link>
      <span className='ms-2 ' style={{ fontSize: "12px", color: "#777777ad", fontWeight: "600", cursor: "pointer" }}>{new Date(data.createdAt).toDateString()}</span>
      <p className='postDesc fs-5 my-4' style={{ color: "#777" }}>{data.desc} </p>
    </div>
  )
}

export default Post