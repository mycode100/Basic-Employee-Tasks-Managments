import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI, taskAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [employeesRes, tasksRes] = await Promise.all([
        employeeAPI.getAll(),
        taskAPI.getAll(),
      ]);

      const employees = employeesRes.data.data;
      const tasks = tasksRes.data.data;

      setStats({
        totalEmployees: employees.length,
        activeEmployees: employees.filter((e) => e.status === 'Active').length,
        totalTasks: tasks.length,
        pendingTasks: tasks.filter((t) => t.status === 'Todo').length,
        inProgressTasks: tasks.filter((t) => t.status === 'InProgress').length,
        completedTasks: tasks.filter((t) => t.status === 'Done').length,
      });

      setRecentTasks(tasks.slice(-5).reverse());
      setRecentEmployees(employees.slice(-5).reverse());

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ fontSize: '2rem' }}>⏳</div>
        <p style={{ marginTop: '1rem', color: '#4a5568' }}>Loading dashboard...</p>
      </div>
    );
  }

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  // Reusable styles
  const statCardBase = {
    padding: '2rem',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  };

  const statusCardBase = {
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const activityItemBase = {
    padding: '1rem',
    background: '#f7fafc',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    marginBottom: '1rem'
  };

  return (
    <div>
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2.5rem',
        borderRadius: '16px',
        marginBottom: '2rem',
        color: 'white',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
        animation: 'slideDown 0.6s ease-out'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>
          Welcome to Task Manager 👋
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>
          Overview of your team performance and task progress
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2.5rem' 
      }}>
        {/* Total Employees Card */}
        <div 
          style={{
            ...statCardBase,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(240, 147, 251, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👥</div>
          <h3 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {stats.totalEmployees}
          </h3>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: '1rem' }}>Total Employees</p>
          <Link to="/employees" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateX(5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          >
            View All →
          </Link>
        </div>

        {/* Active Employees Card */}
        <div 
          style={{
            ...statCardBase,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(79, 172, 254, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
          <h3 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {stats.activeEmployees}
          </h3>
          <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>Active Employees</p>
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
            {stats.totalEmployees > 0 
              ? `${Math.round((stats.activeEmployees / stats.totalEmployees) * 100)}% of total`
              : 'No employees yet'}
          </div>
        </div>

        {/* Total Tasks Card */}
        <div 
          style={{
            ...statCardBase,
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(250, 112, 154, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📋</div>
          <h3 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {stats.totalTasks}
          </h3>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: '1rem' }}>Total Tasks</p>
          <Link to="/tasks" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateX(5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          >
            View All →
          </Link>
        </div>

        {/* Completion Rate Card */}
        <div 
          style={{
            ...statCardBase,
            background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(48, 207, 208, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {completionRate}%
          </h3>
          <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>Completion Rate</p>
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.3)',
              height: '8px',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'white',
                height: '100%',
                width: `${completionRate}%`,
                borderRadius: '10px',
                transition: 'width 1.5s ease-out'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ 
          marginBottom: '1.5rem', 
          color: '#1a202c', 
          fontSize: '1.5rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          📈 Task Status Overview
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <div 
            style={{
              ...statusCardBase,
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(252, 182, 159, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📝</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#7c2d12' }}>
              {stats.pendingTasks}
            </div>
            <div style={{ color: '#7c2d12', marginTop: '0.5rem', fontWeight: '600' }}>To Do</div>
          </div>

          <div 
            style={{
              ...statusCardBase,
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(168, 237, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔄</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2c5282' }}>
              {stats.inProgressTasks}
            </div>
            <div style={{ color: '#2c5282', marginTop: '0.5rem', fontWeight: '600' }}>In Progress</div>
          </div>

          <div 
            style={{
              ...statusCardBase,
              background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(210, 153, 194, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✨</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#22543d' }}>
              {stats.completedTasks}
            </div>
            <div style={{ color: '#22543d', marginTop: '0.5rem', fontWeight: '600' }}>Completed</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        {/* Recent Tasks */}
        <div className="card">
          <h3 style={{ 
            marginBottom: '1.5rem', 
            color: '#1a202c', 
            fontSize: '1.3rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📌 Recent Tasks
          </h3>
          {recentTasks.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>No tasks yet</p>
          ) : (
            <div>
              {recentTasks.map((task) => (
                <div 
                  key={task._id} 
                  style={{
                    ...activityItemBase,
                    borderLeft: '4px solid #667eea'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.background = '#edf2f7';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.background = '#f7fafc';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#2d3748' }}>
                    {task.title}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '0.5rem' }}>
                    Assigned to: {task.assignedTo?.name || 'Unassigned'}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className={`badge badge-${task.status.toLowerCase()}`}>
                      {task.status === 'InProgress' ? 'In Progress' : task.status}
                    </span>
                    <span className={`badge badge-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/tasks" style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '1.5rem',
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#5a67d8';
            e.currentTarget.style.transform = 'translateX(5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#667eea';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          >
            View All Tasks →
          </Link>
        </div>

        {/* Recent Employees */}
        <div className="card">
          <h3 style={{ 
            marginBottom: '1.5rem', 
            color: '#1a202c', 
            fontSize: '1.3rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            👤 Recent Employees
          </h3>
          {recentEmployees.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>No employees yet</p>
          ) : (
            <div>
              {recentEmployees.map((employee) => (
                <div 
                  key={employee._id} 
                  style={{
                    ...activityItemBase,
                    borderLeft: '4px solid #38a169'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.background = '#edf2f7';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.background = '#f7fafc';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#2d3748' }}>
                    {employee.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '0.5rem' }}>
                    {employee.role} • {employee.department}
                  </div>
                  <span className={`badge badge-${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link to="/employees" style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '1.5rem',
            color: '#38a169',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2f855a';
            e.currentTarget.style.transform = 'translateX(5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#38a169';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          >
            View All Employees →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1a202c', fontSize: '1.3rem', fontWeight: '700' }}>
          ⚡ Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/employees/new" 
            className="btn" 
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '12px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ➕ Add Employee
          </Link>
          <Link 
            to="/tasks/new" 
            className="btn" 
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '12px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(240, 147, 251, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ➕ Add Task
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
