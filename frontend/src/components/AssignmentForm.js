import React, { useState } from "react";

function AssignmentForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title || !dueDate) {
      alert("Title and Due Date required");
      return;
    }

    onAdd({ title, description, due_date: dueDate });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <div>
      <h3>Add Assignment</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <br />

      <button onClick={handleSubmit}>Add Assignment</button>
    </div>
  );
}

export default AssignmentForm;
