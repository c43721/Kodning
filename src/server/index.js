const express = require("express");
const cors = require("cors");

const app = express();

//ROUTES
const AuthRoute = require("./routes/auth");

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRoute);

app.all("*", (req, res) => {
	res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});

app.listen(process.env.PORT || 8080, () =>
	console.log(`Listening on port http://localhost:${process.env.PORT || 8080}/!`)
);
