export interface Patient {
  name: string;
  cpf: string;
  cep: string;
  gender: string;
  address: string;
  date_of_birth: string;
  phone_number: string;
}

export interface MedicalExam {
  id: string;
  patient_cpf: string;
  exam: string;
  doctor_name: string;
  scheduled_at: string;
  patient: Omit<Patient, 'cpf'>;
}

export interface InfoDialogProps {
  type: 'success' | 'error';
  operation: 'create' | 'edit' | 'delete';
}
