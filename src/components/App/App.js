import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../../routes/Home/HomeRoute';
import Login from '../../routes/Login/LoginRoute';
import SignUp from '../../routes/SignUp/SignUpRoute';
import Game from '../../routes/Game/GameRoute';
import Account from '../../routes/Account/AccountRoute';
import NotFound from '../../routes/NotFound/NotFoundRoute';

class App extends React.Component {

  state = {
    bank: 10,
    hasError: false,
    loggedIn: false,
    user: 'test',
  }

  updateBank = (num) => {
    this.setState({
        bank: num
    })
  }

  updateHasError = () => {
    this.setState({
      hasError: !this.state.hasError
    })
  }

  updateLoggedIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  updateUser = (name) => {
    this.setState({
      user: name
    })
  }

  render() {

    return (
      <div className='App'>
        <header className='App_header'>
          <Header loggedIn={this.state.loggedIn} updateLoggedIn={this.updateLoggedIn}/>
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
             render={(routeProps) => (<Login {...routeProps} updateUser={this.updateUser} updateLoggedIn={this.updateLoggedIn}/>)}
            />

            <Route
             /*MAKE PUBLIC ONLY*/
             path={'/signup'}
             render={(routeProps) => (<SignUp {...routeProps} updateUser={this.updateUser} updateLoggedIn={this.updateLoggedIn}/>)}
            />

            <Route
             /*MAKE PRIVATE ONLY*/
             path={'/game'}
             render={(routeProps) => (<Game {...routeProps} bank={this.state.bank} updateBank={this.updateBank}/>)}
            />

            <Route
             /*MAKE PRIVATE ONLY*/
             path={'/account'}
             render={(routeProps) => (<Account {...routeProps} bank={this.state.bank} user={this.state.user} updateBank={this.updateBank}/>)}
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