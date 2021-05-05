// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { makeStyles, Input, Container, Button, Box } from "@material-ui/core";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 250,
        marginRight: 10,
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },

    inputWrap: {
        position: "relative",
    },
    input: {
        background: "#0a0a0a 0% 0% no-repeat padding-box",
        border: "1px solid #000000",
        opacity: 1,
        height: "54px",
        paddingLeft: "10px",
        color: "white",
        fontSize: "18px",
        borderRadius: "4px",
    },

    btnSubmit: {
        minWidth: 100,
        textTransform: "capitalize",
        fontWeight: 500,
        minHeight: 32,
    },
}));

// Section 5: Code Component
function SignIn({ handleSubmit, errors, register, onSubmit }) {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.inputWrap}>
                    <Input
                        noValidate
                        placeholder="user@alkemi.ai"
                        {...register("email")}
                        type="email"
                        fullWidth={true}
                        disableUnderline={true}
                        className={classes.input}
                    />
                    {errors && errors.email && (
                        <div>{errors.email.message}</div>
                    )}
                </div>

                <div className={classes.inputWrap}>
                    <Input
                        noValidate
                        placeholder="********"
                        {...register("password")}
                        type="password"
                        fullWidth={true}
                        disableUnderline={true}
                        className={classes.input}
                    />
                    {errors && errors.password && (
                        <div>{errors.password.message}</div>
                    )}
                </div>

                <Box mt={4}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.btnSubmit}
                        size="large"
                    >
                        Sign In
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

// Section 6: Documentation with PropTypes
SignIn.propTypes = {};

// Section 7:  Connect styles and export
export default SignIn;
