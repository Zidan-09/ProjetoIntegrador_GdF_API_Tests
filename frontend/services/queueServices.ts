export interface QueueTest {
  patient_name: string;
  triageCategory: 'Non-Urgent' | 'Standard' | 'Urgent' | 'VeryUrgent' | 'Immediate';
}

const API_URL = 'http://localhost:3333/api';

export async function addPatient(patient: QueueTest) {
  console.log('Enviando paciente para API:', patient)

  const res = await fetch(`${API_URL}/adc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient)
  })

  const data = await res.json()
  console.log('Resposta da API:', data)
  return data
}

export async function callNextPatient() {
  const res = await fetch(`${API_URL}/call/consult`);
  return res.json();
}

export async function getQueue() {
  const res = await fetch(`${API_URL}`);
  return res.json();
}
