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
import { CustomCube as CloudIcon } from "components/UI/Icons/custom-cube";
import logo from "assets/images/logo-white.svg";

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: "4px",
        display: "flex",
        padding: "12px 8px 12px 12px",
        width: "100%",
        border: "1px solid rgba(255, 255, 255, 0.10)",
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
}));

const poolsIcons = {
    permissioned: <CloudIcon />,
    open: <img src={logo} alt="" />,
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
                <Typography color="textPrimary" variant="body1">
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
                            <ListItemText primary={pool.name} />
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
