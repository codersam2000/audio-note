import React, {useContext} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Container} from 'react-bootstrap'
import { AuthContext } from '../../contexts/Auth'

const Home = ()=>{
    const authContext = useContext(AuthContext)
	return(
		<>
		<Header />
		<main>
			<Container>
                <p>Name: {authContext.user.first_name} {authContext.user.last_name}</p>
                <p>Username: {authContext.user.username}</p>
                <p>E-mail: {authContext.user.email}</p>
			</Container>
		</main>
		<Footer />
		</>
		)
	}
export default Home