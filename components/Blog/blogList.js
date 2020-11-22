import { useState } from 'react'
import { ALL_SCHOOL } from './blog_posts'
import { Flex, Box, Heading, Link, Image } from '@chakra-ui/core'

const Blog = ({ content }) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <Flex padding={{ base: '2rem', lg: '2rem' }} marginLeft={{ base: 0, lg: '15rem' }} className='blog-component' >
      <Flex flexDirection='column'>
        <Heading as='h2' size='lg' fontWeight='100' textDecoration='underline'>
          <Box>
            {content.title}
          </Box>
        </Heading>
        {!showAll && <Box marginBottom='2rem' paddingTop='2rem' className='tf-lato'>{content.summary}...</Box>}
        {showAll && (
          <>
            <Box marginBottom='2rem' paddingTop='2rem' className='tf-lato'>{content.content}</Box>
            {content.images.map((imgSrc, i) => (
              <Image src={imgSrc} key={i} marginTop='1rem' />
            ))}
          </>
        )}
        <Link
          onClick={() => !showAll ? setShowAll(true) : setShowAll(false)}
          fontWeight='600'
          fontFamily='helvetica'
          marginTop='1rem'
          color='tf-teal'
          className='read-more fw9 tf-teal lh-copy measure-wide'
        >
          {!showAll ? 'READ MORE' : 'SHOW LESS'}
        </Link>
      </Flex>
    </Flex>
  )
}

function BlogList ({ blogs, selectedSchool }) {
  return (
    <Box padding='1rem'>
      {
        blogs
          .filter((blog) => (selectedSchool === ALL_SCHOOL || blog.school === selectedSchool)) // filter blogs based on selected school
          .map((content) => <Blog content={content} key={content.blogId} />) // render the selected blog
      }
    </Box>
  )
}

export default BlogList
