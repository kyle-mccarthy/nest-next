import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

export interface ICacheManager {
  store: any;
  get(key: string): any;
  set(key: string, value: string, options?: { ttl: number }): any;
}

@Injectable()
export class CacheService {
  private cache!: ICacheManager;

  constructor(@Inject(CACHE_MANAGER) cache: ICacheManager) {
    this.cache = cache;
  }

  public get(key: string): Promise<any> {
    return this.cache.get(key);
  }

  public set(key: string, value: any, options?: { ttl: number }): Promise<any> {
    return this.cache.set(key, value, options);
  }
}
