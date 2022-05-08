import { useMutation } from '@apollo/client'
import { FC, useCallback, useContext } from 'react'

import AuthContext from '../../contexts/auth'
import Button from '../Button'

import { DELETE_USER } from '../../queries/userQueries'

import { Container, Content } from './styles'

const Header: FC = () => {
	const { signed, Logout } = useContext(AuthContext);
	const [deleteUser] = useMutation(DELETE_USER)

	const handleDeleteAccount = useCallback(async () => {
		if (confirm("Are you sure?")) {
			await deleteUser({
				onCompleted: ({ deleteUser }) => {

					if (deleteUser.success === 'true') {
						Logout();
					} else {
						alert('Sorry, something went wrong. Try again.')
					}
				}
			});
		}
	}, []);

	return (
		<Container>
			<Content>
				{signed && (
					<div className='buttonGroup'>
						<Button title='Logout' onClick={Logout} />
						<Button title='Delete Account' onClick={handleDeleteAccount} />
					</div>
				)}
			</Content>
		</Container>
	)
}

export default Header;