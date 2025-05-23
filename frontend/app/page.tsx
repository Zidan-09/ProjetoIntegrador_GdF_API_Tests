'use client'

import { useEffect, useState } from "react"
import { addPatient, callNextPatient, getQueue, QueueTest } from '@/services/queueServices'

type Patient = {
  patient_name: string
  triageCategory: QueueTest['triageCategory']
  time: string
  id: string | number
}

export default function Home() {
  const [queue, setQueue] = useState<Patient[]>([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState<QueueTest['triageCategory']>('Standard')
  const [loading, setLoading] = useState(false)

  async function handleAddPatient() {
    console.log('Tentando adicionar paciente:', name, category)

    if (!name) {
      alert('Digite o nome do paciente.')
      return
    }

    setLoading(true)

    try {
      const result = await addPatient({
        patient_name: name,
        triageCategory: category,
      })

      console.log('Resultado da API:', result)

      alert(result.message)
      setName('')
      await fetchQueue()
    } catch (err) {
      console.error('Erro ao adicionar paciente:', err)
      alert('Erro ao adicionar paciente.')
    } finally {
      setLoading(false)
    }
  }

  async function fetchQueue() {
    const result = await getQueue()
    if (Array.isArray(result.queue)) {
      setQueue(result.queue)
    } else {
      setQueue([])
    }
  }

  async function handleCall() {
    setLoading(true)
    const result = await callNextPatient()
    alert(result.call || result.message)
    await fetchQueue()
    setLoading(false)
  }

  useEffect(() => {
    fetchQueue()
    const interval = setInterval(fetchQueue, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🏥 Fila de Atendimento</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Nome do Paciente"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value as QueueTest['triageCategory'])}
        >
          <option value="Non-Urgent">🔵 Não Urgente</option>
          <option value="Standard">🟢 Pouco Urgente</option>
          <option value="Urgent">🟡 Urgente</option>
          <option value="VeryUrgent">🟠 Muito Urgente</option>
          <option value="Immediate">🔴 Emergência</option>
        </select>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          ➕ Adicionar Paciente
        </button>
        <button
          onClick={handleCall}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          📞 Chamar Próximo
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">📋 Fila Atual:</h2>
      <ul className="border rounded p-4 bg-gray-50 shadow">
        {queue.length === 0 ? (
          <li className="text-gray-500 italic">Nenhum paciente na fila.</li>
        ) : (
          queue.map((item,index) => (
            <li key={`${item.patient_name}-${index}`} className="py-1">
              {index + 1}.🧑 {item.patient_name} - 🏷️ {item.triageCategory} - 🕒 {item.time}
            </li>
          ))
        )}
      </ul>
    </main>
  )
}
