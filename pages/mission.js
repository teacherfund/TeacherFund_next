import React from 'react'
import { Box, List, Heading, Text } from '@chakra-ui/react'
import PageWrapper from '../components/pageWrapper'
import Link from 'next/link'

const Mission = () => {
  return (
    <PageWrapper title='Our Mission – The Teacher Fund'>
      <div className='w-100 h-100 min-vh-100 flex-column flex bg-card pt5'>
        <h1 className='tf-dark-gray tc w-100 ts-title tf-oswald fl pt4 mv0'>
          Our Mission
        </h1>
        <div className='flex-row tf-lato-lite pa3 w-80-m w-70-l mh-auto'>

          <Box marginBottom='1rem'>94 percent of public school teachers spent their own money on school supplies in 2021.</Box>

          <Box marginBottom='1rem'>To this day, teachers aren't given the resources to properly educate our children. Making an average of $46,000 a year, public school teachers spend their own money to provide a better learning environment for our children. We thought, “How is this possible?” and sought to change this through The Teacher Fund.</Box>

          <Box marginBottom='1rem'>A Washington-based non-profit, The Teacher Fund provides funding and resources to public school teachers in the hope of positively impacting the lives of both teachers and students.</Box>

          <Box marginBottom='1rem'>We want to make a difference. And thanks to the wonderful teachers and advisors we had throughout our educations, we feel empowered to do so. Teachers open our eyes and show us what is possible; now it is our turn to pay it forward.</Box>

          <Box marginBottom='1rem'>Please consider a donation to help impact the lives of so many teachers and students.</Box>

          <Box marginTop='2rem'>
            <Heading marginBottom='1rem'>Organization Goals</Heading>

            <List.Root>
              <List.Item>
                <Text>
                    Increase access to classroom resources
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                    Strengthen school and teacher engagement
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                    Foster sustainable community partnerships
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                    Enhance visibility and awareness of teacher resource status and needs
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                    Ensure operational excellence and accountability
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                    Deploy technological solutions to improve and enhance the above goals
                </Text>
              </List.Item>
            </List.Root>
          </Box>

          <div className=' db center  w-40-l w-80 pv3 pb0-ns ph4 tc pointer mt4'>
            <Link
              href='/donate'
              className='btn-primary no-underline pa3 db br-pill tf-lato b v-mid bg-tf-yellow w-80 m-auto'>
              Donate
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Mission
