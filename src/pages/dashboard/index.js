import React, {useEffect} from 'react';
import DashboardInfo from '../../components/dashboardInfo';
import DashboardTable from '../../components/dashboardTable';


const DashboardPage  = (props) => {

  useEffect(() => {
    document.title = 'Dashboard'
  });

  return (
    <div className="lending">
        <DashboardInfo></DashboardInfo>
        <DashboardTable></DashboardTable>

    </div>
  );
}
export default DashboardPage;