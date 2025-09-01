import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Movie } from './movie.entity';
import { Actor } from '../../actors/entities/actor.entity';

@Table({
  tableName: 'movie_actors_tbl',
  timestamps: false,
})
export class MovieActors extends Model<MovieActors> {
  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare movieId: number;

  @ForeignKey(() => Actor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare actorId: number;
}
