import { NodeConsult } from "../utils/createNode";

abstract class Queue<T extends { pointer: T | null }> {
    protected firstPointer: T | null;
    protected lastPointer:  T | null;
    protected qtyPatients: number;

    constructor() {
        this.firstPointer = null;
        this.lastPointer = null;
        this.qtyPatients = 0;
    }

    public callNext(): T | 'Fila vazia' {
        const call = this.firstPointer;

        if (call) {
            const next = call.pointer
            this.firstPointer = next;
            this.qtyPatients--;
            return call
        } else {
            return 'Fila vazia'
        }
    }

    public getFirst(): T | null {
        return this.firstPointer;
    }

    public setFirst(newFirst: T): void {
        this.firstPointer = newFirst
    }

    public getQty(): number {
        return this.qtyPatients;
    }
};

class ConsultQueueClass extends Queue<NodeConsult> {
    constructor() {
        super();
    }

    public insertConsultQueue(no: NodeConsult) {
        if (ConsultQueue.qtyPatients == 0) {
            ConsultQueue.firstPointer = no;
            ConsultQueue.lastPointer = no;
        } else {
            let temp: NodeConsult = ConsultQueue.firstPointer as NodeConsult;
            for (let i = 0; i < ConsultQueue.qtyPatients; i++) {
                if (temp.triageCategory! < no.triageCategory!) {
                    if (!temp.maxPriority) {
                        no.pointer = temp;
                        ConsultQueue.firstPointer = no;
                    }
                } else if (temp.triageCategory! >= no.triageCategory!) {
                    if (temp.pointer == null) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else if (temp.pointer!.triageCategory! < no.triageCategory!) {
                        no.pointer = temp.pointer;
                        temp.pointer = no;
                        break;
                    } else {
                        temp = temp?.pointer;
                    }
                }
            }
        }
        ConsultQueue.qtyPatients++;
    };
};

export const ConsultQueue: ConsultQueueClass = new ConsultQueueClass()