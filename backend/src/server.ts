import app from "./app";
import cron from 'node-cron'
import { PriorityHandler } from "./services/queue/managers/priorityHandler";

let running: boolean = false;

cron.schedule('* * * * *', async () => {
    if (running) return;

    running = true;
    
    try {
        console.log('Atualizando a fila');
        const msg = PriorityHandler.verify();
        console.log('Resultado:', msg)
    } catch (error) {
        console.error(error)
    } finally {
        running = false;
    }
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log('Server rodando em: http://localhost:3333');
});