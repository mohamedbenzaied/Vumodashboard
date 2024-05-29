import React, { useEffect, useRef, useState } from 'react';

const TableauDashboard = () => {
  const [token, setToken] = useState('');
  const vizRef = useRef(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('https://backauth.azurewebsites.net/gettoken');
        if (!response.ok) {
          throw new Error('Failed to fetch token');
        }
        const data = await response.json();
        console.log('Fetched token:', data);

        setToken(data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token && vizRef.current) {
      const { tableau } = window;
      const vizUrl = 'https://prod-uk-a.online.tableau.com/t/slawekpotasz701cda0c89/views/vumobiv0_1/Overview';
      const options = {
        hideTabs: true,
        toolbar: 'hidden',
        height: '800px',
        width: '100%',
        token: token,
        onFirstInteractive: () => {
          const viz = vizRef.current.viz;
          const workbook = viz.getWorkbook();
          const activeSheet = workbook.getActiveSheet();

          // Apply filters
          activeSheet.applyFilterAsync('VIN', 'ZFFLG40A8R0097259', tableau.FilterUpdateType.REPLACE)
            .then(() => {
              console.log('Filter applied successfully');
            })
            .catch(err => {
              console.error('Error applying filter:', err);
            });
        }
      };

      vizRef.current.viz = new tableau.Viz(vizRef.current, vizUrl, options);
    }
  }, [token]);

  return <div ref={vizRef}></div>;
};

export default TableauDashboard;
