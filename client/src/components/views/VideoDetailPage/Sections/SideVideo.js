import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function SideVideo() {

    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {

        Axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success){
                    console.log(response.data.videos)
                    setSideVideos(response.data.videos)
                } else {
                    alert('ERROR: Side videos import failed.')
                }
            })

    }, [])

    const renderSideVideo = SideVideos.map((video, index) => {
        
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);
        
        return <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem'}}>
            <div style={{ width: '40%', marginRight: '1rem' }}>
                <a href={`/video/${video._id}`}>
                    <img style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail' />
                </a>
            </div>
            
            <div style={{ width: '50%' }}>
                <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                    <span style={{ fontSize: '0.9rem', color: 'black' }}> {video.title} </span><br/>
                    <span> {video.writer.name} </span><br/>
                    <span> {video.views} views </span><br/>
                    <span> {minutes} : {seconds} </span>    
                </a>
            </div>
        </div>  
    })

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {renderSideVideo}
        </React.Fragment>
    )
}

export default SideVideo