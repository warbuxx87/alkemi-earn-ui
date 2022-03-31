import React from "react";
import { useTheme } from "@mui/material/styles";
import withStyles from "@mui/styles/withStyles";
import { Box, Container, Typography, Button } from "@mui/material";
import image from "assets/images/404.svg";
// import { darkTheme } from "themes/theme";

const styles = (theme) => ({
    root: {
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingTop: 120,
        paddingBottom: 80,
    },
    image: {
        maxWidth: "100%",
        maxHeight: 300,
        height: "auto",
    },
});
function ErrorFallback({ error, classes }) {
    const refreshHandler = (e) => {
        e.preventDefault();

        window.location.reload();
    };
    const theme = useTheme();
    const GlobalCss = withStyles({
        "@global": {
            "html, body": {
                margin: 0,
                padding: 0,
                height: "100%",
                backgroundColor: theme.palette.background.dark,
            },
        },
    })(() => null);

    return (
        <div className={classes.root}>
            <GlobalCss />
            <Container maxWidth="lg">
                <Box mb={2}>
                    <Typography variant="h2" align="center" color="textPrimary">
                        Oh no! Something Went Wrong
                    </Typography>
                </Box>
                <Typography align="center" variant="h4" color="textSecondary">
                    {error.message}
                </Typography>
                <Box mt={6} display="flex" justifyContent="center">
                    <img alt="Error" className={classes.image} src={image} />
                </Box>
                <Box mt={6} display="flex" justifyContent="center">
                    <Button
                        color="secondary"
                        to="/"
                        variant="outlined"
                        onClick={refreshHandler}
                    >
                        Back to home
                    </Button>
                </Box>
            </Container>
        </div>
    );
}

export default withStyles(styles)(ErrorFallback);
