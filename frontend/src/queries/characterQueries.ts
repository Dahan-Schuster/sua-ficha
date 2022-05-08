import { gql } from "@apollo/client";

export const CREATE_CHARACTER = gql`
	mutation CreateCharacter($data: CreateCharacterInput!) {
		createCharacter(data: $data) {
			id
			name
		}
	}
`
export const GET_CHARACTERS = gql`
	query Characters {
		characters {
			id
			name
		}
	}
`
export const GET_CHARACTERS_TOTALS = gql`
	query CharactersTotals {
		charactersTotal {
			total
		}
	}
`

export const DELETE_CHARACTER = gql`
	mutation DeleteCharacter($characterId: String!) {
		deleteCharacter(id: $characterId) {
			success
		}
	}
`