import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ الصح هنا
dotenv.config();

import { bootstrap } from './src/app.controller.js';

const app = express();
const port = process.env.port;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Bootstrapping your routes or setup
bootstrap(app, express);

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
