import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    ButtonBase,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Popover,
    Typography,
} from "@material-ui/core";
import { usePopover } from "../../hooks/usePopover";
import { Selector as SelectorIcon } from "../UI/Icons/selector";
import Verified from "@material-ui/icons/VerifiedUser";
import Open from "@material-ui/icons/Public";

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: "4px",
        backgroundColor: "#23252a",
        display: "flex",
        padding: "8px 8px 8px 8px",
        width: "100%",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
        },
    },
    popover: {
        "& .MuiPopover-paper": {
            width: "268px !important",
        },
    },
    avatar: {
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        marginRight: "12px",
        width: "36px",
        height: "36px",
    },
    avatarbox: {
        "& img": {
            width: "100%",
        },
    },
    selecttext: {
        fontSize: "40px !important",
    },
}));

const poolsIcons = {
    permissioned: <Verified color="secondary" fontSize="small" />,
    open: <Open color="secondary" fontSize="small" />,
};

// const poolsIcons = (id) => {
//     switch(id) {
//     case "permissioned":
//         return  <CloudIcon />;
//     case "open":
//         return <img src={logo} />;
//     default:
//         return <CloudIcon />;
//     }
// }

export const PoolPopover = (props) => {
    const { selectedPool, pools, onPoolChange } = props;
    const [anchorRef, open, handleOpen, handleClose] = usePopover();

    const handlePoolChange = (poolId) => {
        handleClose();
        onPoolChange?.(poolId);
    };

    const classes = useStyles();

    return (
        <>
            <ButtonBase
                onClick={handleOpen}
                ref={anchorRef}
                className={classes.button}
            >
                <Avatar variant="rounded" className={classes.avatar}>
                    <Box display="flex" className={classes.avatarbox}>
                        {poolsIcons[selectedPool.id]}
                    </Box>
                </Avatar>
                <Typography color="textPrimary" variant="subtitle2">
                    {selectedPool.name}
                </Typography>
                <Box flexGrow="1" />
                <SelectorIcon fontSize="small" />
            </ButtonBase>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                }}
                transformOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                }}
                keepMounted
                onClose={handleClose}
                open={open}
                elevation={4}
                className={classes.popover}
            >
                <List>
                    {pools.map((pool) => (
                        <ListItem
                            key={pool.id}
                            button
                            selected={pool.id === selectedPool.id}
                            onClick={() => handlePoolChange(pool.id)}
                        >
                            <Avatar
                                variant="rounded"
                                className={classes.avatar}
                            >
                                <Box
                                    display="flex"
                                    className={classes.avatarimg}
                                >
                                    {poolsIcons[pool.id]}
                                </Box>
                            </Avatar>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography variant="subtitle2">
                                        {pool.name}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </>
    );
};

PoolPopover.propTypes = {
    selectedPool: PropTypes.object.isRequired,
    onPoolChange: PropTypes.func,
    pools: PropTypes.array.isRequired,
};
