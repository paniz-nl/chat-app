import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import axios  from "axios";

//components
import Navbar from './Navbar';

//styles
import styles from "./Chats.module.css";

//context
import { AuthContext } from '../contexts/AuthContextProvider';

const Chats = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
   
    useEffect(() => {
        if(!user ){
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "10696ca1-877d-406f-b4f2-8d231ed5e9eb",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append("email", user.email);
            formdata.append("username", user.email);
            formdata.append("secret", user.uid);
            getFile(user.photoURL)
                .then(avatar => {
                    formdata.append("avatar", avatar, avatar.name)
                    axios.post("https://api.chatengine.io/users/", formdata, {
                        headers: {
                            "private-key": "5ef2b690-fb0c-494c-ad58-c65d4163c24d"
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                })
        })

    },[user, history])

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: "image/jpg"})
    }

    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/");
    }

    if (!user || loading) return "Loading..."

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler}/>

            <ChatEngine 
                height="calc(100vh - 50px)"
                projectID="10696ca1-877d-406f-b4f2-8d231ed5e9eb"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;