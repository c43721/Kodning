import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import moment from "moment";
import useUser from "../hooks/useUser";
import DeleteForever from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 500,
		width: "100%",
		borderRadius: "20px",
		marginBottom: theme.spacing(2)
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
		borderRadius: "20px"
	},
	avatar: {
		backgroundColor: red[500]
	},
	likeBtnOutline: {
		color: "#000abf"
	},
	span: {
		fontSize: "17px",
		paddingLeft: "4px"
	}
}));

export default function Post(props) {
	const classes = useStyles();
	const { user } = useUser();

	const isOwnPost = user._id === props.user;
	
	return (
		<Card className={classes.root}>
			<CardHeader
				title={props.authorData.username}
				subheader={moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}
				avatar={
					<Avatar
						src={props.authorData.avatar.length > 2 ? `data:image/png;base64,${props.authorData.avatar}` : props.authorData.avatar}
						className={classes.avatar}
					>
						{props.authorData.avatar.length > 2 ? `data:image/png;base64,${props.authorData.avatar}` : props.authorData.avatar}
					</Avatar>
				}
				action={
					isOwnPost && (
						<IconButton aria-label="settings" onClick={() => props.deletePost(props._id)}>
							<DeleteForever />
						</IconButton>
					)
				}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.content}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton onClick={() => props.likePost(props._id)} className={classes.likeBtnOutline}>
					<FavoriteBorderIcon />
					<span className={classes.span}>{props.likes.length}</span>
				</IconButton>
			</CardActions>
		</Card>
	);
}
