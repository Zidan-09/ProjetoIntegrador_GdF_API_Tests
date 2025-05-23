import { ConsultQueue } from "../../../models/queue";

export class ShowQueue {
    static showQueue() {
        let queueList = [];
        let temp = ConsultQueue.getFirst();
        
        while (temp) {
            queueList.push({
                patient_name: temp.patient_name,
                triageCategory: temp.triageCategory,
                time: temp.time
            });
            temp = temp.pointer;
        }
        return queueList;
    }
}