import React, {useEffect} from 'react';
import SideBar from '../../component/sidebar';
const Home  = (props) => {
  useEffect(() => {
    document.title = 'Dashboard'
  });
  return (
    <div>
      <SideBar></SideBar>
      {/* <Header breadcrumb={props.breadcrumb}/>
      <BgHeader/>
      <MarketData/>
      <LatestCommentaries/>
      <GotoSubscribe/>
      <Footer/> */}
    </div>
  );
}
export default Home;