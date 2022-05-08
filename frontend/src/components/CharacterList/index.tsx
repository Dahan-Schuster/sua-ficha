import { useQuery } from "@apollo/client";
import { FC } from "react";

import NewCharacterButton from "../NewCharacterButton";
import CharacterItem from "../CharacterItem";

import { GET_CHARACTERS } from "../../queries/characterQueries";
import { Container, CharactersContainer } from "./styles";

export interface ICharacter {
	name: string;
	id: string;
}

const CharacterList: FC = () => {

	// fetches the character list just after page load
	const { data, loading, refetch } = useQuery<{ characters: ICharacter[] }>(GET_CHARACTERS);

	return (
		<Container>
			<h2>Characters</h2>
			<CharactersContainer>
				<NewCharacterButton />
				{!loading && (
					data?.characters.map(character => (
						<CharacterItem key={character.id}
							character={character} />
					))
				)}
			</CharactersContainer>
		</Container>
	)
}

export default CharacterList;