import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>📋 Employee Task Manager</h1>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/employees">Employees</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
