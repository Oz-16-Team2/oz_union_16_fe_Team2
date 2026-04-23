import { loginHandler } from './handlers/loginHandler'
import { postHandler } from './handlers/postHandler'
import { rankingHandler } from './handlers/rankingHandler'
import { signupHandler } from './handlers/signupHandler'

export const handlers = [
  ...loginHandler,
  ...signupHandler,
  ...postHandler,
  ...rankingHandler,
]
