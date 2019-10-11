import React from 'react'
import { ALL_SCHOOL } from './utils'

const Blog = ({ content }) =>
  (<div className='blog-component pa4 flex' >
    <img src={content.imgUrl} className='mt2 mr4 mb4 ml0 w4 h4 br-100' alt={content.school} />
    <div className='flex-column'>
      <h2 className='mt2 mb2'><a className='title tl ttc f3 measure tf-lato black'>{content.title}</a></h2>
      <div className='pa1 lh-copy tf-lato-lite mt2 mb2'>{content.content}</div>
      <a className='read-more fw9 pt1 lh-copy f6 measure-wide helvetica'>READ MORE</a>
    </div>
  </div>
  )

function BlogList ({ blogs, selectedSchool }) {
  return (
    <div className='pa2'>
      {
        blogs
          .filter((blog) => (selectedSchool === ALL_SCHOOL || blog.school === selectedSchool)) // filter blogs based on selected school
          .map((content) => <Blog content={content} key={content.blogId} />) // render the selected blog
      }
    </div>
  )
}

export default BlogList
