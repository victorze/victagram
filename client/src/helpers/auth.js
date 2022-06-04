const KEY_TOKEN = 'VICTAGRAM_TOKEN'

export const setToken = (token) => {
  localStorage.setItem(KEY_TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(KEY_TOKEN)
}

export const deleteToken = () => {
  localStorage.removeItem(KEY_TOKEN)
}
