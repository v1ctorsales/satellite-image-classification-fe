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

export async function classifyImage(file, model = "blackbox") {
  const routes = {
    blackbox: "/sendImage",
    whitebox: "/sendImage/whitebox",
    compare: "/sendImage/compare",
  };
  const { data } = await api.post(routes[model], buildForm(file), { headers });
  return data;
}
