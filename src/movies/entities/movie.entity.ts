import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Actor } from '../../actors/entities/actor.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { MovieActors } from './movie_actor.entity';
import { MovieGenres } from './movie_genres.entity';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
@Table({
  tableName: 'movies_tbl',
  timestamps: true,
})
export class Movie extends Model{
  @Field(() => ID)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare synopsis: string;

  @Field(() => Float)
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare duration: number;

  @Field(() => [Actor], { nullable: true })
  @BelongsToMany(() => Actor, () => MovieActors)
  declare actors: Actor[];

  @Field(() => [Genre], { nullable: true })
  @BelongsToMany(() => Genre, () => MovieGenres)
  declare genres: Genre[];
}