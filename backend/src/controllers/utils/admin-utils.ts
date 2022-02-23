import { Pagination } from './pagination'

export interface GetDoctorsQuery extends Pagination {
   firstName?: string
   lastName?: string
   active?: string
}
