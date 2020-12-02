import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import Post from "../Components/Post";
import PostForm from "../Components/PostForm";

export default function Feed() {
  const classes = useStyles();

  const [post, setPost] = useState();
  const [refreshPost, setRefreshPost] = useState(true);
  const postRef = useRef();
  const { token } = useUser();

  function addPost(post) {
    axios
      .post("/api/posts", {
        content: post,
      })
      .then(function ({ data }) {
        setRefreshPost(!refreshPost);
      });
  }

  function deletePost(post) {
    axios
      .post("/api/posts/:id", {
        content: post,
      })
      .then(function ({ data }) {
        setRefreshPost(!refreshPost);
      });
  }

  function addLikes(like) {
    axios
      .put("/likes/:post_id", {
        user: like,
      })
      .then(function ({ data }) {
        setRefreshPost(!refreshPost);
      });
  }

  useEffect(() => {
    axios.get("/api/posts").then(function ({ data }) {
      setPost(data);
    });
  }, [refreshPost]);

  return (
    <Layout>
      <Container>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          direction="column">
          <PostForm onPostSubmit={addPost} />
          <Post addLike={addLikes} />
        </Grid>
      </Container>
    </Layout>
  );
}
