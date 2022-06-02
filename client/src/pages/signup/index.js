import { StyledSignup, FormContainer, Form, Img, Title, Info, Input, Button, P, LinkLogin } from './styles'
import signupImage from '../../images/signup.png'

export const Signup = () => {
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
        <Form>
          <Input
            name="fullName"
            placeholder="Nombre y apellido"
            minLength="3"
            maxLength="100"
            required
          />
          <Input
            name="bio"
            placeholder="Cuéntanos de ti..."
            maxLength="150"
            required
          />
          <Input
            name="email"
            placeholder="Email"
            required
          />
          <Input
            name="username"
            placeholder="Username"
            minLength="3"
            maxLength="30"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            minLength="6"
            required
          />
          <Button>
            Sign Up
          </Button>
        </Form>

        <P>
          ¿Tienes una cuenta? <LinkLogin href="#">Log in</LinkLogin>
        </P>
      </FormContainer>
    </StyledSignup>
  )
}
