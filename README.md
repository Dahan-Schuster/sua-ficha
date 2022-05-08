# Sua Ficha App

RPG Character and Campaign creator web app made with React.js, Node.js and GraphQL

## Instalation

Clone the project in a folder of your choice.

To upload the containers for the backend, run the following code. It will expose a Graphql access in the http://localhost:4000/graphql uri:

```bash
cd backend				# from the project root folder
npm i					# install all dependencies
docker-compose up -d	# run the MySQL and Node.js containers
```

You will also need to add a JWT private key to your .env file. The env-template shows the correct variables you need to fill.
Just create a md5 hash with a string of your preference, and set it as the value of the JWT_PRIVATE_KEY environment variable.

To execute the frontend server and access it in http://localhost:3000, run:

```bash
cd ../frontend	# assuming you are in the backend folder
npm i			# install all dependencies
npm run dev		# upload the server in dev mode
```

That's it! Open the URLs provided to test the routes and create some tasks ;)