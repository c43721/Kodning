import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../Components/Post";
import PostForm from "../Components/PostForm";

const useStyles = makeStyles(theme => ({}));

export default function Feed({ onFormSubmit }) {
  const classes = useStyles();

  return (
    <Layout>
      <Container>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          direction="column">
          <PostForm />
          <Post />
        </Grid>
      </Container>
    </Layout>
  );
}
