const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const dbConexion = require('./config/conexion');
var cors = require('cors')

app.use(express.json());
app.use(cors());

const port = 3001;

app.get('/', (req, res) => {
    res.json({ status: 200 });
})

app.use('/api/producto', routes.productoRoutes);
app.use('/usuarios', routes.usersRouter);


app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});