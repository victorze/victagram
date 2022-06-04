import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { Loading } from './components/loading'
import { Nav } from './components/nav'
import { setToken, getToken, deleteToken, request } from './helpers'
import { Login } from './pages/login'
import { Signup } from './pages/signup'

const Main = styled.main`
  max-width: 52.5rem;
  margin: 0 auto;
`

export const App = () => {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

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
    const { response, data } = await request.post('/api/users/login', credentials)
    setUser(data.user)
    setToken(data.token)
  }

  const signup = async (user) => {
    const { response, data } = await request.post('/api/users/signup', user)
    setUser(data.user)
    setToken(data.token)
  }

  const logout = () => {
    setUser(null)
    deleteToken()
  }

  if (loadingUser) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      {user
        ? <ProtectedRoutes />
        : <UnprotectedRoutes login={login} signup={signup} />}
      <div>{JSON.stringify(user)}</div>
    </BrowserRouter>
  )
}

const ProtectedRoutes = () => {
  return (
    <>
      <Nav />
      <Main>
        <Routes>
          <Route path='*' element={<h1>Soy el feed</h1>} />
        </Routes>
      </Main>
    </>
  )
}

const UnprotectedRoutes = ({ login, signup }) => {
  return (
    <Main>
      <Routes>
        <Route path='login' element={<Login login={login} />} />
        <Route path='*' element={<Signup signup={signup} />} />
      </Routes>
    </Main>
  )
}
