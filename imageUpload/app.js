import express from "express";
import multer from "multer";
import path from "path";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT  || 8711;

app.set('view engine','ejs');
//parse in form data
app.use(express.urlencoded({extended:true}));
//body

//static file
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname,"uploads"))
    },
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)   
    }
})

//filter
const fileFilter = (req,file,cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetype  = allowedTypes.test(file.mimetype) 

    if(mimetype){
        cb(null,true)
    }else{
        cb(new Error("Only images (jpeg|jpg|png) allowed"),false);
    }
}

//const upload = multer()

const upload = multer({
    storage:storage,
    limits:{filesize:5*1024*1024},
    fileFilter:fileFilter
})

app.get('/',(req,res) => {
    res.render("index")
})

app.post('/upload', upload.single("image"),(req,res) => {
    console.log(req.body)
    if(!req.file){
        return res.status(400).send("No File uploaded")
    }
    
    const name = req.body.name


    const imagePath = "/uploads/${req.file.filename}"

    res.send(`success ${name}, ${imagePath}`)
})


app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})