import { ConsultQueue } from "../../../models/queue";
import { NodeConsult } from "../../../utils/createNode";

export class SearchQueue {
    static search(patient_name: string): string | NodeConsult {
        let temp: null | NodeConsult = ConsultQueue.getFirst();

        if (temp) {
            while(temp) {
                if (temp.patient_name === patient_name) {
                    return temp
                } else {
                    temp = temp.pointer
                }
            }
            return 'Paciente não encontrado na fila'
        } else {
            return 'Fila vazia'
        }
    }
}