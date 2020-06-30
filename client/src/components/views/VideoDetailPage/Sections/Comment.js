import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const user = useSelector(state => state.user)
    const videoId = props.postId;
    const [commentValue, setcommentValue] = useState("")

    const onCommentHandler = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
  
        const variables = {
            writer: user.userData._id,
            postId: videoId,
            content: commentValue
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    setcommentValue("")
                    props.refreshFunc(response.data.result)
                } else {
                    alert("ERROR: Failed to save the comment.")
                }
            })

    }

    return (
        <div>
            <br/>
            <p> Comments </p>
            <hr/>

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment comment={comment} postId={videoId} refreshFunc={props.refreshFunc}/>
                        <ReplyComment 
                            commentLists={props.commentLists} 
                            parentCommentId={comment._id} 
                            postId={videoId}
                            refreshFunc={props.refreshFunc} 
                        />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}

            {/* Comments Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onCommentHandler}
                    value={commentValue}
                    placeholder='Leave a comment.'
                >

                </textarea>
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>  
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Comment
