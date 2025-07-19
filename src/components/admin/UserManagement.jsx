import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserManagement } from '../../hooks/useUserManagement';
import '../../css/UserManagement.css';
import { toast } from 'react-toastify';
import {
    setUsers,
    setLoading,
    setError,
    addUser,
    deleteUser,
    setSearchTerm,
    setFilterRole
} from '../../store/userManagementSlice';
import api from '../../api/axios';

// Import React Icons
import { FiEdit, FiTrash2, FiLock, FiUnlock, FiSearch, FiPlus, FiUser } from 'react-icons/fi';

const UserManagement = () => {

    //define dispatch for Redux actions
    const dispatch = useDispatch();

    // Get current user from auth state
    const currentUser = useSelector((state) => state.auth.user);

    // Custom hook to manage user data
    const { users, filteredUsers: hookFilteredUsers, isLoading, searchTerm, filterRole } = useUserManagement();

    // Filter out the currently logged-in admin from the users list
    const filteredUsers = hookFilteredUsers.filter(user => {
        // If current user is an admin, don't show them in the list
        if (currentUser?.is_admin && user.id === currentUser.id) {
            return false;
        }
        return true;
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        is_admin: false,
        password: ''
    });

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



    // Function to generate a unique password based on username
    const generatePassword = (username) => {
        if (!username) return '';

        // Simple hash-like function for password generation
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            const char = username.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        // Make it positive and add some complexity
        const positiveHash = Math.abs(hash);
        const uniqueNumber = (positiveHash % 9000) + 1000; // 4-digit number between 1000-9999

        return `${username.charAt(0).toUpperCase()}${username.slice(1)}${uniqueNumber}!`;
    };

    // Function to format created_at timestamp
    const formatDateTime = (timestamp) => {
        if (!timestamp) return 'N/A';
        
        try {
            const date = new Date(timestamp);
            // Format: DD/MM/YYYY HH:MM
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };


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
        // Add your toggle status logic here
        console.log('Toggle status for user:', userId);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
        dispatch(setLoading(true)); // Set loading state
        const responnse = await api.post('/users', newUser);
        if (responnse.status === 201) {
            dispatch(addUser(newUser)); // Dispatch action to add user
            toast.success('User added successfully!');
            setShowAddModal(false);
            // Reset form
            setNewUser({
                name: '',
                email: '',
                role: 'User',
                password: ''
            });
        }
    } catch (error) {
        console.error('Failed to add user:', error);
        dispatch(setError('Failed to add user')); // Dispatch error action
        toast.error('Failed to add user. Please try again.');
        setShowAddModal(false); // Close modal on error
    } finally {
        dispatch(setLoading(false)); // Reset loading state
    }
    };

    const handleOpenModal = () => {
        setNewUser({
            name: '',
            email: '',
            role: 'User',
            password: ''
        });
        setShowAddModal(true);
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
                        <span className="search-icon"><FiSearch /></span>
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
                    onClick={handleOpenModal}
                >
                    <FiPlus /> Add User
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
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-avatar"><FiUser /></div>
                                            <span className="user-name">{user.name}</span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="role-text">
                                            {user.is_admin ? 'A' : 'U'}
                                        </span>
                                    </td>
                                    <td>{formatDateTime(user.created_at)}</td>
                                    <td>
                                        <div className="user-actions">
                                            {user.is_admin ? (
                                                // For admin users, only show delete if it's the current user
                                                currentUser?.id === user.id ? (
                                                    <button
                                                        className="action-btn delete"
                                                        title="Delete Your Account"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                ) : (
                                                    <span className="no-actions" title="Admin accounts can only be deleted by themselves">
                                                        Admin Protected
                                                    </span>
                                                )
                                            ) : (
                                                // For regular users, show all actions
                                                <>
                                                    <button
                                                        className="action-btn edit"
                                                        title="Edit User"
                                                    >
                                                        <FiEdit />
                                                    </button>
                                                    <button
                                                        className="action-btn toggle"
                                                        title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                        onClick={() => handleToggleStatus(user.id)}
                                                    >
                                                        {user.status === 'Active' ? <FiLock /> : <FiUnlock />}
                                                    </button>
                                                    <button
                                                        className="action-btn delete"
                                                        title="Delete User"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </>
                                            )}
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
                                <label>Username</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={newUser.email.replace('@minutor.com', '')}
                                        onChange={(e) => {
                                            const username = e.target.value;
                                            const email = username + '@minutor.com';
                                            const password = generatePassword(username);
                                            setNewUser({ ...newUser, email, password });
                                        }}
                                        placeholder="Enter username"
                                        required
                                        style={{ flex: 1 }}
                                    />
                                    <span style={{ marginLeft: '8px', color: '#666', fontSize: '14px' }}>@minutor.com</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, is_admin: e.target.value === 'Admin' ? true : false })}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Auto-Generated Password</label>
                                <input
                                    type="text"
                                    value={newUser.password}
                                    readOnly
                                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                                />
                                <small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                    Unique password based on username (user should change on first login)
                                </small>
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
                    <span className="stat-number">{users ? users.filter(u => u.is_admin).length : 0}</span>
                    <span className="stat-label">Administrators</span>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
