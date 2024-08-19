import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomLoggerService } from '../logger.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 10000,
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CustomLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
