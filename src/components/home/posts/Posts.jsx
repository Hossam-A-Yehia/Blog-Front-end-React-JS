import React, { useEffect, useState } from 'react'
import Post from '../../post/Post'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import "./posts.css"
import { useLocation } from 'react-router-dom'
function Posts() {
  const [posts, setPosts] = useState([])
  const location = useLocation()
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`https://blog-back-end-express.vercel.app/api/posts/${location.search}`)
      setPosts(res.data)
    }
    fetchPosts()
  }, [location.search])
  return (
    <div className='posts container mx-auto my-3'>
      <div className='row'>
        <div className='post col-9 d-flex gap-3 flex-wrap'>
          {posts?.map(post => <Post data={post} key={post._id} />)}
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

export default Posts