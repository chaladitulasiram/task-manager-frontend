import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => (
  <div className="task-list">
    {tasks.length === 0 ? (
      <p className="empty-message">No tasks to show.</p>
    ) : (
      tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onToggleComplete={onToggleComplete}
        />
      ))
    )}
  </div>
);

export default TaskList;