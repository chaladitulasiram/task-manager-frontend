import React, { useState, useEffect } from 'react';

const TaskForm = ({ currentTask, onSave, onCancel }) => {
  const [task, setTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({ title: '', description: '', completed: false });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title) return; // Prevent saving empty tasks
    onSave(task);
    setTask({ title: '', description: '', completed: false });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
      />
      <div className="form-actions">
        <button type="submit" className="button-primary">
            {currentTask ? 'Update Task' : 'Add Task'}
        </button>
        {currentTask && (
          <button type="button" onClick={onCancel} className="button-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;