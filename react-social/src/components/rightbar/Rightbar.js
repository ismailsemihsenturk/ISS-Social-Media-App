import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import "../../components/rightbar/Rightbar.css"
import Online from '../online/Online'
import { Users } from '../../dummyData';
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';



function Rightbar({ props }) {


    const { user: currentUser, dispatch } = useContext(AuthContext)
    // props : the user of the profile (someone - it can be us too) 
    // currenUser: logged in user (us)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log("loc: " + window.location.pathname)

    const [friends, setFriends] = useState([])
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        if (props.username !== undefined) {
            const fetchFriends = async () => {
                const userFollowings = await axios.get(`users/friends?username=${props.username}`)
                setFriends(userFollowings.data);

                const followObj = currentUser?.followings.includes(props?._id)
                setFollowed(followObj);
            }
            fetchFriends();
        }

    }, [props.username, currentUser, props._id])


    const followHandler = async () => {
        try {

            if (followed) {
                // Unfollow
                await axios.put("/users/unfollow/" + props._id, { userId: currentUser._id })
                dispatch({ type: "UNFOLLOW", payload: props._id })
            } else {
                //Follow
                await axios.put("/users/follow/" + props._id, { userId: currentUser._id })
                dispatch({ type: "FOLLOW", payload: props._id })
            }

            console.log("current: " + JSON.stringify(currentUser, null, "\t"))

        } catch (error) {
            console.log(error)
        }

        setFollowed(!followed);
    }


    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className='birthdayImg' src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText"><b>Beril Şentürk</b> and <b>2 other friends</b> have a birthday today!</span>
                </div>
                <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>

                <ul className="rightbarFriendList">
                    {Users.map((user) => (
                        <Online key={user.id} user={user} />
                    ))}
                </ul>
            </>
        )
    }


    const ProfileRightbar = () => {
        return (
            <>
                {
                    currentUser && (
                        props.username !== currentUser.username && (
                            <button className="rightbarFollowButton" onClick={followHandler}>
                                {followed ? "Unfollow" : "Follow"}
                                {followed ? <DoneIcon /> : <AddIcon />}
                            </button>
                        )
                    )
                }

                <h4 className='rightbarTitle'>User information </h4>
                <div className="rightbarInfo">

                    <div className="rightbarInfoItem">
                        <span className="rightBarInfoKey">City:</span>
                        <span className="rightBarInfoValue">{props?.city || " unknown"}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightBarInfoKey">From:</span>
                        <span className="rightBarInfoValue">{props?.from || " unknown"}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightBarInfoKey">Relationship:</span>
                        <span className="rightBarInfoValue">{props?.relationship || " unknown"}</span>
                    </div>

                </div>

                <h4 className='rightbarTitle'>User friends </h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <div key={friend._id} className="rightbarFollowing">
                            <Link to={`/profile/${friend.username}`}>
                                <img src={`${friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.jpg"}`} alt="" className="rightbarFollowingImg" />
                            </Link>
                            <span className="rightbarFollowingName">{friend.firstname + " " + friend.lastname}   </span>
                        </div>
                    ))}
                </div>
            </>
        )
    }


    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {(window.location.pathname !== "/") && <ProfileRightbar />}
                {(window.location.pathname === "/") && <HomeRightbar />}
            </div>
        </div>
    )
}

export default Rightbar
