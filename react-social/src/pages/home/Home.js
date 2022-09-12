import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar.js'
import Topbar from '../../components/topbar/Topbar.js'
import Rightbar from '../../components/rightbar/Rightbar.js'
import Feed from '../../components/feed/Feed.js'
import "../../pages/home/Home.css"


function Home() {

  return (
    <>
      <Topbar />
      <div className='homeContainer'>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}

export default Home
