import express, { Application } from "express";
import cors from "cors";
import queueRouter from "./router/queue.routes";

const app: Application = express();

app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST'],
    credentials:true
}));
app.use(express.json());
app.use('/api', queueRouter);

export default app;
