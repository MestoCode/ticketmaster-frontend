import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import MyTickets from './pages/MyTickets';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App bg-app_bg min-h-screen'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/tickets" element={<MyTickets />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
