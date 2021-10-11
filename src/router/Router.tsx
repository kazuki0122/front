import { AuthContext } from "App"
import Group from "components/pages/groups/Group"
import Users from "components/pages/users"
import React, { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Login from "../components/registration/Login"
import Signup from "../components/registration/Signup"
import Mypage from "components/pages/Mypage"
import Loading from "components/layouts/Loading"
import Detail from "components/pages/groups/Detail"
import Page404 from "components/pages/Page404"

const Router: React.VFC = () => {
  const { isSignedIn, loading } = useContext(AuthContext)
  return (
    <Switch>
      <Route path='/login'>
        {isSignedIn || loading ? <Redirect to="/mypage" /> : <Login />}
      </Route>
      <Route path='/signup'>
        { isSignedIn && !loading ? <Redirect to="/mypage" /> : <Signup /> }
      </Route>
        <Route exact path="/">
          {isSignedIn || loading ?  <Mypage /> : <Redirect to='login' />}
        </Route>
        <Route 
          path="/group/:id" 
          render={() => (
            // 自分がそのグループに所属していようがしていなかろうが、この条件の書き方だとurlで遷移できなくなってる。。
            <Switch>
              {isSignedIn || loading ?
                <>
                  <Route exact path='/group/:id'>
                    <Group />
                  </Route>
                  <Route exact path='/group/:id/detail'>
                    <Detail />
                  </Route>
                </>
                : 
                <Redirect to='/login' />
              }
            </Switch>
          )}
        />
        <Route path="/users">
         {isSignedIn || loading ?  <Users /> : <Redirect to='login' />}
        </Route>
        <Route path="/mypage">
          {isSignedIn || loading ?  <Mypage /> : <Redirect to='login' />}
        </Route>
        <Route path="/load">
          <Loading/>
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
    </Switch>
  )
}

export default Router