import { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import UserManagement from '../components/admin/UserManagement';
import MeetingManagement from '../components/admin/MeetingManagement';
import SystemSettings from '../components/admin/SystemSettings';
import Dashboard from '../components/admin/Dashboard';
import '../css/Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'meetings':
        return <MeetingManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin">
      <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <AdminHeader 
          activeTab={activeTab}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="admin-content">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
