import React from 'react';
import UserApiService from '../../services/user-api-service';
import { Button } from '../Utils/Utils';
import './Account.css';

export default class Account extends React.Component {
    state = {
        username: '',
        id: null,
        topUp: 'hidden',
        delete: 'hidden',
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

    updateDelete = () => {
        if (this.state.delete === 'hidden') {
            this.setState({
                delete: 'modal'
            })
        } else {
            this.setState({
                delete: 'hidden'
            })
        }
    }

    resetPoints = () => {
        this.props.updateBank(100)
        this.updateTopUp()
    }

    deleteAccount = (id) => {
        UserApiService.deleteUser(id)
        this.updateDelete()
    }

    componentDidMount() {
        this.setState({
            username: this.props.user
        })
    }

    render() {
        const bank = this.props.bank
        const user = this.state.username
        const id = this.state.id
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
                <Button
                    className='delete'
                    onClick={this.updateDelete}
                >
                    Delete Account
                </Button>
                <div className={this.state.topUp}>
                    <div className='modal_content'>
                        <p>This will reset your points to 100.  Are you sure?</p>
                        <Button className='confirm' onClick={this.resetPoints}>Confirm</Button>
                        <Button className='cancel_top_up' onClick={this.updateTopUp}>Cancel</Button>
                    </div>
                </div>
                <div className={this.state.delete}>
                    <div className='modal_content'>
                        <p>This will delete your account.  This is permanent and cannot be undone.  Are you sure?</p>
                        <Button className='confirm' onClick={this.resetPoints}>Confirm</Button>
                        <Button className='cancel_delete' onClick={this.deleteAccount(id)}>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}