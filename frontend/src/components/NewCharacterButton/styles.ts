import styled from "styled-components";

export const ButtonContainer = styled.button`
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
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
`;