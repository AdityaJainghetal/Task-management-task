import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyTask = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = async () => {
    try {
      let api = `http://localhost:8000/user/usertaskdisplay?id=${localStorage.getItem(
        "uid"
      )}`;

      const response = await axios.get(api);

      
      const sortedData = response.data.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      setMydata(sortedData);
    } catch (error) {
      console.log(error);
      toast.error("Error loading tasks");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const taskStatusChange = async (id) => {
    try {
      let api = "http://localhost:8000/user/taskstatuschange";
      const response = await axios.post(api, { id: id });
      toast.success(response.data.msg || "Status updated");
      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  let sno = 0;
  const ans = mydata.map((key) => {
    sno++;
    return (
      <tr key={key._id}>
        <td>{sno}</td>
        <td>{key.tasktitle}</td>
        <td>{key.taskdetail}</td>
        <td>{key.taskduration}</td>
        <td>
          <span
            style={{
              color:
                key.priority === "high"
                  ? "red"
                  : key.priority === "medium"
                  ? "orange"
                  : "green",
              fontWeight: "bold",
            }}
          >
            {key.priority}
          </span>
        </td>
        <td>
          <Button variant="primary" onClick={() => taskStatusChange(key._id)}>
            {key.status}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="p-3">
      <h2 style={{ marginBottom: "20px" }}>My Tasks</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Task Title</th>
            <th>Task Detail</th>
            <th>Task Duration</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>
    </div>
  );
};

export default MyTask;
