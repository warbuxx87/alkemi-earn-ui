import { makeStyles, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) =>
  createStyles({
    borrowing:{
        color: 'white',
    },    
    box:{
        textAlign: 'center',
    },
    info_box:{
        backgroundColor: '#202123',
    },
    title:{
        padding: '15px 0',
        fontSize: '16px',
        color:'white',
    },
    divider:{
        background: '#000000!important',
    },
    valuable:{
        padding: '24px 0',
        fontSize: '30px',
        letterSpacing: '0',
        color: '#FFFFFF',
        opacity: '1',
    },
    tableCurrent:{
        color: 'white',
        paddingTop: '30px',
    },
    bg_title:{
        backgroundColor: '#202123',
        height: '55px',
        borderBottom: '1px solid #000000',
    },
    table_name:{
        letterSpacing: '0',
        color: '#FFFFFF',
        opacity: '0',
        fontSize: '16px',
        padding: '15px 20px',
    },
    add:{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '60px',
    },
    addAsset:{
        background: '#000000 0% 0% no-repeat padding-box',
        borderRadius: '100px',
        opacity: '0.3',
        width: '122px',
        height: '32px',
        paddingTop: '6px',
        paddingLeft: '20px',
        margin: '12px 0',
    }
    
  })
);
export default styles;