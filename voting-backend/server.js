const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const socketHandler = require('./socket/socketHandler');

connectDB();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

// Attach Socket.IO to Express app to allow route access
app.set('socketio', io);

socketHandler(io);

const PORT = 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
