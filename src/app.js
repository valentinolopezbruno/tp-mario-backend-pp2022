import express from "express";
import morgan from "morgan";
import alumnosRoutes from './routes/alumnos.routes.js'
import cors from 'cors'

const app = express({origin:'http://localhost:3000', methods:['GET','PATCH','POST','DELETE'],});

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use('/', alumnosRoutes)
app.use(cors());

export default app;
