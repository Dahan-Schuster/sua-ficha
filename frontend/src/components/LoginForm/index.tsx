import { FC, FormEvent, useCallback, useContext, useState } from "react";

import AuthContext from "../../contexts/auth";

import { Container } from "./styles";
import Button from "../Button";


interface ILoginFormProps {
	doLogin: boolean;
	setDoLogin: Function;
}

/**
 * User creation form
 * Will send data through GraphQL with the Apollo client
 */
const LoginForm = ({ doLogin, setDoLogin }: ILoginFormProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { Login, SignUp, error, loading } = useContext(AuthContext);

	/**
	 * Routes the form submit to the context's Login/Signup methods
	 */
	const handleSubmit = useCallback(async (event: FormEvent) => {
		event.preventDefault();
		if (doLogin) {
			typeof Login == "function" && await Login({
				username,
				password
			});
		} else {
			typeof SignUp == "function" && await SignUp({
				username,
				password
			});
		}
	}, [doLogin, Login, username, password]);

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input type="text" value={username} placeholder="Username"
						onChange={e => setUsername(e.target.value)} />
				</div>
				<div className="form-group">
					<input type="password" value={password} placeholder="Password"
						onChange={e => setPassword(e.target.value)} />
				</div>
				{error && (
					<div className="form-group">
						<small className="error">{error}</small>
					</div>
				)}
				<div className="form-group">
					{doLogin ? (
						<small>Don't have an account?<br/>
							<button className="btnAccount" type="button"
								onClick={() => setDoLogin(false)}>
								Sign Up
							</button>
						</small>
					) : (
						<small>Already have an account?<br/>
							<button className="btnAccount" type="button"
								onClick={() => setDoLogin(true)}>
								Log in
							</button>
						</small>
					)}
				</div>
				<div className="form-group">
					<Button title={doLogin ? 'Login' : 'Signup'} disabled={loading}
						type="submit" variant="primary" align="center" />
				</div>
			</form>
		</Container>
	)
}

export default LoginForm;