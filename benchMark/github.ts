// PriorityQueue.ts

export class Node<T> {
    constructor(
      public value: T,
      public priority: number,
      public next: Node<T> | null = null
    ) {}
  }
  
  export class PriorityQueue<T> {
    private head: Node<T> | null = null;
  
    /**
     * Insere um novo elemento na fila com base na prioridade.
     * Elementos com menor valor numérico de prioridade são considerados de maior prioridade.
     * @param value - O valor a ser inserido.
     * @param priority - A prioridade associada ao valor.
     */
    enqueue(value: T, priority: number): void {
      const newNode = new Node(value, priority);
  
      if (!this.head || priority < this.head.priority) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let current = this.head;
        while (
          current.next &&
          current.next.priority <= priority
        ) {
          current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
      }
    }
  
    /**
     * Remove e retorna o elemento de maior prioridade da fila.
     * @returns O valor do elemento removido ou null se a fila estiver vazia.
     */
    dequeue(): T | null {
      if (!this.head) return null;
      const value = this.head.value;
      this.head = this.head.next;
      return value;
    }
  
    /**
     * Retorna o elemento de maior prioridade sem removê-lo da fila.
     * @returns O valor do elemento no topo da fila ou null se a fila estiver vazia.
     */
    peek(): T | null {
      return this.head ? this.head.value : null;
    }
  
    /**
     * Verifica se a fila está vazia.
     * @returns true se a fila estiver vazia, caso contrário, false.
     */
    isEmpty(): boolean {
      return this.head === null;
    }
  
    /**
     * Retorna o número de elementos na fila.
     * @returns O tamanho da fila.
     */
    size(): number {
      let count = 0;
      let current = this.head;
      while (current) {
        count++;
        current = current.next;
      }
      return count;
    }
  
    /**
     * Retorna uma representação em string da fila.
     * @returns Uma string representando os elementos da fila.
     */
    toString(): string {
      const elements: string[] = [];
      let current = this.head;
      while (current) {
        elements.push(`(${current.value}, p=${current.priority})`);
        current = current.next;
      }
      return elements.join(" -> ");
    }
}

const queue = new PriorityQueue<string>();

queue.enqueue("Tarefa 1", 2);
queue.enqueue("Tarefa 2", 1);
queue.enqueue("Tarefa 3", 3);

console.log(queue.toString()); // Saída: (Tarefa 2, p=1) -> (Tarefa 1, p=2) -> (Tarefa 3, p=3)

console.log(queue.dequeue()); // Saída: Tarefa 2
console.log(queue.peek());    // Saída: Tarefa 1

// FONTE: https://github.com/digi0ps/typescript-data-structures