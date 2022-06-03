import { useState } from 'react'
import { StyledSignup, FormContainer, Form, Img, Title, Info, Input, Button, P, StyledLink } from './styles'
import signupImage from '../../images/signup.png'

export const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    bio: '',
    email: '',
    username: '',
    password: '',
  })

  const handleInputChange = ({ target }) => {
    setUser({
      ...user,
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
        body: JSON.stringify(user),
      }

      const res = await fetch('/api/users/register', options)
      console.log(res)
      console.log(await res.json())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledSignup>
      <Img src={signupImage}></Img>
      <FormContainer>
        <Title>
          Victagram
        </Title>
        <Info>
          Regístrate para ver fotos de tus amigos
        </Info>
        <Form onSubmit={handleSubmit}>
          <Input
            name="fullName"
            placeholder="Nombre y apellido"
            minLength="3"
            maxLength="100"
            required
            onChange={handleInputChange}
            value={user.fullName}
          />
          <Input
            name="bio"
            placeholder="Cuéntanos de ti..."
            maxLength="150"
            required
            onChange={handleInputChange}
            value={user.bio}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleInputChange}
            value={user.email}
          />
          <Input
            name="username"
            placeholder="Username"
            minLength="3"
            maxLength="30"
            required
            onChange={handleInputChange}
            value={user.username}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            minLength="6"
            required
            onChange={handleInputChange}
            value={user.password}
          />
          <Button>
            Sign Up
          </Button>
        </Form>

        <P>
          ¿Tienes una cuenta? <StyledLink href="#">Log in</StyledLink>
        </P>
      </FormContainer>
    </StyledSignup>
  )
}
