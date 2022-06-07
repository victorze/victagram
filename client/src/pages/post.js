import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar } from '../components/avatar'
import { Like } from '../components/like'
import { Loading } from '../components/loading'
import { NewComment } from '../components/newComment'
import { NotFound } from '../components/notFound'
import { Comments } from '../components/post'
import { request } from '../helpers'

export const Post = ({ showError }) => {
  const params = useParams()
  const [loadingPost, setLoadingPost] = useState(true)
  const [post, setPost] = useState(null)
  const [postNotFound, setPostNotFound] = useState(false)

  useEffect(() => {
    request.get(`/api/posts/${params.id}`)
      .then(({ data }) => setPost(data))
      .catch((error) => error.response && setPostNotFound(true))
      .finally(() => setLoadingPost(false))
  }, [])

  const sendComment = async (message) => {
    const { data: comment } = await request.post(`/api/posts/${post._id}/comments`, { message })
    setPost({ ...post, comments: [...post.comments, comment] })
  }

  const handleOnClickLike = () => {
    if (post.hasLiked) {
      setPost({ ...post, hasLiked: false, likeCount: post.likeCount - 1 })
      setTimeout(() => {
        request.delete(`/api/posts/${post._id}/likes`)
      }, 500)
    } else {
      setPost({ ...post, hasLiked: true, likeCount: post.likeCount + 1 })
      setTimeout(() => {
        request.post(`/api/posts/${post._id}/likes`)
      }, 500)
    }
  }

  if (loadingPost) {
    return <Loading />
  }

  if (postNotFound) {
    return <NotFound message="El post que estás intentando ver no existe" />
  }

  return (
    <StyledPost>
      <ImageWrapper>
        <Image src={post.imageUrl} alt={post.caption} />
      </ImageWrapper>
      <Actions>
        <AvatarWrapper>
          <Avatar user={post.author} />
        </AvatarWrapper>
        <CommentsWrapper>
          <Comments
            comments={post.comments}
            show={post.comments.length}
          />
        </CommentsWrapper>
        <LikeContainer>
          <Like
            onClick={handleOnClickLike}
            hasLiked={post.hasLiked} />
          <LikeCount>
            {post.likeCount} likes
          </LikeCount>
        </LikeContainer>
        <NewComment sendComment={sendComment} showError={showError} />
      </Actions>
      {console.log(post)}
    </StyledPost>
  )
}

const StyledPost = styled.article`
  display: flex;
  margin-top: 4rem;
  height: 30rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  background-color: #fff;
  font-size: 0.9rem;
  @media (max-width: 850px) {
    flex-direction: column;
    margin: 4rem 0.5rem;
    width: 35rem;
    height: auto;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Image = styled.img`
  max-width: 35rem;
  height: auto;
`

const Actions = styled.section`
  width: 100%;
  align-content: stretch;
  border-left: 1px solid ${(props) => props.theme.borderColor};
`

const AvatarWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`

const CommentsWrapper = styled.div`
  height: 21rem;
  padding: 0.5rem 0.75rem;
  overflow: auto;
`

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`

const LikeCount = styled.p`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
`
