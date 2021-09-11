const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://anacrlima:iron2021@cluster0.98vs9.mongodb.net/todosDatabase?retryWrites=true&w=majority';

const connect = async () => {
  const connection = await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(`DataBase connected: ${connection.connections[0].name}`);
};

module.exports = connect