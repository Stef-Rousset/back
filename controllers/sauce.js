const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
       .then(() => res.status(201).json({ message: 'Sauce crée !'}))
       .catch(error => res.status(400).json({ error }));
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSOn.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modified !'}))
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
  const likeObject = JSON.parse(req.body.like);
  const userId = JSON.parse(req.body.userId);
  const sauce = Sauce.findOne({ _id: req.params.id })
                      .then(sauce => res.status(200).json(sauce))
                      .catch(error => res.status(404).json({ error }));
  if (likeObject.like === 1 && !sauce.usersLiked.includes(userId)) {
      sauce.usersLiked.push(userId);
      sauce.likes += 1;
      if (sauce.usersDisliked.includes(userId)){
        //enlever du dislike
      }

  } else if (likeObject.like === -1 && !sauce.usersDisliked.includes(userId)){
      sauce.usersDisliked.push(userId);
      sauce.dislikes += 1;
      if (sauce.usersLiked.includes(userId)){
        //enlever du like
      }

  } else {
      if (sauce.usersLiked.includes(userId)){
           const index =  sauce.usersLiked.findIndex(id => id === userId);

      }
  }

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


