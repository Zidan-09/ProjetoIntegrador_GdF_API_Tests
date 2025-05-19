type QueueItem = {
    value: string;
    priority: number;
};
  
class NodeBench {
    public data: QueueItem;
    public next: NodeBench | null = null;
  
    constructor(data: QueueItem) {
      this.data = data;
    }
}
  
class PriorityQueue {
    private head: NodeBench | null = null;
  
    public enqueue(item: QueueItem): void {
      const newNode = new NodeBench(item);
  
      if (!this.head || item.priority > this.head.data.priority) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let current = this.head;
        while (
          current.next &&
          current.next.data.priority >= item.priority
        ) {
          current = current.next;
        }
  
        newNode.next = current.next;
        current.next = newNode;
        }
    }
  
    public dequeue(): QueueItem | null {
      if (!this.head) return null;
  
      const removedData = this.head.data;
      this.head = this.head.next;
      return removedData;
    }
  
    public printQueue(): void {
      let current = this.head;
      while (current) {
        console.log(
          `Valor: ${current.data.value}, Prioridade: ${current.data.priority}`
        );
        current = current.next;
      }
    }
}

const fila = new PriorityQueue();

fila.enqueue({ value: "Tarefa A", priority: 2 });
fila.enqueue({ value: "Tarefa B", priority: 5 });
fila.enqueue({ value: "Tarefa C", priority: 1 });

fila.printQueue();

console.log("Removido:", fila.dequeue());
fila.printQueue();