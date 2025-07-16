import { useState } from 'react';
import '../../css/MeetingManagement.css';

const MeetingManagement = () => {
  const [meetings, setMeetings] = useState([
    { 
      id: 1, 
      title: 'Weekly Team Standup', 
      organizer: 'John Doe', 
      date: '2024-01-16', 
      time: '10:00 AM',
      duration: '30 min',
      participants: 8, 
      status: 'Scheduled',
      room: 'Conference Room A'
    },
    { 
      id: 2, 
      title: 'Product Review Meeting', 
      organizer: 'Jane Smith', 
      date: '2024-01-16', 
      time: '2:00 PM',
      duration: '60 min',
      participants: 12, 
      status: 'In Progress',
      room: 'Conference Room B'
    },
    { 
      id: 3, 
      title: 'Client Presentation', 
      organizer: 'Mike Johnson', 
      date: '2024-01-16', 
      time: '4:30 PM',
      duration: '45 min',
      participants: 6, 
      status: 'Scheduled',
      room: 'Meeting Room 1'
    },
    { 
      id: 4, 
      title: 'Monthly Review', 
      organizer: 'Sarah Wilson', 
      date: '2024-01-15', 
      time: '3:00 PM',
      duration: '90 min',
      participants: 15, 
      status: 'Completed',
      room: 'Conference Room A'
    }
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    organizer: '',
    date: '',
    time: '',
    duration: '30',
    room: '',
    participants: []
  });

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || meeting.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    const meeting = {
      id: meetings.length + 1,
      ...newMeeting,
      participants: Math.floor(Math.random() * 15) + 1,
      status: 'Scheduled'
    };
    setMeetings([...meetings, meeting]);
    setNewMeeting({ title: '', organizer: '', date: '', time: '', duration: '30', room: '', participants: [] });
    setShowScheduleModal(false);
  };

  const handleDeleteMeeting = (meetingId) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'scheduled';
      case 'In Progress': return 'in-progress';
      case 'Completed': return 'completed';
      case 'Cancelled': return 'cancelled';
      default: return 'scheduled';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Scheduled': return '📅';
      case 'In Progress': return '🟢';
      case 'Completed': return '✅';
      case 'Cancelled': return '❌';
      default: return '📅';
    }
  };

  return (
    <div className="meeting-management">
      {/* Header Actions */}
      <div className="meeting-management-header">
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button 
          className="schedule-meeting-btn"
          onClick={() => setShowScheduleModal(true)}
        >
          <span>+</span> Schedule Meeting
        </button>
      </div>

      {/* Meetings Table */}
      <div className="meetings-table-container">
        <table className="meetings-table">
          <thead>
            <tr>
              <th>Meeting Details</th>
              <th>Organizer</th>
              <th>Date & Time</th>
              <th>Duration</th>
              <th>Room</th>
              <th>Participants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.map(meeting => (
              <tr key={meeting.id}>
                <td>
                  <div className="meeting-details">
                    <div className="meeting-title">{meeting.title}</div>
                    <div className="meeting-id">ID: #{meeting.id}</div>
                  </div>
                </td>
                <td>{meeting.organizer}</td>
                <td>
                  <div className="datetime">
                    <div className="date">{meeting.date}</div>
                    <div className="time">{meeting.time}</div>
                  </div>
                </td>
                <td>{meeting.duration}</td>
                <td>{meeting.room}</td>
                <td>
                  <div className="participants">
                    <span className="participant-icon">👥</span>
                    {meeting.participants}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(meeting.status)}`}>
                    {getStatusIcon(meeting.status)} {meeting.status}
                  </span>
                </td>
                <td>
                  <div className="meeting-actions">
                    <button className="action-btn view" title="View Details">
                      👁️
                    </button>
                    <button className="action-btn edit" title="Edit Meeting">
                      ✏️
                    </button>
                    <button className="action-btn minutes" title="View Minutes">
                      📝
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete Meeting"
                      onClick={() => handleDeleteMeeting(meeting.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3>Schedule New Meeting</h3>
              <button 
                className="modal-close"
                onClick={() => setShowScheduleModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleScheduleMeeting} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Meeting Title</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Organizer</label>
                  <input
                    type="text"
                    value={newMeeting.organizer}
                    onChange={(e) => setNewMeeting({...newMeeting, organizer: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <select
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
                  >
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                    <option value="90">90 min</option>
                    <option value="120">120 min</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Meeting Room</label>
                <select
                  value={newMeeting.room}
                  onChange={(e) => setNewMeeting({...newMeeting, room: e.target.value})}
                  required
                >
                  <option value="">Select a room</option>
                  <option value="Conference Room A">Conference Room A</option>
                  <option value="Conference Room B">Conference Room B</option>
                  <option value="Meeting Room 1">Meeting Room 1</option>
                  <option value="Meeting Room 2">Meeting Room 2</option>
                  <option value="Board Room">Board Room</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary">
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meeting Stats */}
      <div className="meeting-stats">
        <div className="stat-item">
          <span className="stat-number">{meetings.length}</span>
          <span className="stat-label">Total Meetings</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{meetings.filter(m => m.status === 'Scheduled').length}</span>
          <span className="stat-label">Scheduled</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{meetings.filter(m => m.status === 'In Progress').length}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{meetings.filter(m => m.status === 'Completed').length}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
    </div>
  );
};

export default MeetingManagement;
