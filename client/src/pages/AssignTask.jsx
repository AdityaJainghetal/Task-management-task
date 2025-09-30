import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);
  const navigate = useNavigate();
  const loadData = async () => {
    let api = "http://localhost:8000/admin/userdatashow";

    const response = await axios.get(api);
    setMydata(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const taskAssign = (id) => {
    navigate(`../usertaskassign/${id}`);
  };

  let sno = 0;
  const ans = mydata.map((key) => {
    sno++;
    return (
      <>
        <tr>
          <td>{sno}</td>
          <td>{key.username}</td>
          <td>{key.designation}</td>
          <td>{key.email}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => {
                taskAssign(key._id);
              }}
            >
              Assign task
            </Button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
    <div className="p-3">

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>desgination</th>
            <th>email</th>
            <th>action</th>

          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>
      
    </div>
    </>
  );
};

export default AssignTask;
