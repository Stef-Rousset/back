const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) //hashage du password
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash,
          });
          user.save() //enregistrement ds db
              .then(() => res.status(201).json({ message: 'User created'}))
              .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email : req.body.email }) //retrouver le user par son email
      .then(user => {
        if(!user){ //si user pas trouvé
          return res.status(401).json({ error: 'User not found'});
        }
        bcrypt.compare(req.body.password, user.password) //compare le password entré par l'user avec celui en db
              .then(valid => {
                if (!valid){  //password invalide
                  return res.status(401).json({ error: 'Incorrect password'});
                }
                res.status(200).json({  //password valide
                  userId: user._id,
                  token: jwt.sign(      // encodage du token
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' },
                    )
                  })
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
