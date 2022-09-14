import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "../../components/chatOnline/ChatOnline.css"
import axios from "axios"


function ChatOnline({ onlineUsers, currentId, setCurrentConversations }) {

    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])


    useEffect(() => {

        const getFriends = async () => {
            try {
                const res = await axios.get("/users/friends?userId=" + currentId)
                setFriends(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()

    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)))

    }, [friends, onlineUsers])

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
            setCurrentConversations(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='chatOnline'>
            {onlineFriends.map(online => (
                <div key={online._id} className="chatOnlineFriend" onClick={ () => handleClick(online)}>
                    <div className="chatOnlineImgContainer">
                        <img className="chatOnlineImg" src={online?.profilePicture ?
                            process.env.REACT_APP_PUBLIC_FOLDER + online.profilePicture
                            : process.env.REACT_APP_PUBLIC_FOLDER + "person/noAvatar.jpg"} alt="" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{online.firstname + " " + online.lastname}</span>
                </div>
            ))}
        </div>
    )
}

export default ChatOnline
