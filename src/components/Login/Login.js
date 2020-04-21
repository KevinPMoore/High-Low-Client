import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';

export default class Login extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = {
        error: null
    }

    /* 
       handleSubmitJwtAuth = ev => {
       ev.preventDefault()
       this.setState({ error: null })
       const { user_name, password } = ev.target
    
       AuthApiService.postLogin({
         user_name: user_name.value,
         password: password.value,
       })
         .then(res => {
           user_name.value = ''
           password.value = ''
           TokenService.saveAuthToken(res.authToken)
           this.props.onLoginSuccess()
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
                className='loginform'
            >
                {/*onSubmit={this.handleSubmitJwtAuth}*/}
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