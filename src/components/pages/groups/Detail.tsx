import { Button } from '@chakra-ui/button'
import { BellIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'
import useFetchResult from 'hooks/group/useFetchResult'
import useFetchRules from 'hooks/group/useFetchRules'
import { User } from 'interfaces'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams()
  const [time, setTime] = useState('')
  const [billingAmount, setBillingAmount] = useState('')
  const {fetchRules} = useFetchRules()
  const {fetchResult, boolean, userData} = useFetchResult()
  const history =  useHistory()


  useEffect(() => fetchRules(id,setTime,setBillingAmount),[fetchRules, id])
  useEffect(() => fetchResult(id),[fetchResult,id])

  const handleClick = () => fetchResult(id)
  const moveGroupPage = () => history.push(`/group/${id}`)

  return (
    <>
      <Box
        fontSize="xl" 
        textAlign='center' 
        size='xl' 
        mx={'auto'} 
        maxW={'xl'} 
        py={12} 
        px={6}
        boxShadow={'xl'}
      >
        {
          time !== '' && billingAmount !== '' ? 
            <Text>
              <BellIcon  w={8} h={8} color='#ECC94B' /><br/>
              設定された課金額は{billingAmount}円です。<br/>{time}に起きましょう！
            </Text>
          : <Text>
              <BellIcon  w={8} h={8} color='#ECC94B' /><br/>
              起きる時間と罰金額を設定しましょう!
            </Text>
        }
      </Box>
      <Flex
        mx={'auto'} 
        maxW={'xl'} 
        justify='center'
      >
        <Button 
          onClick={handleClick}
          mr='5'
        >
          結果を取得
        </Button>
        <Button onClick={moveGroupPage}>
          グループ画面に戻る
        </Button>
      </Flex>
      <Box
        fontSize="xl" 
        textAlign='center' 
        size='xl' 
        mx={'auto'} 
        maxW={'xl'} 
        py={12} 
        px={6}
        boxShadow={'xl'}
      >
        {
          boolean === true ?
          <Box 
            mx={'auto'} 
            maxW={'xl'}
            textAlign="center"
          >
            前回は課金が発生しませんでした！
          </Box>
          :
          userData.map((user: User) => (
            <Box
              mx={'auto'} 
              maxW={'xl'}
              textAlign="center"
            >
              {`前回は${user.name}さんが起きれなかったので課金されました`}
            </Box>
          ))
        }
      </Box>
    </>
  )
}

export default Detail
