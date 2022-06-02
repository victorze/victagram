import { ThemeProvider } from 'styled-components'
import { Nav } from './components/nav'
import { theme } from './theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
    </ThemeProvider>
  )
}
