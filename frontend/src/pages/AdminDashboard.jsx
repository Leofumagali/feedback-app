import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'reactstrap';
import { getAllFeedbacks, deleteFeedback } from '../services/api';
import { FeedbackCard } from '../components/FeedbackCard';

export const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFeedbacks = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getAllFeedbacks(token);
      setFeedbacks(data);
    } catch {
      setError('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this feedback?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await deleteFeedback(id, token);
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    } catch {
      alert('Failed to delete feedback');
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">All Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <Alert color="info">No feedbacks found.</Alert>
      ) : (
        feedbacks.map((fb) => (
          <FeedbackCard 
            key={fb.id}
            id={fb.id}
            name={fb.name}
            email={fb.email}
            type={fb.type}
            status={fb.status}
            comment={fb.comment}
            handleDelete={handleDelete}
          />
        ))
      )}
      {error && 
        <div>{error}</div>
      }
    </Container>
  );
};