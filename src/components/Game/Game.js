import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '../Utils/Utils';
import './Game.css';

export default class Game extends React.Component {
    /*ToDos
        handle submit wager form resets fields
        render modal for outcome in handleCompareNumbers
        setstate so after comparison drawnNumber becomes displayNumber and then drawnNumber is re-randomized
        remove comments from functions
    */
    state = {
        currentWager: 0,
        currentComparison: '',
        displayNumber: 0,
        drawnNumber: 0,
        error: null,
        formInput: 0,
        formSelect: 'higher',
        modal: 'hidden',
        outcome: false,
        timeRemaining: 0,
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
            this.setState({ timeRemaining: 180000 })
            this.handleCompareNumbers()
            clearInterval(this.state.timeRemaining)
        }
        this.setState({
          timeRemaining: this.state.timeRemaining - 1000
        })
    }

    //with API later
    setInitialState = () => {
        //get state from API then call this in componentDidMount
    }

    handleWagerSubmit = (ev) => {
        ev.preventDefault()
        this.setState({
            currentComparison: this.state.formSelect,
            currentWager: this.state.formInput,
            formInput: 0,
            formSelect: 'higher'
        })
        //somehow reset the form
        //this.form.reset() and HTMLFormElement.reset() both crash
    }

    handleWagerCancel = () => {
        this.setState({
            currentWager: 0,
            formSelect: ''
        })
    }

    handleCompareNumbers = () => {
        console.log('handleCompareNumbers ran')
        let wager = this.state.currentWager
        if ((this.state.drawnNumber > this.state.displayNumber && this.state.formSelect === 'higher') || (this.state.drawnNumber < this.state.displayNumber && this.state.formSelect === 'lower')) {
            const winnings = this.props.bank + this.state.currentWager
            this.props.updateBank(winnings)
            this.setState({
                outcome: true
            })
            //api call to update server
            this.updateModal()
        } else {
            const losings = this.props.bank + this.state.currentWager
            this.props.updateBank(losings)
            this.setState({
                outcome: false
            })
            //api call to update server
            this.updateModal()
        }
    }

    renderModal = () => {
        const wager = this.state.currentWager
        if (this.state.outcome === true) {
            return(
                <div className={this.state.modal}>
                    <div className='modal_content'>
                        <Button className='close' onClick={this.updateModal}>&times;</Button>
                        <p>Congratulations!  You won {wager} points!  Your new total is {this.props.bank} points. Keep it up!</p>
                    </div>
                </div>
            )
        } else {
            return(
                <div className={this.state.modal}>
                    <div className='modal_content'>
                        <Button className='close' onClick={this.updateModal}>&times;</Button>
                        <p>Awww shucks!  You lost {wager} points.  Your new total is {this.props.bank} points.  Better luck next time!</p>
                    </div>
                </div>
            )
        }
    }

    renderWagerMessage = () => {
        const {currentWager, formSelect} = this.state
        if (this.state.currentWager !== 0) {
            return(
                <p>You bet {currentWager} points that the next number will be {formSelect}!</p>
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
        this.updateDisplayNumber()
        this.updateDrawnNumber()

        /*
        //this syntax will be useful after the API is running
        // get the data with the event date 
        const mockTime = new Date(Date.UTC(2020, 4, 1, 12, 0, 0))
        // get the local time, subtract from the event date and set state with the remaining time
        //convert this to tocal timezone of browser
        const currentTime = new Date();
        */
    
        //this is for testing client side only and will be replaced with API call later
        const timeRemaining = 180000;
        this.setState({
          timeRemaining
        })

        setInterval(this.updateTimeRemaining, 1000)
    }
    
    componentWillUnmount() {
        clearInterval(this.state.timeRemaining)
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
                    <p>The current number is {displayNumber}</p>
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
                        <label htmlFor='pointwager'>
                            I bet
                        </label>
                        <Input
                            name='pointwager'
                            id='pointwager'
                            type='number'
                            min='0'
                            max={bank}
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
                            onChange={this.updateFormSelect}
                        >
                            <option value ='higher'>higher</option>
                            <option value = 'lower'>lower</option>
                        </select>
                        <Button
                            type='submit'
                            onClick={this.handleWagerSubmit}
                        >
                            Update wager
                        </Button>
                        <Button
                            type='reset'
                            onClick={this.handleWagerCancel}
                        >
                            Cancel wager
                        </Button>
                    </div>
                    {this.renderPointTotal()}
                </form>
            </section>
        )
    }    
}