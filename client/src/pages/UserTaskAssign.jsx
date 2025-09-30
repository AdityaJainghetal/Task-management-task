

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserTaskAssign = () => {
  const { id } = useParams();

  const [tasktitle, setTaskTitle] = useState("");
  const [taskdetail, setTaskDetail] = useState("");
  const [taskduration, settaskduration] = useState("");
  const [priority, setPriority] = useState("medium"); // default priority

  const navigate = useNavigate();

  // const taskAssignToUser = async () => {
  //   try {
  //     let api = "http://localhost:8000/admin/assigntask";
  //     const response = await axios.post(api, {
  //       id: id,
  //       tasktitle: tasktitle,
  //       taskdetail: taskdetail,
  //       taskduration: taskduration,
  //       priority: priority,
  //     });

  //     toast.success(response.data.msg, {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 3000,
  //     });

  //     navigate("../assigntask");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response?.data?.msg || "Error assigning task", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 3000,
  //     });
  //   }
  // };

const taskAssignToUser = async () => {
  try {
    let api = "http://localhost:8000/admin/assigntask";
    const response = await axios.post(api, {
      id: id,
      tasktitle: tasktitle,
      taskdetail: taskdetail,
      taskduration: taskduration,
      priority: priority,
    });

    toast.success(response.data.msg, {
      position: "top-right",
      autoClose: 3000,
    });

    navigate("../displaytask");
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.msg || "Error assigning task", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};


  return (
    <div className="task-assign-container" style={{ maxWidth: "600px",marginTop:"20px", margin: "auto", padding: "20px", background: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h3 className="mb-4" style={{ textAlign: "center", color: "#333" }}>Assign Task to User</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Enter Task Title</Form.Label>
          <Form.Control
            type="text"
            value={tasktitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={taskdetail}
            onChange={(e) => setTaskDetail(e.target.value)}
            placeholder="Enter task description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Expected Time Duration</Form.Label>
          <Form.Control
            type="time"
            value={taskduration}
            onChange={(e) => settaskduration(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Select Priority</Form.Label>
          <Form.Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" className="w-100" onClick={taskAssignToUser}>
          Assign Task
        </Button>
      </Form>
      <ToastContainer/>
    </div>
  );
};

export default UserTaskAssign;
