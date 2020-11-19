import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  homePage: {
    height: "100vh"
  },
  actionButtons: {
    marginTop: "10px",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.homePage}>
        <Grid container justify="flex-end" alignItems="center" direction="column">
          <Typography variant="h1">Kodning</Typography>
          <Typography variant="subtitle1">
            The central place for coders to thrive. Post something to your story
            to share with all your friends!
          </Typography>
          <Grid container justify="center" spacing={3} className={classes.actionButtons}>
            <Grid item>
              <Button variant="contained">Sign In</Button>
            </Grid>
            <Grid item>
              <Button variant="contained">Sign Up</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
