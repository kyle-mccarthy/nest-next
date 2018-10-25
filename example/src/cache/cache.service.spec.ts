import { CacheService, ICacheManager } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  let store: any = {};

  const Manager = jest.fn<ICacheManager>().mockImplementation(() => {
    return {
      get: jest.fn((key: string) => store[key]),
      set: jest.fn((key: string, value: any, options?: { ttl: number }) => {
        store[key] = value;
      }),
    };
  });

  const manager = new Manager();

  beforeAll(async () => {
    service = new CacheService(manager);
  });

  beforeEach(async () => {
    store = {};
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call set', () => {
    service.set('test', 'test');

    expect(manager.set).toHaveBeenCalledTimes(1);
  });

  it('should call get', () => {
    const res = service.get('test');

    expect(res).toBeUndefined();
    expect(manager.get).toHaveBeenCalledTimes(1);
  });

  it('should get set value', () => {
    store.testKey = 'test value';

    expect(service.get('testKey')).toEqual('test value');
  });

  it('set should overwrite existing value', () => {
    store.current = 0;

    expect(store.current).toEqual(0);
    service.set('current', 1);
    expect(store.current).toEqual(1);
  });
});
