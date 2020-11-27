/**
 * Checks user admin levels. Must be called after checkAuth.
 */
function checkAdmin(req, res, next) {
	const user = req.user;

	if (user.isAdmin) return next();
	else return res.status(401).send();
}

module.exports = checkAdmin;
