import React, { useState, useEffect, useRef } from "react";
import Layout from "../Components/Layout";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function FriendsPage(props) {
  const [friends, setFriends] = useState();
  const [refreshFriends, setRefreshFriends] = useState(true);
  const usernameRef = useRef();
  console.log(friends);

  function deleteFriend(user) {
    axios
      .post("/api/friends/delete", {
        recipiant: user,
      })
      .then(function ({ data }) {
        setRefreshFriends(!refreshFriends);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addFriend(user) {
    axios
      .post("/api/friends", {
        recipiant: user,
      })
      .then(function ({ data }) {
        setRefreshFriends(!refreshFriends);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addFriendByUsername(user) {
    axios
      .post("/api/friends/username", {
        recipiant: user,
      })
      .then(function ({ data }) {
        setRefreshFriends(!refreshFriends);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get("/api/friends")
      .then(function ({ data }) {
        setFriends(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refreshFriends]);

  return (
    <Layout>
      <Grid container>
        <Grid item>
          <input ref={usernameRef} placeholder="Add friend" />
          <button
            onClick={() => addFriendByUsername(usernameRef.current.value)}
          >
            Add Friend By Username
          </button>
        </Grid>
        {friends ? (
          <>
            {friends.friends.map((friend) => (
              <Friend
                key={friend._id}
                deleteFriend={deleteFriend}
                {...friend}
              />
            ))}
            {friends.requests.map((friend) => (
              <Requests
                key={friend._id}
                deleteFriend={deleteFriend}
                addFriend={addFriend}
                {...friend}
              />
            ))}
          </>
        ) : (
          <Grid item>No friends</Grid>
        )}
      </Grid>
    </Layout>
  );
}

function Friend(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <Grid item>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.username}
          </Typography>
          <Typography variant="body2" component="p">
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => props.deleteFriend(props._id)}>
            {" "}
            Cancel Friend{" "}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

function Requests(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <Grid item>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.username}
          </Typography>
          <Typography variant="body2" component="p">
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => props.deleteFriend(props._id)}>
            Cancel Friend{" "}
          </Button>
          <Button size="small" onClick={() => props.addFriend(props._id)}>
            {" "}
            Accept Friend{" "}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
