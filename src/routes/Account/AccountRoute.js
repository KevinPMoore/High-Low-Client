import React, { Component } from 'react';
import Account from '../../components/Account/Account';
import { Section } from '../../components/Utils/Utils';

export default class AccountRoute extends React.Component {
    
    render() {
        return (
            <Section className="account">
                <Account />
            </Section>
        ) 
    }
}