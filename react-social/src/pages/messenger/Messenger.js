import React, { useContext, useEffect, useState } from 'react'
import "../../pages/messenger/Messenger.css"
import Topbar from "../../components/topbar/Topbar.js"
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/messages/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"
import ScrollToBottom from 'react-scroll-to-bottom';
import { io } from "socket.io-client"
import { useRef } from 'react'


function Messenger() {

    const [conversations, setConversetions] = useState([])
    const [currentConversations, setCurrentConversations] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { user } = useContext(AuthContext)
    const socket = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")

        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])


    useEffect(() => {
        arrivalMessage &&
            currentConversations?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage])

    }, [arrivalMessage, currentConversations?.members])



    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(
                // if one of the elements in user followings has the same userId with socket users then return that userId
                user.followings.filter((f) => users.some((u) => u.userId === f))
            )
        })
    }, [user])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id)
                setConversetions(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations();

    }, [user._id])


    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentConversations?._id)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [currentConversations?._id])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            conversationId: currentConversations._id,
            sender: user._id,
            text: newMessage
        };

        const receiverId = currentConversations.members.find(member => member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post("/messages", message)
            setMessages([...messages, res.data])
            setNewMessage("")

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Topbar />
            <div className='messenger'>

                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className='chatMenuInput' />
                        {conversations.map((conversation) => (
                            <div key={conversation._id} onClick={() => setCurrentConversations(conversation)}>
                                <Conversation conversation={conversation} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentConversations ?
                                <>
                                    <div className="chatBoxTop">
                                        <ScrollToBottom className='scrollContainer'>

                                            {messages.map((message) => (
                                                <div className='messageElement' key={message._id}>
                                                    <Message message={message} own={message.sender === user._id} />
                                                </div>
                                            ))}

                                        </ScrollToBottom>
                                    </div>

                                    <div className="chatBoxBottom">
                                        <textarea rows={5} cols={50} className='chatMessageInput' placeholder='write something...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                    </div>
                                </>
                                :
                                <span className='noConversationText'>Open a conversation to start a chat</span>
                        }

                    </div>
                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentConversations={setCurrentConversations} />
                    </div>
                </div>

            </div >
        </>

    )
}

export default Messenger
