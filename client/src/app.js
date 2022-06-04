import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/styles'
import { Loading } from './components/loading'
import { Nav } from './components/nav'
import { Error } from './components/error'
import { Login } from './pages/auth/login'
import { Signup } from './pages/auth/signup'
import { setToken, getToken, deleteToken, request } from './helpers'

export const App = () => {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    (async () => {
      if (!getToken()) {
        return setLoadingUser(false)
      }

      const { data } = await request.get('/api/users/whoami')
      setUser(data)
      setLoadingUser(false)
    })()
  }, [])

  const login = async (credentials) => {
    const { data } = await request.post('/api/users/login', credentials)
    setUser(data.user)
    setToken(data.token)
  }

  const signup = async (user) => {
    const { data } = await request.post('/api/users/signup', user)
    setUser(data.user)
    setToken(data.token)
  }

  const logout = () => {
    setUser(null)
    deleteToken()
  }

  const showError = (message) => {
    setErrorMessage(message)
  }

  const hideError = () => {
    setErrorMessage(null)
  }

  if (loadingUser) {
    return <Loading />
  }

  return (
    <>
      {user && <Nav />}
      <Main>
        <Error message={errorMessage} hideError={hideError} />
        {user
          ? <ProtectedRoutes />
          : <UnprotectedRoutes login={login} signup={signup} showError={showError} />}
      </Main>
    </>
  )
}

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<h1>Soy el feed</h1>} />
    </Routes>
  )
}

const UnprotectedRoutes = ({ login, signup, showError }) => {
  return (
    <Routes>
      <Route path='login' element={<Login login={login} showError={showError} />} />
      <Route path='*' element={<Signup signup={signup} showError={showError} />} />
    </Routes>
  )
}
