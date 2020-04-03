import React, {useEffect} from 'react';
import Dashboard from '../../components/connect'
const DashboardPage  = (props) => {

  useEffect(() => {
    document.title = 'Dashboard'
  });

  return (
    <div>
      <Dashboard></Dashboard>
    </div>
  );
}
export default DashboardPage;