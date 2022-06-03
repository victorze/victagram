import styled from "styled-components"

export const NavContainer = styled.div`
  border-bottom: 1px solid #DBDBDB;
  height: 3.75rem;
  background-color: #fff;
`

export const StyledNav = styled.nav`
  margin: 0 auto;
  max-width: 62rem;
`

export const Logo = styled.a`
  display: inline-block;
  margin-left: 1rem;
  color: ${props => props.theme.textColor};
  text-decoration: none;
  font-size: 1.5rem;
  line-height: 3.75rem;
`
