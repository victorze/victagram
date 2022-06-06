import { Link } from 'react-router-dom'
import stringToColor from 'string-to-color'
import styled from 'styled-components'

export const Avatar = ({ user }) => {
  return (
    <StyledAvatar>
      <AvatarImage user={user} />
      <ProfileLink to={`/profile/${user.username}`}>
        <UserName>{user.username}</UserName>
      </ProfileLink>
    </StyledAvatar>
  )
}

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.borderColor};
  padding: 0.5rem;
`

const ProfileLink = styled(Link)`
  text-decoration: none;
`

const UserName = styled.h2`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textColor};
  padding-left: 0.5rem;
`

export const AvatarImage = ( { user } ) => {
  const style = {
    backgroundImage: user.profileUrl ? `url(${user.profileUrl})` : null,
    backgroundColor: stringToColor(user.username),
  }

  return <Image style={style} user={user} />
}

const Image = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-position: 50%;
  border-radius: 50%;
  background-size: cover;
`
