import styled from 'styled-components';

import btnAccent from '../../assets/btn_accent.svg';
import btnPrimary from '../../assets/btn_primary.svg';
import btnSecondary from '../../assets/btn_secondary.svg';

export const ButtonContainer = styled.button`
	color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-radius: 25px;
	padding: 0.5rem;
	width: 140px;
	border: none;
	line-height: 0.8;
	transition: all .15s ease-out;
	background-size: contain;
	background-position: center;
	background-color: transparent;
	background-repeat: no-repeat;
	
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	position: relative;
	&:active {
		top: 2px;
	}

	/* Customization classes */

	&.accent {
		/* background-color: var(--accent-color); */
		background-image: url(${btnAccent});
	}

	&.primary {
		/* background-color: var(--primary-color); */
		background-image: url(${btnPrimary});
	}

	&.secondary {
		/* background-color: var(--secondary-color); */
		background-image: url(${btnSecondary});
	}

	&.pink {
		background-color: var(--accent-secondary-color);
	}

	&.right {
		display: block;
		margin: 0 0 0 auto;
	}

	&.left {
		display: block;
		margin: 0 auto 0 0;
	}

	&.center {
		display: block;
		margin: 0 auto;
	}

	&.icon {
		padding: 0;
		background-color: #fff;
		border-radius: 50%;
		width: 26px;
		height: 26px;
		box-shadow: 0 2px 2px 0 #858585;
		color: var(--accent-color);
		font-size: .625rem;

		&:active, &.active {
			box-shadow: none;
			background-color: var(--accent-secondary-color);
		}
	}

	:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}
`;
