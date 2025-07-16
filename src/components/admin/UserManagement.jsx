import { useState } from 'react';
import '../../css/UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
        { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-10' },
        { id: 5, name: 'Tom Brown', email: 'tom@company.com', role: 'User', status: 'Active', lastLogin: '2024-01-13' }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'User',
        password: ''
    });

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        const user = {
            id: users.length + 1,
            ...newUser,
            status: 'Active',
            lastLogin: 'Never'
        };
        setUsers([...users, user]);
        setNewUser({ name: '', email: '', role: 'User', password: '' });
        setShowAddModal(false);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const toggleUserStatus = (userId) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                : user
        ));
    };

    return (
        <div className="user-management">
            {/* Header Actions */}
            <div className="user-management-header">
                <div className="header-controls">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>

                <button
                    className="add-user-btn"
                    onClick={() => setShowAddModal(true)}
                >
                    <span>+</span> Add User
                </button>
            </div>

            {/* Users Table */}
            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-info">
                                        <div className="user-avatar">👤</div>
                                        <span className="user-name">{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className="role-text">
                                        {user.role === 'Admin' ? 'A' : 'U'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>{user.lastLogin}</td>
                                <td>
                                    <div className="user-actions">
                                        <button
                                            className="action-btn edit"
                                            title="Edit User"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="action-btn toggle"
                                            title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                            onClick={() => toggleUserStatus(user.id)}
                                        >
                                            {user.status === 'Active' ? '🔒' : '🔓'}
                                        </button>
                                        <button
                                            className="action-btn delete"
                                            title="Delete User"
                                            onClick={() => handleDeleteUser(user.id)}
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

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Add New User</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowAddModal(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleAddUser} className="modal-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Temporary Password</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="primary">
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* User Stats */}
            <div className="user-stats">
                <div className="stat-item">
                    <span className="stat-number">{users.length}</span>
                    <span className="stat-label">Total Users</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{users.filter(u => u.status === 'Active').length}</span>
                    <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{users.filter(u => u.role === 'Admin').length}</span>
                    <span className="stat-label">Administrators</span>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
