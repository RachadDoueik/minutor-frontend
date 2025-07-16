import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './components/Auth';
import Admin from './pages/Admin';

// Layout component to conditionally show navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/auth' || location.pathname === '/admin';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main style={{ paddingTop: hideNavbar ? '0' : '70px' }}>
        {children}
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
