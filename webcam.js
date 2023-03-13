const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'facedetect/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
})

const upload = multer({ storage: storage })

app.post('/facedetect', upload.single('image'), (req, res) => {
    try{
        const imageData = JSON.parse(req.body.data);
        const imageBuffer = Buffer.from(imageData, 'base64');
        const filePath = path = path.join(__dirname, 'facedetect', req.file.filename);
        fs.writeFileSync(filePath, imageBuffer);
        res.json({ success: true, message: 'Image uploaded successfully'});
    }
    catch(error){
        console.error(error);
        res,json({ success: false, message: 'Error uploading image'});
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });