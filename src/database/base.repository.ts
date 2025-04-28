import { Repository } from 'typeorm';
import { AbstractEntity } from './entity/abstract.entity';

export abstract class BaseRepository<
  Entity extends AbstractEntity,
> extends Repository<Entity> {}
