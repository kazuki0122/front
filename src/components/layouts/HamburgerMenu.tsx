import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box, 
  Divider,
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerHeader, 
  DrawerOverlay, 
  Flex, 
  Stack,  
  useDisclosure 
} from '@chakra-ui/react'
import { signOut } from 'api/user/auth'
import { AuthContext } from 'App'
import Cookies from 'js-cookie'
import GroupForm from './GroupForm'

type Props = {
  onClose: () => void;
  isOpen: boolean;
}

const HamburgerMenu:React.VFC<Props> = (props) => {
  const { onClose,isOpen } = props;
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext)
  
  const { 
    isOpen: isOpenModal,
    onOpen: onOpenModal, 
    onClose: onCloseModal 
  } = useDisclosure()

  const history = useHistory();

  const onClickLogin = () => history.push('/login');
  const onClickSignUp = () => history.push('/signup');

  const handleSignOut = async () => {
    try {
      const res = await signOut()
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/login")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    >
    <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>メニュー</DrawerHeader>
        <DrawerBody>
          { isSignedIn
            ?
            <>
            <Stack spacing={4} cursor="pointer" position="relative">
              <Divider />
              <Flex justify={'center'}>
                <Box onClick={handleSignOut}>
                  ログアウト
                </Box>
                <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
              </Flex>
              <Divider />
                <Flex justify={'center'}>
                  <Box onClick={ onOpenModal }>
                    グループ作成
                    <GroupForm isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
                  </Box>
                  <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                </Flex>
              <Divider />
                <Flex justify={'center'}>
                  <Box>
                    マイページ
                  </Box>
                  <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                </Flex>
              <Divider />
              </Stack>
            </>
            :
            <>
              <Stack spacing={4} cursor="pointer" position="relative">
                <Divider />
                  <Flex justify={'center'}>
                    <Box onClick={onClickLogin}>
                      ログイン
                    </Box>
                    <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                  </Flex>
                <Divider  />
                  <Flex justify={'center'}>
                    <Box onClick={onClickSignUp} >
                      新規登録
                    </Box>
                    <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                  </Flex>
                <Divider />
              </Stack>
            </>
          }
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
export default HamburgerMenu
