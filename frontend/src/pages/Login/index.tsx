import { FC, useContext, useState } from "react"
import LoginForm from "../../components/LoginForm"

import { BgContainer, Container, FormContainer } from './styles';

import bgLogin from '../../assets/fundo_login.svg';
import bgLogon from '../../assets/fundo_logon.svg';

export const Login: FC = () => {

	// define submit behavior: { true: login, false: sign up }
	const [doLogin, setDoLogin] = useState(true);

	return (
		<Container order={doLogin ? "row" : "row-reverse"}>
			<FormContainer>
				<LoginForm doLogin={doLogin} setDoLogin={setDoLogin} />
			</FormContainer>
			<BgContainer>
				<img src={doLogin ? bgLogin : bgLogon} alt="" />
			</BgContainer>
		</Container>
	)
}