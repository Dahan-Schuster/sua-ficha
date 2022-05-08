import styled from 'styled-components';

import woodBg from '../../assets/background_wood.svg';

interface IContainerProps {
	order: 'row' | 'row-reverse'
}

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100vh;
	position: relative;
	background: url(${woodBg});
	
	flex-direction: ${(props: IContainerProps) => props.order };
	transition: all .2s;;
`;

export const FormContainer = styled.div`
	height: 100%;
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 768px) {
		display: contents;

		& > * {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			margin: 0 0;
		}
	}
`

export const BgContainer = styled.div`
	height: 100%;
	width: fit-content;
	display: flex;
	overflow: hidden;

	img {
		object-fit: cover;
		flex: 1;
	}
`
