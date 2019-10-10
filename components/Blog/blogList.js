import React from 'react'

const Blog = ({ content }) =>
  (<div className='blog-component pa4' >
    <img src={content.imgUrl} className='mt5 mr4 mb4 ml0 w4 h4 br-100' alt={content.school} />
    <h2 className='title tl pa3 ttc f3 measure tf-lato'>{content.title}</h2>
    <div className='pa1 lh-copy tf-lato-lite'>{content.content}</div>
    <a className='fw9 pt1 lh-copy f6 measure-wide helvetica'>READ MORE</a>
  </div>)

function BlogList ({ blogs, selectedSchool }) {
  return (
    <div className='pa2'>
      {
        blogs
          .filter((blog) => (selectedSchool === 'All' || blog.school === selectedSchool)) // filter blogs based on selected school
          .map((content) => <Blog content={content} key={content.blogId} />) // render the selected blog
      }
    </div>
  )
}

export default BlogList
