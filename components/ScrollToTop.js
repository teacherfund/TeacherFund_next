import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const scrollFunc = () => {
      if (window.scrollY > 100) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    window.addEventListener('scroll', scrollFunc)
  }, [])

  const scrollBackFn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Flex>
      <Box _hover={{ color: '#f6b333' }}>
        <ChevronUpIcon
          variant='outline'
          aria-label='Top'
          fontSize='25px'
          onClick={scrollBackFn}
          position='fixed'
          borderRadius='50%'
          w={8} h={8}
          bottom={['50px']}
          right='30px'
          display={show ? 'block' : 'none'}
          cursor='pointer'
        />
      </Box>
    </Flex>
  )
}

export default ScrollToTop
