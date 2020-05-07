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
    user: '',
    userId: 0
  }

  setInitialState = () => {
    //setuserinfo using a get request by ID
  }

  updateBank = (num) => {
    const id = this.state.userId
    UserApiService.patchUser(id, num)
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

  updateUser = (name) => {
    this.setState({
      user: name
    })
  }

  updateUserId = (id) => {
    this.setState({
      userId: id
    })
  }

  render() {

    return (
      <div className='App'>
        <header className='App_header'>
          <Header />
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
             //render={(routeProps) => (<Login {...routeProps} updateUserId={this.updateUserId} updateLoggedIn={this.updateLoggedIn}/>)}
            />

            <PublicOnlyRoute
             path={'/signup'}
             component={SignUp}
             //render={(routeProps) => (<SignUp {...routeProps} updateUserId={this.updateUserId} updateLoggedIn={this.updateLoggedIn}/>)}
            />

            <PrivateOnlyRoute
             path={'/game'}
             component={Game}
             //render={(routeProps) => (<Game {...routeProps} bank={this.state.bank} updateBank={this.updateBank}/>)}
            />

            <PrivateOnlyRoute
             path={'/account'}
             component={Account}
             //render={(routeProps) => (<Account {...routeProps} bank={this.state.bank} user={this.state.user} userId={this.state.userId} updateBank={this.updateBank}/>)}
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