import fetch from 'isomorphic-fetch'

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://teacherfund.herokuapp.com' : 'http://localhost:9000'

const donate = async (bodyObject) => {
  return fetch(`${ENDPOINT}/donate`, constructPostBody(bodyObject))
}

const login = async (bodyObject) => {
  return fetch(`${ENDPOINT}/user/login`, constructPostBody(bodyObject))
}

const signup = async (bodyObject) => {
  return fetch(`${ENDPOINT}/user/signup`, constructPostBody(bodyObject))
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
}
