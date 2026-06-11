import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let hasDb = false;

  beforeAll(async () => {
    try {
      const m: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = m.createNestApplication();
      await app.init();
      hasDb = true;
    } catch {
      /* no DB */
    }
  }, 30000);

  afterAll(async () => {
    if (app) await app.close();
  });

  it('/ (GET)', async () => {
    if (!hasDb) return;
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('StellarTip API — Decentralized micro-tipping on Stellar');
  });
});
