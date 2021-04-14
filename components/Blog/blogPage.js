import BlogList from './blogList'
import SideNav from './SideNav'
import useToRenderBlog from './blog_posts'
import React from 'react'
import { Flex } from '@chakra-ui/react'

function BlogPage () {
  const [blogs, schoolNames, userSelectedSchool, changeUserSelectedSchool] = useToRenderBlog()
  return (
    <Flex
      as='section'
      className='bg-card'
      justifyItems='center'
      minHeight='100vh'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
    >
      <SideNav schools={schoolNames} selectedSchool={userSelectedSchool} onSchoolSelected={changeUserSelectedSchool} />
      <BlogList blogs={blogs} selectedSchool={userSelectedSchool} />
    </Flex>
  )
}
export default BlogPage
