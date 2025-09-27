const Vote= require('../models/Vote')
const OPTIONS = ['Option A', 'Option B', 'Option C'];

const emitVotes = async (io) => {
  const votes = await Vote.find();
  const voteMap = {};
  votes.forEach(v => voteMap[v.option] = v.count);
  io.emit('votesUpdated', voteMap);
};

const socketHandler = (io) => {
  io.on('connection', async (socket) => {
    emitVotes(io);
    socket.on('castVote', async (option) => {
      if (!OPTIONS.includes(option)) return;
      const vote = await Vote.findOne({ option });
      if (vote) {
        vote.count += 1;
        await vote.save();
        emitVotes(io);
      }
    });
  });
};

module.exports = socketHandler;
