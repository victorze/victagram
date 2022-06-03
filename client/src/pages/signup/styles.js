import styled from "styled-components";

export const StyledSignup = styled.section`
  display: flex;
  margin-top: 4rem;
  justify-content: space-around;
`

export const Img = styled.img`
  width: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`

export const FormContainer = styled.div`
  width: 40%;
  border: 1px solid #DBDBDB;
  padding: 4rem 2rem;
  background-color: #fff;
  text-align: center;
  min-width: 22rem;
`

export const Form = styled.form`
`

export const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
`

export const Info = styled.p`
  margin: 1.5rem;
  color: #8e8e8e;
`

export const Input = styled.input`
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2.25rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 0.2rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.backgroundColor};
  color: inherit;
  &:focus {
    outline: none !important;
    border: 1px solid #adadad;
  }
`

export const Button = styled.button`
  margin-top: 1rem;
  width: 100%;
  height: 1.875rem;
  border: 1px solid transparent;
  border-radius: 0.2rem;
  padding: 0.3125rem;
  background-color: ${props => props.theme.blueColor};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  &:active {
    background-color: rgba(0, 149, 246, 0.7);
  }
`

export const P = styled.p`
  margin-top: 3.5rem;
`

export const StyledLink = styled.a`
  color: ${props => props.theme.blueColor};
  text-decoration: none;
  &:active {
    color: rgba(0, 149, 246, 0.7);
  }
`
