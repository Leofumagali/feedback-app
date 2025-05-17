export const ALLOWED_STATUSES = ['new', 'in_review', 'responded', 'closed'];
export const ALLOWED_TYPES = ['bug report', 'feature request', 'other'];

export default class Feedback {
  constructor({ id, name, email, type, comment, date, status }) {
    if (!name || !email || !type || !comment) {
      throw new Error('Missing required fields');
    }

    if (!ALLOWED_TYPES.includes(type.toLowerCase())) {
      throw new Error(`Invalid feedback type: "${type}"`);
    }

    const statusToUse = status || 'new';

    if (!ALLOWED_STATUSES.includes(statusToUse)) {
      throw new Error(`Invalid feedback status: "${statusToUse}"`);
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.type = type.toLowerCase();
    this.comment = comment;
    this.date = date;
    this.status = statusToUse;
  }
}