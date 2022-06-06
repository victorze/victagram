import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { request } from '../helpers'
import { Avatar } from './avatar'
import { Like } from './like'
import { NewComment } from './newComment'

export const Post = ({ post, showError, showAllComments = true }) => {
  const [comments, setComments] = useState(post.comments)
  const [hasLiked, setHasLiked] = useState(post.hasLiked)
  const [likeCount, setLikeCount] = useState(post.likeCount)

  const {
    imageUrl,
    caption,
    author,
    commentCount,
    _id,
  } = post

  const sendComment = async (message) => {
    const { data: comment } = await request.post(`/api/posts/${_id}/comments`, { message })
    setComments([comment, ...comments])
  }

  const handleOnClickLike = () => {
    if (hasLiked) {
      setHasLiked(false)
      setLikeCount(likeCount - 1)
      setTimeout(() => {
        request.delete(`/api/posts/${_id}/likes`)
      }, 500)
    } else {
      setHasLiked(true)
      setLikeCount(likeCount + 1)
      setTimeout(() => {
        request.post(`/api/posts/${_id}/likes`)
      }, 500)
    }
  }

  return (
    <StyledPost>
      <Avatar user={author} />
      <Image src={imageUrl} alt={caption} />
      <Actions>
        <Like
          onClick={handleOnClickLike}
          hasLiked={hasLiked} />
        <LikeCount>
          {likeCount} likes
        </LikeCount>
        <CaptionContainer>
          <UserLink to={`/profile/${author.username}`}>
            {author.username}
          </UserLink> {' '}
          {caption}
        </CaptionContainer>
        {commentCount > 3 &&
          <CommentsLink to={'/'}>
            Ver los {commentCount} comentarios
          </CommentsLink>
        }
        <Comments
          comments={comments}
          show={showAllComments ? comments.length : 3}
        />
      </Actions>
      <NewComment
        sendComment={sendComment}
        showError={showError}
      />
    </StyledPost>
  )
}

const Comments = ({ comments, show }) => {
  return (
    <CommentsContainer>
      {comments
        .filter((_, i) => i < show)
        .map((comment) => (
          <Comment key={comment._id}>
            <UserLink to={`/profile/${comment.author.username}`}>
              {comment.author.username}
            </UserLink> {' '}
            {comment.message}
          </Comment>
        ))}
    </CommentsContainer>
  )
}

const StyledPost = styled.div`
  margin: 4rem auto;
  width: 40rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  background-color: #fff;
  font-size: 0.9rem;
  overflow: hidden;
`

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: auto;
  max-height: 25rem;
`

const Actions = styled.div`
  padding: 0 0.75rem 0.5rem;
  & > * {
    margin: 0.3rem 0;
  }
`

const LikeCount = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: bold;
`

const CaptionContainer = styled.p`
`

const CommentsLink = styled(Link)`
  color: #8795a1;
  text-decoration: none;
`

const CommentsContainer = styled.ul`
  & > * {
    margin: 0.3rem 0;
  }
`

const Comment = styled.li`
  list-style: none;
`

const UserLink = styled(Link)`
  font-weight: bold;
  color: inherit;
  text-decoration: none;
`
