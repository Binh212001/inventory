import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseLogger } from './database-logger';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_PORT', 5432),
      username: this.configService.get<string>('DATABASE_USERNAME', 'root'),
      password: this.configService.get<string>('DATABASE_PASSWORD', 'password'),
      database: this.configService.get<string>('DATABASE_NAME', 'test'),
      synchronize: this.configService.get<boolean>(
        'DATABASE_SYNCHRONIZE',
        true,
      ),
      autoLoadEntities: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      logger: new DatabaseLogger(),
    };
  }
}
