import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps} bank={props.bank} updateBank={props.updateBank} user={props.user} userId={props.userId}/>
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}