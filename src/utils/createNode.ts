import { criteria } from "../models/criteria";
import { QueueTest } from "../models/queueTest";

class NodeConsult {
    patient_name: string;
    triageCategory: number;
    time: Date;
    limitDate: {
        limitHours: number;
        limitMinuts: number;
    };
    maxPriority: boolean;
    pointer: null | NodeConsult;

    constructor(patientTriage: QueueTest) {
        this.patient_name = patientTriage.patient_name;
        this.pointer = null;
        this.time = new Date();
        this.maxPriority = false;

        if (!patientTriage.triageCategory) {
            throw new Error('Categoria de triagem ausente')
        };

        switch (patientTriage.triageCategory!) {
            case 'Non-Urgent': 
                this.triageCategory = 1;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + (criteria.nonUrgent / 60)),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.nonUrgent % 60)
                };
                break;
            case 'Standard':
                this.triageCategory = 2;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.standard / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.standard % 60)
                };
                break;
            case 'Urgent':
                this.triageCategory = 3;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.urgent / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.urgent % 60)
                };
                break;
            case 'VeryUrgent':
                this.triageCategory = 4;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.veryUrgent / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.veryUrgent % 60)
                };
                break;
            case 'Immediate':
                this.triageCategory = 5;
                this.limitDate = {
                    limitHours: Math.round(this.time.getUTCHours() + criteria.immediate / 60),
                    limitMinuts: this.time.getUTCMinutes() + (criteria.immediate % 60)
                };
                this.maxPriority = true;
                break;
        }
    }
};

export { NodeConsult }