import api from "./axios";

function authConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getMyBookings(token) {
  const response = await api.get("/bookings/my", authConfig(token));
  return response.data;
}

export async function getAllBookings(token) {
  const response = await api.get("/bookings", authConfig(token));
  return response.data;
}

export async function getBookingById(id, token) {
  const response = await api.get(`/bookings/${id}`, authConfig(token));
  return response.data;
}

export async function createBooking(payload, token) {
  const response = await api.post("/bookings", payload, authConfig(token));
  return response.data;
}

export async function updateBookingStatus(id, payload, token) {
  const response = await api.patch(
    `/bookings/${id}/status`,
    payload,
    authConfig(token),
  );
  return response.data;
}

export async function addBookingComment(id, payload, token) {
  const response = await api.post(
    `/bookings/${id}/comments`,
    payload,
    authConfig(token),
  );
  return response.data;
}

export async function getBookingHistory(id, token) {
  const response = await api.get(`/bookings/${id}/history`, authConfig(token));
  return response.data;
}

export async function getResources(token) {
  const response = await api.get("/resources", authConfig(token));
  return response.data;
}

export async function getPriorities(token) {
  const response = await api.get("/priorities", authConfig(token));
  return response.data;
}

export async function getStatuses(token) {
  const response = await api.get("/booking-statuses", authConfig(token));
  return response.data;
}
