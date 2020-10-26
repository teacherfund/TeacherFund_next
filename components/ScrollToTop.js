import React, { useState, useEffect } from 'react'
import '../public/styles/main.scss'
import { Flex, PseudoBox, IconButton } from '@chakra-ui/core'

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
      <PseudoBox _hover={{ color: '#f6b333' }}>
        <IconButton
          icon='chevron-up'
          variantColor='black'
          variant='outline'
          aria-label='Top'
          fontSize='25px'
          onClick={scrollBackFn}
          position='fixed'
          borderRadius='50%'
          bottom={['50px', '200px']}
          right='30px'
          display={show ? 'block' : 'none'}
          cursor='pointer'
        />
      </PseudoBox>
    </Flex>
  )
}

export default ScrollToTop
