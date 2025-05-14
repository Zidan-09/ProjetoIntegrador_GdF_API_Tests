export interface QueueTest {
    patient_name: string;
    triageCategory: 'Non-Urgent' | 'Standard' | 'Urgent' | 'VeryUrgent' | 'Immediate';
}