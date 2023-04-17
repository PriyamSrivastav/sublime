import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('PG_HOST'),
      port: this.config.get<number>('PG_PORT'),
      database: this.config.get<string>('PG_NAME'),
      username: this.config.get<string>('PG_USER'),
      password: this.config.get<string>('PG_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      schema: 'public',
      logging: false,
      synchronize: true,
    };
  }
}
