const express = require("express");
const checkAuth = require("../middleware/auth");
const { User, FriendStatus } = require("../models/user");
const router = express.Router();

/**
 * Get a user by Username
 * @param {Model<User>} usernameToFind
 */
async function findUserByUsername(usernameToFind) {
	return await User.findOne({
		username: usernameToFind
	});
}

/**
 * Get all friends from a username
 * @param {String} username
 * @returns {Array<Object>} friends
 */
async function getAcceptedFriendsFromUser(username) {
	const userModel = await findUserByUsername(username);
	return userModel.friends.filter(friend => friend.status === FriendStatus.ACCEPTED);
}

//All routes need to be auth'd
router.use(checkAuth);

/**
 * Adds a friend
 * @param {String} requester
 * @param {String} recipiant
 */
router.post("/", async (req, res) => {
	const requesterName = req.user.username;
	const { recipiantName } = req.body;

	if (!requesterName || !recipiantName)
		return res.status(400).json({ error: "No requester or recipiant in body" });

	const [requester, recipiant] = await Promise.all([
		findUserByUsername(requesterName),
		findUserByUsername(recipiantName)
	]);

	if (!requester || !recipiant)
		return res.status(400).json({ error: "Could not find the requested or recipiant in DB." });

	const requesterStatus = requester.friends[recipiantName].status;
	const recipiantStatus = recipiant.friends[requesterName].status;

	if (requesterStatus === FriendStatus.REQUESTED && recipiantStatus === FriendStatus.PENDING) {
		requesterStatus = FriendStatus.ACCEPTED;
		recipiantStatus = FriendStatus.ACCEPTED;
	} else {
		requesterStatus = FriendStatus.PENDING;
		recipiantStatus = FriendStatus.REQUESTED;
	}

	await Promise.all([requester.save(), recipiant.save()]);

	res.status(200).send({ requester: requesterStatus, recipiant: recipiantStatus });
});

/**
 * Deletes a friend from both requester and recipiant
 * @param {String} requester
 * @param {String} recipiant
 */
router.post("/delete", async (req, res) => {
	const requesterName = req.user.username;
	const { recipiantName } = req.body;

	if (!requesterName || !recipiantName)
		return res.status(400).json({ error: "No requester or recipiant in body" });

	const [requester, recipiant] = await Promise.all([
		findUserByUsername(requesterName),
		findUserByUsername(recipiantName)
	]);

	if (
		requester.friends[recipiantName] !== FriendStatus.ACCEPTED &&
		recipiant.friends[requesterName] !== FriendStatus.ACCEPTED
	)
		return res.status(403).json({ error: "You cannot delete a friend you don't have!" });

	delete requester.friends[recipiantName];
	delete recipiant.friends[requesterName];

	await Promise.all([requester.save(), recipiant.save()]);
});

module.exports = router;
module.exports.getAcceptedFriendsFromUser = getAcceptedFriendsFromUser;
module.exports.findUserByUsername = findUserByUsername;
