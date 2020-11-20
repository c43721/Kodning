const express = require("express");

const app = express();
const AuthRoute = require("./routes/auth");

app.use(express.static("dist"));

app.all("*", (req, res) => {
	res.send("This is from the ALL route");
});

app.use("/auth", AuthRoute);

app.listen(process.env.PORT || 8080, () =>
	console.log(`Listening on port http://localhost:${process.env.PORT || 8080}/!`)
);
