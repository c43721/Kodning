const express = require("express");
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

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

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.use("/api/auth", AuthRoute);

app.all("*", (req, res) => {
	res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});

app.listen(process.env.PORT || 8080, () =>
	console.log(`Listening on port http://localhost:${process.env.PORT || 8080}/!`)
);
