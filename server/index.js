import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const CONNECTION_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World')
})

mongoose.connect(CONNECTION_URL)
    .then(()=>{app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`))})
    .catch((error)=>{console.log(error.message)})