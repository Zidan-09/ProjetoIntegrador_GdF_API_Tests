import { Router } from "express";
import { QueueController } from "../controller/queueController";

const queueRouter: Router = Router();

queueRouter.post('/adc', QueueController.adcNodeConsult);
queueRouter.get('/call/consult', QueueController.callConsult);
queueRouter.get('/', QueueController.queue);

export default queueRouter;