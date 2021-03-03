import {useContext} from 'react'
import {Navbar, Nav} from'react-bootstrap'

import Link from 'next/link'

import UserContext from '../userContext'

export default function NavBar(){

    const {user} = useContext(UserContext)

    console.log(user)

    return(
        <Navbar bg="light" expand="lg">
            <Link href="/">
                <a className="navbar-brand">Next-Booking</a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/">
                        <a className="nav-link" role="button">Home</a>
                    </Link>
                    <Link href="/courses">
                        <a className="nav-link" role="button">Courses</a>
                    </Link>
                    <Link href="/courses/create">
                        <a className="nav-link" role="button">Create</a>
                    </Link>
                    {   
                        user.email
                        ? 
                        <Link href="/login">
                        <a className="nav-link" role="button">Login</a>
                        </Link>
                        :                    
                        <Link href="/login">
                            <a className="nav-link" role="button">Login</a>
                        </Link>
                    }       
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}