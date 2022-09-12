import React from 'react'
import "../../components/closeFriend/CloseFriend.css"

function CloseFriend({ friend }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="sidebarFriendItem">
            <img className='sidebarFriendImg' src={PF+friend.profilePicture} alt="" />
            <span className="sidebarFriendName">{friend.username}</span>
        </li>
    )
}

export default CloseFriend
