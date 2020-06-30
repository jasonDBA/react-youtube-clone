import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user)

    const [OpenReplyTo, setOpenReplyTo] = useState(false)   // false: The reply form is hidden.
    const [CommentValue, setCommentValue] = useState("")

    const onReplyToClick = () => {
        setOpenReplyTo(!OpenReplyTo)
    }

    const onReplyToHandler = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            content: CommentValue,
            responseTo: props.comment._id,
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    setCommentValue("")
                    setOpenReplyTo(false)
                    props.refreshFunc(response.data.result)
                } else {
                    alert("ERROR: Failed to save the comment.")
                }
            })
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />
        ,<span onClick={onReplyToClick} key="comment-basic-reply-to" >Reply to</span>
    ]

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar = {<Avatar src={props.comment.writer.image} alt />}
                content = {<p>{props.comment.content}</p>}
            />

            {OpenReplyTo && // When OpenReplyTo is true (ReplyTo button is clicked), the form is shown.
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onReplyToHandler}
                        value={CommentValue}
                        placeholder='Leave a comment.'
                    >

                    </textarea>
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>  
                        Submit
                    </button>
                </form>
            }
        </div>
    )
}

export default SingleComment
