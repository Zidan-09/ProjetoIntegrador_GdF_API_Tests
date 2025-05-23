'use client'

import { useEffect, useState } from "react"
import { addPatient, callNextPatient, getQueue, QueueTest } from '@/services/queueServices'
import styles from './page.module.css'

type Patient = {
  patient_name: string
  triageCategory: QueueTest['triageCategory'] | number
  time: string
  id: string | number
}

type Notification = {
  id: number
  message: string
  type: 'success' | 'call' | 'error'
  patientName?: string // Novo campo para armazenar o nome do paciente
}

export default function Home() {
  const [queue, setQueue] = useState<Patient[]>([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState<QueueTest['triageCategory']>('Standard')
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, type: 'success' | 'call' | 'error', patientName?: string) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type, patientName }])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 2000)
  }

  async function handleAddPatient() {
    if (!name) {
      addNotification('Digite o nome do paciente.', 'error')
      return
    }

    setLoading(true)
    try {
      const result = await addPatient({
        patient_name: name,
        triageCategory: category,
      })
      addNotification('Paciente adicionado com sucesso!', 'success', name)
      setName('')
      await fetchQueue()
    } catch (err) {
      console.error('Erro ao adicionar paciente:', err)
      addNotification('Erro ao adicionar paciente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function fetchQueue() {
    try {
      const result = await getQueue()
      setQueue(Array.isArray(result.queue) ? result.queue : [])
    } catch (err) {
      console.error('Erro ao buscar fila:', err)
      addNotification('Erro ao carregar fila de pacientes.', 'error')
    }
  }

  async function handleCall() {
    setLoading(true)
    try {
      const result = await callNextPatient()
      if (result.call) {
        addNotification('Chamando paciente:', 'call', result.call)
      } else {
        addNotification(result.message, 'error')
      }
      await fetchQueue()
    } catch (err) {
      console.error('Erro ao chamar paciente:', err)
      addNotification('Erro ao chamar próximo paciente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
    const interval = setInterval(fetchQueue, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '');
  }

  const getCategoryStyle = (category: string | number) => {
    switch (category) {
      case 'Urgent':
      case 3:
        return styles.categoryUrgent
      case 'VeryUrgent':
      case 4:
        return styles.categoryVeryUrgent
      case 'Immediate':
      case 5:
        return styles.categoryImmediate
      case 'Standard':
      case 2:
        return styles.categoryStandard
      case 'Non-Urgent':
      case 1:
        return styles.categoryNonUrgent
      default:
        return ''
    }
  }

  const getTriageLabel = (category: string | number) => {
    const map: Record<string | number, string> = {
      'Non-Urgent': '🔵 Não Urgente',
      'Standard': '🟢 Pouco Urgente',
      'Urgent': '🟡 Urgente',
      'VeryUrgent': '🟠 Muito Urgente',
      'Immediate': '🔴 Emergência',
      1: '🔵 Não Urgente',
      2: '🟢 Pouco Urgente',
      3: '🟡 Urgente',
      4: '🟠 Muito Urgente',
      5: '🔴 Emergência'
    }
    return map[category] ?? '❓ Desconhecido'
  }

  return (
    <main className={styles.container}>
      <div className={styles.notificationsContainer}>
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`${styles.notification} ${
              notification.type === 'success' ? styles.notificationSuccess :
              notification.type === 'call' ? styles.notificationCall :
              styles.notificationError
            }`}
          >
            {notification.type === 'success' && '✅ '}
            {notification.type === 'call' && '📢 '}
            {notification.type === 'error' && '⚠ '}
            
            <div className={styles.notificationContent}>
              <div>{notification.message}</div>
              {notification.patientName && (
                <div className={styles.patientName}>{notification.patientName}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <h1 className={styles.header}>🏥 Fila de Atendimento</h1>

      <div className={styles.formRow}>
        <input
          className={styles.inputField}
          placeholder="Nome do Paciente"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddPatient()}
        />
        <select
          className={styles.selectField}
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

      <div className={styles.buttonGroup}>
        <button
          onClick={handleAddPatient}
          className={`${styles.button} ${styles.addButton}`}
          disabled={loading}
        >
          {loading ? '⏳ Processando...' : '➕ Adicionar Paciente'}
        </button>
        <button
          onClick={handleCall}
          className={`${styles.button} ${styles.callButton}`}
          disabled={loading || queue.length === 0}
        >
          {loading ? '⏳ Chamando...' : '📞 Chamar Próximo'}
        </button>
      </div>

      <h2 className={styles.queueTitle}>📋 Fila Atual:</h2>
      <ul className={styles.queueList}>
        {queue.length === 0 ? (
          <li className={styles.emptyQueue}>Nenhum paciente na fila.</li>
        ) : (
          queue.map((item, index) => (
            <li key={`${item.id}-${index}`} className={styles.queueItem}>
              <div className={styles.patientInfo}>
                <span className="font-medium">{index + 1}.</span>
                <span className={styles.patientSeparator}></span>
                <span>{item.patient_name}</span>
                <span className={styles.patientSeparator}>|</span>
                <span className={`${getCategoryStyle(item.triageCategory)} font-semibold`}>
                  {getTriageLabel(item.triageCategory)}
                </span>
                <span className={styles.patientSeparator}>|</span>
                <span className={styles.timeFormat}>🕒 {formatDateTime(item.time)}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </main>
  )
}
