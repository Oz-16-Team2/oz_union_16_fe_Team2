import { RouterProvider } from 'react-router'

import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import { router } from '@/router/Router'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
