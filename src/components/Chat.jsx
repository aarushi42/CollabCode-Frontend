import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createConnectionSocket } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = ({ targetUserId: selectedTargetUserId, targetUserName }) => {
  const { targetUserId: paramTargetUserId } = useParams();
  const targetUserId = selectedTargetUserId || paramTargetUserId;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const fetchChatMessages = async () => {
    if (!targetUserId) return;
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

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
    if (!targetUserId) return;
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createConnectionSocket();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
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
    if (!newMessage.trim() || !targetUserId) return;
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

  if (!targetUserId) return null;

  return (
    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[30px] border border-[#2a3e6a] bg-[#0e1b37]/60 backdrop-blur-lg">
      <div className="flex items-center justify-between border-b border-[#2a3e6a] bg-[#142449]/70 px-6 py-4">
        <h1 className="cc-title text-xl font-bold text-white">
          {targetUserName || "Conversation"}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9baad6]">
          Live Chat
        </p>
      </div>

      <div className="cc-scrollbar-hide flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((msg, index) => {
          const isMine = user?.firstName === msg.firstName;
          return (
            <div
              key={index}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                  isMine
                    ? "bg-gradient-to-r from-[#9c48ea] to-[#c180ff] text-[#12031f]"
                    : "border border-[#344a77] bg-[#142449] text-[#dbe4ff]"
                }`}
              >
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wide opacity-75">
                  {msg.firstName} {msg.lastName}
                </p>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 border-t border-[#2a3e6a] bg-[#0f1d3a] p-4">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 px-4 py-3 text-sm text-[#dee5ff] outline-none placeholder:text-[#8495c4] focus:border-[#c180ff]"
          placeholder="Type a message..."
        ></input>
        <button
          onClick={sendMessage}
          className="cc-primary-btn shrink-0 rounded-xl px-5 py-3 text-sm font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
