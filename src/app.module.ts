import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CityModule } from './city/city.module';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './myDatasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
    dataSourceFactory: async options => {
      const datasource = await new DataSource(options).initialize();
      return datasource;
    },
  }),UsersModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
