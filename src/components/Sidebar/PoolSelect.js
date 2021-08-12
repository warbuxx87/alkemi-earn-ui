import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    ButtonBase,
    List,
    MenuItem,
    ListItemText,
    makeStyles,
    Popover,
    Typography,
} from "@material-ui/core";
import { usePopover } from "../../hooks/usePopover";
import { Selector as SelectorIcon } from "../UI/Icons/selector";
import { CustomCube as CloudIcon } from "../UI/Icons/custom-cube";

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
            width: "252px !important",
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

export const PoolPopover = (props) => {
    const { currentPool, pools, onPoolChange, sx, ...other } = props;
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
                        <img alt={pools.name} src={pools.icon} />
                    </Box>
                </Avatar>
                <Typography color="textPrimary" variant="body1">
                    {currentPool.name}
                </Typography>
                <Box flexGrow="1" />
                <SelectorIcon fontSize="small" />
            </ButtonBase>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "top",
                }}
                keepMounted
                onClose={handleClose}
                open={open}
                elevation={4}
                className={classes.popover}
            >
                <List>
                    {pools.map((pool) => (
                        <MenuItem
                            key={pool.id}
                            button
                            selected={pool.id === currentPool.id}
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
                                    <img alt={pools.name} src={pools.icon} />
                                </Box>
                            </Avatar>
                            <ListItemText primary={pool.name} />
                        </MenuItem>
                    ))}
                </List>
            </Popover>
        </>
    );
};

PoolPopover.propTypes = {
    currentPool: PropTypes.object.isRequired,
    onPoolChange: PropTypes.func,
    pools: PropTypes.array.isRequired,
};
