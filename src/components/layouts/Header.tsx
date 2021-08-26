import React, {useContext} from 'react'
import { Button, Flex, Heading, Spacer} from "@chakra-ui/react"
import { useHistory } from "react-router";
import Cookies from "js-cookie"
import { signOut } from "lib/api/auth"
import { AuthContext } from 'App';

const Header: React.VFC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const history = useHistory();
  
  const onClickLogin = () => history.push('/login');
  const onClickSignUp = () => history.push('/signup');

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const Buttons = () => {
    if (!loading) {
      if (isSignedIn) {  
        return (
        <Button
          bg="orange.300" 
          color="white" 
          variant="outline" 
          mr={4} 
          _hover={{bg: 'orange.400'}}
          onClick={handleSignOut}
        >
          ログアウト
        </Button>
        )
      } else {
        return(
        <>
          <Button 
            bg="orange.300" 
            color="white" 
            variant="outline" 
            mr={4} 
            _hover={{bg: 'orange.400'}}
            onClick={onClickLogin}
            >
            ログイン
          </Button>
          <Button 
            bg="orange.300" 
            color="white" 
            variant="outline"
            _hover={{bg: 'orange.400'}}
            onClick={onClickSignUp}
          >
            新規登録
          </Button>
        </>
        )
      }
    } else {
      return <></>
    }
  }
  return (
    <Flex
      bg="orange.300"
      color="white"
      p={7}
    >
      <Flex align="center" mr={5}>
        <Heading 
          as="h1" 
          size="lg" 
          letterSpacing={"tighter"}
        >
          Early Bird
        </Heading>
      </Flex>
      <Spacer />
      <Flex>
        <Buttons />
      </Flex>
    </Flex>
  )
}

export default Header
