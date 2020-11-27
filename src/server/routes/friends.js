const express = require("express");
const checkAuth = require("../middleware/auth");
const { User, FriendStatus } = require("../models/user");
const router = express.Router();

/**
 * Get all friends from a username
 * @param {String} username
 * @returns {Array<Object>} friends
 */
async function getAcceptedFriendsFromUser(username) {
	const userModel = await findUserByUsername(username);
	return userModel.friends.filter(friend => friend.status === FriendStatus.ACCEPTED);
}

router.get("/allUsers", async (req, res) => {
	const users = await User.find();

	res.json(users);
});

//All routes need to be auth'd
router.use(checkAuth);

/**
 * Adds a friend
 * @param {String} requester
 * @param {String} recipiant
 */
router.post("/", async (req, res) => {
	const requester = req.user._id;
	const { recipiant } = req.body;

	if (!requester || !recipiant)
		return res.status(400).json({ error: "No requester or recipiant in body" });

	if (requester === recipiant)
		return res.status(400).json({ error: "You cannot friend yourself!" });

	const [requesterDoc, recipiantDoc] = await Promise.all([
		User.findById(requester),
		User.findById(recipiant)
	]);

	if (!requesterDoc || !recipiantDoc)
		return res.status(400).json({ error: "Could not find the requested or recipiant in DB." });

	const [{ friends: requestorFriends }, { friends: recipiantFriends }] = await Promise.all([
		User.findById(requester).select({ friends: 1 }),
		User.findById(recipiant).select({ friends: 1 })
	]);

	const didRequesterHaveRecipiant = requestorFriends.filter(
		friend => friend.username === recipiant
	);
	const didRecipiantHaveRequestor = recipiantFriends.filter(
		friend => friend.username === requester
	);

	if (!didRequesterHaveRecipiant.length && !didRecipiantHaveRequestor.length) {
		requesterDoc.friends.push({
			username: recipiant,
			status: FriendStatus.REQUESTED
		});

		recipiantDoc.friends.push({
			username: requester,
			status: FriendStatus.PENDING
		});

		await Promise.all([requesterDoc.save(), recipiantDoc.save()]);
	}

	// let requesterStatus = requesterModel.friends[requesterIndex].status;
	// let recipiantStatus = recipiantModel.friends[recipiantIndex].status;

	// if (requesterStatus === FriendStatus.PENDING && recipiantStatus === FriendStatus.REQUESTED) {
	// 	requesterStatus = FriendStatus.ACCEPTED;
	// 	recipiantStatus = FriendStatus.ACCEPTED;
	// } else {
	// 	requesterStatus = FriendStatus.PENDING;
	// 	recipiantStatus = FriendStatus.REQUESTED;
	// }

	// await Promise.all([requesterModel.save(), recipiantModel.save()]);

	res.status(200).json({ requestorFriends, recipiantFriends });
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
