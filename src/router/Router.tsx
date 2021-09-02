import { AuthContext } from "App"
import Group from "components/pages/Group"
import Select from "components/pages/Select"
import Users from "components/pages/Users"
import React, { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from "../components/pages/Home"
import Login from "../components/pages/Login"
import Signup from "../components/pages/Signup"

const Router: React.VFC = () => {
  const { loading, isSignedIn } = useContext(AuthContext)
  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/login」ページに促す
  // const Private = ({ children }: { children: React.ReactElement }) => {
  //     if (isSignedIn) {
  //       return children
  //     } else {
  //       return <Redirect to="/login" />
  //     }
  //   }

  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/group/:id">
          <Group />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/select">
          <Select />
        </Route>

    </Switch>
  )
}

export default Router