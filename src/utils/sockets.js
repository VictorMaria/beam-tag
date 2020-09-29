import socketIOClient from 'socket.io-client';
import { BASE_URL } from '../services/APIs';

export const connectToSocket = () => {
    const socket = socketIOClient(BASE_URL);
    return socket;
}