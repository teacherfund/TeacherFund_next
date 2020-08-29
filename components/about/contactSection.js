import { Box, Text, PseudoBox } from '@chakra-ui/core'
import { useState } from 'react'

import ContactForm from './contactForm'

const ContactSection = ({ contactPage, hideHeading, ...props }) => {
  const [formSubmit, setFormSubmit] = useState(false)

  const contactFormSubmitted = () => {
    setFormSubmit(true)
  }

  return (
    <Box
      as='section'
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
      backgroundColor='white'
      {...props}
    >
      <PseudoBox align='center'><h1>Contact Us</h1></PseudoBox>
      <Box width='100%' maxWidth='45rem'>
        {!formSubmit && (
          <Text
            textTransform='uppercase'
            textAlign={{ base: 'center', lg: 'left' }}
            color='ocean'
            fontWeight='bold'
            fontSize='0.875rem'
            marginBottom='2.5rem'
          >
            <Box as='span' display={{ base: 'block', md: 'inline-block' }}>
              Want to get in touch?{' '}
            </Box>
            <Box as='span'> Drop us a line.</Box>
          </Text>
        )}
        <ContactForm contactFormSubmitted={contactFormSubmitted} />
      </Box>
    </Box>
  )
}

export default ContactSection
