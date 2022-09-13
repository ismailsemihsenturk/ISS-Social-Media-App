import React from 'react'
import "../../components/messages/Message.css"
import { format } from "timeago.js"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


function Message({ message, own }) {

    const [messageSender, setMessageSender] = useState([])

    useEffect(() => {

        const getSender = async () => {
            try {
                const res = await axios.get("/users?userId=" + message.sender)
                setMessageSender(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getSender()
    }, [message?.sender])

    return (
        <div className={own ? "message own" : "message"}>

            <div className="messageTop">
                {own ?
                    (
                        <>
                            <p className='messageText'>{message.text}</p>
                            <img src={`${messageSender?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + messageSender.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "person/noAvatar.jpg"}`} alt="" className="messageImg messageImgSender" />
                        </>
                    )
                    :
                    (
                        <>
                            <img src={`${messageSender?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + messageSender.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "person/noAvatar.jpg"}`} alt="" className="messageImg" />
                            <p className='messageText'>{message.text}</p>
                        </>
                    )
                }
            </div>


            <div className="messageBottom">
                {format(message.createdAt)}
            </div>

        </div>
    )
}

export default Message
