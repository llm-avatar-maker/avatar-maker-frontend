import axios from 'axios';

const serverHost = process.env.REACT_APP_SERVER_HOST || 'localhost';
const serverPort = process.env.REACT_APP_SERVER_PORT || '3000';
const serverProtocol = process.env.REACT_APP_SERVER_PROTOCOL || 'http';

const instance = axios.create({
  baseURL: `${serverProtocol}://${serverHost}:${serverPort}`,
  // You can add other default configs here
});

// Set ngrok-skip-browser-warning for all requests
instance.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

export default instance;
