import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserApiService from '../../services/user-api-service';
import TokenService from '../../services/token-service';
import { Button, Input } from '../Utils/Utils';
import './Login.css'

export default class Login extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => {}
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
    
    //somehow this has to make a GET request for the specific user but how to get the id?

    handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { username, password } = this.state

    AuthApiService.postLogin({
        username: username.value,
        password: password.value,
    })
        .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        })
        .then(user => {
        this.props.updateUser(this.state.username)
        this.props.updateLoggedIn()
        this.props.onLoginSuccess()
        })
        .catch(res => {
        this.setState({ error: res.error })
        })
    }


    render() {
        const { error } = this.state
        return (
            <form
                className='loginform'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div className='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='user_name'>
                    <label htmlFor='login_user_name'>
                        User Name
                    </label>
                    <Input
                        name='user_name'
                        id='login_user_name'
                        placeholder='ex. CoolGuyJokes87'
                        required
                        onChange={this.updateUsername}
                    >
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='login_password'>
                        Password
                    </label>
                    <Input
                        name='password'
                        type='password'
                        id='login_password'
                        placeholder='V3ryS3cr1t!'
                        required
                        onChange={this.updatePassword}
                    >
                    </Input>
                </div>
                <Button
                    type='submit'
                >
                    Login
                </Button>
            

            </form>
        )
    }
}