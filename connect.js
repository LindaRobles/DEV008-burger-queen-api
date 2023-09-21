const { MongoClient } = require('mongodb');
const config = require('./config');

const client = new MongoClient(config.dbUrl);

// eslint-disable-next-line no-unused-vars
//const { dbUrl } = config;

async function connect() {
  // TODO: Conexión a la Base de Datos
  try {
    await client.connect();
    const db = client.db('burgerQueenApi'); 
    return db;
  } catch (error) {
    // Manejar errores de conexión aquí
    console.error('Error de conexión a la base de datos:', error);
    throw error;
  }
}

module.exports = { connect };
