import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";

import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UserRepository } from "../repositories/UserRepository";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { AuthUserInput } from "../inputs/AuthUserInput";
import { User } from "../models/User";
import { isAuth } from "../middlewares/isAuth";
import { AuthContext } from "../contexts/AuthContext";
import { CharacterRepository } from "../repositories/CharacterRepository";


@ObjectType()
class AuthUserResponse {
	@Field()
	accessToken: string;

	@Field()
	user: User;
}

@ObjectType()
class DeleteUserResponse {
	@Field()
	success: string;
}

@Resolver()
export class UserResolver {
	private userRepository: UserRepository;
	private characterRepository: CharacterRepository;


	constructor() {
		this.userRepository = new UserRepository();
		this.characterRepository = new CharacterRepository();
	}

	/**
	 *  Returns the current logged user's data
	 */
	@Query(() => User)
	@UseMiddleware(isAuth)
	async me(@Ctx() { user }: AuthContext) {
		return user;
	}

	/**
	 * Creates a new user
	 * @returns User
	 */
	@Mutation(() => AuthUserResponse)
	async createUser(
		@Arg('data') { username, password }: CreateUserInput
	) {
		const userAlreadyExists = await this.userRepository.findByUsername(username);
		if (userAlreadyExists)
			throw new Error('User already exists');

		const user = await this.userRepository.create({ username, password })
		return {
			user,
			accessToken: this.generateJWT(user)
		};
	}

	@Mutation(() => AuthUserResponse)
	async authUser(
		@Arg('data') { username, password }: AuthUserInput
	) {
		const user = await this.userRepository.findByUsername(username);

		if (!user)
			throw new Error('Incorrect username/password');

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch)
			throw new Error('Incorrect username/password');

		return {
			user,
			accessToken: this.generateJWT(user)
		};
	}

	/**
	 * Deletes the authenticated user's account and it's characters
	 * @returns Character
	 */
	@Mutation(() => DeleteUserResponse)
	@UseMiddleware(isAuth)
	async deleteUser(
		@Ctx() { user }: AuthContext
	) {
		try {
			await this.characterRepository.deleteAllFromUser(user);
			await this.userRepository.delete(user);

			return { success: true };
		} catch (e) {
			return { success: false };
		}
	}


	private generateJWT(user: User): string {
		if (!process.env.JWT_PRIVATE_KEY)
			throw new Error('JWT not configured, the authentication has failed');

		return sign({ userId: user.id }, process.env.JWT_PRIVATE_KEY, {
			expiresIn: "7d",
		})
	}
}