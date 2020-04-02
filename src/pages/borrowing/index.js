import React, {useEffect} from 'react';
import Borrowing from '../../components/borrowing'
const BorrowingPage  = (props) => {

  useEffect(() => {
    document.title = 'Borrowing'
  });

  return (
    <div>
      <Borrowing></Borrowing>
    </div>
  );
}
export default BorrowingPage;