import React, { Component } from 'react';
import { Button } from '../Utils/Utils';
import './Account.css';

export default class Account extends React.Component {
    state = {
        topUp: 'hidden',
    }

    updateTopUp = () => {
        if (this.state.topUp === 'hidden') {
            this.setState({
                topUp: 'modal'
            })
        } else {
            this.setState({
                topUp: 'hidden'
            })
        }
    }

    resetPoints = () => {
        this.props.updateBank(100)
        this.updateTopUp()
    }

    render() {
        const bank = this.props.bank
        const user = this.props.user
        return (
            <div className='user_info'>
                <p>User name: <span>{user}</span></p>
                <p>Points: <span>{bank}</span></p>
                <Button
                    className='top_up'
                    onClick={this.updateTopUp}
                >
                    Top Up
                </Button>
                <div className={this.state.topUp}>
                    <div className='modal_content'>
                        <p>This will reset your points to 100.  Are you sure?</p>
                        <Button className='confirm' onClick={this.resetPoints}>Confirm</Button>
                        <Button className='cancel_top_up' onClick={this.updateTopUp}>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}