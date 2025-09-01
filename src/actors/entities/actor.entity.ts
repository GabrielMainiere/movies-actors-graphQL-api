import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Movie } from '../../movies/entities/movie.entity';
import { MovieActors } from 'src/movies/entities/movie_actor.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Table({
  tableName: 'actors_tbl',
  timestamps: true,
})
export class Actor extends Model<Actor> {
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
    type: DataType.DATE,
    allowNull: false,
  })
  declare birthdate: Date;

  @Field(() => [Movie], { nullable: true })
  @BelongsToMany(() => Movie, () => MovieActors)
  declare movies: Movie[];
}
