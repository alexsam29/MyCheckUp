import { Repository } from 'typeorm'
import session from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import config from 'config'
import { Session } from '../models/session'
import { PROD, SESSION_COOKIE, SESSION_COOKIE_MAXAGE } from './constants'

/**
 * Configures and manages user sessions.
 *
 * @param repository TypeORM Repository for Session model
 */
export const userSession = (repository: Repository<Session>) => {
   return session({
      secret: config.get('secrets.session'),
      name: SESSION_COOKIE,
      store: new TypeormStore().connect(repository),
      resave: false,
      saveUninitialized: false,
      cookie: {
         maxAge: SESSION_COOKIE_MAXAGE,
         sameSite: PROD ? 'none' : 'lax',
         secure: PROD,
      },
   })
}
