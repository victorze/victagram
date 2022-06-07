import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import stringToColor from 'string-to-color'
import { request } from '../helpers'
import { useEffect, useState } from 'react'
import { Loading } from '../components/loading'
import { NotFound } from '../components/notFound'
import { Posts } from './explore'

export const Profile = ({ user, logout, showError }) => {
  const params = useParams()
  const username = params.username
  const [profileOwner, setProfileOwner] = useState(null)
  const [posts, setPosts] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState('')
  const [loadingData, setLoadingData] = useState(true)
  const [profileNotExist, setProfileNotExist] = useState()

  useEffect(() => {
    (async () => {
      try {
        const { data: profileOwner } = await request.get(`/api/users/${username}`)
        const { data: posts } = await request.get(`/api/posts/user/${profileOwner._id}`)
        setProfileOwner(profileOwner)
        setPosts(posts)
        setProfileImageUrl(profileOwner.profileUrl)
        setLoadingData(false)
      } catch (error) {
        if (error.response && (error.response.status === 404 || error.response.status === 400)) {
          setProfileNotExist(true)
        } else {
          showError('Hubo problemas cargando este perfil')
        }
        setLoadingData(false)
      }
    })()
  }, [username])

  const handleUploadImage = ({ target }) => {
    const file = target.files[0]
    request.post('/api/users/upload', file)
      .then(({ data }) => setProfileImageUrl(data.url))
      .catch((error) => error.response && showError(error.response.data.message))
  }

  const handleOnClickFollow = () => {
    if (profileOwner.viewerFollows) {
      setProfileOwner({
        ...profileOwner,
        viewerFollows: false,
        followerCount: profileOwner.followerCount - 1
      })
      setTimeout(() => {
        request.delete(`/api/friendships/${profileOwner._id}/unfollow`)
      }, 300)
    } else {
      setProfileOwner({
        ...profileOwner,
        viewerFollows: true,
        followerCount: profileOwner.followerCount + 1
      })
      setTimeout(() => {
        request.post(`/api/friendships/${profileOwner._id}/follow`)
      }, 300)
    }
  }

  if (loadingData) {
    return <Loading />
  }

  if (profileNotExist) {
    return <NotFound message='El perfil que estas intentando ver no existe' />
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <UserSection>
        <ImageContainer>
          {user.username === profileOwner.username
            ? (
              <LabelImage>
                <AvatarImage
                  profileUrl={profileImageUrl}
                  username={username}
                />
                <InputImage
                  type="file"
                  onChange={handleUploadImage}
                  accept=".png, .jpg, .jpeg"
                />
              </LabelImage>
            )
            : (
              <AvatarImage
                profileUrl={profileImageUrl}
                username={username}
              />
            )
          }
        </ImageContainer>
        <UserInfo>
          <UsernameContainer>
            <Username>
              {profileOwner.username}
            </Username>
            {user.username === profileOwner.username
              ? <Button onClick={logout}>Logout</Button>
              : (
                <Button onClick={handleOnClickFollow}>
                  {profileOwner.viewerFollows ? 'Unfollow' : 'Follow'}
                </Button>
              )
            }
          </UsernameContainer>
          <Name>
            {profileOwner.fullName}
          </Name>
          <Bio>
            {profileOwner.bio}
          </Bio>
          <FollowContainer>
            <Followers>
              <NumberFollow>{profileOwner.followerCount}</NumberFollow> followers
            </Followers>
            <Following>
              <NumberFollow>{profileOwner.followingCount}</NumberFollow> following
            </Following>
          </FollowContainer>
        </UserInfo>
      </UserSection>

      <PostsSection>
        <Posts posts={posts} />
      </PostsSection>
    </div>
  )
}

const AvatarImage = ({ profileUrl, username }) => {
  const style = {
    backgroundImage: profileUrl ? `url(${profileUrl})` : null,
    backgroundColor: stringToColor(username),
  }

  return <Image style={style} />
}

const UserSection = styled.section`
  display: flex;
  padding: 2.5rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`

const ImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  margin: 0 3.5rem;
`

const Image = styled.div`
  width: 8rem;
  height: 8rem;
  background-position: 50%;
  border-radius: 50%;
  background-size: cover;
`

const LabelImage = styled.label`
  &:hover {
    cursor: pointer;
  }
`

const InputImage = styled.input`
  visibility: hidden;
`

const UserInfo = styled.div`
`

const UsernameContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`

const Username = styled.h2`
  margin-right: 1rem;
  font-weight: 300;
`

const Button = styled.button`
  width: 7rem;
  height: 1.75rem;
  border-radius: 0.25rem;
  padding: 0;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.backgroundColor};
  &:hover {
    cursor: pointer;
  }
  &:active {
    color: gray;
  }
`

const Name = styled.p`
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const Bio = styled.p`
  margin-bottom: 0.5rem;
`

const FollowContainer = styled.div`
  display: flex;
`

const Followers = styled.p`
  margin-right: 1rem;
`

const Following = styled.p`
`

const NumberFollow = styled.span`
  font-weight: bold;
`

const PostsSection = styled.section`
  margin-top: 2.5rem;
`
