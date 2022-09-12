import React, { useContext, useEffect, useState } from 'react'
import "../../components/feed/Feed.css"
import Post from '../post/Post'
import Share from '../share/Share'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'


function Feed({ username }) {

  // console.log("props: "+username)
  // let { id } = useParams();
  // console.log("params: "+id); 

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext)

  // While using React Routes v6 / React 18 when you route with params for example /profile:id it's broke the axios baseURL i dont know why. But you have to reset the baseURL to be able to make request again. 
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

  useEffect(() => {

    const fetchPosts = async () => {

      const res = username ? await axios.get("posts/profile/" + username) : await axios.get("posts/timeline/" + user._id);

      //setPosts and sort 
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }
    fetchPosts();

  }, [user?._id, username])


  return (
    <div className='feed'>
      <div className="feedWrapper">
        {user?.username === username && <Share />}
        {window.location.pathname === "/" && <Share />}

        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed
