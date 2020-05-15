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
                <h2 className='signuph'>Sign Up</h2>
                <SignUp
                  onSignUpSuccess={this.handleSignUpSuccess}
                  setUser={this.props.setUser}
                />
            </Section>
        )
    }
}