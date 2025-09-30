import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import compimg from "../Images/img1.jpg";
import incompimg from "../Images/img2.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisplayTask = () => {
  const [mydata, setMyData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState({});

  const loadData = async () => {
    let api = "http://localhost:8000/admin/displaytaskuser";
    try {
      const response = await axios.get(api);
      setMyData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error loading tasks");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deluser = async (id) => {
    let api = `http://localhost:8000/admin/deleteusertask/?id=${id}`;
    try {
      await axios.get(api);
      toast.success("Task successfully deleted");
      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const handleEditClick = (task) => {
    setEditTaskData({
      id: task._id,
      tasktitle: task.tasktitle,
      taskdetail: task.taskdetail,
      taskduration: task.taskduration,
      status: task.status || "Pending",
      priority: task.priority || "medium", // add priority
    });
    setShowModal(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/admin/edit-task/${editTaskData.id}`,
        {
          tasktitle: editTaskData.tasktitle,
          taskdetail: editTaskData.taskdetail,
          taskduration: editTaskData.taskduration,
          status: editTaskData.status,
          priority: editTaskData.priority, // send priority
        }
      );
      toast.success("Task updated successfully");
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };

  const ans = mydata.map((key) => (
    <tr key={key._id}>
   
<td style={{ color: key.status === "Complete" ? "green" : "red", fontWeight: "bold" }}>
  {key.status}
</td>


      <td>{key.userid.username}</td>
      <td>{key.userid.designation}</td>
      <td>{key.userid.email}</td>
      <td>{key.tasktitle}</td>
      <td>{key.taskdetail}</td>
      <td>{key.taskduration}</td>
      <td>{key.priority}</td> 
      <td>
        <Button variant="warning" onClick={() => handleEditClick(key)}>
          Edit
        </Button>{" "}
        <Button variant="danger" onClick={() => deluser(key._id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="p-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Username</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Task Title</th>
              <th>Task Detail</th>
              <th>Task Duration</th>
              <th>Priority</th> {/* header */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </Table>
      </div>

      {/* Edit Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                value={editTaskData.tasktitle || ""}
                onChange={(e) =>
                  setEditTaskData({
                    ...editTaskData,
                    tasktitle: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Detail</Form.Label>
              <Form.Control
                type="text"
                value={editTaskData.taskdetail || ""}
                onChange={(e) =>
                  setEditTaskData({
                    ...editTaskData,
                    taskdetail: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Duration</Form.Label>
              <Form.Control
                type="text"
                value={editTaskData.taskduration || ""}
                onChange={(e) =>
                  setEditTaskData({
                    ...editTaskData,
                    taskduration: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editTaskData.status || "Pending"}
                onChange={(e) =>
                  setEditTaskData({
                    ...editTaskData,
                    status: e.target.value,
                  })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={editTaskData.priority || "medium"}
                onChange={(e) =>
                  setEditTaskData({
                    ...editTaskData,
                    priority: e.target.value,
                  })
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default DisplayTask;
