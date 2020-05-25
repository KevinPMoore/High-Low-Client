import React from 'react';
import Login from '../../components/Login/Login';
import { Section } from '../../components/Utils/Utils';

export default class LoginRoute extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    };

    handleLoginSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/game';
        history.push(destination);
    };

    render() {
        return (
            <Section className='LoginRoute'>
                    <h2 className='loginh'>Log In</h2>
                <Login
                  onLoginSuccess={this.handleLoginSuccess}
                  setUser={this.props.setUser}
                />
            </Section>
        );
    };
};