const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

require('dotenv').config();
const dbPassword = process.env.DBPASSWORD
const dbUsername = process.env.DBUSERNAME
const myDatabase = process.env.MYDATABASE

//connexion à mongoDB
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@clusteroc.mmc8w.mongodb.net/${myDatabase}?retryWrites=true&w=majority` ,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // autorise l'accès à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // autorise les headers indiqués
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise les verbes indiqués
  next();
});
// protection againt force attack
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// protect http headers
app.use(helmet());
//middleware global pour parser le corps json des requetes en objets JS
app.use(express.json());
//images
app.use('/images', express.static(path.join(__dirname, 'images')));
// routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
