import { Request, Response, NextFunction } from 'express'

/**
 * Handles fundamental functionality of the API.
 */
export const MainController = {
   /**
    * @returns `status 200` and `{ success: true }` in the body, if the API is in good condition.
    */
   ping(_: Request, res: Response, __: NextFunction) {
      return res.status(200).json({ success: true })
   }
}
