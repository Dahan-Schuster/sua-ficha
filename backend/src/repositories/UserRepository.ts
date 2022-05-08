import { hash } from "bcrypt";
import { getRepository, Repository } from "typeorm";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { User } from "../models/User";

/**
 * TypeORM Repository for User entity
 */
export class UserRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = getRepository(User);
	}

	/**
	 * Finds an user by id or throws an error
	 * 
	 * @param id the user id
	 * @returns the found user
	 */
	async findOrFail(id: string): Promise<User> {
		return this.repository.findOneOrFail(id);
	}

	/**
	 * Registers a new user
	 * 
	 * @param data the user info
	 * @returns the new user
	 */
	async create({ username, password }: CreateUserInput): Promise<User> {

		const passwordHash = await hash(password, 8);

		const user = this.repository.create({ username, password: passwordHash });
		return this.repository.save(user);
	}

	/**
	 * Find and user by it's username
	 * 
	 * @param username
	 * @returns the found user if it exists, undefined otherwise
	 */
	async findByUsername(username: string): Promise<User | undefined> {
		return this.repository.findOne({
			where: {
				username: username
			}
		});
	}

	/**
	 * Deletes an user by it's ID
	 * 
	 * @param user the user to be deleted
	 * @returns the deletion success status
	 */
	async delete(user: User): Promise<void> {
		await this.repository.delete({ id: user.id });
	}
}