import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loginFailure, loginSuccess, startLogin } from '../../store/UsersSlice'

function Login() {

  const dispatch = useDispatch()
  const { isFetching } = useSelector(state => state.user)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [run, setRun] = useState(false)
  const [flag, setFlag] = useState(true)

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(startLogin())
    setRun(true)
    if (username === ""|| password.length < 8 ) {
      setFlag(false)
    }
    if (flag) {
      try {
        const res = await axios.post("https://blog-back-end-express.vercel.app/api/auth/login", {
          username: username,
          password: password
        })
        dispatch(loginSuccess(res.data))
      } catch (err) {
        dispatch(loginFailure())
      }
    }
  }



  return (
    <div className='container d-flex align-items-center justify-content-center  ' style={{ width: "500px", height: "calc(100vh - 64px)" }}>
      <div className='w-100'>
        <h2 className='text-center'>تسجيل دخول</h2>
        <form className=' mx-auto my-5' onSubmit={handleSubmit}>
          <label className=' px-2 mt-3 mb-1'>اسم المستخدم</label>
          <input type="text" className="form-control  " placeholder='اكتب اسمك' onChange={e => setUsername(e.target.value)} value={username} />
          {username === "" && run && <p className='text-danger fs-5'>يجب كتابة اسم المستخدم</p>}
          <label className=' px-2 mt-4 mb-1'>كلمة المرور</label>
          <input type='password' className="form-control" placeholder='اكتب كلمة المرور' onChange={e => setPassword(e.target.value)} value={password} />
          {password.length < 8 && run && <p className='text-danger fs-5'>كلمة السر اقل من 8</p>}
          <button className='btn btn-primary mt-3' type='submit' disabled={isFetching} >تسجيل دخول</button>
          <div className='mt-2 text-center'>ليس لديك حساب ؟ <Link to="/register" className='text-info fw-bold'>انشاء حساب</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login