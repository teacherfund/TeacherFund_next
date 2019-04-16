import fetch from 'node-fetch'

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://api.theteacherfund.com' : 'http://localhost:3000'

// Create a donation
const donate = async (bodyObject) => {
  return fetch(`${ENDPOINT}/donate`, constructPostBody(bodyObject))
}

// Login to an existing account
const login = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/login`, constructPostBody(bodyObject))
}

// Create an account
const register = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/register`, constructPostBody(bodyObject))
}

// Verify an account from magic link
const verify = async (bodyObject) => {
  return fetch(`${ENDPOINT}/account/verify`, constructPostBody(bodyObject))
}

// A user can subscribe to our newsletter to get emails from us
const subscribe = async (bodyObject) => {
  return fetch(`${ENDPOINT}/subscribe`, constructPostBody(bodyObject))
}

// Fetch all financial data and download it
const fetchFinancialDataAndDownload = async () => {
  fetch(`${ENDPOINT}/finances`)
    .then((res) => res.json())
    .then((res) => {
    // Download res as file (csv) to user
    })
}

// Get all donations
const fetchDonations = async () => {
  return fetch(`${ENDPOINT}/donations`).then((res) => res.json())
}

// Fetch user donation information to display on account page
const fetchUserStats = async (bodyObject) => {
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

export {
  donate,
  fetchFinancialDataAndDownload,
  fetchDonations,
  fetchUserStats,
  login,
  verify,
  register,
  subscribe
}
