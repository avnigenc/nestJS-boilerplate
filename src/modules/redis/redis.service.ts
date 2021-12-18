import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export default class RedisClientService {
  client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getClient();
  }

  async getObject(key: string): Promise<Object | null> {
    const value = await this.client.get(key);
    return JSON.parse(value);
  }

  async setObject(key: string, value: any): Promise<string | null> {
    return this.client.set(key, JSON.stringify(value));
  }

  async getString(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async setString(key: string, value: string): Promise<string | null> {
    return this.client.set(key, value);
  }

  async remove(key: string): Promise<boolean> {
    const retVal = await this.client.del(key);
    return retVal === 1;
  }

  async removeAll(): Promise<string> {
    return this.client.flushall();
  }
}
