import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const history = useHistory(); 
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");

      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": 
          "3db7b5a0-b671-483e-8c7d-9f55b037796c",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": "a00a3bb1-4002-4620-8ef6-c6b3d4ae5fdc",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading)
    return (
      <div className="center">
        <div className="ring"> </div>
        <h3 className="loading">Loading...</h3>
      </div>
    );

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">nurs-chat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - px)"
        projectID={
        "3db7b5a0-b671-483e-8c7d-9f55b037796c"}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
