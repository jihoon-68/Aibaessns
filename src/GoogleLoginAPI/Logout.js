export const Logout = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/oauth/delete';
    try {
      const response = await fetch(`${API_URL}${path}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('bad server condition');
      return response.json();
    } catch (e) {
      console.error('getUserInfo Error: ', e.message);
      return false;
    }
  };