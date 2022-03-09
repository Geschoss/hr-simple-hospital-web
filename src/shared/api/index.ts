import { WSClient } from './socket';

// get from env
let socket = new WebSocket('ws://localhost:8000');
export const wsClient = new WSClient(socket);
export { WSClient } from './socket';
