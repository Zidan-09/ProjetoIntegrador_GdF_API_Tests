import express, { Application } from "express";
import cors from "cors";
import queueRouter from "./router/queue.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', queueRouter);

export default app;
