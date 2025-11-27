import { useNavigate } from 'react-router-dom';

function TaskTable({ tasks, onDelete }) {
  const navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
          No tasks found. Create your first task!
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td style={{ fontWeight: '600' }}>{task.title}</td>
              <td>
                {task.description.substring(0, 50)}
                {task.description.length > 50 ? '...' : ''}
              </td>
              <td>{task.assignedTo?.name || 'N/A'}</td>
              <td>
                <span className={`badge badge-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>
              <td>
                <span className={`badge badge-${task.status.toLowerCase()}`}>
                  {task.status === 'InProgress' ? 'In Progress' : task.status}
                </span>
              </td>
              <td>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'No due date'}
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => navigate(`/tasks/edit/${task._id}`)}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
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

export default TaskTable;
