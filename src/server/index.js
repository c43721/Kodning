const express = require("express");
const os = require("os");

const app = express();
const { auth } = require('../api/auth');

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port http://localhost:${process.env.PORT || 8080}/!`)
);
