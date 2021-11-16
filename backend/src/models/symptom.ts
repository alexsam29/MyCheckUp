import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

/**
 * Symptoms data base model. 
 * 
 * Fields:
 * 
 * Sid - uniqe id of the symptoms
 * Fever - type boolean (true or false)
 * Cough - type boolean (true or false)
 * Headache - type boolean (true or false)
 * SoreThroat - type boolean (true or false)
 * Diarrhea - type boolean (true or false)
 * BodyPain - type boolean (true or false)
 * BreathShortness - type boolean (true or false)
 */
@Entity()
export class Symptoms {
   @PrimaryGeneratedColumn("uuid")
   Sid!: string

   @Column()
   Fever!: boolean
   
   @Column()
   Cough!: boolean
   
   @Column()
   Headache!: boolean
   
   @Column()
   SoreThroat!: boolean
   
   @Column()
   Diarrhea!: boolean
   
   @Column()
   BodyPain!: boolean
   
   @Column()
   BreathShortness!: boolean
}
