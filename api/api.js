import fetch from 'node-fetch'

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://teacherfund.herokuapp.com' : 'http://localhost:3000'

// Create a donation
const donate = async (bodyObject) => {
  return fetch(`${ENDPOINT}/donate`, constructPostBody(bodyObject))
}

// Login to an existing account
const login = async (bodyObject) => {
  return fetch(`${ENDPOINT}/user/login`, constructPostBody(bodyObject))
}

// Create an account 
const signup = async (bodyObject) => {
  return fetch(`${ENDPOINT}/user/signup`, constructPostBody(bodyObject))
}

// A user can subscribe to our newsletter to get emails from us
const subscribe = async (bodyObject) => {
  return fetch(`${ENDPOINT}/subscribe`, constructPostBody(bodyObject))
}

// Private internal
const constructPostBody = (bodyObject) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyObject)
  }
}

export {
  donate,
  login,
  signup,
  subscribe
}
