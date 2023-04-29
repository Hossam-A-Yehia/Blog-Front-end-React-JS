import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/home/sidebar/Sidebar'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Link, useParams } from "react-router-dom"

import "./single.css"
import axios from 'axios'
import { useSelector } from 'react-redux'
function Single() {
  const { users } = useSelector(state => state.user)
  const PB = "https://blog-back-end-express.vercel.app/images/"
  const [post, setPost] = useState({})
  const { id } = useParams()
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [successUpdate, setSuccessUpdate] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`https://blog-back-end-express.vercel.app/api/posts/${id}`)
      setPost(res.data)
    }
    fetchPost()
  }, [id, isUpdate])

  const deleteAccount = async () => {
    try {
      await axios.delete(`https://blog-back-end-express.vercel.app/api/posts/${id}`, {
        data: { username: users.username }
      })
      window.location.replace("/")
    } catch (err) { console.log(err) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog-back-end-express.vercel.app/api/posts/${id}`, {
        username: users.username,
        title: title,
        desc: desc,
      })
      setSuccessUpdate(true)
    } catch (err) {
      console.log(err)
      setSuccessUpdate(false)
    }
  }

  return (
    <div className='container mx-auto my-3'>
      <div className='row'>
        <div className='col-9'>
          {isUpdate ? <>
            <form onSubmit={handleSubmit} >
              <h2 className='text-center mb-5 mt-3'>تحديث المقال</h2>
              <div className='d-flex justify-content-between align-items-center flex-column w-100'>
                <input type="text" className='form-control d-block w-100 5' style={{ height: "50px" }} placeholder={post.title} onChange={e => setTitle(e.target.value)} value={title} />
                <textarea className="form-control my-3" style={{ height: "200px" }} placeholder={post.desc} onChange={e => setDesc(e.target.value)} value={desc} />
                <div className='d-flex gap-2'>
                  <button className='btn btn-primary' type='submit'>تحديث</button>
                  <button className='btn btn-danger ' onClick={() => setIsUpdate(false)}>الغاء</button>
                </div>
              </div>
            </form>
            {successUpdate && <p className='text-primary fs-2 text-center'>تم التحديث بنجاح</p>}
          </> : <>
            <div className='img'>
              <img src={PB + post.photo} alt="" style={{ height: "400px" }} />
            </div>
            <div className='d-flex align-items-center my-3 '>
              <h3>{post.title}</h3>
              {post.username === users.username && <div className='d-flex align-items-center justify-content-center me-auto'>
                <BiEdit className='text-primary fs-4 ms-2 ' onClick={() => setIsUpdate(true)} />
                <AiFillDelete className='text-danger fs-4' onClick={() => deleteAccount()} />
              </div>}
            </div>
            <div className='d-flex align-items-center justify-content-between'>
              <span className='text-secondary'>الكاتب : <Link to={`/?user=${post.username}`} className='fw-bold text-secondary'>{post.username}</Link></span>
              <span className='text-secondary' >{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='my-3 fs-5 lh-base singlePost' style={{ color: "#777" }}>{post.desc}</p>
          </>}
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

export default Single