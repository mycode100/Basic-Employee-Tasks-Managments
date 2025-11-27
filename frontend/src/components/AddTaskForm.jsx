import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskAPI, employeeAPI } from '../services/api';

function AddTaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '',
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    fetchEmployees();
    if (isEditMode) {
      fetchTask();
    }
  }, [id]);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data.filter(emp => emp.status === 'Active'));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await taskAPI.getById(id);
      const task = response.data.data;
      setFormData({
        ...task,
        assignedTo: task.assignedTo?._id || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Failed to load task data');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await taskAPI.update(id, formData);
      } else {
        await taskAPI.create(formData);
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>{isEditMode ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
      </div>

      <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter task description"
            />
          </div>

          <div className="form-group">
            <label>Assign To</label>
            <select
              name="assignedTo"
              className="form-control"
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <option value="">-- Select Employee --</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} ({employee.role})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Priority *</label>
            <select
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Todo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Task' : 'Add Task')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/tasks')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;
