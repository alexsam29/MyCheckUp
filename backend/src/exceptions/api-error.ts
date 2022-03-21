/**
 * Represents an API error.
 *
 * Contains status code for the response and error message.
 */
export class ApiError extends Error {
   status: number
   details: any[]

   constructor(status: number, message: string, details: any[] = []) {
      super(message)
      this.status = status
      this.details = details
   }

   static BadRequest(message: string, details: any[] = []) {
      return new ApiError(400, message, details)
   }

   static Unauthorized(message?: string) {
      return new ApiError(401, message || 'Not Authorized')
   }

   static Forbidden(message?: string) {
      return new ApiError(403, message || 'Forbidden')
   }

   static NotFound(message: string) {
      return new ApiError(404, message)
   }

   static InternalError(message: string) {
      return new ApiError(500, message)
   }
}
