import React from 'react'
import './blog.scss'

const BlogComponent = ({ content }) =>
  (<div className='blog-component' >
    <img src={content.imgUrl} />
    <div className='main-content'>
      <div className='title'>{content.title}</div>
      <div className='content'>{content.content}</div>
    </div>
  </div>)

function BlogList ({ blogs, selectedCountry }) {
  return (
    <div className='blog'>
      {
        blogs
          .filter((blog) => (selectedCountry === 'All' || blog.country === selectedCountry)) // filter blogs based on selected country
          .map((content) => <BlogComponent content={content} key={content.blogId} />) // render the selected blog
      }
    </div>
  )
}

export default BlogList
