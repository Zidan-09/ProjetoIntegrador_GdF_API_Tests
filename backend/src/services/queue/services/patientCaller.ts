import { ConsultQueue } from "../../../models/queue";

export class PatientCaller {
    static callNextConsult() {
        const call = ConsultQueue.callNext();
        return call
    }
}