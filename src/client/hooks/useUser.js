import React, { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import AuthProvider from "../Providers/AuthProvider";

function getCurrentUser(token) {
	const userDecoded = jwt.decode(token);
	return userDecoded;
}

const UserContext = createContext({
	user: null,
	token: null
});

export function UserProvider({ children }) {
	const [token, setToken] = useState(AuthProvider.provider.token);
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!user && token) {
			const user = getCurrentUser(token);
			setUser(user);
		} else if (!token) {
			AuthProvider.provider.logout();
			setUser(null);
		}
	}, [token]);

	return <UserContext.Provider value={{ user, token, setToken }}>{children}</UserContext.Provider>;
}
const useUser = () => useContext(UserContext);

export default useUser;
