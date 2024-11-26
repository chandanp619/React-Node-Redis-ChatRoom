import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { io } from 'socket.io-client';

export default function RoomComponent() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [room] = useState(() => localStorage.getItem("selected_channel") || "");
  const [user] = useState(() => localStorage.getItem("user_name") || "");
  const [socket] = useState(() => io('http://localhost:8083'));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!room) {
      navigate("/");
      return;
    }

    // Subscribe to the room
    socket.emit('subscribe', room);

    // Listen to messages from the server
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      // Unsubscribe and disconnect the socket
      socket.emit('unsubscribe', room);
      socket.disconnect();
    };
  }, [socket, room, user, navigate]);

  const sendMessage = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const message = `${user}: ${e.target.value}`; 
      socket.emit('message', { channel: room, message });
      setMessages((prev) => [...prev]); // Optimistic update just to reload component
      e.target.value = "";
    }
  };

  return (
    <div className='home container-fluid'>
      <HeaderComponent />

      <div className='row body'>
        <div className='col-12'>
          <h1>Room: {room}</h1>
        </div>
        <div className='col-12'>
          <div style={{ height: "40vh", overflow: "scroll", border: "1px solid gray" }}>
            {messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
          <br />
          <input
            type="text"
            className='form-control'
            placeholder="Type your message here..."
            onKeyUp={sendMessage}
          />
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}
