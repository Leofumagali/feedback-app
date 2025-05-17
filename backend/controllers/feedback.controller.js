import * as FeedbackService from '../services/feedback.service.js';

export async function createFeedback(req, res) {
  try {
    const { name, email, type, comment } = req.body;

    if (!name || !email || !type || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const feedback = await FeedbackService.createFeedback({ name, email, type, comment });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllFeedbacks(req, res) {
  try {
    const feedbacks = await FeedbackService.getAllFeedbacks();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getFeedbackById(req, res) {
  try {
    const { id } = req.params;
    const feedback = await FeedbackService.getFeedbackById(id);

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateFeedbackStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updated = await FeedbackService.updateFeedbackStatus(id, status);
    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

export async function deleteFeedback(req, res) {
  try {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ error: 'A valid feedback ID is required' });
    }

    await FeedbackService.deleteFeedback(id);

    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(err.status || 500).json({error: err.message})
  }
}