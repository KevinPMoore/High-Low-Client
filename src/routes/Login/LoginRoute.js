import React from 'react';
import Login from '../../components/Login/Login';
import { Section } from '../../components/Utils/Utils';

export default class LoginRoute extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/game'
        history.push(destination)
    }

    render() {
        return (
            <Section className='LoginRoute'>
                <div classname='loginintro'>
                    <h2>Log In</h2>
                </div>
                <Login
                  onLoginSuccess={this.handleLoginSuccess}
                  setUser={this.props.setUser}
                />
            </Section>
        )
    }
}