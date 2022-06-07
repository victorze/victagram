import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { setToken, getToken, deleteToken, request } from './helpers'
import { Loading } from './components/loading'
import { Nav } from './components/nav'
import { Error } from './components/error'
import { Login } from './pages/auth/login'
import { Signup } from './pages/auth/signup'
import { Upload } from './pages/upload'
import { Feed } from './pages/feed'
import { Post } from './pages/post'

export const App = () => {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (!getToken()) {
      return setLoadingUser(false)
    }

    request.get('/api/users/whoami')
      .then(({ data }) => setUser(data))
      .catch(console.log)
      .finally(() => setLoadingUser(false))
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
      {user && <Nav user={user} />}
      <main style={{maxWidth: '52.5rem', margin: '0 auto'}}>
        <Error message={errorMessage} hideError={hideError} />
        {user
          ? <PrivateRoutes showError={showError} />
          : <PublicRoutes login={login} signup={signup} showError={showError} />}
      </main>
    </>
  )
}

const PrivateRoutes = ({ showError }) => {
  return (
    <Routes>
      <Route path='upload' element={<Upload showError={showError} />} />
      <Route path='post/:id' element={<Post showError={showError} />} />
      <Route path='/' element={<Feed showError={showError} />} />
      <Route path='*' element={<h1>Soy el feed</h1>} />
    </Routes>
  )
}

const PublicRoutes = ({ login, signup, showError }) => {
  return (
    <Routes>
      <Route path='login' element={<Login login={login} showError={showError} />} />
      <Route path='*' element={<Signup signup={signup} showError={showError} />} />
    </Routes>
  )
}
