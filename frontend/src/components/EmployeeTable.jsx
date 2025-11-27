import { useNavigate } from 'react-router-dom';

function EmployeeTable({ employees, onDelete }) {
  const navigate = useNavigate();

  if (employees.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
          No employees found. Add your first employee!
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td style={{ fontWeight: '600' }}>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>
                <span
                  className={`badge ${
                    employee.status === 'Active' ? 'badge-active' : 'badge-inactive'
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
