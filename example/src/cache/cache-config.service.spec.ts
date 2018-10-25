import { Test, TestingModule } from '@nestjs/testing';
import { CacheConfigService } from './cache-config.service';

describe('CacheConfigService', () => {
  let service: CacheConfigService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheConfigService],
    }).compile();
    service = module.get<CacheConfigService>(CacheConfigService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
