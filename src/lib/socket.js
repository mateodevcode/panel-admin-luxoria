import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const socket = io(URL, {
  autoConnect: false, // evita que se conecte antes de que tú lo indiques
  transports: ["websocket"], // fuerza WebSocket si quieres estabilidad
});

export default socket;
