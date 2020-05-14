import React from 'react';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import { Button } from '../Utils/Utils';
import HamburgerMenu from './Hamburger_icon.png';
import XIcon from './X_icon.png';
import './Header.css';

export default class Header extends React.Component {
    state = {
        burger: 'shown',
        buttons: 'hidden'
    }

    updateBurger = () => {
        if(this.state.burger === 'hidden' ) {
            this.setState({ burger: 'shown' })
        } else {
            this.setState({ burger: 'hidden' })
        }
    }

    updateButtons = () => {
        if(this.state.buttons === 'hidden' ) {
            this.setState({ buttons: 'shown' })
        } else {
            this.setState({ buttons: 'hidden' })
        }
    }

    handleToggleClick = () => {
        this.updateButtons()
        this.updateBurger()
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.props.updateLoggedIn()
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
            <nav className='header'>
                <div className='home'>
                    <h1>
                        <Link className='homelink' to='/'>
                            High-Low
                        </Link>
                    </h1>
                    <span className='tagline'>Test your luck</span>
                </div>
                <div>
                    <img className={this.state.burger} src={HamburgerMenu} alt='a hamburger icon of three horizontle lines' onClick={this.handleToggleClick}></img>
                    <div className={[this.state.buttons, 'buttonscontainer'].join(' ')}>
                        <img src={XIcon} alt='a yellow X' onClick={this.handleToggleClick}></img>
                        {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}  
                    </div>
                </div>
            </nav>
        )
    }
}