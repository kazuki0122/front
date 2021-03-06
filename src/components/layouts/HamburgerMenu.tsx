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
import { AuthContext } from 'App'
import CreateGroupForm from '../modals/CreateGroupForm'
import useSignOut from 'hooks/registration/useSignout'

type Props = {
  onClose: () => void;
  isOpen: boolean;
}

const HamburgerMenu:React.VFC<Props> = (props) => {
  const { onClose,isOpen } = props;
  const { isSignedIn } = useContext(AuthContext)
  const { signOutUser } = useSignOut()
  const { 
    isOpen: isOpenModal,
    onOpen: onOpenModal, 
    onClose: onCloseModal 
  } = useDisclosure()
  const history = useHistory();

  // 画面移動
  const moveLogin = () => history.push('/login');
  const moveSignUp = () => history.push('/signup');
  const moveMypage = () => history.push("/mypage");
  const moveUsers = () => history.push("/users");
  // ログアウト
  const onClickSignOut = () => signOutUser();

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
                  <Box onClick={moveMypage}>
                    マイページ
                  </Box>
                  <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                </Flex>
              <Divider />
                <Flex justify={'center'}>
                  <Box onClick={ onOpenModal }>
                    グループ作成
                    <CreateGroupForm isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
                  </Box>
                  <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                </Flex>
              <Divider />
              <Flex justify={'center'}>
                  <Box onClick={moveUsers}>
                    友達追加
                  </Box>
                  <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                </Flex>
              <Divider />
              <Flex justify={'center'}>
                <Box onClick={onClickSignOut}>
                  ログアウト
                </Box>
                <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
              </Flex>
              </Stack>
            </>
            :
            <>
              <Stack spacing={4} cursor="pointer" position="relative">
                <Divider />
                  <Flex justify={'center'}>
                    <Box onClick={moveLogin}>
                      ログイン
                    </Box>
                    <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                  </Flex>
                <Divider  />
                  <Flex justify={'center'}>
                    <Box onClick={moveSignUp} >
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
