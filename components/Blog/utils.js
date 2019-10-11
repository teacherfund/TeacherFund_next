import React from 'react'

const staticBlogContent = [{
  title: 'Two Years After the Earthquake in Nepal',
  imgUrl: 'https://cw-cms.imgix.net/content/site/assets/files/2196/charity-water-parents-chief.jpg?fm=pjpg&q=80&w=300',
  content: 'More than 7,100 charity: water supporters responded to provide relief after the devastating earthquake in Nepal on April 25th, 2015. We want to say thank you.',
  school: "Peter's higher sec,",
  blogId: 1
}, {
  title: 'Refills for Everyone',
  imgUrl: 'https://cw-cms.imgix.net/content/site/assets/files/2166/moms.jpg?fm=pjpg&q=70&w=300',
  content: 'Students at Shramik Shanti School used to get just one cup of drinking water each day. Today, they can have as much as they way.',
  school: "St. Jhon's School",
  blogId: 2
}, {
  title: 'The Lucky School',
  imgUrl: 'https://cw-cms.imgix.net/content/site/assets/files/2167/js_20140430_1348.jpg?fm=pjpg&q=70&w=300',
  content: 'The kids at Balkumari Primary School used to spend recess walking 20 minutes to collect dirty water from a cave. Now, they spend that time playing with friends.',
  school: 'Dublin International',
  blogId: 3
}]

export const ALL_SCHOOL = 'All'

export default function useToRenderBlog () {
  const [blogs] = React.useState(staticBlogContent)
  const [schoolNames, updateUniqueSchoolNames] = React.useState([ALL_SCHOOL, ...new Set(blogs.map(blog => blog.school))]) // dynamically get unique schools from the blog response
  const [userSelectedSchool, changeUserSelectedSchool] = React.useState(ALL_SCHOOL) // if user selects a particular school from the sideNav blogs related to selected schools should be shown
  React.useEffect(() => {
    const uniqueSchool = [ALL_SCHOOL, ...new Set(blogs.map(blog => blog.school))]
    updateUniqueSchoolNames(() => uniqueSchool)
  }, [blogs])
  return [blogs, schoolNames, userSelectedSchool, changeUserSelectedSchool]
}
