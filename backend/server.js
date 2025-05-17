import app from './app.js';

const PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
  console.log(`Feedback App server running on port ${PORT}`);
});