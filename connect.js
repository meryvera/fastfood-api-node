const { MongoClient } = require('mongodb');
const config = require('./config');
// eslint-disable-next-line no-unused-vars
const { dbUrl } = config;
let dbInstance = null;

async function connect() {
  // TODO: Database Connection
  if (dbInstance) {
    return dbInstance; // Si ya existe una instancia de la base de datos, la reutiliza
  }

  const client = new MongoClient(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect(); // Establece una nueva conexión
    const db = client.db(config.dbName);
    // Usa una variable de entorno para el nombre de la DB o reemplázalo directamente con una cadena
    dbInstance = db;
    // Guarda la instancia de la base de datos para reutilizarla
    console.log("Connected to MongoDB =D");
    return db;
  } catch (error) {
    console.error("Could not connect to MongoDB =(", error);
    process.exit(1);
    // En un entorno de producción puedes querer manejar esto de otra manera
  }
}

function getDb() {
  if (!dbInstance) {
    throw new Error('Must connect to Database first!');
  }
  return dbInstance;
}

module.exports = { connect, getDb };
