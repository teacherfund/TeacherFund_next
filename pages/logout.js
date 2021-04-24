/* global fetch */
import { useEffect } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Card from '../components/card'

const Logout = () => {
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/logout')
    router.push('/')
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <Flex backgroundColor='gray.100' height='100vh'>
      <Card margin='auto' marginTop='10rem' borderRadius='1rem'>
        <Text fontSize='4rem'>Signing out...</Text>
      </Card>
    </Flex>
  )
}

export default Logout
