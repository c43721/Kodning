import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core/";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { set } from "mongoose";
import { kMaxLength } from "buffer";

const useStyles = makeStyles(theme => ({
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#000abf",
    color: "white",
    borderRadius: "20px",
    marginBottom: theme.spacing(4),
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: theme.spacing(2, 0, 2, 0),
    minWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      width: "20%",
    },
  },
  icons: {
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: theme.spacing(2),
    color: "#8600BF",
  },
}));

export default function MultilineTextFields({ onSubmit }) {
  const classes = useStyles();

  const CHARACTER_LIMIT = 140;
  const [values, setValues] = React.useState({
    character: "",
  });

  const handleChange = character => event => {
    setValues({ ...values, [character]: event.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <form onSubmit={submitHandler}>
          <Grid container className={classes.form}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={5}
              placeholder="Hello World!"
              variant="outlined"
              inputProps={{
                maxlength: CHARACTER_LIMIT,
              }}
              value={values.character}
              helperText={`${values.character.length}/${CHARACTER_LIMIT}`}
              onChange={handleChange("character")}
              value={values.character}
            />
            <Grid item className={classes.icons}>
              <AddToPhotosIcon />
              <VideoLibraryIcon />
            </Grid>
            <Button className={classes.button}>Post</Button>
          </Grid>
        </form>
      </div>
    </form>
  );
}
