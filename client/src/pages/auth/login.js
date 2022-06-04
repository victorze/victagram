import { useState } from 'react'
import { Button, Form, Input, P, StyledLink, Title } from './styles'
import { StyledLogin } from './styles'

export const Login = ({ login, showError }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = ({ target }) => {
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(credentials)
      .catch((error) => error.data && showError(error.data.message))
  }

  return (
    <StyledLogin>
      <Title>
        Victagram
      </Title>

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleInputChange}
          value={credentials.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          minLength="6"
          required
          onChange={handleInputChange}
          value={credentials.password}
        />
        <Button>
          Sign Up
        </Button>
      </Form>

      <P>
        ¿No tienes una cuenta? <StyledLink to="/signup">Sign up</StyledLink>
      </P>
    </StyledLogin>
  )
}
