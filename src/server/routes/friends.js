const express = require("express");
const checkAuth = require("../middleware/auth");
const { User, FriendStatus } = require("../models/user");
const router = express.Router();

/**
 * Gets all friend objects from an array of IDs
 * @param {Array<String>} idArray
 * @returns {Array<Object>} username
 * @async
 */
async function getAllFriendObjectFromId(idArray) {
	const results = Promise.all(
		idArray.map(async id => {
			const user = await User.findById(id);

			return { username: user.username };
		})
	);

	return await results;
}

/**
 * Get the friends, friend requests, and pending requests from a user's _id
 * @param {ObjectId} userId The user's _id
 * @returns Object with friends, pending, and requests that are type of Array<String>
 */
async function getFriendsFromUser(userId) {
	const userDoc = await User.findById(userId);

	const friends = [];
	const pending = [];
	const requests = [];

	if (!userDoc.friends) return { friends: [], pending: [], requests: [] };

	for (const [key, value] of userDoc.friends) {
		if (value === FriendStatus.ACCEPTED) friends.push(key);
		else if (value === FriendStatus.PENDING) pending.push(key);
		else if (value === FriendStatus.REQUESTED) requests.push(key);
		else continue;
	}

	return { friends, pending, requests };
}

//All routes need to be auth'd
router.use(checkAuth);

router.get("/", async (req, res) => {
	const user = req.user;

	const { friends, pending, requests } = await getFriendsFromUser(user._id);

	const [friendObjects, pendingObjects, requestObjects] = await Promise.all([
		getAllFriendObjectFromId(friends),
		getAllFriendObjectFromId(pending),
		getAllFriendObjectFromId(requests)
	]);

	res
		.status(200)
		.json({ friends: friendObjects, pending: pendingObjects, requests: requestObjects });
});

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

	if (requesterGetRecipiant && recipiantGetRequester) {
		requesterDoc.friends.delete(recipiant);
		recipiantDoc.friends.delete(requester);
		await Promise.all([requesterDoc.save(), recipiantDoc.save()]);
		return res.status(200).json({ message: "Friend deleted" });
	} else {
		return res
			.status(403)
			.json({ error: "Either no request was sent or you are not friends with that user" });
	}
});

module.exports = router;
module.exports.getFriendsFromUser = getFriendsFromUser;
