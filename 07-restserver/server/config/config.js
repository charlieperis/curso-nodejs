const express = require('express')
const app = express();

//PUERTO
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`)
})