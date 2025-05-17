import fs from 'fs-extra';

export async function readJSON(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export async function writeJSON(path, data) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}