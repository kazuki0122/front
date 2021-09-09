import { signIn } from "api/user/auth"
import { AuthContext } from "App"
import { SignInParams } from "interfaces"
import Cookies from "js-cookie"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import useMessage from "./useMessage"

const useLogin = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const history = useHistory()
  const {showMessage} = useMessage()

  const loginUser = async ( email: string, password: string) => {
    const params: SignInParams = {
      email: email,
      password: password
    }
  
    try {
      const res = await signIn(params)
      console.log(res)
  
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])
  
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
  
        history.push("/")
        showMessage({title: 'ログインしました', status: 'success'})
      } 
    } catch (err) {
      console.log(err)
      showMessage({title: 'ログインに失敗しました', status: 'error'})
    }
  }
  return {loginUser}
}

export default useLogin