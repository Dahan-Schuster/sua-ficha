import { FindConditions, getRepository, Repository, TreeRepository } from "typeorm";
import { CreateCharacterInput } from "../inputs/CreateCharacterInput";
import { Character } from "../models/Character";
import { User } from "../models/User";

/**
 * TypeORM repository for the Character entity
 */
export class CharacterRepository {
	private repository: Repository<Character>;

	constructor() {
		this.repository = getRepository(Character);
	}

	/**
	 * Returns all characters associated to the authenticated user
	 * 
	 * @param user the athenticated user
	 * @param filters additional filters to be passed to the find method
	 * @returns the list of characters from the user
	 */
	async findAllByUser(user: User, filters?: FindConditions<Character>): Promise<Character[]> {
		return this.repository.find({ user: { id: user.id }, ...filters });
	}

	/**
	 * Returns an array of users's characters totals
	 * 
	 * @param user the athenticated user
	 * @returns count total
	 */
	async getTotalByUser(user: User): Promise<number> {
		const count = await this.repository.count({ user: { id: user.id } });

		return count;
	}

	/**
	 * Creates a new character for the user
	 * 
	 * @param data the character info
	 * @param user the athenticated user
	 * @returns 
	 */
	async create({ name }: CreateCharacterInput, user: User): Promise<Character> {

		const character = this.repository.create({
			name,
			user
		});
		return this.repository.save(character);
	}

	/**
	 * Returns all characters from an user filtered by status (done/undone)
	 * 
	 * @param id the character id
	 * @param user the authenticated user
	 * @returns all (un)done characters from the user
	 */
	async findById(id: string, user: User): Promise<Character[] | undefined> {
		return this.repository.find({
			where: {
				user: { id: user.id },
				id,
			}
		});
	}

	/**
	 * Deletes a character from an user by id
	 * 
	 * @param id the character id
	 * @param user the authenticated user
	 */
	async deleteFromUser(id: string, user: User): Promise<void> {
		await this.repository.delete({
			user: { id: user.id },
			id,
		});
	}

	/**
	 * Deletes all characters from an user
	 * 
	 * @param user the authenticated user
	 */
	async deleteAllFromUser(user: User): Promise<void> {
		await this.repository.delete({
			user: { id: user.id }
		})
	}

}