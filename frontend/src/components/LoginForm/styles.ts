import styled from 'styled-components';

import bgPergaminho from '../../assets/background_pergaminho-v.svg';

export const Container = styled.div`

	form {
		width: 270px;
		height: 435px;
		margin: 0 5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem 2rem;
		background: url(${bgPergaminho}) center no-repeat;
		background-size: contain;

		.form-group {
			margin: .75rem 0;
			width: 100%;

			input {
				height: 40px;
				width: 100%;
				border: 1px #D3D6D6 solid;
				border-radius: 2px;
				color: #545454;
				font-size: var(--f14-px);
				padding: 0.5rem 0.75rem;
			}

			.error {
				color: var(--error-color);
			}

			.btnAccount {
				color: var(--primary-color);
				background-color: transparent;
				border: none;
			}
		}
	}
`;