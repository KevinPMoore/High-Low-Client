import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

/*
data:
  - timeRemaining,
  - currentWager,
  - formInput,
  - bank,
  - outcome,
  - displayNumber,
  - drawnNumber,


elements:
  - form
    - amount to wager up to value of bank
  - currentWager
  - displayNumber
  - timeRemaining
  - outcome display (displayNumber vs drawnNumber)


*/

class App extends React.Component {

  state = {
    user: false,
    hasError: false,
  }

  handleUser() {
    this.setState(state => ({
      user: !this.state.user
    }))
  }

  render() {

    return (
      <main className='App'>
        {/* content goes here */}
      </main>
    );
  }
}

export default App;