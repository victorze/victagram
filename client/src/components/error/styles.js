import styled from "styled-components";

export const StyledError = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem auto;
  padding: 1rem;
  border-radius: 0.2rem;
  font-size: 1rem;
  border: 1px solid #f56565;
  border-left: 5px solid #f56565;
  background-color: #fff5f5;
  color: #c53030;
`

export const Close = styled.button`
  height: 1rem;
  border: none;
  padding: 0 0.2rem;
  background-color: inherit;
  color: inherit;
  font-size: 1.1rem;
  &:hover {
    cursor: pointer;
  }
`
