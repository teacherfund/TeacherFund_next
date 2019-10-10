import React from 'react'

const BlogComponent = ({ content }) =>
  (<div className='blog-component pa4' >
    <img src={content.imgUrl} />
    <div className='main-content'>
      <div className='title tl pa3 fw6 ttc'>{content.title}</div>
      <div className='content pa2 fw4 lh-copy'>{content.content}</div>
    </div>
  </div>)

function BlogList ({ blogs, selectedSchool }) {
  return (
    <div className='blog pa2'>
      {
        blogs
          .filter((blog) => (selectedSchool === 'All' || blog.school === selectedSchool)) // filter blogs based on selected school
          .map((content) => <BlogComponent content={content} key={content.blogId} />) // render the selected blog
      }
    </div>
  )
}

export default BlogList
