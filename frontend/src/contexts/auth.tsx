import React, { createContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { lstoragePrefix } from '../App';
import { AUTH_USER, CREATE_USER } from '../queries/userQueries';
import { client } from '../lib/apollo';

interface AuthUserInput {
	username: string;
	password: string;
}

interface IAuthUserResponse {
	user: {
		username: string;
	};
	accessToken: string;
}

interface IAuthContextData {
	signed: boolean;
	token: string;
	username: string;
	error: string;
	loading: boolean;
	Login(input: AuthUserInput): Promise<void>;
	SignUp(input: AuthUserInput): Promise<void>;
	Logout(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [authUser] = useMutation(AUTH_USER);
	const [createUser] = useMutation(CREATE_USER);
	const [token, setToken] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	/**
	 * Updates all states, storages and cache related to the
	 * athenticated user after login/signup
	 */
	function updateAuthUser({ accessToken, user }: IAuthUserResponse) {
		if (accessToken && !!user.username) {
			setToken(accessToken);
			setUsername(user.username);

			localStorage.setItem(`${lstoragePrefix}:token`, accessToken);
			localStorage.setItem(`${lstoragePrefix}:username`, user.username);

			// resets the cache so the user doesn't see any cached data
			client.resetStore();
		}
	}

	/**
	 * Requests user authentication with username and password
	 * Set the context to logged in after conclusion
	 */
	async function Login({ username, password }: AuthUserInput): Promise<void> {
		if (loading) return;

		setLoading(true);

		await authUser({
			fetchPolicy: "no-cache",
			variables: {
				data: {
					username,
					password
				}
			},
			onCompleted: ({ authUser }) => {
				updateAuthUser(authUser);
				setLoading(false);
				setError('');
			},
			onError: ({ message }) => {
				setLoading(false);
				setError(message);
			}
		})
	}

	/**
	 * Requests user registration with username and password
	 * Set the context to logged in after conclusion
	 */
	async function SignUp({ username, password }: AuthUserInput): Promise<void> {
		if (loading) return;

		setLoading(true);

		await createUser({
			fetchPolicy: "no-cache",
			variables: {
				data: {
					username,
					password
				}
			},
			onCompleted: ({ createUser }) => {
				updateAuthUser(createUser);
				setLoading(false);
				setError('');
			},
			onError: ({ message }) => {
				setLoading(false);
				setError(message);
			}
		});
	}

	/**
	 * Clear all authenticated user data
	 */
	function Logout(): void {
		setToken("");
		localStorage.removeItem(`${lstoragePrefix}:token`);
		localStorage.removeItem(`${lstoragePrefix}:username`);
		localStorage.removeItem(`${lstoragePrefix}:filter`);
		client.clearStore();
	}

	/**
	 * Looks for saved data in the local storage after page load
	 */
	useEffect(() => {
		const storagedToken = localStorage.getItem(`${lstoragePrefix}:token`);
		const storagedUsername = localStorage.getItem(`${lstoragePrefix}:username`);
		if (storagedToken && storagedUsername) {
			setToken(storagedToken);
			setUsername(storagedUsername);
		}
	}, []);


	return (
		<AuthContext.Provider value={{ signed: !!token, username, token, Login, Logout, SignUp, error, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;