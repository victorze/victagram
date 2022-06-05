import styled from 'styled-components';

export const Loading = () => {
  return (
    <StyledLoading>
      <Dot1 />
      <Dot2 />
      <Dot />
    </StyledLoading>
  )
}

export const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 70px;
  height: 100vh;
`

export const Dot = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: #333;
  animation: sk-bouncedelay 1.4s ease-in-out infinite both;
`

export const Dot1 = styled(Dot)`
    animation-delay: -0.32s;
`

export const Dot2 = styled(Dot)`
    animation-delay: -0.16s;
`
