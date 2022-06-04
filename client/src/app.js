import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loading } from './components/loading'
import { Nav } from './components/nav'
import { Login } from './pages/auth/login'
import { Signup } from './pages/auth/signup'
import { Main } from './pages/styles'
import { setToken, getToken, deleteToken, request } from './helpers'

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

  if (loadingUser) {
    return <Loading />
  }

  return (
    <>
      {user && <Nav />}
      <Main>
        {user
          ? <ProtectedRoutes />
          : <UnprotectedRoutes login={login} signup={signup} />}
        <div>{JSON.stringify(user)}</div>
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

const UnprotectedRoutes = ({ login, signup }) => {
  return (
    <Routes>
      <Route path='login' element={<Login login={login} />} />
      <Route path='*' element={<Signup signup={signup} />} />
    </Routes>
  )
}
