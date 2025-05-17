import { useState } from "react"
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import feedbackTypes from "../data/feedbackTypes.json";
import { createFeedback } from "../services/api"

export const PublicFeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email.includes("@")) tempErrors.email = "Valid email is required";
    if (!formData.type) tempErrors.type = "Feedback type is required";
    if (!formData.comment) tempErrors.comment = "Comment is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await createFeedback(formData);
        alert("Feedback enviado com sucesso!");
        setFormData({ name: '', email: '', type: '', comment: '' });
      } catch (err) {
        console.log(err)
        setErrors({error: err})
      }
    }
  };

  return (
    <Container className="flex flex-grow-1 align-center p-4 bg-light rounded mt-4" style={{ maxWidth: "600px", width: "100%" }}>
      <h2 className="text-center">Give us your Feedback</h2>
      <p className="text-center">Let us know what you think about our service.</p>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            invalid={!!errors.name}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            invalid={!!errors.email}
          />
        </FormGroup>

        <FormGroup>
          <Label for="type">Feedback Type</Label>
          <Input
            type="select"
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            invalid={!!errors.feedbackType}
          >
            <option value="">Select feedback type</option>
            {feedbackTypes.map((type) => (
              <option key={type.id} value={type.value}>
                {type.label}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="comment">Comment</Label>
          <Input
            type="textarea"
            name="comment"
            id="comment"
            value={formData.comment}
            onChange={handleChange}
            invalid={!!errors.comment}
          />
        </FormGroup>

        <Button color="primary" type="submit" className="w-100">Submit</Button>
      </Form>
    </Container>
  );
};