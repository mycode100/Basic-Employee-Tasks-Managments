import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeAPI } from '../services/api';

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await employeeAPI.getById(id);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
      alert('Failed to load employee data');
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
        await employeeAPI.update(id, formData);
      } else {
        await employeeAPI.create(formData);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Failed to save employee');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>{isEditMode ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter employee name"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <input
              type="text"
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="e.g., Software Engineer, Manager"
            />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <input
              type="text"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="e.g., Engineering, HR, Sales"
            />
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Add Employee')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/employees')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeForm;
