import styled, { ThemeProvider } from 'styled-components'
import { Nav } from './components/nav'
import { Signup } from './pages/signup'
import { theme } from './theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Main>
        <Signup />
      </Main>
    </ThemeProvider>
  )
}

const Main = styled.main`
  max-width: 52.5rem;
  margin: 0 auto;
`
