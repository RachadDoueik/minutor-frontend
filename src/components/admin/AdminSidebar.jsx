import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminSidebar.css';
import logo from '../../assets/images/logo-white-bg.png';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const AdminSidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await api.post('/auth/logout'); // token should be attached automatically
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    logout(); // Dispatch logout action to Redux store
    toast.info('Logout successful!');
    navigate('/'); // Redirect to login page
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'users', icon: '👥', label: 'User Management' },
    { id: 'meetings', icon: '📅', label: 'Meetings' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo} alt="Minutor" className="sidebar-logo-image" />
          {!collapsed && <span className="sidebar-logo-text">Minutor Admin</span>}
        </div>
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-menu-item">
              <button
                className={`sidebar-menu-button ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                title={collapsed ? item.label : ''}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar-menu-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">👤</div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Admin User</div>
              <div className="sidebar-user-role">Administrator</div>
            </div>
          )}
        </div>
        <button className="sidebar-logout" title={collapsed ? 'Logout' : ''} onClick={() => handleLogout()}>
          {collapsed ? '🚪' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
