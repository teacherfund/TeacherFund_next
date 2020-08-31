import fetch from 'isomorphic-fetch'

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://api.theteacherfund.com' : 'http://localhost:3000'

// Create a donation
export const donate = async (bodyObject) => {
  return fetch(`${ENDPOINT}/donate`, constructPostBody(bodyObject))
}

// Delete a donation
export const deleteDonate = async () => {
  return fetch(`${ENDPOINT}/donation`, {
    method: 'DELETE'
  })
}

// Login to an existing account
export const login = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/login`, constructPostBody(bodyObject))
}

export const completeLogin = async ({ email, token }) => {
  return fetch('/account/complete-login', constructPostBody({ email, token }))
}

export const resume = async () => {
  return fetch('/account/resume', { method: 'GET' })
}

export const logout = async () => {
  return fetch('/account/logout', { method: 'GET' })
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

export const sendSupportFeedback = async (bodyObject) => {
  return fetch(`${ENDPOINT}/feedback`, constructPostBody(bodyObject))
}

// Get all donations
export const fetchAllDonations = async () => {
  return fetch(`${ENDPOINT}/donations`)
}

// Fetch user donation information to display on account page
export const fetchUserStats = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/donations`, constructPostBody(bodyObject))
}

// Private internal
const constructPostBody = (bodyObject) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyObject)
  }
}
