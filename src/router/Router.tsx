import React, { memo } from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../components/pages/Home"
import Login from "../components/pages/Login"
import Signup from "../components/pages/Signup"

const Router: React.VFC = memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
    </Switch>
  )
})

export default Router