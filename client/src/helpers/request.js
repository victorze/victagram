import { getToken } from "./auth"

const createOptions = (method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'content-type': 'application/json',
    },
  }

  const token = getToken()
  if (token) {
    options.headers.authorization = `bearer ${token}`
  }

  if (body instanceof File) {
    options.headers['content-type'] = body.type
    options.body = body
  } else if (body) {
    options.body = JSON.stringify(body)
  }

  return options
}

const get = async (url) => {
  const response = await fetch(url, createOptions())
  const data = await response.json()

  if (!response.ok) {
    const error = new Error('The response was not successful')
    error.response = response
    error.data = data
    throw error
  }

  return { response, data }
}

const post = async (url, body) => {
  const response = await fetch(url, createOptions('POST', body))
  const data = await response.json()

  if (!response.ok) {
    const error = new Error('The response was not successful')
    error.response = response
    error.data = data
    throw error
  }

  return { response, data }
}

export const request = {
  get,
  post,
}
