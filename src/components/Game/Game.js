import React from 'react';
import { Input, Button } from '../Utils/Utils';
import './Game.css';

export default class Game extends React.Component {
    state = {
        currentWager: null,
        currentComparison: '',
        displayNumber: 0,
        drawnNumber: 0,
        error: null,
        formInput: 0,
        formSelect: 'higher',
        interval: 0,
        modal: 'hidden',
        outcome: false,
        timeRemaining: 0,
        validation: 'valid',
    }

    updateDrawnAndDisplayNumbers = () => {
        let randNum1 = Math.floor(Math.random()*100)+1
        let randNum2 = Math.floor(Math.random()*100)+1
        while (randNum2 === randNum1) {
            randNum2 = Math.floor(Math.random()*100)+1
        }
        this.setState({
            displayNumber: randNum1,
            drawnNumber: randNum2
        })
    }

    updateDisplayNumber = () => {
        let randNum = Math.floor(Math.random()*100)+1
        this.setState({
            displayNumber: randNum
        })
    }

    updateDrawnNumber = () => {
        let randNum = Math.floor(Math.random()*100)+1
        if (randNum === this.state.displayNumber) {
            this.updateDrawnNumber()
        } else {
            this.setState({
                drawnNumber: randNum
            })
        }
    }

    updateFormInput = (ev) => {
        this.setState({
            formInput: ev.target.value
        })
    }

    updateFormSelect = (ev) => {
        this.setState({
            formSelect: ev.target.value
        })
    }

    updateModal = () => {
        if (this.state.modal === 'hidden') {
            this.setState({
                modal: 'modal'
            })
        } else {
            this.setState({
                modal: 'hidden'
            })
        }
    }

    updateOutcome = () => {
        this.setState({
            outcome: !this.state.outcome
        })
    }

    updateTimeRemaining = () => {
        if (this.state.timeRemaining === 0) {
            this.setState({ timeRemaining: 120000 })
            this.handleCompareNumbers()
            clearInterval(this.state.interval)
        }
        this.setState({
          timeRemaining: this.state.timeRemaining - 1000
        })
    }

    validateWager = (wager) => {
        let bank = this.props.bank
        if ((+wager > bank) || (+wager < 0)) {
            return false
        } else {
            return true
        }
    }

    handleWagerSubmit = (ev) => {
        ev.preventDefault()
        let validation = this.validateWager(this.state.formInput)
        if (validation === true) {
            this.setState({
                currentComparison: this.state.formSelect,
                currentWager: this.state.formInput,
                formInput: 0,
                formSelect: 'higher',
                validation: 'valid'
            })
        } else {
            this.setState({
                validation: 'invalid'
            }) 
        }
    }

    handleWagerCancel = () => {
        this.setState({
            currentWager: 0,
            formSelect: ''
        })
    }

    handleCompareNumbers = () => {
        if (this.state.currentWager === null) {
            let interval = setInterval(this.updateTimeRemaining, 1000)
            this.updateDrawnAndDisplayNumbers()
            this.setState({
                timeRemaining: 60000,
                currentWager: null,
                interval: interval
            })
        } else if (((this.state.drawnNumber > this.state.displayNumber) && this.state.currentComparison === 'higher') || ((this.state.drawnNumber < this.state.displayNumber) && this.state.currentComparison === 'lower')) {
            const winnings = (+this.props.bank + +this.state.currentWager)
            this.props.updateBank(winnings)
            this.setState({
                outcome: true
            })
            this.updateModal()
            let interval = setInterval(this.updateTimeRemaining, 1000)
            this.updateDrawnAndDisplayNumbers()
            this.setState({
                timeRemaining: 60000,
                currentWager: null,
                interval: interval
            })
        } else {
            const losings = (+this.props.bank - +this.state.currentWager)
            this.props.updateBank(losings)
            this.setState({
                outcome: false
            })
            this.updateModal()
            let interval = setInterval(this.updateTimeRemaining, 1000)
            this.updateDrawnAndDisplayNumbers()
            this.setState({
                timeRemaining: 60000,
                currentWager: null,
                interval: interval
            })
        }
    }

