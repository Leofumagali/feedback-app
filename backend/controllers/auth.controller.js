import { loginUser } from '../services/auth.service.js';

export async function login(req, res) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const token = await loginUser(username, password);
    res.json({ token });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

export function verifyToken(req, res) {
  try {
    const { userId, username } = req.user;

    res.json({
      userId,
      username
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify token' });
  }
}