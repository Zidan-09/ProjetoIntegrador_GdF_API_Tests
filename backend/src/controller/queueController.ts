import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { PatientCaller } from "../services/queue/services/patientCaller";
import { ShowQueue } from "../services/queue/services/showQueue";
import { PriorityHandler } from "../services/queue/managers/priorityHandler";
import { InsertQueue } from "../services/queue/services/insertQueue";

export const QueueController = {
    async adcNodeConsult(req: Request, res: Response) {
        const data = {
            ...req.body,
            id: uuidv4()
        };

        const node = InsertQueue.newNode(data);
        InsertQueue.insertConsultQueue(node);

        res.status(201).json({
            status: "success",
            message: "Paciente adicionado na fila"
        });
    },

    async callConsult(req: Request, res: Response) {
        const called = PatientCaller.callNextConsult();

        if (typeof called == 'string') {
            res.status(200).json({
                message: called
            });
        } else {            
            res.status(201).json({
                status: "success",
                message: "Paciente chamado",
                call: called.patient_name
            });
        }
    },

    async queue(req: Request, res: Response) {
        const queue = ShowQueue.showQueue();
        console.log('Fila atual:', queue);
        res.status(200).json({
            queue: queue
        });
    }
};