    renderModal = () => {
        const wager = this.state.currentWager
        if (this.state.outcome === true) {
            return(
                <div className={this.state.modal}>
                    <div className='modal_content'>
                        <Button className='close' onClick={this.updateModal}>&times;</Button>
                        <p>The next number was {this.state.drawnNumber}.  Congratulations!  You won {wager} points!  Your new total is {this.props.bank} points. Keep it up!</p>
                    </div>
                </div>
            )
        } else {
            return(
                <div className={this.state.modal}>
                    <div className='modal_content'>
                        <Button className='close' onClick={this.updateModal}>&times;</Button>
                        <p>The next number was {this.state.drawnNumber}.  Awww shucks!  You lost {wager} points.  Your new total is {this.props.bank} points.  Better luck next time!</p>
                    </div>
                </div>
            )
        }
    }

    renderWagerMessage = () => {
        const {currentWager, currentComparison} = this.state
        if ((this.state.currentWager !== 0) && (this.state.currentWager !== null)) {
            return(
                <p>You bet {currentWager} points that the next number will be {currentComparison}!</p>
            )
        } else {
            return(
                <p>You have not placed a bet, but there is still time!</p>
            )
        }
    }

    renderPointTotal = () => {
        const bank = this.props.bank
        if (bank !== 0) {
            return(
                <p>You currently have {bank} points!</p>
            )
        } else {
            return(
                <p>Sorry, you're out of points!  You can get more under 'My Account'.</p>
            )
        }
    }

    componentDidMount() {
        this.updateDrawnAndDisplayNumbers()

        let interval = setInterval(this.updateTimeRemaining, 1000)
    
        const timeRemaining = 60000;
        this.setState({
          timeRemaining,
          interval
        })
    }
    
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        const mins = Math.floor(this.state.timeRemaining / 60000);
        const seconds = Math.floor((this.state.timeRemaining / 1000) % 60)
        let bank = this.props.bank
        let displayNumber = this.state.displayNumber
        let error = this.state.error
        

        return (
            <section>
                {this.renderModal()}
                <section className='countdown'>
                    <p>The current number is</p>
                    <div className='display'><p className='bignumber'>{displayNumber}</p></div>
                    <p>Time remaining: {mins} minutes and {seconds} seconds</p>
                    {this.renderWagerMessage()}
                </section>
                <form 
                    className='wagerform'
                    onSubmit={this.handleWagerSubmit}
                >
                    <div className='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='wager'>
                        <div className='wagerinputs'>
                            <label htmlFor='pointwager'>
                                I bet
                            </label>
                            <Input
                                className={this.state.validation}
                                name='pointwager'
                                id='pointwager'
                                type='number'
                                min='0'
                                max={bank}
                                value={this.state.formInput}
                                onChange={this.updateFormInput}
                                required
                            >
                            </Input>
                            <span>points </span>
                            <label htmlFor='comparison'>
                                the next number will be
                            </label>
                            <select
                                name='comparison'
                                id='comparison'
                                value={this.state.formSelect}
                                onChange={this.updateFormSelect}
                            >
                                <option value ='higher'>higher</option>
                                <option value ='lower'>lower</option>
                            </select>
                        </div>
                        <div className='wagerbuttons'>
                            <Button
                                className='setwager'
                                type='submit'
                                onClick={this.handleWagerSubmit}
                            >
                                Set wager
                            </Button>
                            <Button
                                className='resetwager'
                                type='reset'
                                onClick={this.handleWagerCancel}
                            >
                                Cancel wager
                            </Button>
                        </div>
                    </div>
                    {this.renderPointTotal()}
                </form>
            </section>
        )
    }    
}