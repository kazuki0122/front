import { signUp } from "api/registration/auth"
import { AuthContext } from "App"
import { SignUpParams } from "interfaces"
import Cookies from "js-cookie"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import useMessage from "../info/useMessage"


const useSignup = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  // const history =  useHistory()
  const {showMessage} = useMessage()
  
  const createUser = async (name: string, email: string, phoneNumber: string, password: string, passwordConfirmation: string,userId: string) => {

    const params: SignUpParams = {
      name: name,
      email: email,
      user_id: userId,
      phone_number: phoneNumber,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        // history.push("/")
        // showMessage({title: 'ユーザー登録が完了しました', status: 'success'})
      } else {

      }
    } catch (err) {
      console.log(err)
      showMessage({title: 'ユーザー登録に失敗しました', status: 'error'})
    }
  }
  return {createUser}
}

export default useSignup
