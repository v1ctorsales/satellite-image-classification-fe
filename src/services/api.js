import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function buildForm(file) {
  const form = new FormData();
  form.append("file", file);
  return form;
}

const headers = { "Content-Type": "multipart/form-data" };

export async function classifyImage(file) {
  const { data } = await api.post("/predict", buildForm(file), { headers });
  return data;
}
