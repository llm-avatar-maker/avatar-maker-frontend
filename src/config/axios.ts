import axios from 'axios';

const serverHost = process.env.SERVER_HOST || '127.0.0.1';
const serverPort = process.env.SERVER_PORT || '3000';

const instance = axios.create({
  baseURL: `http://${serverHost}:${serverPort}`,
  // You can add other default configs here
});

export default instance;
