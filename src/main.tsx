import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import '@fontsource/pretendard/400.css'
import '@fontsource/pretendard/500.css'
import '@fontsource/pretendard/700.css'
import './index.css'

/*
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.ts')
    await worker.start()
  }
}
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})
*/

createRoot(document.getElementById('root')!).render(<App />)
