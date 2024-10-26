import React, { useContext, useEffect, useState } from 'react';
import "../css/Chat.css";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import RoomList from '../component/Chat/roomList';

const Chat = () => {
  const { loading, userInfo } = useContext(AuthContext);
  const [rooms, setRooms] =  useState([]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chat_rooms/${userInfo[0].user_id}`);
        setRooms(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if(!loading) {
      fetchChatData();
    }
  }, [userInfo]);

  if(loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat_wrap">
      <div className='chat_top'>메시지</div>
      {rooms.map((room) => (
        <RoomList room={room} user_id={userInfo[0].user_id} />
      ))}
    </div>
  )
};

export default Chat;
