import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Tasks from './pages/Tasks';
import AddEmployeeForm from './components/AddEmployeeForm';
import AddTaskForm from './components/AddTaskForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/new" element={<AddEmployeeForm />} />
            <Route path="/employees/edit/:id" element={<AddEmployeeForm />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<AddTaskForm />} />
            <Route path="/tasks/edit/:id" element={<AddTaskForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
