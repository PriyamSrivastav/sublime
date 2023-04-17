import { City } from "src/city/entities/city.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('customers')
export class User {
   

      @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      first_name: string;
    
      @Column()
      last_name: string;

      @Column()
      @ManyToOne(() => City, (city) => city.id,{eager:true})
      city:number;

      @Column()
      company: string;
    }


