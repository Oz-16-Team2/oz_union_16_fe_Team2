import { loginHandler } from './handlers/loginHandler'
import { signupHandler } from './handlers/signupHandler'

export const handlers = [...loginHandler, ...signupHandler]
