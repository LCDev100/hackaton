const mongoose = require('mongoose');

function connectToDatabase() {
    const user = 'hackaton';
    const pass = 'JgOKf6siDyFHQpzx';

    const mongoString = `mongodb+srv://${user}:${pass}@hackaton1.ra0x96i.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(mongoString);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log(error)
    })

    database.once('connected', () => {
        console.log('Database Connected');
    })
}

module.exports = connectToDatabase;
