import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { Link as BrowserLink } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  homePage: {
    height: "100%",
  },
  actionButtons: {
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.homePage}>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          direction="column"
        >
          <Typography variant="h1">Kodning</Typography>
          <Typography variant="subtitle1">
            The central place for coders to thrive. Post something to your story
            to share with all your friends!
          </Typography>
          <Grid
            container
            justify="center"
            spacing={3}
            className={classes.actionButtons}
          >
            <Grid item>
              <BrowserLink to="/sign__in__page" className={classes.link}>
                <Button variant="contained">Sign In</Button>
              </BrowserLink>
            </Grid>
            <Grid item>
              <BrowserLink to="/test" className={classes.link}>
                <Button variant="contained">Sign Up</Button>
              </BrowserLink>
              </Grid>
              <Grid item>
              <BrowserLink to="/friends" className={classes.link}>
                <Button variant="contained">My Friends</Button>
              </BrowserLink>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
