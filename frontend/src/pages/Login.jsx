import { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert, InputGroup, InputGroupText } from 'reactstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/api';

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  console.log(error)
  useEffect(() => {
    if (user) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.username.trim() || !form.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const { token } = await loginUser(form.username, form.password);
      await login(token);
    } catch (err) {
      console.log(err)
      setError('Invalid username or password');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="p-4 shadow-sm bg-white rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Admin Login</h2>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username" className="fw-semibold">Username</Label>
            <InputGroup className={error.length > 0 ? 'border border-danger rounded' : ''}>
              <InputGroupText>
                <FaUser />
              </InputGroupText>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="rounded-end"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label for="password" className="fw-semibold">Password</Label>
            <InputGroup className={error.length > 0 ? 'border border-danger rounded' : ''}>
              <InputGroupText>
                <FaLock />
              </InputGroupText>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <InputGroupText
                role="button"
                onClick={togglePassword}
                style={{ cursor: 'pointer' }}
                className="bg-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroupText>
            </InputGroup>
          </FormGroup>

          {error && (
            <Alert color="danger" className="mt-3 mb-0 rounded-3 text-center">
              {error}
            </Alert>
          )}

          <Button color="primary" block className="mt-4 rounded-3 fw-semibold">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};