import React, {useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import {auth} from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'


const Chats = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const handleLogout = async () => {
        await auth.signOut();
        history.push('./Login.js')
    }

    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data],"userPhoto.jpg",{type:'image/jpge'})
    }

    useEffect(() =>{
            if(!user){
                history.push('./Login.js');

                return;
            }

             axios.get('https://api.chatengine.io/users/me',
             {
                headers: {
                    "project-id":"0bc90dac-635a-46d9-be4f-5f5c8786d2eb",
                    "user-name":user.email,
                    "user-secret": user.uid,
                 }
             })
             .then(()=>{
                setLoading(false);
             })
             .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.displayName);
                formdata.append('secret', user.uid)

                getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar',avatar,avatar.name)

                    axios.post('https://api.chatengine.io/users',
                    formdata,
                    {headers:{"private-key":"b2da629a-4f4f-4633-9496-e5bb08bdd110"}}
                    )
                    .then(()=> setLoading(false))
                    .catch((error)=> console.log(error))
               
                })


             })

    },[user, history])
        if(!user || loading) return 'loading...'


  return (
   <div className="chats-page">
    <div className='nav-bar'>
        <div className='logo-tab'>
            chatBox
        </div>
        <div onClick={handleLogout} className='logout-tab'>
        Logout
        </div>
    </div>

    <ChatEngine 
    height="calc(100vh - 66px)"
    projectID="0bc90dac-635a-46d9-be4f-5f5c8786d2eb"
    userName={user.email}
    userSecret={user.uid}
    />

   </div>
  )
}

export default Chats