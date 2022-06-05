import { NavContainer, StyledNav, Logo, LinksContainer, PageLink } from './styles'
import { Camera, Compass, Person } from 'react-bootstrap-icons';

export const Nav = ({ user }) => {
  return (
    <NavContainer>
      <StyledNav>
        <Logo to="/">
          Victagram
        </Logo>
        {user &&
          <LinksContainer>
            <PageLink to='/upload'>
              <Camera size={26}/>
            </PageLink>
            <PageLink to='/upload'>
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
