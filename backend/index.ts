import "reflect-metadata";

import path from 'path';

import express from "express";
import cors from "cors";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql'
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";

import { UserResolver } from "./src/resolvers/UserResolver";
import { CharacterResolver } from "./src/resolvers/CharacterResolver";

import './src/database/';

import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function main() {

	/** Express will help us to manage middlewares and authentication */
	const app = express();

	/**
	 * Builds the GraphqQL schema using the available Resolvers
	 */
	const schema = await buildSchema({
		resolvers: [
			UserResolver,
			CharacterResolver
		],
		emitSchemaFile: path.resolve(__dirname, 'schema.gql')
	});

	/**
	 * Creates the Apollo server
	 * The ApolloServerLoaderPlugins helps us to load
	 * eager releationships in GraphQL
	 */
	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerLoaderPlugin({
				typeormGetConnection: getConnection
			}),
		],
		context: ({ req, res }) => ({ req, res }),
	});
	await server.start();
	server.applyMiddleware({ app });

	app.use(cors());

	app.listen(4000, () => {
		console.log(`Server running at http://localhost:4000/graphql`);
	});
}

main();