import React, {useEffect} from 'react';
import Connect from '../../components/connect'
const ConnectPage  = (props) => {

  useEffect(() => {
    document.title = 'Connect'
  });

  return (
    <div>
      <Connect></Connect>
    </div>
  );
}
export default ConnectPage;