import React, { useState, useEffect, useCallback } from 'react';
// Import icons for the theme toggle
import { FiSun, FiMoon } from 'react-icons/fi';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from './services/taskService';
import './App.css';


// Helper function to get the initial theme
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  // Check user's system preference
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState(getInitialTheme); // State for the current theme

  // Effect to apply the theme and save it to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const loadTasks = useCallback(async () => {
    try {
      const response = await getTasks(filter);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  }, [filter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSave = async (task) => {
    if (task.id) {
      await updateTask(task.id, task);
    } else {
      await createTask(task);
    }
    loadTasks();
    setCurrentTask(null);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  const handleDelete = async (id) => {
    // Optimistically remove the task from the UI for a faster feel
    setTasks(tasks.filter(t => t.id !== id));
    await deleteTask(id);
    // Optionally reload tasks to ensure sync with the server
    // loadTasks(); 
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    // Optimistically update the UI
    setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
    await updateTaskStatus(task.id, !task.completed);
  }

  const handleCancelEdit = () => {
    setCurrentTask(null);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <button onClick={toggleTheme} className="theme-toggle icon-button">
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
      </header>

      <main>
        <div className="form-section">
          <h2>{currentTask ? 'Edit Task' : 'Add a New Task'}</h2>
          <TaskForm 
            currentTask={currentTask} 
            onSave={handleSave} 
            onCancel={handleCancelEdit}
          />
        </div>
        
        <div className="filter-section">
          <div className="filter-buttons">
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
            <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
          </div>
        </div>

        <TaskList 
          tasks={tasks} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  );
}

export default App;