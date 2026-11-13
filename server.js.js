const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.get('/', (req, res) => {
  res.send('Audio Streaming Server is Alive!');
});

io.on('connection', (socket) => {
  console.log('A device connected:', socket.id);

  // Sender eken ena audio chunks anith ayata (Receiver) yawanawa
  socket.on('audio-stream', (data) => {
    socket.broadcast.emit('audio-stream', data);
  });

  socket.on('disconnect', () => {
    console.log('Device disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});