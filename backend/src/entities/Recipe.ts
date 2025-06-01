import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  cuisine: string;

  @Column()
  difficulty: string;

  @Column()
  cookTime: number;

  @Column()
  servings: number;

  @Column()
  image: string;

  @Column("decimal", { precision: 2, scale: 1 })
  rating: number;

  @Column("simple-json")
  ingredients: string[];

  @Column("text")
  description: string;
}
