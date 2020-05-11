import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Button, Input, Required } from '../Utils/Utils';
import './SignUp.css';

export default class SignUp extends React.Component {
    static defaultProps= {
        onSignUpSuccess: () => {}
    }

    state = { 
        error: null,
        username: '',
        password: ''
    }

    updateUsername = (ev) => {
        this.setState({
            username: ev.target.value
        })
    }

    updatePassword = (ev) => {
        this.setState({
            password: ev.target.value
        })
    }
    
    handleSubmit = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { username, password } = this.state

        AuthApiService.postUser({
            user_name: username,
            password: password
        })
        .then(user => {
            this.props.setUser(user)
            this.props.onSignUpSuccess()
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }
    


    render() {
        const { error } = this.state
        return (
            <form
                className='signup_form'
                onSubmit={this.handleSubmit}
            >
                <div className='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='user_name'>
                    <label htmlFor='signup_user_name'>
                        User name <Required />
                    </label>
                    <Input
                      name='user_name'
                      type='text'
                      id='signup_user_name'
                      placeholder='ex. CoolGuyJokes87'
                      required
                      onChange={this.updateUsername}
                    >
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='signup_password'>
                        Password <Required />
                    </label>
                    <Input
                        name='password'
                        type='password'
                        id='signup_password'
                        placeholder='V3ryS3cr1t!'
                        required
                        onChange={this.updatePassword}
                    >
                    </Input>
                </div>
                <Button
                    type='submit'
                >
                    Sign Up
                </Button>
            </form>
        )
    }
}