import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Createuser = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    let api = "http://localhost:8000/admin/createuser";
    try {
      let response = await axios.post(api, input);
      console.log(response.data);
      alert("User created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating user");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Form
        className="p-4 bg-white shadow rounded"
        style={{ width: "400px", border: "1px solid #ddd" }}
      >
        <h4 className="text-center mb-4">Create User</h4>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={input.username || ""}
            onChange={handleInput}
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDesignation">
          <Form.Label>Designation</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="designation"
            value={input.designation || ""}
            onChange={handleInput}
          >
            <option value="">Select designation</option>
            <option value="Frontend">Front End Designer</option>
            <option value="Backend">Back End Designer</option>
            <option value="Analyst">Analyst</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={input.email || ""}
            onChange={handleInput}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={input.password || ""}
            onChange={handleInput}
            placeholder="Password"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          className="w-100"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Createuser;
