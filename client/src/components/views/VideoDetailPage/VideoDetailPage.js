import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

function VideoDetailPage(props) {
    
    const videoId = props.match.params.videoId // From :videoId parameter in the Routing url in App.js
    const variable = { videoId: videoId }
    
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    
    useEffect(() => {
        
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    //console.log(response.data.videoDetail)
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert("ERROR: Failed to get video information.")
                }
            })
        
        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success){
                    setComments(response.data.comments)
                } else {
                    alert('ERROR: Comments Info import failed.')
                }
            })

    }, [])

    const refreshFunc = (newComments) => {
        setComments(Comments.concat(newComments))
    }
    
    if(VideoDetail.writer){

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row>
                {/* Main Contents */}
                <Col lg={18} xs={24}>
                    <div style={{ width:'100%', padding: '3rem 4rem' }}>
                        
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

    
                        <List.Item
                            actions={[
                                <LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} />, 
                                subscribeButton 
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
    
                        {/* Comment */}
                        <Comment postId={videoId} commentLists={Comments} refreshFunc={refreshFunc} />
                    </div>
                </Col>
    
                {/* Side Video Bar */}
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage