import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import { bootstrap } from './src/app.controller.js';
const app = express()
const port = process.env.port 
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))




