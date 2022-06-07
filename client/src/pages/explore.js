import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { request } from '../helpers'
import { Loading } from '../components/loading'
import { AvatarImage } from '../components/avatar'
import { Link } from 'react-router-dom'

export const Explore = ({ showError }) => {
  const [users, setUsers] = useState(null)
  const [posts, setPosts] = useState(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    Promise.all([
      request.get('/api/users/explore'),
      request.get('/api/posts'),
    ])
      .then(([{ data: exploreData }, { data: postsData }]) => {
        setUsers(exploreData)
        setPosts(postsData)
      })
      .catch((error) => error.response && showError(error.response.data.message))
      .finally(() => setLoadingData(false))
  }, [])

  if (loadingData) {
    return <Loading />
  }

  return (
    <StyledExplore>
      <People users={users} />
      <Posts posts={posts} title={Explore} />
    </StyledExplore>
  )
}

const People = ({ users }) => {
  return (
    <StyledPeople>
      <Title>
        Discover People
      </Title>
      <UsersContainer>
        {users.map((user) =>
          <UserBox key={user._id}>
            <AvatarImage user={user} />
            <Username>
              {user.username}
            </Username>
            <ShowProfileLink to={`/profile/${user.username}`}>
              Per perfil
            </ShowProfileLink>
          </UserBox>
        )}
      </UsersContainer>
    </StyledPeople>
  )
}

export const Posts = ({ posts, title }) => {
  return (
    <StyledPosts>
      {title &&
        <Title>
          Explore
        </Title>
      }
      <ImageContainer>
        {posts.map((post) =>
          <WrapperImage key={post._id} to={`/post/${post._id}/`}>
            <PostImage src={post.imageUrl} />
          </WrapperImage>
        )}
      </ImageContainer>
    </StyledPosts>
  )
}

const StyledExplore = styled.div`
  margin: 4rem auto 0;
`

const Title = styled.h2`
  color: "#8795A1";
  font-size: 1.2rem;
`

const StyledPeople = styled.section`
  margin-bottom: 3rem;
`

const UsersContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  width: auto;
  overflow-x: auto;
`

const UserBox = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 1.5rem;
  min-width: 12rem;
  height: 11rem;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: white;
`

const ShowProfileLink = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background-color: ${(props) => props.theme.blueColor};
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:active {
    background-color: rgba(0, 149, 246, 0.7);
  }
`

const Username = styled.p`
  font-weight: bold;
`

const StyledPosts = styled.section`
  margin: 0 auto;
`

const ImageContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const WrapperImage = styled(Link)`
  width: 17.45rem;
  height: 15rem;
`

const PostImage = styled.img`
  padding: 0.25rem;
  height: 100%;
  width: 100%;
  object-fit: cover;
`
