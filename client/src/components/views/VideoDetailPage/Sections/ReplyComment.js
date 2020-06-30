import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyTo, setOpenReplyTo] = useState(false)

    useEffect(() => {
        
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber++;
            }
        })

        setChildCommentNumber(commentNumber)

    }, [props.commentLists])
    
    const renderReplyComment = (parentCommentId) => (
        
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId && 
                    <div
                        style={{ width:'80%', marginLeft: '40px' }}
                    >
                        <SingleComment comment={comment} postId={props.videoId} refreshFunc={props.refreshFunc}/>
                        <ReplyComment 
                            commentLists={props.commentLists} 
                            postId={props.videoId} 
                            parentCommentId={comment._id}
                            refreshFunc={props.refreshFunc}
                        />
                    </div>
                }
            </React.Fragment>
        ))

    )
    
    const onReplyToHandler = () => {
        setOpenReplyTo(!OpenReplyTo)
    }

    return (
        <div>
            {ChildCommentNumber > 0 && 
                <p 
                    style={{ fontSize: '14px', margin: '0', color: 'gray' }}
                    onClick={onReplyToHandler}
                >
                    View {ChildCommentNumber} more comment(s)
                </p>
            }

            {OpenReplyTo && 
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
