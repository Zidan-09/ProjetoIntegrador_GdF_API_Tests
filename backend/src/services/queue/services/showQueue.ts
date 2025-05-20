import { ConsultQueue } from "../../../models/queue";

export class ShowQueue {
    static showQueue(): string[] | string {
        let queueList = [];
        
        let tempC = ConsultQueue.getFirst();

        if (!tempC) {
            return 'Fila vazia'
        }

        for (let i = 0; i < ConsultQueue.getQty(); i++) {
            if (tempC) {
            queueList.push(tempC.patient_name);
            tempC = tempC.pointer
            }
        }
        return queueList;
    }
}