import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../Components/Post";
import PostForm from "../Components/PostForm";
import axios from "axios";

const useStyles = makeStyles(theme => ({}));

export default function Feed() {
  const classes = useStyles();
  const [post, setPost] = useState(null);

  const onPostHandler = () => {
    axios
      .post("/api/posts", {
        content: "",
      })
      .then(response => {
        setPost(response);
        console.log(response);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <Layout>
      <Container>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          direction="column">
          <PostForm onPostSubmit={onPostHandler} />
          <Post />
        </Grid>
      </Container>
    </Layout>
  );
}
