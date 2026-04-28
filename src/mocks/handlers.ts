import { postHandler } from './handlers/postHandler'
import { rankingHandler } from './handlers/rankingHandler'

export const handlers = [...postHandler, ...rankingHandler]
