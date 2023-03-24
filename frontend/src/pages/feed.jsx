import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Loading } from '../components/loading'
import { request } from '../helpers'
import { Post } from '../components/post'

export const Feed = ({ showError }) => {
  const [posts, setPosts] = useState([])
  const [loadingFirstPosts, setLoadingFirstPosts] = useState(true)
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

  useEffect(() => {
    request.get('/api/posts/feed')
      .then(({ data }) => {
        setPosts(data)
        if (data.length < 3) setAllPostsLoaded(true)
      })
      .catch((error) => error.response && showError(error.response.data.message))
      .finally(() => setLoadingFirstPosts(false))
  }, [])

  const handleOnClick = async () => {
    const dateOfLastPost = posts[posts.length - 1].createdAt
    const query = `?date=${dateOfLastPost}`

    request.get(`/api/posts/feed${query}`)
      .then(({ data }) => {
        setPosts([...posts, ...data])
        if (data.length < 3) setAllPostsLoaded(true)
      })
      .catch((error) => error.response && showError(error.response.data.message))
  }

  if (loadingFirstPosts) {
    return <Loading />
  }

  if (!posts.length) {
    return <EmptyFeed />
  }

  return (
    <>
      <div>
        {posts.map((post) =>
          <Post
            key={post._id}
            post={post}
            showAllComments={false}
            showError={showError}
          />
        )}
      </div>
      {allPostsLoaded
        ? <P>No hay más posts</P>
        : <Button onClick={handleOnClick}> Ver más </Button>
      }
    </>
  )
}

const EmptyFeed = () => {
  return (
    <StyledEmptyFeed>
      <MeesageEmptyFeed>
        Tu feed está vacío porque no sigues a nadie, o porque no han publicado fotos.
      </MeesageEmptyFeed>
      <ExploreLink to="/explore">Explora</ExploreLink>
    </StyledEmptyFeed>
  )
}

const Button = styled.button`
  display: block;
  margin: 3rem auto;
  width: 5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 0.5rem;
  background-color: white;
  color: inherit;
  font-weight: bold;
  cursor: pointer;
  &:active {
    color: gray;
  }
`

const P = styled.p`
  margin: 3rem auto;
  text-align: center;
  padding: 0.5rem;
`

const StyledEmptyFeed = styled.div`
  margin: 5rem auto;
  padding: 1.5rem;
  width: 25rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: white;
  text-align: center;
`

const MeesageEmptyFeed = styled.p`
  margin-bottom: 1rem;
`

const ExploreLink = styled(Link)`
  color: ${props => props.theme.blueColor};
  text-decoration: none;
  &:active {
    color: rgba(0, 149, 246, 0.7);
  }
`
