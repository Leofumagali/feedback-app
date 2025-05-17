import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Login } from '../pages/Login';
import { AdminDashboard } from '../pages/AdminDashboard';
import {PublicFeedbackForm} from '../components/PublicFeedbackForm'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicFeedbackForm />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};
