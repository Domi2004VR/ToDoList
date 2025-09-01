// socket.js
import { io } from "socket.io-client";
//Creo e apro una connessione con il WebSocket che gira su 3002
const socket = io('http://localhost:3002');
export default socket;
