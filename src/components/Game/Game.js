import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '../Utils/Utils';

export default class Game extends React.Component {
    /*ToDos
        setstates for wager form
        handle update wager form
        setstate for outcome
        render alert for outcome
        fix values in updateDrawnNumber
        fix rendering in renderWagerMessage
        setstate so after comparison drawnNumber becomes displayNumber and then drawnNumber is re-randomized
        remove comments from functions
    */
    state = {
        bank: 0,
        currentWager: 0,
        displayNumber: 0,
        drawnNumber: 0,
        error: null,
        formSelect: 'higher',
        outcome: true,
        timeRemaining: 0,
    }

    updateDisplayNumber = () => {
        let numsArry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let randNum = numsArry[Math.floor(Math.random()*numsArry.length)]
        this.setState({
            displayNumber: randNum
        })
    }

    updateDrawnNumber = () => {
        let numsArry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let randNum = numsArry[Math.floor(Math.random()*numsArry.length)]
        if (randNum === this.state.displayNumber) {
            //reset the value so they don't match
        } else {
            this.setState({
                drawnNumber: randNum
            })
        }
    }

    updateFormSelect = (ev) => {
        this.setState({
            formSelect: ev.target.value
        })
    }

    updateTimeRemaining = () => {
        this.setState({
          timeRemaining: this.state.timeRemaining - 1000
        })
    }

    //this does not quite work as expected
    renderWagerMessage = () => {
        if (this.state.currentWager !== 0) {
            return(
                `<p>You bet {wager} points that the next number will be {formSelect}!</p>`
            )
        } else {
            return(
                `<p>You have not placed a bet, but there is still time!<p>`
            )
        }
    }

    componentDidMount() {
        //set the displayed number
        this.updateDisplayNumber()

        // get the data with the event date 
        
        const mockTime = new Date(Date.UTC(2020, 4, 1, 12, 0, 0))
        // get the local time, subtract from the event date and set state with the remaining time
        //convert this to tocal timezone of browser
        const currentTime = new Date();
    
        const timeRemaining = mockTime.getTime() - currentTime;
        this.setState({
          timeRemaining
        })
        // start interval so on every second we update the state timeremaining
        setInterval(this.updateTimeRemaining, 1000)
    }
    
    componentWillUnmount() {
        // clear the interval
        clearInterval(this.state.timeRemaining)
    }

    render() {
        const mins = Math.floor(this.state.timeRemaining / 60000);
        const seconds = Math.floor((this.state.timeRemaining / 1000) % 60)
        let error = this.state.error
        let displayNumber = this.state.displayNumber
        let wager = this.state.currentWager
        let formSelect = this.state.formSelect

        return (
            <section>
                <section className='countdown'>
                    <p>The current number is {displayNumber}</p>
                    <p>Time remaining: {mins} minutes and {seconds} seconds</p>
                    {this.renderWagerMessage()}
                </section>
                <form className='wagerform'>
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
                            required
                        >
                        </Input>
                        <label htmlFor='comparison'>
                            The next number will be
                        </label>
                        <select
                            name='comparison'
                            id='comparison'
                            onChange={this.updateFormSelect}
                        >
                            <option value ='higher'>Higher</option>
                            <option value = 'lower'>Lower</option>
                        </select>
                        <Button
                            type='submit'
                        >
                            Update wager
                        </Button>
                    </div>
                </form>
            </section>
        )
    }    
}