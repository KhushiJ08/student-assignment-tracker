import React, { useEffect, useState } from "react";
import API from "../services/api";
import AssignmentForm from "../components/AssignmentForm";
import AssignmentList from "../components/AssignmentList";

function Home() {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    const res = await API.get("/assignments");
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const addAssignment = async (data) => {
    await API.post("/assignments", data);
    fetchAssignments();
  };

  const deleteAssignment = async (id) => {
    await API.delete(`/assignments/${id}`);
    fetchAssignments();
  };

  return (
    <div className="container">
      <h1>📘 Student Assignment Tracker</h1>

      <AssignmentForm onAdd={addAssignment} />
      <AssignmentList assignments={assignments} onDelete={deleteAssignment} />
    </div>
  );
}

export default Home;
