import React, { useState } from 'react'
import { GoDiffAdded } from "react-icons/go"
import { useSelector } from 'react-redux'
import axios from 'axios'
function Write() {
  const { users } = useSelector(state => state.user)
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [file, setFile] = useState()
  const [category, setCategory] = useState([])

  const handleCheckbox = e => {
    const value = e.target.value
    const checked = e.target.checked
    if (checked) {
      setCategory(e => [...e, value])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      username: users.username,
      title,
      desc,
      category
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append("name", fileName)
      data.append("file", file)
      newPost.photo = fileName
      try {
        await axios.post("https://blog-back-end-express.vercel.app/upload", data)
      } catch (err) { console.log("yrtytry") }
    }
    try {
      const res = await axios.post("https://blog-back-end-express.vercel.app/api/posts", newPost)
      window.location.replace(`/posts/${res.data._id}`)
    } catch (err) { console.log(err) }
  }

  return (
    <div className='container my-4 position-relative'>
      {file && <img src={URL.createObjectURL(file)} alt="" className='rounded mb-4 w-75' style={{ height: "300px" }} />}
      <form onSubmit={handleSubmit} >

        <div className='d-flex justify-content-center w-75'>
          <div >
            <label htmlFor='fileInput'><GoDiffAdded className='fs-2 mt-2' style={{ color: "#e91e63" }} /></label>
            <input type="file" id='fileInput' className='d-none' onChange={e => setFile(e.target.files[0])} />
          </div>
          <div className='w-100 me-2'>
            <input type="text" className='form-control d-block w-100 5' style={{ height: "50px" }} placeholder='عنوان المقالة..' onChange={e => setTitle(e.target.value)} />
            <textarea className="form-control my-3" style={{ height: "200px" }} onChange={e => setDesc(e.target.value)} />
            <div className='d-flex align-items-between justify-content-between border rounded p-2 text-bg-primary '>
              <div className='d-flex align-items-center justify-content-center mb-2 '>
                <input className="form-check-input ms-2" type="checkbox" value="حياة" onChange={handleCheckbox} />
                <label>حياة</label>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <input className="form-check-input ms-2" type="checkbox" value="موسيقي" onChange={handleCheckbox} />
                <label>موسيقي</label>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <input className="form-check-input ms-2" type="checkbox" value="تكنولوجيا" onChange={handleCheckbox} />
                <label>تكنولوجيا</label>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <input className="form-check-input ms-2" type="checkbox" value="سياسة" onChange={handleCheckbox} />
                <label>سياسة</label>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <input className="form-check-input ms-2" type="checkbox" value="رياضة" onChange={handleCheckbox} />
                <label>رياضة</label>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <input className="form-check-input ms-2" type="checkbox" value="موضة" onChange={handleCheckbox} />
                <label>موضة</label>
              </div>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary position-absolute top-50 start-0 translate-middle'>اضافة</button>
      </form>
    </div>
  )
}

export default Write