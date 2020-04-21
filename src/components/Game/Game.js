import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Game extends React.Component {
    state = {
        timeRemaining: 0,
        bank: 0,
        displayNumber: 1,
        drawnNumber: 2,
        outcome: true,
        formInput: '',
        currentWager: 0
    }

    updateTimeRemaining = () => {
        this.setState({
          timeRemaining: this.state.timeRemaining - 1000
        })
    }

    componentDidMount() {
        // get the data with the event date 
        const mockTime = new Date(Date.UTC(2020, 2, 27, 17, 41, 0))
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

        return (
            <section className = "game">
                <p>{mins}</p>
                <p>{seconds}</p>
            </section>
        )
    }    
}