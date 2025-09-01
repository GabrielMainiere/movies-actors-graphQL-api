import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Movie } from '../../movies/entities/movie.entity';
import { MovieGenres } from 'src/movies/entities/movie_genres.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Table({
  tableName: 'genres_tbl',
  timestamps: true,
})
export class Genre extends Model<Genre> {
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

  @Field(() => [Movie], { nullable: true })
  @BelongsToMany(() => Movie, () => MovieGenres)
  declare movies: Movie[];
}
