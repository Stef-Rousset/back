const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({         //enregistrement des files ds dossier images
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {       // crée le nom du file
        const name = file.originalname.split(' ').join('_');
        const finalName = name.split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, finalName + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');
