const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
       .then(() => res.status(201).json({ message: 'Sauce created !'}))
       .catch(error => res.status(400).json({ error }));
}

exports.modifySauce = (req, res, next) => {
  //retrouver la sauce pour recup le filename
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      const sauceObject = req.file ?
          {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
      //si fichier, on delete l'ancienne image puis on update
      if (req.file){
          fs.unlink(`images/${filename}`, () => {
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Sauce modified !'}))
              .catch(error => res.status(400).json({ error }));
          })
      // si pas de fichier, on update sans delete l'ancienne image
      }else {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modified !'}))
            .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce deleted!'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(400).json({ error }));
}

exports.likeSauce = (req, res, next) => {
  const likeObject = req.body.like;
  const userId = req.body.userId;
  const sauce = Sauce.findOne({ _id: req.params.id })
                .then(sauce => {
                      if (likeObject === 1){
                          Sauce.updateOne({ _id: req.params.id },
                                          { $push: { usersLiked: userId }, $inc: { likes: 1 } })
                                .then(() => res.status(200).json({ message: 'Like status incremented !'}))
                                .catch(error => res.status(400).json({ error }));

                      } else if (likeObject === -1){
                          Sauce.updateOne({ _id: req.params.id },
                                          { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } })
                                .then(() => res.status(200).json({ message: 'Dislike status incremented !'}))
                                .catch(error => res.status(400).json({ error }));
                      } else { //cas du zero
                               //enlever du like ou du dislike
                          if (sauce.usersLiked.includes(userId)){
                            Sauce.updateOne({ _id: req.params.id },
                                            { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                                .then(() => res.status(200).json({ message: 'Like status decremented !'}))
                                .catch(error => res.status(400).json({ error }));
                          } else if (sauce.usersDisliked.includes(userId)){
                            Sauce.updateOne({ _id: req.params.id },
                                            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                                .then(() => res.status(200).json({ message: 'Dislike status decremented !'}))
                                .catch(error => res.status(400).json({ error }));
                          }
                      }
                })
                .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
       .then(sauce => res.status(200).json(sauce))
       .catch(error => res.status(404).json({ error }));
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
       .then(sauces => res.status(200).json(sauces))
       .catch(error => res.status(404).json({ error }));
}


