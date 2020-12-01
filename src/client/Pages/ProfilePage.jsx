import React from "react";
import Layout from "../Components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useUser from "../hooks/useUser";

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
  const { user } = useUser();
  
	return (
		<Layout>
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Grid container wrap="nowrap" spacing={2}>
						<Grid item>
							<Avatar> W </Avatar>
						</Grid>
						<Grid item xs zeroMinWidth>
							<Typography noWrap>{user.username}</Typography>
							<Typography noWrap>{user.email}</Typography>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</Layout>
	);
}
