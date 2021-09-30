import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "api/registration/auth"
import Cookies from "js-cookie"
import { AuthContext } from "App";

const useSignout = () => {
  const { setIsSignedIn } = useContext(AuthContext)
  const history = useHistory();
  
  const signOutUser = async () => {
    try {
      const res = await signOut()
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
  
        setIsSignedIn(false)
  
        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
      history.push("/login")
    } catch (err) {
      console.log(err)
    }
  }
  return { signOutUser }
};
export default useSignout