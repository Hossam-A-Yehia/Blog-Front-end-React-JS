import React, { useState } from 'react'
import Sidebar from '../../components/home/sidebar/Sidebar'
import { ImUserPlus } from "react-icons/im"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { updateUser } from '../../store/UsersSlice'


function Update() {
  const PB = "https://blog-back-end-express.vercel.app/images/"

  const { id } = useParams()
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.user)
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [file, setFile] = useState()
  const [about, setAbout] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      userId: users._id,
      username,
      email,
      password,
      about
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      newUser.profilePic = filename
      try {
        await axios.post("https://blog-back-end-express.vercel.app/upload", data)
      } catch (err) { console.log(err); }
    }
    try {
      const res = await axios.put(`https://blog-back-end-express.vercel.app/api/users/${id}`, newUser)
      dispatch(updateUser(res.data))
      window.location.replace("/")
    } catch (err) { console.log(err) }
  }

  const deleteAccount = async e => {
    try {
      await axios.delete(`https://blog-back-end-express.vercel.app/api/users/${id}`, { data: { userId: users._id, username: users.username } })
      window.localStorage.removeItem("user")
      window.location.replace("/register")
    } catch (err) { console.log(err) }
  }
  return (
    <div className='container mx-auto my-3'>
      <div className='row'>
        <div className='col-9'>
          <div className='d-flex align-items-center justify-content-between'>
            <h2>تحديث حسابك الشخصي</h2>
            <p className='text-danger fs-5' onClick={() => deleteAccount()} style={{ cursor: "pointer" }}>حذف حسابك</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='d-flex my-4 align-items-center'>
              <img src={file ? URL.createObjectURL(file) : PB + users.profilePic} alt="" className='rounded-4' style={{ width: "70px", height: "70px" }} />
              <label htmlFor='profileIMG'><ImUserPlus className='fs-3 me-3' style={{ color: "#009688" }} /></label>
              <input type="file" id="profileIMG" className='d-none' onChange={e => setFile(e.target.files[0])} />
            </div>
            <label>اسم المستخدم</label>
            <input type="text" placeholder={users.username} className='form-control mt-2 mb-4 border-0 border-bottom' onChange={e => setUsername(e.target.value)} />
            <label>البريد الالكتروني</label>
            <input type="email" placeholder={users.email} className='form-control mt-2 mb-4 border-0 border-bottom' onChange={e => setEmail(e.target.value)} />
            <label>نبذه عنك</label>
            <textarea className='form-control mt-2 mb-4' style={{ height: "200px" }} placeholder="تحدث عن نفسك" onChange={e => setAbout(e.target.value)}></textarea>
            <label>كلمة السر</label>
            <input type="password" className='form-control mt-2 mb-4 border-0 border-bottom' onChange={e => setPassword(e.target.value)} />
            <button type='submit' className='btn btn-primary '>تحديث</button>
          </form>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

export default Update