import React, { useState, useEffect } from 'react'
import { Flex, Box, IconButton } from '@chakra-ui/react'
import { FaChevronUp } from 'react-icons/fa6'

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const scrollFunc = () => {
      if (window.scrollY > 400) {
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
      <Box>
        <IconButton
          aria-label='Scroll to top'
          _hover={{ color: '#f6b333' }}
          variant='outline'
          fontSize='25px'
          onClick={scrollBackFn}
          position='fixed'
          borderRadius='50%'
          w={40} h={40}
          bottom={['50px']}
          right='30px'
          display={show ? 'block' : 'none'}
          cursor='pointer'
          border='none'
          bg='none'
        >
          <FaChevronUp />
        </IconButton>
      </Box>
    </Flex>
  )
}

export default ScrollToTop
