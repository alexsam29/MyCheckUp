export interface SearchQuery {
   /**
    * Matches exactly if true.
    */
   exact?: boolean
   /**
    * Search offset.
    */
   offset?: number
   /**
    * Maximum number of records to return.
    */
   limit?: number
}
