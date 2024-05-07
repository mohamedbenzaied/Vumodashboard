import React, { useEffect } from 'react';

const TableauDashboard = ({ token }) => {
  useEffect(() => {
    // Function to set token in tableau-viz element

  }, [token]);

  return (
    <div>
      {/* Container for embedding the Tableau dashboard */}
      <tableau-viz id="tableauViz"
        src={process.env.uri}
        token={token}
        toolbar="hidden" hide-tabs>
      </tableau-viz>
    </div>
  );
};

export default TableauDashboard;
