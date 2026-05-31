import api from "./axios";

export async function loginRequest(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

export async function getMeRequest(token) {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
