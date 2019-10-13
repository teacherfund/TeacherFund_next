import BlogList from './blogList'
import SideNav from './SideNav'
import useToRenderBlog from './utils'
import React from 'react'
import Head from '../head'

function BlogPage () {
  const [blogs, schoolNames, userSelectedSchool, changeUserSelectedSchool] = useToRenderBlog()
  return (
    <React.Fragment>
      <Head title='Blog – The Teacher Fund' />
      <div className='flex'>
        <SideNav schools={schoolNames} selectedSchool={userSelectedSchool} onSchoolSelected={changeUserSelectedSchool} />
        <BlogList blogs={blogs} selectedSchool={userSelectedSchool} />
      </div>
    </React.Fragment>
  )
}
export default BlogPage
