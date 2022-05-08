import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { AuthContext } from "../contexts/AuthContext";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export const isAuth: MiddlewareFn<AuthContext> = async ({ context }, next) => {
	const authorization = context.req.headers["authorization"];

	if (!authorization) {
		throw new Error("Authentication header not found");
	}

	if (!process.env.JWT_PRIVATE_KEY)
		throw new Error('JWT not configured, the authentication has failed');

	try {
		const token = authorization.split(" ")[1];
		const payload = verify(token, process.env.JWT_PRIVATE_KEY) as any;

		if (!payload?.userId) {
			throw new Error();
		}

		const user = await getRepository(User).findOneOrFail(payload.userId)
		context.user = user;
	} catch (err) {

		console.log(err);
		throw new Error("Not authenticated");
	}

	return next();
};