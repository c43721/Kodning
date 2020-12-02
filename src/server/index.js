const express = require("express");
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const http = require("http");
const sio = require("socket.io");

const fileUpload = require("express-fileupload");

const app = express();
const server = http.createServer(app);
const io = sio(server);

//Connect to mongodb
try {
	mongoose
		.connect(config.get("mongoURI"), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => console.log("Connected to MongoDB."));
} catch (err) {
	console.log(`Could not connect to MongoDB.\nError: ${err}`);
	process.exit(24);
}

//ROUTES
const AuthRoute = require("./routes/auth");
const PostRoute = require("./routes/posts");
const FriendRoute = require("./routes/friends");
const UserRoute = require("./routes/user");

app.use(express.static("dist"));
app.use(cors());
app.use(fileUpload());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", AuthRoute);
app.use("/api/posts", PostRoute);
app.use("/api/friends", FriendRoute);
app.use("/api/users", UserRoute);

app.all("*", (req, res) => {
	res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});

server.listen(process.env.PORT || 8080, () =>
	console.log(`Listening on port http://localhost:${process.env.PORT || 8080}/!`)
);

const ioUser = io.of("/user");

const authSocket = socket => {
	socket.use(_, next => {
		next();
	});
};

ioUser.on("connection", socket => {
	authSocket();
});
