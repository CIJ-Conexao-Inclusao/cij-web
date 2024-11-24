import api from "../api";

export interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const baseUrl = "https://viacep.com.br/ws";

class ViaCepService {
  async GetAddress(cep: string): Promise<IAddress> {
    try {
      const res = await api.get(`${baseUrl}/${cep}/json`);

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new ViaCepService();
