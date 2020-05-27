const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use( bodyParser.json() );

const db = require('./app/models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {
        console.log('Sucesso ao conectar!');
    })
    .catch(err => {
        console.log('Impossível conectar: ' + err);
        process.exit();
    })

app.get("/", (req, res) => {
    res.json({ message: 'Bem vindo ao EasyEvent' });
});

require('./app/routes/event.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}.`);
});