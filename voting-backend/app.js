const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const voteRoutes = require('./routes/voteRoutes');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secretVotingSessionKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use('/', voteRoutes);

module.exports = app;
