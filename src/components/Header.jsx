import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth';
import {Container, Navbar, Nav, NavLink} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
const Header = ()=>{
	const authContext = useContext(AuthContext)
	return(
		<>
		<header className='bg-black'>
			<Container className='d-flex justify-content-between align-items-center'>
				<Navbar collapseOnSelect expand="sm" data-bs-theme="dark">
					<Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll"/>
					<Navbar.Collapse id="navbarScroll">
						<Navbar.Brand href="/">AN</Navbar.Brand>
						<Nav className="me-auto">
							<LinkContainer to="/">
								<Nav.Link>Home</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/my-note">
								<Nav.Link>My Note</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/add-note">
								<Nav.Link>Add Note</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/about">
								<Nav.Link to="/about">About</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<NavLink className='mt-1'>
					<Nav>
						{!authContext.isUserLoggedIn && (
							<li>
							<LinkContainer to ="/account">
								<Nav.Link>Login / Ragister</Nav.Link>
							</LinkContainer>
						</li>
						)}
						{authContext.isUserLoggedIn && (
							<li className='d-flex align-items-center'>
							<LinkContainer to ="/profile">
								<Nav.Link>{authContext.user.username}</Nav.Link>
							</LinkContainer>
							<i className='fas fa-sign-out text-light' onClick={() => authContext.logout()}></i>
						</li>
						)}	
					</Nav>
				</NavLink>
			</Container>
		</header>
		</>	
	)}
export default Header