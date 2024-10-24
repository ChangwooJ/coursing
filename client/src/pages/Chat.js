import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import "../css/Chat.css";

// 서버와 소켓 연결
const socket = io('http://localhost:8000/');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  // 메시지 수신
  useEffect(() => {
    socket.on('receiveMessage', (receivedMessage) => {
      setChatLog((prevChatLog) => [...prevChatLog, receivedMessage]);
    });

    return () => {
      socket.off('receiveMessage'); // 컴포넌트 언마운트 시 이벤트 해제
    };
  }, []);

  // 메시지 전송
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage(''); // 메시지 입력 필드 초기화
    }
  };

  return (
    <div className="chat_wrap">
      <h2>실시간 채팅</h2>
      <div className="chat_log">
        {chatLog.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
};

export default Chat;
