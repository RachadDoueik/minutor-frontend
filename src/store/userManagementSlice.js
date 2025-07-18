import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  filterRole: 'all',
  selectedUser: null,
  totalUsers: 0,
  currentPage: 1,
  usersPerPage: 10,
  isAddingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAddingUser: (state, action) => {
      state.isAddingUser = action.payload;
    },
    setUpdatingUser: (state, action) => {
      state.isUpdatingUser = action.payload;
    },
    setDeletingUser: (state, action) => {
      state.isDeletingUser = action.payload;
    },

    // Error handling
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isAddingUser = false;
      state.isUpdatingUser = false;
      state.isDeletingUser = false;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Users data
    setUsers: (state, action) => {
      state.users = action.payload;
      state.totalUsers = action.payload.length;
      state.isLoading = false;
      state.error = null;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      state.totalUsers = state.users.length;
      state.isAddingUser = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
      state.isUpdatingUser = false;
      state.error = null;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      state.totalUsers = state.users.length;
      state.isDeletingUser = false;
      state.error = null;
    },
    toggleUserStatus: (state, action) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
      }
    },

    // Filters and search
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setFilterRole: (state, action) => {
      state.filterRole = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },

    // Selected user
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUsersPerPage: (state, action) => {
      state.usersPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing page size
    },

    // Reset state
    resetUserManagement: (state) => {
      return { ...initialState };
    }
  },
});

export const {
  setLoading,
  setAddingUser,
  setUpdatingUser,
  setDeletingUser,
  setError,
  clearError,
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  setSearchTerm,
  setFilterRole,
  setSelectedUser,
  clearSelectedUser,
  setCurrentPage,
  setUsersPerPage,
  resetUserManagement
} = userManagementSlice.actions;

export default userManagementSlice.reducer;