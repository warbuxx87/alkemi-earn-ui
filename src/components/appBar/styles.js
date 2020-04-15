import { makeStyles, createStyles } from '@material-ui/core/styles';

const drawerWidth = 339 + 35 * 2;

const styles = makeStyles(() =>
  createStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    // backgroundColor:'white',
    boxShadow:'none',
    backgroundColor:'#000000',
    paddingTop:'22px',
    paddingRight: 40
  },
  // necessary for content to be below app bar
  toolbar:{
    padding:'24px 19px',
  },
  image:{
    width:'163px',
    height:'27px',
  },
  divider:{
    backgroundColor:'#000000',
  },
  menuList:{
    padding:'24px 0 24px 0px'
  },
  menuItem:{
    backgroundColor:'#161719',
    borderLeft:'3px solid #FFFFFF',
    opacity: 1,
  },
  menuItemText:{
    paddingLeft:'4px',
    textTransform: 'capitalize',
    opacity: 1,
    //font: Regular 16px/21px Roboto;
    fontFamily:'Regular,Roboto',
    fontSize:'10px'
  },
  status:{
    background: 'green',
    width: '9px',
    height: '9px',
    borderRadius : '5px',
    marginRight:'8px'
  },
  number:{
    textAlign:'right',
    width:'50%',
    fontWeight:'500',
    paddingRight:'4px',
  },
  unit:{
    width:'50%',
  },
  overview:{
    letterSpacing: 0,
    color: '#6F7278',
    opacity: 1,
    fontSize:'14px',
  },
  current:{
    color: '#FFFFFF',
    fontSize:'26px',
    fontWeight:'bolder'
  },
  headerLeft:{
    paddingTop:'10px',
  },
  borderNoti:{
    display:'flex',
    width: '168px',
    height: '36px',
    justifyContent:'center',
    border: '1px solid #FFFFFF',
    borderRadius: '100px',
    opacity: '1',
    marginTop:'25px',
  },

  bell:{
    paddingTop: '32px',
    paddingRight: '15px',
  },
  statusBadge:{
    background: 'green',
    width: '9px',
    height: '9px',
    borderRadius : '5px',
    marginRight:'12px'
  },

  btnActiveOutline:{
    display:'flex',
    width: '150px',
    height: '36px',
    justifyContent:'center',
    border: '1px solid #FFFFFF',
    borderRadius: '100px',
    opacity: '1',
    marginTop:'25px',
    color: 'white',
  },

  notification:{
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '5px',
  },
}));
export default styles;
