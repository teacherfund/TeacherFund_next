import React from 'react'
import { fetchBlog } from '../../api/api'

export default function useBlogContent () {
  const [blogContent, updateBlogContent] = React.useState([])
  React.useEffect(() => {
    const { title, avatarUrl, content, country, blogId } = fetchBlog()
    const restructureBlogPost = (initArray, _, index) => {
      return [...initArray, {
        title: title[index],
        imgUrl: avatarUrl[index],
        content: content[index],
        country: country[index],
        blogId: blogId[index]
      }]
    }
    updateBlogContent(title.reduce(restructureBlogPost, []))
  }, [])
  return blogContent
}
