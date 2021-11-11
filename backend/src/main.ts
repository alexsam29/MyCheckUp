import express from 'express'
import cors from 'cors'
import { router } from './routes/router'
import { notFoundHandler } from './middleware/not-found-handler'
import { errorHandler } from './middleware/error-handler'
import { PORT } from './common/constants'

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(notFoundHandler)
app.use(errorHandler)

const main = async () => {
   try {
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
   }
   catch (err: unknown) {
      console.error(err)
   }
}

main()
