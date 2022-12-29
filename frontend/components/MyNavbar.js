import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link'


function MyNavbar() {
  const {user, logout} = useUser()
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="#home">Stock Manager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse >
        <Nav className="me-auto">
        <li className='nav-item'>
              <Link className='nav-link' href="/" >Home</Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link' href="/articles" >Articles</Link>
            </li>

          </Nav>
          {user ? (
            <>
            <Navbar.Text>
            Signed in as: {user?.username}
          </Navbar.Text>
          <button className='btn btn-sm btn-outline-dark mx-2' onClick={(e)=>logout()} >Signout</button>
          </>
          ):""}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;