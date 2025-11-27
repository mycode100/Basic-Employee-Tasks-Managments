import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import TaskTable from '../components/TaskTable';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAll();
      setTasks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(id);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '3rem' }}>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>📝 Tasks</h2>
        <Link to="/tasks/new" className="btn btn-success">
          + Add Task
        </Link>
      </div>

      <TaskTable tasks={tasks} onDelete={handleDelete} />
    </div>
  );
}

export default Tasks;
