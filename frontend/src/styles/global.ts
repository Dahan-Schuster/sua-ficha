import { createGlobalStyle } from 'styled-components';

import avatarFont from '../assets/fonts/avatar.ttf';

const GlobalStyle = createGlobalStyle`
	:root {
		--background-color: #fafafa;
		--primary-color: #DF0013;
		--secondary-color: #FDC818;
		--accent-color: #0A95FF;
		--accent-secondary-color: #f15786;
		--error-color: #ee2d68;

		--f14-px: 87.50%;
		--f15-px: 93.75%;

		--base-container-width: 1120px;
	}

	@font-face {
		font-family: 'Avatar';
		src: url(${avatarFont}) format('ttf');
	}
	
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	// font-size: 16px (Desktop)
	html {
		@media (max-width: 1080px) {
			font-size: var(--f15-px);
		}

		@media (max-width: 720px) {
			font-size: var(--f14-px);
		}
	}

	body {
		background-color: var(--background-color);
		-webkit-font-smoothing: antialiased;
		min-height: 100vh;

		#root {
			display: flex;
			flex-direction: column;
			height: 100vh;
		}
	}

	button {
		cursor: pointer;
	}
`

export default GlobalStyle;