import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Review from './pages/Review.jsx';
import Dashboard from './pages/Dashboard.jsx';
import History from './pages/History.jsx';

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<Review />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <footer className="app-footer">
        Built with React • Cognita v1.0 • Your code, your growth
      </footer>
    </div>
  );
};

export default App;