import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import Nav from '../components/nav'
import Head from '../components/head'
import Link from 'next/link'
import ScrollToTop from '../components/ScrollToTop'

const PageWrapper = (props) => {
  const shouldShowBanner = false /* !props.noShowBanner */
  return <>
    <Head
      title={props.title}
      description={props.description}
      url={props.url}
    />
    <a href='#main-content' className='skip-link tf-oswald'>Skip to main content</a>
    <Nav />
    {shouldShowBanner ? (
      <>
        <Box
          width='100%'
          height='auto'
          display='flex'
          padding='1.2rem 3rem'
          textAlign='center'
          bg='tomato'
          className='sticky z-998'
          style={{
            top: 'var(--nav-height, 80px)',
            position: 'sticky',
            zIndex: 998
          }}
        >
          <Text margin='auto'>Looking to purchase tickets to the Spring 2025 Seattle fundraising event? Click{' '}
            <Link href={'/tickets?frequency=patron'} className='white no-underline mv4 w5 center'>
              here
            </Link>
          </Text>
        </Box>
        <div style={{ height: '80px' }} />
      </>
    ) : (
      <>
        <Box />
        <div style={{ height: '80px' }} />
      </>
    )}
    <main id='main-content' tabIndex='-1'>
      {props.children}
    </main>
    <ScrollToTop />
  </>
}

export default PageWrapper
