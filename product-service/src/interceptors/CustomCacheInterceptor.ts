import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheInterceptor, CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();

    if (request.method !== 'GET') {
      return undefined;
    }

    // const authorizationHeader = request.headers.authorization;
    const userId = request.query.userId;

    const url = request.url;
    const method = request.method;
    return `${method}:${url}:${userId}`;
  }
}
