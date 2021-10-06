import { AuthContext } from "App"
import Group from "components/pages/groups/Group"
import Users from "components/pages/users"
import React, { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import Login from "../components/registration/Login"
import Signup from "../components/registration/Signup"
import Mypage from "components/pages/Mypage"
import Loading from "components/layouts/Loading"
import GroupDetail from "components/pages/groups/GroupDetail"

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
          <Mypage />
        </Route>
        <Route 
          path="/group/:id" 
          render={() => (
            <Switch>
              <Route exact path='/group/:id'>
                <Group />
              </Route>
              <Route exact path='/group/:id/detail'>
                <GroupDetail />
              </Route>
            </Switch>
          )}
        />
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/load">
          <Loading/>
        </Route>
    </Switch>
  )
}

export default Router