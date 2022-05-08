import styled from 'styled-components';

export const Container = styled.div`
	margin: 2rem auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	@media (max-width: 768px) {
		width: 486px;
	}

	@media (max-width: 425px) {
		width: calc(100% - 1rem);
		margin: 0 auto;
	}
`;


export const CharactersContainer = styled.section`
	margin-top: 1rem;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
`