import { useState } from 'react'
import { Button, Form, Input, P, StyledLink, Title } from '../signup/styles'
import { StyledLogin } from './styles'

export const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
      }

      const res = await fetch('/api/users/login', options)
      console.log(res)
      console.log(await res.json())
    } catch (error) {
      console.log(error)
    }
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
        ¿No tienes una cuenta? <StyledLink href="#">Sign up</StyledLink>
      </P>
    </StyledLogin>
  )
}
