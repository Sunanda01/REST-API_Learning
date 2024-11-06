const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Uploads/')
    },
    filename: function (req, file, cb) {
      const uniquePath = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniquePath+path.extname(file.originalname).toLowerCase());
    }
  })
  
  const upload = multer({ 
    storage: storage, 
    limits:{fileSize: 1024*1024*5}
    // fileFilter: function (req, file, cb) {
    //     const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
    //     const mimeType = fileTypes.test(file.mimetype);
    //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        
    //     if (mimeType && extname) {
    //         return cb(null, true);
    //     }
    //     cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
    // }
});

module.exports=upload;