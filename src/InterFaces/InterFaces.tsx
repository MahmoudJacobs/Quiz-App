export interface LoginFormTypes {
  email: string;
  password: string;
}
export interface RegisterFormTypes {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}
export interface StudentsInterface {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: boolean;
  role: string;
  // students: [];
}
export interface GroupFormData {
  groupName: string;
  student: { value: string };
}
export interface StudentFormData {
  first_name: string;
  phone: number;
}
export interface GroupInterface {
  _id: string;
  name: string;
  students: [];
}
export interface QuizzCreateInterface {
  title: string;
  description: string;
  group: { value: string };
  questions_number: number;
  difficulty: string;
  type: string;
  schadule: string;
  duration: string;
  score_per_question: string;
}