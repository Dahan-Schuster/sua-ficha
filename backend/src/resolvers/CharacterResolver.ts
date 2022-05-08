import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { FindConditions } from "typeorm";
import { AuthContext } from "../contexts/AuthContext";

import { CreateCharacterInput } from "../inputs/CreateCharacterInput";
import { isAuth } from "../middlewares/isAuth";
import { Character } from "../models/Character";
import { CharacterRepository } from "../repositories/CharacterRepository";

@ObjectType()
class SuccessResponse {
	@Field()
	success: boolean;
}

@ObjectType()
class CharacterOverviewResonse {
	@Field()
	total: number;

	@Field()
	done: number;

	@Field()
	undone: number;
}

@Resolver()
export class CharacterResolver {
	private characterRepository: CharacterRepository;

	constructor() {
		this.characterRepository = new CharacterRepository();
	}

	/**
	 * Fetches all the characters from the authenticated user
	 * @returns Character[]
	 */
	@Query(() => [Character])
	@UseMiddleware(isAuth)
	async characters(
		@Ctx() { user }: AuthContext,
	) {
		return await this.characterRepository.findAllByUser(user);
	}

	/**
	 * Returns the user's character quantity overview
	 * @returns Character[]
	 */
	@Query(() => CharacterOverviewResonse)
	@UseMiddleware(isAuth)
	async charactersTotal(
		@Ctx() { user }: AuthContext,
	) {
		const total = await this.characterRepository.getTotalByUser(user);
		return total;
	}

	/**
	 * Creates a new character associated to the authenticated user
	 * @returns Character
	 */
	@Mutation(() => Character)
	@UseMiddleware(isAuth)
	async createCharacter(
		@Arg('data') { name }: CreateCharacterInput,
		@Ctx() { user }: AuthContext
	) {
		const character = await this.characterRepository.create({ name }, user);
		return character;
	}

	/**
	 * Deletes an authenticated user's character by id
	 * @returns Character
	 */
	@Mutation(() => SuccessResponse)
	@UseMiddleware(isAuth)
	async deleteCharacter(
		@Arg('id') id: string,
		@Ctx() { user }: AuthContext
	) {
		try {
			await this.characterRepository.deleteFromUser(id, user)
			return { success: true };
		} catch (e) {
			return { success: false };
		}
	}

}