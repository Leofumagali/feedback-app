import { useState } from "react"
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import feedbackTypes from "../data/feedbackTypes.json";

export const Content = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email.includes("@")) tempErrors.email = "Valid email is required";
    if (!formData.feedbackType) tempErrors.feedbackType = "Feedback type is required";
    if (!formData.comment) tempErrors.comment = "Comment is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Feedback submitted successfully!");
      setFormData({ name: "", email: "", feedbackType: "", comment: "" });
      setErrors({});
    }
  };

  return (
    <Container className="flex align-center p-4 bg-light rounded mt-4" style={{ maxWidth: "600px", width: "100%" }}>
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
          <Label for="feedbackType">Feedback Type</Label>
          <Input
            type="select"
            name="feedbackType"
            id="feedbackType"
            value={formData.feedbackType}
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