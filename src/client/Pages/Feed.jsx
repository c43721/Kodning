import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Post from "../Components/Post";
import PostForm from "../Components/PostForm";
import useUser from "../hooks/useUser";
import axios from "axios";
import { navigate } from "@reach/router";

export default function Feed() {
	const [posts, setPosts] = useState([]);
	const [refreshPost, setRefreshPost] = useState(true);

	const { token, user } = useUser();

	if (!user) navigate("/signin");

	function addPost({ character }) {
		axios
			.post("/api/posts", { content: character }, { headers: { "x-auth-token": token } })
			.then(() => setRefreshPost(!refreshPost));
	}

	function deletePost(postId) {
		axios
			.delete(`/api/posts/${postId}`, { headers: { "x-auth-token": token } })
			.then(() => setRefreshPost(!refreshPost));
	}

	function likePost(postId) {
		axios
			.put(`/api/posts/likes/${postId}`, {}, { headers: { "x-auth-token": token } })
			.then(() => setRefreshPost(!refreshPost));
	}

	useEffect(() => {
		axios
			.get("/api/posts", { headers: { "x-auth-token": token } })
			.then(({ data }) => setPosts(data))
			.catch(err => console.log(err));
	}, [refreshPost]);

	return (
		user && (
			<Layout>
				<Container>
					<Grid container justify="flex-end" alignItems="center" direction="column">
						<PostForm onPostSubmit={addPost} />
						{posts.length > 0 &&
							posts.map(post => (
								<Post key={post._id} likePost={likePost} deletePost={deletePost} {...post} />
							))}
					</Grid>
				</Container>
			</Layout>
		)
	);
}
