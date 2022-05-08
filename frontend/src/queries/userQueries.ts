import { gql } from "@apollo/client";

export const CREATE_USER = gql`
	mutation CreateUser($data: CreateUserInput!) {
		createUser (data: $data) {
			accessToken
			user {
				username
			}
		}
	}
`
export const DELETE_USER = gql`
	mutation DeleteUser {
		deleteUser {
			success
		}
	}
`

export const AUTH_USER = gql`
	mutation Login($data: AuthUserInput!) {
		authUser(data: $data) {
			accessToken
			user {
				username
			}
		}
	}
`