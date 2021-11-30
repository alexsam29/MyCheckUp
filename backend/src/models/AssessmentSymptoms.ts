import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { SelfAssessment } from "./self-assessment";
import { Symptoms } from "./Symptoms-class";


/**
 * AssessmentSymptoms database mdoel.
 * 
 * selfassessment - Primary and drived colum of the assessmentSymptoms tabel by selfassessment table. *(Many to One) Relation. 
 * symptoms - Primary and drived colum of the assessmentSymptoms tabel by symptoms table. *(Many to One) Relation.
 * createdAt - Created date.
 * updatedAt - Lateste updated date. 
 */



@Entity()
export class AssessmentSymptoms
{
    @PrimaryGeneratedColumn('uuid')
    Id!: string    

    @ManyToOne(() => SelfAssessment, selfassessment => selfassessment)
    selfassessment!: SelfAssessment

    @ManyToOne(() => Symptoms, symptoms => symptoms)
    symptoms!: Symptoms

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}