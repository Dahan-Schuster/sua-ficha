import styled from 'styled-components';

export const Container = styled.div`
	font-size: var(--f14-px);
	border-radius: 10px;
	background-color: #666666cc;
	padding: 0.5rem;
	border: none;
	color: white;
	width: 115px;
	height: 115px;

	& > div {
		border: 1px dashed white;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	button {
		border: none;
		background-color: transparent;
		margin-left: auto;

		img {
			max-width: 20px;
			height: auto;
		}
	}
`;
