import BlogList from './blogList'
import SideNav from './SideNav'
import useBlogContent from './useBlogApi'
import React from 'react'

function useToRenderBlog () {
  const ALL_SCHOOL = 'All'
  const blogs = useBlogContent()
  const [blogCountries, updateSchool] = React.useState([ALL_SCHOOL])
  const [selectedSchool, updateSelectedSchool] = React.useState(ALL_SCHOOL)
  React.useEffect(() => {
    const uniqueSchool = [ALL_SCHOOL, ...new Set(blogs.map(blog => blog.school))]
    updateSchool(() => uniqueSchool)
  }, [blogs])
  return [blogs, blogCountries, selectedSchool, updateSelectedSchool]
}

function BlogPage () {
  const [blogs, blogSchools, selectedSchool, updateSelectedSchool] = useToRenderBlog()
  return (
    <div className='blog-page'>
      <SideNav blogSchools={blogSchools} selectedSchool={selectedSchool} onSchoolSelected={updateSelectedSchool} />
      <BlogList blogs={blogs} selectedSchool={selectedSchool} />
    </div>
  )
}
export default BlogPage
