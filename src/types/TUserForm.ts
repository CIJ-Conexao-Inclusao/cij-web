import { ADQUIREDDISABILITY, GENDER } from "../constants";

export type TUserForm = {
  name: string;
  cpf: string;
  birthDate: string;
  gender: GENDER;
  phone?: string;
  email: string;
  password: string;
};

export type TUserDisability = {
  id: number;
  disabilityType: string;
  disability: string;
  disablityDegree: string;
  adquiredDisability: ADQUIREDDISABILITY;
};

export type TUserAddress = {
  zip_code: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
};

export type TUserFull = {
  name: string;
  cpf: string;
  birthDate: string;
  gender: GENDER;
  phone?: string;
  user: {
    email: string;
    password: string;
  };
  disabilities: {
    id: number;
    acquired: boolean;
  }[];
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
};

export type TUserById = {
  address: {
    city: string;
    complement: string;
    id: number;
    neighborhood: string;
    number: string;
    state: string;
    street: string;
    country: string;
    zip_code: string;
  };
  cpf: string;
  curriculum: string;
  disabilities: {
    acquired: boolean;
    category: string;
    description: string;
    id: number;
    rate: number;
  }[];
  gender: GENDER;
  id: number;
  name: string;
  phone?: string;
  user: {
    config: JSON;
    email: string;
    id: number;
  };
};
