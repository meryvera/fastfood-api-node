const express = require('express');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { connect } = require('./connect');

const { port, secret } = config;
// console.log(port, secret);
const app = express();

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  // app.listen(port, () => {
  //   console.info(`App listening on port ${port}`);
  // });
});

// Conectar a la base de datos y luego iniciar el servidor
connect().then(() => {
  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
}).catch((error) => {
  console.error('Database connection failed', error);
  process.exit(1);
});