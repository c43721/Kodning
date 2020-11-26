import React from "react";
import Layout from "../Components/Layout";
import Grid from "@material-ui/core/Grid";

export default function FriendsPage(props) {
	const friendArray = [
		{
			name: "1"
		}
	];

	return (
		<Layout>
			{friendArray.length ? (
				<div className="friendsCenter">
					{friendArray.map(friend => (
						<Friend {...friend} />
					))}
				</div>
			) : (
				<p>No friends</p>
			)}
		</Layout>
	);
}

function Friend(props) {
	return <Grid container>{props.name}</Grid>;
}
