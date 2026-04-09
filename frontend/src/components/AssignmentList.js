import React from "react";

function AssignmentList({ assignments, onDelete }) {
  if (assignments.length === 0) {
    return <p>No assignments yet. Add one above 👆</p>;
  }

  return (
    <div>
      <h3>📋 Assignments</h3>

      {assignments.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            background:
              a.status === "overdue"
                ? "#ffcccc"
                : a.status === "completed"
                  ? "#ccffcc"
                  : "#fff",
          }}
        >
          <h4>{a.title}</h4>
          <p>{a.description}</p>
          <p>Due: {a.due_date}</p>
          <p>Status: {a.status}</p>

          <button onClick={() => onDelete(a.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AssignmentList;
