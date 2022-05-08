import styled from 'styled-components';

export const Container = styled.header`
	/* background-color: var(--secondary-color); */
	background-color: #333;
	margin-bottom: 5rem;
`;

export const Content = styled.div`
	max-width: var(--base-container-width);
	margin: 0 auto;
	padding: 0.5rem 3.125rem;

	display: flex;
	justify-content: flex-end;
	align-items: center;

	.buttonGroup {
		display: flex;

		button + button {
			margin-left: .5rem
		}
	}
`