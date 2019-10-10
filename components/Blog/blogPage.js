import BlogList from './blogList'
import SideNav from './SideNav'
import useBlogContent from './useBlogApi'
import React from 'react'

function useToRenderBlog () {
  const ALL_SCHOOL = 'All'
  const blogs = useBlogContent()
  const [schools, updateSchool] = React.useState([ALL_SCHOOL]) // dynamically get unique schools from the blog response
  const [selectedSchool, updateSelectedSchool] = React.useState(ALL_SCHOOL) // if user selects a particular school from the sideNav blogs related to selected schools should be shown
  React.useEffect(() => {
    const uniqueSchool = [ALL_SCHOOL, ...new Set(blogs.map(blog => blog.school))]
    updateSchool(() => uniqueSchool)
  }, [blogs])
  return [blogs, schools, selectedSchool, updateSelectedSchool]
}

function BlogPage () {
  const [blogs, schools, selectedSchool, updateSelectedSchool] = useToRenderBlog()
  return (
    <div className='flex'>
      <SideNav schools={schools} selectedSchool={selectedSchool} onSchoolSelected={updateSelectedSchool} />
      <BlogList blogs={blogs} selectedSchool={selectedSchool} />
    </div>
  )
}
export default BlogPage
