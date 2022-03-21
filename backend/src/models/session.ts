import { Entity, PrimaryColumn, Column, Index } from 'typeorm'
import { ISession } from 'connect-typeorm'

/**
 * User Session model.
 *
 * Fields:
 * - `expiredAt`
 * - `id`
 * - `json`
 */
@Entity()
export class Session implements ISession {
   @Index()
   @Column({
      type: 'bigint',
      default: Date.now(),
   })
   expiredAt!: number

   @PrimaryColumn({
      type: 'varchar',
      length: 255,
   })
   id!: string

   @Column('text')
   json!: string
}
