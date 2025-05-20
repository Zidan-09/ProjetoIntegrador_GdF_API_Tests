import { ConsultQueue } from "../../../models/queue";
import { NodeConsult } from "../../../utils/createNode";
import { QueueTest } from "../../../models/queueTest";

export class InsertQueue {
    static newNode(data: QueueTest) {
        const node: NodeConsult = new NodeConsult(data)
        return node;
    }

    static insertConsultQueue(node: NodeConsult) {
        ConsultQueue.insertQueue(node);
    }
}