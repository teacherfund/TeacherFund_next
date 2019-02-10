const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://teacherfund.herokuapp.com' : 'http://localhost:9000'


const donate = async (bodyObject) => {
  return await fetch(`${ENDPOINT}/donate`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyObject)
  })
}

export {
  donate,
}
