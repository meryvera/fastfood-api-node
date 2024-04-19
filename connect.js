const { MongoClient } = require('mongodb');
const config = require('./config');
// eslint-disable-next-line no-unused-vars
const { dbUrl, dbName } = config;
let dbInstance = null;

async function connectToMongoDb() {
  if (dbInstance) return dbInstance; // Si ya existe una instancia de la base de datos, la reutiliza

  // TODO: Database Connection
  const client = new MongoClient(dbUrl);

  try {
    await client.connect(); // Establece una nueva conexión
    const db = client.db(dbName);
    dbInstance = db; // Guarda la instancia de la base de datos para reutilizarla
    
    console.log("Connected to MongoDB =D");
    return dbInstance;
  } catch (error) {
    console.error("Could not connect to MongoDB =(", error);
    process.exit(1);
    // En un entorno de producción puedes querer manejar esto de otra manera
  }
}

module.exports = { connectToMongoDb };
