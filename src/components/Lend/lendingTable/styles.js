import { makeStyles, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) =>
  createStyles({
    tableLending:{
        color: 'white',
    },
    bg_title:{
        backgroundColor: '#202123',
        height: '55px',
        borderBottom: '1px solid #000000',
    },
    table_name:{
        letterSpacing: '0',
        color: '#FFFFFF',
        fontSize: '16px',
        padding: '15px 20px',
        fontWeight: '500',
    },
    add:{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '19px',
    },
    addAsset:{
        background: '#161719 0% 0% no-repeat padding-box!important',
        borderRadius: '100px!important',
        opacity: '1',
        width: '122px',
        height: '28px',
        paddingTop: '3px!important',
        paddingLeft: '12px',
        paddingRight: '12px',
        margin: '12px 0!important',
        color: 'white',
        textTransform: 'capitalize',
        fontSize: '14px',
        fontWeight: '400',
    },
    table:{
        color:'white!important',
        backgroundColor:'#202123',
        minWidth: '700'
    },
    table_row:{
        color: 'white!important',
    },
    imageSize:{
        width: '39px',
        height: '39px',
    },
    unit:{
        letterSpacing:'0.01px',
        color: '#FFFFFF',
        opacity: '1',
    },
    lastest:{
        display: 'flex',
        justifyContent: 'flex-end',
    },
    btnActive:{
        width: '122px',
        height: '32px',
        border: '1px solid #FFFFFF',
        borderRadius: '23px',
        opacity: '1',
        paddingTop:'5px',
    },

    btnActiveOutline:{
        width: '122px',
        height: '32px',
        borderRadius: '23px',
        opacity: '1',
        color:'white',
        border:'1px solid white',
        textTransform: 'capitalize',
        paddingTop: '4px'
    },

    tableCurrent: {
        paddingTop: '20px !important',
    },
    MuiTableHeadroot: {
        backgroundColor: '#ffffff',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: "#202123",
        color:  'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      chart: {
        maxHeight: 150,
      }


}));
export default styles;
