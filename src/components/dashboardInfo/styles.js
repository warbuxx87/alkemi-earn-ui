import { makeStyles, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) =>
  createStyles({
    lending:{
        color: 'white',
    },
    box_portfolio:{
        borderBottom:'2px solid orange'
    },
    box_loans:{
        borderBottom:'2px solid #F90055'
    },
    box_deposits:{
        borderBottom:'2px solid lightgreen'
    },
    info_box:{
        backgroundColor: '#202123',
    },
    title:{
        padding: '15px 0 15px 18px',
        fontSize: '16px',
        color:'white',
        fontWeight: '500',
    },
    divider:{
        background: '#000000!important',
    },
    nameValueable:{
        paddingLeft:'18px',
        paddingTop:'18px',
        color: '#FFFFFF',
        opacity:'0.6',
        fontSize: '12px',
    },
    valuable:{
        padding: '4px 0 4px 18px',
        fontSize: '28px',
        letterSpacing: '0',
        color: '#FFFFFF',
        opacity: '1',
    },
    change:{
        textAlign:'right',
        paddingRight:'18px',
        fontSize: '28px',
        letterSpacing: '0',
        color: '#FFFFFF',
        opacity: '1',
    },
    nameChange:{
        paddingTop:'18px',
        fontSize: '12px',
        color: '#FFFFFF',
        opacity:'0.6',
        textAlign:'right',
        padding: '4px 19px 4px 0px',

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
