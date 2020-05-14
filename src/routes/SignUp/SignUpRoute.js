import React from 'react';
import { Section } from '../../components/Utils/Utils';
import SignUp from '../../components/SignUp/SignUp';

export default class SignUpRoute extends React.Component {
    static defaultProps = {
        history: {
            push: () => {},
        },
    }

    handleSignUpSuccess = user => {
        const { history } = this.props
        history.push('/game')
    }

    render() {
        return (
            <Section className="SignUpRoute">
                <h2>Sign Up</h2>
                <p className="password_rules">
                    To register an account, please select a User Name and Password.  
                    Your User Name must be at least 9 characters long.  
                    Your password must contain at least one uppercase letter, lowercase letter, number and special character.  
                    Passwords cannot start or end with a space.
                </p>
                <SignUp
                  onSignUpSuccess={this.handleSignUpSuccess}
                  setUser={this.props.setUser}
                />
            </Section>
        )
    }
}