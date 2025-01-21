const express = require('express');
const multer = require('multer');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const UserImage = require('./models/userImageModel');

const app = express();
const port = 8080;

app.use(bodyParser.json());

//сохраняем статический путь к файлу фото
app.use('/uploads', express.static('uploads'));

connectDB();


const storage = multer.diskStorage({
    destination: (req, file, callbackFunc) => {
        callbackFunc(null, './uploads');
    },
    filename: (req, file, callBackFunc) => {
        callBackFunc(null, file.originalname);
    }
});

//const upload = multer({dest: 'uploads/'}).single("demo_image");
//const upload = multer({storage, limits: {fileSize: 1000000}}).single("demo_image"); //размер файла в байтах

const upload = multer({storage, limits: {fileSize: 1000000}});

app.get('/', (req, res) => {
    console.log('Hello world');
});


app.post('/image', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).send('Something went wrong');

        res.send(req.file);
    })
});

//если надо больше одного файла
// после demo_image указано количество файлов
app.post('/images', upload.array('demo_image', 4), (req, res) => {
    try {
        res.send(req.files);
    } catch (err) {
        console.log(err);
        res.send(400);
    }
});


app.post('/user', async (req, res) => {
    try {
        const doc = await UserImage.create(req.body);

        return res.status(200).json(doc);
    } catch (err) {
        console.log(err);
        res.send(400);
    }
});


app.put('/user/:id', upload.single('demo_image'), async (req, res) => {
    try {
        const doc = await ImageUser.findByIdAndUpdate(req.params.id, {
            photo: req.file.filename,
        });

        return res.status(200).json(doc);
    } catch (err) {
        console.log(err);
        res.send(400);
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});