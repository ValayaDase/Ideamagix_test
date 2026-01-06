import path from "path";
import multer from "multer";
import fs from "fs";

const diskStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null , "uploads/")
    },
    filename: (req,file,cb)=>{
        cb(null , Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: diskStorage});
export default upload;