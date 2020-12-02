import React, { useState } from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useUser from "../hooks/useUser";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		overflow: "hidden",
		padding: theme.spacing(0, 3)
	},
	paper: {
		maxWidth: 400,
		margin: `${theme.spacing(1)}px auto`,
		padding: theme.spacing(2)
	}
}));

export default function ProfilePage(props) {
	const classes = useStyles();
	const { user, token } = useUser();
	const [file, setFile] = useState();

	if (!user) navigate("/signin");

	function onAvatarSubmit(e) {
		e.preventDefault();

		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		axios
			.patch("/api/users/avatar", formData, { headers: { "x-auth-token": token } })
			.then(({ data }) => console.log(data));
	}

	return (
		user && (
			<Layout>
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Grid container wrap="nowrap" spacing={2}>
							<Grid item>
								<Avatar src={user.avatar}>{user.avatar}</Avatar>
							</Grid>
							<Grid item xs zeroMinWidth>
								<Typography noWrap>{user.username}</Typography>
								<Typography noWrap>{user.email}</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs zeroMinWidth>
								<form onSubmit={e => onAvatarSubmit(e)} encType="multipart/form-data">
									<input
										type="file"
										name="avatar"
										id="avatar"
										accept=".jpg, .png, .jpg"
										onChange={e => setFile(e.target.files[0])}
									/>
									<Button variant="contained" type="submit">
										Change Avatar
									</Button>
								</form>
							</Grid>
						</Grid>
					</Paper>
				</div>
			</Layout>
		)
	);
}
