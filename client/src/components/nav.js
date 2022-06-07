import { Link } from 'react-router-dom'
import { Camera, Compass, Person } from 'react-bootstrap-icons';
import styled from 'styled-components'

export const Nav = ({ user }) => {
  return (
    <NavContainer>
      <StyledNav>
        <Logo to="/">
          Instagram
        </Logo>
        {user &&
          <LinksContainer>
            <PageLink to='/upload'>
              <Camera size={26}/>
            </PageLink>
            <PageLink to='/explore'>
              <Compass size={26}/>
            </PageLink>
            <PageLink to='/upload'>
              <Person size={26}/>
            </PageLink>
          </LinksContainer>
        }
      </StyledNav>
    </NavContainer>
  )
}

export const NavContainer = styled.div`
  border-bottom: 1px solid #DBDBDB;
  height: 3.75rem;
  background-color: #fff;
`

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 62rem;
`

export const Logo = styled(Link)`
  display: inline-block;
  margin-left: 1rem;
  color: ${props => props.theme.textColor};
  text-decoration: none;
  font-size: 1.5rem;
  line-height: 3.75rem;
`

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  & > * {
    margin-left: 1rem;
  }
`

export const PageLink = styled(Link)`
  color: black;
`
