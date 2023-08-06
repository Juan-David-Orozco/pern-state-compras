const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { PORT } = require('./config')

//Enrutadores
const rutasUsers = require('./routes/users')
const rutasProducts = require('./routes/products')

const app = express();

// settings
app.set('port', PORT)
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use('/api/products', rutasProducts);
app.use('/api/users', rutasUsers);

// ruta inicial
app.get('/', (req, res) => {
  res.send("Bienvenido al Servidor")
})

// conexión servidor
app.listen(app.get('port'), function(){
  console.log("Servidor iniciado port "+app.get('port'));
})