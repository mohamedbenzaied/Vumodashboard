import React, { useEffect,useState} from 'react';

const TableauDashboard = ({ }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
      const fetchToken = async () => {
        try {
          const response = await fetch('https://backauth.azurewebsites.net/gettoken');
          if (!response.ok) {
            throw new Error('Failed to fetch token');
          }
          const data = await response.json();
          console.error('data fetching token:', data);

          setToken(data.token);
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
  
      fetchToken();
    }, []);

  return (
    <div>
      {/* Container for embedding the Tableau dashboard */}
      <tableau-viz id="tableauViz"
        src='https://prod-uk-a.online.tableau.com/t/slawekpotasz701cda0c89/views/vumobiv0_1/Overview'
        token={token}
        toolbar="hidden" hide-tabs>
      </tableau-viz>
    </div>
  );
};

export default TableauDashboard;
