import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Separator,
  CardBody,
  Badge
} from '@chakra-ui/react'
import Card from '../card'

const ContactEmailTemplate = ({ name, email, subject, message }) => {
  return (
    <Box
      bg='gray.50'
      minH='100vh'
      py={8}
      fontFamily='body'
    >
      <Container maxW='2xl' centerContent>
        <Card
          w='full'
          shadow='lg'
          borderRadius='lg'
          overflow='hidden'
        >
          <CardBody p={8}>
            {/* Header */}
            <VStack spacing={6} align='stretch'>
              <Box>
                <Heading
                  as='h1'
                  size='xl'
                  color='blue.600'
                  fontFamily='heading'
                  mb={2}
                >
                  The Teacher Fund
                </Heading>
                <Text color='gray.600' fontWeight='light'>
                  Contact Form Submission
                </Text>
                <Separator borderColor='blue.600' borderWidth='2px' mt={4} />
              </Box>

              {/* Content */}
              <Box>
                <HStack spacing={3} align='center' mb={6}>
                  <Heading as='h2' size='lg' color='blue.600' fontFamily='heading'>
                    New Contact Form Message
                  </Heading>
                  <Badge colorScheme='blue' variant='subtle'>
                    New
                  </Badge>
                </HStack>

                <VStack spacing={5} align='stretch'>
                  {/* Name Field */}
                  <Box>
                    <Text fontWeight='bold' color='gray.700' mb={2}>
                      Name:
                    </Text>
                    <Box
                      bg='gray.50'
                      p={4}
                      borderRadius='md'
                      borderLeft='4px solid'
                      borderLeftColor='blue.600'
                    >
                      <Text wordBreak='break-word'>{name}</Text>
                    </Box>
                  </Box>

                  {/* Email Field */}
                  <Box>
                    <Text fontWeight='bold' color='gray.700' mb={2}>
                      Email:
                    </Text>
                    <Box
                      bg='gray.50'
                      p={4}
                      borderRadius='md'
                      borderLeft='4px solid'
                      borderLeftColor='blue.600'
                    >
                      <Text wordBreak='break-word' color='blue.600'>
                        {email}
                      </Text>
                    </Box>
                  </Box>

                  {/* Subject Field */}
                  <Box>
                    <Text fontWeight='bold' color='gray.700' mb={2}>
                      Subject:
                    </Text>
                    <Box
                      bg='gray.50'
                      p={4}
                      borderRadius='md'
                      borderLeft='4px solid'
                      borderLeftColor='blue.600'
                    >
                      <Text wordBreak='break-word' fontWeight='medium'>
                        {subject}
                      </Text>
                    </Box>
                  </Box>

                  {/* Message Field */}
                  <Box>
                    <Text fontWeight='bold' color='gray.700' mb={2}>
                      Message:
                    </Text>
                    <Box
                      bg='gray.50'
                      p={6}
                      borderRadius='md'
                      borderLeft='4px solid'
                      borderLeftColor='blue.600'
                    >
                      <Text
                        whiteSpace='pre-wrap'
                        wordBreak='break-word'
                        lineHeight='tall'
                      >
                        {message}
                      </Text>
                    </Box>
                  </Box>
                </VStack>
              </Box>

              {/* Footer */}
              <Box pt={6}>
                <Separator borderColor='gray.200' mb={4} />
                <VStack spacing={2} align='flex-start'>
                  <Text fontSize='sm' color='gray.500'>
                    This message was sent from the Teacher Fund contact form.
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    Please respond directly to:{' '}
                    <Text as='span' color='blue.600' fontWeight='medium'>
                      {email}
                    </Text>
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}

export default ContactEmailTemplate
