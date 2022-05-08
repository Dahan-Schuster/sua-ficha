import { FC, FormEvent, useCallback, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { Modal, Form } from 'react-bootstrap';

import { client } from "../../lib/apollo";
import { CREATE_CHARACTER, GET_CHARACTERS } from "../../queries/characterQueries";

import Button from "../Button";

import { ButtonContainer } from './styles'

const NewCharacterButton: FC = () => {
	const [createCharacter, { loading }] = useMutation(CREATE_CHARACTER);
	const form = useRef(null);

	/**
	 * Requests the creation of a new character
	 * and add it to the cache afterwards
	 */
	const handleSubmit = useCallback(async (event: FormEvent) => {
		event.preventDefault();

		if (!form.current) return;

		const { name } = form.current;

		await createCharacter({
			variables: {
				data: {
					name: name?.value,
				}
			},

			update: (cache, { data: { createCharacter } }) => {
				// clean the textarea
			
				// the variables used in the last query must be
				// sent in order to distinguish between the filters
				const currentQueryOptions = {
					query: GET_CHARACTERS,
				}

				// get the cache of the last GET_CHARACTERS query made by the client
				const cacheData = client.readQuery(currentQueryOptions)

				console.log(cacheData);

				if (cacheData) {
					const { characters } = cacheData;

					// upates the cache
					cache.writeQuery({
						...currentQueryOptions,
						data: {
							characters: [
								...characters,
								createCharacter,
							]
						}
					})
				}
			}
		})
	}, [form]);

	const [showModal, setShowModal] = useState(false);

	const handleClose = useCallback(() => setShowModal(false), []);
	const handleShow = useCallback(() => setShowModal(true), []);

	return (
		<>
			<ButtonContainer onClick={handleShow}>
				<div>
					<p>New</p>
				</div>
			</ButtonContainer>

			<Modal show={showModal} onHide={handleClose}>
				<Form onSubmit={handleSubmit} ref={form}>
					<Modal.Header closeButton style={{ backgroundColor: 'transparent' }}>
						<Modal.Title>New Character</Modal.Title>
					</Modal.Header>
					<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Your character's name" />
					</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose} title="Cancel" />
						<Button variant="primary" title="Save" type="submit" />
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default NewCharacterButton;