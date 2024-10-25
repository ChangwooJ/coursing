import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import "../css/ChatRoom.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/actions/userActions";

const ChatRoom = () => {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const { loading, userInfo } = useContext(AuthContext);
    const [chatLog, setChatLog] = useState([]);
    const [message, setMessage] = useState('');
    const [roomExist, setRoomExist] = useState(false);
    const [room_name, setRoom_name] = useState('');
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const target_info = users.find(user => user.user_id === Number(user_id));

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        const sort_id = [user_id, userInfo[0].user_id].sort();
        const new_room_name = sort_id.join('_');
        setRoom_name(new_room_name);
    }, [user_id]);

    useEffect(() => {
        const findRoom = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/chat_room', {
                    params: { room_name }
                });
                console.log(response.data);

                if (response.data.exists) {
                    setRoomExist(true);
                    setChatLog(response.data.chatLogs);
                } else {
                    setRoomExist(false);
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (!loading && room_name) {
            findRoom();
        }
    }, [loading, room_name, message]);


    const handleSendMessage = async () => {
        if (!roomExist) {
            try {
                await axios.post('http://localhost:8000/api/newRoom', {
                    room_name: room_name,
                    user_id: userInfo[0].user_id,
                    target_user_id: user_id
                });
                setRoomExist(true);
            } catch (err) {
                console.error(err);
            }
        }

        if (message.trim() === '') return;

        try {
            await axios.post('http://localhost:8000/api/chat_room/message', {
                room_name: room_name,
                send_user_id: userInfo[0].user_id,
                message: message
            });

            setMessage('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    console.log(target_info);
    return (
        <React.Fragment>
            <div className="chat_room_wrap">
                <div className="chat_room_top">
                    <div className="chat_room_close" onClick={() => navigate('/chat')}>⇦</div>
                    <div className="target_user">{target_info ? target_info.name : "Loading..."}</div>
                </div>
                <div className="chat_room_middle">
                    {chatLog.map((chat) => (
                        <div className={`message_log ${chat.send_user_id === userInfo[0].user_id ? 'message_log_me' : 'message_log_you'}`}>
                            {chat.send_user_id !== userInfo[0].user_id && (
                                <img src={target_info.profile_img} className="target_img" />
                            )}
                            <span className="message_text">{chat.message}</span>
                            <span className="send_time">{chat.time}</span>
                        </div>
                    ))}
                </div>
                <div className="chat_room_bottom">
                    <input
                        className="textbox" type="text"
                        placeholder="메시지를 입력해주세요."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className="send_message" type="subbit">전송</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChatRoom;