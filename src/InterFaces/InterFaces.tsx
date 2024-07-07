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
}
export interface GroupFormData {
  groupName: string;
  student: { value: string };
}
export interface GroupInterface {
  _id: string;
  name: string;
  students: [];
}
export interface SingleQuizInterface {
  _id: string;
  name: string;
  group: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  participants: number;
}
export interface SingleStudentInterface {
  _id: string;
  first_name: string;
  last_name: string;
  status: string;
  email: string;
}
