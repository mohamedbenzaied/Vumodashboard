import React, { useState , useEffect} from 'react';
import TableauDashboard from './Dashboard';

const App = () => {
  const [token, setToken] = useState('');

  // Function to extract token from URL
  const getTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  };

  // Set token when component mounts
  useEffect(() => {
    const token = getTokenFromURL();
    setToken(token);
  }, []);

  return (
    <div>
      <TableauDashboard token={token} />
    </div>
  );
};

export default App;
