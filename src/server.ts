import app from "./app";
import cron from 'node-cron'
import { PriorityHandler } from "./services/queue/managers/priorityHandler";

cron.schedule('* * * * *', () => {
    console.log('Atualizando a fila');
    const msg = PriorityHandler.verify();
    console.log('Resultado:', msg)
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log('Server rodando em: http://localhost:3333');
});