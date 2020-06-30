import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {

    const [LikesNumber, setLikesNumber] = useState(0)
    const [DislikesNumber, setDislikesNumber] = useState(0)
    const [LikesAction, setLikesAction] = useState(null)
    const [DislikesAction, setDislikesAction] = useState(null)

    let variable = { };

    if(props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success){
                    
                    // How many likes are shown on the video or comment?
                    setLikesNumber(response.data.likes.length)

                    // Did you click on 'Like'?
                    response.data.likes.map(like => {
                        if(like.userId === props.userId){
                            setLikesAction('liked')
                        }
                    })

                } else {
                    alert('Likes Info import failed.')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if(response.data.success){
                    
                    // How many dislikes are shown?
                    setDislikesNumber(response.data.dislikes.length)

                    // Did you click on 'Dislike'?
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId){
                            setDislikesAction('disliked')
                        }
                    })

                } else {
                    alert('Dislikes Info import failed.')
                }
            })
    }, [])

    const onLikeClick = () => {

        if(LikesAction === null){
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success){
                        setLikesNumber(LikesNumber + 1)
                        setLikesAction('liked')

                        if(DislikesAction !== null){
                            setDislikesAction(null)
                            setDislikesNumber(DislikesNumber - 1)
                        }
                    } else {
                        alert('ERROR: Failed to up likes.')
                    }
                })
        } else {
            Axios.post('/api/like/downLike', variable)
                .then(response => {
                    if(response.data.success){
                        setLikesNumber(LikesNumber - 1)
                        setLikesAction(null)
                    } else {
                        alert('ERROR: Failed to down likes.')
                    }
                })
        }
    }

    const onDislikeClick = () => {

        if(DislikesAction !== null){

            Axios.post('/api/like/downDislike', variable)
                .then(response => {
                    if(response.data.success){
                        setDislikesNumber(DislikesNumber - 1)
                        setDislikesAction(null)
                    } else {
                        alert('ERROR: Failed to down dislikes.')
                    }
                })
        } else {

            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if(response.data.success){
                        setDislikesNumber(DislikesNumber + 1)
                        setDislikesAction('disliked')

                        if(LikesAction !== null){
                            setLikesAction(null)
                            setLikesNumber(LikesNumber - 1)
                        }
                    } else {
                        alert('ERROR: Failed to up dislikes.')
                    }
                })
        }
    }

    return (
        <div>
            <span key='comment-basic-like'>
                <Tooltip title='Like'>
                    <Icon 
                        type='like'
                        theme={LikesAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLikeClick}
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}> {LikesNumber} </span>
            </span> &nbsp; &nbsp;
            <span key='comment-basic-dislike'>
                <Tooltip title='Dislike'>
                    <Icon 
                        type='dislike'
                        theme={DislikesAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislikeClick}
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}> {DislikesNumber} </span>
            </span> &nbsp; &nbsp;
        </div>
    )
}

export default LikeDislikes
