import React, {useEffect} from 'react';
import SideBar from '../../components/sidebar';
const Home  = (props) => {
  useEffect(() => {
    document.title = 'Home'
  });
  return (
    <div>
      <SideBar></SideBar>
    </div>
  );
}
export default Home;