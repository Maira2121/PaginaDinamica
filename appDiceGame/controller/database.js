const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dice-db-app', {
    
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));