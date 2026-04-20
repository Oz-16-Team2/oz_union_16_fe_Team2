import { RouterProvider } from 'react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { GlobalToast } from '@/components/common/ui'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import { router } from '@/router/Router'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <GlobalToast />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
