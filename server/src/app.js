const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { URI } = require('./keys');

const port = 3001;
app.use(express.json())  //* middleware- analiza solicitudes entrantes con cargas JSON y se basa en body-parser

//& ************ MODELS ************  
require('./models/user.models')
require('./models/post')
//& ********************************
//~ ********** routes **************
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
//~ ********************************
//* ================ DATA BASE MONGODB ATLAS =====================
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', ()=> {
    console.log("conectado a la base de Datos!");
})
mongoose.connection.on('error', ()=> {
    console.log("error conectando a la base de Datos!:", err);
})
// ***************************************************************

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
