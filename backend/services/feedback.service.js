import { v4 as uuidv4 } from 'uuid';
import * as fileHandler from '../utils/fileHandler.js';
import Feedback from '../models/feedback.model.js';

const FEEDBACK_FILE = './data/feedbacks.json';

export async function createFeedback(data) {
  const newFeedback = new Feedback({ 
    ...data, 
    id: uuidv4(), 
    date: new Date().toISOString(),
    status: "new"
  });

  const feedbacks = await fileHandler.readJSON(FEEDBACK_FILE);

  feedbacks.push(newFeedback);

  await fileHandler.writeJSON(FEEDBACK_FILE, feedbacks);

  return newFeedback;
}

export async function getAllFeedbacks() {
  return await fileHandler.readJSON(FEEDBACK_FILE);
}

export async function getFeedbackById(id) {
  const feedbacks = await fileHandler.readJSON(FEEDBACK_FILE);
  return feedbacks.find(fb => fb.id === id);
}


export async function updateFeedbackStatus(id, newStatus) {
  const feedbacks = await fileHandler.readJSON(FEEDBACK_FILE);
  const index = feedbacks.findIndex(fb => fb.id === id);

  if (index === -1) {
    const err = new Error('Feedback not found');
    err.status = 404;
    throw err;
  }

  const updatedFeedback = new Feedback({
    ...feedbacks[index],
    status: newStatus
  });

  feedbacks[index] = updatedFeedback;

  await fileHandler.writeJSON(FEEDBACK_FILE, feedbacks);

  return feedbacks[index];
}

export async function deleteFeedback(id) {
  const feedbacks = await fileHandler.readJSON(FEEDBACK_FILE);
  const index = feedbacks.findIndex(fb => fb.id === id);

  if (index === -1) {
    const err = new Error('Feedback not found');
    err.status = 404;
    throw err;
  }

  feedbacks.splice(index, 1);
  await fileHandler.writeJSON(FEEDBACK_FILE, feedbacks);
}