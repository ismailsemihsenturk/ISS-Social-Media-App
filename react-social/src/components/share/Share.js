import React, { useContext, useRef, useState } from 'react'
import "../../components/share/Share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import PlaceIcon from '@mui/icons-material/Place';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';



function Share() {

    const shareRef = useRef(HTMLDivElement)
    const textareaRef = useRef(HTMLTextAreaElement);
    const textAreaHeightHandler = () => {
        textareaRef.current.style.height = "";
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight) + "px";
        shareRef.current.style.height = Math.min(textareaRef.current.scrollHeight + 100) + "px";
    }

    const { user } = useContext(AuthContext);
    const [file, setFile] = useState([]);
    const [fileSelected, setFileSelected] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: textareaRef.current.value,
            img: [],
        }
        if (file) {
            const data = new FormData();
            Array.from(file).forEach(fileArray => {

                const fileName = Date.now() + fileArray.name
                // const newFile = new File([fileArray], fileName)

                //upload.array("files")
                data.append("files", fileArray);
                data.append("newname", fileName);
                data.append("oldname", fileArray.name);

                newPost.img.push(fileName);
                console.log("newPost " + JSON.stringify(newPost))
            })

            // Upload file to the public/images
            try {
                await axios.post("/upload", data)
            } catch (error) {
                console.log(error)
            }
        }

        // Upload post
        try {
            await axios.post("/posts", newPost)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='share' ref={shareRef}>
            <div className="shareWrapper">
                <div className="shareTop">
                    {/* <img className='shareProfileImg' src="/assets/person/1.jpeg" alt="" /> */}
                    <textarea maxLength={500} ref={textareaRef} className="shareInput" name="text" onInput={textAreaHeightHandler} placeholder={`What's in your mind ${user.firstname}?`}></textarea>
                    {/* <input type="text" placeholder="What's in your mind?" className="shareInput" /> */}
                </div>
                <hr className='shareHr' />
                {fileSelected && (
                    console.log("fN: " + file[0]?.name),
                    console.log("fn type: " + typeof file),
                    console.log("file: " + JSON.stringify(file, null, "\t")),
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(new Blob(file))} alt="" className="shareImg" />
                        <CancelIcon className='shareCancelImg' onClick={() => setFileSelected(!fileSelected)} />
                    </div>
                )}

                <div className="shareBottom">

                    <form action="" className="shareBottom" onSubmit={submitHandler}>
                        <div className="shareOptions">

                            <label htmlFor='file' className="shareOption">
                                <PermMediaIcon htmlColor='tomato' className='shareIcon' />
                                <span className='shareOptionText'>Photo or Video</span>
                                <input style={{ display: "none" }} type="file" id="file" multiple="multiple" accept='.png,.jpeg,.jpg' onChange={e => {
                                    setFile(e.target.files);
                                    setFileSelected(!fileSelected);
                                }} />
                            </label>

                            <div className="shareOption">
                                <LabelIcon htmlColor='blue' className='shareIcon' />
                                <span className='shareOptionText'>Tag</span>
                            </div>

                            <div className="shareOption">
                                <PlaceIcon htmlColor='green' className='shareIcon' />
                                <span className='shareOptionText'>Location</span>
                            </div>

                            <div className="shareOption">
                                <EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon' />
                                <span className='shareOptionText'>Feelings</span>
                            </div>
                        </div>
                        <button type='submit' className="shareButton">Share</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Share
