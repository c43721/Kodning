const express = require("express");
const checkAuth = require("../middleware/auth");
const { User, FriendStatus } = require("../models/user");
const router = express.Router();

async function getAllFriendObjectFromId(idArray) {
	const results = Promise.all(
		idArray.map(async id => {
			const user = await User.findById(id);

			return { username: user.username };
		})
	);

	return await results;
}

//All routes need to be auth'd
router.use(checkAuth);

router.get("/", async (req, res) => {
	const user = req.user;

	const userDoc = await User.findById(user._id);

	const friends = [];
	const pending = [];
	const requests = [];

	if (!userDoc.friends) return res.status(204).send();

	for (const [key, value] of userDoc.friends) {
		if (value === FriendStatus.ACCEPTED) friends.push(key);
		else if (value === FriendStatus.PENDING) pending.push(key);
		else if (value === FriendStatus.REQUESTED) requests.push(key);
		else continue;
	}

	const [friendObjects, pendingObjects, requestObjects] = await Promise.all([
		getAllFriendObjectFromId(friends),
		getAllFriendObjectFromId(pending),
		getAllFriendObjectFromId(requests)
	]);

	res
		.status(200)
		.json({ friends: friendObjects, pending: pendingObjects, requests: requestObjects });
});

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
		return res.status(400).json({ error: "Could not find the requested or recipiant in DB" });

	const didRequesterHaveRecipiant = requesterDoc.friends.has(recipiant);
	const didRecipiantHaveRequestor = recipiantDoc.friends.has(requester);

	if (!didRequesterHaveRecipiant && !didRecipiantHaveRequestor) {
		requesterDoc.friends.set(recipiant, FriendStatus.REQUESTED);
		recipiantDoc.friends.set(requester, FriendStatus.PENDING);

		await Promise.all([requesterDoc.save(), recipiantDoc.save()]);
	}

	const requesterGetRecipiant = requesterDoc.friends.get(recipiant);
	const recipiantGetRequester = recipiantDoc.friends.get(requester);

	if (
		requesterGetRecipiant === FriendStatus.ACCEPTED &&
		recipiantGetRequester === FriendStatus.ACCEPTED
	)
		return res.status(400).json({ error: "You're already friends!" });

	if (
		requesterGetRecipiant === FriendStatus.PENDING &&
		recipiantGetRequester === FriendStatus.REQUESTED
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
	const requester = req.user._id;
	const { recipiant } = req.body;

	if (!requester || !recipiant)
		return res.status(400).json({ error: "No requester or recipiant in body" });

	if (requester === recipiant)
		return res.status(400).json({ error: "You cannot unfriend yourself!" });

	const [requesterDoc, recipiantDoc] = await Promise.all([
		User.findById(requester),
		User.findById(recipiant)
	]);

	if (!requesterDoc || !recipiantDoc)
		return res.status(400).json({ error: "Cannot remove friend that is nonexistant" });

	const requesterGetRecipiant = requesterDoc.friends.get(recipiant);
	const recipiantGetRequester = recipiantDoc.friends.get(requester);

	if (
		requesterGetRecipiant !== FriendStatus.ACCEPTED &&
		recipiantGetRequester !== FriendStatus.ACCEPTED
	) {
		return res.status(403).json({ error: "You cannot remove someone who isn't your friend" });
	} else {
		requesterDoc.friends.delete(recipiant);
		recipiantDoc.friends.delete(requester);
		await Promise.all([requesterDoc.save(), recipiantDoc.save()]);
		res.status(204).send();
	}
});

module.exports = router;
