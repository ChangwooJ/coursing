import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/userActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoomList = ({ room, user_id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const get_target_id = () => {
        if (room.user_id === user_id) {
            return room.target_user_id;
        } else if (room.target_user_id === user_id) {
            return room.user_id;
        }
        return null; // 두 값이 모두 같지 않은 경우
    };
    const target_id = get_target_id();
    const target_info = users.find(user => user.user_id === target_id);
    const room_name = room.room_name;
    const [chatLogs, setChatLogs] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        const findRoom = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/chat_room/get_message', {
                    params: { room_name }
                });

                setChatLogs(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (room_name) {
            findRoom();
        }
    }, [room_name]);

    const lastChatLog = chatLogs.length > 0 ? chatLogs[chatLogs.length - 1] : null;

console.log("chat: ",target_id);
    return (
        <>
            {target_info && (
                <div className="room_wrap" onClick={() => navigate(`/chat/${target_id}`)}>
                    <img src={target_info.profile_img} className="target_img" />
                    {lastChatLog && (
                        <div className="room_info">
                            <p className="target_name">{target_info.name}</p>
                            <div className="chat_info">
                                <p>{lastChatLog.message}</p>
                                <span className="room_time">{lastChatLog.time}</span>
                            </div>
                        </div>
                    )}
                </div>
        )}
        </>
    )
}

export default RoomList;