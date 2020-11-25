import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { Link as BrowserLink } from "@reach/router";
import Post from "../Components/Post";
import PostForm from "../Components/PostForm";

const useStyles = makeStyles(theme => ({}));

export default function Feed({ onSubmit }) {
  const classes = useStyles();

  return (
    <Layout>
      <Container>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          direction="column">
          <PostForm onSubmit={onSubmit} />
          <Post />
          <Post />
          <Post />
        </Grid>
      </Container>
    </Layout>
  );
}
