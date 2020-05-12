import React from 'react';
import Account from '../../components/Account/Account';
import { Section } from '../../components/Utils/Utils';

export default class AccountRoute extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleDeleteSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
    }
    
    render() {
        return (
            <Section className='AccountRoute'>
                <Account bank={this.props.bank} user={this.props.user} userId={this.props.userId} updateBank={this.props.updateBank} updateLoggedIn={this.props.updateLoggedIn} handleDeleteSuccess={this.handleDeleteSuccess}/>
            </Section>
        ) 
    }
}