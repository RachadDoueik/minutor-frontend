import { useSelector } from 'react-redux';

export const useUserManagement = () => {
  const users = useSelector((state) => state.userManagement.users);
  const isLoading = useSelector((state) => state.userManagement.isLoading);
  const error = useSelector((state) => state.userManagement.error);
  const searchTerm = useSelector((state) => state.userManagement.searchTerm);
  const filterRole = useSelector((state) => state.userManagement.filterRole);

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || 
                       (filterRole === 'Admin' && user.is_admin) ||
                       (filterRole === 'User' && !user.is_admin);

    return matchesSearch && matchesRole;
  });

  return {
    users,
    filteredUsers,
    isLoading,
    error,
    searchTerm,
    filterRole
  };
};