import { FC, useContext } from "react";
import { Container, Row } from 'react-bootstrap';

import Header from "../../components/Header";
import CharacterList from "../../components/CharacterList";

import AuthContext from "../../contexts/auth";

import { Background, Content, ContentContainer } from "./styles";

export const Dashboard: FC = () => {

	// username for wellcome message
	const { username } = useContext(AuthContext);

	return (
		<Background>
			<Header />
			<Container>
				<Row>
					<ContentContainer>
						<Content>
							<h1>Wellcome back, {username}</h1>
							<CharacterList />
						</Content>
					</ContentContainer>
				</Row>
			</Container>
		</Background>
	)
}