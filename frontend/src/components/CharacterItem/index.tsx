import { ApolloCache, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { DELETE_CHARACTER } from "../../queries/characterQueries";
import { ICharacter } from "../CharacterList";
import { Container } from "./styles";

import deleteIcon from '../../assets/delete_icon.svg';

interface CharacterProps {
	character: ICharacter;
}

const CharacterItem = ({ character }: CharacterProps) => {
	const { id, name } = character;
	const [deleteCharacter] = useMutation(DELETE_CHARACTER)

	/**
	 * Requests the character deletion and removes it from the cache afterwards
	 */
	const handleDeleteCharacter = useCallback(async () => {
		await deleteCharacter({
			variables: {
				characterId: id,
			},
			update: (cache) => {
				removeCharacterFromList(cache, id);
			}
		})
	}, [id])

	/**
	 *  Removes a character from the cache
	 */
	const removeCharacterFromList = useCallback((cache: ApolloCache<any>, characterId: string) => {
		const normalizedId = cache.identify({ id: characterId, __typename: 'Character' });
		cache.evict({ id: normalizedId });
		cache.gc();
	}, []);

	return (
		<Container>
			<div>
				<p>{name}</p>
				<p>{name}</p>
			</div>
		</Container>
	)
}

export default CharacterItem;