import React from 'react';
// Import the icons we need from the Feather icon set
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => (
  <div className={`task-item ${task.completed ? 'completed' : ''}`}>
    <div className="task-content" onClick={() => onToggleComplete(task)}>
      <div className="task-status">
        <div className="checkbox">
          {task.completed && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
      <div className="task-details">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>
    </div>
    <div className="task-actions">
      <button onClick={() => onEdit(task)} className="icon-button">
        <FiEdit />
      </button>
      <button onClick={() => onDelete(task.id)} className="icon-button delete-button">
        <FiTrash2 />
      </button>
    </div>
  </div>
);

export default TaskItem;