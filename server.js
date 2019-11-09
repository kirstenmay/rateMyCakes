const express = require("express");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/name_of_your_DB', { useNewUrlParser: true });
const app = express();
app.use(express.static(__dirname + '/public/dist/public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const routes = require('./config/routes')(app);

app.listen(5000, () => console.log("listening on port 5000"));