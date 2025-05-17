const API_URL = 'http://localhost:3040/api/v1'; 

export async function loginUser(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  return { token: data.token };
}

export async function verifyToken(token) {
  try {
    const res = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('Token inválido ou expirado');
    }

    return await res.json();
  } catch (err) {
    console.error('Erro ao verificar token:', err.message);
    throw err;
  }
}

export async function createFeedback(data) {
  const res = await fetch(`${API_URL}/feedbacks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok || !res) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to submit feedback');
  }

  return await res.json();
}

export async function getAllFeedbacks(token) {
  const res = await fetch(`${API_URL}/feedbacks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch feedbacks');
  }

  return await res.json();
}

export async function updateFeedbackStatus(id, status, token) {
  const res = await fetch(`${API_URL}/feedbacks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update status');
  }

  return await res.json();
}

export async function deleteFeedback(id, token) {
  const res = await fetch(`${API_URL}/feedbacks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to delete');
  }
}