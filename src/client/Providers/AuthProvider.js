export default class AuthProvider {
	static provider = new AuthProvider();

	constructor() {
		this.localToken = null;
	}

	logout() {
		localStorage.removeItem("token");
	}

	set token(newToken) {
		this.localToken = newToken;
		localStorage.setItem("token", this.localToken);
		return this.localToken;
	}

	get token() {
		if (!this.localToken) {
			this.localToken = localStorage.getItem("token");
			if (!this.localToken) {
				return null;
			}
		}
		return this.localToken;
	}
}
