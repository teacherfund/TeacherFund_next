import React from 'react'
import { Box } from '@chakra-ui/react'
import PageWrapper from '../components/pageWrapper'
import Link from 'next/link'

const Mission = () => {
  return (
    <PageWrapper title='Our Mission – The Teacher Fund'>
      <div className='w-100 h-100 min-vh-100 flex-column flex bg-card'>
        <h1 className='tf-dark-gray tc w-100 ts-title tf-oswald fl pt4 mv0'>
          Our Mission
        </h1>
        <div className='flex-row tf-lato-lite pa3 w-80-m w-70-l mh-auto'>

          <Box marginBottom='1rem'>94 percent of public school teachers spent their own money on school supplies in 2015.</Box>

          <Box marginBottom='1rem'>To this day, teachers aren't given the resources to properly educate our children. Making an average of $35,000 a year, public school teachers spend their own money to provide a better learning environment for our children. We thought, “How is this possible?” and sought to change this through The Teacher Fund.</Box>

          <Box marginBottom='1rem'>A Washington-based non-profit, The Teacher Fund provides funding and resources to public school teachers in the hope of positively impacting the lives of both teachers and students.</Box>

          <Box marginBottom='1rem'>Our impact begins in Idaho. Through funds raised from donors like you, we will help supply new teachers in School District 271 in Coeur d'Alene, ID with the supplies they need for success in the classroom, taking the first step toward ensuring that teachers’ classrooms are funded.</Box>

          <Box marginBottom='1rem'>Doubling as a test case, this step will help us gain crucial insights into the public school system to learn how and what our donors can supply to be most effective for teachers and their students.</Box>

          <Box marginBottom='1rem'>We want to make a difference. And thanks to the wonderful teachers and advisors we had throughout our educations, we feel empowered to do so. Teachers open our eyes and show us what is possible; now it is our turn to pay it forward.</Box>

          <Box marginBottom='1rem'>Please consider a donation to help impact the lives of so many teachers and students.</Box>
          <div className=' db center  w-40-l w-80 pv3 pb0-ns ph4 tc pointer'>
            <Link href='/donate'>
              <a className='btn-primary no-underline pa3 db br-pill tf-lato b v-mid bg-tf-yellow w-80 m-auto'>Donate</a>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Mission
