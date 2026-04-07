import io from "socket.io-client";

export const createConnectionSocket = () => {
  const socketUrl = import.meta.env.DEV
    ? "http://localhost:7777"
    : window.location.origin;

  console.log(socketUrl);

  return io(socketUrl, {
    withCredentials: true,
  });
};
