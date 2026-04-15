import React, { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createConnectionSocket } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { ChatShimmer } from "./Shimmer";

const Chat = ({ targetUserId: selectedTargetUserId, targetUserName }) => {
  const { targetUserId: paramTargetUserId } = useParams();
  const targetUserId = selectedTargetUserId || paramTargetUserId;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const fetchChatMessages = useCallback(async () => {
    if (!targetUserId) return;
    setIsLoading(true);
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text: text,
          msgSenderId: senderId?._id,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    if (!targetUserId) return;
    fetchChatMessages();
  }, [targetUserId, fetchChatMessages]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createConnectionSocket();
    socketRef.current = socket;
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", (incomingMessage) => {
      const {
        firstName,
        lastName,
        text,
        userId: senderUserId,
        senderId,
        msgSenderId,
      } = incomingMessage;

      const resolvedSenderId =
        msgSenderId || senderUserId || senderId?._id || senderId || null;
      const incomingFirstName = (firstName || "").trim().toLowerCase();
      const incomingLastName = (lastName || "").trim().toLowerCase();
      const currentFirstName = (user?.firstName || "").trim().toLowerCase();
      const currentLastName = (user?.lastName || "").trim().toLowerCase();
      const isMine =
        resolvedSenderId === userId ||
        (incomingFirstName === currentFirstName &&
          (!incomingLastName || incomingLastName === currentLastName));

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          firstName,
          lastName,
          text,
          msgSenderId: isMine ? userId : resolvedSenderId,
        },
      ]);
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId, user?.firstName, user?.lastName]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    const text = newMessage.trim();
    if (!text || !targetUserId) return;

    socketRef.current?.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text,
    });

    setNewMessage("");
  };

  if (!targetUserId) return null;
  if (isLoading) {
    return <ChatShimmer targetUserName={targetUserName || "Conversation"} />;
  }

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

      <div
        ref={messagesContainerRef}
        className="cc-scrollbar-hide flex-1 space-y-4 overflow-y-auto p-6"
      >
        {messages.map((msg, index) => {
          const isMine = userId === msg?.msgSenderId;
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
