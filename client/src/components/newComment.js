import { useState } from 'react'
import styled, { css } from 'styled-components'

export const NewComment = ({ sendComment, showError }) => {
  const [message, setMessage] = useState('')
  const [sendingComment, setSendingComment] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleSendComment = (e) => {
    e.preventDefault()

    if (sendingComment) {
      return
    }

    setSendingComment(true)
    sendComment(message)
      .catch((error) => error.response && showError(error.response.data.message))
      .finally(() => {
        setSendingComment(false)
        setButtonDisabled(true)
        setMessage('')
      })
  }

  const handleOnChange = (e) => {
    const value = e.target.value
    !value ? setButtonDisabled(true) : setButtonDisabled(false)
    setMessage(value)
  }

  return (
    <StyledComment>
      <Form onSubmit={handleSendComment}>
        <Input
          value={message}
          onChange={handleOnChange}
          onKeyDown={(e) => e.key !== 'Enter' || e.preventDefault()}
          placeholder="Deja un comentario"
        >
        </Input>
        <Button disabled={buttonDisabled}>
          Post
        </Button>
      </Form>
    </StyledComment>
  )
}

const StyledComment = styled.section`
  padding: 0.25rem 0.75rem;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  margin: 0.7rem 0;
  width: 100%;
  height: 1.125rem;
  border: none;
  color: inherit;
  resize: none;
  &:focus {
    outline: none !important;
  }
`

const Button = styled.button`
  margin-left: 0.5rem;
  border:none;
  background-color: #fff;
  color: ${(props) => props.theme.blueColor};
  font-weight: bold;
  cursor: pointer;
  ${props => props.disabled && css`
    cursor: auto;
    color: rgba(0, 149, 246, 0.7);
  `}
`
