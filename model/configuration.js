const mongoose = require('mongoose');
const key = require('./keys').mongoURL;

mongoose.connect(key, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('connection established...') )
    .catch( err => console.log(err));

