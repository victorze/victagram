import { StyledError, Close } from "./styles"

export const Error = ({ message, hideError }) => {
  if (!message) {
    return null
  }

  return (
    <StyledError>
      <p>
        {message}
      </p>
      <Close onClick={hideError}>
        &times;
      </Close>
    </StyledError>
  )
}
