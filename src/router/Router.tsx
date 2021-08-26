import { AuthContext } from "App"
import React, { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from "../components/pages/Home"
import Login from "../components/pages/Login"
import Signup from "../components/pages/Signup"

const Router: React.VFC = () => {
  const { loading, isSignedIn } = useContext(AuthContext)
  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/login」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/login" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Private>
        <Route exact path="/">
          <Home />
        </Route>
      </Private>
    </Switch>
  )
}

export default Router