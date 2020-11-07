const mongoose = require('mongoose');
const config = require('config');


mongoose.set('useUnifiedTopology', true);

const connectToDatabase = async () => {
  const { host, port, username, password, db } = config.get('mongodb');
  const path = `mongodb://${username}:${password}@${host}:${port}/${db}`;
  
  await mongoose.connect(path, { useNewUrlParser: true });
};

module.exports = { connectToDatabase };