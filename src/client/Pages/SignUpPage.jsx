import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as BrowserLink } from "@reach/router";
import { CardMedia, Card } from "@material-ui/core";
import Image from "../Image/coding-image.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Kodning
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  forms: {
    width: "100",
    margin: theme.spacing(2, 0, 2, 0),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  container: {
    backgroundColor: "#85DBCB",
    position: "absolute",
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100%",
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.image} xs={false} sm={6} />
      <Grid item xs="12" sm="6">
        <div>
          <Typography component="h1" variant="h5" className={classes.forms}>
            Sign up
          </Typography>
          <form noValidate>
            <Grid>
              <Grid className={classes.forms}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid className={classes.forms}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item className={classes.forms}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item className={classes.forms}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item className={classes.forms}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confrim Password"
                  type="confirmPassword"
                  id="confirmPassword"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
