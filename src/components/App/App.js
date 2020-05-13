import React from 'react';
import UserApiService from '../../services/user-api-service'
import { Route, Switch } from 'react-router-dom';
import PrivateOnlyRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicRoute';
import Header from '../Header/Header';
import Home from '../../routes/Home/HomeRoute';
import Login from '../../routes/Login/LoginRoute';
import SignUp from '../../routes/SignUp/SignUpRoute';
import Game from '../../routes/Game/GameRoute';
import Account from '../../routes/Account/AccountRoute';
import NotFound from '../../routes/NotFound/NotFoundRoute';

class App extends React.Component {

  state = {
    bank: 0,
    hasError: false,
    loggedIn: false,
    user: '',
    userId: 0
  }

  setInitialState = ({bank, user_name, id}) => {
    console.log('setUser ran')
      this.setState({
        bank: bank,
        user: user_name,
        userId: id
      })
  }

  updateBank = (num) => {
    const id = this.state.userId
    const user = this.state.user
    UserApiService.patchUser(id, user, num)
    .then(
      this.setState({
          bank: num
      })
    )
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

  render() {

    return (
      <div className='App'>
        <header className='App_header'>
          <Header 
            loggedIn={this.state.loggedIn}
            updateLoggedIn={this.updateLoggedIn}
          />
        </header>
        <main className='App_main'>
          {this.state.hasError && <p className='Error_text'>An error occured, please try again.</p>}

           <Switch>
            <Route
              exact
              path={'/'} 
              component={Home}
            />

            <PublicOnlyRoute
             path={'/login'}
             component={Login}
             setUser={this.setInitialState}
            />

            <PublicOnlyRoute
             path={'/signup'}
             component={SignUp}
             setUser={this.setInitialState}
            />

            <PrivateOnlyRoute
             path={'/game'}
             component={Game}
             bank={this.state.bank} 
             updateBank={this.updateBank}
            />

            <PrivateOnlyRoute
             path={'/account'}
             component={Account}
             bank={this.state.bank} 
             user={this.state.user} 
             userId={this.state.userId} 
             updateBank={this.updateBank}
             updateLoggedIn={this.updateLoggedIn}
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