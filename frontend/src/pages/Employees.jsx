import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import EmployeeTable from '../components/EmployeeTable';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
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
        <h2>👥 Employees</h2>
        <Link to="/employees/new" className="btn btn-primary">
          + Add Employee
        </Link>
      </div>

      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  );
}

export default Employees;
