import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import "../../pages/profile/Profile.css"
import { useParams } from "react-router-dom";
import axios from "axios"


function Profile() {

    let { username } = useParams();
    console.log("param: " + username)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})


    useEffect(() => {

        const fetchUser = async () => {
            const res = await axios.get(`users?username=${username}`);
            setUser(res.data)
            console.log("user set")
        }
        fetchUser();

    }, [username])

    return (
        <>
            <Topbar />
            <div className='profileContainer'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={`${user.coverPicture ? PF + user?.coverPicture : PF + "person/noCover.jpg"}`} alt="" />
                            <img className='profileUserImg' src={`${user.profilePicture ? PF + user?.profilePicture : PF + "person/noAvatar.jpg"}`} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.firstname + " " + user.lastname}</h4>
                            <span className='profileInfoDesc'>{user.desc} </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar props={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
