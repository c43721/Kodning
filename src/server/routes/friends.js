const express = require("express");
const checkAuth = require("../middleware/auth");
const { User, FriendStatus } = require("../models/user");
const router = express.Router();

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

	const [{ friends: requesterFriends }, { friends: recipiantFriends }] = await Promise.all([
		User.findById(requester).select({ friends: 1 }),
		User.findById(recipiant).select({ friends: 1 })
	]);

	const didRequesterHaveRecipiant = requesterFriends.has(recipiant);
	const didRecipiantHaveRequestor = recipiantFriends.has(requester);

	if (!didRequesterHaveRecipiant && !didRecipiantHaveRequestor) {
		requesterDoc.friends.set(recipiant, FriendStatus.REQUESTED);
		recipiantDoc.friends.set(requester, FriendStatus.PENDING);

		await Promise.all([requesterDoc.save(), recipiantDoc.save()]);
	}

	const requesterGetRecipiant = requesterFriends.get(recipiant);
	const recipiantGetRequester = recipiantFriends.get(requester);

	if (
		requesterGetRecipiant === FriendStatus.ACCEPTED &&
		recipiantGetRequester === FriendStatus.ACCEPTED
	)
		return res.status(400).json({ error: "You're already friends!" });

	if (requesterGetRecipiant === FriendStatus.PENDING)
		return res.status(400).json({ error: "You already sent a Friend Request!" });

	if (
		requesterGetRecipiant === FriendStatus.REQUESTED &&
		recipiantGetRequester === FriendStatus.PENDING
	) {
		requesterDoc.friends.set(recipiant, FriendStatus.ACCEPTED);
		recipiantDoc.friends.set(requester, FriendStatus.ACCEPTED);
		await Promise.all([requesterDoc.save(), recipiantDoc.save()]);
	}

	res.status(200).json({ requesterDoc, recipiantDoc });
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
module.exports.getAcceptedFriendsFromId = getAcceptedFriendsFromId;
