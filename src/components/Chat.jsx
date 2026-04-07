import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createConnectionSocket } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text: text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createConnectionSocket();
    //creating a connection
    console.log("connected");
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createConnectionSocket();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 h-[70vh] flex flex-col overflow-hidden">
      <h1 className="p-5 border-b border-gray-600 shrink-0">Chat</h1>
      <div className="flex-1 overflow-y-auto p-5 min-h-0">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div
                className={`chat ${
                  user?.firstName === msg.firstName ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-header">{`${msg.firstName} ${msg.lastName}`}</div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 flex items-center gap-3 border-t border-gray-600 shrink-0 bg-base-300">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input input-bordered flex-1 bg-gray-600 text-white"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary shrink-0">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
