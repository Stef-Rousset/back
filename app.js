const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

require('dotenv').config();
const mongoPassword = process.env.MONGOPASSWORD
const mongoUsername = process.env.MONGOUSERNAME

//connexion à mongoDB
mongoose.connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@clusteroc.mmc8w.mongodb.net/piiquante?retryWrites=true&w=majority` ,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//middleware global pour transfo le corps json des requetes en objets JS
app.use(express.json());
//images
app.use('/images', express.static(path.join(__dirname, 'images')));
// routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
