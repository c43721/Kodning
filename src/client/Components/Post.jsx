import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    borderRadius: "20px",
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: "20px",
  },
  avatar: {
    backgroundColor: red[500],
  },
  likeBtnOutline: {
    color: "#000abf",
  },
  span: {
    fontSize: "17px",
    paddingLeft: "4px",
  },
}));

export default function Post() {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(0);

  const likeButton = e => {
    e.preventDefault();
    setLike(like + 1);
    console.log("clicked");
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>R{/* {user.length[0]} */}</Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title={user}
        // subheader={date}
      />
      <CardMedia className={classes.media} image="" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          blog post
          {/* {content} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={likeButton} className={classes.likeBtnOutline}>
          <FavoriteBorderIcon />
          <span className={classes.span}>{like}</span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
