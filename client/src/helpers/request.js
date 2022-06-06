import { getToken } from './auth'

export const request = {}

request.get = async (url) => {
  const response = await fetch(url, createOptions())
  response.data = await response.json()
  return buildResponse(response)
}

request.post = async (url, body) => {
  const response = await fetch(url, createOptions('POST', body))
  if (response.status !== 204) {
    response.data = await response.json()
  }
  return buildResponse(response)
}

request.delete = async (url, body) => {
  const response = await fetch(url, createOptions('DELETE', body))
  if (response.status !== 204) {
    response.data = await response.json()
  }
  return buildResponse(response)
}

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

const buildResponse = (response) => {
  if (!response.ok) {
    const error = new Error('The response was not successful')
    error.response = response
    throw error
  }

  return response
}
