import express from "express"
import mongoose from "mongoose"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';
import fs from "fs"
import { router as userRoute } from "./routes/users.js"
import { router as authRoute } from "./routes/auth.js"
import { router as postRoute } from "./routes/posts.js"
import { router as conversationRoute } from "./routes/conversations.js"
import { router as messageRoutes } from "./routes/messages.js"
dotenv.config();


const app = express();
const port = process.env.PORT || 8800;
const connection_url = process.env.MONGO_URL;

mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })

// Otherwise you can't use "__dirname" or "__filename"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public/images")))


//Middleware
app.use(cors())
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin", crossOriginResourcePolicy: false, }));
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoutes)


// From Multer Docs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage });
app.post("/api/upload", upload.array("files", 10), (req, res) => {
    // "files" indicates the key in the formData 

    try {
        if (req.body.multiple === "true") {
            for (let i = 0; i < req.body.oldname.length; i++) {
                fs.rename(process.env.IMAGE_PATH + req.body.oldname[i], process.env.IMAGE_PATH + req.body.newname[i], function (err) {
                    if (err) console.log('ERROR: ' + err);
                });
            }
        }
        if (req.body.multiple === "false") {
            fs.rename(process.env.IMAGE_PATH + req.body.oldname, process.env.IMAGE_PATH + req.body.newname, function (err) {
                if (err) console.log('ERROR: ' + err);
            });
        }
        return res.status(200).json("Files uploaded succesfully")
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log("backend server is running! " + port)
})