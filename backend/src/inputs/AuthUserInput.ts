import { Field, InputType } from "type-graphql";

@InputType()
export class AuthUserInput {

	@Field()
	username: string;

	@Field()
	password: string;
}
