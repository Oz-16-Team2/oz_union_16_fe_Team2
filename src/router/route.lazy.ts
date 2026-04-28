import { lazy } from 'react'

export const LoginPage = lazy(async () => {
  const module = await import('@/pages/LoginPage')

  return { default: module.LoginPage }
})

export const SignupPage = lazy(async () => {
  const module = await import('@/pages/SignupPage')

  return { default: module.SignupPage }
})
