import fs from 'fs-extra';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const USERS_FILE = './data/users.json';
const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUser(username, password) {
  const users = await fs.readJSON(USERS_FILE);
  const user = users.find(u => u.username === username);

  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  
  if (!passwordMatch) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
}