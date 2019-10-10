import BlogList from './blogList'
import SideNav from './SideNav'
import useBlogContent from './useBlogApi'
import React from 'react'

function useToRenderBlog () {
  const ALL_COUNTRY = 'All'
  const blogs = useBlogContent()
  const [blogCountries, updateCountry] = React.useState([ALL_COUNTRY])
  const [selectedCountry, updateSelectedCountry] = React.useState(ALL_COUNTRY)
  React.useEffect(() => {
    const uniqueCountry = [ALL_COUNTRY, ...new Set(blogs.map(blog => blog.country))]
    updateCountry(() => uniqueCountry)
  }, [blogs])
  return [blogs, blogCountries, selectedCountry, updateSelectedCountry]
}

function BlogPage () {
  const [blogs, blogCountries, selectedCountry, updateSelectedCountry] = useToRenderBlog()
  return (
    <div className='blog-page'>
      <SideNav blogCountries={blogCountries} selectedCountry={selectedCountry} onCountrySelected={updateSelectedCountry} />
      <BlogList blogs={blogs} selectedCountry={selectedCountry} />
    </div>
  )
}
export default BlogPage
