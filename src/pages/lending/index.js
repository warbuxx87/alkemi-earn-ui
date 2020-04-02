import React, {useEffect} from 'react';
import LendingInfo from '../../components/lendingInfo';
import LendingTable from '../../components/lendingTable';
import ActiveLending from '../../components/activeLending'
const LendingPage  = (props) => {

  useEffect(() => {
    document.title = 'Lending'
  });

  return (
    <div class="lending">
      <LendingInfo></LendingInfo>
      <ActiveLending></ActiveLending>
      <LendingTable></LendingTable>
    </div>
  );
}
export default LendingPage;