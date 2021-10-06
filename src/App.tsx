import React, { useState, useEffect, createContext } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter} from "react-router-dom";
import Router from "router/Router";
import Header from "components/layouts/Header";
import { getCurrentUser } from "api/registration/auth";
import { User } from "interfaces/index"


// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  handleGetCurrentUser: () => Promise<void>
})

const App: React.VFC = () => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
        // currentUserのレコード
        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])
  
  return(
    <div className="App">
      <ChakraProvider>
        <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, handleGetCurrentUser}}>
          <BrowserRouter>
          <Header />
            <Router />
          </BrowserRouter>
        </AuthContext.Provider>
      </ChakraProvider>
    </div>
  )
};

export default App
