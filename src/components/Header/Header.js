import React from 'react';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import { Button } from '../Utils/Utils';
import './Header.css';

export default class Header extends React.Component {

    state = {
        loggedIn: false
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.setState({
            loggedIn: false
        })
    }

    renderLogout() {
        return (
            <div className='loggedin'>
                <Link 
                    className='gamelink'
                    to='/game'>
                    <Button className='navbutton'>
                        Game
                    </Button>
                </Link>
                <Link 
                    className='accountlink'
                    to='/account'>
                    <Button className='navbutton'>
                        Account
                    </Button>
                </Link>
                <Link
                    className='logoutlink'
                    to='/'
                    onClick={this.handleLogoutClick}
                >
                    <Button className='navbutton'>
                        Logout
                    </Button>
                </Link>
            </div>
        )
    }

    renderLogin() {
        return (
            <div className='notloggedin'>
                <Link 
                    className='loginlink' 
                    to='/login'
                >
                    <Button className='navbutton'>
                        Log In
                    </Button>
                </Link>
                <Link 
                    className='signuplink' 
                    to='/signup'
                >
                    <Button className='navbutton'>
                        Sign Up
                    </Button>
                </Link>
            </div>
        )
    }

    render() {
        return (
            <nav className='Header'>
                <div className='home'>
                    <h1>
                        <Link to='/'>
                            High-Low
                        </Link>
                    </h1>
                    <span className='tagline'>Test your luck</span>
                </div>
                {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
            </nav>
        )
    }
}