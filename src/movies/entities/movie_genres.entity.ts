import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Movie } from './movie.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Table({
  tableName: 'movie_genres_tbl',
  timestamps: false,
})
export class MovieGenres extends Model<MovieGenres> {
  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare movieId: number;

  @ForeignKey(() => Genre)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare genreId: number;
}
