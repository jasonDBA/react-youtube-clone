import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {

        let subscribeNumberVariable = { userTo: props.userTo }

        Axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(response.data.subcriberNumber)
                } else {
                    alert('ERROR: Subscribers\' information import failed.')
                }
            })
        
        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribed(response.data.subscribed)
                } else {
                    alert("ERROR: Subscribed information import failed.")
                }
            })
    }, [])

    const onSubscribe = () => {

        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        } 

        // If it has been subscribed already,
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert("ERROR: Failed to unsubscribe.")
                    }
                })
        } else {    // if it has not yet been subscribed,
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert("ERROR: Failed to subscribe.")
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{ backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase' }}
                
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? "UnSubscribe" : "Subscribe"}
            </button>
        </div>
    )
}

export default Subscribe
