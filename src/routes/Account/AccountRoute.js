import React from 'react';
import Account from '../../components/Account/Account';
import { Section } from '../../components/Utils/Utils';

export default class AccountRoute extends React.Component {
    
    render() {
        return (
            <Section className="account">
                <Account bank={this.props.bank} user={this.props.user} updateBank={this.props.updateBank}/>
            </Section>
        ) 
    }
}