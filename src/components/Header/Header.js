import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    /*
      ToDo
        actual auth logout
        change link on the h1 to not go to '/' if logged in  
    */
    state = {
        fakeLogin: false
    }

    handleLogoutClick = () => {
        //clear auth token
    }

    renderLogout() {
        return (
            <div className='Header_loggedin'>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'
                >
                  Logout
                </Link>
            </div>
        )
    }

    renderLogin() {
        return (
            <div className='Header_notloggedin'>
                <Link to='/login'>
                    Log In
                </Link>
                <Link to='/signup'>
                    Sign Up
                </Link>
            </div>
        )
    }

    render() {
        return (
            <nav className='Header'>
                <h1>
                    <Link to='/'>
                        High-Low
                    </Link>
                </h1>
                <span className='tagline'>Test your luck</span>
                {this.state.fakeLogin ? this.renderLogout() : this.renderLogin()}
            </nav>
        )
    }
}