const express = require("express");
const checkAuth = require("../middleware/auth");
const router = express.Router();

router.use(checkAuth);

router.delete("/", async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user._id);

		res.status(204).json({ message: "Deleted" });
	} catch (err) {
		res.status(400).json({ error: "Could not delete" });
	}
});

module.exports = router;
