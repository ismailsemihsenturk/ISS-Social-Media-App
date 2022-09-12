import React, { useState, useEffect, useContext } from 'react'
import "../../components/post/Post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import axios from "axios"
import { format } from "timeago.js"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


function Post({ post }) {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser?._id))
    }, [currentUser?._id, post.likes])

    useEffect(() => {

        const fetchUser = async () => {
            const res = await axios.get(`users?userId=${post.userId}`);
            setUser(res.data)
        }
        fetchUser();

    }, [post.userId])


    const likeHandler = async () => {
        try {
            await axios.put("/posts/like/" + post._id, { userId: currentUser._id })
        } catch (error) {
            console.log(error)
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className='postProfileImg' src={`${user.profilePicture ? PF + user?.profilePicture : PF + "person/noAvatar.jpg"}`} alt="" />
                        </Link>

                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>

                    {currentUser && (
                        <div className="postTopRight">
                            <MoreVertIcon />
                        </div>
                    )}
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className='postImg' src={PF + post.img[0]} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {currentUser && (
                            <>
                                <img className='postReactionIcon' src={`${PF}heart.png`} alt="" onClick={likeHandler} />
                                <img className='postReactionIcon' src={`${PF}like.png`} alt="" onClick={likeHandler} />
                            </>
                        )}
                        <span className=".postReactionCounter">{like} people like it!</span>
                    </div>
                    <div className="postBottomRight">
                        <CommentIcon className='postCommentIcon' />
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
