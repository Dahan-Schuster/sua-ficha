import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCharacterInput {

	@Field()
	name: string;
}
