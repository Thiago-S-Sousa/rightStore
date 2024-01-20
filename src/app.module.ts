/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './product/product.module';
import { PostgresSettingsService } from './settings/postgres.settings.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresSettingsService,
      inject: [PostgresSettingsService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
