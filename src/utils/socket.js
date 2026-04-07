import io from "socket.io-client";

export const createConnectionSocket = () => {
  return io(window.location.origin, {
    withCredentials: true,
    path: "/api/socket.io",
  });
};
