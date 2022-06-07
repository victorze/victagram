import { Link } from "react-router-dom"
import styled from "styled-components"

export const NotFound = ({ message }) => {
  return (
    <StyledNotFound>
      <Message>
        {message}
      </Message>
      <LinkContainer>
        Ir al <HomeLink to="/">home</HomeLink>
      </LinkContainer>
    </StyledNotFound>
  )
}

const StyledNotFound = styled.section`
  margin: 5rem auto;
  text-align: center
`

const Message = styled.h2`
  margin: 1rem;
  font-size: 1.5rem;
`

const LinkContainer = styled.p`
  font-size: 1.2rem;
`

const HomeLink = styled(Link)`
  color: ${props => props.theme.blueColor};
  text-decoration: none;
  &:active {
    color: rgba(0, 149, 246, 0.7);
  }
`
