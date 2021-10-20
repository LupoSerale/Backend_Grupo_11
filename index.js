const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const dbConexion = require('./config/conexion');
const morgan = require('morgan');
var cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const port = 3001;

app.get('/', (req, res) => {
    res.json({ status: 200 });
})

app.use('/api/producto', routes.productoRoutes);
app.use('/api/venta', routes.ventaRoutes);

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});