import fetch from 'isomorphic-fetch'

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://api.theteacherfund.com' : 'http://localhost:3000'

// Create a donation
export const donate = async (bodyObject) => {
  return fetch(`${ENDPOINT}/donate`, constructPostBody(bodyObject))
}

// Login to an existing account
export const login = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/login`, constructPostBody(bodyObject))
}

// Create an account
export const register = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/register`, constructPostBody(bodyObject))
}

// Verify an account from magic link
export const verify = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/verify`, constructPostBody(bodyObject))
}

// A user can subscribe to our newsletter to get emails from us
export const subscribe = async (bodyObject) => {
  return fetch(`${ENDPOINT}/subscribe`, constructPostBody(bodyObject))
}

// Fetch all financial data and download it
export const fetchFinancialDataAndDownload = async () => {
  return fetch(`${ENDPOINT}/finances`)
    .then((res) => res.json())
    .then((res) => {
    // Download res as file (csv) to user
    })
}

// Get all donations
export const fetchAllDonations = async () => {
  return fetch(`${ENDPOINT}/donations`)
}

// Fetch user donation information to display on account page
export const fetchUserStats = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/donations`, constructPostBody(bodyObject))
}

export const fetchBlog = _ => {
  const title = ['Two Years After the Earthquake in Nepal', 'Refills for Everyone', 'The Lucky School']
  const miniContent = ['More than 7,100 charity: water supporters responded to provide relief after the devastating earthquake in Nepal on April 25th, 2015. We want to say thank you.',
    'Students at Shramik Shanti School used to get just one cup of drinking water each day. Today, they can have as much as they way.',
    'The kids at Balkumari Primary School used to spend recess walking 20 minutes to collect dirty water from a cave. Now, they spend that time playing with friends.']
  const avatarUrl = ['https://cw-cms.imgix.net/content/site/assets/files/2196/charity-water-parents-chief.jpg?fm=pjpg&q=80&w=300',
    'https://cw-cms.imgix.net/content/site/assets/files/2166/moms.jpg?fm=pjpg&q=70&w=300',
    'https://cw-cms.imgix.net/content/site/assets/files/2167/js_20140430_1348.jpg?fm=pjpg&q=70&w=300']
  const school = ['Peter\'s higher sec,', 'St. Jhon\'s School', 'Dublin International']
  const blogId = [1, 2, 3]
  return { title, content: miniContent, avatarUrl, school, blogId }
}

// Private internal
const constructPostBody = (bodyObject) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyObject)
  }
}
