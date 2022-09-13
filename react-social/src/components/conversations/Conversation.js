import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../../components/conversations/Conversation.css"


function Conversation({ conversation, currentUser }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== currentUser._id)

        const getUser = async () => {
            try {
                const res = await axios.get("/users?userId=" + friendId)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()

    }, [currentUser._id, conversation.members])

    return (
        <div className='conversation'>
            <img src={`${user?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "person/noAvatar.jpg"}`} alt="" className="conversationImg" />
            <span className="conversationName">{user?.firstname + " " + user?.lastname}</span>
        </div>
    )
}

export default Conversation
