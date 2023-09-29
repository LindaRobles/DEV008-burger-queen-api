const { MongoClient } = require('mongodb');
const config = require('./config');
const { default: mongoose } = require('mongoose');

const client = new MongoClient(config.dbUrl);

// eslint-disable-next-line no-unused-vars
const { dbUrl } = config;

async function connect() {
  // TODO: Conexión a la Base de Datos
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('-Connected to database');
    return mongoose.connection;
  } catch (error) {
    console.error('-Cannot connect to database', error);
    throw error;
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log('-Disconnected from database');
  } catch (error) {
    console.error('-Error disconnecting from the database', error);
  }
}

module.exports = { connect };
