import { useState, useEffect } from 'react';
import '../../css/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 45,
    totalMeetings: 128,
    activeMeetings: 3,
    completedMeetings: 125
  });

  const [recentActivity] = useState([
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Meeting completed', user: 'Team Alpha', time: '15 minutes ago', type: 'meeting' },
    { id: 3, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { id: 4, action: 'User role updated', user: 'Jane Smith', time: '2 hours ago', type: 'user' },
    { id: 5, action: 'New meeting scheduled', user: 'Project Beta', time: '3 hours ago', type: 'meeting' }
  ]);

  const [upcomingMeetings] = useState([
    { id: 1, title: 'Weekly Team Standup', time: '10:00 AM', participants: 8, status: 'scheduled' },
    { id: 2, title: 'Product Review', time: '2:00 PM', participants: 12, status: 'scheduled' },
    { id: 3, title: 'Client Presentation', time: '4:30 PM', participants: 6, status: 'scheduled' }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return '👤';
      case 'meeting': return '📅';
      case 'system': return '⚙️';
      default: return '📋';
    }
  };

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalMeetings}</div>
            <div className="stat-label">Total Meetings</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeMeetings}</div>
            <div className="stat-label">Active Meetings</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedMeetings}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Recent Activity */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="section-action">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-details">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Today's Meetings</h3>
            <button className="section-action">Schedule New</button>
          </div>
          <div className="meetings-list">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="meeting-item">
                <div className="meeting-time">{meeting.time}</div>
                <div className="meeting-content">
                  <div className="meeting-title">{meeting.title}</div>
                  <div className="meeting-participants">
                    👥 {meeting.participants} participants
                  </div>
                </div>
                <div className="meeting-status">
                  <span className={`status-badge ${meeting.status}`}>
                    {meeting.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary">
            <span className="action-icon">👤</span>
            Add User
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📅</span>
            Schedule Meeting
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📊</span>
            Generate Report
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">⚙️</span>
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
