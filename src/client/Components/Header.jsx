import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useUser from "../hooks/useUser";
import { Link } from "@reach/router";
import Logo from "../Image/KODNING_LOGO.png";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	buttonText: {
		color: "#FFF"
	},
	title: {
		flexGrow: 1
	},
	link: {
		textDecoration: "none"
	},
	menuLink: {
		textDecoration: "none",
		color: "#000"
	}
}));

export default function Header() {
	const [anchorEl, setAnchorEl] = useState(null);
	const { user, setToken } = useUser();

	const handleMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		setAnchorEl(null);
		setToken(null);
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
					<img src={Logo} className={classes.logo} />
					</Typography>
					{!user ? (
						<Link to="/signin" className={classes.link}>
							<Button variant="text" className={classes.buttonText}>
								Login
							</Button>
						</Link>
					) : (
						<>
							<Button
								aria-controls="simple-menu"
								aria-haspopup="true"
								variant="contained"
								onClick={handleMenuOpen}
							>
								Account
							</Button>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
							>
								<MenuItem>
									<Link to="/" className={classes.menuLink}>
										Home
									</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/profile" className={classes.menuLink}>
										View Profile
									</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/friends" className={classes.menuLink}>
										Friends
									</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/feed" className={classes.menuLink}>
										Feed
									</Link>
								</MenuItem>
								<MenuItem onClick={() => logoutHandler()}>Logout</MenuItem>
							</Menu>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
