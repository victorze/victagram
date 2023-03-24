import { Heart, HeartFill } from 'react-bootstrap-icons';
import styled from 'styled-components';

export const Like = ({ onClick, hasLiked }) => {
  return (
    <StyledLike onClick={onClick}>
      {hasLiked
        ? <HeartFill size={24} color="#dc3545" />
        : <Heart size={24} />}
    </StyledLike>
  )
}

const StyledLike = styled.span`
  height: auto;
  display: inline-block;
  padding: 0.5rem 0 0;
  cursor: pointer;
`
