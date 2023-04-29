import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [run, setRun] = useState(false)
  const [flag, setFlag] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setRun(true)
    if (username === "" || email === "" || password.length < 8 || password !== ConfirmPassword ) {
      setFlag(false)
    }
    if (flag) {
      try {
        const res = await axios.post("https://blog-back-end-express.vercel.app/api/auth/register", {
          username,
          email,
          password
        })
        res.data && window.location.replace("/login")
        setRun(false)
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className='container d-flex align-items-center justify-content-center ' style={{ width: "500px", height: "calc(100vh - 64px)" }}>
      <div className='w-100'>
        <h2 className='text-center'>انشاء حساب جديد</h2>
        <form className='  mx-auto my-5' onSubmit={handleSubmit}>
          <label className=' px-2 mt-3 mb-1'>الاسم</label>
          <input type="text" className="form-control  " placeholder='اكتب اسمك' onChange={e => setUsername(e.target.value)} value={username} />
          {username === "" && run && <p className='text-danger fs-5'>يجب كتابة اسم المستخدم</p>}
          <label className='px-2 mt-3 mb-1'>البريد الالكتروني</label>
          <input type='email' className="form-control " placeholder='اكتب بريدك الالكتروني' onChange={e => setEmail(e.target.value)} value={email} />
          {email === "" && run && <p className='text-danger fs-5'>يجب كتابة البريد الالكتروني</p>}
          <label className='px-2 mt-3 mb-1'>كلمة المرور</label>
          <input type='password' className="form-control" placeholder='اكتب كلمة المرور' onChange={e => setPassword(e.target.value)} value={password} />
          {password.length < 8 && run && <p className='text-danger fs-5'>كلمة السر اقل من 8</p>}
          <label className='px-2 mt-3 mb-1'>تأكيد كلمة المرور</label>
          <input type='password' className="form-control" placeholder='اكتب كلمة المرور' onChange={e => setConfirmPassword(e.target.value)} value={ConfirmPassword} />
          {password !== ConfirmPassword && run && <p className='text-danger fs-5'>كلمة المرور غير مطابقة</p>}
          <button className='btn btn-primary mt-3' type='submit' >انشاء حساب</button>
          <div className='mt-2 text-center'> لديك حساب بالفعل  ؟ <Link to="/login" className='text-info fw-bold'>تسجيل دخول</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Register