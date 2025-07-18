import { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUserManagement } from '../../hooks/useUserManagement';
import '../../css/UserManagement.css';
import {
    setUsers,
    setLoading,
    setError,
    addUser,
    deleteUser,
    toggleUserStatus,
    setSearchTerm,
    setFilterRole
} from '../../store/userManagementSlice';
import api from '../../api/axios';

const UserManagement = () => {

    //define dispatch for Redux actions
    const dispatch = useDispatch();

    // Custom hook to manage user data
    const { users , filteredUsers, isLoading, searchTerm, filterRole } = useUserManagement();

    //function to fetch users from API
    const fetchUsers = async () => {
        dispatch(setLoading(true)); // Set loading state
        try {
            const response = await api.get('/users');
            console.log('Fetched users:', response.data.data);
            const fetchedUsers = Object.values(response.data.data);// Convert object to array
            dispatch(setUsers(fetchedUsers)); // Dispatch action to set users
        } catch (error) {
            console.error('Failed to fetch users:', error);
            dispatch(setError('Failed to fetch users')); // Dispatch error action
        }
    }
            


    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'User',
        password: ''
    });


    // Load users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId));
        }
    };

    const handleToggleStatus = (userId) => {
        dispatch(toggleUserStatus(userId));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        dispatch(addUser(newUser));
        setShowAddModal(false);
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
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    <select
                        value={filterRole}
                        onChange={(e) => dispatch(setFilterRole(e.target.value))}
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
                {isLoading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        fontSize: '16px',
                        color: '#666'
                    }}>
                        Loading users...
                    </div>
                ) : (
                    <table className="users-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
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
                                        {user.is_admin ? 'A' : 'U'}
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
                                            onClick={() => handleToggleStatus(user.id)}
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
                )}
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
                    <span className="stat-number">{users ? users.length : 0}</span>
                    <span className="stat-label">Total Users</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{users ? users.filter(u => u.status === 'Active').length : 0}</span>
                    <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{users ? users.filter(u => u.is_admin).length : 0}</span>
                    <span className="stat-label">Administrators</span>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
