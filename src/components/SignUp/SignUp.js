import React, { Component } from 'react';
import { Button, Input, Required } from '../Utils/Utils';

export default class SignUp extends React.Component {
    static defaultProps= {
        onSignUpSuccess: () => {}
    }

    state = { error: null }

    /* 
    handleSubmit = ev => {
        ev.preventDefault()
        const { full_name, nick_name, user_name, password } = ev.target

        this.setState({ error: null })
        AuthApiService.postUser({
        user_name: user_name.value,
        password: password.value,
        full_name: full_name.value,
        nick_name: nick_name.value,
        })
        .then(user => {
        full_name.value = ''
        nick_name.value = ''
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
        })
        .catch(res => {
        this.setState({ error: res.error })
        })
    }
    */


    render() {
        const { error } = this.state
        return (
            <form
                className='signup_form'
            >
                {/*onSubmit={this.handleSubmit}*/}
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
                    >
                    </Input>
                </div>
                <div className='password'>
                    <label htmlfor='signup_password'>
                        Password <Required />
                    </label>
                    <Input
                        name='password'
                        type='password'
                        id='signup_password'
                        placeholder='V3ryS3cr1t!'
                        required
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