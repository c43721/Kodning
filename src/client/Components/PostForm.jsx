import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core/";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
	button: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "#000abf",
		color: "white",
		borderRadius: "20px",
		marginBottom: theme.spacing(4),
		width: "500px",
		[theme.breakpoints.down("xs")]: {
			width: "100%"
		}
	},
	postBox: {
		display: "flex",
		alignItem: "flex-start",
		marginTop: theme.spacing(2)
	},
	icons: {
		display: "flex",
		flexDirection: "row-reverse",
		marginBottom: theme.spacing(2),
		color: "#8600BF"
	},
	postAvatar: {
		marginRight: theme.spacing(2)
	},
	form: {
		width: "500px",
		[theme.breakpoints.down("xs")]: {
			width: "100%"
		},
		borderBottom: "1px solid rgba(0,0,0,0.2)",
		marginBottom: theme.spacing(4)
	}
}));

export default function PostForm({ onPostSubmit }) {
	const classes = useStyles();

	const CHARACTER_LIMIT = 140;

	const [values, setValues] = useState({
		character: ""
	});

	const handleChange = character => event => {
		setValues({ ...values, [character]: event.target.value });
	};

	return (
		<div>
			<form className={classes.form}>
				<div className={classes.postBox}>
					<Avatar className={classes.postAvatar} />
					<TextField
						id="outlined-multiline-static"
						multiline
						rows={5}
						placeholder="Hello World!"
						variant="outlined"
						inputProps={{
							maxlength: CHARACTER_LIMIT
						}}
						value={values.character}
						helperText={`${values.character.length}/${CHARACTER_LIMIT}`}
						onChange={handleChange("character")}
						value={values.character}
						fullWidth
					/>
				</div>
				<div item className={classes.icons}>
					<AddToPhotosIcon />
					<VideoLibraryIcon />
				</div>
				<Button className={classes.button} onClick={() => onPostSubmit(values)}>
					Post
				</Button>
			</form>
		</div>
	);
}
