import React, { Component } from 'react'
import { Box } from '@chakra-ui/core'
import PageWrapper from '../components/pageWrapper'

class Success extends Component {
  static defaultProps = {
    tweet: 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ftheteacherfund.com%2f&text=I%20just%20donated%20to%20TeacherFund,%20check%20it%20out%20at'
  };

  render () {
    return (
      <PageWrapper title='Donation Successful – The Teacher Fund'>
        <Box width='100%' height='100%'>
          <Box width='100%' height='100%' position='absolute' className='bg-tf-gray o-10 z-minus-1' />
          <Box paddingTop='9rem' className='bn ba br2 flex flex-column pa4-ns pa2 pb4 w-50-ns tf-lato tc m-auto'>
            <p className='pb1'><b>Thank you!</b></p>
            <p className='pb1'>Your donation helps teachers and students across the country.</p>
            <p className='pb1'>If you have an account, we'll be in touch when your funds are spent so you can see exactly what your money is being spent on.</p>
            <div>
              <a className='white no-underline pa3 db br-pill tf-lato b v-mid bg-tf-teal w-50 m-auto tc' href={this.props.tweet} data-size='large' target='_blank'>Spread the Word</a>
            </div>
          </Box>
        </Box>
      </PageWrapper>
    )
  }
}
export default Success
