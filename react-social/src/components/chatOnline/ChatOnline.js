import React from 'react'
import "../../components/chatOnline/ChatOnline.css"

function ChatOnline() {
    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={`${process.env.REACT_APP_PUBLIC_FOLDER + "person/iss.jpeg"}`} alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">İSŞ</span>
            </div>
        </div>
    )
}

export default ChatOnline
