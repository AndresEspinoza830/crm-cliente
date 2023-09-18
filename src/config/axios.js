import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://crm-api-andresespinoza830.onrender.com",
});

export default clienteAxios;
