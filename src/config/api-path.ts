const path = {
  root: '/',
  avatar_train: '/avatar/train',
  avatar_speak: '/avatar/speak',
  avatar_train_status: '/avatar/train-status',
  avatar_list: '/avatar/list-ready',
  avatar_video: '/avatar/video',
  avatar_speak_video: '/avatar/speak',
};

Object.keys(path).forEach(function (key) {
  const serverUrl = process.env.SERVER_HOST;
  const serverPort = process.env.SERVER_PORT;
  if (serverUrl) {
    path[key] = `${serverUrl}:${serverPort}${path[key]}`;
  }
});

// export mapping
export default path;
