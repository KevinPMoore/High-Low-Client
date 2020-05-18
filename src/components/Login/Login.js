import React from 'react';
import AuthApiService from '../../services/auth-api-service';
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

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { username, password } = this.state

        AuthApiService.postLogin({
            user_name: username,
            password: password
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken)
            return res.user
        })
        .then(user => {
            this.props.setUser(user)
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
                    <label className='loginuserlabel' htmlFor='login_user_name'>
                        User Name
                    </label>
                    <Input
                        name='user_name'
                        type='text'
                        id='login_user_name'
                        placeholder='ex. CoolGuyJokes87'
                        required
                        onChange={this.updateUsername}
                    >
                    </Input>
                </div>
                <div className='password'>
                    <label className='loginpasswordlabel' htmlFor='login_password'>
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
                    id='login_submit'
                    type='submit'
                >
                    Login
                </Button>
            

            </form>
        )
    }
}