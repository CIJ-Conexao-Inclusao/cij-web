enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface IUser {
  id?: string;
  name: string;
  cpf: string;
  phone?: string;
  email: string;
  password?: string;
  gender: Gender;
}
