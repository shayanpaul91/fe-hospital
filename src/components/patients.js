import { apiFetch } from '../api/client';

export async function listPatients() {
  // GET /api/patients, PROVIDER only. :contentReference[oaicite:5]{index=5}
  const res = await apiFetch('/api/patients', { method: 'GET' });
  return res.data;
}

export async function getPatient(userId) {
  const res = await apiFetch(`/api/patients/${userId}`, { method: 'GET' });
  return res.data;
}
