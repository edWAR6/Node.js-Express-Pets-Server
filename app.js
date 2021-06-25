const express = require('express');
const path = require('path');
const mongodb = require('./database/mongodbUtil');
const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongodb.connect(err => {
  if (err) console.error(err);
});

const home = require('./routes/home.js');
const pets = require('./routes/pets.js');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/home.html'));
});

app.use('/home', home);
app.use('/pets', pets);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}!`)
});
