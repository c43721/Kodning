import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core/";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      width: "500px",
    },
  },
  button: {
    display: "flex",
    justifyContent: "center",
    width: "500px",
    backgroundColor: "#000abf",
    color: "white",
    borderRadius: "20px",
    marginBottom: theme.spacing(4),
  },
  textbox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: theme.spacing(2, 0, 2, 0),
  },
  icons: {
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: theme.spacing(2),
    color: "#8600BF",
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();

  const CHARACTER_LIMIT = 140;
  const [count, setCount] = useState(0);

  const handleChange = () => {
    if (count >= 140) {
      return;
    } else {
      setCount(count + 1);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <Grid container className={classes.textbox}>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={5}
            placeholder="Hello World!"
            variant="outlined"
            onChange={event => handleChange(event.target.value.length)}
            helperText={`${count.length}/${CHARACTER_LIMIT}`}
          />
          <Grid container className={classes.icons}>
            <AddToPhotosIcon />
            <VideoLibraryIcon />
          </Grid>
          <Button className={classes.button}>Post</Button>
        </Grid>
      </div>
    </form>
  );
}
