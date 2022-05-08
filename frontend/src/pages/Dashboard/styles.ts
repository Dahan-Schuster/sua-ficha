import styled from 'styled-components';

import bgDashboard from '../../assets/fundo_dashboard.svg'
import woodBg from '../../assets/background_wood.svg';

export const Background = styled.div`
	width: 100%;
	height: 100vh;
	background: url(${bgDashboard}) center bottom no-repeat;
	background-size: cover;
`;

export const ContentContainer = styled.section`
	background: url(${woodBg});
	box-shadow: 5px 5px 0px 1px black;
	margin: auto;
	padding: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.section`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 1px white dashed;
	padding: 1rem;
	color: white;
`;