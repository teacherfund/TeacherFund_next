import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import Nav from '../components/nav'
import Head from '../components/head'
import Link from 'next/link'
import ScrollToTop from '../components/ScrollToTop'

// import '../public/styles/main.scss'

const PageWrapper = (props) => {
  return <>
    <Head title={props.title} />
    <a href='#main-content' className='skip-link tf-oswald'>Skip to main content</a>
    <Nav />
    {!false && ( // false right now to never show banner, can change this to re use banners in the nav in the future
      <Box width='100%' height='auto' display='flex' padding='1rem 3rem' textAlign='center' bg='tomato'>
        <Text margin='auto'>Looking to purchase tickets to the Fall 2022 Seattle fundraising event? Click{' '}
          <Link href={'/tickets'} className='white no-underline mv4 w5 center'>
            here
          </Link>
        </Text>
      </Box>
    )}
    <main id='main-content' tabIndex='-1'>
      {props.children}
    </main>
    <ScrollToTop />
  </>
}

export default PageWrapper
