import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '../Utils/Utils';

export default class Game extends React.Component {
    /*ToDos
        handle submit wager form resets fields
        setstate for outcome
        render modal for outcome
        setstate so after comparison drawnNumber becomes displayNumber and then drawnNumber is re-randomized
        remove comments from functions
    */
    state = {
        bank: 100,
        currentWager: 0,
        currentComparison: '',
        displayNumber: 0,
        drawnNumber: 0,
        error: null,
        formInput: 0,
        formSelect: 'higher',
        outcome: false,
        timeRemaining: 0,
    }

    updateBank = (num) => {
        this.setState({
            bank: num
        })
    }

    updateCurrentWager = (ev) => {
        //on form submit
    }

    updateCurrentComparison = () => {
        //on form submit
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

    handleWagerSubmit = (ev) => {
        ev.preventDefault()
        this.setState({
            currentComparison: this.state.formSelect,
            currentWager: this.state.formInput,
            formInput: 0,
            formSelect: 'higher'
        })
        //somehow reset
        //this.form.reset() and HTMLFormElement.reset() both crash
    }

    handleWagerCancel = () => {
        this.setState({
            currentWager: 0,
            formSelect: ''
        })
    }

    handleCompareNumbers = () => {
        //compare display and drawn number
        /*if (drawn > display && this.state.formSelect === 'higher') || (drawn < display && this.state.formSelect ==='lower') win {
            add this.state.currentWager to this.state.bank
        }*/
        /*else lose {
            subtract this.state.currentWager from this.state.bank
        }*/
        //send to API new bank
        //set this.state.outcome to true
        //modal div with the results that has confirmation button that toggles this.state.outcome to false
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
        const bank = this.state.bank
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
        let bank = this.state.bank
        let displayNumber = this.state.displayNumber
        let error = this.state.error
        

        return (
            <section>
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