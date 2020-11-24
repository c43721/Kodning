import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { Link as BrowserLink } from "@reach/router";
import Card from "../Components/Card";
import TextField from "../Components/TextField";

const useStyles = makeStyles(theme => ({
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

export default function Feed() {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.homePage}>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          direction="column">
          <TextField />
          <Card />
        </Grid>
      </Container>
    </Layout>
  );
}
