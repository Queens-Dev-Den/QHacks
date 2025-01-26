const getUserInfo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }
  
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/users/current-user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch user information');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
  };
  
  export default getUserInfo;