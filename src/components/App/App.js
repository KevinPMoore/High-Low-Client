import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../../routes/Home/HomeRoute';
import Login from '../../routes/Login/LoginRoute';
import SignUp from '../../routes/SignUp/SignUpRoute';
import Game from '../../routes/Game/GameRoute';
import Account from '../../routes/Account/AccountRoute';
import NotFound from '../../routes/NotFound/NotFoundRoute';

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
      <div className='App'>
        <header className='App_header'>
          {/*header component here*/}
        </header>
        <main className='App_main'>
          {this.state.hasError && <p className='Error_text'>An error occured, please try again.</p>}

           <Switch>
            <Route
              exact
              path={'/'} 
              component={Home}
            />

            <Route
             /*MAKE PUBLIC ONLY*/
             path={'/login'}
             component={Login}
            />

            <Route
             /*MAKE PUBLIC ONLY*/
             path={'/signup'}
             component={SignUp}
            />

            <Route
             /*MAKE PRIVATE ONLY*/
             path={'/game'}
             component={Game}
            />

            <Route
             /*MAKE PRIVATE ONLY*/
             path={'/account'}
             component={Account}
            />

            <Route
             component={NotFound}
            />
           </Switch>
        </main>
      </div>
    );
  }
}

export default App;